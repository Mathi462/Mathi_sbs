const express = require('express');
const router = express.Router();
const MoveStock = require('../models/movestock');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/movestock', (req, res, next) => {

    let newMoveStock = new MoveStock({

       from_branch:req.body.from_branch, 
        to_branch:req.body.to_branch,
        move_branch: req.body.move_branch,
        model_name: req.body.model_name,
        brand_name: req.body.brand_name,
        category_type: req.body.category_type,
        ManufacturerName: req.body.ManufacturerName,
        dp: req.body.dp,
        lp: req.body.lp,
        sp: req.body.sp,
        cp: req.body.cp,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        

    });
    newMoveStock.save()
        .then(data => {
            // res.send(data);
            res.json({ success: true, msg: 'MoveStock registered' });
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
// router.delete('/stock/:id', (req, res, next) => {

//     Stock.findByIdAndRemove(req.params.id)
//         .then(stocks => {
//             if (!stocks) {
//                 return res.status(404).send({
//                     message: " Stock not found with id " + req.params.id
//                 });
//             }
//             res.send({ message: "Stock deleted successfully!" });
//         }).catch(err => {
//             if (err.kind === 'ObjectId' || err.name === 'NotFound') {
//                 return res.status(404).send({
//                     message: "Category not found with id " + req.params.id
//                 });
//             }
//             return res.status(500).send({
//                 message: "Could not delete Category with id " + req.params.id
//             });
//         });

// });


// router.post('/search', (req, res, next) => {
//     var query = {};
//     console.log(req.body.add_barcode)
//     Stock.findOne({
//         productdetails: {
//             $elemMatch:
//                 { add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }
//         }
//     }).then(data => {
//         res.send(data);
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving Customer."
//         });
//     });

// })


// // Update

// router.put('/stock/:_id', (req, res, next) => {
//     if (!ObjectId.isValid(req.params._id))
//         return res.status(400).send(`No record with given id : ${req.params._id}`);

//     var newStock = {
//         // stockid:req.body.stockid,
//         model_name: req.body.model_name,
//         brand_name: req.body.brand_name,
//         category_type: req.body.category_type,
//         ManufacturerName: req.body.ManufacturerName,

//         quantity: req.body.quantity,

//         dp: req.body.dp,
//         lp: req.body.lp,
//         sp: req.body.sp,
//         cp: req.body.cp,
//         stock_status: req.body.stock_status,
//         cgst: req.body.cgst,
//         sgst: req.body.sgst,
//         branch: req.body.branch,
//         add_date: req.body.add_date,
//         remarks: req.body.remarks,
//         productdetails: req.body.productdetails
//     };
//     Stock.findByIdAndUpdate(req.params._id, { $set: newStock }, { new: true }, (err, doc) => {
//         if (!err) {
//             //res.send(doc);
//             res.json({ success: true, msg: 'successfully  Updated Stock' });
//         }
//         else {

//             res.json({ success: false, msg: 'Failed to Update Stock' });

//         }
//     });
// });

// // Get by Id 

// router.get('/stock/:stockid', (req, res, next) => {
//     Stock.find({ stockid: { $eq: req.params.stockid } }, (err, doc) => {
//         if (!err) { res.send(doc); }
//         else { console.log('Error in Retriving Branch :' + JSON.stringify(err, undefined, 2)); }
//     });
// });

module.exports = router;