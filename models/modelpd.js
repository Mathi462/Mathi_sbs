const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// GSt Schema
const ModelpdSchema = mongoose.Schema({

  // ModelID : {
  //   type: String,
  //   required: true,
  //   unique: true
  // },
 
  ModelName: {
    type: String
  },
  Status: {
    type: String
  },
  BrandId:{
    type:String
  }
 
});

const Modelpd = module.exports = mongoose.model('Modelpd', ModelpdSchema);

module.exports.getModelpdById = function(id, callback){
  Modelpd.findById(id, callback);
}


