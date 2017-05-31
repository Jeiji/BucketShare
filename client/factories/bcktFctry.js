app.factory( 'bcktFctry' , [ '$http' , function( http ){
  orders = [];
  order = {};
  function ordrFctry(){
    var _this = this;

    this.idx = function( callbackToCtrl ){
      let dbBuckets = [];
      http.get( '/bckts' ).then( function( res ){
        dbBuckets = res.data;
        orders = dbBuckets
        callbackToCtrl( dbBuckets );
      });
    };

    this.idx_F = function( callbackToCtrl ){
      let dbFrndshps = [];
      http.get( '/frndshps' ).then( function( res ){
        console.log('Returning to factory with friends...',res.data);
        dbFrndshps = res.data;
        callbackToCtrl( dbFrndshps );
      }).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
      });
    };

    this.addBckt = function( newBckt, callback ){
      http.post( '/add_bckt' , newBckt ).then( function( res ){
        console.log(res);
      }).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
      });
      callback();
    };

    this.delOrdr = function( victimId , callbackToCtrl ){
      http.delete( '/del_ordr_' + victimId ).then( function( deletedOrdr ){
        callbackToCtrl( deletedOrdr )
      }).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
      });
    };

    this.doBckt = function( bckt , callbackToCtrl ){
      http.post( '/do_bckt' , bckt ).then( function( res ){
        callbackToCtrl( res )
      } ).catch( function( reason ){
        console.log(reason);
        console.log(`Handling the rejection...`);
      }) ;

    };


  };
  return new ordrFctry();
}]);
