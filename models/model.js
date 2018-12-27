const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Branch Schema
const ModelSchema = mongoose.Schema({

  
  voucher_id: {
    type: String
  },
  model_num: {
    type: String
  },
  model_name: {
    type: String
  },
  date: {
    type: String
  }
  
});

const Model = module.exports = mongoose.model('Model', ModelSchema);

