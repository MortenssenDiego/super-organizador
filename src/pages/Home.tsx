import React, { useContext } from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import RainHeader from '../components/RainHeader';
import LogoutButton from './Authentication/LogoutButton';

const Home: React.FC = () => {
	return (
		<IonPage>
			<RainHeader title="Super Organizador" />
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol className="ion-text-center">
							<h6>Inicio</h6>
							<LogoutButton />
						</IonCol>
					</IonRow>

				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
