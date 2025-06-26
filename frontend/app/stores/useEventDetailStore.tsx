import { create } from 'zustand';
import { Event } from '../types/event';

interface EventDetailStore {
    event: Event | null;
    setEvent: (event: Event) => void;
}

export const useEventDetailStore = create<EventDetailStore>((set) => ({
    event: null,
    setEvent: (event) => set({ event }),
})); 