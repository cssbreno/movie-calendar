import React from 'react';
import { motion } from 'framer-motion';
import { Tv, Calendar, Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <motion.header 
      className="py-6 mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <motion.div 
            className="flex items-center mb-4 md:mb-0"
            whileHover={{ scale: 1.05 }}
            transition={{ type: 'spring', stiffness: 400, damping: 10 }}
          >
            <div className="bg-primary-500 p-2 rounded-lg mr-3 glow">
              <Tv size={24} className="text-white" />
            </div>
            <h1 className="text-2xl md:text-3xl font-bold gradient-text">SeriesSync</h1>
          </motion.div>
          
          <div className="flex space-x-4 text-sm text-dark-100">
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Calendar size={16} className="mr-2 text-primary-400" />
              <span>Smart Scheduling</span>
            </motion.div>
            <motion.div 
              className="flex items-center"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Clock size={16} className="mr-2 text-secondary-400" />
              <span>Time Optimized</span>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Header;