const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var autoIncrement = require('mongoose-auto-increment');
var connection = mongoose.createConnection("mongodb://localhost:27017/sbs");


autoIncrement.initialize(connection);

// Addorder Schema
const AddorderSchema = mongoose.Schema({

  invoice: {
    type: Number
  },
  orderdate: {
    type: String
  },
  branchname: {
    type: String
  },
  custmername: {
    type: String
  },
  custmeremail: {
    type: String,
  },
  custmerphone: {
    type: String,
  },
  subtotal: {
    type: String
  },
  cgst: {
    type: String
  },
  sgst: {
    type: String
  },
  totalamount: {
    type: String
  },
  discount: {
    type: String
  },

  paid: {
    type: String
  },
  balance: {
    type: String
  },

  paymentstatus: {
    type: String
  },
  paymenttype: {
    type: String
  },
  salesperson: {
    type: String
  },
  message: {
    type: String
  },
  invoice_no: {
    type: String
  },
  productdetails: [{
    barcode: String,
    product: String,
    rate: String,
    qty: String,
    dis: String,
    gst: String,
    amount: String


  }]
});
AddorderSchema.plugin(autoIncrement.plugin, { model: 'Addorder', field: 'invoice' });

const Addorder = module.exports = connection.model('Addorder', AddorderSchema);

module.exports.getAddorderById = function (id, callback) {
  Addorder.findById(id, callback);
}



