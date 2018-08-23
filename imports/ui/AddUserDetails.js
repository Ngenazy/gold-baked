import   React                from 'react';
import   AddUserDetailsView   from './AddUserDetailsView';
import   PrivateHeader        from './PrivateHeader';

class AddUserDetails extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = {
      error:'',
      userDetails: { userCell:'',bank:'', bankAcc:'' }
    };
  }

/*------------------------------------------------------------------------------/
////////////////// Signup Form SubmitHandler (onSubmit callback)  ///////////////
/------------------------------------------------------------------------------*/
  //Handles form submission
  submitDetails = (e) => {
    //prevent default action
    e.preventDefault();

    //signup form input data
    const userDetails = this.state.userDetails;

   /*------------------------------------------------------/
   ///////  Insert user details into collection  //////////
   /------------------------------------------------------*/
    Meteor.call('user.details.insert', userDetails, (err, res) => {
         if (!err) {
           //and replacing the route
           this.props.history.replace('/pay-fee');
         }else{
           this.setState({error:err.reason});
           console.log(err);
         }
    });
  }

/*------------------------------------------------------------------------------/
////////// Signup Form Inputs onChangeHandler (onChange callback)  //////////////
/------------------------------------------------------------------------------*/
  //Listens to form input element changes
  handleChange = (event) => {

    //creating a dummy object to modify
    /* ###   dummy object UserDetails = { userName: value, bank: value etc.. } ### */
    let userDetails = { ...this.state.userDetails };
    //modify current matching key in cloned object
    userDetails[ event.target.name ] = event.target.value;
    //set state to modified object
    this.setState({ userDetails });
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

    return(
      <div>
        <PrivateHeader { ...props } />
        <AddUserDetailsView
                  {/* Keys this side */ ...props /*Values this side*/ }
                  submitDetails ={ this.submitDetails }
                  handleChange  ={ this.handleChange  }
                />
      </div>

          );
  }

}

//==> Export Component ==>//
export default  AddUserDetails;
