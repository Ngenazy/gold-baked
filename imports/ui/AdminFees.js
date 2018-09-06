//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
import { Link    }                 from 'react-router-dom';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  AdminFeeItem               from './AdminFeeItem';

//import APIs
import { AdminFeesCol }            from '../api/xbuxAPI';

class AdminFees extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { adminFees:[] }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.adminFeesTracker = Tracker.autorun(() => {
      //subscribe to plansPub
      Meteor.subscribe('users');
      Meteor.subscribe('adminFeesPool');
      //get custom data
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;

      const adminFees   = AdminFeesCol.find({}).fetch();

      //set state's plan options
      this.setState({ adminFees  });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt tracker
    this.adminFeesTracker.stop();
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //function to generate props
  _generateProps = () => ({ ...this.props,...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  render(){

    const props = this._generateProps();

    //check if collection is empty
    if (this.state.adminFees.length === 0)
    {
      return (
        <div >
          <PrivateHeader { ...props } />

          <ul className="item__message">
              <h3 >No Admin Fee Proofs submitted yet.</h3>
            <li><h3><Link to='/xxx34xxx'>All Investments</Link></h3></li>
            <li><Link to='/xxx35xxx'>Seed Funds POPs</Link></li>
          </ul>
        </div>
      );
    }

    const adminFeesList = this.state.adminFees.map((xbux) => {
      return  <AdminFeeItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          <ul  className="item__message">
            <li><Link to='/xxx34xxx'>All Investments</Link></li>
            <li><Link to='/xxx35xxx'>Seed Fund POPs</Link></li>
          </ul>

          {  adminFeesList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default AdminFees;
//::::::::::::::::::::::::::
