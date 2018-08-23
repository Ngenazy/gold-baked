//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  JFeeItem                   from './JFeeItem';
import  CFeeItem                   from './CFeeItem';
import  InvItem                    from './InvItem';
//import APIs
import {
        JoiningFeesCol,
        CapitalFeesCol,
        InvestmentsCol
        }                           from '../api/xbuxAPI';

class AdminPanel extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { joiningFees:[], investments:[], capitalFees:[]  }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.collectionsTracker = Tracker.autorun(() => {

      //subscribe to plansPub
      Meteor.subscribe('users');
      Meteor.subscribe('joiningFeesPool');
      Meteor.subscribe('investmentsPool');
      Meteor.subscribe('capitalFeesPool');

      //get custom data(fields)
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;

      const joiningFees   = JoiningFeesCol.find({}).fetch();
      const investments   = InvestmentsCol.find({}).fetch();
      const capitalFees   = CapitalFeesCol.find({}).fetch();

      //set state's plan options
      this.setState({ joiningFees,investments, capitalFees  });
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
          {  joiningFeesList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default AdminPanel;
//::::::::::::::::::::::::::
