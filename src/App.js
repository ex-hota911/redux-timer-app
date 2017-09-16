import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { start, stop } from './actions'
import { connect } from 'react-redux'

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
  componentDidMount() {
    this.interval = setInterval(this.forceUpdate.bind(this), 100);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  render() {
    const elapsed =
      (this.props.startedAt)
        ? new Date().getTime() - this.props.startedAt
        :0;
    const remaningTime = this.props.remaningTime - elapsed;

    return (
      <div>
        <div> Time elapsed </div>
        <Clock time = {remaningTime}/>
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

const App = connect(mapStateToProps)(AppPres);

export default App;
