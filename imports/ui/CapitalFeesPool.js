//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
import { Link }                    from 'react-router-dom';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  CFeeItem                   from './CFeeItem';

//import APIs
import { CapitalFeesCol }          from '../api/xbuxAPI';

class CapitalFeesPool extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { capitalFees:[] }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.capitalFeesTracker = Tracker.autorun(() => {

      //subscribe to plansPub
      Meteor.subscribe('users');
      Meteor.subscribe('capitalFeesPool');
      //get custom data(fields)
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;

      const capitalFees   = CapitalFeesCol.find({}).fetch();

      //set state's plan options
      this.setState({ capitalFees  });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt package list tracker
    this.capitalFeesTracker.stop();
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //function to generate props
  _generateProps = () => ({ ...this.props,...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  render(){

    const props = this._generateProps();

    //check if collection is empty
    if (this.state.capitalFees.length === 0)
    {
      return (
        <div >
            <PrivateHeader { ...props } />
          <p >No Investmet Capital POPs.</p>
        </div>
      );
    }

    const capitalFeesList = this.state.capitalFees.map((xbux) => {
      //pack the lock together with data
      return  <CFeeItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          <ul>
            <li><Link to='/xxx33xxx'>Joining Fees POPs</Link></li>
            <li><Link to='/xxx34xxx'>Investments</Link></li>
          </ul>


          {  capitalFeesList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default CapitalFeesPool;
//::::::::::::::::::::::::::
