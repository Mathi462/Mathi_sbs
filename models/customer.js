const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Customer Schema
const CustomerSchema = mongoose.Schema({

  //   customerid : {
  //   type: String,
  //   // required: true,
  //   // unique: true
  // },
  customerfname: {
    type: String
  },
 
  customerphno: {
    type: String,
    required: true
  },
 
  customeremail: {
    type: String
  },
 
});

const Customer = module.exports = mongoose.model('Customer', CustomerSchema);

module.exports.getCustomerById = function(id, callback){
    Customer.findById(id, callback);
}


