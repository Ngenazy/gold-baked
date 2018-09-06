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
  createInvestment = (e) => {
    //e.preventDefault();
    const packageName = e.target.name;

     Meteor.call('create.investment', packageName);
     this.props.history.replace('/package-details');//
  }

  //function to generate props
  _generateProps = () => ({  ...this.props,  ...this.state  })

  render(){
      return( <PackageItemView  { ...this.props } createInvestment = { this.createInvestment } />)
  }
}

export default PackageItem;
