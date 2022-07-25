import React, { useContext, useState } from 'react';
import { IonAlert, IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import RainHeader from '../../components/RainHeader';
import EventsContext, { Event } from '../../data/events/events-context';
import { add } from 'ionicons/icons';

const Events: React.FC = () => {
    const eventsContext = useContext(EventsContext);
    const [tab, setTab] = useState('pending');
    const [showAlert, setShowAlert] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

    const handleFinish = (event: Event) => {
        setSelectedEvent(event);
        setShowAlert(true);
    }

    return (
        <IonPage>
            <RainHeader title="Eventos" />
            <IonContent>
                <IonFab vertical="bottom" horizontal="end" slot="fixed">
                    <IonFabButton routerLink='/add-event' routerDirection='forward'>
                        <IonIcon icon={add} />
                    </IonFabButton>
                </IonFab>
                <IonSegment onIonChange={(e: any) => setTab(e.detail.value)}>
                    <IonSegmentButton value="pending">
                        <IonLabel>EN CURSO</IonLabel>
                    </IonSegmentButton>
                    <IonSegmentButton value="finished">
                        <IonLabel>FINALIZADOS</IonLabel>
                    </IonSegmentButton>
                </IonSegment>
                <IonGrid>
                    {
                        eventsContext.events.filter(e => tab === 'pending' ? !e.isFinished : e.isFinished).map((event: Event) => (
                            <IonRow key={event.id} >
                                <IonCol className="ion-text-center">
                                    <IonCard>
                                        <IonCardHeader>
                                            <h5>{event.title}</h5>
                                            <IonCardSubtitle>{event.date}</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            {
                                                event.description && <p>{event.description}</p>
                                            }
                                            {
                                                event.isFinished ?
                                                    <p>Evento finalizado</p> :
                                                    <IonButton fill='outline' onClick={() => handleFinish(event)}>
                                                        Finalizar Evento
                                                    </IonButton>
                                            }
                                        </IonCardContent>
                                    </IonCard>
                                </IonCol>
                            </IonRow>
                        ))
                    }
                </IonGrid>
                {selectedEvent && <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Finalizar Actividad"
                    message={`Estás seguro de finalizar ${selectedEvent?.title}`}
                    buttons={[{
                        text: 'Cancelar',
                        role: 'cancel',
                      },
                      {
                        text: 'Finalizar',
                        role: 'confirm',
                        handler: () => { eventsContext.finishEvent(selectedEvent?.id); }
                      }]}
                />}
            </IonContent>
        </IonPage>
    );
};

export default Events;
