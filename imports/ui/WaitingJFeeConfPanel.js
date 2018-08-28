import   React                from 'react';
import   PrivateHeader        from './PrivateHeader';

class WaitingJFeeConfPanel extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { };
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

    return(
      <div>
        <PrivateHeader { ...props } />
        <div className="page-content" >
          <h1>Congratulations!</h1>
          Thank you for submission of e-wallet/cash as your joining fee payment to join this platform, in order to turn around your financial situation for good through investment.
            <h1>Be Patient</h1> while admin process your request to participate.Once your payment is approved.The system will allow to move to the <h2>NEXT STEP</h2>This process will take up to
             6 hours to complete.
        </div>
      </div>

          );
  }

}

//==> Export Component ==>//
export default  WaitingJFeeConfPanel;
