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

let tableName = "datasdb";
if (process.env.ENV && process.env.ENV !== "NONE") {
  tableName = tableName + "-" + process.env.ENV;
}

const userIdPresent = true; // TODO: update in case is required to use that definition
const partitionKeyName = "userId";
const partitionKeyType = "S";
const sortKeyName = "timeStamp";
const sortKeyType = "N";
const hasSortKey = sortKeyName !== "";
const path = "/datas";
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
 * HTTP Get method for list objects * By XS
 ********************************/

app.get(path + hashKeyPath, function (req, res) {
  try {
    const condition = {};
    condition[partitionKeyName] = {
      ComparisonOperator: "EQ",
    };

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

    let queryParams = {
      TableName: tableName,
      KeyConditions: condition,
    };
    // 1686330890
    // 1686331140

    const startTs = req.body.startTs;
    const endTs = req.body.endTs;
    const params = {
      TableName: tableName,
      KeyConditionExpression:
        "userId = :userId AND timeStamp BETWEEN :startTs AND :endTs",
      ExpressionAttributeValues: {
        // ':userId': 'ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4',
        ":userId":
          req.apiGateway.event.requestContext.identity.cognitoIdentityId ||
          UNAUTH,
        ":startTs": startTs,
        ":endTs": endTs,
      },
    };

    dynamodb.query(params, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json({ error: "Could not load items: " + err });
      } else {
        res.json(data.Items);
      }
    });
  } catch (e) {
    console.log("err in query", e);
  }
});

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

/************************************
 * HTTP put method for insert object *
 *************************************/

app.put(path, function (req, res) {
  if (userIdPresent) {
    req.body["userId"] =
      req.apiGateway.event.requestContext.identity.cognitoIdentityId || UNAUTH;
    // console.log('UserId Present' );
    // console.log('req:',req.apiGateway.event.requestContext.identity.cognitoIdentityId );
  }
  console.log("req.body", req.body);
  let putItemParams = {
    TableName: tableName,
    Item: req.body,
  };
  // console.log('putItemParams', putItemParams);
  dynamodb.put(putItemParams, (err, data) => {
    if (err) {
      res.statusCode = 500;
      res.json({ error: err, url: req.url, body: req.body });
      console.log("err in put api", err);
    } else {
      res.json({ success: "put call succeed!", url: req.url, data: data });
    }
  });
});

/************************************
 * HTTP post method for insert object * batch write item by xs+chatgpt
 *************************************/

// By chatgpt

app.post(path, function (req, res) {
  try {
    var arr1 = req.body;

    if (userIdPresent) {
      arr1 = arr1.map((item) => {
        const timeStamp = parseInt(item.timeStampNanos.substring(0, 10));
        const { timeStampNanos, ...rest } = item;
        rest["timeStamp"] = timeStamp;
        return rest;
      });

      arr1.forEach((item) => {
        item["userId"] =
          req.apiGateway.event.requestContext.identity.cognitoIdentityId ||
          UNAUTH;
      });
      console.log("arr1", arr1);
    }

    const putItemRequests = arr1.map((item) => {
      return {
        PutRequest: {
          Item: item,
        },
      };
    });
    console.log("putItemRequests", putItemRequests);

    let errorOccurred = false; // Flag to track if an error occurred

    for (let i = 0; i < putItemRequests.length; i += 25) {
      var items25 = putItemRequests.slice(i, i + 25);
      console.log('items25:', items25);

      const batchWriteParams = {
        RequestItems: {
          "datasdb-staging": items25,
        },
      };
      console.log('batchWriteParams', batchWriteParams);
  
      dynamodb.batchWrite(batchWriteParams, (err, data) => {
        if (err) {
          errorOccurred = true;
          console.log("err in batch write in api", err);
        } else {
          console.log("Success in batch write", data);
        }

        // Check if it's the last iteration and send the response
        if (i + 25 >= putItemRequests.length) {
          if (errorOccurred) {
            res.statusCode = 500;
            res.json({ error: "An error occurred during batch write" });
          } else {
            res.json({ success: "post call succeed!", url: req.url, data: data });
          }
        } 
      });
    }
  } catch (e) {
    console.log("err in batch write", e);
    res.statusCode = 500;
    res.json({ error: "An error occurred" });
  }
});


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
