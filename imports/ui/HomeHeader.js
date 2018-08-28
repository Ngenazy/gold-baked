import React          from 'react';
import { Accounts }   from 'meteor/accounts-base';
import HomeHeaderView from './HomeHeaderView';

export default class HomeHeader extends React.Component{

  constructor(props){
    super(props);
  }

  //Handles onclick logout button event
  onLogin = (e) => {
       Accounts.logout();
       this.props.history.push('/login');
    }
    //Handles onclick logout button event
    onJoinNow = (e) => {

         this.props.history.push('/signup');
      }
  //function to generate props
  _generateProps = () => ({
    ...this.props,
    ...this.state
  })

  render(){

    const props = this._generateProps()

    return( <HomeHeaderView  { ...props } onLogin={ this.onLogin } onJoinNow={ this.onJoinNow }/> );
  }

}
