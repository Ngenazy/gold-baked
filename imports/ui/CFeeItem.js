//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Accounts }                 from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   FlipMove                   from 'react-flip-move';
import   CFeeItemView               from './CFeeItemView';

class CFeeItem extends React.Component{

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
    const userIDtoActivate = e.target.name;

     Meteor.call('cfee.pop.confirm', userIDtoActivate);
     //this.props.history.replace('/package-details');//  /submit-pop
  }

  //function to generate props
  _generateProps = () => ({  ...this.props,  ...this.state  })

  render(){
      return( <CFeeItemView  { ...this.props } handlePledgeRequest = { this.handlePledgeRequest } />)
  }
}

export default CFeeItem;
