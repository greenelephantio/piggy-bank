import React from 'react';
import ReactDOM from 'react-dom';
import CookieBanner from 'react-cookie-banner';
import './index.css';
import * as serviceWorker from './serviceWorker';
import { AppNav, Balance, Home, Settings, PrivateRoute } from './components';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { isLoggedIn } from './utils/auth-service';
import 'bootstrap/dist/css/bootstrap.min.css';

const CULTURES = [
    { culture: 'en-GB', flag: 'gb', language: 'en', voice: 'UK English Female', text: 'English (UK)' },
    { culture: 'sv-SE', flag: 'se', language: 'sv', voice: 'Swedish Female', text: 'Svenska' },
    { culture: 'de-DE', flag: 'de', language: 'de', voice: 'Deutsch Female', text: 'Deutsch' }
];


class Root extends React.Component {

  texts = {
      'logIn': {
          'en': { value: 'Log in' },
          'sv': { value: 'Logga in' },
          'de': { value: 'Anmelden' }
      },
      'cookieMessage': {
          'en': { value: 'We use cookies to give you the best possible experience' },
          'sv': { value: 'Vi använder cookies för att ge dig bästa möjliga upplevelse' },
          'de': { value: 'Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten' }
      },
  };

  static getCulture = (culture) => {
      let matching = CULTURES.filter(x => x.culture === culture);
      if (matching.length >= 1) {
          return matching[0];
      }
      return CULTURES[0];
  }

  state = {
      culture: Root.getCulture('en-GB')
  }

  changeCulture = (culture) => {
      this.setState({
          culture: Root.getCulture(culture)
      })
  }

  translate = (textId) => {
      let text = this.texts[textId];
      return text[this.state.culture.language].value;
  }

  isLoggedIn = () => {
    return false;
    // return isLoggedIn();
  }

  render() {
      const {
          culture
      } = this.state;
      return (
          <div className="">
              <Router>
                  <div>
                      <div></div>
                      {
                        isLoggedIn() === false ? (
                          <AppNav culture={culture} changeCulture={this.changeCulture} eventEmitter={this.api} />
                        ) : (
                                ''
                            )
                      }
                      <CookieBanner
                          message={this.translate('cookieMessage')}
                          onAccept={() => { }}
                          cookie="user-has-accepted-cookies" />
                      <Route exact path="/" component={Home} />
                      <Route exact path="/balance" component={Balance} />
                      <PrivateRoute path="/settings" component={Settings} />
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