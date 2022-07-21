import React, { useContext, useState } from 'react';
import { IonButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCol, IonContent, IonFab, IonFabButton, IonGrid, IonIcon, IonLabel, IonPage, IonRow, IonSegment, IonSegmentButton } from '@ionic/react';
import RainHeader from '../../components/RainHeader';
import EventsContext from '../../data/events-context';
import { add } from 'ionicons/icons';

const Events: React.FC = () => {
    const eventsContext = useContext(EventsContext);
    const [tab, setTab] = useState('pending');

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
                        eventsContext.events.filter(e => tab === 'pending' ? !e.isFinished : e.isFinished).map(event => (
                            <IonRow key={event.id} >
                                <IonCol className="ion-text-center">
                                    <IonCard>
                                        <IonCardHeader>
                                            <h5>{event.title}</h5>
                                            <IonCardSubtitle>{`${new Date(event.date).toLocaleDateString()} - ${new Date(event.date).getHours()}:${new Date(event.date).getMinutes().toString().length === 1 ? `0${new Date(event.date).getMinutes()}` : `${new Date(event.date).getMinutes()}`} hs`}</IonCardSubtitle>
                                        </IonCardHeader>
                                        <IonCardContent>
                                            {
                                                event.description && <p>{event.description}</p>
                                            }
                                            {
                                                event.isFinished ?
                                                    <p>Evento finalizado</p> :
                                                    <IonButton fill='outline'>
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
            </IonContent>
        </IonPage>
    );
};

export default Events;
