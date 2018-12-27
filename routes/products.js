const express = require('express');
const router = express.Router();
const Product = require('../models/product');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/product', (req, res,next) => {

    let newProduct = new Product({
     
       // ProductID: req.body.ProductID,
        ProductName: req.body.ProductName,
        ProductType: req.body.ProductType
       
     });
     newProduct.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Product registered'});
      }).catch(err => {
        res.json({success: false, msg:'Product registered Failed'});
      });

  });


  router.put('/product/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newProduct = {
       // ProductID: req.body.ProductID,
        ProductName: req.body.ProductName,
        ProductType: req.body.ProductType
       
      };
      Product.findByIdAndUpdate(req.params._id, { $set: newProduct }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Product'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Product'});

          }
      });
  });

    // Get all data

    router.get('/product', (req, res,next) => {
        Product.find()
          .then(data => {
              res.send(data);
          }).catch(err => {
              res.status(500).send({
                  message: err.message || "Some error occurred while retrieving Product."
              });
          });
      });

      router.delete('/product/:id', (req, res,next) => {

        Product.findByIdAndRemove(req.params.id)
       .then(products => {
           if(!products) {
               return res.status(404).send({
                   message: " products not found with id " + req.params.id
               });
           }
           res.send({message: "products deleted successfully!"});
       }).catch(err => {
           if(err.kind === 'ObjectId' || err.name === 'NotFound') {
               return res.status(404).send({
                   message: "products not found with id " + req.params.id
               });
           }
           return res.status(500).send({
               message: "Could not delete products with id " + req.params.id
           });
       });
    });

      module.exports = router;