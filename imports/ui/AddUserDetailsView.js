import   React          from 'react';
import { Link }         from 'react-router-dom';
import { PropTypes }    from 'prop-types';

//SignupView Component
const AddUserDetailsView = ({...props}) => (

      <div className="page-content" >
          <div className="boxed-view__box">
            <h1>Add Details</h1>

            { props.error ? <p> Provide Correct Details</p> : undefined }

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

export default AddUserDetailsView;
