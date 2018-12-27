const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const CategorySchema = mongoose.Schema({

  
  // CategoryID : {
  //   type: String
  // },
  CategoryType: {
    type: String
  },
 
  Status:{
    type: String
  },
  
});

const Category = module.exports = mongoose.model('Category', CategorySchema);

module.exports.getCategoryById = function(id, callback){
    Category.findById(id, callback);
}

module.exports.getCategoryByEmail = function(email, callback){
  const query = {email: email}
  Category.findOne(query, callback);
}

module.exports.addCategory = function(newCategory, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newCategory.password, salt, (err, hash) => {
      if(err) throw err;
      newCategory.password = hash;
      newCategory.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
