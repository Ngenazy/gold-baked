import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router-dom';

class PrivateRoute extends React.Component{
  constructor(props){
    super(props);
    //initialize state
    this.state = { isAuthed:false };
  }

  componentWillMount(){
    this.setState({ isAuthed:!!Meteor.userId() });
  }

  render(){
    //destructure this.propTypes
    const  { component:Component, ...rest } = this.props;


      return(
        <Route  { ...rest } render={ (props) => {
          if (this.state.isAuthed) {
            return  <Component {...props} />
          }else {
            return <Redirect to ={{ pathname:'/login', state:{ from:props.location }}}/>
          }
        }}/>
      )
    }
}
// = ({ component:Component, ...rest }) => (
// //console.log(props),
//   <Route {...rest} render={(props) => (
//
//     let pathname = props.history.location.pathname
//     let isPrivatePage = privatePages.includes(pathname)
//     const isPublicPage  = publicPages.includes(pathname)
//
//     if(!!Meteor.userId()){
//        <Component {...props} />
//     }else{
//       <Redirect to="/login"/>
//     }
//
//   )}/>

// const { isPrivate } = component;
// console.log(isPrivate);
//   if (isAuthenticated()) {
//     //User is Authenticated
//     if (isPrivate === true) {
//       //If the route is private the user may proceed.
//       return <Route { ...props } component={ component } />;
//     }
//     else {
//       //If the route is public, the user is redirected to the links list
//       return <Redirect to={ PRIVATE_ROOT } />;
//     }
//   }
//   else {
//     //User is not Authenticated
//     if (isPrivate === false) {
//       //If the route is private the user is redirected to the app's public root.
//       return <Redirect to={ PUBLIC_ROOT } />;
//     }
//     else {
//       //If the route is public, the user may proceed.
//       return <Route { ...props } component={ component } />;
//     }
//   }

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  history: PropTypes.object
};

export default PrivateRoute;
