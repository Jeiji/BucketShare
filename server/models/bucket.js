console.log(`Loading bucket.js model...`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

BcktSchema = new mongoose.Schema(
  {
    name : { type : String , minlength : 3 , required : true },
    desc : { type : String , minlength : 5 ,  required : true },
    creator : { type : Object , required: true },
    done : { type : String },
  } ,
  { timestamps : true });
const Bckt = mongoose.model( 'Bckt' , BcktSchema )
