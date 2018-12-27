const express = require('express');
const router = express.Router();
const Customer = require('../models/customer');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

// Register 
router.post('/customer', (req, res,next) => {

    let newCustomer = new Customer({
     
        // customerid : req.body.customerid,
        customerfname : req.body.custmername,
       
        customerphno:req.body.custmerphone,
       
        customeremail: req.body.custmeremail,
        

      
     });
    newCustomer.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Customer registered'});
      }).catch(err => {
        res.json({success: false, msg:'Customer registered Failed'});
      });

  });

  router.put('/customer/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newCustomer = {
       
        // customerid : req.body.customerid,
        customerfname : req.body.customerfname,
      
        customerphno:req.body.customerphno,
      
        customeremail: req.body.customeremail,
      };
      Customer.findByIdAndUpdate(req.params._id, { $set: newCustomer }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Customer'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Customer'});

          }
      });
  });


  router.post('/search',(req, res,next) =>{
      var query={};

      Customer.findOne({customerphno: {$regex : ".*"+req.body.customerphno+".*"}}).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customer."
        });
    });

  });
// Delete
router.delete('/customer/:id', (req, res,next) => {

    Customer.findByIdAndRemove(req.params.id)
      .then(customers => {
          if(!customers) {
              return res.status(404).send({
                  message: " Customer not found with id " + req.params.id
              });
          }
          res.send({message: "Customer deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Customer not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Customer with id " + req.params.id
          });
      });

  });


  router.post('/search', (req, res, next) => {
    var query = {};
    console.log(req.body.customerphno)
    Customer.findOne({
     
            $elemMatch:
                { customerphno: { $regex: ".*" + req.body.customerphno + ".*" } }
        
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customer."
        });
    });

})
    // Get all data

    router.get('/customer', (req, res,next) => {
        Customer.find()
          .then(data => {
              res.send(data);
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving Customer."
              });
          });
      });

       // Get by Id 

  router.get('/customer/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Customer.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Customer :' + JSON.stringify(err, undefined, 2)); }
    });
});





      module.exports = router;