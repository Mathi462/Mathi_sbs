const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const SalesmanagerSchema = mongoose.Schema({

    id: {
        type: String,
        required: true,
        unique: true

    },
    name: {
        type: String
    },
    dob:{
        type:String
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
 
    phone: {
        type: String,
    },
    address: {
        type: String
    },
    pancard: {
        type: String
    },
    aadhaarcard: {
        type: String
    },
    driving_license:{
        type: String
    },
    previous_employment:{
        type: String
    },
    previous_employment_address:{
        type: String
    },
    previous_employment_mobile:{
        type: String
    }

});

const Salesmanager = module.exports = mongoose.model('Salesmanager', SalesmanagerSchema);

module.exports.getSalesmanagerById = function(id, callback){
    Salesmanager.findById(id, callback);
}

module.exports.getSalesmanagerByEmail = function(email, callback){
  const query = {email: email}
  Salesmanager.findOne(query, callback);
}

module.exports.addSalesmanager = function(newSalesmanager, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newSalesmanager.password, salt, (err, hash) => {
      if(err) throw err;
      newSalesmanager.password = hash;
      newSalesmanager.save(callback);
    });
  });
}

