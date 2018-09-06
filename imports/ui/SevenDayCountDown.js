import   React          from 'react';
import { Meteor    }    from 'meteor/meteor';
import { Accounts  }    from 'meteor/accounts-base';
import { Session   }    from 'meteor/session';
import { Tracker   }    from 'meteor/tracker';
import { PropTypes }    from 'prop-types';

class SevenDayCountDown extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { sevenDayDeadline: 0 };
  }

/*------------------------------------------------------------------------------/
//////////////////     Compose props and state into props         ///////////////
/------------------------------------------------------------------------------*/
//function to generate props
_generateProps = () => ({ ...this.props, ...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//commponent lifecycle hook functions
componentDidMount(){
  this.intervalID = setInterval( () => this.tick(),1000);
  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //clean up....
    clearInterval(this.intervalID);
  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
tick(){

    let clock       = document.getElementById('clockdiv');
    let daysSpan    = clock.querySelector('.days');
    let hoursSpan   = clock.querySelector('.hours');
    let minutesSpan = clock.querySelector('.minutes');
    let secondsSpan = clock.querySelector('.seconds');

    let sevenDayDeadline    = Session.get('sevenDayDeadline');

    //time remaining..
    let time        = sevenDayDeadline - moment().valueOf()

    let seconds     = Math.floor((time / 1000) % 60);
    let minutes     = Math.floor((time / 1000 / 60) % 60);
    let hours       = Math.floor((time / (1000 * 60 * 60)) % 24);
    let days        = Math.floor(time / (1000 * 60 * 60 * 24));


    if (time < 0) {

      const userId        =  Accounts.userId();
      //this.setState({sevenDayDeadline:0 })//hack
      clearInterval(this.intervalID);
      //time up ...compute next pay day
      Meteor.call('compute.next.pay.day', userId);
      Accounts.logout();
       this.props.history.replace('/login');//
  }else{
      daysSpan.innerHTML    = days;
      hoursSpan.innerHTML   = ('0' + hours).slice(-2);
      minutesSpan.innerHTML = ('0' + minutes).slice(-2);
      secondsSpan.innerHTML = ('0' + seconds).slice(-2);

  }

}
/*------------------------------------------------------------------------------/
//////////////// Render Presentational UI Component (with props)  ///////////////
/------------------------------------------------------------------------------*/
  render(){
    //generate props to pass to UI
    const props = this._generateProps()

    return(
      <div>
        <h4>Next Ca$h Payout in:</h4>
        <div id="clockdiv">
          <div>
            <span className="days">0</span>
            <div  className="smalltext">Days</div>
          </div>
          <div>
            <span className="hours">0</span>
            <div  className="smalltext">Hours</div>
          </div>
          <div>
            <span className="minutes">0</span>
            <div  className="smalltext">Minutes</div>
          </div>
          <div>
            <span className="seconds">0</span>
            <div  className="smalltext">Seconds</div>
          </div>
        </div>

      </div>
    );
  }

}

//==> Export Component ==>//
export default SevenDayCountDown;
