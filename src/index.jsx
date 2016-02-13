import React from 'react';
import ReactDOM from 'react-dom';
import Router,{Route} from 'react-router';
import {createStore, applyMiddleware, compose} from 'redux';
import {Provider} from 'react-redux';
import io from 'socket.io-client';
import reducer from './reducer';
import {setState} from './action_creators'
import remoteActionMiddleware from './remote_action_middleware';
import App from './components/App';
import {VotingContainer} from './components/Voting';
import {ResultsContainer} from './components/Results';
// import styles from './styles/main.css';

// /* const socket = io('http://localhost:8090');
/*
below is a usage of es6 concatenation- it is equivalent to above
*/

const socket = io(`${location.protocol}//${location.hostname}:3000`);
// const socket = new io.Socket();
// socket.connect('http://localhost:8080');

// var socket = io.connect('http://localhost:3000');
socket.on('state', state => {
  // store.dispatch({type:'SET_STATE', state})
  //the above is old way without action creators
  // console.log('recieved state change request');
  //alert('State received');
  store.dispatch(setState(state));
  //alert(store);
  }
);

const createStoreWithMiddleware = compose(applyMiddleware(
  remoteActionMiddleware(socket)), typeof window === 'object' && typeof window.devToolsExtension !== 'undefined' ? window.devToolsExtension() : f => f )(createStore);
const store = createStoreWithMiddleware(reducer);


const routes = <Route component={App}>
  <Route path="/results" component={ResultsContainer} />
  <Route path="/" component={VotingContainer} />
</Route>;

ReactDOM.render(
  <Provider store={store}>
    <Router>{routes}</Router>
  </Provider>,
  document.getElementById('app')
);
