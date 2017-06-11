var simple = require("./simple.js");

exports.handler = function(event, context, cb) {
  simple[event.fun](event, cb);
};
