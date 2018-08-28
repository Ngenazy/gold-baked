import   React                from 'react';
import   PrivateHeader        from './PrivateHeader';
import   PayFeeView           from './PayFeeView';

class PayFee extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = {
      error:'',
      paymentDetails:{
        voucherPin: ' ',bankToRedeem: ' ', voucherNum:''
      }
    };
  }

/*------------------------------------------------------------------------------/
//////////////////     Form SubmitHandler (onSubmit callback)  /////////////////
/------------------------------------------------------------------------------*/
  //Handles form submission
  submitDetails = (e) => {
    //prevent default action
    e.preventDefault();

    //form input data
    const paymentDetails = this.state.paymentDetails;

   /*------------------------------------------------------/
   _//////  Insert payment details into collection  __////
  \__//////                                         ___////
   \__///////                                         __////
   /------------------------------------------------------*/
    Meteor.call('payment.proof.insert', paymentDetails, (err, res) => {
         if (!err) {
          //TODO:Maybe change state.
          //and replacing the route
          this.props.history.replace('/wait-jfee-confirmation'); //'/submit-pop'
         }else{
           this.setState({error:err.reason});
         }
    });
  }

/*------------------------------------------------------------------------------/
//////////     Form Inputs onChangeHandler (onChange callback)    //////////////
/------------------------------------------------------------------------------*/
  //Listens to form input element changes
  handleChange = (event) => {

    //creating a dummy object to modify
    /* ###   dummy object UserDetails = { userName: value, bank: value etc.. } ### */
    let paymentDetails = { ...this.state.paymentDetails };
    //modify current matching key in cloned object
    paymentDetails[ event.target.name ] = event.target.value;
    //set state to modified object
    this.setState({ paymentDetails });
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
        <PayFeeView
          {/* Keys this side */ ...props /*Values this side*/ }
          submitDetails ={ this.submitDetails }
          handleChange  ={ this.handleChange  }
        />
      </div>


    );
  }

}

//==> Export Component ==>//
export default  PayFee;
