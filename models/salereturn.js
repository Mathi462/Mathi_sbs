const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Addorder Schema
const SalereturnSchema = mongoose.Schema({


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
  bracode: {
    type: String
  },
  product: {
    type: String
  },
  rate: {
    type: String
  },
  qty: {
    type: String
  },
  amount: {
    type: String
  },
 

  status: {
    type: String
  },

 
});

const Salereturn = module.exports = mongoose.model('Salereturn', SalereturnSchema);

module.exports.getSalereturnById = function (id, callback) {
  Salereturn.findById(id, callback);
}



