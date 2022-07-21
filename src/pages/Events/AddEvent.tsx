import { IonCol, IonContent, IonGrid, IonPage, IonRow } from '@ionic/react';
import RainHeader from '../../components/RainHeader';

const AddEvent: React.FC = () => {
	return (
		<IonPage>
			<RainHeader title="Añadir Evento" />
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<h1>Añadir evento</h1>
						</IonCol>
					</IonRow>
				</IonGrid>
      		</IonContent>
		</IonPage>
	);
};

export default AddEvent;
