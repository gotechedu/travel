import { simulateApiCall } from './client';
import { INITIAL_NOTIFICATIONS } from '../data/notifications';
import { Notification } from '../types';

let notifs = [...INITIAL_NOTIFICATIONS];

export const notificationApi = {
  getNotifications: async (): Promise<Notification[]> => {
    return simulateApiCall([...notifs], 200);
  },

  markAsRead: async (id: string): Promise<void> => {
    notifs = notifs.map((n) => (n.id === id ? { ...n, isRead: true } : n));
    return simulateApiCall(undefined, 100);
  },

  markAllAsRead: async (): Promise<void> => {
    notifs = notifs.map((n) => ({ ...n, isRead: true }));
    return simulateApiCall(undefined, 100);
  },
};
