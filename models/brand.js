const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Brand Schema
const BrandSchema = mongoose.Schema({

  
 
  BrandName: {
    type: String
  },
 
Status:{
    type: String
  },
  
});

const Brand = module.exports = mongoose.model('Brand', BrandSchema);

module.exports.getBrandById = function(id, callback){
    Brand.findById(id, callback);
}

module.exports.getBrandByEmail = function(email, callback){
  const query = {email: email}
  Brand.findOne(query, callback);
}

module.exports.addBrand = function(newBrand, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newBrand.password, salt, (err, hash) => {
      if(err) throw err;
      newBrand.password = hash;
      newBrand.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
