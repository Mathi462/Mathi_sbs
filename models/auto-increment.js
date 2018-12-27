const mongoose = require('mongoose');
const config = require('../config/database');

// Admin Schema
const AdminSchema = mongoose.Schema({
  
    
        _id : {
            type: String,
            required: true
        },
        last_invoice_number : {
            type : Number,
            required : true
        }
    
});

const autoIncrement = module.exports = mongoose.model('auto-increment', AdminSchema);
