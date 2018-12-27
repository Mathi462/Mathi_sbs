const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const BillingSchema = mongoose.Schema({

    invoiceno : {
        type: String
      },
      barcode : {
        type: String
      },
      firstname : {
        type: String
      },
      lastname : {
        type: String
      },
      phone : {
        type: String
      },
      address : {
        type: String
      },
      branch_name : {
        type: String
      },
      branch_address : {
        type: String
      },
      model_no : {
        type: String
      },
      brand_name : {
        type: String
      },
     
      product_price : {
        type: String
      },
      price_discount : {
        type: String
      },
      gst : {
        type: String
      },
      pay_amount : {
        type: String
      },
      date : {
        type: String
      },
      salesperson_name : {
        type: String
      },


});

const Billing = module.exports = mongoose.model('Billing', BillingSchema);

module.exports.getBillingById = function(id, callback){
    Billing.findById(id, callback);
}

module.exports.getBillingByEmail = function(email, callback){
  const query = {email: email}
  Billing.findOne(query, callback);
}

module.exports.addBilling = function(newBilling, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newBilling.password, salt, (err, hash) => {
      if(err) throw err;
      newBilling.password = hash;
      newBilling.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}