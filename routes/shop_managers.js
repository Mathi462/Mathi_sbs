const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Shopmanager = require('../models/shop_manager');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Register


router.post('/shop_manager', (req, res,next) => {

  let newShopmanager = new Shopmanager({
   
    shopownerid:req.body.shopownerid,
    branchname:req.body.branchname, 
    firstname:req.body.firstname,
    lastname:req.body.lastname,
    emptype:req.body.emptype,
    dob:req.body.dob,
    age:req.body.age,
    phone:req.body.phone,
    email:req.body.email,
    // password:req.body.password,
    pancard:req.body.pancard,
    aadhaarcard:req.body.aadhaarcard,
    driving_license:req.body.driving_license,
    doj:req.body.doj,
    previous_employment:req.body.previous_employment,
    previous_employment_address:req.body.previous_employment_address,
    previous_employment_mobile:req.body.previous_employment_mobile  
   });
  newShopmanager.save()
    .then(data => {
       // res.send(data);
       res.json({success: true, msg:'Shopmanager registered'});
    }).catch(err => {
      res.json({success: false, msg:err});
    });

});



// // Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   Shopmanager.getShopmanagerByEmail(email, (err, shopmanager) => {
//     if(err) throw err;
//     if(!shopmanager){
//       return res.json({success: false, msg: 'shopmanager not found'});
//     }

//     Shopmanager.comparePassword(password, shopmanager.password, (err, isMatch) => {
//       if(err) throw err;
//       if(isMatch){
//         const token = jwt.sign(admin.toJSON(), config.secret, {
//           expiresIn: 604800 // 1 week
//         });

//         res.json({
//           success: true,
//           token: 'JWT '+token,
//           shopmanager: {
//             id: admin._id,
//             email: admin.email,
          

//           }
//         });
//       } else {
//         return res.json({success: false, msg: 'Wrong password'});
//       }
//     });
//   });
// });

router.put('/shop_manager/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newShopmanager = {
    
      shopownerid:req.body.shopownerid,
      branchname:req.body.branchname, 
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      emptype:req.body.emptype,
      dob:req.body.dob,
      age:req.body.age,
      phone:req.body.phone,
      email:req.body.email,
      // password:req.body.password,
      pancard:req.body.pancard,
      aadhaarcard:req.body.aadhaarcard,
      driving_license:req.body.driving_license,
      doj:req.body.doj,
      previous_employment:req.body.previous_employment,
      previous_employment_address:req.body.previous_employment_address,
      previous_employment_mobile:req.body.previous_employment_mobile
    };
    Shopmanager.findByIdAndUpdate(req.params.id, { $set: newShopmanager }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Shopmanager'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Shopmanager'});

        }
    });
});



router.get('/shop_manager', (req, res,next) => {
  Shopmanager.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});

router.delete('/shop_manager/:id', (req, res,next) => {

  Shopmanager.findByIdAndRemove(req.params.id)
   .then(shopmanagers => {
       if(!shopmanagers) {
           return res.status(404).send({
               message: " shopmanagers not found with id " + req.params.id
           });
       }
       res.send({message: "shopmanagers deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "shopmanagers not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete shopmanagers with id " + req.params.id
       });
   });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({shopmanager: req.shopmanager});
});

module.exports = router;
