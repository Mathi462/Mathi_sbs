const express = require('express');
const router = express.Router();
const Manufacturer = require('../models/manufacturer');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
router.post('/manufacturer', (req, res,next) => {

    let newManufacturer = new Manufacturer({
     
        
        ManufacturerName : req.body.ManufacturerName,
        Status : req.body.Status    
     });
    newManufacturer.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Manufacturer registered'});
      }).catch(err => {
        res.json({success: false, msg:err});
      });

  });


  // Get all data

  router.get('/manufacturer', (req, res,next) => {
    Manufacturer.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/manufacturer/:id', (req, res,next) => {

    Manufacturer.findByIdAndRemove(req.params.id)
      .then(manufacturers => {
          if(!manufacturers) {
              return res.status(404).send({
                  message: " Manufacturer not found with id " + req.params.id
              });
          }
          res.send({message: "Manufacturer deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Manufacturer not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Manufacturer with id " + req.params.id
          });
      });

  });

  
  router.put('/manufacturer/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newManufacturer = {
            // ColourID:req.body.ColourID,
            ManufacturerName : req.body.ManufacturerName,
            Status:req.body.Status
      };
      Manufacturer.findByIdAndUpdate(req.params._id, { $set: newManufacturer }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Manufacturer'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Manufacturer'});

          }
      });
  });
  // Get by Id 

  router.get('/manufacturer/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Manufacturer.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Manufacturer :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;