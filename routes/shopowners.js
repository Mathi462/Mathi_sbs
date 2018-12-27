const express = require('express');
const router = express.Router();
const Shopowner = require('../models/shopowner');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
  router.post('/shopowner',(req,res,next) => {

    let newShopowner = new Shopowner({
     
        shopownerid : req.body.shopownerid,
        first_name : req.body.first_name,
        last_name : req.body.last_name,
        address : req.body.address,
        email : req.body.email,
        mobile_no : req.body.mobile_no,
        status : req.body.status,
        branchid:req.body.branchid,  
        branch_name: req.body.branch_name
     });
    newShopowner.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Shopowner registered' ,data : newShopowner});
      }).catch(err => {
        res.json({success: false, msg:'Shopowner registered Failed'});
      });

  });

   // Get all data

  router.get('/shopowner', (req, res,next) => {
    Shopowner.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

  //// Delete
  router.delete('/shopowner/:id', (req, res,next) => {

    Shopowner.findByIdAndRemove(req.params.id)
      .then(shopowners => {
          if(!shopowners) {
              return res.status(404).send({
                  message: " Shopowner not found with id " + req.params.id
              });
          }
          res.send({message: "Shopowner deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Shopowner not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Shopowner with id " + req.params.id
          });
      });

  });
 // Update

  router.put('/shopowner/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newShopowner = {
            shopownerid : req.body.shopownerid,
            first_name : req.body.first_name,
            last_name : req.body.last_name,
            address : req.body.address,
            email : req.body.email,
            mobile_no : req.body.mobile_no,
            status : req.body.status,
            branchid:req.body.branchid,  
            branch_name: req.body.branch_name
      };
      Shopowner.findByIdAndUpdate(req.params._id, { $set: newShopowner }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Shopowner'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Shopowner'});

          }
      });
  });


   // Get by Id 

   router.get('/shopowner/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Shopowner.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Shopowner :' + JSON.stringify(err, undefined, 2)); }
    });
});
  module.exports = router;
