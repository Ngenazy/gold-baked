/*
+||||||||||||||||||||===========================================|||||||||||||| +
+                     App's Base Layout Component.js (/imports)                +
+|||||||||||||||||||============================================|||||||||||||  +
*/
import React                        from 'react';
import { Meteor }                   from 'meteor/meteor';
import {
        BrowserRouter,
        Route,
        Redirect,
        Switch
       }                            from 'react-router-dom';
import HomePage                     from './HomePage';
import Signup                       from './Signup';
import Login                        from './Login';
import AddWalletDetails             from './AddWalletDetails';
import PayAdminFee                  from './PayAdminFee';
import WaitAdminResponse            from './WaitAdminResponse';
import Invest                       from './Invest';
import PackageDetails               from './PackageDetails';
import AdminFees                    from './AdminFees';
import Investments                  from './Investments';
import SeedFunds                    from './SeedFunds';
import NotFound                     from './NotFound';
import PrivateRoute                 from './PrivateRoute';
//import APIs
import { RoutesCol }        from '../api/xbuxAPI';

//Application's Base layout
class AppBaseLayout extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { isAllowed:false};
  }

  componentDidMount(){
      //.........//............//............//...//
      //Track changes
      this.routesTracker = Tracker.autorun(() => {
       //get status
      const userStatus = Session.get('userStatus');
      const pathname   = Session.get('pathname');

      //subscribe to  routes
      Meteor.subscribe('routesPub',Meteor.userId(),pathname)
      const routes      = RoutesCol.find({[userStatus]:pathname}).fetch();
      let i = 0;
      //map docs to minimal
      const routesArray = routes.map((doc) => {
        const { _id, ...rest} = doc; // i c yah...
        const obj   = { ...rest};

        return obj;
      });

      //do stuff...
      for(i=0 ; i< routesArray.length; i++)
      {
        if ((routesArray[i].hasOwnProperty(userStatus)) &&
           (routesArray[i][userStatus]=== pathname)) {

              this.setState({ isAllowed:!!Meteor.userId()});
              break;
        }
     }

   });

   //........//............//............//....//
  }

  componentWillUnmount(){
     this.routesTracker.stop();
  }
  //render application component matching the route.
  render(){

    //return the component in question
    return(
      <BrowserRouter>
          <Switch>
            <Route        exact path="/"                        component={ HomePage            } />
            <Route        exact path="/signup"                  component={ Signup              } />
            <Route        exact path="/login"                   component={ Login               } />
            {/*Routes to land of canaan*/}
            <PrivateRoute exact
              path="/add-wallet-details"
              isAllowed={ this.state.isAllowed }
              component={ AddWalletDetails    } />
            <PrivateRoute
              exact path="/pay-admin-fee"
              isAllowed={ this.state.isAllowed }
              component={ PayAdminFee         } />

            <PrivateRoute
              exact
              path="/wait-admin-response"
              isAllowed={ this.state.isAllowed }
              component={ WaitAdminResponse   } />

            <PrivateRoute exact
               path="/invest"
               isAllowed={ this.state.isAllowed }
               component={ Invest              } />

            <PrivateRoute
              exact
              path="/package-details"
              isAllowed={ this.state.isAllowed }
              component={ PackageDetails      } />

            <PrivateRoute
              exact
              path="/xxx33xxx"
              isAllowed={ this.state.isAllowed }
              component={ AdminFees           } />

            <PrivateRoute
              exact
              path="/xxx34xxx"
              isAllowed={ this.state.isAllowed }
              component={ Investments         } />

            <PrivateRoute
              exact
              path="/xxx35xxx"
              isAllowed={ this.state.isAllowed }
              component={ SeedFunds           } />

            <Route
              exact
              path="/not-found"
              component={ NotFound            } />

            <Redirect     to="/not-found"/>

          </Switch>
      </BrowserRouter>
    )
  }
}

export default AppBaseLayout;
