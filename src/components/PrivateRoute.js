import React from 'react';
import { Route } from 'react-router-dom';
import { Authenticator } from 'aws-amplify-react';

const federated = {
    google_client_id: '54371822856-loinkm15trcrgrnk0qgsn4880en5eri8.apps.googleusercontent.com', // Enter your google_client_id here
};


export const PrivateRoute = ({ component: Component, ...rest }) => (    
    <Route
        {...rest}
        render={props => (
            <Authenticator federated={federated}>
                <Component {...props}/>
            </Authenticator>
        )
        }
    />
);