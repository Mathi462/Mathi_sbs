const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Salesmanager = require('../models/sales_manager');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Register


  router.post('/salesmanager', (req, res, next) => {

    let newSalesmanager = new Salesmanager({


        id:req.body.id,
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
       
        phone:req.body.phone,
        address:req.body.address,
        pancard:req.body.pancard,
        aadhaarcard:req.body.aadhaarcard,
        driving_license:req.body.driving_license,
        previous_employment:req.body.previous_employment,
        previous_employment_address:req.body.previous_employment_address,
        previous_employment_mobile:req.body.previous_employment_mobile
      

    });
   
    Salesmanager.addSalesmanager(newSalesmanager, (err, admin) => { 
      if(err){
        res.json({success: false , msg:'Failed to register Salesmanager'});

        

      } else {
        res.json({success: true , msg:'Salesmanager registered'});
    


      }
    });

  });



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Salesmanager.getSalesmanagerByEmail(email, (err, salesmanager) => {
    if(err) throw err;
    if(!salesmanager){
      return res.json({success: false, msg: 'salesmanager not found'});
    }

    Salesmanager.comparePassword(password, salesmanager.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          salesmanager: {
            id: admin._id,
            email: admin.email,
          

          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.put('/salesmanager/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newSalesmanager = {
        id:req.body.id,
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
       
        phone:req.body.phone,
        address:req.body.address,
        pancard:req.body.pancard,
        aadhaarcard:req.body.aadhaarcard,
        driving_license:req.body.driving_license,
        previous_employment:req.body.previous_employment,
        previous_employment_address:req.body.previous_employment_address,
        previous_employment_mobile:req.body.previous_employment_mobile
    };
    Salesmanager.findByIdAndUpdate(req.params.id, { $set: newSalesmanager }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Salesmanager'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Salesmanager'});

        }
    });
});



router.get('/salesmanager', (req, res,next) => {
  Salesmanager.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});

router.delete('/salesmanager/:id', (req, res,next) => {

  Salesmanager.findByIdAndRemove(req.params.id)
   .then(salesmanagers => {
       if(!salesmanagers) {
           return res.status(404).send({
               message: " salesmanagers not found with id " + req.params.id
           });
       }
       res.send({message: "salesmanagers deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "salesmanagers not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete salesmanagers with id " + req.params.id
       });
   });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({salesmanager: req.salesmanager});
});

module.exports = router;
