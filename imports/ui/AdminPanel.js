//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
import { Link }                    from 'react-router-dom';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  JFeeItem                   from './JFeeItem';

//import APIs
import { JoiningFeesCol }          from '../api/xbuxAPI';

class AdminPanel extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { joiningFees:[] }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.collectionsTracker = Tracker.autorun(() => {

      //subscribe to plansPub
      Meteor.subscribe('users');
      Meteor.subscribe('joiningFeesPool');
      //get custom data(fields)
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;

      const joiningFees   = JoiningFeesCol.find({}).fetch();

      //set state's plan options
      this.setState({ joiningFees  });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt package list tracker
    this.collectionsTracker.stop();
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //function to generate props
  _generateProps = () => ({ ...this.props,...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  render(){

    const props = this._generateProps();

    //check if collection is empty
    if (this.state.joiningFees.length === 0)
    {
      return (
        <div >
          <p >No Investment Plans.</p>
        </div>
      );
    }

    const joiningFeesList = this.state.joiningFees.map((xbux) => {
      //pack the lock together with data
      return  <JFeeItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          <ul>
            <li><Link to='/xxx34xxx'>Investments</Link></li>
            <li><Link to='/xxx35xxx'>Investments POPs</Link></li>
          </ul>

          {  joiningFeesList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default AdminPanel;
//::::::::::::::::::::::::::
