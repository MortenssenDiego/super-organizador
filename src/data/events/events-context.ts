import React from "react";

export type EventType = 'hobby' | 'study' | 'work' | 'housework';

export interface Event {
    uid: string;
    id: string;
    title: string;
    description: string;
    date: string;
    eventType: EventType;
    isFinished: boolean;
}

export interface EventsContextModel {
    events: Event[];
    addEvent: (title: string, description: string, date: string, eventType: EventType) => void;
    finishEvent: (eventId: string) => void;
}

const EventsContext = React.createContext<EventsContextModel>({
    events: [],
    addEvent: () => {},
    finishEvent: () => {}
})

export default EventsContext;