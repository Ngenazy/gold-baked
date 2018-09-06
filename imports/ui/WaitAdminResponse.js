import   React                from 'react';
import { Link }       from 'react-router-dom';
import   PrivateHeader        from './PrivateHeader';
//import APIs
import { AdminFeesCol }       from '../api/xbuxAPI';

class WaitAdminResponse extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { userStatus:"" };
  }
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentDidMount(){
     //Track changes
    this.userStatusTracker = Tracker.autorun(() => {
      //subscribe to plansPub
      Meteor.subscribe('userStatusPub');

      const userDetails01 =  Meteor.users.find(
                            { _id: Meteor.userId()  },
                            { fields:{ "userDetails.userStatus":1 }}
                          ).fetch()[0];
        //brush through....
        const userDetails02 = { ...userDetails01 };
        const userDetails   = { ...userDetails02.userDetails } ;
        const userStatus    = userDetails.userStatus;

        // //good...
        // if (userStatus === "userWithValidAdminFeeProof") {
        //    this.props.history.replace('/invest');
        // }

        //set state's plan options
        this.setState({ userStatus  });
    });

  }
  //:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //halt tracker
    this.userStatusTracker.stop();
  }
/*------------------------------------------------------------------------------/
////////////////// Signup Form SubmitHandler (onSubmit callback)  ///////////////
/------------------------------------------------------------------------------*/
  //Handles form submission
  submitDetails = (e) => {
    //prevent default action
    e.preventDefault();
  }

/*------------------------------------------------------------------------------/
//////////         onChangeHandler (onChange callback)            //////////////
/------------------------------------------------------------------------------*/
  //Listens to form input element changes
  handleChange = (event) => {

    }

/*------------------------------------------------------------------------------/
//////////////////     Compose props and state into props         ///////////////
/------------------------------------------------------------------------------*/
//function to generate props
  _generateProps = () => ({ ...this.props, ...this.state })

/*------------------------------------------------------------------------------/
//////////////// Render Presentational UI Component (with props)  ///////////////
/------------------------------------------------------------------------------*/
  render(){
    //generate props to pass to UI
    const props = this._generateProps()
    if(this.state.userStatus  === "userWithInvalidAdminFeeProof") {

          return(
            <div>
              <PrivateHeader { ...props } />
              <div className="page-content" >
                <h1 className="smalltext__error">Invalid Proof Of Payment!</h1>
                <p>The proof of payment you previously supplied is invalid.</p><br/>
                <button className="button"><Link to='/pay-admin-fee'>DO THE RIGHT THING</Link></button>
              </div>
            </div>
         );
    }
    else  if(this.state.userStatus  === "userWithValidAdminFeeProof") {
      return(
        <div>
          <PrivateHeader { ...props } />
          <div className="page-content" >
            <h1>SUCCESS!</h1>
            <h3>R100 Admin Fee Payment Confirmed</h3>
            <p>Click button below to  Open Investment Packages.</p>

            <button className="button"><Link to='/invest'>Open Investment Packages</Link></button>

          </div>
        </div>
     );

    }else{
      return(
        <div>
          <PrivateHeader { ...props } />
          <div className="page-content" >
            <h1>Congratulations!</h1>
            Thank you for submission of e-wallet/cash as your joining fee payment to join this platform, inorder to boost your financial situation for good through investment.
              <h1>Be Patient</h1> while admin process your request to participate.Once your payment is approved.The system will allow to move to the <h2>NEXT STEP</h2>This process will take up to
               6 hours to complete.

               <h1 className="smalltext__error">NB: If you supply incorrect or fake details you will be redirected back to
               redo the previous action.</h1>
          </div>
        </div>
     );
    }

  }

}

//==> Export Component ==>//
export default  WaitAdminResponse;
