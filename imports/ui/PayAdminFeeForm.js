import   React          from 'react';
import { Link }         from 'react-router-dom';
import { PropTypes }    from 'prop-types';

//SignupView Component
const PayAdminFeeForm = ({...props}) => (

      <div className="page-content">
        <div className="boxed-view__box">

          <h5>Pay Admin fee via e-Wallet to:</h5>
          <h1>078 801 2749</h1>
          <h5>and submit proof of payment below</h5>
          <h3>Proof Of Payment</h3>

          { props.error ? <p className="smalltext__error"> {props.error} </p> : undefined }

          <form onSubmit={props.submitDetails} noValidate >
            <input
                type="text"
                name="voucherNum"
                className = "form__input"
                placeholder="Voucher Number"
                onChange={props.handleChange}
            />

            <input
                type="text"
                name="voucherPin"
                className = "form__input"
                placeholder="Voucher PIN"
                onChange={props.handleChange}
             />

            <input
               type="text"
               name="bankToRedeem"
               className = "form__input"
               placeholder="Bank to redeem voucher"
               onChange={props.handleChange}
             />

            <button   className = "button">Submit Proof</button>
          </form>
        </div>
      </div>
)

export default PayAdminFeeForm;
