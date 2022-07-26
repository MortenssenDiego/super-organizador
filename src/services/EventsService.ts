
import { API_SERVER } from "../constants/api";
import { Event } from "../data/events/events-context";

export const getAllEvents = async (uid: string) => {
    try {
        const response = await fetch(`${API_SERVER}/activities/all/${uid}`);
        return await response.json();
    } catch (error) {
        return [];
    }
}

export const createEvent = async (event: Event) => {
    if (!event.uid) return;

    const response = await fetch(`${API_SERVER}/activities/new/`, {
        method: 'POST',
        // mode: 'no-cors',
        headers: {
            'Content-Type': 'application/json'
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify({
            uid: event.uid,
            title: event.title,
            description: event.description,
            date: event.date,
            eventType: event.eventType,
            isFinished: false
        })
    });

    return await response.json();
}

export const endEvent = async (eventId: string) => {

    const response = await fetch(`${API_SERVER}/activities/${eventId}`, {
        method: 'PUT'
    });

    return await response.json();
}