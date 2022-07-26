import { useAuth0 } from "@auth0/auth0-react";
import React, { useState, useContext, useEffect } from "react";
import { createEvent, endEvent, getAllEvents } from "../../services/EventsService";
import UserSessionContext from "../user/user-session-context";
import EventsContext, { Event, EventsContextModel, EventType } from "./events-context";

const EventsContextProvider: React.FC = (props) => {
    const { user } = useAuth0();
    const userSessionContext = useContext(UserSessionContext);
    const [events, setEvents] = useState<Event[]>([
    ]);

    useEffect(() => {
        const fetchData = async() => {
            if(!user?.sub) return;
            const getEvents = await getAllEvents(user?.sub);
            setEvents(getEvents);
        }

        fetchData().catch(console.error);
    }, []);

    const addEvent = async (title: string, description: string, date: string, eventType: EventType) => {
        if(!user?.sub) return;
        const newEvent: Event = {
            uid: user?.sub,
            id: '',
            title,
            description,
            date,
            eventType,
            isFinished: false
        }

        await createEvent(newEvent);

        setEvents(currEvents => {
            return[...currEvents, newEvent]
        });
    };

    const finishEvent = async (eventId: string) => {

        await endEvent(eventId);

        setEvents(currEvents => {
            const updatedEvents = [...currEvents];
            const selectedEventIndex = events.findIndex(e => e.id === eventId);
            const updatedEvent = { ...updatedEvents[selectedEventIndex], isFinished: true };
            updatedEvents[selectedEventIndex] = updatedEvent;
            return updatedEvents;
        })
    }

    const eventsContext: EventsContextModel = {
        events,
        addEvent,
        finishEvent
    };

    return (
        <EventsContext.Provider value={eventsContext} >
            {props.children}
        </EventsContext.Provider>
    );
};

export default EventsContextProvider;