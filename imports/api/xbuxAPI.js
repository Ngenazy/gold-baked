import { Meteor }     from 'meteor/meteor';
import { Mongo }      from 'meteor/mongo';
import   moment       from 'moment';
import   SimpleSchema from 'simpl-schema';
//import shortid      from 'shortid';
export const RoutesCol              = new Mongo.Collection('routes');
export const InvestmentsCol         = new Mongo.Collection('investments');
export const AdminFeesCol           = new Mongo.Collection('admin_fees');

export const SeedFundsCol           = new Mongo.Collection('seed_funds');
export const PackageListCol         = new Mongo.Collection('package_list');


//::::::::::::::::::::::::::  Server ::::::::::::::::::::::::::::::::::::::::::::
if (Meteor.isServer) {
  //publish user specific Info
  Meteor.publish( null, function(){
    return Meteor.users.find( { _id:this.userId },{ fields: { userDetails:1 }});
  });

  //
  Meteor.publish('routesPub', function(userID,pathname){
    //get custom data(fields) from users collection
    const userDetails01 = Meteor.users.find({ _id:userID },{ fields: { "userDetails.userStatus":1,}
                                          }).fetch()[0];

    const userDetails02 = { ...userDetails01 };
    const userDetails   =  userDetails02.userDetails;
    const userStatus    = userDetails.userStatus

    return RoutesCol.find({[userStatus]:pathname});
  });
  //
  Meteor.publish('seedFundsPub', function(){
    return SeedFundsCol.find({ _id:this.userId });
  });

  //
  Meteor.publish('packageListPub', function(){
    return PackageListCol.find({ });
  });

  //
  Meteor.publish('investmentsPub', function(){
    return InvestmentsCol.find({ _id: this.userId });
  });

  //publish user _id for Admin Fee record
  Meteor.publish('userStatusPub', function(){
    return Meteor.users.find( { _id:this.userId },{ fields: { "userDetails.userStatus":1 }});
  });

  //publish user _id for Admin Fee record
  // Meteor.publish('nextPayDayPub', function(){
  //   return Meteor.users.find( { _id:this.userId },{ fields: { "userDetails.userStatus":1 }});
  // });
  //xxx3*xxx subs'

  //xxx33xxx
  Meteor.publish('adminFeesPool', function(){
    return AdminFeesCol.find({ });
  });

  //xxx34xxx
  Meteor.publish('seedFundsPool', function(){
    return SeedFundsCol.find({  });
  });

  //xxx35xxx
  Meteor.publish('investmentsPool', function(){
    return InvestmentsCol.find({ investmentStatus:"waitingSeedFunding" });
  });
}

