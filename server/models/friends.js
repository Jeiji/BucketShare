console.log(`Loading friends.js model...`);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

FrndSchema = new mongoose.Schema(
  {
    req : { type : Schema.Types.ObjectId, ref: 'User' },
    rec : { type : Schema.Types.ObjectId, ref: 'User' },
    acc : { type : Boolean }
  } ,
  { timestamps : true });
const Frnd = mongoose.model( 'Frnd' , FrndSchema )
