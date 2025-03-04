import { TVShow, ScheduleSettings, ScheduleDay, ScheduleEpisode } from '../types';

export const generateSchedule = (shows: TVShow[], settings: ScheduleSettings): ScheduleDay[] => {
  if (shows.length === 0) return [];
  
  // Sort shows by priority
  const sortedShows = [...shows].sort((a, b) => {
    const priorityMap: Record<string, number> = { high: 3, medium: 2, low: 1 };
    return priorityMap[b.priority] - priorityMap[a.priority];
  });
  
  // Calculate total episodes and viewing time
  const allEpisodes: ScheduleEpisode[] = [];
  
  sortedShows.forEach(show => {
    for (let season = 1; season <= show.seasons; season++) {
      for (let episode = 1; episode <= show.episodesPerSeason; episode++) {
        allEpisodes.push({
          showId: show.id,
          showTitle: show.title,
          season,
          episode,
          duration: show.episodeDuration
        });
      }
    }
  });
  
  // Generate all dates between start and end date
  const allDates: Date[] = [];
  const currentDate = new Date(settings.startDate);
  const endDate = new Date(settings.endDate);
  
  while (currentDate <= endDate) {
    const dayName = currentDate.toLocaleDateString('en-US', { weekday: 'lowercase' });
    if (settings.daysPerWeek.includes(dayName)) {
      allDates.push(new Date(currentDate));
    }
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  // Create schedule
  const schedule: ScheduleDay[] = [];
  let episodeIndex = 0;
  
  allDates.forEach(date => {
    const day: ScheduleDay = {
      date: new Date(date),
      episodes: []
    };
    
    let remainingMinutes = settings.hoursPerDay * 60;
    
    while (remainingMinutes > 0 && episodeIndex < allEpisodes.length) {
      const episode = allEpisodes[episodeIndex];
      
      if (episode.duration <= remainingMinutes) {
        day.episodes.push(episode);
        remainingMinutes -= episode.duration;
        episodeIndex++;
      } else {
        break;
      }
    }
    
    schedule.push(day);
  });
  
  return schedule;
};