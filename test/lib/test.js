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
