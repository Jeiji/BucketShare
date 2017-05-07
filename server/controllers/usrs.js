console.log(`Users Controller up!`);

const mongoose = require('mongoose');
const User = mongoose.model( 'User' );
const Friendship = mongoose.model( 'Frnd' );

function usrsCtrl(){

  login = function( usr , sesh , backToHTTPCycle ){
    sesh.usr = usr
    console.log(`\n\n`,sesh);
    backToHTTPCycle( sesh );
  }

  this.idx = function( req , res ){
    User.find( {} )
    .populate('buckets')
    .exec( function( err , allUsrs ){
     if( err ){
       console.log(`Error indexing all users from db.`);
     }else{
       console.log( `\n\n\n\n\nAll the registered users:\n\n` , allUsrs );
       res.json( allUsrs )
     };
   });

  };

  this.reqFrnd = function( req , res ){
    let recUserName = req.body.userName,
        thisUser = req.session.usr;
        console.log('This is the session user',req.session);
    console.log(thisUser);
    User.findOne( { name: recUserName } , function( err , foundUsr ) {
      if( foundUsr ){
        Friendship.create({ req: thisUser , rec: foundUsr , acc: 'false' } , function( err , nf ){
          newFriendship = nf;
          console.log('New Friendship' , newFriendship);
          console.log(`Now adding to User...`);
          res.json( foundUsr );
        });
      }else{
        console.log(`\n NO DICE!\n\n`);
      }
    });
  };

  this.log = function( req , res ){
    const newUsr = req.body
    console.log(`\n!@#!@#!@#!@#!@#!@#!@#\n` , req.session);
    User.findOne( { name : newUsr.name , password : newUsr.pass } , function( err , foundUsr ){
      if( foundUsr ){
        console.log(`FOUND HIM! Loggin' him in...`);
        console.log(foundUsr);
        login( foundUsr , req.session , function( sesh ){
          req.session = sesh;
          req.session.save();
          console.log( `\n*&*&*&*&*&*&*&*&*&*&*&*&*&*&\n\nThis is the new session\n` , req.session );
        } );
        res.json( foundUsr )
      }
    });
  };

  this.reg = function( req , res ){
    const newUsr = req.body
    User.findOne( { name : newUsr.name } , function( err , foundUsr ){
      if( foundUsr ){
        console.log(`\nHE ALREADY EXISTS:\n\n`);
        console.log(foundUsr);
        res.json( foundUsr )
      }else{
        User.create( { name : newUsr.name , password : newUsr.pass } , function( err , addedUsr ){
          if( err ){
            console.log(`Error adding new user to db.`);
          }else{
            console.log(`ADDED USR TO DB!`);
            console.log( addedUsr );
            login( addedUsr , req.session , function( sesh ){
              req.session = sesh;
              console.log( `\n*&*&*&*&*&*&*&*&*&*&*&*&*&*&\n\nThis is the new session\n` , req.session );
            } );
            res.json( addedUsr );
          };
        });
      }
    });


  };

  this.delete = function( req , res ){
    console.log(req.params);
    User.remove( { _id : req.params.victimId } , function( err , deletedUsr ){
      if( err ){
        console.log(`Couldn't delete`);
      }else{
        res.json( deletedUsr );
      };
    });
  };

};
module.exports = new usrsCtrl
