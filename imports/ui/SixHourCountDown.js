import   React          from 'react';
import { Meteor    }    from 'meteor/meteor';
import { Accounts  }    from 'meteor/accounts-base';
import { Session   }    from 'meteor/session';
import { Tracker   }    from 'meteor/tracker';
import { PropTypes }    from 'prop-types';
import   moment         from 'moment';


class SixHourCountDown extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { sixHrDeadline: 0 };
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
    console.log('cleaned...');
  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
tick(){

    let clock01     = document.getElementById('clock01div');
    //let daysSpan   = clock.querySelector('.days');
    let hoursSpan   = clock01.querySelector('.hours');
    let minutesSpan = clock01.querySelector('.minutes');
    let secondsSpan = clock01.querySelector('.seconds');

    let sixHrDeadline    = Session.get('sixHrDeadline');

    //time remaining..
    let time        = sixHrDeadline - moment().valueOf()

    let seconds     = Math.floor((time / 1000) % 60);
    let minutes     = Math.floor((time / 1000 / 60) % 60);
    let hours       = Math.floor((time / (1000 * 60 * 60)) % 24);
    //let days       = Math.floor(time / (1000 * 60 * 60 * 24));


    if (time < 0) {
        const userId        =  Accounts.userId();
        //block investment
        Meteor.call('block.investment', userId);
        clearInterval(this.intervalID);
    }
   else{
      //daysSpan.innerHTML    = days;
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
        <div id="clock01div">
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
export default SixHourCountDown;
