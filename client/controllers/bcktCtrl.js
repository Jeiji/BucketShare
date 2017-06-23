app.controller('bcktCtrl' , ['$scope' , 'bcktFctry' , 'usrFctry' , '$location' , '$http',   function( scope , bf , uf , location, http ) {

  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1; //January is 0!
  var yyyy = today.getFullYear();

  if(dd<10) {
    dd = '0'+dd
  }

  if(mm<10) {
    mm = '0'+mm
  }

  today = yyyy + '-' + mm + '-' + dd;
  scope.today = today;

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

      // // F-Score Rates
      // for (idx in scope.thisUsr.buckets) {
      //   console.log(scope.thisUsr.buckets[idx]);
      //   let diffScore = scope.thisUsr.buckets[idx].diff * .3;
      //   let timeScore = 1/(scope.thisUsr.buckets[idx].timeRem / 3600000) * 10000000;
      //   console.log(1/(scope.thisUsr.buckets[idx].timeRem / 3600000) * 10000000);
      //   let urgScore = Math.pow(scope.thisUsr.buckets[idx].urg , 2);
      //   let progScore = 0;
      //   if (scope.thisUsr.buckets[idx].prog) {
      //     progScore = scope.thisUsr.buckets[idx].prog * .1;
      //   }
      //   scope.thisUsr.buckets[idx].fscore = (timeScore+urgScore+progScore-diffScore).toFixed(2)
      //   console.log('\n\n\n%&?%&?%&?%&?%&?%&? F-SCORE FOR THIS ONE IS...' , scope.thisUsr.buckets[idx].fscore , '!%&?%&?%&?%&?%&?%&?\n\n\n' );
      //
      // }


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

  const update_U = function(){
    http.get( '/update_usr' ).then( function( res ){
      scope.thisUsr = res.data;
    }).catch( function( reason ){
      console.log(reason);
      console.log(`Handling the rejection...`);
    });
  };

  idx_U();

  const idx_F = function(){
    bf.idx_F( function( dataFromCF ){
      scope.friends = dataFromCF
      scope.requests = [];
      console.log(scope.friends);
      for (let i = 0; i < scope.friends.length; i++) {
        if ( !scope.friends[i].acc && scope.friends[i].ref._id != scope.thisUsr._id ) {
          scope.requests.push( scope.friends[i] );
          console.log(scope.requests);
        }
      }
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

  scope.denyFriend = function( requester ){
    console.log(`\n\nNEW REQUEST denial... WITH `,requester.name);
    http.post( '/denyFriend' , requester ).then(function( res ){
      console.log('D-nied friendship to ',requester.name,'!');
      idx_F();
    }).catch(function( reason ){
      console.log(`Handling http for Conf Friend... Reason:`,reason);
    });
  };





  scope.addBckt = function( newBckt ){
    scope.newBckt.usrId = scope.thisUsr._id;
    console.log(newBckt);
    bf.addBckt( newBckt , function(){
      idx_U();
      update_U();
    } );
    idx_U();
    update_U();



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
    update_U();
  };






}]);
