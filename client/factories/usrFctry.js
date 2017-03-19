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
    });
  };



  this.regUsr = function( newUsr , callbackToCtrl ){
    console.log(`Adding`);
    http.post( '/reg_usr' , newUsr ).then( function( res ){
      thisUsr = res.data;
      callbackToCtrl( res );
    });
    };

    this.logUsr = function( newUsr , callbackToCtrl ){
      console.log(`Adding`);
      http.post( '/log_usr' , newUsr ).then( function( res ){
        thisUsr = res.data;
        callbackToCtrl( res );
      });
      };

    this.idxLogged = function( callbackToCtrl ){
      callbackToCtrl( thisUsr );
      console.log(`Heh`);
    };

};
  return new usrFctry();
}]);
