import { Event } from "../app/types/event";

const isUpcomingEvent = (event: Event): boolean => {
    return new Date(event.start_at) > new Date();
};

export const getUpcomingEvents = (events: Event[]): Event[] => {
    return events.filter(isUpcomingEvent).sort((a, b) => 
        new Date(a.start_at).getTime() - new Date(b.start_at).getTime()
    );
};

export const getPastEvents = (events: Event[]): Event[] => {
    return events.filter(event => !isUpcomingEvent(event)).sort((a, b) => 
        new Date(b.start_at).getTime() - new Date(a.start_at).getTime()
    );
};
