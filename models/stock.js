const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const StockSchema = mongoose.Schema({

  
  // stockid : {
  //   type: String
  // },
  model_name: {
    type: String,
    // required: true
  },
 
  brand_name:{
    type: String,
    // required: true
  },
  category_type:{
    type: String,
    // required: true
  },
  ManufacturerName:{
    type: String,
    // required: true
  },

  quantity:{
    type: String,
    required: true
  },
  dp:{
    type: String,
    required: true
  },
  lp:{
    type: String,
    required: true
  },
  sp:{
    type: String,
    required: true
  },
  cp:{
    type: String,
    required: true
  },
  stock_status:{
    type: String,
    required: true
  },
  cgst:{
    type: String,
    required: true
  },
  sgst:
  {
    type: String ,
    required: true
  },
  branch:{
    type: String,
    required: true
  },
  add_date:{
    type: String,
    required: true
  },
  remarks:{
    type: String,
    required: true
  },
  
   
    battery_no: String,
    color: String,
    add_barcode: String,
    imei1: String,
    imei2: String,
    stock_visible: String
    


  
  // movestockdetails:[{

  // }]

});

const Stock = module.exports = mongoose.model('Stock', StockSchema);

module.exports.getStockyById = function(id, callback){
    Stock.findById(id, callback);
}

module.exports.getStockByEmail = function(email, callback){
  const query = {email: email}
  Stock.findOne(query, callback);
}

module.exports.addStock = function(newStock, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newStock.password, salt, (err, hash) => {
      if(err) throw err;
      newStock.password = hash;
      newStock.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}