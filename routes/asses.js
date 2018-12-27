const express = require('express');
const router = express.Router();
const Asse = require('../models/asse');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/asse', (req, res, next) => {

    let newAsse = new Asse({

        //stockid:req.body.stockid,
        model_name: req.body.model_name,
        brand_name: req.body.brand_name,
        category_type: req.body.category_type,
        quantity: req.body.quantity,
        // ManufacturerName:req.body.ManufacturerName,
        dp: req.body.dp,
        lp: req.body.lp,
        sp: req.body.sp,
        cp: req.body.cp,
        stock_status: req.body.stock_status,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        branch: req.body.branch,
   
        remarks: req.body.remarks,
        productdetails: req.body.productdetails

    });
    newAsse.save()
    .then(data => {
      // res.send(data);
      res.json({ success: true, msg: 'Ass registered' });
    }).catch(err => {
      res.json({ success: false, msg: 'Ass registered Failed' });
    });
});

// Get all data

router.get('/asse', (req, res, next) => {
    Asse.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

router.delete('/asse/:id', (req, res, next) => {

    Asse.findByIdAndRemove(req.params.id)
        .then(asses => {
            if (!asses) {
                return res.status(404).send({
                    message: " asse not found with id " + req.params.id
                });
            }
            res.send({ message: "Accessories deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "asse not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Accessories with id " + req.params.id
            });
        });

});


router.post('/search', (req, res, next) => {
    var query = {};
    console.log(req.body.add_barcode)
    Asse.findOne({
        productdetails: {
            $elemMatch:
                { add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customer."
        });
    });

})


// Update


router.put('/asse/:_id', (req, res,next) => {
    if (!ObjectId.isValid(req.params._id))
          return res.status(400).send(`No record with given id : ${req.params._id}`);
  
          var newAsse = {
            model_name: req.body.model_name,
            brand_name: req.body.brand_name,
            category_type: req.body.category_type,
            quantity: req.body.quantity,
          
            dp: req.body.dp,
            lp: req.body.lp,
            sp: req.body.sp,
            cp: req.body.cp,
            stock_status: req.body.stock_status,
            cgst: req.body.cgst,
            sgst: req.body.sgst,
            branch: req.body.branch,
       
            remarks: req.body.remarks,
            productdetails: req.body.productdetails
      };
      Asse.findByIdAndUpdate(req.params._id, { $set: newAsse }, { new: true }, (err, doc) => {
          if (!err)
          {
           //res.send(doc);
           res.json({success: true, msg:'successfully  Updated Asse'});
          }
          else
          {
  
            res.json({success: false, msg:'Failed to Update Asse'});
  
          }
      });
  });

// Get by Id 

router.get('/asse/:id', (req, res,next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

        Asse.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Asse :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.post('/search', (req, res, next) => {
    var query = {};
    console.log(req.body.add_barcode)
    Asse.findOne({
        productdetails: {
            $elemMatch:
                { add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }
        }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customer."
        });
    });

})


module.exports = router;