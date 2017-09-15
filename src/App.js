import React, { Component } from 'react';
import PropTypes from 'prop-types'
import './App.css';
import { start } from './actions'
import { connect } from 'react-redux'

const Clock = (props) => {
  var sec = Math.floor(props.elapsed / 1000);
  const min = Math.floor(sec / 60);
  sec %= 60;
  sec = ((sec < 10)?'0':'') + sec;
  var time = min + ':' + sec
  return (
    <div> {time} </div>
  );
}

Clock.propTypes = {
  elapsed: PropTypes.number.isRequired
}

const StartButton = (props) => {
  return (
    <button onClick={props.onStart} > Start </button>
  )
}

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

    return (
      <div>
        <div> Time elapsed </div>
        <Clock elapsed = {elapsed}/>
        <StartButton onStart = {this.props.onStart}/>
      </div>
    );
  }
}

AppPres.propTypes = {
  startedAt: PropTypes.number
}

const mapStateToProps = state => {
  return {
    startedAt: state.startedAt
  };
}

const mapDispatchToProps = dispatch => {
  return {
    onStart: () => {
      console.log('onStart');
      dispatch(start(new Date().getTime()))
    }
  };
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppPres);

export default App;
