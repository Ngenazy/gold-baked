import   React        from 'react';
import { Meteor }     from 'meteor/meteor';
import { Accounts }   from 'meteor/accounts-base';
import  SignupForm    from './SignupForm';

class Signup extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { signupError:'', username:'',password:'' };
  }

/*------------------------------------------------------------------------------/
////////////////// Signup Form SubmitHandler (onSubmit callback)  ///////////////
/------------------------------------------------------------------------------*/
  //Handles form submission
  submitHandler = (e) => {
    //prevent default action
    e.preventDefault();

    //signup form input data
    let username    = this.state.username;
    let password    = this.state.password;

    //check password length
    if (password.length < 4) {
       return this.setState({signupError:'Make password at least 4 charcters'});
     }

   /*------------------------------------------------------/
   //////////////////  Create User Object  /////////////////
   /------------------------------------------------------*/
   //create user object
   Accounts.createUser({ username, password },(err) => {
      //if there was an error
     if (err) {
       this.setState({ signupError:err.reason });
     }else {
       //cleaning up previous error msgs
       this.setState({signupError:''});
       //and replacing the route
       this.props.history.replace('/add-wallet-details');
     }
    });
  }

/*------------------------------------------------------------------------------/
////////// Signup Form Inputs onChangeHandler (onChange callback)  //////////////
/------------------------------------------------------------------------------*/
  //Listens to form input element changes
  handleChange = (event) => {
    //update sate variables as the user type in the form inputs
    this.setState({ [ event.target.name ]:event.target.value });
    }

/*------------------------------------------------------------------------------/
//////////////////     Compose props and state into props         ///////////////
/------------------------------------------------------------------------------*/
  //function to generate props
  _generateProps = () => ({ ...this.props, ...this.state})

/*------------------------------------------------------------------------------/
//////////////// Render Presentational UI Component (with props)  ///////////////
/------------------------------------------------------------------------------*/
  render(){
    //generate props to pass to UI
    const props = this._generateProps()

    return(  <SignupForm { ...props } submitHandler = {this.submitHandler} handleChange  = {this.handleChange}/>);
  }

}

//==> Export Component ==>//
export default  Signup;
