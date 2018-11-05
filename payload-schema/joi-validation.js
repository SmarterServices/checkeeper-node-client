'use strict';

const joi = require('joi');
const omit = require('lodash.omit');

const address = {
  line1: joi
    .string()
    .required()
    .description('Street address line 1 of entity writing the check'),
  line2: joi
    .string()
    .optional()
    .description('	Street address line 2 of entity writing the check')
};
const payer = {
  name: joi
    .string()
    .required()
    .description('Name or business of entity writing the checks'),
  address: joi
    .array()
    .items(address)
    .single()
    .min(1)
    .required()
    .description('Address of payer'),
  city: joi
    .string()
    .required()
    .description('U.S. city of entity writing the check'),
  state: joi
    .string()
    .required()
    .description('U.S. State of entity writing the check'),
  zip: joi
    .alternatives()
    .try(
      joi
        .string()
        .length(5),
      joi
        .string()
        .length(9)
    )
    .required()
    .description('5 or 9-digit U.S. zip code'),
  signer: joi
    .string()
    .optional()
    .description('Name to appear on \'authorized signature\' line. Either signer or signer_image is required'),
  signerImage: joi
    .string()
    .optional()
    .description('base64 encoded PNG or GIF with transparent background, used as the signiture. Either signer or signer_image is required')
};
const payee = omit(payer, ['signer', 'signerImage']);


const joiSchema = {
  checkCreate: joi
    .object()
    .keys({
      amount: joi
        .string()
        .required()
        .description('Numeric value of check. No currency signs'),
      date: joi
        .date()
        .optional()
        .description('If no date is set, the current date will be used'),
      checkNumber: joi
        .string()
        .required()
        .description('Number used for check'),
      bankRouting: joi
        .string()
        .regex(/[0-9]{9}/, '9-digit ABA routing number')
        .length(9)
        .required()
        .description('9-digit ABA routing number'),
      bankAccount: joi
        .string()
        .required()
        .description('bank account number associated with routing number'),
      memo: joi
        .string()
        .max(50)
        .optional()
        .description('Optional memo message for the check'),
      note: joi
        .string()
        .optional()
        .description('Optional note for the check. Field will automatically wrap on the check stub. Use \n to manually force a line break'),
      returnPdf: joi
        .boolean()
        .optional()
        .description('Whether a pdf of the check to be returned'),
      pdfBackground: joi
        .boolean()
        .optional()
        .description('Whether the pdf to have a background'),
      test: joi
        .boolean()
        .optional()
        .description('If this is a test transaction'),
      voidAfter: joi
        .number()
        .integer()
        .min(0)
        .optional()
        .description('Will print a line under the amount, "Void After x Days"'),
      payer: joi
        .array()
        .items(payer)
        .single()
        .min(1)
        .required()
        .description('The entity writing the check'),
      payee: joi
        .array()
        .items(payee)
        .single()
        .min(1)
        .required()
        .description('The entity receiving the check')
    })
    .required()
    .description('Payload schema for create check'),
  checkStatus: joi
    .object()
    .keys({
      checkId: joi
        .string()
        .required()
        .description('Check ID that was returned during the create check')
    })
    .required()
    .description('Payload schema for check status'),
  bankLookup: joi
    .object()
    .keys({
      country: joi
        .string()
        .valid('US', 'CA')
        .required()
        .description('The country code the bank is in. Valid options are "US" and "CA"'),
      routingNumber: joi
        .string()
        .when('country', {is: 'US', then: joi.required()})
        .description('Routing number of the bank in the US (Required when country = "US")'),
      institution: joi
        .string()
        .when('country', {is: 'CA', then: joi.required()})
        .description('Institution number of the bank in Canada (Required when country = "CA")'),
      branch: joi
        .string()
        .when('country', {is: 'CA', then: joi.required()})
        .description('Branch number of the bank in Canada (Required when country = "CA")')
    })
    .required()
    .description('Payload schema for bank lookup'),
  accountInfo: joi
    .any()
    .required()
    .description('Payload schema for account information')
};


module.exports = joiSchema;
