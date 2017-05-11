app.controller('bcktCtrl' , ['$scope' , 'bcktFctry' , 'usrFctry' , '$location' , '$http',   function( scope , bf , uf , location, http ) {

    // const idx = function(){
    //   bf.idx( function(dataFromFactory ){
    //           scope.buckets = dataFromFactory;
    //   });
    // };
    //
    // idx();






  const idxLogged = function(){
    scope.thisUsr = {};
    uf.idxLogged( function( logged ){
      console.log(logged.data);
      scope.thisUsr = logged.data;
      console.log( `\n!#!#!# AFTER TRYING TO FIND LOGGED` , scope.thisUsr );
      if( !scope.thisUsr.name ){
        location.url('/dashboard')
        console.log('Sorry');
      };
    });

  };
  idxLogged();

  const idx_B = function(){
    uf.idx( function( dataFromCF ){
      scope.users = dataFromCF
    });
  };

  const idx_U = function(){
    uf.idx( function( dataFromCF ){
      scope.users = dataFromCF
    });
  };

  idx_U();

  const idx_F = function(){
    bf.idx_F( function( dataFromCF ){
      scope.friends = dataFromCF
      console.log(scope.friends);
    });
  };

  idx_F();

  scope.confirmFriend = function( requester ){
    console.log(`\n\nNEW REQUEST CONFIRM WITH `,requester.name);
    http.post( '/confFriend' , requester ).then(function( res ){
      console.log('Made a new friend with ',requester.name,'!');
      idx_F();
    }).catch(function( reason ){
      console.log(`Handling http for Conf Friend... Reason:`,reason);
    });
  };





  scope.addBckt = function( newBckt ){
    scope.newBckt.usrId = scope.thisUsr._id;
    console.log(newBckt);
    bf.addBckt( newBckt );
    idx_U();

    $('.resettable').val('');
    scope.newBckt = {}
    $('.defaultSelect').prop('selected', function() {
        return this.defaultSelected;
    });

  };

  scope.doBckt = function( bckt ){
    bf.doBckt( bckt , function( dataFromBF ){
      console.log( ` HERE'S THE NEW TEST THING ${dataFromBF}` );
      console.log(dataFromBF);
    });
    idx_U();
  };






}]);
