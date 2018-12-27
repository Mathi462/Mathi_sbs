const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Salesperson = require('../models/salesperson');
var ObjectId = require('mongodb').ObjectID;
var nodemailer = require('nodemailer');

// Register


  router.post('/salesperson', (req, res, next) => {

    let newSalesperson = new Salesperson({


       shopownerid:req.body.shopownerid,
       shopmanager:req.body.shopmanager,
      //  branch:req.body.branch,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        emp_type:req.body.emp_type,
        dob:req.body.dob,
        age:req.body.age,
        phone:req.body.phone,
        email:req.body.email,
        password:req.body.password,
        pancard:req.body.pancard,
        aadhaarcard:req.body.aadhaarcard,
        driving_license:req.body.driving_license,
        doj:req.body.doj,
        previous_employment:req.body.previous_employment,
        previous_employment_address:req.body.previous_employment_address,
        previous_employment_mobile:req.body.previous_employment_mobile
        
      

    });
    newSalesperson.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Salesperson registered'});
      }).catch(err => {
        res.json({success: false, msg:'Salesperson registered Failed'});
      });

  });

  // Get all data

  router.get('/salesperson', (req, res,next) => {
    Salesperson.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

  // // Delete
  // router.delete('/salesperson/:id', (req, res,next) => {

  //   Salesperson.findByIdAndRemove(req.params.id)
  //     .then(salespersons => {
  //         if(!salespersons) {
  //             return res.status(404).send({
  //                 message: " Salesperson not found with id " + req.params.id
  //             });
  //         }
  //         res.send({message: "Salesperson deleted successfully!"});
  //     }).catch(err => {
  //         if(err.kind === 'ObjectId' || err.name === 'NotFound') {
  //             return res.status(404).send({
  //                 message: "Salesperson not found with id " + req.params.id
  //             });
  //         }
  //         return res.status(500).send({
  //             message: "Could not delete Salesperson with id " + req.params.id
  //         });
  //     });

  // });

   
    // Salesperson.addSalesperson(newSalesperson, (err, admin) => { 
    //   if(err){
    //     res.json({success: false , msg:'Failed to register Salesperson'});

        

    //   } else {
    //     res.json({success: true , msg:'Salesperson registered'});
    


    //   }
    // });





// // Authenticate
// router.post('/authenticate', (req, res, next) => {
//   const email = req.body.email;
//   const password = req.body.password;

//   Salesperson.getSalespersonByEmail(email, (err, salesperson) => {
//     if(err) throw err;
//     if(!salesperson){
//       return res.json({success: false, msg: 'salesperson not found'});
//     }

//     Salesperson.comparePassword(password, salesperson.password, (err, isMatch) => {
//       if(err) throw err;
//       if(isMatch){
//         const token = jwt.sign(admin.toJSON(), config.secret, {
//           expiresIn: 604800 // 1 week
//         });

//         res.json({
//           success: true,
//           token: 'JWT '+token,
//           salesperson: {
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

router.put('/salesperson/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newSalesperson = {

      shopownerid:req.body.shopownerid,
      shopmanager:req.body.shopmanager,
      // branch:req.body.branch,
      firstname:req.body.firstname,
      lastname:req.body.lastname,
      emp_type:req.body.emp_type,
      dob:req.body.dob,
      age:req.body.age,
      phone:req.body.phone,
      email:req.body.email,
      password:req.body.password,
      pancard:req.body.pancard,
      aadhaarcard:req.body.aadhaarcard,
      driving_license:req.body.driving_license,
      doj:req.body.doj,
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



//  // Get by Id 

//  router.get('/salesperson/:id', (req, res,next) => {
//   if (!ObjectId.isValid(req.params.id))
//       return res.status(400).send(`No record with given id : ${req.params.id}`);

//       Salesperson.findById(req.params.id, (err, doc) => {
//       if (!err) { res.send(doc); }
//       else { console.log('Error in Retriving Salesperson :' + JSON.stringify(err, undefined, 2)); }
//   });
// });

router.delete('/salesperson/:id', (req, res,next) => {

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


// // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//   res.json({salesperson: req.salesperson});
// });

module.exports = router;
