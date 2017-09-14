'use strict';

const Checkeeper = require('./../../index');
const credentials = require('./../data/credentials');
const endpoints = require('./../../data/endpoints.json');
const isEqual = require('lodash.isequal');
const nock = require('nock');
const testData = require('./../data/test-data.json');

const mockRequest = function () {
  let url = 'https://my.checkeeper.com/api/v2';

  nock(url)
    .post(endpoints.checkCreate)
    .reply(200, testData.createCheck.response.valid);

  nock(url)
    .post(endpoints.checkCreate)
    .reply(()=>testData.createCheck.response.invalidToken);

  nock(url)
    .post(endpoints.checkCreate)
    .reply(()=>testData.createCheck.response.invalidSecret);

  nock(url)
    .post(endpoints.checkStatus)
    .reply(200, testData.checkStatus.response.valid);

  nock(url)
    .post(endpoints.checkStatus)
    .reply(200, testData.checkStatus.response.invalid);

  nock(url)
    .post(endpoints.checkStatus)
    .reply(()=>testData.createCheck.response.invalidToken);

  nock(url)
    .post(endpoints.checkStatus)
    .reply(()=>testData.createCheck.response.invalidSecret);

};

module.exports = mockRequest;
