/*
Copyright 2017 - 2017 Amazon.com, Inc. or its affiliates. All Rights Reserved.
Licensed under the Apache License, Version 2.0 (the "License"). You may not use this file except in compliance with the License. A copy of the License is located at
    http://aws.amazon.com/apache2.0/
or in the "license" file accompanying this file. This file is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and limitations under the License.
*/

const AWS = require("aws-sdk");
const awsServerlessExpressMiddleware = require("aws-serverless-express/middleware");
const bodyParser = require("body-parser");
const express = require("express");

AWS.config.update({ region: process.env.TABLE_REGION });

const dynamodb = new AWS.DynamoDB.DocumentClient();

let tableName = "stepsdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "userId";
const partitionKeyType = "S";
const sortKeyName = "timeStampNanos";
const sortKeyType = "N";
const hasSortKey = sortKeyName !== "";
const path = "/steps";
const UNAUTH = "UNAUTH";
const hashKeyPath = "/:" + partitionKeyName;
const sortKeyPath = hasSortKey ? "/:" + sortKeyName : "";

// declare a new express app
const app = express();
app.use(bodyParser.json());
app.use(awsServerlessExpressMiddleware.eventContext());

// Enable CORS for all methods
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*");
  next();
});

// convert url string param to expected Type
const convertUrlType = (param, type) => {
  switch (type) {
    case "N":
      return Number.parseInt(param);
    default:
      return param;
  }
};

/********************************
 * HTTP Get method for list objects *
 ********************************/

// app.get(path + hashKeyPath, function (req, res) {
//   const condition = {};
//   condition[partitionKeyName] = {
//     ComparisonOperator: "EQ",
//   };
//   console.log('condition1', condition);
//   if (userIdPresent && req.apiGateway) {
//     condition[partitionKeyName]["AttributeValueList"] = [
//       req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH,
//     ];
//   } else {
//     try {
//       condition[partitionKeyName]["AttributeValueList"] = [
//         convertUrlType(req.params[partitionKeyName], partitionKeyType),
//       ];
//     } catch (err) {
//       res.statusCode = 500;
//       res.json({ error: "Wrong column type " + err });
//     }
//   }
//   console.log('condition2', condition);
//   let queryParams = {
//     TableName: tableName,
//     KeyConditions: condition,
//   };

//   dynamodb.query(queryParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({ error: "Could not load items: " + err });
//     } else {
//       res.json(data.Items);
//     }
//   });
// });

/*****************************************
 * HTTP Get method for get single object *
 *****************************************/

app.get(path + "/object" + hashKeyPath + sortKeyPath, function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(
        req.params[partitionKeyName],
        partitionKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(
        req.params[sortKeyName],
        sortKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }

  let getItemParams = {
    TableName: tableName,
    Key: params,
  };

  dynamodb.get(getItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: "Could not load items: " + err.message });
    } else {
      if (data.Item) {
        res.json(data.Item);
      } else {
        res.json(data);
      }
    }
  });
});

/********************************
 * HTTP Get method for list objects * By XS
 ********************************/

app.get(path + hashKeyPath, function (req, res) {
  try {
    const condition = {};
    condition[partitionKeyName] = {
      ComparisonOperator: "EQ",
    };
    console.log("condition1", condition);
    if (userIdPresent && req.apiGateway) {
      condition[partitionKeyName]["AttributeValueList"] = [
        req.apiGateway.event.requestContext.identity.cognitoIdentityId ||
          UNAUTH,
      ];
    } else {
      try {
        condition[partitionKeyName]["AttributeValueList"] = [
          convertUrlType(req.params[partitionKeyName], partitionKeyType),
        ];
      } catch (err) {
        res.statusCode = 500;
        res.json({ error: "Wrong column type " + err });
      }
    }
    
    console.log("condition2", condition);
    let queryParams = {
      TableName: tableName,
      KeyConditions: condition,
      KeyConditionExpression: "#ts >= :start_ts and #ts <= :end_ts",
      ExpressionAttributeNames: {
        "#ts": "timeStampNanos",
      },
      ExpressionAttributeValues: {
        ":start_ts": { N: "1686330890" },
        ":end_ts": { N: "1686331140" },
      },
    };

    const params = {
      TableName: tableName,
      KeyConditionExpression: 'userId = :userId AND timeStampNanos BETWEEN :startTs AND :endTs',
      ExpressionAttributeValues: {
        // ':userId': 'ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4',
        ':userId': req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH,
        ':startTs': 1686330890,
        ':endTs': 1686331140
      }
    };
    console.log('params', params);
    console.log('params', params.ExpressionAttributeValues);
    // dynamodb.query(queryParams, (err, data) => {
    dynamodb.query(params, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "Could not load items: " + err });
        console.log("err in get XS version:", err);
      } else {
        res.json(data.Items);
      }
    });
  } catch (e) {
    console.log("err in get query XS version:", e);
  }
});

