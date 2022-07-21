import { IonButtons, IonHeader, IonMenuButton, IonTitle, IonToolbar } from '@ionic/react';

interface IRainHeader {
    title?: string;
}

const RainHeader: React.FC<IRainHeader> = (props) => {
    return (
        <IonHeader>
            <IonToolbar>
                <IonButtons slot="start">
                    <IonMenuButton color='danger' />
                </IonButtons>
                <IonTitle>{props.title || 'New Header'}</IonTitle>
            </IonToolbar>
        </IonHeader>
    );
};

export default RainHeader;
