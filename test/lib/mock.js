'use strict';

const Checkeeper = require('./../../index');
const credentials = require('./../data/credentials');
const endpoints = require('./../../data/endpoints.json');
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

  nock(url)
    .post(endpoints.bankLookup)
    .reply(200, testData.bankLookup.response.valid);

  nock(url)
    .post(endpoints.bankLookup)
    .reply(200, testData.bankLookup.response.invalid);

  nock(url)
    .post(endpoints.bankLookup)
    .reply(()=>testData.bankLookup.response.invalidToken);

  nock(url)
    .post(endpoints.bankLookup)
    .reply(()=>testData.bankLookup.response.invalidSecret);

  nock(url)
    .post(endpoints.accountInfo)
    .reply(200, testData.accountInfo.response.valid);

  nock(url)
    .post(endpoints.accountInfo)
    .reply(()=>testData.accountInfo.response.invalidToken);

  nock(url)
    .post(endpoints.accountInfo)
    .reply(()=>testData.accountInfo.response.invalidSecret);

};

module.exports = mockRequest;
