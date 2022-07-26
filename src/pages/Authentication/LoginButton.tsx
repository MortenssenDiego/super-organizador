import React, { useContext } from 'react';
import { IonButton, IonCol, IonGrid, IonRow } from '@ionic/react';
import { Browser } from '@capacitor/browser';
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton: React.FC = () => {
	const { buildAuthorizeUrl } = useAuth0();

	const login = async () => {
		// Ask auth0-react to build the login URL
		const url = await buildAuthorizeUrl();
	
		// Redirect using Capacitor's Browser plugin
		await Browser.open({ url, windowName: "_self" });
	  };

	return (
		<IonGrid>
			<IonRow>
				<IonCol>
					<IonButton onClick={() => login()}>INGRESAR</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default LoginButton;
