import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/common/Header';
import { Footer } from '../components/common/Footer';
import { BottomNav } from '../components/common/BottomNav';
import { ToastContainer } from '../components/common/ToastContainer';
import { NotificationDrawer } from '../components/common/NotificationDrawer';
import { AuthModal } from '../components/common/AuthModal';

export const MainLayout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-[#F8FAFC]">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <BottomNav />
      <ToastContainer />
      <NotificationDrawer />
      <AuthModal />
    </div>
  );
};
