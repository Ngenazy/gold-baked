import React              from 'react';
import { Link      }      from 'react-router-dom';
import { PropTypes }      from 'prop-types';
import SixHourCountDown   from './SixHourCountDown';
//SignupView Component
const PaySeedFundsForm = ({...props}) => (

      <div>
        <div className="boxed-view__box">
           e-wallet your Seed/Investment Fund to: <span className="package--detail">078 801 2749</span> within
          <SixHourCountDown {...props } />
          <h3>Proof of Payment</h3>

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
               placeholder="Bank to Redeem Voucher"
               onChange={props.handleChange}
             />

            <button className="button">Submit Proof</button>
          </form>
        </div>
      </div>
)

export default  PaySeedFundsForm;
