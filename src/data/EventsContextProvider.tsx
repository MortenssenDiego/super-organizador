import React, { useState } from "react";
import EventsContext, { Event, EventsContextModel, EventType } from "./events-context";

const EventsContextProvider: React.FC = (props) => {

    const [events, setEvents] = useState<Event[]>([
        {
            id: Math.random().toString(),
            title: 'Prueba de evento',
            description: '',
            date: new Date('June 10, 2022 10:00:00'),
            eventType: 'study',
            isFinished: true
        },
        {
            id: Math.random().toString(),
            title: 'Prueba de evento',
            description: '',
            date: new Date('June 20, 2022 10:00:00'),
            eventType: 'study',
            isFinished: true
        },
        {
            id: Math.random().toString(),
            title: 'Diagnóstico prenatal genético',
            description: '',
            date: new Date('July 21, 2022 10:00:00'),
            eventType: 'study',
            isFinished: false
        },
        {
            id: Math.random().toString(),
            title: 'Charla derrame',
            description: '',
            date: new Date('July 21, 2022 21:00:00'),
            eventType: 'study',
            isFinished: false
        },
        {
            id: Math.random().toString(),
            title: 'Charla colon',
            description: '',
            date: new Date('July 23, 2022 11:00:00'),
            eventType: 'study',
            isFinished: false
        },
        {
            id: Math.random().toString(),
            title: 'Charla COVID',
            description: '',
            date: new Date('July 25, 2022 17:00:00'),
            eventType: 'study',
            isFinished: false
        },
        {
            id: Math.random().toString(),
            title: 'Charla cistisis',
            description: '',
            date: new Date('July 25, 2022 21:00:00'),
            eventType: 'study',
            isFinished: false
        },
    ])

    const addEvent = (title: string, description: string, date: Date, eventType: EventType) => {
        const newEvent: Event = {
            id: Math.random().toString(),
            title,
            description,
            date,
            eventType,
            isFinished: false
        }

        setEvents(currEvents => {
            return[...currEvents, newEvent]
        });
    };

    const finishEvent = (eventId: string) => {
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