// const mongoose = require('mongoose');
// const bcrypt = require('bcryptjs');
// const config = require('../config/database');

// // Admin Schema
// const AdminSchema = mongoose.Schema({
  
//  storename: {
//     type: String
//   },
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true
//   },
//   firstname: {
//     type: String
// },
// lastname:{
//     type:String
// },
// address: {
//     type: String,
    
// },
// email: {
//     type: String,
//     required: true
// },
// mobile_no: {
//     type: String,
// },
// status:{
//     type: String
// },

// first_time_login: {
//   type: Boolean,
//   default: false
// }
// });

// const Admin = module.exports = mongoose.model('Admin', AdminSchema);

// module.exports.getAdminById = function(id, callback){
//   Admin.findById(id, callback);
// }

// module.exports.getAdminByEmail = function(email, callback){
//   const query = {email: email}
//   Admin.findOne(query, callback);
// }

// module.exports.addAdmin = function(newAdmin, callback){
//   bcrypt.genSalt(10, (err, salt) => {
//     bcrypt.hash(newAdmin.password, salt, (err, hash) => {
//       if(err) throw err;
//       newAdmin.password = hash;
//       newAdmin.save(callback);
//     });
//   });
// }

// module.exports.comparePassword = function(candidatePassword, hash, callback){
//   bcrypt.compare(candidatePassword, hash, (err, isMatch) => {
//     if(err) throw err;
//     callback(null, isMatch);
//   });
// }
