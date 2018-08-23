//IMPORTS
import   React                      from 'react';
import { Meteor    }                from 'meteor/meteor';
import { Accounts  }                from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   FlipMove                   from 'react-flip-move';
import   PledgeOffersView           from './PledgeOffersView';
import   PledgeOffersReservedView   from './PledgeOffersReservedView';
import { PHOrders }                 from '../api/orders';
//importing collection for client data
import { UsersCollection }          from '../api/xbuxAPI';

class PledgeOffers extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = {
                      pledgeOffers: [],
                      recipDetails: [],
                      reservedOrders: []
                   };
  }

  //commponent lifecycle hook functions
  componentDidMount(){
    //Track changes to pledge_orders_menu
     this.phOrdersTracker = Tracker.autorun(() => {

     //subscribe to plansPub
     Meteor.subscribe('userDetailsPub');
     Meteor.subscribe('pledgeOffersPub');
     Meteor.subscribe('bronzePub');
     // Meteor.subscribe('phOrderPub');
     //TODO: fetch recip detail from users
     //get custom data(fields) from users collection
     // const recipDetails01 = Meteor.users.find(
     //                                       { _id: Meteor.userId()},
     //                                       {
     //                                         fields: {
     //                                           "userDetails.userName":1,
     //                                           "userDetails.userBank":1,
     //                                           "userDetails.userBankAcc":1
     //                                                 }
     //                                       }).fetch()[0];
     //
     // const recipDetails02 = { ...recipDetails01 };
     // const recipDetails   =  recipDetails02.userDetails;

     const pledgeOffer01  = PHOrders.find({ }, { fields:{ donorID:1,bronze: 1},sort: { date: -1 }, limit:1}).fetch()[0];
     const pledgeOffer    = { ...pledgeOffer01 };
     const donorID        = pledgeOffer.donorID;
     const orderType      = pledgeOffer.bronze;
     const incomingOrder  = { donorID, orderType };
     const pledgeOffers   = this.state.pledgeOffers;


    //TODO:fetch reservedOrders from users.userDetails
     // const reservedOrders   = PHOrders.find({ recipID: Meteor.userId()},
     //                                            { sort: { date: -1} });
     console.log(pledgeOffer01);
     //set state's pledgeOffers
     this.setState({ pledgeOffers:[ ...this.state.pledgeOffers,incomingOrder ] });

    // const orderItems = OrdersMenuCollection .find({}).fetch();

     // //Switch locks ..but compose a dummy obj of locks
     // let orderLocks = { ...this.state.orderLocks };
     //
     // if (this.state.userLevel === 2 ) {
     //   //manually update keys for level in question
     //   //orderLocks['bronze'] = false;  //CAN BE ADDITIONAL FEATURE
     //   orderLocks['silver'] = true;
     //   //update state
     //   //this.setState({ orderLocks });
     //
     // }else if (this.state.userLevel === 3) {
     //   //orderLocks['silver'] = false;  //CAN BE ADDITIONAL FEATURE
     //   orderLocks['silver'] = true;
     //   //this.setState({ orderLocks });
     // }

     });

  }

  componentWillUnmount(){
    console.log('componentWillUnmount')
    this.phOrdersTracker.stop();
  }

  //render pledge offfer
  renderOffers(){
//if pledgeOffers is empty
if (!this.state.pledgeOffers.length) {
  //return null;
  console.log(this.state.pledgeOffers.length);
}

        //map orders
        const offers = this.state.pledgeOffers.map( (order) =>{

          //set phAmounts based on orderType
          if (order.orderType === ('lean' || 'express') )
          {
             //phAmount:300
             this.phAmount = 300;
          }
          else if (order.orderType === 'bronze')
          {
            //phAmount:500
             this.phAmount = 500;
          }
          else if (order.orderType === 'silver')
         {
             //phAmount:800
             this.phAmount = 800;
         }
         else if (order.orderType   === 'gold')
         {
           //phAmount:1800
           this.phAmount = 1800;
         }

         if(order.donorID){

          return ( <div key = { order.donorID }>
            {/* TODO: 2 buttons to be used for conditional rendering */}
            <p> Order Type: { order.orderType } </p>
            <p> Amount:    { this.phAmount  }</p>
            <button  onClick={() => {
                          Meteor.call('order.collect',
                                      order.donorID,
                                      this.phAmount,
                                    );
                }}>Collect Order</button>
          </div>)
        }else{
          return null;
        }
          //
        });
        return offers;

  }
//  renderPledgeOffers = () => {

  //     //map orders
  //    this.state.pledgeOffers.map( (order) =>{
  //     //
  //     //   //set phAmounts based on orderType
  //     //   if (order.orderType === ('lean' || 'express') )
  //     //   {
  //     //      //phAmount:300
  //     //      const phAmount = 300;
  //     //   }
  //     //   else if (order.orderType === 'bronze')
  //     //   {
  //     //     //phAmount:500
  //     //      const phAmount = 500;
  //     //   }
  //     //   else if (order.orderType === 'silver')
  //     //  {
  //     //      //phAmount:800
  //     //      const phAmount = 800;
  //     //  }
  //     //  else if (order.orderType   === 'gold')
  //     //  {
  //     //    //phAmount:1800
  //     //    const phAmount = 1800;
  //     //  }
  //     //
  //     //
  //     //   return (<li key={ order._id}> { phAmount } </li>)
  //     // });
  //
  // //}
///////////////////////////////////////////////////////////////////////////////
  //function to generate props
    _generateProps = () => ({
      ...this.props,
      ...this.state.reservedOrders
    })
////////////////////////////////////////////////////////////////////////////////
 render(){
   //generate props to pass to UI
   const props  = this._generateProps();
     // //set phAmounts based on orderType
     //     if (props.orderType === ('lean' || 'express') )
     //     {
     //        //phAmount:300
     //        this.phAmount = 300;
     //     }
     //     else if (props.orderType === 'bronze')
     //     {
     //        //phAmount:500
     //        this.phAmount = 500;
     //     }
     //     else if (props.orderType === 'silver')
     //    {
     //        //phAmount:800
     //        this.phAmount = 800;
     //    }
     //    else if (props.orderType   === 'gold')
     //    {
     //        //phAmount:1800
     //        this.phAmount = 1800;
     //    }
  // const mappedOffer = this.state.pledgeOffer.map((offerItem) =>{
   return(
    <div>
      <PledgeOffersView   renderOffers= { this.renderOffers()}       { ...props }  phAmount={this.phAmount}  />
      {/*<PledgeOffersReservedView  { ...props }  phAmount={this.phAmount}  */}
     </div>
   )
  //}

   //)
   //map data
   // const offers = this.props.pledgeOffers.map( (order) => {
   //    return (<li key={ order._id}> { order.orderType } </li>)
   // })

  // return this.mappedOffer;
  }
}

export default PledgeOffers;
