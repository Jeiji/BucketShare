console.log(`Users Controller up!`);

const mongoose = require('mongoose');
const User = mongoose.model( 'User' )

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

  this.log = function( req , res ){
    const newUsr = req.body
    console.log(`\n!@#!@#!@#!@#!@#!@#!@#\n` , req.session);
    User.findOne( { name : newUsr.name , password : newUsr.pass } , function( err , foundUsr ){
      if( foundUsr ){
        console.log(`FOUND HIM! Loggin' him in...`);
        console.log(foundUsr);
        login( foundUsr , req.session , function( sesh ){
          req.session = sesh;
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
            res.json( addedUsr );
          };
        });
        login( foundUsr , req.session , function( sesh ){
          req.session = sesh;
          console.log( `\n*&*&*&*&*&*&*&*&*&*&*&*&*&*&\n\nThis is the new session\n` , req.session );
        } );
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
