import React from 'react';
import { Train, TrainClassInfo } from '../../types';
import { useAppDispatch } from '../../store/store';
import { selectTrain } from '../../store/bookingSlice';
import { formatINR } from '../../utils/formatters';
import { useNavigate } from 'react-router-dom';
import { Utensils, Sparkles, CheckCircle2 } from 'lucide-react';

interface TrainCardProps {
  train: Train;
}

export const TrainCard: React.FC<TrainCardProps> = ({ train }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleClassSelect = (cls: TrainClassInfo) => {
    dispatch(selectTrain({ train, classCode: cls.code, fare: cls.price }));
    navigate('/checkout');
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-soft transition-all overflow-hidden p-5 sm:p-6 mb-4">
      {/* Top row: Train Name, Number, Ratings */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-extrabold bg-navy-900 text-white px-2.5 py-1 rounded-lg">
            #{train.trainNumber}
          </span>
          <h3 className="font-extrabold text-navy-900 text-base leading-tight">{train.trainName}</h3>
        </div>

        <div className="flex items-center gap-3 text-xs text-slate-500">
          <span className="text-[11px] font-semibold text-slate-400">Runs On:</span>
          <div className="flex gap-1">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => {
              const runs = train.runsOnDays.includes(day);
              return (
                <span
                  key={day}
                  className={`w-5 h-5 rounded flex items-center justify-center text-[10px] font-bold ${
                    runs ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-400'
                  }`}
                >
                  {day[0]}
                </span>
              );
            })}
          </div>
          {train.pantryAvailable && (
            <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-slate-600 ml-2">
              <Utensils className="w-3 h-3 text-brand-orange" />
              Pantry Car
            </span>
          )}
        </div>
      </div>

      {/* Middle row: Times and Stations */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-4 items-center">
        <div className="md:col-span-8 flex items-center justify-between">
          <div>
            <p className="text-xl font-black text-slate-900 leading-none">{train.departureTime}</p>
            <p className="text-xs font-bold text-navy-900 mt-1">{train.fromCode}</p>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px]">{train.fromStation}</p>
          </div>

          <div className="flex-1 flex flex-col items-center px-4">
            <span className="text-[11px] font-bold text-slate-500 mb-1">{train.duration}</span>
            <div className="w-full flex items-center">
              <div className="w-2 h-2 rounded-full border-2 border-slate-300 bg-white" />
              <div className="flex-1 border-t-2 border-slate-300" />
              <div className="w-2 h-2 rounded-full bg-brand-orange" />
            </div>
            <span className="text-[10px] text-slate-400 mt-1">Direct Railway Line</span>
          </div>

          <div className="text-right">
            <p className="text-xl font-black text-slate-900 leading-none">{train.arrivalTime}</p>
            <p className="text-xs font-bold text-navy-900 mt-1">{train.toCode}</p>
            <p className="text-[11px] text-slate-400 truncate max-w-[130px]">{train.toStation}</p>
          </div>
        </div>

        <div className="md:col-span-4 md:border-l border-slate-100 md:pl-6 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span className="font-semibold text-slate-700">Cleanliness: {train.cleanlinessRating}/5.0</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Confirmed ticket booking with instant PNR generation</p>
        </div>
      </div>

      {/* Bottom row: Class availability chips & Book buttons */}
      <div className="pt-3 border-t border-slate-100">
        <span className="block text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">
          Select Class & Check Availability:
        </span>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {train.classes.map((cls) => {
            const isAvailable = cls.status === 'AVAILABLE';
            const isRac = cls.status === 'RAC';

            return (
              <div
                key={cls.code}
                onClick={() => handleClassSelect(cls)}
                className="p-3 rounded-xl border border-slate-200 hover:border-brand-orange bg-slate-50/50 hover:bg-orange-50/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="font-bold text-xs text-navy-900">{cls.code}</span>
                  <span className="font-black text-xs text-slate-900">{formatINR(cls.price)}</span>
                </div>
                <div className="mt-2">
                  <span
                    className={`inline-block text-[10px] font-extrabold px-1.5 py-0.5 rounded ${
                      isAvailable
                        ? 'bg-emerald-100 text-emerald-800'
                        : isRac
                        ? 'bg-amber-100 text-amber-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {isAvailable ? `AVL ${cls.seatsAvailable}` : isRac ? `RAC ${cls.seatsAvailable}` : `WL ${cls.wlNumber}`}
                  </span>
                </div>
                <button
                  type="button"
                  className="w-full mt-2 py-1 bg-navy-900 group-hover:bg-brand-orange text-white text-[10px] font-bold rounded-lg transition-colors"
                >
                  Book {cls.code}
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
