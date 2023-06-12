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
