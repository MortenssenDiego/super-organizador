import React, { useContext } from 'react';
import { IonButton, IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import UserSessionContext from '../../data/user/user-session-context';

const Register: React.FC = () => {
	const userSessionContext = useContext(UserSessionContext);
	return (
		<IonGrid>
			<IonRow>
				<IonCol>
					{/* <IonButton onClick={firebaseSignInWithGoogle}>INGRESAR</IonButton> */}
					<IonButton>INGRESAR</IonButton>
				</IonCol>
			</IonRow>
		</IonGrid>
	);
};

export default Register;
