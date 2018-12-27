const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Service Schema
const ServiceSchema = mongoose.Schema({

  //  ServiceID : {
  //   type: String
  //   },
    ProductModelnum: {
    type: String
    },
    ProductBrandname : {
    type: String
    },
    CustmerName: {
     type: String
    },
    CustmerContact: {
    type: String
    },
    JOBNum: {
    type: String
    }, 
    others: {
    type: String
    },
    deliverydate: {
     type: Date
        },
     status: {
      type: String
      }
  
  
});


const Service = module.exports = mongoose.model('Service', ServiceSchema);
module.exports.getServiceById = function(id, callback){
      Service.findById(id, callback);
  }
  
  module.exports.getServiceByEmail = function(email, callback){
    const query = {email: email}
    Service.findOne(query, callback);
  }
  
  module.exports.addService = function(newService, callback){
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newService.password, salt, (err, hash) => {
        if(err) throw err;
        newService.password = hash;
        newService.save(callback);
      });
    });
  }
  
  module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
      if(err) throw err;
      callback(null, isMatch);
    });
  }