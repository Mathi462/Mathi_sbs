const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const MovestockSchema = mongoose.Schema({

  
  from_branch:{ type:String },
  to_branch:{ type:String },
  model_name: {   type: String },
  brand_name: {   type: String },
  category_type: { type: String },
  ManufacturerName: { type: String },
  dp: { type: String },
  lp: { type: String },
  sp: { type: String },
  cp: { type: String },
  cgst: { type: String },
  sgst: { type: String },
  productdetails: [{
    battery_no: String,
    color: String,
    add_barcode: String,
    imei1: String,
    imei2: String
    


  }],
  // movestockdetails:[{

  // }]

});

const Movestock = module.exports = mongoose.model('Movestock', MovestockSchema);

module.exports.getStockyById = function(id, callback){
    Movestock.findById(id, callback);
}

module.exports.getStockByEmail = function(email, callback){
  const query = {email: email}
  Movestock.findOne(query, callback);
}

module.exports.addStock = function(newMovestock, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newMovestock.password, salt, (err, hash) => {
      if(err) throw err;
      newMovestock.password = hash;
      newMovestock.save(callback);
    });
  });
}

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }