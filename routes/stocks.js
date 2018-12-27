const express = require('express');
const router = express.Router();
const Stock = require('../models/stock');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/stock', (req, res, next) => {

    let newStock = new Stock({

        //stockid:req.body.stockid,
        model_name: req.body.model_name,
        brand_name: req.body.brand_name,
        category_type: req.body.category_type,
        ManufacturerName: req.body.ManufacturerName,
        // battery_no:req.body.battery_no,
        // color:req.body.color,
        quantity: req.body.quantity,
        // add_barcode:req.body.add_barcode,
        // imei1:req.body.imei1,
        // imei2:req.body.imei2,
        dp: req.body.dp,
        lp: req.body.lp,
        sp: req.body.sp,
        cp: req.body.cp,
        stock_status: req.body.stock_status,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        branch: req.body.branch,
        add_date: req.body.add_date,
        remarks: req.body.remarks,
        productdetails: req.body.productdetails,


        // req.body.CategoryID,
        //req.body.Date    
    });
    newStock.save()
        .then(data => {
            // res.send(data);
            res.json({ success: true, msg: 'Stock registered' });
        }).catch(err => {
            res.json({ success: false, msg: err });
        });

});

// Get all data

router.get('/stock', (req, res, next) => {
    Stock.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

// Delete
router.delete('/stock/:id', (req, res, next) => {

    Stock.findByIdAndRemove(req.params.id)
        .then(stocks => {
            if (!stocks) {
                return res.status(404).send({
                    message: " Stock not found with id " + req.params.id
                });
            }
            res.send({ message: "Stock deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Category not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Category with id " + req.params.id
            });
        });

});


router.post('/search', (req, res, next) => {
    var query = {};
    console.log(req.body.add_barcode)
    Stock.findOne({
        $elemMatch:
                { add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }
       // productdetails: {
       //     $elemMatch:
       //         { add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }
      //  }
    }).then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving Customer."
        });
    });

})


// Update

router.put('/stock/:_id', (req, res, next) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    var newStock = {
        // stockid:req.body.stockid,
        model_name: req.body.model_name,
        brand_name: req.body.brand_name,
        category_type: req.body.category_type,
        ManufacturerName: req.body.ManufacturerName,

        quantity: req.body.quantity,

        dp: req.body.dp,
        lp: req.body.lp,
        sp: req.body.sp,
        cp: req.body.cp,
        stock_status: req.body.stock_status,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        branch: req.body.branch,
        add_date: req.body.add_date,
        remarks: req.body.remarks,
        productdetails: req.body.productdetails
    };
    Stock.findByIdAndUpdate(req.params._id, { $set: newStock }, { new: true }, (err, doc) => {
        if (!err) {
            //res.send(doc);
            res.json({ success: true, msg: 'successfully  Updated Stock' });
        }
        else {

            res.json({ success: false, msg: 'Failed to Update Stock' });

        }
    });
});

// get by id
router.get('/stock/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Stock.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Stock :' + JSON.stringify(err, undefined, 2)); }
    });
});


// update visiblity

router.put('/updatevisible/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    // console.log(req.body)
    var newStock = {
        stock_visiable: req.body
    }
    // console.log(newStock)
    // console.log(req.params.id)
    Stock.updateOne({
        _id: req.params.id,
        productdetails: {
            $elemMatch: {
                _id: req.body.prodId
            }

        }
    }, {
            $set:
            {
                'productdetails.$.stock_visible': req.body.stock_visible

            }
        }).then(d => {
            console.log(d)
            res.send(d)
        }).catch(err => {
            res.send(err)
        })
})


// Update Qty

router.put('/updateQty/:_id', (req, res, next) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    var newStock = {
       
        quantity: req.body.quantity,

       
    };
    Stock.findByIdAndUpdate(req.params._id, { $set: newStock }, { new: true }, (err, doc) => {
        if (!err) {
            //res.send(doc);
            res.json({ success: true, msg: 'successfully  Updated Qty' });
        }
        else {

            res.json({ success: false, msg: 'Failed to Update Qty' });

        }
    });
});

// Delete Selling Product

router.put('/productremove/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);
    console.log(req.params.id)
    console.log(req.body)
    Stock.findOneAndUpdate(req.params.id, {$pull: {productdetails: req.body.prodId}}, function(err, data){
        if(err) {
          return res.status(500).json({'error' : 'error in deleting address'});
        }

        res.json(data);

      });


})


module.exports = router;