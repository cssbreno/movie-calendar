import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, ArrowRight } from 'lucide-react';
import { ScheduleSettings } from '../types';

interface ScheduleSettingsProps {
  onSaveSettings: (settings: ScheduleSettings) => void;
}

const DAYS_OF_WEEK = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
];

const ScheduleSettingsForm: React.FC<ScheduleSettingsProps> = ({ onSaveSettings }) => {
  const [startDate, setStartDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );
  const [endDate, setEndDate] = useState<string>(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  );
  const [hoursPerDay, setHoursPerDay] = useState<number>(2);
  const [selectedDays, setSelectedDays] = useState<string[]>(['Monday', 'Wednesday', 'Friday']);

  const handleDayToggle = (day: string) => {
    if (selectedDays.includes(day)) {
      setSelectedDays(selectedDays.filter(d => d !== day));
    } else {
      setSelectedDays([...selectedDays, day]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (selectedDays.length === 0) {
      alert('Please select at least one day of the week');
      return;
    }
    
    onSaveSettings({
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      hoursPerDay,
      daysPerWeek: selectedDays.map(day => day.toLowerCase()),
    });
  };

  return (
    <motion.div
      className="card p-5"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h3 className="text-lg font-semibold mb-4 flex items-center">
        <Calendar size={18} className="mr-2 text-primary-400" />
        Schedule Settings
      </h3>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-dark-100 mb-1">
              Start Date
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="input w-full"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-dark-100 mb-1">
              End Date
            </label>
            <input
              type="date"
              value={endDate}
              min={startDate}
              onChange={(e) => setEndDate(e.target.value)}
              className="input w-full"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block text-sm font-medium text-dark-100 mb-1">
            Hours Per Day
          </label>
          <div className="flex items-center">
            <input
              type="range"
              min="0.5"
              max="6"
              step="0.5"
              value={hoursPerDay}
              onChange={(e) => setHoursPerDay(parseFloat(e.target.value))}
              className="w-full mr-3"
            />
            <span className="text-white font-medium w-16 text-center">
              {hoursPerDay} {hoursPerDay === 1 ? 'hour' : 'hours'}
            </span>
          </div>
        </div>
        
        <div className="mb-6">
          <label className="block text-sm font-medium text-dark-100 mb-2">
            Days of the Week
          </label>
          <div className="flex flex-wrap gap-2">
            {DAYS_OF_WEEK.map((day) => (
              <button
                key={day}
                type="button"
                onClick={() => handleDayToggle(day)}
                className={`px-3 py-1 rounded-full text-sm transition-all ${
                  selectedDays.includes(day)
                    ? 'bg-primary-500 text-white'
                    : 'bg-dark-600 text-dark-200 hover:bg-dark-500'
                }`}
              >
                {day.substring(0, 3)}
              </button>
            ))}
          </div>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary w-full flex items-center justify-center"
        >
          Generate Schedule
          <ArrowRight size={18} className="ml-2" />
        </button>
      </form>
    </motion.div>
  );
};

export default ScheduleSettingsForm;