export interface PlayerProgress {
  completedChapters: number[];
  currentLocation: string;
  inventory: any[];
  health: number;
  faith: number;
}

export interface GameSettings {
  audioEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  accessibilityMode: boolean;
}

export interface GameStateData {
  currentChapter: number;
  playerProgress: PlayerProgress;
  gameSettings: GameSettings;
  isPaused: boolean;
  isLoading: boolean;
}

export class GameState {
  currentChapter: number;
  playerProgress: PlayerProgress;
  gameSettings: GameSettings;
  isPaused: boolean;
  isLoading: boolean;

  constructor();

  getCurrentChapter(): number;
  setCurrentChapter(chapter: number): void;
  completeChapter(chapter: number): void;
  saveProgress(): void;
  loadProgress(): boolean;
  updateSettings(newSettings: Partial<GameSettings>): void;
  pause(): void;
  resume(): void;
  resetProgress(): void;
  getProgressPercentage(): number;
}