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

        payload = _this.processPayload(payload);

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
   * Process response from Checkeeper API to output according to our guideline
   * @param {Object} response - Payload data
   * @returns {Object} - Processed response
   */
  processResponse(response) {
    // convert booleans back to normal
    utils.convertValues(response, {1: true, 0: false});
    // convert response to camelCase
    response = utils.keyToCamelCase(response);

    return response;
  }

  /**
   * Process payload for sending to Checkeeper API
   * @param {Object} payload - Payload data
   * @returns {Object} - Processed payload
   */
  processPayload(payload) {
    // add token into payload
    payload.token = this.token;
    // converts property names into snake_case
    payload = utils.keyToSnakeCase(payload);
    // convert all booleans to 1 and 0
    utils.convertValues(payload, {true:1, false:0});
    // convert payload object into array
    let payloadArray = utils.objectToArray(payload);
    // sort array lexicographically by its property name
    utils.keySort(payloadArray);
    // encode the payload array
    let encodedUrl = utils.encodeURI(payloadArray);
    // generate signature
    let signature = utils.createSignature(encodedUrl, this.secretKey);
    // add signature into payload
    payload.signature = signature;

    return payload;
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
