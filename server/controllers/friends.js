console.log('Bckts Ctrl up!');
const mongoose = require('mongoose');
const Bckt = mongoose.model('Bckt');
const User = mongoose.model('User');
const Friendship = mongoose.model('Frnd');

function ordrsCtrl(){


  this.add = function( req , res ){
    let ab = {};
    let nb = req.body;
    console.log(nb);
    Bckt.create( { name : nb.name , desc : nb.desc , done : '' } , function( err , data ){
      console.log(`******************************`);
      console.log(nb);
      if( err ){
        console.log(`Error adding new order to DB`);
        console.log(err);
      }else{
        console.log(`DID IT, adding to users...`);
        ab = data;
        User.findOne( { _id : nb.usrId } , function( err , user ){
          if( err ){
            console.log(err.errors);
          }else{
            console.log(ab);
            user.buckets.push( ab );
            console.log(user);
            user.save();
            console.log(`Now adding to User...`);
          };


        });
        if( nb.usrId2 ){
          console.log(`++++++++++++++++++ DON'T FORGET ME! (${ nb.usrId2 }) ++++++++++++++++++`);
          User.findOne( { _id : nb.usrId2 } , function( err , user ){
            if( err ){
              console.log(err.errors);
            }else{
              console.log(ab);
              user.buckets.push( ab );
              console.log(user);
              user.save();
              console.log(`Now adding to User...`);
            };
          });
        }
      };
    });
  };

  this.idx = function( req , res ){
    let allFriends = [];
    console.log('\nSession User\n',req.session.usr);
    Friendship.find( { ref: req.session.usr }).populate('rec').populate('ref').exec( function( err , theirFriends ){
      if( err ){
        console.log(`Error indexing all orders from db.`);
      }else{
        console.log(`SNATCHED ALL THIS GUY'S FRIENDS FROM DB:`);
        console.log( theirFriends );
        allFriends = theirFriends
        console.log('\n\nAll friends so far:',allFriends);
      };
    }).then( function(){
      Friendship.find( { rec: req.session.usr }).populate('rec').populate('ref').exec( function( err , theirFriends ){
        if( err ){
          console.log(`Error indexing all orders from db.`);
        }else{
          console.log(`SNATCHED ALL THIS GUY'S FRIENDS FROM DB:`);
          console.log( theirFriends );
          if ( allFriends.length > 0 ) {

              allFriends = allFriends.concat( theirFriends );
              console.log('Concatenating new friends',allFriends);
          }else {
            allFriends = theirFriends;
            console.log('\n\n No allFriends from before, filling it in...',allFriends);
          }

        };
        console.log( '\n\n\nALL OF THE FRIENDS ARE HERE!\n',allFriends );
        res.json( allFriends );
      });
    });
  };

  this.conf = function( req , res ){
    console.log('Chicking req.body for conf friend for: ',req.body);
    console.log('Also checking this User: ',req.session.usr);
    Friendship.findOne( { ref : req.body , rec : req.session.usr } , function( err , frndshp ){
      if( err ){
        console.log(err.errors);
      }else{
        console.log(`Bout to DO it, son! Confirming friendship!`);
        frndshp.acc = true;
        frndshp.save();
        res.json( { success : true } )
      };
    });
  };

  this.delete = function( req , res ){
    console.log('logging friend to deny',req.body);
    console.log('Chicking req.body for deny friend for: ',req.body);
    console.log('Also checking this User: ',req.session.usr);
    Friendship.findOne( { ref : req.body , rec : req.session.usr } , function( err , frndshp ){
      if( err ){
        console.log(err.errors);
      }else{
        console.log(`Bout to DO it, son! Denying friendship!`);
        Friendship.remove( { ref : frndshp.ref , rec : frndshp.rec } );
        frndshp.save();
        res.json( { success : true } )
      };
    });

  };

};
module.exports = new ordrsCtrl;
