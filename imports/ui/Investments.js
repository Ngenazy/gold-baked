//IMPORTS
import  React                      from 'react';
import {Meteor   }                 from 'meteor/meteor';
import {Tracker  }                 from 'meteor/tracker';
import {Accounts }                 from 'meteor/accounts-base';
import { Link }                    from 'react-router-dom';
//import containers
import  PrivateHeader              from './PrivateHeader';
import  InvestmetItem              from './InvestmentItem';

//import APIs
import { InvestmentsCol }          from '../api/xbuxAPI';

class Investments extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { investments:[] }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.investmentsTracker = Tracker.autorun(() => {

      //subscribe to plansPub
      Meteor.subscribe('users');
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
console.log(investments);
      //set state's plan options
      this.setState({ investments });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt  tracker
    this.investmentsTracker.stop();
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
          <PrivateHeader { ...props } />
          <ul  className="item__message">
            <h3  className="item__message">No Investments Packages yet...</h3>
            <li><Link to='/xxx33xxx'>Admin Fee Proofs</Link></li>
            <li><Link to='/xxx35xxx'>Seed Fund POPs</Link></li>
          </ul>
        </div>
      );
    }

    const investmentsList = this.state.investments.map((xbux) => {
      //pack the lock together with data
      return  <InvestmetItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          <ul>
            <li><Link to='/xxx33xxx'>Admin Fee Proofs</Link></li>
            <li><Link to='/xxx35xxx'>Seed Fund Proofs</Link></li>
          </ul>


          {  investmentsList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default Investments;
//::::::::::::::::::::::::::
