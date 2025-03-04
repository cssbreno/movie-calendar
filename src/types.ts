export interface TVShow {
  id: string;
  title: string;
  seasons: number;
  episodesPerSeason: number;
  episodeDuration: number; // in minutes
  priority: 'low' | 'medium' | 'high';
  image?: string;
}

export interface ScheduleSettings {
  startDate: Date;
  endDate: Date;
  hoursPerDay: number;
  daysPerWeek: string[]; // e.g., ['monday', 'wednesday', 'friday']
}

export interface ScheduleDay {
  date: Date;
  episodes: ScheduleEpisode[];
}

export interface ScheduleEpisode {
  showId: string;
  showTitle: string;
  season: number;
  episode: number;
  duration: number;
}