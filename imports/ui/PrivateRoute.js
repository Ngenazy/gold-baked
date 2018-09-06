import   React              from 'react';
import { Accounts } from 'meteor/accounts-base';
import { Session }          from 'meteor/session';
import  PropTypes           from 'prop-types';
import { Redirect, Route }  from 'react-router-dom';

class PrivateRoute extends React.Component{
  constructor(props){
    super(props);
    //initialize state
    this.state = { isAuthed:false};
  }

  componentWillMount(){
    this.setState({ isAuthed:!!Meteor.userId() });
  }

  render(){
    //destructure this.props
    const  { component:Component,location: { pathname }, ...rest } = this.props;
    //set pathname
    Session.set('pathname',pathname);

    return(
        <Route  { ...rest } render={ (props) => {
          if (this.props.isAllowed) {
            return  <Component {...props} />
          }else {
            //logout
            //Accounts.logout();

            return <Redirect to ={{ pathname:'/login', state:{ from:props.location }}}/>
          }

        }}/>
      )
    }
}

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.func
  ]),
  history: PropTypes.object
};

export default PrivateRoute;
