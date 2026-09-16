
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowLeftRight,
  BadgePercent,
  Bus,
  CalendarDays,
  Car,
  CheckCircle2,
  ChevronDown,
  Clock3,
  MapPin,
  Minus,
  Plane,
  Plus,
  Search,
  ShieldCheck,
  Sparkles,
  Train,
  Users,
  X,
} from 'lucide-react';

import { useAppDispatch, useAppSelector } from '../../store/store';
import {
  setMode,
  setTripType,
  setFrom,
  setTo,
  swapLocations,
  setDepartureDate,
  setReturnDate,
  setPassengers,
  setTravelClass,
  setBusType,
  setCarType,
  setWithDriver,
} from '../../store/searchSlice';

import { TravelMode, TripType } from '../../types';

/* =========================================================
   Types
========================================================= */

type BookingMode = TravelMode;

interface PopularRoute {
  from: string;
  to: string;
  mode: BookingMode;
  label: string;
}

interface ModeConfig {
  label: string;
  shortLabel: string;
  icon: React.ElementType;
  fromLabel: string;
  fromPlaceholder: string;
  toLabel: string;
  toPlaceholder: string;
  searchLabel: string;
}

/* =========================================================
   Constants
========================================================= */

const BRAND = {
  navy: '#082B52',
  blue: '#0B4F8A',
  orange: '#FF6B00',
  orangeSoft: '#FFF1E7',
};

const MAX_PASSENGERS = 10;

const POPULAR_ROUTES: PopularRoute[] = [
  {
    from: 'Lucknow',
    to: 'Delhi',
    mode: 'bus',
    label: 'Lucknow → Delhi',
  },
  {
    from: 'Lucknow',
    to: 'Ayodhya',
    mode: 'bus',
    label: 'Lucknow → Ayodhya',
  },
  {
    from: 'Gorakhpur',
    to: 'Lucknow',
    mode: 'train',
    label: 'Gorakhpur → Lucknow',
  },
  {
    from: 'Delhi',
    to: 'Jaipur',
    mode: 'car',
    label: 'Delhi → Jaipur',
  },
  {
    from: 'Delhi',
    to: 'Mumbai',
    mode: 'flight',
    label: 'Delhi → Mumbai',
  },
  {
    from: 'Varanasi',
    to: 'Delhi',
    mode: 'train',
    label: 'Varanasi → Delhi',
  },
];

const MODE_CONFIG: Record<BookingMode, ModeConfig> = {
  bus: {
    label: 'Bus',
    shortLabel: 'Buses',
    icon: Bus,
    fromLabel: 'From',
    fromPlaceholder: 'City or boarding point',
    toLabel: 'To',
    toPlaceholder: 'City or dropping point',
    searchLabel: 'Search Buses',
  },

  car: {
    label: 'Car',
    shortLabel: 'Cars',
    icon: Car,
    fromLabel: 'Pickup',
    fromPlaceholder: 'Pickup location',
    toLabel: 'Drop',
    toPlaceholder: 'Drop location',
    searchLabel: 'Search Cars',
  },

  train: {
    label: 'Train',
    shortLabel: 'Trains',
    icon: Train,
    fromLabel: 'From',
    fromPlaceholder: 'Railway station',
    toLabel: 'To',
    toPlaceholder: 'Railway station',
    searchLabel: 'Search Trains',
  },

  flight: {
    label: 'Flight',
    shortLabel: 'Flights',
    icon: Plane,
    fromLabel: 'From',
    fromPlaceholder: 'Airport or city',
    toLabel: 'To',
    toPlaceholder: 'Airport or city',
    searchLabel: 'Search Flights',
  },
};

const TRAVEL_CLASSES = [
  'Economy',
  'Premium Economy',
  'Business',
  'First Class',
];

const BUS_TYPES = [
  'Any Bus',
  'AC Seater',
  'AC Sleeper',
  'Volvo',
  'Luxury',
];

const CAR_TYPES = [
  'Any Car',
  'Hatchback',
  'Sedan',
  'SUV',
  'Premium',
  'Luxury',
];

/* =========================================================
   Helpers
========================================================= */

