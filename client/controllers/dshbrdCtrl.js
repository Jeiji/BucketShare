app.controller('dshbrdCtrl' , ['$scope' , '$location' , 'bcktFctry'  , 'usrFctry' ,  function( scope , location , of , uf ) {

  const idxUsrs = function(){
    uf.idx( function( allUsrs ){
      scope.usrs = allUsrs
    });
  };
  idxUsrs();


  scope.usrLogin = function( usr ){
    console.log(scope.user);
    uf.logUsr( usr , function( res ){
      if (res.data.err ) {
        scope.loginError = res.data.err
        console.log(scope.loginError);
      }else {
        location.url('/buckets')
      }
    });
  };

  scope.usrRegister = function( usr ){
    uf.regUsr( usr , function( res ){
      console.log(`\n\n!!**!!**!!**!!**!!**!!**!!** should return user or not...`,res);
      if( res.data.name ){
        location.url('/buckets')
      };

    });
  };



}]);
