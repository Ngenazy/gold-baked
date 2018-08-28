import React    from 'react';
import { Link } from 'react-router-dom';
import  HomeHeader from './HomeHeader';

class HomePage extends React.Component {
  constructor(props){
    super(props);
    //initialize state
    this.state = {};
  }

  //function to generate props
  _generateProps = () => ({
    ...this.props,
    ...this.state
  })


  //render Home Page component
  render() {
    //generate props to pass to UI
    const props = this._generateProps()
    
    return (
      <div>
        <HomeHeader { ...props } />
        <div className="page-content" >
          <h1>How the Platform Works</h1>
          Simple!<br/>
          We TRADE and do BULK INVESTMENTS  and earn PROFIT. After profits we pay our investors (you) 30% interest of amount you invested every week for life. No recommitment nor reinvestment.
💵 You pay once off and get paid waya-waya non stop and it guaranteed.
  <h4>STEP 1</h4>
You can invest at maximum 3 📄accounts, We believe in principle that says "sharing
 is caring" this means our community does not rely on big number of membership but
 on our loyal members who keep supporting this great initiative. Our traders Guru
 operate 24/7 in securing good investment in order to ensure we accumulates 110% of
 float funds to sustain and maintain good balance sheet.
          <h4>STEP 2</h4>

✅ Once your payment has been verified, then you can proceed to select favourite investment package from R300 to 5000.
🔴 VVIP SUIT PACKAGE FROM R5000 to  R20000.

🔴 Account activation fee is R100.
Join our group for presentation and support:<br/>
🗞🗞🗞🗞🗞🗞🗞🗞🗞🗞
https://t.me/joinchat/IwwixhKHc4MeboixUROUvw
        </div>
      </div>
    );
  }
}

export default HomePage;
