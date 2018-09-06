//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Accounts }                 from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   moment                     from 'moment';
import   FlipMove                   from 'react-flip-move';

import   AdminFeeItemView           from './AdminFeeItemView';

class AdminFeeItem extends React.Component{

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
  renderTimeLapsed(){
    // const visitMessage = this.props.visitCount === 1 ? 'Visit' : 'Visits';
    // let visitedMessage = null;

    if (typeof this.props.submittedAt === 'number'){

      let submittedAt          = null;
      let timeLapsed           = moment(this.props.submittedAt).fromNow();

      return timeLapsed ;
    }


  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //Handle pledge submission
  activateUser = (e) => {
    //e.preventDefault();
    const userIDtoActivate = e.target.name;
     Meteor.call('activate.user', userIDtoActivate);
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //Handle pledge submission
  rejectAdminProof = (e) => {
    //e.preventDefault();
    const userIDForRejectedProof = e.target.name;
     Meteor.call('reject.admin.proof', userIDForRejectedProof);
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::

  //function to generate props
  _generateProps = () => ({  ...this.props,  ...this.state  })

  render(){
      return( <AdminFeeItemView
                { ...this.props }
                activateUser      = { this.activateUser       }
                rejectAdminProof  = { this.rejectAdminProof   }
                renderTimeLapsed  = { this.renderTimeLapsed() }
              />
      )
  }
}

export default AdminFeeItem;
