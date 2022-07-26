import React, { useContext } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import UserSessionContext from '../../data/user/user-session-context';
import { useAuth0 } from "@auth0/auth0-react";

const Register: React.FC = () => {
	const userSessionContext = useContext(UserSessionContext);
	const { loginWithRedirect } = useAuth0();

	return (
		<IonGrid>
			<IonRow>
				<IonCol>
					<IonButton onClick={() => loginWithRedirect()}>INGRESAR</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Register;
