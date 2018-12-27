const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Manufacturer Schema
const ManufacturerSchema = mongoose.Schema({

   
  ManufacturerName: {
    type: String
  },
  Status: {
    type: String
  }
 
});

const Manufacturer = module.exports = mongoose.model('Manufacturer', ManufacturerSchema);

module.exports.getManufacturerById = function(id, callback){
    Manufacturer.findById(id, callback);
}


