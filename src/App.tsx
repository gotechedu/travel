import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home';
import { BusSearch } from './pages/BusSearch';
import { FlightSearch } from './pages/FlightSearch';
import { TrainSearch } from './pages/TrainSearch';
import { CarSearch } from './pages/CarSearch';
import { WholeCarBooking } from './pages/WholeCarBooking';
import { MultipleCarBooking } from './pages/MultipleCarBooking';
import { GroupBooking } from './pages/GroupBooking';
import { WeddingTravel } from './pages/WeddingTravel';
import { CorporateTravel } from './pages/CorporateTravel';
import { Checkout } from './pages/Checkout';
import { BookingConfirmation } from './pages/BookingConfirmation';
import { MyBookings } from './pages/MyBookings';
import { Profile } from './pages/Profile';
import { Offers } from './pages/Offers';
import { Destinations } from './pages/Destinations';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { FAQPage } from './pages/FAQPage';

export const App: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Home />} />
        <Route path="buses" element={<BusSearch />} />
        <Route path="flights" element={<FlightSearch />} />
        <Route path="trains" element={<TrainSearch />} />
        <Route path="cars" element={<CarSearch />} />
        <Route path="whole-car-booking" element={<WholeCarBooking />} />
        <Route path="multiple-car-booking" element={<MultipleCarBooking />} />
        <Route path="group-booking" element={<GroupBooking />} />
        <Route path="wedding-travel" element={<WeddingTravel />} />
        <Route path="corporate-travel" element={<CorporateTravel />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="booking-confirmation" element={<BookingConfirmation />} />
        <Route path="my-bookings" element={<MyBookings />} />
        <Route path="profile" element={<Profile />} />
        <Route path="offers" element={<Offers />} />
        <Route path="destinations" element={<Destinations />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="help" element={<FAQPage />} />
        <Route path="faq" element={<FAQPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
};
