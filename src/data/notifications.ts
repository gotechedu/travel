import { Notification } from '../types';

export const INITIAL_NOTIFICATIONS: Notification[] = [
  {
    id: 'notif-1',
    title: 'Bus Booking Confirmed!',
    message: 'Your Volvo Sleeper ticket from Lucknow to Delhi (PNR: ST-92841) is confirmed for 24 Sep, 21:30.',
    type: 'booking',
    timestamp: '10 minutes ago',
    isRead: false,
    actionUrl: '/my-bookings',
  },
  {
    id: 'notif-2',
    title: 'Driver & Bus Live Tracking Available',
    message: 'Singh Royal Travels bus UP32-EX-4092 is on schedule. Driver contact details assigned.',
    type: 'trip',
    timestamp: '2 hours ago',
    isRead: false,
    actionUrl: '/my-bookings',
  },
  {
    id: 'notif-3',
    title: 'Wedding Fleet Quote Approved',
    message: 'Your custom quote for 1x Mercedes & 2x Innova Crysta for Ayodhya event is locked with ₹5,000 discount.',
    type: 'quote',
    timestamp: '1 day ago',
    isRead: true,
    actionUrl: '/wedding-travel',
  },
  {
    id: 'notif-4',
    title: 'Festival Offer: ₹500 OFF',
    message: 'Use code SINGH500 on your next booking across bus, train, flights, or car rentals.',
    type: 'offer',
    timestamp: '3 days ago',
    isRead: true,
    actionUrl: '/offers',
  }
];
