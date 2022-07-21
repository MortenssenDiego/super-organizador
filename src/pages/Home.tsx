import React, { useContext } from 'react';
import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import RainHeader from '../components/RainHeader';
import EventsContext from '../data/events-context';

const Home: React.FC = () => {
	const eventsContext = useContext(EventsContext);

	return (
		<IonPage>
			<RainHeader title="Super Organizador" />
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol className="ion-text-center">
							<h6>Inicio</h6>
						</IonCol>
					</IonRow>

				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default Home;
