import React from 'react';
import { Link } from 'react-router-dom';

export default () => (
  <div className="boxed-view">
    <div className="boxed-view__box">
      <h1>Page Not Found </h1>
      <p>Ummm seem the page no xsist</p>
      <Link to="/" className="button button--link">Head Home</Link>
    </div>
  </div>

)