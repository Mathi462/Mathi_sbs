const express = require('express');
const router = express.Router();
const Billing = require('../models/billing');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/billing', (req, res,next) => {
    
    let newBilling = new Billing({

        invoiceno:req.body.invoiceno,
        barcode:req.body.barcode,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        address:req.body.address,
        branch_name:req.body.branch_name,
        branch_address:req.body.branch_address,
        model_no:req.body.model_no,
        brand_name:req.body.brand_name,
        product_price:req.body.product_price,
        price_discount:req.body.price_discount,
        gst:req.body.gst,
        pay_amount:req.body.pay_amount,
        date:req.body.date,
        salesperson_name:req.body.salesperson_name
});
newBilling.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Billing registered'});
      }).catch(err => {
        res.json({success: false, msg:'Billing registered Failed'});
      });

  });

  router.get('/billing', (req, res,next) => {
    Billing.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

  // Delete
  router.delete('/billing/:id', (req, res,next) => {

    Billing.findByIdAndRemove(req.params.id)
      .then(billings => {
          if(!billings) {
              return res.status(404).send({
                  message: " Billing not found with id " + req.params.id
              });
          }
          res.send({message: "Billing deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Category not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Billing with id " + req.params.id
          });
      });

  });

  router.put('/billing/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newBilling = {

        invoiceno:req.body.invoiceno,
        barcode:req.body.barcode,
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        phone:req.body.phone,
        address:req.body.address,
        branch_name:req.body.branch_name,
        branch_address:req.body.branch_address,
        model_no:req.body.model_no,
        brand_name:req.body.brand_name,
        product_price:req.body.product_price,
        price_discount:req.body.price_discount,
        gst:req.body.gst,
        pay_amount:req.body.pay_amount,
        date:req.body.date,
        salesperson_name:req.body.salesperson_name
    };

    Billing.findByIdAndUpdate(req.params._id, { $set: newBilling }, { new: true }, (err, doc) => {
        if (!err)
        {
         //res.send(doc);
         res.json({success: true, msg:'successfully  Updated Billing'});
        }
        else
        {

          res.json({success: false, msg:'Failed to Update Billing'});

        }
    });
});

 // Get by Id 

 router.get('/billing/:phone', (req, res,next) => {
    Billing.find({phone :{ $eq : req.params.phone}}, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
});
});

module.exports = router;
