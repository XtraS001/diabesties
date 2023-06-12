// * @see AWS.DynamoDB.batchWriteItem
// * @example Write to and delete from a table
var params = {
  RequestItems: {
    "Table-1": [
      {
        DeleteRequest: {
          Key: { HashKey: "someKey" },
        },
      },
      {
        PutRequest: {
          Item: {
            HashKey: "anotherKey",
            NumAttribute: 1,
            BoolAttribute: true,
            ListAttribute: [1, "two", false],
            MapAttribute: { foo: "bar" },
          },
        },
      },
    ],
  },
};
// *
// *  var documentClient = new AWS.DynamoDB.DocumentClient();
// *
// *  documentClient.batchWrite(params, function(err, data) {
// *    if (err) console.log(err);
// *    else console.log(data);
// *  });
// *
// */

// * @see AWS.DynamoDB.putItem
// * @example Create a new item in a table
// *  var params = {
// *    TableName : 'Table',
// *    Item: {
// *       HashKey: 'haskey',
// *       NumAttribute: 1,
// *       BoolAttribute: true,
// *       ListAttribute: [1, 'two', false],
// *       MapAttribute: { foo: 'bar'},
// *       NullAttribute: null
// *    }
// *  };
// *
// *  var documentClient = new AWS.DynamoDB.DocumentClient();
// *
// *  documentClient.put(params, function(err, data) {
// *    if (err) console.log(err);
// *    else console.log(data);
// *  });
// *
// */
// put: function(params, callback) {
//  var operation = this.serviceClientOperationsMap['put'];
//  return this.makeServiceRequest(operation, params, callback);
// },

var arr1 = [
  { steps: 34, timeStampNanos: "1686330840000000000" },
  { steps: 55, timeStampNanos: "1686330900000000000" },
];

var arr2 = [
  { timeStampNanos: 1686330840, steps: 34 },
  { timeStampNanos: 1686330900, steps: 55 },
];

var arr3 = [
  {
    PutRequest: {
      Item: { timeStampNanos: 1686330840, steps: 34 },
    },
  },
  {
    PutRequest: {
      Item: { timeStampNanos: 1686330900, steps: 55 },
    },
  },
];

var arr4 = [
  {
    steps: 34,
    timeStampNanos: 1686330840,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 24,
    timeStampNanos: 1686330890,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 55,
    timeStampNanos: 1686330900,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 24,
    timeStampNanos: 1686330999,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 34,
    timeStampNanos: 1686331080,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 21,
    timeStampNanos: 1686331140,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 20,
    timeStampNanos: 1686331440,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 34,
    timeStampNanos: 1686339940,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
  {
    steps: 34,
    timeStampNanos: 1686339945,
    userId: "ap-southeast-1:952276e0-3fad-4ccf-b8b1-2f9cf1d410e4",
  },
];

const obj1 = {
  aws_cloud_logic_custom: [
    {
      endpoint:
        "https://whv6pyvh7k.execute-api.ap-southeast-1.amazonaws.com/staging",
      name: "stepsApi",
      region: "ap-southeast-1",
    },
  ],
  aws_cognito_identity_pool_id:
    "ap-southeast-1:cbcbb1d8-f1e7-46cb-a73c-21575bdacffc",
  aws_cognito_mfa_configuration: "OFF",
  aws_cognito_mfa_types: ["SMS"],
  aws_cognito_password_protection_settings: {
    passwordPolicyCharacters: [
      "REQUIRES_LOWERCASE",
      "REQUIRES_NUMBERS",
      "REQUIRES_SYMBOLS",
      "REQUIRES_UPPERCASE",
    ],
    passwordPolicyMinLength: 8,
  },
  aws_cognito_region: "ap-southeast-1",
  aws_cognito_signup_attributes: ["NAME", "EMAIL"],
  aws_cognito_social_providers: [],
  aws_cognito_username_attributes: [],
  aws_cognito_verification_mechanisms: ["EMAIL"],
  aws_dynamodb_all_tables_region: "ap-southeast-1",
  aws_dynamodb_table_schemas: [
    { region: "ap-southeast-1", tableName: "stepsdb-staging" },
  ],
  aws_project_region: "ap-southeast-1",
  aws_user_pools_id: "ap-southeast-1_vbLILsPvg",
  aws_user_pools_web_client_id: "1ro5itnumu0vrml4un2l0gnia7",
  oauth: {},
};
