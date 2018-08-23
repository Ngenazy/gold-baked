/*
+||||||||||||||||||||==================||||||||||||||||||||||||||||||||||||+
+                     Main.js (Client)                                     +
+|||||||||||||||||||==================|||||||||||||||||||||||||||||||||||||+
*/

//import application dependencies
import React                from 'react';
import ReactDOM             from 'react-dom'; //depends on module: react
import './main.html';

//import application
import AppBaseLayout        from '../imports/ui/AppBaseLayout';

//start-up the Application
Meteor.startup(() => {
  //render application to DOM
  ReactDOM.render( <AppBaseLayout/>, document.getElementById('app'));
});
