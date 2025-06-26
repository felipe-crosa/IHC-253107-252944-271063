import { create } from 'zustand';

interface NotificationStore {
  pendingMessage: { message: string; type: 'success' | 'danger' | 'warning' | 'info' } | null;
  setPendingMessage: (message: { message: string; type: 'success' | 'danger' | 'warning' | 'info' } | null) => void;
  clearPendingMessage: () => void;
}

export const useNotificationStore = create<NotificationStore>()((set) => ({
  pendingMessage: null,
  setPendingMessage: (message) => set({ pendingMessage: message }),
  clearPendingMessage: () => set({ pendingMessage: null }),
})); 