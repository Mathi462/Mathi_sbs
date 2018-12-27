const express = require('express');
const router = express.Router();
const Modelpd = require('../models/modelpd');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 
  router.post('/modelpd',(req,res,next) => {

    let newModelpd   = new Modelpd({
       // ModelID:req.body.ModelID,
       // ModelNum : req.body.ModelNum,
        ModelName : req.body.ModelName,
        Status: req.body.Status,
        BrandId: req.body.BrandId

    
     });
    newModelpd.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Modelpd registered'});
      }).catch(err => {
        res.json({success: false, msg:'Modelpd registered Failed'});
      });

  });


  // Get all data

  router.get('/modelpd', (req, res,next) => {
    Modelpd.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });


//// Delete
  router.delete('/modelpd/:id', (req, res,next) => {

    Modelpd.findByIdAndRemove(req.params.id)
      .then(modelpds => {
          if(!modelpds) {
              return res.status(404).send({
                  message: " Modelpd not found with id " + req.params.id
              });
          }
          res.send({message: "Modelpd deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Modelpd not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete modelpd with id " + req.params.id
          });
      });

  });

  
  router.put('/modelpd/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

          var newModelpd = {
           // ModelID:req.body.ModelID,
           // ModelNum : req.body.ModelNum,
            ModelName : req.body.ModelName,
            Status: req.body.Status
      };
      Modelpd.findByIdAndUpdate(req.params._id, { $set: newModelpd }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Modelpd'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Modelpd'});

          }
      });
  });
  // Get by Id 

  router.get('/modelpd/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Modelpd.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Modelpd :' + JSON.stringify(err, undefined, 2)); }
    });
});


// search 

router.post('/search',(req, res,next) =>{
    Modelpd.find({BrandId: {$regex : ".*"+req.body.BrandId+".*"}}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Customer."
      });
  });

});
module.exports = router;