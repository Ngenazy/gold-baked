import   React                from 'react';
import   LoginView            from './LoginView';
import { Meteor }             from 'meteor/meteor';
import { Session }            from 'meteor/session';
import { withRouter }         from 'react-router-dom';
//import APIs
import { UsersCollection }    from '../api/xbuxAPI';

class Login extends React.Component{
  constructor(props){

    super(props);
    //initialize state
    this.state = {  loginError:'', username:'', password:'', isAuth:false};
  }

  componentDidMount(){

  }
  //Handles login form submission
  submitHandler = (e) => {
       e.preventDefault();

       let username    = this.state.username;
       let password = this.state.password;
        Meteor.loginWithPassword({ username }, password ,(err) => {
            //if there is no error
            if (err)
            {
              this.setState({ loginError:err.reason });
            }
            else{

              //cleaning up previous error msgs
              this.setState({ loginError:'',isAuth:true });

              //TODO: to apply conditional redirection after login
              //Track changes to pledge_orders_menu
              this.detailsTracker = Tracker.autorun(() => {

                 //subscribe to userDetailsPub
                 //Meteor.subscribe('userDetailsPub');

                  const userDetails01 = Meteor.users.find(
                                                        { _id: Meteor.userId() },
                                                        {
                                                          fields: {
                                                            "userDetails.userBankAcc":1,
                                                            "userDetails.userStatus":1,
                                                            "userDetails.userLevel":1
                                                                  }
                                                        }).fetch()[0];

                  const userDetails02 = { ...userDetails01 };
                  const userDetails   =  userDetails02.userDetails;

                  //set userStatus into session variable
                  Session.set('userStatus',userDetails.userStatus);

                 if ( userDetails.userStatus  === 'hasNoBank')
                 {  //>
                   //if (userDetails.userBankAcc === undefined) {
                     //has not added x details
                     this.props.history.push('/add-details');

                   //}
                   //else
                   //{
                     //let's go do it >>
                     //this.props.history.replace('/pledge');
                   //}

                 }
                 else if ( userDetails.userStatus  === 'hasNoPOP')
                 {  //>
                    this.props.history.replace('/pay-fee');

                 }
                 else if ( userDetails.userStatus  === 'hasNoInv')
                 {  //>
                    this.props.history.replace('/invest');
                 }
                 else if ( userDetails.userStatus  === 'hasPendingInv')
                 {  //>
                    this.props.history.replace('/package-details');
                 }
                 else if ( userDetails.userStatus  === 'xxx33xxx')
                 {  //>
                    this.props.history.replace('/xxx33xxx');
                 }

               });
            }
          });

          // if (this.state.isAuth) {
          //   this.props.history.push('/links');
          //   console.log(this.props.history);
          // }
    }

    // componentWillUnmount(){
    //   console.log('componentWillUnmount');
    //   this.detailsTracker.stop();
    // }
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
        <LoginView

          { ...props }
          submitHandler ={ this.submitHandler }
          handleChange  ={ this.handleChange  }

        />
      );
    }

}

export default withRouter(Login);
