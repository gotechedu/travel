export type TravelMode = 'bus' | 'flight' | 'train' | 'car';
export type TripType = 'oneWay' | 'roundTrip' | 'multiCity';

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  isLoggedIn: boolean;
}

export interface Passenger {
  id: string;
  fullName: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  seatNumber?: string;
  berthPreference?: string;
  idType?: 'aadhaar' | 'pan' | 'passport';
  idNumber?: string;
}

export interface BusBoardingPoint {
  id: string;
  location: string;
  time: string;
  landmark?: string;
}

export interface BusSeat {
  id: string;
  number: string;
  deck: 'lower' | 'upper';
  type: 'seater' | 'sleeper';
  isAvailable: boolean;
  price: number;
  isLadiesOnly?: boolean;
  row: number;
  col: number;
}

export interface Bus {
  id: string;
  operatorName: string;
  busType: string; // e.g. "BharatBenz A/C Sleeper (2+1)"
  category: 'sleeper' | 'seater' | 'semi-sleeper';
  isAC: boolean;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fromCity: string;
  toCity: string;
  boardingPoints: BusBoardingPoint[];
  droppingPoints: BusBoardingPoint[];
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  totalSeats: number;
  availableSeats: number;
  amenities: string[];
  liveTracking: boolean;
  seats: BusSeat[];
}

export interface Flight {
  id: string;
  airline: string;
  airlineCode: string;
  airlineLogo: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  fromAirport: string;
  fromCode: string;
  toAirport: string;
  toCode: string;
  duration: string;
  stops: number;
  stopDetails?: string;
  price: number;
  cabinClass: 'economy' | 'premium_economy' | 'business';
  refundable: boolean;
  baggage: {
    checkIn: string;
    cabin: string;
  };
  mealsIncluded: boolean;
}

export interface TrainClassInfo {
  code: '1A' | '2A' | '3A' | 'SL' | 'CC' | 'EC';
  name: string;
  price: number;
  status: 'AVAILABLE' | 'RAC' | 'WL';
  seatsAvailable?: number;
  wlNumber?: number;
}

export interface Train {
  id: string;
  trainNumber: string;
  trainName: string;
  departureTime: string;
  arrivalTime: string;
  duration: string;
  fromStation: string;
  fromCode: string;
  toStation: string;
  toCode: string;
  runsOnDays: string[];
  classes: TrainClassInfo[];
  pantryAvailable: boolean;
  cleanlinessRating: number;
}

export interface Car {
  id: string;
  name: string;
  category: 'economy' | 'sedan' | 'suv' | 'luxury' | 'tempo_traveller' | 'mini_bus';
  image: string;
  seats: number;
  luggage: number;
  hasAC: boolean;
  transmission: 'manual' | 'automatic';
  fuelType: 'diesel' | 'petrol' | 'cng' | 'electric';
  pricePerKm: number;
  baseFarePerDay: number;
  estimatedTotalFare: number;
  driverAllowancePerDay: number;
  rating: number;
  reviewCount: number;
  idealFor: string;
  features: string[];
}

export interface MultiCarItem {
  id: string;
  carId: string;
  carName: string;
  category: Car['category'];
  quantity: number;
  pickupLocation: string;
  dropLocation: string;
  pickupDate: string;
  pickupTime: string;
  withDriver: boolean;
  pricePerVehicle: number;
}

export interface GroupQuoteRequest {
  travelType: 'bus' | 'cars' | 'mixed_fleet';
  totalTravellers: number;
  numberOfVehicles: number;
  vehicleTypes: string[];
  pickupCity: string;
  dropCity: string;
  startDate: string;
  endDate?: string;
  pickupTime: string;
  pickupPointsCount: number;
  dropPointsCount: number;
  purpose: 'family' | 'wedding' | 'corporate' | 'pilgrimage' | 'college' | 'other';
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialNotes?: string;
}

export interface WeddingFleetRequest {
  eventType: 'wedding' | 'reception' | 'sangeet' | 'full_wedding';
  eventDate: string;
  venueCity: string;
  venueName: string;
  guestCount: number;
  groomCar?: string;
  brideCar?: string;
  guestBusesCount: number;
  guestCarsCount: number;
  airportPickupNeeded: boolean;
  contactName: string;
  contactPhone: string;
  contactEmail: string;
  specialNotes?: string;
}

export interface Booking {
  id: string;
  pnr: string;
  travelMode: TravelMode | 'group' | 'wedding' | 'fleet';
  title: string;
  route: {
    from: string;
    to: string;
  };
  journeyDate: string;
  journeyTime: string;
  passengers: Passenger[];
  selectedSeats?: string[];
  totalAmount: number;
  discountAmount: number;
  status: 'confirmed' | 'completed' | 'cancelled' | 'quote_pending';
  bookedAt: string;
  vehicleDetails?: string;
  operatorName?: string;
  boardingPoint?: string;
  droppingPoint?: string;
  paymentMethod?: string;
}

export interface Offer {
  id: string;
  code: string;
  title: string;
  description: string;
  discountAmount: number;
  isPercentage: boolean;
  category: TravelMode | 'group' | 'all';
  minBookingValue: number;
  validTill: string;
  terms: string;
  badge: string;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'booking' | 'payment' | 'trip' | 'quote' | 'offer' | 'alert';
  timestamp: string;
  isRead: boolean;
  actionUrl?: string;
}

export interface Destination {
  id: string;
  name: string;
  state: string;
  tagline: string;
  startingPrice: number;
  image: string;
  popularModes: TravelMode[];
  badge?: string;
  tags: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  city: string;
  avatar: string;
  rating: number;
  category: 'bus' | 'wedding' | 'corporate' | 'family';
  text: string;
  date: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: 'all' | 'bus' | 'car' | 'train' | 'flight' | 'group' | 'wedding' | 'cancellation' | 'payment';
}
