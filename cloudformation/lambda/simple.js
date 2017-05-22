var moment = require('moment');
var uuid = require('node-uuid');
var AWS = require('aws-sdk');
var db = new AWS.DynamoDB();

function mapUserItem(item) {
  return {
    "uid": item.uid.S,
    "email": item.email.S
  };
}

exports.getUsers = function(event, cb) {
  console.log("getUsers", JSON.stringify(event));
  var params = {
    "TableName": "simple-user",
    "Limit": event.parameters.limit || 10
  };
  if (event.parameters.next) {
    params.ExclusiveStartKey = {
      "uid": {
        "S": event.parameters.next
      }
    };
  }
  db.scan(params, function(err, data) {
    if (err) {
      cb(err);
    } else {
      var res = {
        "body": data.Items.map(mapUserItem)
      };
      if (data.LastEvaluatedKey !== undefined) {
        res.headers = {"next": data.LastEvaluatedKey.uid.S};
      }
      cb(null, res);
    }
  });
};

exports.postUser = function(event, cb) {
  console.log("postUser", JSON.stringify(event));
  var uid = uuid.v4();
  var params = {
    "Item": {
      "uid": {
        "S": uid
      },
      "email": {
        "S": event.body.email
      }
    },
    "TableName": "simple-user",
    "ConditionExpression": "attribute_not_exists(uid)"
  };
  db.putItem(params, function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null, {"headers": {"uid": uid}, "body": mapUserItem(params.Item)});
    }
  });
};

exports.getUser = function(event, cb) {
  console.log("getUser", JSON.stringify(event));
  var params = {
    "Key": {
      "uid": {
        "S": event.parameters.userId
      }
    },
    "TableName": "simple-user"
  };
  db.getItem(params, function(err, data) {
    if (err) {
      cb(err);
    } else {
      if (data.Item) {
        cb(null, {"body": mapUserItem(data.Item)});
      } else {
        cb(new Error('not found'));
      }
    }
  });
};

exports.deleteUser = function(event, cb) {
  console.log("deleteUser", JSON.stringify(event));
  var params = {
    "Key": {
      "uid": {
        "S": event.parameters.userId
      }
    },
    "TableName": "simple-user"
  };
  db.deleteItem(params, function(err) {
    if (err) {
      cb(err);
    } else {
      cb();
    }
  });
};
