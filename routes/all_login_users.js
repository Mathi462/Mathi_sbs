const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const Admin = require('../models/all_login_user');
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


  router.post('/adminregister', (req, res, next) => {

    let newAdmin = new Admin
    ({ 

        storename       :   req.body.storename,
        username        :   req.body.username,
        email           :   req.body.email,
        password        :   req.body.password,
        firstname       :   req.body.firstname,
        lastname        :   req.body.lastname,
        address         :   req.body.address,
        status          :   req.body.status,
        shopowner       :   req.body.shopowner,
        bname           :   req.body.bname,
        shop_num        :   req.body.shop_num,
        sname           :   req.body.sname,
        gst_num         :   req.body.gst_num,
        shop_logo       :   req.body.shop_logo,
        pan_num         :   req.body.pan_num,
        phone1          :   req.body.phone1,
        phone2          :   req.body.phone2,
        user_type       :   req.body.user_type
    });
   

    Admin.addAdmin(newAdmin, (err, admin) => { 
      if(err){
        res.json({success: false , msg:err });

        

      } else {
        res.json({success: true , msg:'Admin registered'});

       

      }
    });

  });



// Authenticate
router.post('/authenticate', (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;

  Admin.getAdminByEmail(email, (err, admin) => {
    if(err) throw err;
    if(!admin){
      return res.json({success: false, msg: 'Admin not found'});
    }

    Admin.comparePassword(password, admin.password, (err, isMatch) => {
      if(err) throw err;
      if(isMatch){
        const token = jwt.sign(admin.toJSON(), config.secret, {
          expiresIn: 604800 // 1 week
        });

        res.json({
          success: true,
          token: 'JWT '+token,
          admin: {
            id              : admin._id,
            storename       :   admin.storename,
            username        :   admin.username,
            email           :   admin.email,
            password        :   admin.password,
            firstname       :   admin.firstname,
            lastname        :   admin.lastname,
            address         :   admin.address,
            status          :   admin.status,
            shopowner       :   admin.shopowner,
            bname           :   admin.bname,
            shop_num        :   admin.shop_num,
            sname           :   admin.sname,
            gst_num         :   admin.gst_num,
            shop_logo       :   admin.shop_logo,
            pan_num         :   admin.pan_num,
            phone1          :   admin.phone1,
            phone2          :   admin.phone2,
            user_type       :   admin.user_type,
            first_time_login: admin.first_time_login

          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    });
  });
});

router.put('/adminregister/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newAdmin = {
     storename:req.body.storename,
      username: req.body.username,
      password: req.body.password,
      firstname : req.body.firstname,
      lastname : req.body.lastname,
      address : req.body.address,
      email : req.body.email,
      mobile_no : req.body.mobile_no,
      status : req.body.status

    };
    Admin.findByIdAndUpdate(req.params.id, { $set: newAdmin }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Admin'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Admin'});

        }
    });
});



router.get('/adminregister', (req, res,next) => {
  Admin.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});

router.delete('/adminregister/:id', (req, res,next) => {

  Admin.findByIdAndRemove(req.params.id)
   .then(admins => {
       if(!admins) {
           return res.status(404).send({
               message: " Admin not found with id " + req.params.id
           });
       }
       res.send({message: "Admin deleted successfully!"});
   }).catch(err => {
       if(err.kind === 'ObjectId' || err.name === 'NotFound') {
           return res.status(404).send({
               message: "Admin not found with id " + req.params.id
           });
       }
       return res.status(500).send({
           message: "Could not delete Admin with id " + req.params.id
       });
   });

});

// change password

router.put('/adminchangepassword/:id', (req, res,next) => {
  if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    var newAdmin = {
      password: req.body.password,
      
    };

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(newAdmin.password, salt, (err, hash) => {
        if(err) throw err;
        newAdmin.password = hash;
        // newAdmin.save(callback);

        Admin.findByIdAndUpdate(req.params.id, { $set: newAdmin,first_time_login : true }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Admin'});
          }
          else
          {
  
            res.json({success: false, msg:'Failed to Update Admin'});
  
          }
      });

      });
    });


    
});

//Security Question

// router.put('/securityquestion/:id', (req, res, next) => {
//   if (!ObjectId.isValid(req.params.id))
//       return res.status(400).send(`No record with given id : ${req.params.id}`);

//       console.log(req.body)
//   var newAdmin = {
//     security_question: req.body
//   }
//   console.log(newAdmin)
//   Admin.findByIdAndUpdate(req.params.id, { $set: newAdmin ,first_time_login : true }, { new: true }, (err, doc) => {
//       if (!err) {
//           //res.send(doc);
//           res.json({ success: true, msg: 'successfully  Updated ' });
//       }
//       else {

//           res.json({ success: false, msg: err });

//       }
//   });
// });




// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({admin: req.admin});
});

module.exports = router;
