import React, { useContext, useState, useEffect } from 'react';
import { IonButton, IonCol, IonContent, IonDatetime, IonGrid, IonInput, IonItem, IonItemDivider, IonList, IonPage, IonRow, IonSelect, IonSelectOption } from '@ionic/react';
import RainHeader from '../../components/RainHeader';
import EventsContext, { EventType } from '../../data/events/events-context';
import { useAuth0 } from "@auth0/auth0-react";

const AddEvent: React.FC = () => {
	const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
	const [userMetadata, setUserMetadata] = useState(null);
	const eventsContext = useContext(EventsContext);
	const [title, setTitle] = useState<string>('');
	const [description, setDescription] = useState<string>('');
	const [date, setDate] = useState<string>('');
	const [eventType, setEventType] = useState<EventType>();

	useEffect(() => {
		const getUserMetadata = async () => {
			const domain = "dev-za6-76vz.us.auth0.com";
			try {
				const accessToken = await getAccessTokenSilently({
					audience: `https://${domain}/api/v2/`,
					scope: "read:current_user",
				});

				if(!user) return;

				const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;

				const metadataResponse = await fetch(userDetailsByIdUrl, {
					headers: {
						Authorization: `Bearer ${accessToken}`,
					},
				});

				const { user_metadata } = await metadataResponse.json();

				setUserMetadata(user_metadata);
			} catch (e: any) {
				console.log(e.message);
			}
		};

		getUserMetadata();
	}, [getAccessTokenSilently, user?.sub]);

	return (
		<IonPage>
			<RainHeader title="Añadir Evento" />
			{
				isAuthenticated &&
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
									onClick={() => {
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
			}
		</IonPage>
	);
};

export default AddEvent;
