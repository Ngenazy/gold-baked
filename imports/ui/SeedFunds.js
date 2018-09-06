//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
import { Link }                    from 'react-router-dom';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  SeedFundItem               from './SeedFundItem';

//import APIs
import { SeedFundsCol }          from '../api/xbuxAPI';

class SeedFunds extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { seedFunds:[] }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.seedFundsTracker = Tracker.autorun(() => {
      //subscribe to
      Meteor.subscribe('seedFundsPool');
      // //get custom data(fields)
      // const userDetails01 = Meteor.users.find(
      //                         { _id:    Meteor.userId()   },
      //                         { fields: { userDetails:1 } }
      //                       ).fetch()[0];
      // //brush through....
      // const userDetails02 = { ...userDetails01 };
      // const userDetails   = { ...userDetails02.userDetails } ;

      const seedFunds   = SeedFundsCol.find({}).fetch();

      //set state's plan options
      this.setState({ seedFunds  });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt package list tracker
    this.seedFundsTracker.stop();
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //function to generate props
  _generateProps = () => ({ ...this.props,...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  render(){

    const props = this._generateProps();

    //check if collection is empty
    if (this.state.seedFunds.length === 0)
    {
      return (
        <div >
          <PrivateHeader { ...props } />
          <p >No Investmet Capital POPs.</p>
        </div>
      );
    }

    const seedFundsList = this.state.seedFunds.map((xbux) => {
      //pack the lock together with data
      return  <SeedFundItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          <ul>
            <li><Link to='/xxx33xxx'>Admin Fees Proofs</Link></li>
            <li><Link to='/xxx34xxx'>All Investments</Link></li>
          </ul>


          {  seedFundsList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default SeedFunds;
//::::::::::::::::::::::::::
