console.log('Bckts Ctrl up!');
const mongoose = require('mongoose');
const Bckt = mongoose.model('Bckt');
const User = mongoose.model('User');

function ordrsCtrl(){


  this.add = function( req , res ){
    let ab = {};
    let nb = req.body;
    let maker = {};
    console.log(nb);
    User.findOne( { _id : nb.usrId } , function( err , user ){
      if (err) {
        res.json( err );
      }else {
        maker = user;
        console.log('This is the bucket maker: ' , maker );

        // Creating the future timeRem reference
        let userDate = new Date(nb.timeRem).getTime();
        console.log('\n\n@#$@#$@#$@#$@$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$@#$',Number(userDate));
        // let futureDate = new Date;
        let now = Date.now();
        // Adding hours to the original date
        // futureDate = now + ( Number(userDate) * 3600000 );
        // console.log('Adding'+userDate * 3,600,00+'to the date!');



        // F-Score Rates
        let diffScore = nb.diff * .3;
        let timeScore = 1/(userDate / 36) * 10;
        let compScore = 1/nb.compTime * 10;
        let urgScore = Math.pow(nb.urg,2);
        let progScore = 0;
        if (nb.prog) {
          progScore = nb.prog * .1;
        }

        console.log(`
                      Diff:${diffScore}
                      Time:${timeScore}
                      Comp:${compScore}
                      Importance:${urgScore}
                      Progress${progScore}

                    `);
        let fscore = ((urgScore+progScore-diffScore-timeScore-compScore+5)*2).toFixed(2)
        console.log('\n\n\n%&?%&?%&?%&?%&?%&? F-SCORE FOR THIS ONE IS...' , fscore , '!%&?%&?%&?%&?%&?%&?\n\n\n' );






        // Setting the attributes for the new task
        Bckt.create( {  name : nb.name,
                        desc : nb.desc,
                        done : '',
                        diff : nb.diff,
                        timeRem : userDate,
                        urg : nb.urg,
                        prog : ( nb.prog ? nb.prog : 0 ),
                        compTime: nb.compTime,
                        fscore : fscore
                        } , function( err , data ){
          console.log(`******************************`);
          console.log(nb);
          if( err ){
            console.log(`Error adding new task to DB`);
            console.log(err);
          }else{
            console.log(`DID IT, adding to users...`);
            ab = data;
            User.findOne( { _id : nb.usrId } , function( err , user ){
              if( err ){
                console.log(err.errors);
              }else{
                console.log(ab);
                user.buckets.push( ab );
                console.log(user);
                user.save();
                console.log(`Now adding to User...`);
              };


            });
            // Part of Onus addition...
            // if( nb.usrId2 ){
            //   console.log(`++++++++++++++++++ DON'T FORGET ME! (${ nb.usrId2 }) ++++++++++++++++++`);
            //   User.findOne( { _id : nb.usrId2 } , function( err , user ){
            //     if( err ){
            //       console.log(err.errors);
            //     }else{
            //       console.log(ab);
            //       user.buckets.push( ab );
            //       console.log(user);
            //       user.save();
            //       console.log(`Now adding to User...`);
            //     };
            //   });
            // }
          };
        });
      }
    });
    console.log( maker );

  };

  this.idx = function( req , res ){
    Bckt.find( {} )
      .populate('_customer')
      .populate('_product')
      .populate('creator')
      .exec(function( err , allOrdrs ){
      if( err ){
        console.log(`Error indexing all orders from db.`);
      }else{
        console.log(`SNATCHED ALL ORDERS FROM DB:`);
        console.log( allOrdrs );
        res.json( allOrdrs )
      };
    });
  };

  this.do = function( req , res ){
    Bckt.findOne( { _id : req.body._id } , function( err , bckt ){
      if( err ){
        console.log(err.errors);
      }else{
        console.log(`Bout to DO it, son!`);
        bckt.done = 'checked';
        console.log(bckt);
        bckt.save();
        res.json( { success : true } )
      };
    });
  };

  this.delete = function( req , res ){
    console.log(req.params);
    let prdctIdToAdj = {};
    let qty = 0;
    Bckt.findOne( { _id : req.params.victimId } , function( err , ordr ){
      if( err ){
        console.log(`Couldn't adjust product inventories`);
      }else{
      console.log(`FOUND THE ONE I WANT TO DELETE`);
      prdctIdToAdj = ordr._product;
      qty = ordr.qty;
      Bckt.remove( { _id : req.params.victimId } , function( err , deletedOrdr ){
          if( err ){
            console.log(`Couldn't delete`);
          }else{
            console.log(`GETTING HERE AFWLKJAFWEL; KAFF ;LKDJS ;ASLDJKF ;ASDLFJK AS;DLFKJ AS;DLFKJ ASD;FLJK AS`);
            // res.json( deletedOrdr );
            res.redirect('/rep_inv/'+prdctIdToAdj+'/'+qty)
          };
        });
      };
    });

  };

};
module.exports = new ordrsCtrl;
