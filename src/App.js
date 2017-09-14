import React, { Component } from 'react';
import './App.css';

function Clock (props) {
  var sec = Math.floor(props.elapsed / 1000);
  const min = Math.floor(sec / 60);
  sec %= 60;
  sec = ((sec < 10)?'0':'') + sec;
  var time = min + ':' + sec
  return (
    <div> {time} </div>
  );
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      startedAt: new Date().getTime()
    }
  }
  componentDidMount() {
    this.interval = setInterval(this.forceUpdate.bind(this), 33);
    this.setState({
      startedAt: new Date().getTime()
    });
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    var elapsed = new Date().getTime() - this.state.startedAt;
    return (
      <div>
        <div> Time elapsed </div>
        <Clock elapsed = {elapsed}/>
        <button> Start </button>
      </div>
    );
  }
}

export default App;
