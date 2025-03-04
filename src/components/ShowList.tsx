import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Clock, Film } from 'lucide-react';
import { TVShow } from '../types';

interface ShowListProps {
  shows: TVShow[];
  onRemoveShow: (id: string) => void;
}

const ShowList: React.FC<ShowListProps> = ({ shows, onRemoveShow }) => {
  if (shows.length === 0) {
    return (
      <motion.div 
        className="card p-6 text-center text-dark-200"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p className="text-lg mb-2">No shows added yet</p>
        <p className="text-sm">Add your favorite TV series to create a schedule</p>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <AnimatePresence>
        {shows.map((show) => (
          <motion.div
            key={show.id}
            className="card overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <div className="flex h-full">
              {show.image && (
                <div className="w-1/3 bg-dark-600">
                  <img 
                    src={show.image} 
                    alt={show.title} 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?q=80&w=2070&auto=format&fit=crop';
                    }}
                  />
                </div>
              )}
              
              <div className={`${show.image ? 'w-2/3' : 'w-full'} p-4`}>
                <div className="flex justify-between items-start">
                  <h3 className="font-semibold text-lg mb-2 text-white">{show.title}</h3>
                  <button 
                    onClick={() => onRemoveShow(show.id)}
                    className="text-dark-300 hover:text-red-400 transition-colors"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
                
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    show.priority === 'high' 
                      ? 'bg-red-500/20 text-red-300' 
                      : show.priority === 'medium'
                        ? 'bg-yellow-500/20 text-yellow-300'
                        : 'bg-green-500/20 text-green-300'
                  }`}>
                    {show.priority.charAt(0).toUpperCase() + show.priority.slice(1)} Priority
                  </span>
                </div>
                
                <div className="text-sm text-dark-100 space-y-1">
                  <div className="flex items-center">
                    <Film size={14} className="mr-2 text-primary-400" />
                    <span>{show.seasons} {show.seasons === 1 ? 'Season' : 'Seasons'} • {show.episodesPerSeason} Episodes/Season</span>
                  </div>
                  <div className="flex items-center">
                    <Clock size={14} className="mr-2 text-secondary-400" />
                    <span>{show.episodeDuration} minutes/episode</span>
                  </div>
                </div>
                
                <div className="mt-3 text-xs text-dark-200">
                  Total: {show.seasons * show.episodesPerSeason} episodes • 
                  {Math.round(show.seasons * show.episodesPerSeason * show.episodeDuration / 60)} hours
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

export default ShowList;