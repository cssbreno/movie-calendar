import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, X } from 'lucide-react';
import { v4 as uuidv4 } from 'uuid';
import { TVShow } from '../types';

interface ShowFormProps {
  onAddShow: (show: TVShow) => void;
}

const ShowForm: React.FC<ShowFormProps> = ({ onAddShow }) => {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [newShow, setNewShow] = useState<Omit<TVShow, 'id'>>({
    title: '',
    seasons: 1,
    episodesPerSeason: 10,
    episodeDuration: 30,
    priority: 'medium',
    image: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newShow.title) return;
    
    onAddShow({
      ...newShow,
      id: uuidv4(),
    });
    
    setNewShow({
      title: '',
      seasons: 1,
      episodesPerSeason: 10,
      episodeDuration: 30,
      priority: 'medium',
      image: '',
    });
    
    setIsFormOpen(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setNewShow(prev => ({
      ...prev,
      [name]: name === 'seasons' || name === 'episodesPerSeason' || name === 'episodeDuration' 
        ? parseInt(value) 
        : value
    }));
  };

  return (
    <div className="mb-8">
      {!isFormOpen ? (
        <motion.button
          className="btn btn-primary w-full flex items-center justify-center"
          onClick={() => setIsFormOpen(true)}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus size={20} className="mr-2" />
          Add TV Show
        </motion.button>
      ) : (
        <motion.div
          className="card p-5"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Add New TV Show</h3>
            <button 
              onClick={() => setIsFormOpen(false)}
              className="text-dark-300 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-dark-100 mb-1">
                  Show Title
                </label>
                <input
                  type="text"
                  name="title"
                  value={newShow.title}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="e.g. Breaking Bad"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-100 mb-1">
                  Image URL (optional)
                </label>
                <input
                  type="url"
                  name="image"
                  value={newShow.image}
                  onChange={handleChange}
                  className="input w-full"
                  placeholder="https://example.com/image.jpg"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-dark-100 mb-1">
                  Seasons
                </label>
                <input
                  type="number"
                  name="seasons"
                  value={newShow.seasons}
                  onChange={handleChange}
                  min="1"
                  className="input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-100 mb-1">
                  Episodes Per Season
                </label>
                <input
                  type="number"
                  name="episodesPerSeason"
                  value={newShow.episodesPerSeason}
                  onChange={handleChange}
                  min="1"
                  className="input w-full"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-dark-100 mb-1">
                  Episode Duration (min)
                </label>
                <input
                  type="number"
                  name="episodeDuration"
                  value={newShow.episodeDuration}
                  onChange={handleChange}
                  min="1"
                  className="input w-full"
                  required
                />
              </div>
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-dark-100 mb-1">
                Priority
              </label>
              <select
                name="priority"
                value={newShow.priority}
                onChange={handleChange}
                className="input w-full"
                required
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
              </select>
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => setIsFormOpen(false)}
                className="btn btn-outline mr-2"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="btn btn-primary"
              >
                Add Show
              </button>
            </div>
          </form>
        </motion.div>
      )}
    </div>
  );
};

export default ShowForm;