import   React            from 'react';
import { Meteor   }       from 'meteor/meteor';
import { Session  }       from 'meteor/session';
import { Tracker  }       from 'meteor/tracker';
import { Accounts }       from 'meteor/accounts-base';
import PaySeedFund        from './PaySeedFund';
import SevenDayCountDown  from './SevenDayCountDown';
//import views
import PrivateHeader      from './PrivateHeader';

//import APIs
import { InvestmentsCol,SeedFundsCol } from '../api/xbuxAPI';

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
        packageStatus: ''
      };

      }

  //commponent lifecycle hook functions
  componentDidMount(){

    this.investmentTracker = Tracker.autorun(() => {

            const userId  =  Accounts.userId();
            //sub to stuff...
            Meteor.subscribe('investmentsPub');
            Meteor.subscribe('seedFundsPub');
            Meteor.subscribe('userStatusPub');
            //...........................
            const userDetails01 =  Meteor.users.find(
                                  { _id: Meteor.userId()  },
                                  { fields:{ "userDetails.userStatus":1 }}
                                ).fetch()[0];
              //brush through....
              const userDetails02 = { ...userDetails01 };
              const userDetails   = { ...userDetails02.userDetails } ;
              const userStatus    = userDetails.userStatus;
              //.........................

            //..... 4 timer02 ......//
            const packageDetails = SeedFundsCol.find({ _id: userId }).fetch().pop();
            const seedFundDetails ={ ...packageDetails };
            const deadline      = seedFundDetails.submittedAt;
            Session.set('deadline', deadline);
            //..... ..... ..... .....

            //..... ..... ..... .....
            const investment    = InvestmentsCol.find({ _id: userId }).fetch().pop();
            const invPackage    = { ...investment };
            const sixHrDeadline    = invPackage.sixHrDeadline;
            const sevenDayDeadline    = invPackage.sevenDayDeadline;

            Session.set('sixHrDeadline', sixHrDeadline);
            Session.set('sevenDayDeadline',sevenDayDeadline );
            //..... ..... ..... .....

            //if all is w....
            if (userStatus === 'userWithActiveInvestment') {
              this.setState({ packageStatus: 'Active' })
            }
            else{
              this.setState( { packageStatus: 'Locked' } )
            }

        //set state's plan options
        this.setState({ invPackage,userStatus,deadline });

      });

  }

  componentWillUnmount(){
    this.investmentTracker.stop();
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

      if (props.userStatus === "userWithActiveInvestment") {
        //return order details
        return (
          <div >
            <PrivateHeader { ...props } />
            <div className="page-content">
               <h1>Investment Package Details </h1>
               <ul>
                <li>Investment Type:<span className="package--detail">{ props.packageName }</span></li>
                <li>Status:<span className="status__active">{this.state.packageStatus }</span></li>
                <li> Seed Fund:<span className="package--detail">R{ props.seedFund }</span></li>
                <li> Weekly Payout:<span className="package--detail">R{props.seedFund * 0.3 }</span></li>
                <li> Pay Day:<span className="package--detail">{props.nextPayDay }</span></li>
               </ul>
              <SevenDayCountDown {...props } />
            </div>
          </div>

          )
      }
      else if(props.userStatus === "userWithDefaultedPayment"){
        return(
          <div>
            <PrivateHeader { ...props } />
            <div className="page-content">
               <h2>Lol..Fake You!</h2>
            </div>
          </div>
        )
      }
      else if(props.userStatus === "userWithLockedInvestment"){
        return (
          <div >
            <PrivateHeader { ...props } />
            <div className="page-content">
              <div >
                <h2>Investment Package Details </h2>

                <ul>
                  <li>Investment Type:<span className="package--detail">{ props.packageName }</span></li>
                  <li>Status:<span className="status__inactive">{this.state.packageStatus }</span></li>
                  <li>Seed Fund  :<span className="package--detail">R{ props.seedFund }</span></li>
                  <li>Weekly Payout:<span className="package--detail">R{props.seedFund * 0.3 }</span></li>
                </ul>

                <PaySeedFund {...props }/>
              </div>
            </div>
          </div>
          )

      }else if(props.userStatus === "userWithSeedFundProof"){
        return(
          <div >
            <PrivateHeader { ...props } />
            <div className="page-content">

                 <div >
                  <h1>................*****................</h1>
                  <h2>Investment Package Details </h2>
                  <h1>.......................................</h1>
                   <div className="package-pair">
                     <p>Investment Type:<span className="package--detail">{ props.packageName }</span></p>
                   </div>
                   <div className="package-pair">
                     <p>Status:<span className="package--detail">Waiting Admin Confirmation</span>   </p>
                   </div>
                   <div className="package-pair">
                    <p>Seed Fund  :<span className="package--detail">R{ props.seedFund }</span></p>
                   </div>
                   <div className="package-pair">
                     <p>Weekly Payout:<span className="package--detail">R{props.seedFund * 0.3 }</span></p>
                   </div>

                </div>
            </div>
          </div>
          )
      }else{
        return <p>No data available</p>
      }


    }
}

export default PackageDetails;
