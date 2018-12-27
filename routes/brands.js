const express = require('express');
const router = express.Router();
const Brand = require('../models/brand');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
router.post('/brand', (req, res,next) => {

    let newBrand = new Brand({
     
        // BrandID : req.body.BrandID,
        BrandName : req.body.BrandName,
        Status : req.body.Status    
     });
    newBrand.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Brand registered'});
      }).catch(err => {
        res.json({success: false, msg:'Brand registered Failed'});
      });

  });

  // Get all data

  router.get('/brand', (req, res,next) => {
    Brand.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

// Delete
  router.delete('/brand/:id', (req, res,next) => {

    Brand.findByIdAndRemove(req.params.id)
      .then(brands => {
          if(!brands) {
              return res.status(404).send({
                  message: " Brand not found with id " + req.params.id
              });
          }
          res.send({message: "Brand deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Brand not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Brand with id " + req.params.id
          });
      });

  });

  // Update

  router.put('/brand/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
      return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newBrand = {
        // BrandID : req.body.BrandID,
        BrandName : req.body.BrandName,
        Status : req.body.Status
      };
      Brand.findByIdAndUpdate(req.params._id, { $set: newBrand }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Brand'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Brand'});

          }
      });
  });

  // Get by Id 

  router.get('/brand/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Brand.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Brand :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;