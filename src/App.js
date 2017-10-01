import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import Setting from './Setting';
import { start, stop, countUp, finish } from './actions'
import { connect } from 'react-redux'
import { notify } from './notification'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import {grey100, green500, red500} from 'material-ui/styles/colors';
import AvPlayArrow from 'material-ui/svg-icons/av/play-arrow.js';
import AvPause from 'material-ui/svg-icons/av/pause.js';
import CircularProgress from 'material-ui/CircularProgress';
import FloatingActionButton from 'material-ui/FloatingActionButton';

const Clock = (props) => {
  var sec = Math.floor(props.time / 1000);
  const min = Math.floor(sec / 60);
  sec %= 60;
  sec = ((sec < 10)?'0':'') + sec;
  var time = min + ':' + sec
  return (
    <div style = {{fontSize: '40px'}}> {time} </div>
  );
}

Clock.propTypes = {
  time: PropTypes.number.isRequired
}

const StartButtonPre = (props) => {
  const start = (
    <FloatingActionButton mini={true} onClick={props.onStart} tooltip='Start'>
      <AvPlayArrow />
    </FloatingActionButton>
  );
  const stop = (
    <FloatingActionButton mini={true} onClick={props.onStop} tooltip='Stop'>
      <AvPause />
    </FloatingActionButton>
  );

  return (
    <div>
      {props.isRunning ? stop : start}
    </div>
  );
}

const StartButton = connect(
  state => ({
    isRunning: !!state.timer.startedAt,
  }),
  dispatch => ({
    onStart: () => dispatch(start(new Date().getTime())),
    onStop: () => dispatch(stop()),
  }))(StartButtonPre)


class AppPres extends Component {
  constructor(props) {
    super(props);
    // Use local state since it is based on props and current time.
    this.state = {
      remainingTime: props.remainingTime
    }
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      remainingTime: nextProps.remainingTime
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
    var remainingTime =
      this.props.remainingTime - (new Date().getTime() - this.props.startedAt);
    if (remainingTime > 0) {
      this.setState({remainingTime: remainingTime});
    } else {
      notify('time is up!', () => {
        this.props.onNotificationClicked();
      });
      (this.props.isWorking)? this.props.onWorkEnd() : this.props.onBreakEnd();
    }
  }

  render() {
    const style = {
      width: 400,
      textAlign: 'center',
      margin: '100px auto',
      padding: 24,
      backgroundColor: this.props.isWorking ? red500 : green500,
      color: grey100,
    }
    const progressStyle = {
      transform: 'scaleX(-1) rotate(-90deg)',
      position: 'absolute',
      left: '50%',
      marginLeft: '-100px',
    }
    const clockStyle = {
      height: 200,
      weight: 200,
      lineHeight: '200px',
    }
    const progress = this.state.remainingTime / this.props.total / 60 / 1000 * 100
    return (
      <Paper className = {this.props.className} style={style} zDepth={1}>
        <CircularProgress
          mode = 'determinate'
          color = {grey100}
          style = {progressStyle}
          size = '200'
          value = {progress} />
        <div style = {clockStyle}>
          <Clock time = {this.state.remainingTime}/>
        </div>
        <StartButton />
        <h2> {this.props.label} Done: {this.props.count} </h2>
        <Setting />
      </Paper>
    );
  }
}

AppPres.propTypes = {
  startedAt: PropTypes.number
}

const mapStateToProps = state => {
  return {
    startedAt: state.timer.startedAt,
    remainingTime: state.timer.remainingTime,
    isRunning: state.timer.startedAt != null,
    className: state.timer.isWorking ? 'App App-working' : 'App App-break',
    label: state.timer.isWorking ? 'Work' : 'Break',
    isWorking: state.timer.isWorking,
    count: state.timer.count,
    total: state.timer.isWorking ? state.setting.workTime : state.setting.breakTime
  };
}

const mapDispatchToProps = dispatch => ({
  onBreakEnd: () => dispatch(finish()),
  onWorkEnd: () => {
    dispatch(countUp());
    dispatch(finish());
  },
  onNotificationClicked: () => dispatch(start(new Date().getTime()))
});

const AppComp = connect(mapStateToProps, mapDispatchToProps)(AppPres);

const App = (props) => (
  <MuiThemeProvider>
    <AppComp />
  </MuiThemeProvider>
);

export default App;
