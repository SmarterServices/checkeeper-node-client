'use strict';

const crypto = require('crypto');
const snakeCaseKeys = require('snakecase-keys');

module.exports = {
  /**
   * Replace all boolean values to desired value
   * @param {Object} obj - Object to convert
   * @param {Any} trueVal - Value to use for 'true' values
   * @param {Any} falseVal - Value to use for 'false' values
   */
  boolConversion: function boolConversion(obj, trueVal, falseVal) {

    for (let key in obj) {
      if (obj[key] === true) {
        obj[key] = trueVal;
      } else if (obj[key] === false) {
        obj[key] = falseVal;
      } else if (typeof obj[key] === 'object') {
        boolConversion(obj[key], trueVal, falseVal);
      }
    }
  },
  /**
   * Create hash hmac signature for provided string
   * @param {string} str - Input string
   * @param {string} key - Possibly secret key
   */
  createSignature: function createSignature(str, key) {
    return crypto.createHmac('sha256', key).update(str).digest('base64');
  },
  /**
   * Encode an array of object according to RFC 3986
   * Spaces are to be encoded as "+" and NOT "%20"
   * @param {Array<Object>} dataArray - Input array
   * @param {string} prefix - Prefix that is used if content is in sub-array
   * @returns {string}
   */
  encodeURI: function encodeURI(dataArray, prefix) {
    let result = '';

    for (let item of dataArray) {
      let key = Object.keys(item)[0];
      let val = item[key];
      let encodedItem = '';

      if (Array.isArray(val)) {
        // It is a nested array,
        // encode it recursively with key as prefix
        if(prefix) {
          encodedItem +=  encodeURI(val, `${prefix}[${key}]`);
        } else {
          encodedItem += encodeURI(val, key);
        }

      }
      else if (prefix) {
        encodedItem += escape(`${prefix}[${key}]`) + '=' + escape(val);
      } else {
        encodedItem += escape(`${key}`) + '=' + escape(val);
      }

      if (result.length !== 0) {
        // use '&' is this is not the first item
        result += '&';
      }

      result += encodedItem;

    }

    // replace 'space' encoding with '+'
    return result.replace(/%20/g, '+');
  },

  keyToSnakeCase: function keyToSnakeCase(obj) {
    return snakeCaseKeys(obj);
  },
  /**
   * Sorts an array of object lexicographically
   * Capital letters come before lower-case ones
   * Sorting also done in nested array
   * @param {Array<Object>} dataArray
   */
  keySort: function keySort(dataArray) {
    dataArray.sort((dataA, dataB) => {
      let keyA = Object.keys(dataA)[0];
      let keyB = Object.keys(dataB)[0];

      if (Array.isArray(dataA[keyA])) {
        // recursive sorting
        keySort(dataA[keyA]);
      }

      if (Array.isArray(dataB[keyB])) {
        // recursive sorting
        keySort(dataB[keyB]);
      }

      return keyA.localeCompare(keyB);
    });
  },
  /**
   * Converts and object to array of objects with {key:value} pair
   * Nested objects are converted too
   * Also removes null and undefined valued properties
   * @param {Object} obj
   * @returns {Array}
   */
  objectToArray: function objectToArray(obj) {
    let result = [];

    for (let key in obj) {
      let val = obj[key];
      let item = {};

      if (typeof val === 'object') {
        // converts recursively
        item[key] = objectToArray(val);
      } else if (val !== null && typeof val !== 'undefined') {
        // take only proper valued properties
        item[key] = val;
      }

      result.push(item);
    }

    return result;
  }
};
