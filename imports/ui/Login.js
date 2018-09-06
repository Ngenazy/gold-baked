import   React                from 'react';
import   LoginForm            from './LoginForm';
import { Meteor }             from 'meteor/meteor';
import { Session }            from 'meteor/session';
import { withRouter }         from 'react-router-dom'; //HOC
import moment from 'moment';

class Login extends React.Component{
  constructor(props){

    super(props);
    //initialize state
    this.state = {  loginError:'', username:'', password:'', isAuth:false};
  }

  //Handles login form submission
  submitHandler = (e) => {
    e.preventDefault();

    let username    = this.state.username;
    let password    = this.state.password;

    Meteor.loginWithPassword({ username }, password ,(err) => {
      //if error
      if (err){
        this.setState({ loginError:err.reason });
      }
      else{
        //clear previous error msgs
        this.setState({loginError:' '});
        //Track changes to pledge_orders_menu
        this.detailsTracker = Tracker.autorun(() => {
          //
          const userDetails01 = Meteor.users.find(
                                  { _id: Meteor.userId() },
                                  {fields: { "userDetails.userStatus":1 }}
                                ).fetch()[0];

          const userDetails02 =  { ...userDetails01 };
          const userDetails   =  userDetails02.userDetails;

          //set userStatus into session variable
          Session.set('userStatus',userDetails.userStatus);

          if ( userDetails.userStatus       === 'userWithoutWalletDetails'){
              this.props.history.replace('/add-wallet-details');
           }
          else if ( userDetails.userStatus  === 'userWithoutAdminFeeProof'){
              this.props.history.replace('/pay-admin-fee');
           }
          else if ( userDetails.userStatus  === 'userWithAdminFeeProof'){
              this.props.history.replace('/wait-admin-response');
           }
          else if ( userDetails.userStatus  === 'userWithInvalidAdminFeeProof'){
              this.props.history.replace('/pay-admin-fee');
           }else if ( userDetails.userStatus=== 'userWithValidAdminFeeProof'){
              this.props.history.replace('/invest');
           }
          else if ( userDetails.userStatus  === 'userWithLockedInvestment' ||
                  ( userDetails.userStatus  === 'userWithSeedFundProof')){
              this.props.history.replace('/package-details');
           }
          else if ( userDetails.userStatus  === 'userWithActiveInvestment' ||
                  ( userDetails.userStatus  === 'userWithDefaultedPayment')){
              this.props.history.replace('/package-details');
           }
          else if ( userDetails.userStatus  === 'xxx33xxx'){
              this.props.history.replace('/xxx33xxx');
           }
         });
      }
    });
  }

    //Listens to form input element changes and update state
    handleChange = (event) => {
      this.setState({
        [ event.target.name ]:event.target.value
      });
    }

  //function to generate props
    _generateProps = () => ({
      ...this.props,
      ...this.state
    })

    render(){

      const props = this._generateProps()

      return(
        <LoginForm

          { ...props }
          submitHandler ={ this.submitHandler }
          handleChange  ={ this.handleChange  }

        />
      );
    }

}

export default withRouter(Login);
