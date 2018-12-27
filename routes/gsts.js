const express = require('express');
const router = express.Router();
const Gst   = require('../models/gst');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
router.post('/gst', (req, res,next) => {

    let newGst = new Gst({
     
        CGST : req.body.CGST,
        SGST : req.body.SGST
      
     });
    newGst.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'GST registered'});
      }).catch(err => {
        res.json({success: false, msg:'GST registered Failed'});
      });

  });


  // Get all data

  router.get('/gst', (req, res,next) => {
    Gst.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/gst/:id', (req, res,next) => {

    Gst.findByIdAndRemove(req.params.id)
      .then(gsts => {
          if(!gsts) {
              return res.status(404).send({
                  message: " Gst not found with id " + req.params.id
              });
          }
          res.send({message: "Gst deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Gst not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Gst with id " + req.params.id
          });
      });

  });

  
  router.put('/gst/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newGst = {
            CGST:req.body.CGST,
           SGST : req.body.SGST
      };
      Gst.findByIdAndUpdate(req.params._id, { $set: newGst }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Gst'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Gst'});

          }
      });
  });
  // Get by Id 

  router.get('/gst/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Gst.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Gst :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;