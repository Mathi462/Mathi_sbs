const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Addorder Schema
const EditreturnSchema = mongoose.Schema({


  invoice: {
    type: String
  },
  orderdate: {
    type: String
  },
  orderid: {
    type: String
  },
  custmername: {
    type: String
  },
  custmeraddress: {
    type: String,
  },
  custmerphone: {
    type: String,
  },
  
  productdetails: [{
    barcode: String,
    product: String,
    rate: String,
    qty: String,
    gst: String,
    gstrpe:String,
    amount: String


  }]
});

 


const Editreturn = module.exports = mongoose.model('Editreturn', EditreturnSchema);

module.exports.getEditreturnById = function (id, callback) {
  Editreturn.findById(id, callback);
}


