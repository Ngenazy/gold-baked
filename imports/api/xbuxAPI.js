import { Meteor }     from 'meteor/meteor';
import { Mongo }      from 'meteor/mongo';
import   moment       from 'moment';
import   SimpleSchema from 'simpl-schema';
//import shortid      from 'shortid';

export const InvestmentsCol         = new Mongo.Collection('investments');
export const JoiningFeesCol         = new Mongo.Collection('joining_fees');
export const CapitalFeesCol         = new Mongo.Collection('capital_fees');
export const PackageListCol         = new Mongo.Collection('package_list');


//::::::::::::::::::::::::::  Server ::::::::::::::::::::::::::::::::::::::::::::
if (Meteor.isServer) {
  //publish user specific Info
  Meteor.publish( null, function(){
    return Meteor.users.find( { _id:this.userId },{ fields: { userDetails:1 }});
  });

  //
  Meteor.publish('capitalFeesPub', function(){
    return CapitalFeesCol.find({ _id: this.userId });
  });

  //
  Meteor.publish('packageListPub', function(){
    return PackageListCol.find({ });
  });

  //
  Meteor.publish('investmentsPub', function(){
    return InvestmentsCol.find({ _id: this.userId });
  });

  //xxx3*xxx subs'

  //xxx33xxx
  Meteor.publish('joiningFeesPool', function(){
    return JoiningFeesCol.find({ });
  });

  //xxx34xxx
  Meteor.publish('capitalFeesPool', function(){
    return CapitalFeesCol.find({ });
  });

  //xxx35xxx
  Meteor.publish('investmentsPool', function(){
    return InvestmentsCol.find({ });
  });
}

//::::::::::::::::::::::::::::::::: Meteor Methods ::::::::::::::::::::::::::::::
//Defining Meteor methods
Meteor.methods({

  //1. ::::::::::::::::::::::::::::::::::::::
  'user.details.insert'(userDetails){
    //if user is not logged in
    if (!this.userId) {
      throw new Meteor.Error('un-authorized');
    }

    //define schema for user details
    new SimpleSchema({
      userDetails:{
        type: Object,
        max:3,
      },
      "userDetails.userCell":{
        type:String,
      },
      "userDetails.bank":{
        type:String,
      },
      "userDetails.bankAcc":{
        type:String,
      }
    }).validate({ userDetails })

  //Update self to userStatus:'inNone' & userLevel:1 in users_details
    Meteor.users.update(
      //Query Parameters
      { _id:this.userId },
      //set specified fields
      {
        $set:{
              //fields
              "userDetails.userCell":     userDetails.userCell,
              "userDetails.userBank":     userDetails.bankAcc,
              "userDetails.userBankAcc":  userDetails.bankAcc,
              "userDetails.userStatus":   "hasNoPOP"
          }
        });
},

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

'payment.proof.insert'(paymentDetails){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

console.log(paymentDetails);
  //define schema for user details
  new SimpleSchema({
    paymentDetails:{
      type: Object,
      max:3,
    },
    "paymentDetails.voucherNum":{
      type:String,
    },
    "paymentDetails.voucherPin":{
      type:String,
    },
    "paymentDetails.bankToRedeem":{
      type:String,
    }
  }).validate({ paymentDetails })


  //insert POP record
  JoiningFeesCol.insert({
    _id:       this.userId,
    voucherNum:   paymentDetails.voucherNum,
    voucherPin:   paymentDetails.voucherPin,
    bankToRedeem: paymentDetails.bankToRedeem,
    showConfirm:  true,  //flag to cotrol display of view to confirm details
    confirmed:    false,
    submittedAt:  new Date().getTime()
  });

  //Update self to userStatus ==='hasNoInv'
  Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": 'hasNoInv' } });



},
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

'investment.proof.insert'(paymentDetails){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

console.log(paymentDetails);
  //define schema for user details
  new SimpleSchema({
    paymentDetails:{
      type: Object,
      max:3,
    },
    "paymentDetails.voucherNum":{
      type:String,
    },
    "paymentDetails.voucherPin":{
      type:String,
    },
    "paymentDetails.bankToRedeem":{
      type:String,
    }
  }).validate({ paymentDetails })

  //epoch
  let nowMoment       = moment();
  let paymentDeadline = nowMoment.add(6, 'hours');
  let unixEpoch       = paymentDeadline.valueOf();

  //insert POP record
  CapitalFeesCol.insert({
    _id:          this.userId,
    voucherNum:   paymentDetails.voucherNum,
    voucherPin:   paymentDetails.voucherPin,
    bankToRedeem: paymentDetails.bankToRedeem,
    submittedAt:  unixEpoch
  });

  //Update self to userStatus ==='hasNoInv'
  Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.popStatus": 'payingCapital' } });

},


//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'user.level.status.update'(){
  //Update self to userStatus:'inNone' & userLevel:1 in users_details
  Meteor.users.update(
    //Query Parameters
    { _id:this.userId },
    //set specified fields
    { $set:{ userLevel: 1, userStatus:'inNone' }}
  );
},

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
'investment.create'(packageName){
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

   console.log(userDetails);

   //TODO: compute date time (+6hrs) for POP submission

    //insert order
    InvestmentsCol.insert({
      _id:         this.userId,
      userName:    userDetails.userName,
      userCell:    userDetails.userCell,
      userBank:    userDetails.userBank,
      userBankAcc: userDetails.userBankAcc,
      packageName,
      seedFund,
      investedAt:    new Date().getTime()
    });

    //Update self to userStatus ==='pledging' in users_details
    Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": 'hasPendingInv' } });

}

});
