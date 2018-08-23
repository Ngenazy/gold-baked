import React from 'react';
import { PropTypes } from 'prop-types';

const PrivateHeaderView = ({...props}) => (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">Central Trade Guru</h1>
          <button className="button button--logout" onClick={props.onLogout}>Logout</button>
        </div>
      </div>
)

export default PrivateHeaderView;