const getToday = () => {
  const date = new Date();

  const year = date.getFullYear();
  const month = `${date.getMonth() + 1}`.padStart(2, '0');
  const day = `${date.getDate()}`.padStart(2, '0');

  return `${year}-${month}-${day}`;
};

const formatDate = (date?: string) => {
  if (!date) return 'Select date';

  const parsed = new Date(`${date}T00:00:00`);

  if (Number.isNaN(parsed.getTime())) {
    return 'Select date';
  }

  return parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

/* =========================================================
   Reusable Field
========================================================= */

interface FieldShellProps {
  label: string;
  icon?: React.ElementType;
  children: React.ReactNode;
  className?: string;
  error?: string;
}

const FieldShell: React.FC<FieldShellProps> = ({
  label,
  icon: Icon,
  children,
  className = '',
  error,
}) => {
  return (
    <div className={`relative ${className}`}>
      <div
        className={[
          'group rounded-2xl border bg-white transition-all duration-200',
          error
            ? 'border-red-300 ring-4 ring-red-500/5'
            : 'border-slate-200 hover:border-slate-300 focus-within:border-[#FF6B00] focus-within:ring-4 focus-within:ring-[#FF6B00]/5',
        ].join(' ')}
      >
        <div className="flex items-start gap-3 px-4 py-3.5">
          {Icon && (
            <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-500 transition-colors group-focus-within:bg-[#FFF1E7] group-focus-within:text-[#FF6B00]">
              <Icon className="h-4 w-4" />
            </div>
          )}

          <div className="min-w-0 flex-1">
            <label className="mb-1 block text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
              {label}
            </label>

            {children}
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-1.5 px-1 text-[11px] font-medium text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

/* =========================================================
   Booking Widget
========================================================= */

export const BookingWidget: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const search = useAppSelector((state) => state.search);

  const [passengerDropdownOpen, setPassengerDropdownOpen] = useState(false);
  const [advancedDropdownOpen, setAdvancedDropdownOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);

  const [errors, setErrors] = useState<{
    from?: string;
    to?: string;
    departureDate?: string;
    returnDate?: string;
  }>({});

  const passengerRef = useRef<HTMLDivElement>(null);

  const config = MODE_CONFIG[search.mode];

  const today = useMemo(() => getToday(), []);

  /* =========================================================
     Close passenger dropdown on outside click
  ========================================================= */

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        passengerRef.current &&
        !passengerRef.current.contains(event.target as Node)
      ) {
        setPassengerDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  /* =========================================================
     Clear mode-specific values where appropriate
  ========================================================= */

  const handleModeChange = (mode: BookingMode) => {
    dispatch(setMode(mode));

    setErrors({});
    setAdvancedDropdownOpen(false);
  };

  /* =========================================================
     Validation
  ========================================================= */

  const validateForm = () => {
    const nextErrors: typeof errors = {};

    const from = search.from.trim();
    const to = search.to.trim();

    if (!from) {
      nextErrors.from = `${config.fromLabel} location is required`;
    }

    if (!to) {
      nextErrors.to = `${config.toLabel} location is required`;
    }

    if (from && to && from.toLowerCase() === to.toLowerCase()) {
      nextErrors.to = 'Origin and destination cannot be the same';
    }

    if (!search.departureDate) {
      nextErrors.departureDate = 'Please select a travel date';
    } else if (search.departureDate < today) {
      nextErrors.departureDate = 'Travel date cannot be in the past';
    }

    if (
      search.tripType === 'roundTrip' &&
      search.returnDate &&
      search.departureDate &&
      search.returnDate < search.departureDate
    ) {
      nextErrors.returnDate = 'Return date must be after departure';
    }

    if (
      search.tripType === 'roundTrip' &&
      !search.returnDate
    ) {
      nextErrors.returnDate = 'Please select a return date';
    }

    setErrors(nextErrors);

    return Object.keys(nextErrors).length === 0;
  };

  /* =========================================================
     Submit
  ========================================================= */

  const handleSearchSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSearching(true);

    /*
     * Small UI delay makes the loading state visible and provides
     * a better transition before navigating to the results page.
     *
     * Replace this with your API call when backend integration
     * is connected.
     */
    await new Promise((resolve) => setTimeout(resolve, 450));

    switch (search.mode) {
      case 'bus':
        navigate('/buses');
        break;

      case 'flight':
        navigate('/flights');
        break;

      case 'train':
        navigate('/trains');
        break;

      case 'car':
        navigate('/cars');
        break;

      default:
        navigate('/buses');
    }

    setIsSearching(false);
  };

  /* =========================================================
     Popular route
  ========================================================= */

  const handleQuickRoute = (
    from: string,
    to: string,
    mode: BookingMode
  ) => {
    dispatch(setMode(mode));
    dispatch(setFrom(from));
    dispatch(setTo(to));

    setErrors({});
  };

  /* =========================================================
     Location swap
  ========================================================= */

  const handleSwap = () => {
    if (!search.from && !search.to) return;

    dispatch(swapLocations());

    setErrors((current) => ({
      ...current,
      from: undefined,
      to: undefined,
    }));
  };

  /* =========================================================
     Passenger controls
  ========================================================= */

  const decreasePassengers = () => {
    if (search.passengers <= 1) return;

    dispatch(setPassengers(search.passengers - 1));
  };

  const increasePassengers = () => {
    if (search.passengers >= MAX_PASSENGERS) return;

    dispatch(setPassengers(search.passengers + 1));
  };

  /* =========================================================
     Render
  ========================================================= */

  return (
    <div className="mx-auto w-full max-w-[1180px] px-3 sm:px-4 lg:px-0 rounded-[24px] overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          duration: 0.55,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="overflow-visible rounded-[24px] border border-white/70 bg-white shadow-[0_24px_70px_rgba(8,43,82,0.18)] sm:rounded-[28px]"
      >
        {/* =====================================================
            Top Header
        ====================================================== */}

        <div className="border-b border-slate-100 bg-white px-3 pt-3 sm:px-4 sm:pt-4">

          {/* ===================================================
              Travel Modes
          ==================================================== */}

          <div className="mt-4 flex gap-1.5 overflow-x-auto pb-2 scrollbar-none">
            {(Object.keys(MODE_CONFIG) as BookingMode[]).map((mode) => {
              const item = MODE_CONFIG[mode];
              const Icon = item.icon;
              const active = search.mode === mode;

              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => handleModeChange(mode)}
                  aria-pressed={active}
                  className={[
                    'relative flex min-w-[108px] flex-1 items-center justify-center gap-2 rounded-xl px-3 py-3 text-xs font-bold transition-all duration-200 sm:min-w-[130px] sm:rounded-2xl sm:py-3.5 sm:text-sm',
                    active
                      ? 'bg-[#082B52] text-white shadow-lg shadow-[#082B52]/15'
                      : 'text-slate-500 hover:bg-slate-50 hover:text-[#082B52]',
                  ].join(' ')}
                >
                  <Icon
                    className={[
                      'h-4 w-4',
                      active ? 'text-[#FF6B00]' : 'text-slate-400',
                    ].join(' ')}
                  />

                  <span>{item.shortLabel}</span>

                  {active && (
                    <motion.span
                      layoutId="activeBookingMode"
                      className="absolute inset-x-4 -bottom-[9px] h-0.5 rounded-full bg-[#FF6B00]"
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* =====================================================
            Booking Controls
        ====================================================== */}

        <div className="border-b border-slate-100 bg-slate-50/50 px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            {/* Trip Type */}
            <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
              {(
                [
                  ['oneWay', 'One Way'],
                  ['roundTrip', 'Round Trip'],
                ] as [TripType, string][]
              ).map(([value, label]) => {
                const active = search.tripType === value;

                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => {
                      dispatch(setTripType(value));

                      if (value === 'oneWay') {
                        dispatch(setReturnDate(''));
                      }

                      setErrors({});
                    }}
                    className={[
                      'rounded-lg px-3 py-2 text-xs font-bold transition-all sm:px-4',
                      active
                        ? 'bg-[#082B52] text-white shadow-sm'
                        : 'text-slate-500 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    {label}
                  </button>
                );
              })}

              {search.mode === 'flight' && (
                <button
                  type="button"
                  onClick={() => dispatch(setTripType('multiCity'))}
                  className={[
                    'rounded-lg px-3 py-2 text-xs font-bold transition-all sm:px-4',
                    search.tripType === 'multiCity'
                      ? 'bg-[#082B52] text-white shadow-sm'
                      : 'text-slate-500 hover:bg-slate-50',
                  ].join(' ')}
                >
                  Multi-City
                </button>
              )}
            </div>

            <div className="flex items-center justify-between gap-2">
              {/* Car Mode */}
              {search.mode === 'car' && (
                <div className="flex items-center gap-1 rounded-xl border border-slate-200 bg-white p-1">
                  <button
                    type="button"
                    onClick={() => dispatch(setWithDriver(true))}
                    className={[
                      'rounded-lg px-3 py-2 text-[11px] font-bold transition-all sm:text-xs',
                      search.withDriver
                        ? 'bg-[#FFF1E7] text-[#FF6B00]'
                        : 'text-slate-500 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    With Chauffeur
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(setWithDriver(false))}
                    className={[
                      'rounded-lg px-3 py-2 text-[11px] font-bold transition-all sm:text-xs',
                      !search.withDriver
                        ? 'bg-[#082B52] text-white'
                        : 'text-slate-500 hover:bg-slate-50',
                    ].join(' ')}
                  >
                    Self Drive
                  </button>
                </div>
              )}

              {/* Advanced */}
              {(search.mode === 'bus' ||
                search.mode === 'car' ||
                search.mode === 'flight' ||
                search.mode === 'train') && (
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() =>
                        setAdvancedDropdownOpen((value) => !value)
                      }
                      aria-expanded={advancedDropdownOpen}
                      className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-[11px] font-bold text-slate-600 transition hover:border-slate-300 hover:text-[#082B52] sm:text-xs"
                    >
                      Preferences
                      <ChevronDown
                        className={[
                          'h-3.5 w-3.5 transition-transform',
                          advancedDropdownOpen ? 'rotate-180' : '',
                        ].join(' ')}
                      />
                    </button>

                    <AnimatePresence>
                      {advancedDropdownOpen && (
                        <motion.div
                          initial={{ opacity: 0, y: 6, scale: 0.98 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          exit={{ opacity: 0, y: 6, scale: 0.98 }}
                          transition={{ duration: 0.16 }}
                          className="absolute right-0 top-full z-50 mt-2 w-[270px] rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl"
                        >
                          {search.mode === 'flight' && (
                            <div>
                              <label className="mb-2 block text-[11px] font-bold text-slate-500">
                                Cabin Class
                              </label>

                              <select
                                value={search.travelClass || 'Economy'}
                                onChange={(event) =>
                                  dispatch(
                                    setTravelClass(event.target.value)
                                  )
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#FF6B00]"
                              >
                                {TRAVEL_CLASSES.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {search.mode === 'bus' && (
                            <div>
                              <label className="mb-2 block text-[11px] font-bold text-slate-500">
                                Bus Type
                              </label>

                              <select
                                value={search.busType || 'Any Bus'}
                                onChange={(event) =>
                                  dispatch(setBusType(event.target.value))
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#FF6B00]"
                              >
                                {BUS_TYPES.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {search.mode === 'car' && (
                            <div>
                              <label className="mb-2 block text-[11px] font-bold text-slate-500">
                                Car Type
                              </label>

                              <select
                                value={search.carType || 'Any Car'}
                                onChange={(event) =>
                                  dispatch(setCarType(event.target.value))
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#FF6B00]"
                              >
                                {CAR_TYPES.map((item) => (
                                  <option key={item} value={item}>
                                    {item}
                                  </option>
                                ))}
                              </select>
                            </div>
                          )}

                          {search.mode === 'train' && (
                            <div>
                              <label className="mb-2 block text-[11px] font-bold text-slate-500">
                                Travel Class
                              </label>

                              <select
                                value={search.travelClass || 'Economy'}
                                onChange={(event) =>
                                  dispatch(
                                    setTravelClass(event.target.value)
                                  )
                                }
                                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm font-semibold text-slate-800 outline-none focus:border-[#FF6B00]"
                              >
                                <option value="Sleeper">Sleeper</option>
                                <option value="3A">3A</option>
                                <option value="2A">2A</option>
                                <option value="1A">1A</option>
                                <option value="Chair Car">
                                  Chair Car
                                </option>
                              </select>
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                )}
            </div>
          </div>
        </div>

        {/* =====================================================
            Search Form
        ====================================================== */}

        <form
          onSubmit={handleSearchSubmit}
          noValidate
          className="p-4 sm:p-6 lg:p-7"
        >
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-[1fr_1fr_0.9fr_0.9fr]">
            {/* From */}
            <FieldShell
              label={config.fromLabel}
              icon={MapPin}
              error={errors.from}
            >
              <input
                type="text"
                value={search.from}
                onChange={(event) => {
                  dispatch(setFrom(event.target.value));

                  if (errors.from) {
                    setErrors((current) => ({
                      ...current,
                      from: undefined,
                    }));
                  }
                }}
                placeholder={config.fromPlaceholder}
                autoComplete="off"
                className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 sm:text-base"
              />
            </FieldShell>

            {/* Swap */}
            <div className="relative lg:col-start-2 lg:row-start-1">
              <FieldShell
                label={config.toLabel}
                icon={MapPin}
                error={errors.to}
              >
                <input
                  type="text"
                  value={search.to}
                  onChange={(event) => {
                    dispatch(setTo(event.target.value));

                    if (errors.to) {
                      setErrors((current) => ({
                        ...current,
                        to: undefined,
                      }));
                    }
                  }}
                  placeholder={config.toPlaceholder}
                  autoComplete="off"
                  className="w-full bg-transparent text-sm font-bold text-slate-900 outline-none placeholder:text-slate-300 sm:text-base"
                />
              </FieldShell>

              <button
                type="button"
                onClick={handleSwap}
                disabled={!search.from && !search.to}
                aria-label="Swap origin and destination"
                title="Swap locations"
                className="absolute left-1/2 top-0 z-10 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 shadow-md transition-all hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:pointer-events-none disabled:opacity-40 lg:left-0 lg:top-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2"
              >
                <ArrowLeftRight className="h-4 w-4" />
              </button>
            </div>

            {/* Departure */}
            <FieldShell
              label={
                search.tripType === 'roundTrip'
                  ? 'Departure'
                  : 'Travel Date'
              }
              icon={CalendarDays}
              error={errors.departureDate}
            >
              <input
                type="date"
                value={search.departureDate}
                min={today}
                onChange={(event) => {
                  dispatch(setDepartureDate(event.target.value));

                  if (
                    search.returnDate &&
                    event.target.value > search.returnDate
                  ) {
                    dispatch(setReturnDate(''));
                  }

                  if (errors.departureDate) {
                    setErrors((current) => ({
                      ...current,
                      departureDate: undefined,
                    }));
                  }
                }}
                className="w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none sm:text-base"
              />


            </FieldShell>

            {/* Return / Passengers */}
            {search.tripType === 'roundTrip' ? (
              <FieldShell
                label="Return"
                icon={CalendarDays}
                error={errors.returnDate}
              >
                <input
                  type="date"
                  value={search.returnDate}
                  min={search.departureDate || today}
                  onChange={(event) => {
                    dispatch(setReturnDate(event.target.value));

                    if (errors.returnDate) {
                      setErrors((current) => ({
                        ...current,
                        returnDate: undefined,
                      }));
                    }
                  }}
                  className="w-full cursor-pointer bg-transparent text-sm font-bold text-slate-900 outline-none sm:text-base"
                />
              </FieldShell>
            ) : (
              <div ref={passengerRef} className="relative">
                <FieldShell label="Travellers" icon={Users}>
                  <button
                    type="button"
                    onClick={() =>
                      setPassengerDropdownOpen((value) => !value)
                    }
                    aria-expanded={passengerDropdownOpen}
                    aria-haspopup="dialog"
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span className="truncate text-sm font-bold text-slate-900 sm:text-base">
                      {search.passengers}{' '}
                      {search.passengers === 1
                        ? 'Traveller'
                        : 'Travellers'}
                    </span>

                    <ChevronDown
                      className={[
                        'h-4 w-4 shrink-0 text-slate-400 transition-transform',
                        passengerDropdownOpen ? 'rotate-180' : '',
                      ].join(' ')}
                    />
                  </button>
                </FieldShell>

                <AnimatePresence>
                  {passengerDropdownOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.98 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.98 }}
                      transition={{ duration: 0.16 }}
                      role="dialog"
                      aria-label="Traveller selector"
                      className="absolute right-0 top-full z-50 mt-2 w-full min-w-[280px] rounded-2xl border border-slate-100 bg-white p-4 shadow-2xl sm:w-[310px]"
                    >
                      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                        <div>
                          <p className="text-sm font-extrabold text-slate-900">
                            Travellers
                          </p>
                          <p className="mt-0.5 text-[11px] text-slate-400">
                            Select the number of passengers
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={() =>
                            setPassengerDropdownOpen(false)
                          }
                          aria-label="Close traveller selector"
                          className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 hover:bg-slate-50 hover:text-slate-700"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>

                      <div className="flex items-center justify-between py-5">
                        <div>
                          <p className="text-sm font-bold text-slate-900">
                            Passengers
                          </p>
                          <p className="text-[11px] text-slate-400">
                            Up to {MAX_PASSENGERS} in quick booking
                          </p>
                        </div>

                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={decreasePassengers}
                            disabled={search.passengers <= 1}
                            aria-label="Decrease passengers"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Minus className="h-4 w-4" />
                          </button>

                          <span className="w-6 text-center text-base font-extrabold text-[#082B52]">
                            {search.passengers}
                          </span>

                          <button
                            type="button"
                            onClick={increasePassengers}
                            disabled={
                              search.passengers >= MAX_PASSENGERS
                            }
                            aria-label="Increase passengers"
                            className="flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:border-[#FF6B00] hover:text-[#FF6B00] disabled:cursor-not-allowed disabled:opacity-40"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setPassengerDropdownOpen(false)
                        }
                        className="w-full rounded-xl bg-[#082B52] py-3 text-xs font-bold text-white transition hover:bg-[#0B4F8A]"
                      >
                        Done
                      </button>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            )}
          </div>

          {/* search button */}
          <button
            type="submit"
            disabled={isSearching}
            className="group flex w-full shrink-0 items-center justify-center gap-2 rounded-2xl bg-[#FF6B00] mt-10 px-7 py-4 text-sm font-extrabold text-white shadow-[0_10px_28px_rgba(255,107,0,0.25)] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#e95f00] hover:shadow-[0_14px_34px_rgba(255,107,0,0.3)] disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSearching ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                Searching...
              </>
            ) : (
              <>
                <Search className="h-4 w-4 transition-transform group-hover:scale-110" />
                {config.searchLabel}
              </>
            )}
          </button>
          {/* ===================================================
              Multi City Notice
          ==================================================== */}

          {search.tripType === 'multiCity' &&
            search.mode === 'flight' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/70 p-4"
              >
                <div className="flex items-start gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white text-[#0B4F8A]">
                    <Plane className="h-4 w-4" />
                  </div>

                  <div>
                    <p className="text-xs font-extrabold text-[#082B52]">
                      Multi-city flight search
                    </p>

                    <p className="mt-1 text-[11px] leading-5 text-slate-500">
                      Add multiple destinations from the flight results
                      page to build your complete itinerary.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

          {/* ===================================================
              Bottom Search Area
          ==================================================== */}


        </form>


      </motion.div>

      {/* =======================================================
          Group Booking CTA
      ======================================================== */}

      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.15,
          duration: 0.45,
        }}
        className="mt-3 flex flex-col gap-3 rounded-2xl border border-white/50 bg-[#082B52] p-3.5 shadow-lg sm:flex-row sm:items-center sm:justify-between sm:px-5"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#FF6B00]">
            <Users className="h-5 w-5" />
          </div>

          <div>
            <p className="text-xs font-extrabold text-white sm:text-sm">
              Travelling with a group?
            </p>

            <p className="mt-0.5 text-[10px] leading-4 text-white/60 sm:text-[11px]">
              Book multiple cars, buses or complete travel arrangements.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={() => navigate('/group-booking')}
          className="flex shrink-0 items-center justify-center rounded-xl bg-white px-4 py-2.5 text-xs font-extrabold text-[#082B52] transition hover:bg-[#FFF1E7] hover:text-[#FF6B00]"
        >
          Plan Group Travel
        </button>
      </motion.div>
    </div>
  );
};

export default BookingWidget;

