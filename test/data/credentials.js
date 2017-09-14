'use strict';

let correctToken = 'correctToken';
let wrongToken = 'wrongToken';
let correctSecret = 'correctSecret';
let wrongSecret = 'wrongSecret';

module.exports = {
  valid: {
    token: correctToken,
    secretKey: correctSecret
  },
  invalid: {
    token: wrongToken,
    secretKey: wrongSecret
  },
  invalidToken: {
    token: wrongToken,
    secretKey: correctSecret
  },
  invalidSecret: {
    token: correctToken,
    secretKey: wrongSecret
  },
};
