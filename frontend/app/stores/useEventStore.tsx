import { create } from 'zustand';
import { CreateEventFormData } from '../types/event';
import * as eventsService from '../services/events.service';
import { useNotificationStore } from './useNotificationStore';

interface EventStore {
  eventData: CreateEventFormData;
  currentStep: number;
  updateEventData: (newData: Partial<CreateEventFormData>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetEventForm: () => void;
  submitEvent: () => Promise<void>;
}

const defaultValues: CreateEventFormData = {
    title: '',
    description: '',
    start_at: new Date(),
    location: '',
    group_id: 0,
    category_id: '',
}

export const useEventStore = create<EventStore>()((set, get) => ({
  eventData: defaultValues,
  currentStep: 1,
  
  updateEventData: (newData: Partial<CreateEventFormData>) => 
    set((state) => ({ 
      eventData: { ...state.eventData, ...newData } 
    })),
  
  setCurrentStep: (step: number) => set({ currentStep: step }),
  
  nextStep: () => 
    set((state) => ({ 
      currentStep: Math.min(state.currentStep + 1, 3) 
    })),
  
  prevStep: () => 
    set((state) => ({ 
      currentStep: Math.max(state.currentStep - 1, 1) 
    })),
  
  resetEventForm: () => set({ 
    eventData: defaultValues,
    currentStep: 1
  }),
  
  submitEvent: async () => {
    const { eventData, resetEventForm } = get();
    await eventsService.create(eventData);
    resetEventForm();
    useNotificationStore.getState().setPendingMessage({
      message: "Event created successfully!",
      type: "success"
    });
  },
}));