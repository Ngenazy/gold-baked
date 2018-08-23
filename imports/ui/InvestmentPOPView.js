import   React          from 'react';
import { Link }         from 'react-router-dom';
import { PropTypes }    from 'prop-types';

//SignupView Component
const InvestmentPOPView = ({...props}) => (

      <div>
        <div className="boxed-view__box">
          <h3> e-wallet to: 073 033 8833</h3>
          <div>Provide Proof Of Payment</div>

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

            <button className="button">Submit Proof</button>
          </form>
        </div>
      </div>
)

export default InvestmentPOPView;
