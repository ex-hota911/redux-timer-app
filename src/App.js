import React, { Component } from 'react';
import { createStore } from 'redux'
import PropTypes from 'prop-types'
import './App.css';
import reducer from './reducers'
import {start} from './actions'
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

function StartButton(props) {
  return (
    <button> Start </button>
  )
}

let store = createStore(reducer);
store.subscribe(() =>
  console.log(store.getState())
)

class AppPres extends Component {
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
        <StartButton />
      </div>
    );
  }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = dispatch => {
  return {
    onStart: () => dispatch(start())
  }
}

const App = connect(mapStateToProps, mapDispatchToProps)(AppPres);

export default App;
