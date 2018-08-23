import { Meteor }     from 'meteor/meteor';
import { Mongo }      from 'meteor/mongo';
import  SimpleSchema  from 'simpl-schema';
import  shortid       from 'shortid';
//importing collection for client data
import { UsersCollection }  from './xbuxAPI';
// import { findAndModify   }  from 'meteor/fongandrew:find-and-modify';
// import   db                 from 'meteor-native-mongo';

//define collections (server side)
export const OrdersMenuCollection   = new Mongo.Collection('plans');
export const PHOrders               = new Mongo.Collection('ph_orders');
export const GHOrders               = new Mongo.Collection('gh_orders');
if (Meteor.isServer) {

  //publish all orders collections and subscribe separately
  Meteor.publish('phOrderPub', function(){
    return PHOrders.find({ donorID: this.userId });
  });

  //publish all orders collections and subscribe separately
  Meteor.publish('ghOrderPub', function(orderType){
    return GHOrders.find(
      {
        //[orderType]:  1,
        ghStatus:     "open",
        [orderType]:  { $gt: 0 },
        currentGH:    { $gt: 0 }
      },
      //2.field projection
      {
         fields:{
           //excluding these fields
           "totalGH" :0,
           "confirmed" : 0,
           "currentDonors" : 0,
         }
      }
    );
  });

  //publish all orders collections and subscribe separately
  Meteor.publish('ghOrderPub02', function(){
    return GHOrders.find(
      {
        donorID:this.userId,
        ghStatus:"closed"
      },
      //2.field projection
      {
         fields:{
           //excluding these fields
           "totalGH" :0,
           "confirmed" : 0,
           "currentDonors" : 0,
         }
      }
    );
  });


  //
  Meteor.publish('ordersMenuPub', function(){
    return OrdersMenuCollection.find({});
  });

  //
  Meteor.publish('pledgeOffersPub', function(){
    return PHOrders.findOne({}, { sort: { date: -1}, limit: 1 });
  });

  //Bronze order publication
  Meteor.publish('bronzePub', function(){
    return PHOrders.find({ }, { fields:{ donorID:1,bronze: 1},sort: { date: -1}, limit:1});
  });
}

//Defining Meteor methods
Meteor.methods({
'order.create'(orderType){
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //validate url
    new SimpleSchema({
      orderType:{
        type: String,
      }
    }).validate({ orderType })

    //set phAmounts based on orderType
    if (orderType === ('lean' || 'express') )
    {
       //phAmount:300
       phAmount = 300;
    }
    else if (orderType === 'bronze')
    {
      //phAmount:500
      phAmount = 500;
    }
    else if (orderType === 'silver')
   {
       //phAmount:800
       phAmount = 800;
   }
   else if (orderType   === 'gold')
   {
     //phAmount:1800
     phAmount = 1800;
   }

    //get custom data(fields) from users collection
    const userDetails01 = Meteor.users.find(
                                          { _id:this.userId },
                                          {
                                            fields: {
                                              "userDetails.userName":1,
                                              "userDetails.userCell":1,
                                              "userDetails.userLevel":1
                                                    }
                                          }).fetch()[0];

    const userDetails02 = { ...userDetails01 };
    const userDetails   =  userDetails02.userDetails;

    //
    //const incomingOrder = GHOrders.update({});

    // const incomingOrder = GHOrders.findAndModify({
    //                           //1. query criteria.
    //                           query:{
    //                                   [orderType]:{ $gt: 0 },
    //                                   "currentGH":{ $gt: 0 },
    //                                   ghStatus: "open",
    //                                 },
    //                           //2. sort document a select top
    //                           sort:{  createdAt: 1 },
    //                           //3.decrement pocket matching
    //                           update:{
    //                                   $inc:{ [orderType]: -1 },
    //                                   ghStatus: "closed"
    //                                 },
    //                           //4.No insertion what-so-ever
    //                           upsert: false,
    //                           //5.return us these fields
    //                           fields:{
    //                                   "recipID": 1,
    //                                   "currentGH":1
    //                                 }
    // });
   console.log(userDetails);
    // //get custom data(fields) from users collection
    // const coreDetails = UsersCollection.find({
    //                                             _id:    this.userId
    //                                           },
    //                                          {
    //                                             fields: {
    //                                                       userName:   1,
    //                                                       userEmail:  1,
    //                                                     }
    //                                             });

    //insert order
    PHOrders.insert({
      donorID:      this.userId,
      //donorName:    userDetails.userName,
      // donorCell:    userDetails.userCell,
      // donorLevel:   userDetails.userLevel,
      orderType,
      phAmount,
      // [orderType]:  orderType,     //ES6 shorthand for orderType:orderType
      // orderStatus: 'unallocated',
      // recipID:      null,           //not yet available to be updated by receiver
      // recipName:    null,
      // recipCell:    null,
      // recipBank:    null,
      // recipAcc:     null,
      pledgedAt:    new Date().getTime()
    });

    //Update self to userStatus ==='pledging' in users_details
    Meteor.users.update({ _id:this.userId },{ $set:{ "userDetails.userStatus": 'inPH' } });
},

//Accept pledge (request) to hook you up.
'order.accept'(recipID, phAmount){

  //TODO: validate data using SimpleSchema

  //update reserved/gh_orders
  return GHOrders.update(
    {
      recipID,
      ghStatus:"open"
    },
    {
      $set:{
              ghStatus:"closed",
              donorID: this.userId
            }
    }
  );
},

//method for confirming order
'order.collect'(donorID, phAmount, uName, donorName, donorCell, donorLevel, bank, bAcc ){
  //define objects
  const donorDetails = { donorID, donorName, donorCell, donorLevel };
  //if user is not logged in
  if (!this.userId) {
    throw new Meteor.Error('un-authorized');
  }

  //validate arguments
    new SimpleSchema({
      dID:{
        type:String,
      }
    }).validate({ dID })

  PHOrders.update({ donorID: dID },
    { $set:{ recipID: this.userId, recipName:uName,recipBank:bank,recipAcc:bAcc } });
  //find  ghOrder object
  const ghOrder01 = Meteor.users.find(
                                        { _id:this.userId },
                                        {
                                          fields: {
                                            "userDetails.totalGH":1,
                                            "userDetails.confirmedGH":1,
                                            "userDetails.currentGH":1
                                                  }
                                        }).fetch()[0];

  const ghOrder02     = { ...ghOrder01 };
  const ghOrder       =  ghOrder02.ghOrder;
  console.log(ghOrder);

  //update reserved/gh_orders
  Meteor.users.update({ _id: this.userId },
                      { $push:{
                              "userDetails.donorDetails":donorDetails,
                              }
                      });
}

});
