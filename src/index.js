import React from 'react';
import ReactDOM from 'react-dom';
import CookieBanner from 'react-cookie-banner';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { BankWithAuthenticator, Balance, Home } from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { Auth, Hub } from 'aws-amplify';
import Analytics from '@aws-amplify/analytics';
import awsconfig from './aws-exports';
import { Link } from 'react-router-dom';

// retrieve temporary AWS credentials and sign requests
Auth.configure(awsconfig);
// send analytics events to Amazon Pinpoint
Analytics.configure(awsconfig);

class Root extends React.Component {

  constructor(props) {
    super(props);
    this.handleAnalyticsClick = this.handleAnalyticsClick.bind(this);
    this.state = { analyticsEventSent: false, resultHtml: "", eventsSent: 0, loggedIn: false };
    Hub.listen('auth', (data) => {
      switch (data.payload.event) {
        case 'signIn':
          console.log('now the user is signed in');
          this.setState({ loggedIn: true });
          const user = data.payload.data;
          break;
        case 'signIn_failure':
          console.log('the user failed to sign in');
          console.log('the error is', data.payload.data);
          break;
        default:
          console.log('something' + JSON.stringify.data.payload);
          break;
      }
    });
  }

  handleAnalyticsClick() {
    Analytics.record('AWS Amplify Tutorial Event')
      .then((evt) => {
        const url = 'https://' + awsconfig.aws_project_region + '.console.aws.amazon.com/pinpoint/home/?region=' + awsconfig.aws_project_region + '#/apps/' + awsconfig.aws_mobile_analytics_app_id + '/analytics/events';
        let result = (<div>
          <p>Event Submitted.</p>
          <p>Events sent: {++this.state.eventsSent}</p>
          <a href={url} target="_blank">View Events on the Amazon Pinpoint Console</a>
        </div>);
        this.setState({
          'analyticsEventSent': true,
          'resultHtml': result
        });
      });
  }

  logInOut() {
    Auth.signOut()
      .then(data => console.log(data))
      .catch(err => console.log(err));
  }

  render() {
    const {
      culture
    } = this.state;
    return (
      <div className="">
        <Router>
          <div>
            <CookieBanner
              message="We use cookies to give you the best possible experience"
              onAccept={() => { }}
              cookie="user-has-accepted-cookies" />
            <Link to="/">Home</Link>  <Link to="/balance">Balance</Link>  <Link to="/bank">Bank</Link>
            <button onClick={() => this.logInOut()}>
              logout
            </button>
            <Route exact path="/" component={Home} />
            <Route exact path="/balance" component={Balance} />
            <Route exact path="/bank" component={BankWithAuthenticator} />
          </div>
        </Router>
      </div>
    );
  }
}

ReactDOM.render(<Root />, document.getElementById('root'));

// // If you want your app to work offline and load faster, you can change
// // unregister() to register() below. Note this comes with some pitfalls.
// // Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();