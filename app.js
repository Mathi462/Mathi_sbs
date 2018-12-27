const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const passport = require('passport');
const mongoose = require('mongoose');
const config = require('./config/database');

// Connect To Database
mongoose.connect(config.database);


// On Connection
mongoose.connection.on('connected', () => {
  console.log('Connected to database '+config.database);
});

// On Error
mongoose.connection.on('error', (err) => {
  console.log('Database error: '+err);
});

const app = express();

// const admins = require('./routes/admins');
const all_login_users = require('./routes/all_login_users');
const shop_managers = require('./routes/shop_managers');
const salespersons = require('./routes/salespersons');
const branchs = require('./routes/branchs');
const modelpds = require('./routes/modelpds');
const brands = require('./routes/brands');
const categorys = require('./routes/categorys');
const manufacturers = require('./routes/manufacturers');
const expenses = require('./routes/expenses');
const services = require('./routes/services');
const products = require('./routes/products');
const shopowners = require('./routes/shopowners');
const colours = require('./routes/colours');
const gsts = require('./routes/gsts');
const stocks = require('./routes/stocks');
const salereturns = require('./routes/salereturns');
const purchasereturns = require('./routes/purchasereturns');
const addorders = require('./routes/addorders');
const customers = require('./routes/customers');
const movestocks = require('./routes/movestocks');
const asses = require('./routes/asses');
const all_in_one_stocks = require('./routes/all_in_one_stocks');

// Port Number
const port = 3001;

// CORS Middleware
app.use(cors());

// Set Static Folder
app.use(express.static(path.join(__dirname, 'public')));

// Body Parser Middleware
app.use(bodyParser.json());

// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);


// app.use('/admins',admins);
app.use('/all_login_users',all_login_users);
app.use('/shop_managers',shop_managers);
app.use('/salespersons',salespersons);
app.use('/branchs',branchs);
app.use('/modelpds',modelpds);
app.use('/brands',brands);
app.use('/categorys',categorys);
app.use('/expenses',expenses);
app.use('/services',services);
app.use('/products',products);
app.use('/shopowners',shopowners);
app.use('/colours',colours);
app.use('/manufacturers',manufacturers);
app.use('/gsts',gsts);
app.use('/stocks',stocks);
app.use('/salereturns',salereturns);
app.use('/purchasereturns',purchasereturns);
app.use('/addorders',addorders);
app.use('/customers',customers);
app.use('/movestocks',movestocks);
app.use('/asses',asses);
app.use('/all_in_one_stocks',all_in_one_stocks);


// Index Route
app.get('/', (req, res) => {
  res.send('Invalid Endpoint');
});



app.all("/*", function(req, res, next){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
  next();
});
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public/index.html'));
// });

// Start Server
app.listen(port, () => {
  console.log('Server started on port '+port);
});
