const express = require('express');
const router = express.Router();
const Salereturn = require('../models/salereturn');
const config = require('../config/database');


// var ObjectId = require('mongodb').ObjectID;



router.post('/salereturn', (req, res, next) => {

  let newSalereturn = new Salereturn({

    invoice: req.body.invoice,
    orderdate: req.body.orderdate,
    orderid: req.body.orderid,
    custmername: req.body.custmername,
    custmeraddress: req.body.custmeraddress,
    custmerphone: req.body.custmerphone,
    bracode: req.body.bracode,
    product: req.body.product,
    rate: req.body.rate,
    qty: req.body.qty,
    amount: req.body.amount,
    status: req.body.status,
   
  });
  newSalereturn.save()
    .then(data => {
      // res.send(data);
      res.json({ success: true, msg: 'Salereturn registered' });
    }).catch(err => {
      res.json({ success: false, msg: 'Salereturn registered Failed' });
    });

});


router.delete('/salereturn/:id', (req, res,next) => {

  Salereturn.findByIdAndRemove(req.params.id)
    .then(salereturns => {
        if(!salereturns) {
            return res.status(404).send({
                message: " salereturn not found with id " + req.params.id
            });
        }
        res.send({message: "salereturn deleted successfully!"});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "salereturn not found with id " + req.params.id
            });
        }
        return res.status(500).send({
            message: "Could not delete salereturn with id " + req.params.id
        });
    });

});


router.get('/salereturn/:id', (req, res, next) => {
  if (!ObjectId.isValid(req.params.id))
    return res.status(400).send(`No record with given id : ${req.params.id}`);

    Salereturn.findById(req.params.id, (err, doc) => {
    if (!err) { res.send(doc); }
    else { console.log('Error in Retriving Salereturn :' + JSON.stringify(err, undefined, 2)); }
  });
});

module.exports = router;