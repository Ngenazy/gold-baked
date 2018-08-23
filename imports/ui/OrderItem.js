//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Accounts }                 from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   FlipMove                   from 'react-flip-move';
import   OrderItemView              from './OrderItemView';

class OrderItem extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { };
  }

  //commponent lifecycle hook functions
  componentDidMount(){

  }

  componentWillUnmount(){
    console.log('componentWillUnmount');
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

  //Handle pledge submission
  handlePledgeRequest = (e) => {
      //e.preventDefault();
      const orderType = e.target.name;
      // const orderPlans  = this.state.orderPlans;
      //
      // //check a matching plan
      // for( let plan in orderPlans){
      //   //if there is a match
      //   if (plan === orderType) {
      //     orderPlans[plan] = orderType;
      //   }
      // }
      // console.log(orderPlans);
      
      //create an Order
     Meteor.call('order.create', orderType);
     this.props.history.replace('/order-details');
  }

  //function to generate props
    _generateProps = () => ({
      ...this.props,
      ...this.state
    })

  render(){
      return( <OrderItemView  { ...this.props } handlePledgeRequest = { this.handlePledgeRequest } />)
  }
}

export default OrderItem;
