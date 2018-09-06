import   React          from 'react';
import { PropTypes }    from 'prop-types';

const AddWalletDetailsForm = ({...props}) => (

      <div className="page-content" >
          <div className="boxed-view__box">
            <h3>Receiving Wallet Details</h3>

            { props.error ? <p className="smalltext__error">{props.error}</p> : undefined }

            <form onSubmit={props.submitDetails} noValidate >

              <input
                type="text"
                name="userCell"
                className = "form__input"
                placeholder="Cellphone"
                onChange={props.handleChange}
               />

              <input
                type="text"
                name="userBank"
                className = "form__input"
                placeholder="Bank"
                onChange={props.handleChange}
              />

              <input
                type="text"
                name="userBankAcc"
                className = "form__input"
                placeholder="Bank Account"
                onChange={props.handleChange}
              />

              <button className="button">Submit</button>
            </form>
          </div>
      </div>
)

export default AddWalletDetailsForm;
