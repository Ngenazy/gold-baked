//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Tracker  }                 from 'meteor/tracker';
import { Accounts }                 from 'meteor/accounts-base';
//import containers
import   OrderItem                  from './OrderItem';
//import   OrderItemView              from './OrderItemView';
//import views
//import   PlanOptionsView            from './PlanOptionsView';
//import APIs
import { UsersCollection }          from '../api/xbuxAPI';
import { OrdersMenuCollection }     from '../api/orders';

class OrdersMenu extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = {
                    phAmount: 0,
                    payout:   0,
                    userLevel: 1, //we initialize level to 1 (default)
                    orderItems:   [],
                    orderLocks:   {
                                    express: true,
                                    bronze:   true,
                                    silver:   false,
                                    gold:     false,
                                    lean:     false
                                  }
                    }
  }

  //commponent lifecycle hook functions
  componentDidMount(){
     //Track changes to pledge_orders_menu
      this.ordersMenuTracker = Tracker.autorun(() => {

        //subscribe to plansPub
        Meteor.subscribe('users');
        Meteor.subscribe('ordersMenuPub');
        // Meteor.subscribe('phOrderPub');

        //get custom data(fields) from users collection
        const userDetails01 = Meteor.users.find(
                                              { _id:Meteor.userId() },
                                              {
                                                fields: { userDetails:1 }
                                              }).fetch()[0];

        const userDetails02 = { ...userDetails01 };
        const userDetails   = { ...userDetails02.userDetails } ;
        //spread object
        // const userDetails02 = { ...userDetails01 };
        // const userDetails03 = { ...userDetails02 };
        // const userDetails = { ...userDetails03 };
        const orderItems = OrdersMenuCollection .find({}).fetch();

        //Switch locks ..but compose a dummy obj of locks
        let orderLocks = { ...this.state.orderLocks };

        if (userDetails.userLevel === 2 ) {
          //manually update keys for level in question
          //orderLocks['bronze'] = false;  //CAN BE ADDITIONAL FEATURE
          orderLocks['silver'] = true;
          //update state
          //this.setState({ orderLocks });

        }else if (userDetails.userLevel === 3) {
          orderLocks['silver']  = true;  //CAN BE ADDITIONAL FEATURE
          orderLocks['gold']    = true;
          orderLocks['lean']    = true;
          //this.setState({ orderLocks });
        }

console.log(userDetails.userLevel);
        //set state's plan options
        this.setState({ /*userLevel,*/ orderItems, orderLocks });
      });

  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
    this.ordersMenuTracker.stop();
  }

  // //function to display list items
  // renderPlanOptions(){
  //   //pull out order items
  //   const orderItems = OrdersMenuCollection .find({}).fetch();
  //
  //   //check if collection is empty
  //   if (this.state.orderItems.length === 0) {
  //     return (
  //       <div >
  //         <p >No Investment Plans.</p>
  //       </div>
  //     );
  //   }
  //
  //
  //   const Items = this.state.orderItems.map((xbux) => {
  //
  //   //const locksArray = JSON.parse(this.state.planLocks);
  //   const planLocks  = this.state.orderLocks; //this is an object {...}
  //
  //   const isLocked   = planLocks[xbux.orderType]; //we nook out the one we're intrested in
  //
  //   return  <OrderItem  { ...xbux }
  //                       isLocked ={ isLocked }
  //                       key = {xbux._id}
  //                       handlePledgeRequest = { this.handlePledgeRequest }/>;
  // });
  //   //return mapped list of Investment plans
  //   return (Items);
  //
  // }

  //function to generate props
    _generateProps = () => ({
      ...this.props,
      ...this.state
    })

    render(){

      const props = this._generateProps();
      //pull out order items
    //  const orderItems = OrdersMenuCollection.find({}).fetch();

      //check if collection is empty
      if (this.state.orderItems.length === 0)
      {
        return (
          <div >
            <p >No Investment Plans.</p>
          </div>
        );
      }


      const Items = this.state.orderItems.map((xbux) => {

      //const locksArray = JSON.parse(this.state.planLocks);
      const planLocks  = this.state.orderLocks; //this is an object {...}

      const isLocked   = planLocks[xbux.orderType]; //we nook out the one we're intrested in
      //pack the lock together with data
      return  <OrderItem {...this.props } { ...xbux } isLocked ={ isLocked } key = {xbux._id} />;
    });

return (Items);
      // return( <OrderItemView  { ...props }
      // renderPlanOptions={ this.renderPlanOptions() } /> );
    }

}

export default OrdersMenu;
