import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Film } from 'lucide-react';
import { ScheduleDay, TVShow } from '../types';

interface ScheduleProps {
  schedule: ScheduleDay[];
  shows: TVShow[];
}

const Schedule: React.FC<ScheduleProps> = ({ schedule, shows }) => {
  if (schedule.length === 0) {
    return null;
  }

  const getShowById = (id: string): TVShow | undefined => {
    return shows.find(show => show.id === id);
  };

  const formatDate = (date: Date): string => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };

  return (
    <motion.div
      className="mt-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <h2 className="text-2xl font-bold mb-6 gradient-text">Your Viewing Schedule</h2>
      
      <div className="space-y-6">
        {schedule.map((day, index) => (
          <motion.div
            key={day.date.toISOString()}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <div className="bg-dark-600 p-4 border-b border-dark-500">
              <h3 className="font-semibold flex items-center">
                <Calendar size={18} className="mr-2 text-primary-400" />
                {formatDate(day.date)}
              </h3>
            </div>
            
            <div className="p-4">
              {day.episodes.length === 0 ? (
                <p className="text-dark-300 text-center py-2">No episodes scheduled for this day</p>
              ) : (
                <div className="space-y-3">
                  {day.episodes.map((episode, episodeIndex) => {
                    const show = getShowById(episode.showId);
                    return (
                      <motion.div
                        key={`${episode.showId}-${episode.season}-${episode.episode}`}
                        className="flex items-center p-3 rounded-lg bg-dark-600/50 hover:bg-dark-600 transition-colors"
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.2, delay: episodeIndex * 0.05 }}
                      >
                        {show?.image ? (
                          <div className="w-12 h-12 rounded overflow-hidden mr-3 flex-shrink-0">
                            <img 
                              src={show.image} 
                              alt={show.title} 
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop';
                              }}
                            />
                          </div>
                        ) : (
                          <div className="w-12 h-12 rounded bg-dark-500 flex items-center justify-center mr-3 flex-shrink-0">
                            <Film size={20} className="text-dark-300" />
                          </div>
                        )}
                        
                        <div className="flex-grow">
                          <h4 className="font-medium text-white">{episode.showTitle}</h4>
                          <p className="text-sm text-dark-200">
                            Season {episode.season}, Episode {episode.episode}
                          </p>
                        </div>
                        
                        <div className="flex items-center text-dark-100 text-sm">
                          <Clock size={14} className="mr-1 text-secondary-400" />
                          {episode.duration} min
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default Schedule;