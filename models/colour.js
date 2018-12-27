const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Colour Schema
const ColourSchema = mongoose.Schema({

  //   ColourID : {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
  ColourName: {
    type: String
  },
  Status:
  {
    type:String
  },

 
});

const Colour = module.exports = mongoose.model('Colour', ColourSchema);

module.exports.getColourById = function(id, callback){
    Colour.findById(id, callback);
}


