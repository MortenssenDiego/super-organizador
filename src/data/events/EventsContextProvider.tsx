import React, { useState, useContext, useEffect } from "react";
import UserSessionContext from "../user/user-session-context";
import EventsContext, { Event, EventsContextModel, EventType } from "./events-context";

const EventsContextProvider: React.FC = (props) => {
    const userSessionContext = useContext(UserSessionContext);

    const [events, setEvents] = useState<Event[]>([
    ]);

    useEffect(() => {
        const fetchData = async() => {
            // const getEvents = await firebaseGetAllEvents(userSessionContext.user.uid);
            setEvents([]);
            // setEvents(getEvents);
        }

        fetchData().catch(console.error);
    }, [events]);

    const addEvent = async (title: string, description: string, date: string, eventType: EventType) => {
        const newEvent: Event = {
            uid: userSessionContext.user.uid,
            id: Math.random().toString(),
            title,
            description,
            date,
            eventType,
            isFinished: false
        }

        // await firebaseSaveEvent(newEvent);

        setEvents(currEvents => {
            return[...currEvents, newEvent]
        });
    };

    const finishEvent = async (eventId: string) => {

        // await firebaseFinishEvent(eventId, userSessionContext.user.uid);

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