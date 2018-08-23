/*
+||||||||||||||||||||===========================================|||||||||||||| +
+                     App's Base Layout Component.js (/imports)                +
+|||||||||||||||||||============================================|||||||||||||  +
*/
import React             from 'react';
import {
        BrowserRouter,
        Route,
        Redirect,
        Switch
       }                  from 'react-router-dom';
import HomePage           from './HomePage';
import Signup             from './Signup';
import Login              from './Login';
import AddUserDetails     from './AddUserDetails';
import PayFee             from './PayFee';
import PackageSuit        from './PackageSuit';
import PackageDetails     from './PackageDetails';
import PledgePage         from './PledgePage';
import IncomingOrdersPage from './IncomingOrdersPage';
import AdminPanel         from './AdminPanel';
import NotFound           from './NotFound';
import PrivateRoute       from './PrivateRoute';

//Application's Base layout
class AppBaseLayout extends React.Component{
  //render application component matching the route.
  render(){
    //return the component in question
    return(
      <BrowserRouter>
          <Switch>
            <Route        exact path="/"                component={ HomePage            } />
            <Route        exact path="/signup"          component={ Signup              } />
            <Route        exact path="/login"           component={ Login               } />
            <PrivateRoute exact path="/add-details"     component={ AddUserDetails      } />
            <PrivateRoute exact path="/pay-fee"         component={ PayFee              } />
            <PrivateRoute exact path="/invest"          component={ PackageSuit         } />
            <PrivateRoute exact path="/package-details" component={ PackageDetails      } />
            <PrivateRoute exact path="/pledge"          component={ PledgePage          } />
            <PrivateRoute exact path="/incoming-orders" component={ IncomingOrdersPage  } />
            <PrivateRoute exact path="/xxx33xxx"        component={ AdminPanel          } />
            <Route        exact path="/not-found"       component={ NotFound            } />
            <Redirect     to="/not-found"/>
          </Switch>
      </BrowserRouter>
    )
  }
}

export default AppBaseLayout;
