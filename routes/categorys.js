const express = require('express');
const router = express.Router();
const Category = require('../models/category');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/category', (req, res,next) => {

    let newCategory = new Category({
     
        // CategoryID : req.body.CategoryID,
        CategoryType : req.body.CategoryType,
        Status : req.body.Status    
     });
    newCategory.save()
      .then(data => {
         // res.send(data);
         res.json({success: true, msg:'Category registered'});
      }).catch(err => {
        res.json({success: false, msg:'Category registered Failed'});
      });

  });

  // Get all data

  router.get('/category', (req, res,next) => {
    Category.find()
      .then(data => {
          res.send(data);
      }).catch(err => {
          res.status(500).send({
              message: err.message || "Some error occurred while retrieving notes."
          });
      });
  });

// Delete
  router.delete('/category/:id', (req, res,next) => {

    Category.findByIdAndRemove(req.params.id)
      .then(categorys => {
          if(!categorys) {
              return res.status(404).send({
                  message: " Category not found with id " + req.params.id
              });
          }
          res.send({message: "Category deleted successfully!"});
      }).catch(err => {
          if(err.kind === 'ObjectId' || err.name === 'NotFound') {
              return res.status(404).send({
                  message: "Category not found with id " + req.params.id
              });
          }
          return res.status(500).send({
              message: "Could not delete Category with id " + req.params.id
          });
      });

  });

   // Update

   router.put('/category/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);

      var newCategory = {
        // CategoryID : req.body.CategoryID,
        CategoryType : req.body.CategoryType,
        Status : req.body.Status  
      };
      Category.findByIdAndUpdate(req.params._id, { $set: newCategory }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Category'});
          }
          else
          {

            res.json({success: false, msg:'Failed to Update Category'});

          }
      });
  });

  // Get by Id 

  router.get('/category/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Category.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
    });
});

module.exports = router;