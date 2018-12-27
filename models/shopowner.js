const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

const ShopownerSchema = mongoose.Schema({

    shopownerid: {
        type: String,
        required: true,
        unique: true

    },
    first_name: {
        type: String
    },
    last_name:{
        type:String
    },
    address: {
        type: String,
        
    },
    email: {
        type: String,
        required: true
    },
    mobile_no: {
        type: String,
        required: true
    },
   status:{
        type: String
    },

    branchid:{
        type: String,
        required: true
    },

    branch_name:{
        type: String,
        required: true
    }

});

const Shopowner = module.exports = mongoose.model('Shopowner', ShopownerSchema);

module.exports.getShopownerById = function(id, callback){
    Shopowner.findById(id, callback);
}

module.exports.getShopownerByEmail = function(email, callback){
  const query = {email: email}
  Shopowner.findOne(query, callback);
}

module.exports.addShopowner = function(newShopowner, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newShopowner.password, salt, (err, hash) => {
      if(err) throw err;
      newShopowner.password = hash;
      newShopowner.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}





