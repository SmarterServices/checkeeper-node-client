'use strict';

const Checkeeper = require('./../../index');
const credentials = require('./../data/credentials');
const expect = require('chai').expect;
const mockRequest = require('./mock');

const testData = require('./../data/test-data.json');

mockRequest();

describe('Create Check', function testCreateCheck() {
  it('Should create check successfully and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .createCheck(Object.assign({}, testData.createCheck.payload.valid))
      .then(function (response) {
        expect(response).to.eql(testData.createCheck.response.valid);
      });
  });

  it('Should fail for missing [checkNumber] and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .createCheck(Object.assign({}, testData.createCheck.payload.missingField))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.equal('"checkNumber" is required');
      });
  });

  it('Should fail for invalid [token] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidToken);

    return client
      .createCheck(Object.assign({}, testData.createCheck.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.createCheck.response.invalidToken);
      });
  });

  it('Should fail for invalid [secretKey] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidSecret);

    return client
      .createCheck(Object.assign({}, testData.createCheck.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.createCheck.response.invalidSecret);
      });
  });
});

describe('Check Status', function testCreateCheck() {
  it('Should find check successfully and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .checkStatus(Object.assign({}, testData.checkStatus.payload.valid))
      .then(function (response) {
        expect(response).to.eql(testData.checkStatus.response.valid);
      });
  });

  it('Should fail for invalid [checkId] and return 400 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .checkStatus(Object.assign({}, testData.checkStatus.payload.invalid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.checkStatus.response.invalid);
      });
  });

  it('Should fail for invalid [token] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidToken);

    return client
      .checkStatus(Object.assign({}, testData.checkStatus.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.checkStatus.response.invalidToken);
      });
  });

  it('Should fail for invalid [secretKey] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidSecret);

    return client
      .checkStatus(Object.assign({}, testData.checkStatus.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.checkStatus.response.invalidSecret);
      });
  });

});

describe('Bank Lookup', function testCreateCheck() {
  it('Should find bank successfully and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .bankLookup(Object.assign({}, testData.bankLookup.payload.valid))
      .then(function (response) {
        expect(response).to.eql(testData.bankLookup.response.valid);
      });
  });

  it('Should find no bank for [routingNumber] and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .bankLookup(Object.assign({}, testData.bankLookup.payload.invalid))
      .then(function (response) {
        expect(response).to.eql(testData.bankLookup.response.invalid);
      });
  });

  it('Should fail for invalid [token] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidToken);

    return client
      .bankLookup(Object.assign({}, testData.bankLookup.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.bankLookup.response.invalidToken);
      });
  });

  it('Should fail for invalid [secretKey] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidSecret);

    return client
      .bankLookup(Object.assign({}, testData.bankLookup.payload.valid))
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.bankLookup.response.invalidSecret);
      });
  });

});

describe('Account Info', function testCreateCheck() {
  it('Should find account information successfully and return 200 response', function () {
    let client = new Checkeeper(credentials.valid);

    return client
      .accountInfo()
      .then(function (response) {
        expect(response).to.eql(testData.accountInfo.response.valid);
      });
  });

  it('Should fail for invalid [token] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidToken);

    return client
      .accountInfo()
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.bankLookup.response.invalidToken);
      });
  });

  it('Should fail for invalid [secretKey] and return 400 response', function () {
    let client = new Checkeeper(credentials.invalidSecret);

    return client
      .accountInfo()
      .then(response => Promise.reject('Should fail'))
      .catch(function (response) {
        expect(response).to.eql(testData.accountInfo.response.invalidSecret);
      });
  });

});
