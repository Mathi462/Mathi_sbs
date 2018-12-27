const express = require('express');
const router = express.Router();
const Expense = require('../models/expense');
const config = require('../config/database');


var ObjectId = require('mongodb').ObjectID;

// Register 

router.post('/expense', (req, res, next) => {

    let newExpense = new Expense({


        ExpenseType: req.body.ExpenseType,
        Branchname: req.body.Branchname,
        Amount: req.body.Amount,
        descripition: req.body.descripition,
        date: req.body.date



    });
    newExpense.save()
        .then(data => {
            // res.send(data);
            res.json({ success: true, msg: 'Expense registered' });
        }).catch(err => {
            res.json({ success: false, msg: 'Expense registered Failed' });
        });

});

router.put('/expense/:_id', (req, res, next) => {
    if (!ObjectId.isValid(req.params._id))
        return res.status(400).send(`No record with given id : ${req.params._id}`);

    var newExpense = {

        ExpenseType: req.body.ExpenseType,
        Branchname: req.body.Branchname,
        Amount: req.body.Amount,
        descripition: req.body.descripition,
        date: req.body.date
    };
    Expense.findByIdAndUpdate(req.params._id, { $set: newExpense }, { new: true }, (err, doc) => {
        if (!err) {
            //res.send(doc);
            res.json({ success: true, msg: 'successfully  Updated Expense' });
        }
        else {

            res.json({ success: false, msg: 'Failed to Update Expense' });

        }
    });
});
router.post('/get-by-date', (req, res, next) => {

    Expense.find(
        // date : {$and : [{
        //     $lte : req.body.toDate , $gte : req.body.fromDate
        // }]} 
        {date : {$lte : req.body.toDate , $gte : req.body.fromDate} }
    )
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expense."
            });
        });
});
// Get all data

router.get('/expense', (req, res, next) => {
    Expense.find()
        .then(data => {
            res.send(data);
        }).catch(err => {
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving Expense."
            });
        });
});
router.delete('/expense/:id', (req, res, next) => {

    Expense.findByIdAndRemove(req.params.id)
        .then(expense => {
            if (!expense) {
                return res.status(404).send({
                    message: " expense not found with id " + req.params.id
                });
            }
            res.send({ message: "expense deleted successfully!" });
        }).catch(err => {
            if (err.kind === 'ObjectId' || err.name === 'NotFound') {
                return res.status(404).send({
                    message: "expense not found with id " + req.params.id
                });
            }
            return res.status(500).send({
                message: "Could not delete expense with id " + req.params.id
            });
        });

});
module.exports = router;