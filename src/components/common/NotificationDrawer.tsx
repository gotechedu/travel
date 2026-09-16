import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Bell, CheckCheck, Ticket, Car, Tag, ShieldCheck } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { closeNotificationDrawer } from '../../store/uiSlice';
import { markAllRead, markRead } from '../../store/notificationSlice';
import { useNavigate } from 'react-router-dom';

export const NotificationDrawer: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const isOpen = useAppSelector((state) => state.ui.isNotificationDrawerOpen);
  const { items, unreadCount } = useAppSelector((state) => state.notifications);

  const getIcon = (type: string) => {
    switch (type) {
      case 'booking':
        return <Ticket className="w-5 h-5 text-emerald-500" />;
      case 'trip':
      case 'quote':
        return <Car className="w-5 h-5 text-brand-orange" />;
      case 'offer':
        return <Tag className="w-5 h-5 text-purple-500" />;
      default:
        return <ShieldCheck className="w-5 h-5 text-blue-500" />;
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => dispatch(closeNotificationDrawer())}
            className="fixed inset-0 bg-black/60 z-50 backdrop-blur-xs"
          />
          <motion.aside
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 220 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-white z-50 shadow-2xl flex flex-col border-l border-slate-200"
          >
            {/* Header */}
            <div className="p-5 border-b border-slate-100 flex items-center justify-between bg-navy-900 text-white">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-white/10 rounded-xl">
                  <Bell className="w-5 h-5 text-brand-orange" />
                </div>
                <div>
                  <h3 className="font-bold text-lg leading-tight">Notifications</h3>
                  <p className="text-xs text-slate-300">
                    {unreadCount > 0 ? `${unreadCount} unread alerts` : 'All caught up'}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {unreadCount > 0 && (
                  <button
                    onClick={() => dispatch(markAllRead())}
                    className="flex items-center gap-1 text-xs text-brand-orange hover:text-white transition-colors bg-white/5 hover:bg-white/10 px-2.5 py-1.5 rounded-lg"
                  >
                    <CheckCheck className="w-3.5 h-3.5" />
                    <span>Mark all read</span>
                  </button>
                )}
                <button
                  onClick={() => dispatch(closeNotificationDrawer())}
                  className="p-2 hover:bg-white/10 rounded-xl transition-colors text-slate-300 hover:text-white"
                  aria-label="Close notification drawer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {items.length === 0 ? (
                <div className="py-16 text-center text-slate-400">
                  <Bell className="w-12 h-12 mx-auto mb-3 opacity-30 text-slate-500" />
                  <p className="font-medium text-slate-600">No notifications yet</p>
                  <p className="text-xs text-slate-400 mt-1">Updates on your bookings will appear here.</p>
                </div>
              ) : (
                items.map((n) => (
                  <div
                    key={n.id}
                    onClick={() => {
                      dispatch(markRead(n.id));
                      if (n.actionUrl) {
                        navigate(n.actionUrl);
                        dispatch(closeNotificationDrawer());
                      }
                    }}
                    className={`p-4 rounded-xl border transition-all cursor-pointer ${
                      !n.isRead
                        ? 'bg-orange-50/50 border-orange-200/80 shadow-xs'
                        : 'bg-white border-slate-100 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 bg-slate-100 rounded-xl mt-0.5">{getIcon(n.type)}</div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-sm font-semibold text-slate-800 truncate">{n.title}</h4>
                          {!n.isRead && (
                            <span className="w-2 h-2 rounded-full bg-brand-orange shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message}</p>
                        <span className="text-[11px] text-slate-400 mt-2 block font-medium">
                          {n.timestamp}
                        </span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};
