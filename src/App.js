import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { start, stop, reset } from './actions'
import { connect } from 'react-redux'
import { notify } from './notification'

const Clock = (props) => {
  var sec = Math.floor(props.time / 1000);
  const min = Math.floor(sec / 60);
  sec %= 60;
  sec = ((sec < 10)?'0':'') + sec;
  var time = min + ':' + sec
  return (
    <div> {time} </div>
  );
}

Clock.propTypes = {
  time: PropTypes.number.isRequired
}

const StartButtonPre = (props) => {
  return (
    <button onClick={() => props.onClick(props.isRunning)} > {props.label} </button>
  )
}

const StartButton = connect(
  state => ({
    isRunning: !!state.startedAt,
    label: (state.startedAt)? 'Stop' : 'Start',
  }),
  dispatch => ({
    onClick: isRunning => dispatch(isRunning? stop() : start(new Date().getTime())),
  }))(StartButtonPre)


class AppPres extends Component {
  constructor(props) {
    super(props);
    this.state = {
      remaningTime: props.remaningTime
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remaningTime: nextProps.remaningTime
    })
  }

  componentDidMount() {
    this.interval = setInterval(this.tick.bind(this), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  tick() {
    if (!this.props.isRunning) {
      return;
    }
    var remaningTime =
      this.props.remaningTime - (new Date().getTime() - this.props.startedAt);
    if (remaningTime > 0) {
      this.setState({remaningTime: remaningTime});
    } else {
      notify('time is up!', () => {
      });
      this.props.onEnd();
    }
  }

  render() {
    return (
      <div>
        <div> Time elapsed </div>
        <Clock time = {this.state.remaningTime}/>
        <StartButton />
      </div>
    );
  }
}

AppPres.propTypes = {
  startedAt: PropTypes.number
}

const mapStateToProps = state => {
  return {
    startedAt: state.startedAt,
    remaningTime: state.remaningTime,
    isRunning: state.startedAt != null,
  };
}

const mapDispatchToProps = dispatch => ({
  onEnd: () => dispatch(reset())
});

const App = connect(mapStateToProps, mapDispatchToProps)(AppPres);

export default App;
