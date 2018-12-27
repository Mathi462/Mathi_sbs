const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Branch = require('../models/branch');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');

const multer = require("multer");

var st = multer.diskStorage({
  destination: function (req, file, callback) {
      
      callback(null, "./public/logo");
  },
  filename: function (req, file, callback) {

      callback(null, file.originalname);

  }
});
var uploads = multer({ storage: st }).single("img");

// Image Upload

router.post('/imageupload', (req, res, next) => {

  
  uploads(req, res, function (err) {

        if (err) {
          res.send({ errs: "Somthing went err", mg: err });
        }
        else {

          res.send({ success: true, msg: "Success" });

      }


  })
});

// Register 
  router.post('/branch',(req,res,next) => {

    let newBranch = new Branch({
    // branchid:req.body.branchid,
    shopowner:req.body.shopowner,
    bname : req.body.bname,
    email : req.body.email,
    username:req.body.username,
    password:req.body.password,
    // shop_num : req.body.shop_num,
    sname : req.body.sname,
    address : req.body.address,
    gst_num : req.body.gst_num,
    shop_logo : req.body.shop_logo,
    pan_num : req.body.pan_num,
    phone1 : req.body.phone1,
    phone2 : req.body.phone2,
  
   
    
   
     });
     Branch.addBranch(newBranch, (err, branch) => { 
      if(err){
        res.json({success: false , msg:'Failed to register Branch'});

        

      } else {
        res.json({success: true , msg:'Branch registered'});

       

      }
    });

  });

  router.post('/authenticate', (req, res, next) => {
    const email = req.body.email;
    const password = req.body.password;
  
    Branch.getBranchByEmail(email, (err, branch) => {
      if(err) throw err;
      if(!branch){
        return res.json({success: false, msg: 'Franch not found'});
      }
  
      Branch.comparePassword(password, branch.password, (err, isMatch) => {
        if(err) throw err;
        if(isMatch){
          const token = jwt.sign(branch.toJSON(), config.secret, {
            expiresIn: 604800 // 1 week
          });
  
          res.json({
            success: true,
            token: 'JWT '+token,
            branch: {
              id: branch._id,
              bname: branch.bname,
              username: branch.username,
              shop_num: branch.shop_num,
              email: branch.email,
              sname: branch.sname,
              address: branch.address,
              gst_num: branch.gst_num,
              shop_logo: branch.shop_logo,
              pan_num: branch.pan_num,
              phone1: branch.phone1,
              phone2: branch.phone2,
              
              first_time_login: branch.first_time_login
            }
          });
        } else {
          return res.json({success: false, msg: 'Wrong password'});
        }
      });
    });
  });
  


  
//Security Question

// router.put('/securityquestion/:id', (req, res, next) => {
//     if (!ObjectId.isValid(req.params.id))
//         return res.status(400).send(`No record with given id : ${req.params.id}`);
  
//         // console.log(req.body)
//     var newFaculty = {
//       security_question: req.body
//     }
//     // console.log(newFaculty)
//     Faculty.findByIdAndUpdate(req.params.id, { $set: newFaculty,first_time_login : true }, { new: true }, (err, doc) => {
//         if (!err) {
//             //res.send(doc);
//             res.json({ success: true, msg: 'successfully  Updated ' });
//         }
//         else {
  
//             res.json({ success: false, msg: err });
  
//         }
//     });
//   });
  
  
  // change password
  
  router.put('/branchchangepassword/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record with given id : ${req.params.id}`);
  
      var newBranch = {
        password: req.body.password,
        
      };
  
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newBranch.password, salt, (err, hash) => {
          if(err) throw err;
          newBranch.password = hash;
          // newAdmin.save(callback);
  
          Branch.findByIdAndUpdate(req.params.id, { $set: newBranch, first_time_login : true }, { new: true }, (err, doc) => {
            if (!err)
            {
             //res.send(doc);
             res.json({success: true, msg:'successfully  Updated Password'});
            }
            else
            {
    
              res.json({success: false, msg:'Failed to Update Password'});
    
            }
        });
  
        });
      });
  
  
      
  });
  
  
  // Profile
  router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({branch: req.branch});
  });
  
  
  
  // Get all data

  router.get('/branch', (req, res,next) => {
    Branch.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/branch/:id', (req, res,next) => {

    Branch.findByIdAndRemove(req.params.id)
      .then(branchs => {
          if(!branchs) {
              return res.status(404).send({
                  message: " Branch not found with id " + req.params.id
              });
          }
          res.send({message: "Branch deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Branch not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Branch with id " + req.params.id
          });
      });

  });

  
  router.put('/branch/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newBranch = {
            // branchid:req.body.branchid,
            shopowner:req.body.shopowner,
            bname : req.body.bname,
            username:req.body.username,
            email : req.body.email,
            password:req.body.password,
            shop_num : req.body.shop_num,
            sname : req.body.sname,
            address : req.body.address,
            gst_num : req.body.gst_num,
            shop_logo : req.body.shop_logo,
            pan_num : req.body.pan_num,
            phone1 : req.body.phone1,
            phone2 : req.body.phone2,
           
          
        
            // shop_num : req.body.shop_num,
            // owner_id : req.body.owner_id
      };
      Branch.findByIdAndUpdate(req.params._id, { $set: newBranch }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Branch'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Branch'});

          }
      });
  });
  // Get by Id 

  router.get('/branch/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Branch.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
    });
});

router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
    res.json({branch: req.branch});
  });
  
// search 

  router.post('/search',(req, res,next) =>{
    var query={};

    Branch.findOne({bname: {$regex : ".*"+req.body.bname+".*"}}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Customer."
      });
  });

});


module.exports = router;