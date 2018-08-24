import React    from 'react';
import { Link } from 'react-router-dom';


//LoginView (Presentational Component)
const  LoginView = ({ ...props }) => (

  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1> Login  </h1>

      { props.loginError ? <p>{ props.loginError }</p> : undefined }

      <form onSubmit={props.submitHandler} noValidate >

        <input
          type="text"
          name="username"
          className = "form__input"
          onChange={props.handleChange}
          placeholder="User Name"
        />

        <input
           type="password"
           name="password"
           className = "form__input"
           onChange={props.handleChange}
           placeholder="Password"
         />

        <button className="button">Login</button>

      </form>
    <br/>
      <Link to = '/signup'>CREATE ACCOUNT</Link>
    </div>
  </div>
)

export default LoginView;
