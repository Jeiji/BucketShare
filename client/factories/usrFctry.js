app.factory( 'usrFctry' , [ '$http' , function( http ){
  function usrFctry(){
    var _this = this;
    users = [
    { name : 'Gordon' , buckets : [] }
  ];

  let thisUsr = {};



  this.idx = function( callbackToCtrl ){
    let dbUsers = [];
    http.get( '/usrs' ).then( function( res ){
      dbUsers = res.data;
      users = dbUsers
      callbackToCtrl( dbUsers );
    }).catch( function( reason ){
      console.log(reason);
      console.log(`Handling the rejection...`);
    });
  };



  this.regUsr = function( newUsr , callbackToCtrl ){
    console.log(`Adding`);
    http.post( '/reg_usr' , newUsr ).then( function( res ){
      thisUsr = res.data;
      callbackToCtrl( res );
    }).catch( function( reason ){
      console.log(reason);
      console.log(`Handling the rejection...`);
    });
    };

    this.logUsr = function( newUsr , callbackToCtrl ){
      console.log(`Adding`);
      http.post( '/log_usr' , newUsr ).then( function( res ){
        thisUsr = res.data;
        callbackToCtrl( res );
      }).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
      });
      };

    this.idxLogged = function( callbackToCtrl ){
      let logged = {};
      http.get( '/chk_logged' ).then( function( loggedUsr ){
        console.log(`ABOUT TO LOG LOGGED USER`,loggedUsr.data);
        logged = loggedUsr.data
        console.log(logged);
        callbackToCtrl( loggedUsr );
      }).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
          callbackToCtrl( { nope: 'nada' } );
      });
    };

};
  return new usrFctry();
}]);
