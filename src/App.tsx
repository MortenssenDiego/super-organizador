import React, { useContext, useEffect, useCallback } from 'react';
import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonList, IonMenu, IonMenuToggle, IonRouterOutlet, IonTitle, IonToolbar, setupIonicReact } from '@ionic/react';
import { calendarOutline, homeOutline, sunny } from 'ionicons/icons'
import { IonReactRouter } from '@ionic/react-router';
import Home from './pages/Home';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';
import EventsContextProvider from './data/events/EventsContextProvider';
import Events from './pages/Events/Events';
import AddEvent from './pages/Events/AddEvent';

/* User Authentication */
import LoginButton from './pages/Authentication/LoginButton';
import { useAuth0 } from "@auth0/auth0-react";
import { App as CapApp } from '@capacitor/app';
import { Browser } from '@capacitor/browser';
import { callbackUri } from './auth.config';

setupIonicReact();

const App: React.FC = () => {
	const { isAuthenticated, isLoading, handleRedirectCallback } = useAuth0();

	const onInit = useCallback(
		() => {
			CapApp.addListener('appUrlOpen', async ({ url }) => {
				if (url.startsWith(callbackUri)) {
					if (
						url.includes("state") &&
						(url.includes("code") || url.includes("error"))
					) {
						await handleRedirectCallback(url);
					}
				}
				// No-op on Android
				await Browser.close();
			});
		},
		[handleRedirectCallback]
	);

	useEffect(
		() => {
			onInit();
		},
		[]
	);

	return (
		<IonApp>
			{
				isLoading && (
					<div>Cargando...</div>
				)
			}
			{
				!isLoading && (
					<IonReactRouter>
						{
							isAuthenticated && (
								<>
									<IonMenu side="start" contentId="superOrganizadorM1">
										<IonHeader>
											<IonToolbar>
												<IonTitle><IonIcon color="warning" icon={sunny} size='large' /></IonTitle>
											</IonToolbar>
										</IonHeader>
										<IonContent>
											<IonList>
												<IonMenuToggle>
													<IonItem routerLink='/home' routerDirection='none' lines='none'>
														<IonIcon color="medium" slot="start" icon={homeOutline} />
														<IonLabel>Inicio</IonLabel>
													</IonItem>
												</IonMenuToggle>
												<IonMenuToggle>
													<IonItem routerLink='/events' routerDirection='none' lines='none'>
														<IonIcon color="medium" slot="start" icon={calendarOutline} />
														<IonLabel>Eventos</IonLabel>
													</IonItem>
												</IonMenuToggle>
											</IonList>
										</IonContent>
									</IonMenu>
									<EventsContextProvider>
										<IonRouterOutlet id="superOrganizadorM1">
											<Route exact path="/home" component={Home} />
											<Route exact path="/events" component={Events} />
											<Route exact path="/add-event" component={AddEvent} />
											<Redirect to="/home" />
										</IonRouterOutlet>
									</EventsContextProvider>
								</>
							)
						}
						{
							!isAuthenticated && (
								<LoginButton />
							)
						}
					</IonReactRouter>
				)
			}
		</IonApp>
	);
}

export default App;
