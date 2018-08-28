import React from 'react';
import { PropTypes } from 'prop-types';

const HomeHeaderView = ({...props}) => (
      <div className="header">
        <div className="header__content">
          <h1 className="header__title">Central Trade Guru</h1>
          <button className="button button--logout" onClick={props.onJoinNow}>Join Now</button>
          <button className="button button--logout" onClick={props.onLogin}>Login</button>
        </div>
      </div>
)

export default HomeHeaderView;
