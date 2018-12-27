const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');

// Category Schema
const AllinOneStockSchema = mongoose.Schema({
  
    model_name        : { type: mongoose.Schema.ObjectId, ref: 'Modelpd' },
    brand_name        : { type: mongoose.Schema.ObjectId, ref: 'Brand' },
    category_type     : { type: String },
    ManufacturerName  : { type: String },
    quantity          : { type: String },
    dp                : { type: String },
    lp                : { type: String },
    sp                : { type: String },
    cp                : { type: String },
    stock_status      : { type: String },
    cgst              : { type: String },
    sgst              : { type: String },
    branch            : { type: String },
    remarks           : { type: String },
    add_barcode       : { type: String },
    battery_no        : { type: String },
    color             : { type: String },
    stock_visible     : { type: String },
    //  stock_status_inbranch      : { type: String },
    imei1             : { type: String },
    imei2             : { type: String },
    otherno           : { type: String },    
    typeon            : { type: String },
        
    

}
, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  });

// AllinOneStockSchema.virtual('comments', {
//     ref: 'Brand',
//     localField: 'brand_name',
//     foreignField: 'BrandName'
//   })

const Stock = module.exports =
mongoose.model('AllStock', AllinOneStockSchema);

