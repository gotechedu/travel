import { FAQItem } from '../types';

export const MOCK_FAQS: FAQItem[] = [
  {
    id: 'faq-1',
    question: 'How do I book multiple cars or a wedding fleet with Singh Travel?',
    answer: 'You can navigate to our "Wedding & Events" or "Multiple Car Booking" page. You can customize the fleet (e.g. 1 Luxury Groom Mercedes, 3 Innova Crystas, and 2 Tempo Travellers), enter pickup/drop dates and locations, and submit for an instant estimate or dedicated wedding coordinator callback within 15 minutes.',
    category: 'wedding',
  },
  {
    id: 'faq-2',
    question: 'Can I choose specific seats or upper/lower sleeper berths on buses?',
    answer: 'Yes! Our interactive bus seat layout shows real-time availability for both Lower Deck (Seater / Sleeper) and Upper Deck (Sleeper berths). You can pick your preferred berth number, select ladies-reserved berths, and choose exact boarding and dropping points.',
    category: 'bus',
  },
  {
    id: 'faq-3',
    question: 'Are all drivers and commercial vehicles verified?',
    answer: 'Absolutely. Every bus operator, cab chauffeur, and tempo traveller pilot undergoes background verification, commercial license checks, and route orientation. Our fleet is equipped with GPS live tracking and 24x7 SOS support.',
    category: 'car',
  },
  {
    id: 'faq-4',
    question: 'What is the cancellation and refund timeline?',
    answer: 'Cancellations can be made directly under "My Bookings". For buses and cabs, cancellations initiated 12 hours prior to departure receive an instant refund to original payment source within 24-48 hours. Train and flight refunds follow airline and IRCTC fare rules.',
    category: 'cancellation',
  },
  {
    id: 'faq-5',
    question: 'Does Singh Travel provide corporate GST invoicing?',
    answer: 'Yes! During checkout or when requesting a corporate travel quote, select "Add GSTIN". Your tax invoice with your company details and input tax credit will be automatically generated upon ticket issuance.',
    category: 'payment',
  },
  {
    id: 'faq-6',
    question: 'How does group and bulk bus booking work?',
    answer: 'For school trips, corporate offsites, or pilgrimage groups of 15 to 500+ passengers, our Group Booking Wizard lets you request custom quotes for single or multiple buses with multi-point pickup across North India.',
    category: 'group',
  },
  {
    id: 'faq-7',
    question: 'What payment methods are supported?',
    answer: 'We support all major Indian payment gateways: UPI (Google Pay, PhonePe, Paytm, BHIM), Credit/Debit cards (Visa, Mastercard, RuPay), Net Banking (SBI, HDFC, ICICI, Axis, PNB), and digital wallets.',
    category: 'payment',
  }
];
