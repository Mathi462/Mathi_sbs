const express = require('express');
const router = express.Router();
const Model = require('../models/model');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/model', (req, res,next) => {

    let newModel = new Model({
     
    voucher_id: req.body.voucher_id,
    model_num: req.body.model_num,
    model_name: req.body.model_name,
    date: req.body.date
     });
    newModel.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Model registered'});
      }).catch(err => {
        res.json({success: false, msg:'Model registered Failed'});
      });

  });

  // Get all data

  router.get('/model', (req, res,next) => {
    Model.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving Model."
          });
      });
  });

// Delete
  router.delete('/model/:id', (req, res,next) => {

    Model.findByIdAndRemove(req.params.id)
      .then(models => {
          if(!models) {
              return res.status(404).send({
                  message: " Model not found with id " + req.params.id
              });
          }
          res.send({message: "Model deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Model not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Model with id " + req.params.id
          });
      });

  });

  // Update

  router.put('/model/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
          return res.status(400).send(`No record with given id : ${req.params.id}`);

      var newModel = {
        voucher_id: req.body.voucher_id,
        model_num: req.body.model_num,
        model_name: req.body.model_name,
        date: req.body.date
      };
      Model.findByIdAndUpdate(req.params.id, { $set: newModel }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Model'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Model'});

          }
      });
  });

  // Get by Id 

  router.get('/model/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Model.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Model :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;