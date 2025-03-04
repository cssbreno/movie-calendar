import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TVShow, ScheduleSettings, ScheduleDay } from './types';
import { generateSchedule } from './utils/scheduleGenerator';

// Components
import AnimatedBackground from './components/AnimatedBackground';
import Header from './components/Header';
import ShowForm from './components/ShowForm';
import ShowList from './components/ShowList';
import ScheduleSettingsForm from './components/ScheduleSettings';
import Schedule from './components/Schedule';

function App() {
  const [shows, setShows] = useState<TVShow[]>([]);
  const [schedule, setSchedule] = useState<ScheduleDay[]>([]);
  const [isScheduleGenerated, setIsScheduleGenerated] = useState(false);

  // Load sample data for demonstration
  useEffect(() => {
    const sampleShows: TVShow[] = [
      {
        id: '1',
        title: 'Breaking Bad',
        seasons: 5,
        episodesPerSeason: 10,
        episodeDuration: 45,
        priority: 'high',
        image: 'https://images.unsplash.com/photo-1616530940355-351fabd9524b?q=80&w=1935&auto=format&fit=crop'
      },
      {
        id: '2',
        title: 'The Office',
        seasons: 9,
        episodesPerSeason: 22,
        episodeDuration: 22,
        priority: 'medium',
        image: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=2070&auto=format&fit=crop'
      }
    ];
    
    setShows(sampleShows);
  }, []);

  const handleAddShow = (show: TVShow) => {
    setShows([...shows, show]);
    setIsScheduleGenerated(false);
  };

  const handleRemoveShow = (id: string) => {
    setShows(shows.filter(show => show.id !== id));
    setIsScheduleGenerated(false);
  };

  const handleSaveSettings = (settings: ScheduleSettings) => {
    const newSchedule = generateSchedule(shows, settings);
    setSchedule(newSchedule);
    setIsScheduleGenerated(true);
  };

  return (
    <>
      <AnimatedBackground />
      <div className="min-h-screen">
        <Header />
        
        <main className="container mx-auto px-4 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="max-w-5xl mx-auto"
          >
            <motion.div 
              className="text-center mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-4 gradient-text"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                Plan Your Perfect TV Schedule
              </motion.h1>
              <motion.p 
                className="text-lg text-dark-100 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                Add your favorite shows, set your viewing preferences, and get a personalized watching schedule.
              </motion.p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="md:col-span-2">
                <motion.h2 
                  className="text-2xl font-bold mb-4 gradient-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  Your TV Shows
                </motion.h2>
                
                <ShowForm onAddShow={handleAddShow} />
                <ShowList shows={shows} onRemoveShow={handleRemoveShow} />
              </div>
              
              <div>
                <motion.h2 
                  className="text-2xl font-bold mb-4 gradient-text"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                >
                  Schedule Options
                </motion.h2>
                
                <ScheduleSettingsForm onSaveSettings={handleSaveSettings} />
              </div>
            </div>
            
            <AnimatePresence>
              {isScheduleGenerated && (
                <Schedule schedule={schedule} shows={shows} />
              )}
            </AnimatePresence>
          </motion.div>
        </main>
      </div>
    </>
  );
}

export default App;