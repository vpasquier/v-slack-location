var lambda = require('../index.js');
var parameter = require('./parameter.json');

lambda.handler(parameter, {
  succeed: function(result) {
    console.log('[SUCCEED] ', result);
  },
  fail: function(result) {
    console.log('[FAIL] ', result);
  }
});
