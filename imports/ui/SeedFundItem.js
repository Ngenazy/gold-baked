//IMPORTS
import   React                      from 'react';
import { Meteor   }                 from 'meteor/meteor';
import { Accounts }                 from 'meteor/accounts-base';
import { PropTypes }                from 'prop-types';
import   FlipMove                   from 'react-flip-move';
import   SeedFundItemView           from './SeedFundItemView';

class SeedFundItem extends React.Component{

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

    if (typeof this.props.proofSubmittedAt === 'number'){

      let proofSubmittedAt         = null;
      let timeLapsed           = moment(this.props.proofSubmittedAt).fromNow();

      return timeLapsed ;
    }


  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  //Handle pledge submission
  confirmSeedFundProof = (e) => {
    //e.preventDefault();
    const userIDtoUnlockInvestment = e.target.name;

     Meteor.call('confirm.seed.fund.proof', userIDtoUnlockInvestment);
     //this.props.history.replace('/package-details');//  /submit-pop
  }

  //function to generate props
  _generateProps = () => ({  ...this.props,  ...this.state  })

  render(){
      return( <SeedFundItemView
                { ...this.props }
                confirmSeedFundProof = { this.confirmSeedFundProof }
                renderTimeLapsed    = { this.renderTimeLapsed()  }
               />
    )
  }
}

export default SeedFundItem;
