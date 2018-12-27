const express = require('express');
const router = express.Router();
const Stock = require('../models/all_in_one_stock');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/stock', (req, res, next) => {
    // console.log(req.body)
    // console.log(req.body.length)
    let newStock = new Stock()
    // for(let i=0;i<req.body.length;i++){
    //     newStock[i]=(req.body[i])
    //     console.log(i,newStock[i])
    // }


    // let newStock = new Stock([{

    //     model_name: req.body.model_name,
    //     brand_name: req.body.brand_name,
    //     category_type: req.body.category_type,
    //     ManufacturerName: req.body.ManufacturerName,
    //     quantity: req.body.quantity,
    //     dp: req.body.dp,
    //     lp: req.body.lp,
    //     sp: req.body.sp,
    //     cp: req.body.cp,
    //     stock_status: req.body.stock_status,
    //     cgst: req.body.cgst,
    //     sgst: req.body.sgst,
    //     branch: req.body.branch,
    //     // add_date: req.body.add_date,
    //     remarks: req.body.remarks,
    //     // productdetails: req.body.productdetails,
    //     add_barcode : req.body.add_barcode,
    //     battery_no  : req.body.battery_no,
    //     color   : req.body.color,
    //     stock_visible   : req.body.stock_visiable,
    //     // stock_status    : req.body.stock_status,
    //     imei1   : req.body.imei1,
    //     imei2   : req.body.imei2,
    //     otherno : req.body.otherno,
    //     typeon  : req.body.typeon,


    // }]);
    Stock.insertMany(req.body)
        .then(data => {
            // res.send(data);
            res.json({ success: true, msg: 'Stock registered' });
        }).catch(err => {
            res.json({ success: false, msg: err });
        });

});

// Get all data

router.get('/stock', (req, res, next) => {
    Stock.find().populate('brand_name', 'BrandName').populate('model_name', 'ModelName')
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
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


// Update

router.put('/all_in_one_stocks/:_id', (req, res, next) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    var newStock = {
        // stockid:req.body.stockid,
        stock_visiable: req.stock_visiable
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

        $elemMatch: {
            _id: req.body.prodId
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


//search

// router.post('/search', (req, res, next) => {
//     var query = {};
//     console.log(req.body.add_barcode)

//     Stock.findOne({ add_barcode: { $regex: ".*" + req.body.add_barcode + ".*" } }).then(data => {
//         // console.log(data)
//         res.send(d)
//     }).catch(err => {
//         res.status(500).send({
//             message: err.message || "Some error occurred while retrieving Customer."
//         });
//     });

// })

router.post('/search',(req, res,next) =>{
    Stock.findOne({$and : [{add_barcode: {$regex : ".*"+req.body.add_barcode+".*"}},{ stock_status : { $eq : "Available"}}]}).populate('brand_name', 'BrandName').populate('model_name', 'ModelName').then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving Customer."
      });
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
                'productdetails.$.stock_status': req.body.stock_status

            }
        }).then(d => {
            console.log(d)
            res.send(d)
        }).catch(err => {
            res.send(err)
        })
})

router.put('/updateBranch', (req, res, next) => {
    console.log(req.body)
    Stock.updateMany(
        { add_barcode: {$in : req.body.barCode}  },
        {
            $set: { branch: req.body.toBranch }
        }
    ).then(d=> {
        res.send({
            status :  true,
            message : d
        })
    }, err => {
        res.send({
            status :  false,
            message : "Move Failed"
        })
    })
})


router.put('/stock', (req, res, next) => {
    console.log(req.body)
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
            remarks: req.body.remarks,
            add_barcode: req.body.add_barcode,
            battery_no: req.body.battery_no,
            color: req.body.color,
            stock_visible: req.body.stock_visiable,
            imei1: req.body.imei1,
            imei2: req.body.imei2,
            otherno: req.body.otherno,
            typeon: req.body.typeon,
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
    
})




module.exports = router;