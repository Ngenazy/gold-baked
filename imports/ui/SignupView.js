import React          from 'react';
import { Link }       from 'react-router-dom';
import { PropTypes }  from 'prop-types';

//SignupView Component
const SignupView = ({...props}) => (

      <div className="boxed-view">
        <div className="boxed-view__box">
          <h1>Signup</h1>

          { props.signupError ? <p>{ props.signupError }</p> : undefined }

          <form onSubmit={props.submitHandler} noValidate >
            <input type="text"      name="username" placeholder="Username"  onChange={props.handleChange}/>
            <input type="password"  name="password" placeholder="Password"  onChange={props.handleChange}/>
            <button className="button">Create Account</button>
          </form>

          <Link to='/login'>Visit Login Page</Link>
        </div>
      </div>
)

export default SignupView;
