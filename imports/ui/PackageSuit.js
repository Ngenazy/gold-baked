//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Tracker  }                 from 'meteor/tracker';
import { Accounts }                 from 'meteor/accounts-base';
//import containers
import   PrivateHeader              from './PrivateHeader';
import   PackageItem                from './PackageItem';
//import APIs
import { PackageListCol  }          from '../api/xbuxAPI';

class PackageSuit extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { packages:[]  }
  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes to package_list
    this.packageListTracker = Tracker.autorun(() => {

      //subscribe to plansPub
      Meteor.subscribe('users');
      Meteor.subscribe('packageListPub');

      //get custom data(fields)
      const userDetails01 = Meteor.users.find(
                              { _id:    Meteor.userId()   },
                              { fields: { userDetails:1 } }
                            ).fetch()[0];
      //brush through....
      const userDetails02 = { ...userDetails01 };
      const userDetails   = { ...userDetails02.userDetails } ;
      const packages      = PackageListCol.find({}).fetch();

      //set state's plan options
      this.setState({ packages });
    });

  }

  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt package list tracker
    this.packageListTracker.stop();
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //function to generate props
  _generateProps = () => ({ ...this.props,...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  render(){

    const props = this._generateProps();

    //check if collection is empty
    if (this.state.packages.length === 0)
    {
      return (
        <div >
          <p >No Investment Plans.</p>
        </div>
      );
    }

    const packageList = this.state.packages.map((xbux) => {
      //pack the lock together with data
      return  <PackageItem key = {xbux._id} {...this.props } { ...xbux }  />;
    });

    return (
      <div>
          <PrivateHeader { ...props } />
          {   packageList }
      </div>

    );
  }

}
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

//::::::::::::::::::::::::::
export default PackageSuit;
//::::::::::::::::::::::::::
