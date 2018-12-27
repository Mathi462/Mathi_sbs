const express = require('express');
const router = express.Router();
const Service = require('../models/service');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/service', (req, res,next) => {

    let newService = new Service({
     
        //ServiceID : req.body.ServiceID,
        ProductModelnum : req.body.ProductModelnum,
        ProductBrandname : req.body.ProductBrandname,
        CustmerName : req.body.CustmerName,
        CustmerContact : req.body.CustmerContact,
        JOBNum : req.body.JOBNum,
        others : req.body.others,
        deliverydate : req.body.deliverydate,
        status : req.body.status
  
     });
    newService.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Service registered'});
      }).catch(err => {
        res.json({success: false, msg:'Service registered Failed'});
      });

  });

  // Get all data

  router.get('/service', (req, res,next) => {
    Service.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

// Delete
  router.delete('/service/:id', (req, res,next) => {

    Service.findByIdAndRemove(req.params.id)
      .then(services => {
          if(!services) {
              return res.status(404).send({
                  message: " Service not found with id " + req.params.id
              });
          }
          res.send({message: "Service deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Service not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Service with id " + req.params.id
          });
      });

  });

  // Update

  router.put('/service/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newService = {
       // ServiceID : req.body.ServiceID,
        ProductModelnum : req.body.ProductModelnum,
        ProductBrandname : req.body.ProductBrandname,
        CustmerName : req.body.CustmerName,
        CustmerContact : req.body.CustmerContact,
        JOBNum : req.body.JOBNum,
        others : req.body.others,
        deliverydate : req.body.deliverydate,
        status : req.body.status
      };
      Service.findByIdAndUpdate(req.params._id, { $set: newService }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Service'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Service'});

          }
      });
  });

  router.post('/get-by-date', (req, res, next) => {

    Service.find(
        // date : {$and : [{
        //     $lte : req.body.toDate , $gte : req.body.fromDate
        // }]} 
        {deliverydate : {$lte : req.body.toDate , $gte : req.body.fromDate} }
    )
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Service."
            });
        });
});

  // Get by Id 

  router.get('/service/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Service.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Service :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;