//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Accounts }                 from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   FlipMove                   from 'react-flip-move';
import   PackageItemView            from './PackageItemView';

class PackageItem extends React.Component{

  constructor(props) {
      super(props);
      //initialize state
      this.state = { };
  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //commponent lifecycle hook functions
  componentDidMount(){

  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){

  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //Handle pledge submission
  handlePledgeRequest = (e) => {
    //e.preventDefault();
    const packageName = e.target.name;

     Meteor.call('investment.create', packageName);
     this.props.history.replace('/package-details');//  /submit-pop
  }

  //function to generate props
  _generateProps = () => ({  ...this.props,  ...this.state  })

  render(){
      return( <PackageItemView  { ...this.props } handlePledgeRequest = { this.handlePledgeRequest } />)
  }
}

export default PackageItem;
