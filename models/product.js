const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Product Schema
const ProductSchema = mongoose.Schema({

  
//   ProductID : {
// type: String
//   },
  ProductName: {
type: String
  },
  ProductType: {
type: String
  }
});

const Product = module.exports = mongoose.model('Product', ProductSchema);

module.exports.getProductById = function(id, callback){
    Product.findById(id, callback);
}

module.exports.getProductByEmail = function(email, callback){
  const query = {email: email}
  Product.findOne(query, callback);
}

module.exports.addProduct = function(newProduct, callback){
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(newProduct.password, salt, (err, hash) => {
      if(err) throw err;
      newProduct.password = hash;
      newProduct.save(callback);
    });
  });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
  bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
    if(err) throw err;
    callback(null, isMatch);
  });
}
