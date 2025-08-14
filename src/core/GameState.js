// Game State Management System
export class GameState {
  constructor() {
    this.currentChapter = 1;
    this.playerProgress = {
      completedChapters: [],
      currentLocation: 'start',
      inventory: [],
      health: 100,
      faith: 50,
    };
    this.gameSettings = {
      audioEnabled: true,
      musicVolume: 0.7,
      sfxVolume: 0.8,
      accessibilityMode: false,
    };
    this.isPaused = false;
    this.isLoading = false;
  }

  // Chapter management
  getCurrentChapter() {
    return this.currentChapter;
  }

  setCurrentChapter(chapter) {
    this.currentChapter = chapter;
    this.saveProgress();
  }

  // Progress tracking
  completeChapter(chapter) {
    if (!this.playerProgress.completedChapters.includes(chapter)) {
      this.playerProgress.completedChapters.push(chapter);
      this.saveProgress();
    }
  }

  // Save/Load functionality
  saveProgress() {
    try {
      localStorage.setItem(
        'gospel-game-progress',
        JSON.stringify({
          currentChapter: this.currentChapter,
          playerProgress: this.playerProgress,
          gameSettings: this.gameSettings,
        }),
      );
      console.log('💾 Game progress saved');
    } catch (error) {
      console.error('Failed to save progress:', error);
    }
  }

  loadProgress() {
    try {
      const saved = localStorage.getItem('gospel-game-progress');
      if (saved) {
        const data = JSON.parse(saved);
        this.currentChapter = data.currentChapter || 1;
        this.playerProgress = data.playerProgress || this.playerProgress;
        this.gameSettings = data.gameSettings || this.gameSettings;
        console.log('📂 Game progress loaded');
        return true;
      }
    } catch (error) {
      console.error('Failed to load progress:', error);
    }
    return false;
  }

  // Settings management
  updateSettings(newSettings) {
    this.gameSettings = { ...this.gameSettings, ...newSettings };
    this.saveProgress();
  }

  // Game state control
  pause() {
    this.isPaused = true;
  }

  resume() {
    this.isPaused = false;
  }

  // Utility methods
  resetProgress() {
    this.currentChapter = 1;
    this.playerProgress = {
      completedChapters: [],
      currentLocation: 'start',
      inventory: [],
      health: 100,
      faith: 50,
    };
    localStorage.removeItem('gospel-game-progress');
    console.log('🔄 Game progress reset');
  }

  getProgressPercentage() {
    const totalChapters = 14; // Based on the story structure
    return Math.round((this.playerProgress.completedChapters.length / totalChapters) * 100);
  }
}

// Singleton instance
export const gameState = new GameState();
