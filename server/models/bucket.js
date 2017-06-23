console.log(`Loading bucket.js model...`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

BcktSchema = new mongoose.Schema(
  {
    name : { type : String , minlength : 3 , required : true },
    desc : { type : String , minlength : 5 ,  required : true },
    diff : { type : Number , required : true },
    timeRem : { type : Number , required : true },
    urg : { type : Number , required : true },
    prog : { type : Number , required : false },
    compTime : { type : Number , required : true },
    fscore: { type : Number , required : false },
    // creator : { type : Object , required: true },
    done : { type : String }
  } ,
  { timestamps : true });
const Bckt = mongoose.model( 'Bckt' , BcktSchema )
