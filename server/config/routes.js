console.log(`Routes are up!`);
const usrs = require('../controllers/usrs.js')
// const bckts = require('../controllers/bckts.js')
const bckts = require('../controllers/bckts.js')
const frnds = require('../controllers/friends.js')

// Check for bein' logged in
function ifLogged( req , res ){
  if( !req.session.usr ){
    res.redirect('/');
  }
}

module.exports = function( app ){

  app.get( '/chk_logged' , function( req , res ){
    const loggedUsr = req.session.usr;
    console.log(`\n\n\n\n\n\n????? Logged user?\n` , loggedUsr );
    if( loggedUsr ){
      res.json( loggedUsr );
    }else{
      res.redirect('/');
    }
  });

  app.get( '/friends' , function( req , res ){
    res.render('friends');
  });

  app.get( '/usrs' , function( req , res ){
    usrs.idx( req , res );
  });

  app.get( '/update_usr' , function( req , res ){
    usrs.idx_one( req , res );
  });


  app.get( '/logout' , function( req , res ){
    req.session.usr = {};
    res.redirect('/');
  });

  app.post( '/log_usr' , function( req , res ){
    console.log(`TO /LOG_USR ROUTES IN BACKEND`);
    // console.log(req.session);
    usrs.log( req , res );
  });

  app.post( '/reg_usr' , function( req , res ){
    console.log(`TO /REG_USR ROUTES IN BACKEND`);
    console.log(req.session);
    usrs.reg( req , res );
  });

  app.post( '/friendReq' , function( req , res ){
    console.log(`TO /FRIENDREQ ROUTES IN BACKEND`);
    console.log(req.body);
    usrs.reqFrnd( req , res );
  });

  app.delete( '/del_usr_:victimId' , function( req , res ){
    usrs.delete( req , res );
  });

  // app.get( '/bckts' , function( req , res ){
  //   console.log(`TO / ROUTES IN BACKEND`);
  //   bckts.idx( req , res );
  // });
  //
  // app.get( '/dec_bckt_inv_:bcktId/:qty' , function( req , res ){
  //   bckts.adj_inv( req , res );
  // });
  //
  // app.delete( '/rep_inv/:bcktId/:qty' , function( req , res ){
  //   bckts.rep_inv( req , res );
  // });
  //
  // app.post( '/add_bckt' , function( req , res ){
  //   console.log(`TO /ADD_CSTMR ROUTES IN BACKEND`);
  //   console.log(req.body);
  //   bckts.add( req , res );
  // });
  //
  // app.delete( '/del_bckt_:victimId' , function( req , res ){
  //   bckts.delete( req , res );
  // });

  app.post( '/add_bckt' , function( req , res ){
    console.log(`\nAdding bucket:`,req.body);
    bckts.add( req , res );
  });

  app.post( '/do_bckt' , function( req , res ){
    bckts.do( req , res );
  });


  app.get( '/bckts' , function( req , res ){
    console.log(`TO / ROUTES IN BACKEND`);
    bckts.idx( req , res );
  });

  app.get( '/frndshps' , function( req , res ){
    console.log(`TO /FRNDSHPS ROUTES IN BACKEND`);
    frnds.idx( req , res );
  });

  app.post( '/confFriend' , function( req , res ){
    console.log('\n\nChicking for confirmation in ROUTES',req.body);
    frnds.conf( req , res );
  });

  app.post( '/denyFriend' , function( req , res ){
    console.log('\n\nChicking for denial in ROUTES',req.body);
    frnds.delete( req , res );
  });

  app.delete( '/rejectFriendReq' , function( req , res ){
    frnds.delete( req , res );
  });

  app.delete( '/del_bckt_:victimId' , function( req , res ){
    bckts.delete( req , res );
  });


};
