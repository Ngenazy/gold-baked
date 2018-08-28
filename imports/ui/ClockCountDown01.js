import   React          from 'react';
import { Meteor    }    from 'meteor/meteor';
import { Accounts  }    from 'meteor/accounts-base';
import { Session   }    from 'meteor/session';
import { Tracker   }    from 'meteor/tracker';
import { PropTypes }    from 'prop-types';
import   moment         from 'moment';


class ClockCountDown01 extends React.Component{

  constructor(props){
    super(props);
    //initialize state
    this.state = { deadline01: 0 };
  }

/*------------------------------------------------------------------------------/
//////////////////     Compose props and state into props         ///////////////
/------------------------------------------------------------------------------*/
//function to generate props
  _generateProps = () => ({ ...this.props, ...this.state })

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
//commponent lifecycle hook functions
componentDidMount(){


  //this.clockTracker = Tracker.autorun(() => {
          //const userId    =  Accounts.userId();
          this.intervalID = setInterval( () => this.tick(),1000);
          //subscribe to pop02
          //Meteor.subscribe('capitalFeesPub');
          //const capitalFeesDetails = CapitalFeesCol.find({ _id: userId }).fetch().pop();
          //const invPackage   = { ...investment };

          // const userDetails01 = Meteor.users.find({ _id: Meteor.userId() },
          //                                       { fields: { "userDetails.popStatus":1 }}
          //                                  ).fetch()[0];
          //
          // const userDetails02 = { ...userDetails01 };
          // const userDetails   =  userDetails02.userDetails;
          // const popStatus     = userDetails.popStatus;


          //set state's plan options
          //this.setState({ deadline });
          //console.log(this.state.nowMoment);
          //console.log(this.props.deadline);
    //});

  //console.log(props.deadline);


  }

//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
  componentWillUnmount(){
    //clean up....
    clearInterval(this.intervalID);
    console.log('cleaned...');
  }
//:::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::
tick(){

    let clock01       = document.getElementById('clock01div');
    //let daysSpan    = clock.querySelector('.days');
    let hoursSpan   = clock01.querySelector('.hours');
    let minutesSpan = clock01.querySelector('.minutes');
    let secondsSpan = clock01.querySelector('.seconds');

    let deadline01    = Session.get('deadline01');
    console.log(deadline01);
    //time remaining..
    let time        = deadline01 - moment().valueOf()

    let seconds     = Math.floor((time / 1000) % 60);
    let minutes     = Math.floor((time / 1000 / 60) % 60);
    let hours       = Math.floor((time / (1000 * 60 * 60)) % 24);
    //let days        = Math.floor(time / (1000 * 60 * 60 * 24));


    if (time < 0) {
    clearInterval(this.intervalID);
  }else{
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
        <h3>Within</h3>
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
export default ClockCountDown01;