//::::::::::::::::::::::::::::::::: Meteor Methods ::::::::::::::::::::::::::::::
//Defining Meteor methods
Meteor.methods({

  //1. ::::::::::::::::::::::::::::::::::::::
  'insert.wallet.details'(walletDetails){
    //if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('un-authorized');
    }

    //define schema for user details
    new SimpleSchema({
      walletDetails:{
        type: Object,
        max:3,
      },
      "walletDetails.userCell":{
        type:String,
        min:10
      },
      "walletDetails.userBank":{
        type:String,
        max:20,
      },
      "walletDetails.userBankAcc":{
        type:String,
        max:20
      }
    }).validate({ walletDetails })

    Meteor.users.update(
      //Query Parameters
      { _id:this.userId },
      //set specified fields
      {
        $set:{
              //fields
              "userDetails.userCell":walletDetails.userCell,
              "userDetails.userBank":walletDetails.userBank,
              "userDetails.userBankAcc":walletDetails.userBankAcc,
              "userDetails.userStatus":"userWithoutAdminFeeProof"
          }
        });
},

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

'insert.admin.fee.proof'(paymentDetails){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //define schema for user details
  new SimpleSchema({
    paymentDetails:{
      type: Object,
      max:3,
    },
    "paymentDetails.voucherNum":{
      type:String,
      min:10,
      max:40
    },
    "paymentDetails.voucherPin":{
      type:String,
      max:6,
      min:4
    },
    "paymentDetails.bankToRedeem":{
      type:String,
      min:3,
      max:20
    }
  }).validate({ paymentDetails })


  //insert POP record
  AdminFeesCol.insert({
    _id:          this.userId,
    voucherNum:   paymentDetails.voucherNum,
    voucherPin:   paymentDetails.voucherPin,
    bankToRedeem: paymentDetails.bankToRedeem,
    submittedAt:  new Date().getTime()
  });

  //Update self to userStatus ==='hasNoInv'
  Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": "userWithAdminFeeProof" } });
},


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

'insert.seed.fund.proof'(paymentDetails){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //define schema for user details
  new SimpleSchema({
    paymentDetails:{
      type: Object,
      max:3,
    },
    "paymentDetails.voucherNum":{
      type:String,
      min:10,
      max:50
    },
    "paymentDetails.voucherPin":{
      type:String,
      min:3,
      max:6
    },
    "paymentDetails.bankToRedeem":{
      type:String,
      min:2,
      max:18,
    }
  }).validate({ paymentDetails })

  //epoch
  //let nowMoment        = moment();
  //let paymentDeadline = nowMoment.add(7, 'days');
  //let unixEpoch       = paymentDeadline.valueOf();

  //insert POP record
  SeedFundsCol.insert({
    _id:          this.userId,
    voucherNum:   paymentDetails.voucherNum,
    voucherPin:   paymentDetails.voucherPin,
    bankToRedeem: paymentDetails.bankToRedeem,
    proofSubmittedAt: new Date().getTime(),
  });

  //Update self to userStatus ==='hasNoInv'
  Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": "userWithSeedFundProof" } });

},


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'block.investment'(investmentIDtoBlock){
  Meteor.users.update(
    //Query Parameters
    { _id:investmentIDtoBlock },
    //set specified fields
    { $set:{ "userDetails.userStatus":"userWithDefaultedPayment" }}
  );

  //update record
  InvestmentsCol.update({ _id:investmentIDtoBlock},{$set:{ "userDetails.investmentStatus":"blocked"}})
},

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'create.investment'(packageName){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //validate url
    new SimpleSchema({
      packageName:{
        type: String,
      }
    }).validate({ packageName })

    //set phAmounts based on orderType
    if (packageName  === ('Express') )
    {
      //seedFund:300
      seedFund = 300;
    }
    else if (packageName === 'Bronze')
    {
      //seedFund:500
      seedFund = 500;
    }
    else if (packageName === 'Silver')
    {
      //seedFund:1000
      seedFund = 1000;
    }
    else if (packageName === 'Gold')
    {
     //seedFund:2000
     seedFund = 2000;
    }
    else if (packageName === 'Double Gold')
    {
     //seedFund:4000
     seedFund = 4000;
    }
    else if (packageName === 'Diamond')
    {
     //seedFund:5000
     seedFund = 5000;
    }
    else if (packageName === 'Platinum')
    {
     //seedFund:10 000
     seedFund = 10000;
    }
    else if (packageName    === 'VIP Suit')
    {
     //seedFund:13 000
     seedFund = 13000;
    }
    else if (packageName    === 'VVIP Suit')
    {
     //seedFund:20 000
     seedFund = 20000;
    }
    //get custom data(fields) from users collection
    const userDetails01 = Meteor.users.find(
                                          { _id:this.userId },
                                          {
                                            fields: {
                                              "userDetails.userName":1,
                                              "userDetails.userCell":1,
                                              "userDetails.userBank":1,
                                              "userDetails.userBankAcc":1
                                                    }
                                          }).fetch()[0];

    const userDetails02 = { ...userDetails01 };
    const userDetails   =  userDetails02.userDetails;

   //epoch
   let nowMoment       = moment();
   let paymentDeadline = nowMoment.add(6, 'hours');
   let unixEpoch       = paymentDeadline.valueOf();

    //insert investment
    InvestmentsCol.insert({
      _id:this.userId,
      userName:userDetails.userName,
      userCell:userDetails.userCell,
      userBank:userDetails.userBank,
      userBankAcc:userDetails.userBankAcc,
      packageName,
      seedFund,
      investmentStatus:"waitingSeedFunding",
      sixHrDeadline:unixEpoch,
      investedAt:    new Date().getTime()
    });

    //Update self to userStatus ==='pledging' in users_details
    Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": 'userWithLockedInvestment' } });

},
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'activate.user'(userIDtoActivate){

  //validate url
    new SimpleSchema({
    userIDtoActivate:{
        type: String,
      }
    }).validate({ userIDtoActivate })

    Meteor.users.update({ _id:userIDtoActivate },{ $set:{
                            "userDetails.userStatus": "userWithValidAdminFeeProof" }
                       });
    //delete record
    AdminFeesCol.remove({ _id: userIDtoActivate});

},
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'reject.admin.proof'(userIDForRejectedProof){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //validate url
    new SimpleSchema({
    userIDForRejectedProof:{
        type: String,
      }
    }).validate({ userIDForRejectedProof })

    Meteor.users.update({ _id:userIDForRejectedProof },{ $set:{
                            "userDetails.userStatus": "userWithInvalidAdminFeeProof" }
                      });
    //delete record
    AdminFeesCol.remove({ _id:userIDForRejectedProof });

},

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'confirm.seed.fund.proof'(userIDtoUnlockInvestment){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //validate url
    new SimpleSchema({
      userIDtoUnlockInvestment:{
          type: String,
      }
    }).validate({ userIDtoUnlockInvestment})

    //epoch
    let nowMoment       = moment();
    let paymentDeadline = nowMoment.add(7, 'days');
    //compute next pay day after 7 days
    let nextPayDay      = moment().add(7, 'days').format("ddd DD MMM gggg HH:mm");
    let unixEpoch       = paymentDeadline.valueOf();

    //Update self to userStatus ==='pledging' in users_details
    Meteor.users.update({ _id:userIDtoUnlockInvestment },{ $set:{ "userDetails.userStatus": "userWithActiveInvestment" } });
    //update investment record
    InvestmentsCol.update({  _id:userIDtoUnlockInvestment},
                         {   $set:{
                              investmentStatus:"active",
                              sevenDayDeadline:unixEpoch,
                              nextPayDay,
                              activatedAt:new Date().getTime()
                            }
                          });

    //delete record
    SeedFundsCol.remove({ _id: userIDtoUnlockInvestment});

},
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'compute.next.pay.day'(userIDtoUnlockInvestment){
  //epoch
  let nowMoment       = moment();
  let paymentDeadline = nowMoment.add(7, 'days');
  //compute next pay day after 7 days
  let nextPayDay      = moment().add(7, 'days').format("ddd DD MMM gggg HH:mm");
  let unixEpoch       = paymentDeadline.valueOf();

  //update investment record
  InvestmentsCol.update({  _id:userIDtoUnlockInvestment},
                       {   $set:{
                            investmentStatus:"active",
                            sevenDayDeadline:unixEpoch,
                            nextPayDay,
                          }
                        });

}
});
