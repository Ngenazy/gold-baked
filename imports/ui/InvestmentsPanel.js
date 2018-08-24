//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  InvItem                    from './InvItem';
//import APIs
import { InvestmentsCol }          from '../api/xbuxAPI';

class InvestmentsPanel extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { investments:[]  }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.collectionsTracker = Tracker.autorun(() => {

      //subscribe to pool
      Meteor.subscribe('investmentsPool');

      //get custom data(fields)
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;

      const investments   = InvestmentsCol.find({}).fetch();

      //set state's plan options
      this.setState({ investments  });
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
    if (this.state.investments.length === 0)
    {
      return (
        <div >
          <p >No Investment Plans.</p>
        </div>
      );
    }

    const investmentsList = this.state.joiningFees.map((xbux) => {
      //pack the lock together with data
      return  <InvItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          {   investmentsList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default InvestmentsPanel;
//::::::::::::::::::::::::::
