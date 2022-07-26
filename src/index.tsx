import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import UserSessionContextProvider from './data/user/UserSessionContextProvider';
import { Auth0Provider } from "@auth0/auth0-react";

ReactDOM.render(
	<React.StrictMode>
		<Auth0Provider
			domain="dev-za6-76vz.us.auth0.com"
			clientId="NjSeqzdpa2UpKIdNYGXAMj26j15dhnL8"
			audience="https://dev-za6-76vz.us.auth0.com/api/v2/"
			scope="read:current_user update:current_user_metadata"
			redirectUri={window.location.origin}
		>
			<UserSessionContextProvider>
				<App />
			</UserSessionContextProvider>
		</Auth0Provider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
