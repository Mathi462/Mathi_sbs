const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Addorder Schema
const AsseSchema = mongoose.Schema({


  model_name: {
    type: String
  },
  brand_name: {
    type: String
  },
  category_type: {
    type: String
  },
  quantity: {
    type: String
  },
  dp: {
    type: String,
  },
  lp: {
    type: String,
  },
  sp: {
    type: String
  },
  cp: {
    type: String
  },
  stock_status: {
    type: String
  },
  cgst: {
    type: String
  },
  sgst: {
    type: String
  },
 
  branch: {
    type: String
  },
  remarks: {
    type: String
  },

  
  productdetails: [{
    add_barcode: String,
    battery_no: String,
    color: String,
    stock_visible: String,
    otherno: String,    
    typeon:String,
    


  }]
});

const Asse = module.exports = mongoose.model('Asse', AsseSchema);

module.exports.getAsseById = function (id, callback) {
  Asse.findById(id, callback);
}



