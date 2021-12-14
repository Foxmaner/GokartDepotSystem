import React from 'react';
import Container from 'react-bootstrap/Container';
class StopWatch extends React.Component {
    constructor() {
      super();
      this.state = { time: {}, seconds: 0 };
      this.timer = 0;
      this.startTimer = this.startTimer.bind(this);
      this.resetTimer = this.resetTimer.bind(this);
      this.countUp = this.countUp.bind(this);
      this.keyEventFunction = this.keyEventFunction.bind(this)
    }
  
    secondsToTime(secs){
      let hours = Math.floor(secs / (60 * 60));
  
      let divisor_for_minutes = secs % (60 * 60);
      let minutes = Math.floor(divisor_for_minutes / 60);
  
      let divisor_for_seconds = divisor_for_minutes % 60;
      let seconds = Math.ceil(divisor_for_seconds);
  
      let obj = {
        "h": hours,
        "m": minutes,
        "s": seconds
      };
      return obj;
    }
  
    componentDidMount() {
      document.addEventListener("keydown", this.keyEventFunction, false);
      let timeLeftVar = this.secondsToTime(this.state.seconds);
      this.setState({ time: timeLeftVar });
      this.startTimer();
    }

    componentWillUnmount(){
      document.removeEventListener("keydown", this.keyEventFunction, false);
      clearInterval(this.timer);
    };
  
    startTimer() {
        this.timer = setInterval(this.countUp, 1000);
    };
    resetTimer() {
      console.log("lol")
        this.setState({seconds: -1});
        console.log("gay")
    };

    keyEventFunction(event){
      if(event.keyCode === 39) {
        this.resetTimer()
      }else if(event.keyCode === 37){
        this.resetTimer()
      };
    };
  
    countUp() {
      // Remove one second, set state so a re-render happens.
      let seconds = this.state.seconds + 1;
      this.setState({
        time: this.secondsToTime(seconds),
        seconds: seconds,
      }); 
    }
  
    render() {
      return(
         <Container> 
           {this.state.time.m}:{this.state.time.s}
         </Container>
      );
    }
  }

  export default StopWatch;