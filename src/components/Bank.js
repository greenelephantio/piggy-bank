import React from 'react';
import { Authenticator, withAuthenticator } from 'aws-amplify-react';

const federated = {
  google_client_id: '54371822856-loinkm15trcrgrnk0qgsn4880en5eri8.apps.googleusercontent.com', // Enter your google_client_id here
};

const Bank = (props) => {
    return (
        <div>
            Bank
        </div>
    );
}

export const BankWithAuthenticator = withAuthenticator(Bank);