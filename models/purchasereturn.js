const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Service Schema
const PurchasereturnSchema = mongoose.Schema({

    VoucherID : {
    type: String
    },
    DealerName: {
        type: String
       },
    DealerContact: {
       type: String
       },
    Brandname : {
        type: String
        },
    Modelnum: {
    type: String
    },
    Purchasedate : {
        type: String
        },
    Returndate: {
     type: String
     },
     Description: {
        type: String
        },
    status: {
      type: String
      }
  
  
});


const Purchasereturn = module.exports = mongoose.model('Purchasereturn', PurchasereturnSchema);

module.exports.getPurchasereturnById = function(id, callback){
    Purchasereturn.findById(id, callback);
}

module.exports.getPurchasereturnByEmail = function(email, callback){
  const query = {email: email}
  Purchasereturn.findOne(query, callback);
}

module.exports.addPurchasereturn = function(newPurchasereturn, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newPurchasereturn.password, salt, (err, hash) => {
      if(err) throw err;
      newPurchasereturn.password = hash;
      newPurchasereturn.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
