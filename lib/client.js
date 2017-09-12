'use strict';

const requestPromise = require('request-promise');
const joi = require('joi');
const joiSchema = require('./../payload-schema/joi-validation');
const get = require('lodash.get');
const endpoints = require('./../data/endpoints.json');
const utils = require('./utils');

class Client {
  /**
   * Create a client for B Virtual
   * @param {Object} config
   * @param {String} config.token - API token used for basicAuth
   * @param {String} config.secretKey - API secret key
   */
  constructor(config) {
    this.url = 'https://my.checkeeper.com/api/v2';
    this.token = config.token;
    this.secretKey = config.secretKey;
  }

  /**
   * Send a request using provided config
   * @param {Object} requestConfig - Configuration for request
   */
  request(requestConfig) {
    requestConfig.headers = {
      // Authorization: `Basic ${this.token}`
      'Content-Type': `application/json`
    };

    return requestPromise(requestConfig);
  }

  /**
   * Post data to endpoint
   * @param {String} endpointName - Name of the endpoint
   * @param {Object} payload - Payload data
   * @return {Promise}
   */
  postData(endpointName, payload) {
    let _this = this;

    return new Promise(function post(resolve, reject) {
      let schema = joiSchema[endpointName];
      joi.validate(payload, schema, function onJoiValidate(err) {
        if (err) {
          return reject(get(err, 'details[0].message'));
        }

        payload.token = _this.token;
        payload = utils.keyToSnakeCase(payload);
        utils.boolConversion(payload, 1, 0);
        let payloadArray = utils.objectToArray(payload);
        utils.keySort(payloadArray);
        let encodedUrl = utils.encodeURI(payloadArray);
        let signature = utils.createSignature(encodedUrl, _this.secretKey);
        payload.signature = signature;

        let options = {
          method: 'POST',
          uri: `${_this.url}/${endpoints[endpointName]}`,
          body: payload,
          json: true,
          resolveWithFullResponse: false
        };

        _this
          .request(options)
          .then(function onResponse(response) {
            if(!response.success) {
              return reject(response);
            }
            resolve(_this.processResponse(response));
          })
          .catch(reject);
      });
    });

  }


  /**
   * Create a new check order
   * @param {Object} payload - Payload to send with request
   * @return {Promise}
   */
  createCheck(payload) {
    return this.postData('checkCreate', payload);
  }

  /**
   * Want to know the whereabouts of a check just submitted to Checkeeper
   * @param {Object} payload - Payload to send with request
   * @return {Promise}
   */
  checkStatus(payload) {
    return this.postData('checkStatus', payload);
  }

  /**
   * Have a bank routing number and need to make sure it's valid
   * @param {Object} payload - Payload to send with request
   * @return {Promise}
   */
  bankLookup(payload) {
    return this.postData('bankLookup', payload);
  }

  /**
   * Gets information about your account
   * @return {Promise}
   */
  accountInfo() {
    return this.postData('accountInfo', {});
  }
}

module.exports = Client;
