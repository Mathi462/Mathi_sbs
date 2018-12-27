const express = require('express');
const router = express.Router();
const Purchasereturn = require('../models/purchasereturn');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/purchasereturn', (req, res,next) => {

    let newPurchasereturn = new Purchasereturn({
     
        VoucherID : req.body.VoucherID,
        DealerName : req.body.DealerName,
        DealerContact : req.body.DealerContact,
        Brandname : req.body.Brandname,
        Modelnum : req.body.Modelnum,
        Purchasedate:req.body.Purchasedate,
        Returndate : req.body.Returndate,
        Description : req.body.Description,
        status : req.body.status
  
     });
    newPurchasereturn.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Purchasereturn registered'});
      }).catch(err => {
        res.json({success: false, msg:'Purchasereturn registered Failed'});
      });

  });

  router.get('/purchasereturn', (req, res,next) => {
    Purchasereturn.find()
    .then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Admin."
        });
    });
});


// Delete
  router.delete('/purchasereturn/:id', (req, res,next) => {

    Purchasereturn.findByIdAndRemove(req.params.id)
      .then(purchasereturn => {
          if(!purchasereturn) {
              return res.status(404).send({
                  message: " Purchasereturn not found with id " + req.params.id
              });
          }
          res.send({message: "Purchasereturn deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Purchasereturn not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Purchasereturn with id " + req.params.id
          });
      });

  });

  // Update

  router.put('/purchasereturn/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newPurchasereturn = {
        VoucherID : req.body.VoucherID,
        DealerName : req.body.DealerName,
        DealerContact : req.body.DealerContact,
        Brandname : req.body.Brandname,
        Modelnum : req.body.Modelnum,
        Purchasedate : req.body.Purchasedate,
        Returndate : req.body.Returndate,
        Description : req.body.Description,
        status : req.body.status
      };
      Purchasereturn.findByIdAndUpdate(req.params._id, { $set: newPurchasereturn }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Purchasereturn'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Purchasereturn'});

          }
      });
  });

// //   // Profile
// router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
//     res.json({salereturn: req.salereturn});
//   });
  
  module.exports = router;