const express = require('express');
const router = express.Router();
const Editreturn = require('../models/editreturn');
const config = require('../config/database');


// var ObjectId = require('mongodb').ObjectID;

var invNum = require('invoice-number')


invNum.next('SAR001')

router.post('/editreturn', (req, res, next) => {

  let newEditreturn = new Editreturn({

    invoice: req.body.invoice,
    orderdate: req.body.orderdate,
    orderid: req.body.orderid,
    custmername: req.body.custmername,
    custmeraddress: req.body.custmeraddress,
    custmerphone: req.body.custmerphone,
    productdetails:req.body.productdetails
   
   
  });

  
  newEditreturn.save()
    .then(data => {
      // res.send(data);
      res.json({ success: true, msg: 'Editreturn registered' });
    }).catch(err => {
      res.json({ success: false, msg: 'Editreturn registered Failed' });
    });

});


router.delete('/editreturn/:id', (req, res,next) => {

  Editreturn.findByIdAndRemove(req.params.id)
    .then(editreturns => {
        if(!editreturns) {
            return res.status(404).send({
                message: " editreturn not found with id " + req.params.id
            });
        }
        res.send({message: "editreturn deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "editreturn not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete editreturn with id " + req.params.id
        });
    });

});


router.get('/editreturn/:id', (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Editreturn.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Editreturn :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;