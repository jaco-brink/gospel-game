// Type definitions for the Gospel Game

export interface PlayerProgress {
  completedChapters: number[];
  currentLocation: string;
  inventory: string[];
  health: number;
  faith: number;
}

export interface GameSettings {
  audioEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  accessibilityMode: boolean;
}

export interface GameState {
  currentChapter: number;
  playerProgress: PlayerProgress;
  gameSettings: GameSettings;
  isPaused: boolean;
  isLoading: boolean;
}

export interface Chapter {
  id: number;
  title: string;
  description: string;
  completed: boolean;
  requirements?: number[];
}

export interface GameEvent {
  type: string;
  data: unknown;
  timestamp: number;
}

export interface Vector2D {
  x: number;
  y: number;
}

export interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameConfig {
  fps: number;
  resolution: Vector2D;
  fullscreen: boolean;
  vsync: boolean;
}

// Game constants
export const GAME_CONFIG: GameConfig = {
  fps: 60,
  resolution: { x: 1920, y: 1080 },
  fullscreen: false,
  vsync: true,
};

export const CHAPTERS: Chapter[] = [
  {
    id: 1,
    title: 'The Burden',
    description: 'Christian begins his journey with a heavy burden',
    completed: false,
  },
  {
    id: 2,
    title: 'The Wicket Gate',
    description: 'Christian seeks entry to the narrow way',
    completed: false,
    requirements: [1],
  },
  {
    id: 3,
    title: 'The Interpreter',
    description: 'Christian learns important lessons',
    completed: false,
    requirements: [2],
  },
  // Add more chapters as needed
];

// Utility types
export type ChapterId = number;
export type LocationId = string;
export type ItemId = string;

// Event types
export type GameEventType =
  | 'chapter_completed'
  | 'item_collected'
  | 'location_changed'
  | 'settings_updated'
  | 'game_saved'
  | 'game_loaded';
