const express = require('express');
const router = express.Router();
const Colour = require('../models/colour');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
router.post('/colour', (req, res,next) => {

    let newColour = new Colour({
     
        
        ColourName : req.body.ColourName,
        Status : req.body.Status    
     });
    newColour.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Colour registered'});
      }).catch(err => {
        res.json({success: false, msg:err});
      });

  });


  // Get all data

  router.get('/colour', (req, res,next) => {
    Colour.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/colour/:id', (req, res,next) => {

    Colour.findByIdAndRemove(req.params.id)
      .then(colours => {
          if(!colours) {
              return res.status(404).send({
                  message: " Colour not found with id " + req.params.id
              });
          }
          res.send({message: "Colour deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Colour not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Colour with id " + req.params.id
          });
      });

  });

  
  router.put('/colour/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newColour = {
            // ColourID:req.body.ColourID,
            ColourName : req.body.ColourName,
            Status:req.body.Status
      };
      Colour.findByIdAndUpdate(req.params._id, { $set: newColour }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Colour'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Colour'});

          }
      });
  });
  // Get by Id 

  router.get('/colour/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Colour.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Colour :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;