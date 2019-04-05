import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { withAuthenticator } from 'aws-amplify-react';

const federated = {
    google_client_id: '54371822856-loinkm15trcrgrnk0qgsn4880en5eri8.apps.googleusercontent.com', // Enter your google_client_id here
  };
  
const AppWithAuth = withAuthenticator(App);
ReactDOM.render(<AppWithAuth federated={federated}/>, document.getElementById('root'));
// ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
