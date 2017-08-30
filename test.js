'use strict';

const Client = require('./lib/client');
const checkeeper = new Client({
  secretKey: '',
  token: ''
});

const bankLookUpPayload = {
  "country": "US",
  "routingNumber": "011100915"
};

const checkStatusPayload = {
  "checkId": "sCOrlJiwfAjokyfjtBGu"
};

const checkCreatePayload = {
  "amount": "5,320.00",
  "date": "2015-01-19",
  "checkNumber": "37285",
  "bankRouting": "012345678",
  "bankAccount": "938763720122",
  "memo": "Widget supply order",
  "note": "15 hours",
  "returnPdf": true,
  "pdfBackground" : true,
  "test": true,
  "payer": {
    "name": "Widgets Inc.",
    "address": {
      "line1": "827 Random Street",
      "line2": "Suite 102"
    },
    "city": "Anytown",
    "state": "NY",
    "zip": "14850",
    "signer": "John Hancock"
  },
  "payee": {
    "name": "Bob's Supplies",
    "address": {
      "line1": "114 Project Lane"
    },
    "city": "Tinkertown",
    "state": "CA",
    "zip": "90210"
  }
};

checkeeper
  .createCheck(checkCreatePayload)
  .then(data=>{
    if(data.success) {
      console.log('Check found');
    } else {
      return Promise.reject(data);
    }
  })
  .catch(error=>{
    console.error(error);
  });

checkeeper
  .checkStatus(checkStatusPayload)
  .then(data=>{
    if(data.success) {
      console.log('Check found');
    } else {
      return Promise.reject(data);
    }
  })
  .catch(error=>{
    console.error(error);
  });

checkeeper
  .bankLookup(bankLookUpPayload)
  .then(data=>{
    if(data.success) {
      console.log('Bank found');
    } else {
      return Promise.reject(data);
    }
  })
  .catch(error=>{
    console.error(error);
  });

checkeeper
  .accountInfo()
  .then(data=>{
    if(data.success) {
      console.log('Account found');
    } else {
      return Promise.reject(data);
    }
  })
  .catch(error=>{
    console.error(error);
  });


