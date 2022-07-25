import React, { useContext, useState } from 'react';
import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import RainHeader from '../../components/RainHeader';
import EventsContext, { EventType } from '../../data/events/events-context';

const AddEvent: React.FC = () => {
	const eventsContext = useContext(EventsContext);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [eventType, setEventType] = useState<EventType>();


	return (
		<IonPage>
			<RainHeader title="Añadir Evento" />
			<IonContent>
				<IonGrid>
					<IonRow>
						<IonCol>
							<IonList>
								<IonItem>
									<IonSelect interface="action-sheet" onIonChange={e => setEventType(e.detail.value!)} placeholder="Tipo de Evento">
										<IonSelectOption value="study">Estudio</IonSelectOption>
										<IonSelectOption value="housework">Hogar</IonSelectOption>
										<IonSelectOption value="work">Trabajo</IonSelectOption>
										<IonSelectOption value="hobby">Hobby</IonSelectOption>
									</IonSelect>
								</IonItem>
								<IonItem>
									<IonInput value={title} placeholder="Título del Evento" onIonChange={e => setTitle(e.detail.value!)} clearInput></IonInput>
								</IonItem>
								<IonItem>
									<IonInput value={description} placeholder="Descripción" onIonChange={e => setDescription(e.detail.value!)} clearInput></IonInput>
								</IonItem>
								<IonItem>
									<IonDatetime locale="es-ES" onIonChange={e => setDate(`${new Date(e.detail.value!).toLocaleTimeString()} ${new Date(e.detail.value!).toLocaleDateString()}`)}></IonDatetime>
								</IonItem>
							</IonList>
							<IonButton
								routerLink='/events'
								routerDirection='back'
								disabled={!title || !description || !date || !eventType}
								onClick={() => 
									{
										eventsContext.addEvent(
											title,
											description,
											date,
											eventType || 'study'
										);
									}
								}
							>
								Agregar Evento
							</IonButton>
						</IonCol>
					</IonRow>
				</IonGrid>
			</IonContent>
		</IonPage>
	);
};

export default AddEvent;