/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function (req, res) {
  console.log("app.put is called");
  if (userIdPresent) {
    req.body["userId"] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  }

  let putItemParams = {
    TableName: tableName,
    Item: req.body,
  };
  // console.log('putItemParams', putItemParams);
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
    } else {
      res.json({ success: "put call succeed!", url: req.url, data: data });
    }
  });
});

/************************************
 * HTTP post method for insert objects XS Version*
 *************************************/
app.post(path, function (req, res) {
  console.log("App post called");
  try {
    var arr1 = req.body;
    // var arr1 = JSON.parse(req.body);
    // console.log('arr1', arr1);
    if (userIdPresent) {
      // var arr1 = req.body;
      arr1 = arr1.map((item) => {
        return {
          timeStampNanos: parseInt(item.timeStampNanos.substring(0, 10)),
          steps: item.steps,
        };
      });
      arr1.forEach((item) => {
        item["userId"] =
          req.apiGateway.event.requestContext.identity.cognitoIdentityId ||
          UNAUTH;
      });
    }
    // console.log('arr1 2:', arr1);
    const putItemRequests = arr1.map((item) => {
      return {
        PutRequest: {
          Item: item,
        },
      };
    });
    // console.log('putItemRequests', putItemRequests);
    const batchWriteParams = {
      RequestItems: {
        "stepsdb-staging": putItemRequests,
      },
    };
    // console.log('batchWriteParams', batchWriteParams);
    dynamodb.batchWrite(batchWriteParams, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: err, url: req.url, body: req.body });
        console.log("err in batchwrite:", err);
      } else {
        res.json({ success: "post call succeed!", url: req.url, data: data });
      }
    });
  } catch (e) {
    console.log("Error in app.post:", e);
  }
});

/************************************
 * HTTP post method for insert objects *
 *************************************/

// app.post(path, function (req, res) {
//   console.log("App post called");
//   try {
//     if (userIdPresent) {
//       req.body.forEach((item) => {
//         item["userId"] =
//           req.apiGateway.event.requestContext.identity.cognitoIdentityId ||
//           UNAUTH;
//       });
//     }

//     const putItemRequests = req.body.map((item) => {
//       console.log("Item:", item);
//       return {
//         PutRequest: {
//           Item: item,
//         },
//       };
//     });

//     const batchWriteParams = {
//       RequestItems: {
//         [tableName]: putItemRequests,
//       },
//     };

//     dynamodb.batchWrite(batchWriteParams, (err, data) => {
//       if (err) {
//         res.statusCode = 500;
//         res.json({ error: err, url: req.url, body: req.body });
//       } else {
//         res.json({ success: "post call succeed!", url: req.url, data: data });
//       }
//     });
//   } catch (e) {
//     console.log("Error in app.post:", e);
//   }
// });

/************************************
 * HTTP post method for insert object *
 *************************************/

// app.post(path, function(req, res) {

//   if (userIdPresent) {
//     req.body['userId'] = req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
//   }

//   let putItemParams = {
//     TableName: tableName,
//     Item: req.body
//   }
//   dynamodb.put(putItemParams, (err, data) => {
//     if (err) {
//       res.statusCode = 500;
//       res.json({error: err, url: req.url, body: req.body});
//     } else {
//       res.json({success: 'post call succeed!', url: req.url, data: data})
//     }
//   });
// });

/**************************************
 * HTTP remove method to delete object *
 ***************************************/

app.delete(path + "/object" + hashKeyPath + sortKeyPath, function (req, res) {
  const params = {};
  if (userIdPresent && req.apiGateway) {
    params[partitionKeyName] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
  } else {
    params[partitionKeyName] = req.params[partitionKeyName];
    try {
      params[partitionKeyName] = convertUrlType(
        req.params[partitionKeyName],
        partitionKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }
  if (hasSortKey) {
    try {
      params[sortKeyName] = convertUrlType(
        req.params[sortKeyName],
        sortKeyType
      );
    } catch (err) {
      res.statusCode = 500;
      res.json({ error: "Wrong column type " + err });
    }
  }

  let removeItemParams = {
    TableName: tableName,
    Key: params,
  };
  dynamodb.delete(removeItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url });
    } else {
      res.json({ url: req.url, data: data });
    }
  });
});

app.listen(3000, function () {
  console.log("App started");
});

// Export the app object. When executing the application local this does nothing. However,
// to port it to AWS Lambda we will create a wrapper around that will load the app from
// this file
module.exports = app;
