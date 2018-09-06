import   React                    from 'react';
import   AddWalletDetailsForm     from './AddWalletDetailsForm';
import   PrivateHeader            from './PrivateHeader';

class AddWalletDetails extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = {
                  error:'',
                  walletDetails: { userCell:'',userBank:'', userBankAcc:'' }
                };
  }

/*------------------------------------------------------------------------------/
//////////////////  SubmitHandler (onSubmit callback)  ///////////////
/------------------------------------------------------------------------------*/
  //Handles form submission
  submitDetails = (e) => {
    //prevent default action
    e.preventDefault();
    //signup form input data
    const walletDetails = this.state.walletDetails;
   /*------------------------------------------------------/
   ///// Insert user/wallet details into collection ///////
   /------------------------------------------------------*/
    Meteor.call('insert.wallet.details', walletDetails, (err, res) => {
         if (!err) {
           //on success
           this.props.history.replace('/pay-admin-fee');
         }else{
           this.setState({error:err.reason});
         }
    });
  }

/*------------------------------------------------------------------------------/
//////////     Form Inputs onChangeHandler (onChange callback)  //////////////
/------------------------------------------------------------------------------*/
  //Listens to form input element changes
  handleChange = (event) => {

    //creating a dummy object to modify
    let walletDetails = { ...this.state.walletDetails };
    //modify current matching key in cloned object
    walletDetails[ event.target.name ] = event.target.value;
    //set state to modified object
    this.setState({ walletDetails });
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
        <AddWalletDetailsForm
                  {/* Keys this side */ ...props /*Values this side*/ }
                  submitDetails ={ this.submitDetails }
                  handleChange  ={ this.handleChange  }
         />
      </div>
    );
  }

}

//==> Export Component ==>//
export default  AddWalletDetails;
