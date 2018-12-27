const express = require('express');
const router = express.Router();
const Addorder = require('../models/addorder');
const config = require('../config/database');
const Stock = require('../models/all_in_one_stock');



router.post('/addorder', (req, res, next) => {
    // console.log(req.body)

    let newAddorder = new Addorder();

    newAddorder.invoice = req.body.invoice;
    newAddorder.orderdate = req.body.orderdate,
        newAddorder.branchname = req.body.branchname,
        newAddorder.custmername = req.body.custmername,
        newAddorder.custmeremail = req.body.custmeremail,
        newAddorder.custmerphone = req.body.custmerphone,
        newAddorder.subtotal = req.body.sub_total,
        newAddorder.cgst = req.body.cgst,
        newAddorder.sgst = req.body.sgst,
        newAddorder.totalamount = req.body.totalamount,
        newAddorder.discount = req.body.disCount,
        newAddorder.paid = req.body.paidAmount,
        newAddorder.balance = req.body.balance,
        newAddorder.paymentstatus = req.body.paymentstatus,
        newAddorder.paymenttype = req.body.paymenttype,
        newAddorder.salesperson = req.body.salesperson,
        newAddorder.message = req.body.message,
        newAddorder.productdetails = req.body.productdetails
        newAddorder.invoice_no = req.body.invoice_no

    newAddorder.save()
        .then(data => {
            Stock.updateMany(
                { add_barcode: {$in : req.body.barCode}  },
                {
                    $set: { stock_status: req.body.stock_status }
                }
            ).then(d=> {
                res.send({
                    success :  true,
                    message : d
                })
            }, err => {
                res.send({
                    success :  false,
                    message : err
                })
            })

        }).catch(err => {
            res.json({ success: false, msg: err });
        });

});




router.get('/addorder/:id', (req, res, next) => {
    if (!ObjectId.isValid(req.params.id))
        return res.status(400).send(`No record with given id : ${req.params.id}`);

    Addorder.findById(req.params.id, (err, doc) => {
        if (!err) { res.send(doc); }
        else { console.log('Error in Retriving Addorder :' + JSON.stringify(err, undefined, 2)); }
    });
});


router.get('/last-invoice', (req, res, next) => {
    Addorder.find({}).sort({ _id: -1 }).limit(1).then(d => {
        res.send({
            status: true,
            message: d
        })
    })
})
router.post('/get-by-date', (req, res, next) => {

    Expense.find(
        // date : {$and : [{
        //     $lte : req.body.toDate , $gte : req.body.fromDate
        // }]} 
        { orderdate: { $lte: req.body.toDate, $gte: req.body.fromDate } }
    )
        .then(orderdate => {
            res.send(orderdate);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expense."
            });
        });
});
// Get all data
router.get('/addorder', (req, res, next) => {
    Addorder.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving notes."
            });
        });
});

//// put

router.put('/addorder/:_id', (req, res, next) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    var newAddorder = {
        invoice: req.body.invoice,
        orderdate: req.body.orderdate,
        branchname: req.body.branchname,
        custmername: req.body.custmername,
        custmeremail: req.body.custmeremail,
        custmerphone: req.body.custmerphone,

        subtotal: req.body.subtotal,
        cgst: req.body.cgst,
        sgst: req.body.sgst,
        totalamount: req.body.totalamount,
        discount: req.body.discount,

        paid: req.body.paid,
        balance: req.body.balance,
        paymentstatus: req.body.paymentstatus,
        paymenttype: req.body.paymenttype,
        salesperson: req.body.salesperson,
        message: req.body.message,
        productdetails: req.body.productdetails
    };
    Addorder.findByIdAndUpdate(req.params._id, { $set: newAddorder }, { new: true }, (err, doc) => {
        if (!err) {
            //res.send(doc);
            res.json({ success: true, msg: 'successfully  Updated Addorder' });
        }
        else {

            res.json({ success: false, msg: 'Failed to Update Addorder' });

        }
    });
});

//// Delete
router.delete('/addorder/:id', (req, res, next) => {

    Addorder.findByIdAndRemove(req.params.id)
        .then(addorders => {
            if (!addorders) {
                return res.status(404).send({
                    message: " Addorder not found with id " + req.params.id
                });
            }
            res.send({ message: "Addorder deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "Addorder not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete Addorder with id " + req.params.id
            });
        });

});


router.post('/search',(req, res,next) =>{
    var query={};

    Addorder.findOne({custmerphone: {$regex : ".*"+req.body.custmerphone+".*"}}).then(data => {
      res.send(data);
  }).catch(err => {
      res.status(500).send({
          message: err.message || "Some error occurred while retrieving ADDORDERS."
      });
  });

})

module.exports = router;