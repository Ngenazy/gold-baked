import React from 'react';
import { Accounts } from 'meteor/accounts-base';
import PrivateHeaderView from './PrivateHeaderView';

export default class PrivateHeader extends React.Component{

  constructor(props){
    super(props);
  }

  //Handles onclick logout button event
  onLogout = (e) => {
    //clean up session variables
    Session.keys = {};
    //byeee...
    Accounts.logout();
    this.props.history.push('/login');

    }

  //function to generate props
  _generateProps = () => ({
    ...this.props,
    ...this.state
  })

  render(){

    const props = this._generateProps()

    return( <PrivateHeaderView  { ...props } onLogout={ this.onLogout }/> );
  }

}
