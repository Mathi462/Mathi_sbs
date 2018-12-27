const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Salesperson = require('../models/sales_person');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Register


  router.post('/salesmanager', (req, res, next) => {

    let newSalesperson = new Salesperson({


        id:req.body.id,
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        address:req.body.address,
        pancard:req.body.pancard,
        aadhaarcard:req.body.aadhaarcard,
        driving_license:req.body.driving_license,
        previous_employment:req.body.previous_employment,
        previous_employment_address:req.body.previous_employment_address,
        previous_employment_mobile:req.body.previous_employment_mobile
      

    });
   
    Salesperson.addSalesperson(newSalesperson, (err, admin) => { 
      if(err){
        res.json({success: false , msg:'Failed to register Salesperson'});

        

      } else {
        res.json({success: true , msg:'Salesperson registered'});
    


      }
    });

  });



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Salesperson.getSalespersonByEmail(email, (err, salesperson) => {
    if(err) throw err;
    if(!salesperson){
      return res.json({success: false, msg: 'salesperson not found'});
    }

    Salesperson.comparePassword(password, salesperson.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          salesperson: {
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

    var newSalesperson = {
        id:req.body.id,
        name:req.body.name,
        dob:req.body.dob,
        email:req.body.email,
        password:req.body.password,
        phone:req.body.phone,
        address:req.body.address,
        pancard:req.body.pancard,
        aadhaarcard:req.body.aadhaarcard,
        driving_license:req.body.driving_license,
        previous_employment:req.body.previous_employment,
        previous_employment_address:req.body.previous_employment_address,
        previous_employment_mobile:req.body.previous_employment_mobile
    };
    Salesperson.findByIdAndUpdate(req.params.id, { $set: newSalesperson }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Salesperson'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Salesperson'});

        }
    });
});



router.get('/salesmanager', (req, res,next) => {
    Salesperson.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});

router.delete('/salesmanager/:id', (req, res,next) => {

    Salesperson.findByIdAndRemove(req.params.id)
   .then(salespersons => {
       if(!salespersons) {
           return res.status(404).send({
               message: " salespersons not found with id " + req.params.id
           });
       }
       res.send({message: "salespersons deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "salespersons not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete salespersons with id " + req.params.id
       });
   });

});


// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({salesperson: req.salesperson});
});

module.exports = router;
