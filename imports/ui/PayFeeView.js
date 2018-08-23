import   React          from 'react';
import { Link }         from 'react-router-dom';
import { PropTypes }    from 'prop-types';

//SignupView Component
const PayFeeView = ({...props}) => (

      <div className="page-content">
        <div className="boxed-view__box">

          <h1> e-Wallet to: 073033 8833</h1>
          <h3>Proof Of Payment</h3>

          { props.error ? <p> Provide Correct Details</p> : undefined }

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

export default PayFeeView;
