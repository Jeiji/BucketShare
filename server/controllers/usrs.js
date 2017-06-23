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
    .populate('creator')
    .exec( function( err , allUsrs ){
     if( err ){
       console.log(`Error indexing all users from db.`);
     }else{
       console.log( `\n\n\n\n\nAll the registered users:\n\n` , allUsrs );
       res.json( allUsrs )
     };
   });
  };

  this.idx_one = function( req , res ){
      User.findOne( { name: req.session.usr.name} )
      .populate('buckets')
      .populate('creator')
      .exec( function( err , thisUsr ){
       if( err ){
         console.log(`Error indexing all users from db.`);
       }else{
         req.session.usr = thisUsr
         req.session.save()
         console.log( `\n\n\n\n\nUpdated user:\n\n` , thisUsr );
         res.json( thisUsr )
       };
     });
   };


  this.reqFrnd = function( req , res ){
    console.log('\n\nCHECKING FOR REQ FRIEND',req.body);
    let recUserName = req.body.userName,
        recUser = {};
        // thisUser = req.session.usr;
        console.log('This is the session user',req.session.usr);
    // console.log(thisUser);

    //populate rec user...
    User.findOne( { name: recUserName } , function( err , foundUsr ) {
      if( foundUsr ){
        console.log('\n\nFOUND USER',foundUsr);
        recUser = foundUsr
      }
      // repopulate ref user...
      User.findOne( { name: req.session.usr.name } , function( err , foundUsr ) {
        if( foundUsr ){
          console.log('\n\nFOUND REQUESTER',foundUsr);
          thisUser = foundUsr

          Friendship.findOne({ ref: thisUser , rec: recUser },function( err , fship ){
            console.log('\n\nJust checking this user when checkint to see if rq is already made...',thisUser);
            if ( !fship ) {
              Friendship.create({ ref: thisUser , rec: recUser , acc: 'false' } , function( err , nf ){
                newFriendship = nf;
                console.log('New Friendship' , newFriendship);
                console.log(`Now adding to User...`);
                res.json( newFriendship );
              });
            }else {
              console.log('\n\n\n\n FRIENDSHIP ALREADY EXISTS\n\n');
              res.json( 'FRIENDSHIP ALREADY EXISTS' )
            }
          });

        }
      });
    });






  };

  this.log = function( req , res ){
    const usr = req.body
    if ( usr.name ) {
      usr.name = usr.name.toLowerCase();
    }
    console.log(`\n!@#!@#!@#!@#!@#!@#!@#\n` , req.session);
    User.findOne( { name : usr.name , password : usr.pass } ).populate('buckets').exec( function( err , foundUsr ){
      if( foundUsr ){
        console.log(`FOUND HIM! Loggin' him in...`);
        console.log(foundUsr);
        login( foundUsr , req.session , function( sesh ){
          req.session = sesh;
          req.session.save();
          console.log( `\n*&*&*&*&*&*&*&*&*&*&*&*&*&*&\n\nThis is the new session\n` , req.session );
        } );
        res.json( foundUsr )
      }else{
        res.json( {err:`He doesn't exist!`} )
      }
    });
  };

  this.reg = function( req , res ){
    const newUsr = req.body
    newUsr.name = newUsr.name.toLowerCase()
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
