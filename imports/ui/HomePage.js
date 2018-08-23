import React    from 'react';
import { Link } from 'react-router-dom';

class HomePage extends React.Component {
  //render Home Page component
  render() {
    return (
      <div>
        {' Home Page '}
        <p>Two links</p>
        <ul>
          <li><Link to="/signup">Sign Up (Public)</Link></li>
          <li><Link to="/login">Login(Public)</Link></li>
        </ul>
      </div>
    );
  }
}

export default HomePage;
