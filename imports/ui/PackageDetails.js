import   React            from 'react';
import { Meteor }         from 'meteor/meteor';
import { Session }        from 'meteor/session';
import { Tracker }        from 'meteor/tracker';
import { Accounts }       from 'meteor/accounts-base';
import InvestmentPOP      from './InvestmentPOP';
import ClockCountDown     from './ClockCountDown';
//import views
import PrivateHeader        from './PrivateHeader';

//import APIs
import { InvestmentsCol,CapitalFeesCol } from '../api/xbuxAPI';

//export const PHOrders     = new Mongo.Collection('ph_orders')
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
class PackageDetails extends React.Component{
  constructor(props) {
      super(props);
      //initialize state
      this.state = {
        deadline: 0,
        userStatus:'',
        invPackage:{},
        packageStatus: '',
        capitalFeeDetails:{}
      };

      }

  //commponent lifecycle hook functions
  componentDidMount(){

    this.investmentsTracker = Tracker.autorun(() => {
            const userId        =  Accounts.userId();
            Meteor.subscribe('investmentsPub');
            Meteor.subscribe('capitalFeesPub');

            //.....
            const packageDetails = CapitalFeesCol.find({ _id: userId }).fetch().pop();
            const capitalFeeDetails ={ ...packageDetails };
            const deadline      = capitalFeeDetails.submittedAt;
            Session.set('deadline', deadline);

            const investment    = InvestmentsCol.find({ _id: userId }).fetch().pop();
            const invPackage    = { ...investment };

            const userDetails01 = Meteor.users.find(
                                    { _id: Meteor.userId() },
                                    {
                                      fields: {
                                        "userDetails.userStatus":1,
                                        "userDetails.popStatus":1
                                      }
                                    }
                                  ).fetch()[0];

            const userDetails02 = { ...userDetails01 };
            const userDetails03 =  userDetails02.userDetails;
            const userDetails   =  { ...userDetails03 };
            const userStatus    = userDetails.userStatus; // user status
            const popStatus     = userDetails.popStatus;  //pop status

            //if all is w....
            if (userStatus === 'hasActiveInv') {
              this.setState({ packageStatus: 'Active' })
            }
            else{
              this.setState( { packageStatus: 'Locked',popStatus } )
            }

        // const map = userStatus.map((item) => {
        //   return item;
        // });

        //Decide Subscriptions
        // if (userStatus.planType === 'lean' ) {
        //   //subscribe to plansPub
        //   Meteor.subscribe('orders300LeanPub');
        //
        // }else if (userStatus.planType === 'bronze') {
        //   //subscribe to plansPub
        //   Meteor.subscribe('orders500Pub');
        //   console.log('Subscribed');
        // }else if (userStatus.planType === 'silver') {
        //   //subscribe to plansPub
        //   Meteor.subscribe('orders800Pub');
        // }else if (userStatus.planType === 'gold') {
        //   //subscribe to plansPub
        //   Meteor.subscribe('orders1800Pub');
        // }

  console.log(deadline);
        //set state's plan options
        this.setState({ invPackage,userStatus,deadline });

      });

  }

  componentWillUnmount(){
    this.investmentsTracker.stop();
  }

  //Handle pledge submission
  acceptOrder = (e) => {
      e.preventDefault();
      //console.log(this.props);
      //arguments
      // const recipID  = e.target.value;
      // const phAmount = this.state.outgoingOrder.phAmount;
      // //call method to file request
      // Meteor.call('order.accept', recipID, phAmount, function(error, result){
      //   if (error) {
      //     console.log(error);
      //   }else{
      //     console.log(result);
      //   }
      // });
  }

  //function to generate props
    _generateProps = () => ({
      ...this.props,
      ...this.state,
      ...this.state.invPackage
    })

    render(){

      const props = this._generateProps()

console.log(props.deadline);
      if (props.popStatus === "payingCapital") {
        //return order details
        return (
          <div >
            <PrivateHeader { ...props } />
            <div className="page-content">
               <h2>Investment Package Details </h2>
                 <div className="player player__name">Investment Type:   { props.packageName }        <br/>
                 Status:            {this.state.packageStatus }   <br/>
                 Seed Fund  :       R{ props.seedFund }            <br/>
                 Weekly Payout:     R{props.seedFund * 0.3 }       <br/>
                 Withdrawal Date:   22-08-2018           </div>         <br/>
              <ClockCountDown {...props } />
            </div>
          </div>

          );
      }else if(props.userStatus === "hasPendingInv"){
        return (
          <div >
            <PrivateHeader { ...props } />
            <div className="page-content">
               <h2>Investment Package Details </h2>
                 <div className="player player__name">Investment Type:   { props.packageName }        <br/>
                 Status:            {this.state.packageStatus }   <br/>
                 Seed Fund  :       R{ props.seedFund }            <br/>
                Weekly Payout:     R{props.seedFund * 0.3 }       <br/>
                 Withdrawal Date:   22-08-2018           </div>         <br/>
              <InvestmentPOP {...props }/>
            </div>
          </div>
          );

      }else{
        return  <h1>Wait you will be matched soon...</h1>
      }

        // return (
        //   <div >
        //     <PrivateHeader { ...props } />
        //     <div className="page-content">
        //        <h2>Investment Package Details </h2>
        //          <div className="player player__name">Investment Type:   { props.packageName }        <br/>
        //          Status:            {this.state.packageStatus }   <br/>
        //          Seed Fund  :       R{ props.seedFund }            <br/>
        //         Weekly Payout:     R{props.seedFund * 0.3 }       <br/>
        //          Withdrawal Date:   22-08-2018           </div>         <br/>
        //       <InvestmentPOP {...props }/>
        //     </div>
        //   </div>
        //   );
    }
}

export default PackageDetails;
