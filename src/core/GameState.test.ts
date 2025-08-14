import { GameState } from './GameState';

describe('GameState', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState();
    // Clear localStorage before each test
    localStorage.clear();
  });

  afterEach(() => {
    localStorage.clear();
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(gameState.currentChapter).toBe(1);
      expect(gameState.playerProgress.completedChapters).toEqual([]);
      expect(gameState.playerProgress.currentLocation).toBe('start');
      expect(gameState.playerProgress.inventory).toEqual([]);
      expect(gameState.playerProgress.health).toBe(100);
      expect(gameState.playerProgress.faith).toBe(50);
      expect(gameState.gameSettings.audioEnabled).toBe(true);
      expect(gameState.gameSettings.musicVolume).toBe(0.7);
      expect(gameState.gameSettings.sfxVolume).toBe(0.8);
      expect(gameState.gameSettings.accessibilityMode).toBe(false);
      expect(gameState.isPaused).toBe(false);
      expect(gameState.isLoading).toBe(false);
    });
  });

  describe('Chapter Management', () => {
    it('should get current chapter', () => {
      expect(gameState.getCurrentChapter()).toBe(1);
    });

    it('should set current chapter', () => {
      gameState.setCurrentChapter(3);
      expect(gameState.currentChapter).toBe(3);
    });

    it('should save progress when setting chapter', () => {
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      gameState.setCurrentChapter(2);
      expect(setItemSpy).toHaveBeenCalled();
    });
  });

  describe('Progress Tracking', () => {
    it('should complete chapter', () => {
      gameState.completeChapter(1);
      expect(gameState.playerProgress.completedChapters).toContain(1);
    });

    it('should not duplicate completed chapters', () => {
      gameState.completeChapter(1);
      gameState.completeChapter(1);
      expect(gameState.playerProgress.completedChapters).toEqual([1]);
    });

    it('should save progress when completing chapter', () => {
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      gameState.completeChapter(1);
      expect(setItemSpy).toHaveBeenCalled();
    });
  });

  describe('Save/Load Functionality', () => {
    it('should save progress to localStorage', () => {
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      gameState.saveProgress();
      expect(setItemSpy).toHaveBeenCalledWith('gospel-game-progress', expect.any(String));
    });

    it('should load progress from localStorage', () => {
      const mockData = {
        currentChapter: 5,
        playerProgress: {
          completedChapters: [1, 2, 3],
          currentLocation: 'test-location',
          inventory: ['item1', 'item2'],
          health: 75,
          faith: 80,
        },
        gameSettings: {
          audioEnabled: false,
          musicVolume: 0.5,
          sfxVolume: 0.3,
          accessibilityMode: true,
        },
      };

      localStorage.setItem('gospel-game-progress', JSON.stringify(mockData));
      const result = gameState.loadProgress();

      expect(result).toBe(true);
      expect(gameState.currentChapter).toBe(5);
      expect(gameState.playerProgress.completedChapters).toEqual([1, 2, 3]);
      expect(gameState.playerProgress.currentLocation).toBe('test-location');
      expect(gameState.gameSettings.audioEnabled).toBe(false);
    });

    it('should return false when no saved progress exists', () => {
      const result = gameState.loadProgress();
      expect(result).toBe(false);
    });

    it('should handle invalid JSON in localStorage', () => {
      localStorage.setItem('gospel-game-progress', 'invalid-json');
      const result = gameState.loadProgress();
      expect(result).toBe(false);
    });

    it('should handle localStorage errors gracefully', () => {
      // Mock localStorage to throw an error
      const originalSetItem = localStorage.setItem;
      localStorage.setItem = jest.fn().mockImplementation(() => {
        throw new Error('Storage quota exceeded');
      });

      expect(() => gameState.saveProgress()).not.toThrow();

      localStorage.setItem = originalSetItem;
    });
  });

  describe('Settings Management', () => {
    it('should update settings', () => {
      const newSettings = {
        audioEnabled: false,
        musicVolume: 0.3,
      };

      gameState.updateSettings(newSettings);

      expect(gameState.gameSettings.audioEnabled).toBe(false);
      expect(gameState.gameSettings.musicVolume).toBe(0.3);
      expect(gameState.gameSettings.sfxVolume).toBe(0.8); // Should remain unchanged
    });

    it('should save progress when updating settings', () => {
      const setItemSpy = jest.spyOn(localStorage, 'setItem');
      gameState.updateSettings({ audioEnabled: false });
      expect(setItemSpy).toHaveBeenCalled();
    });
  });

  describe('Game State Control', () => {
    it('should pause game', () => {
      gameState.pause();
      expect(gameState.isPaused).toBe(true);
    });

    it('should resume game', () => {
      gameState.pause();
      gameState.resume();
      expect(gameState.isPaused).toBe(false);
    });
  });

  describe('Utility Methods', () => {
    it('should reset progress', () => {
      // Set some progress first
      gameState.setCurrentChapter(5);
      gameState.completeChapter(1);
      gameState.completeChapter(2);

      gameState.resetProgress();

      expect(gameState.currentChapter).toBe(1);
      expect(gameState.playerProgress.completedChapters).toEqual([]);
      expect(gameState.playerProgress.currentLocation).toBe('start');
      expect(gameState.playerProgress.inventory).toEqual([]);
      expect(gameState.playerProgress.health).toBe(100);
      expect(gameState.playerProgress.faith).toBe(50);
    });

    it('should remove saved progress when resetting', () => {
      const removeItemSpy = jest.spyOn(localStorage, 'removeItem');
      gameState.resetProgress();
      expect(removeItemSpy).toHaveBeenCalledWith('gospel-game-progress');
    });

    it('should calculate progress percentage', () => {
      // No chapters completed
      expect(gameState.getProgressPercentage()).toBe(0);

      // Complete some chapters
      gameState.completeChapter(1);
      gameState.completeChapter(2);
      gameState.completeChapter(3);

      // 3 out of 14 chapters = ~21%
      expect(gameState.getProgressPercentage()).toBe(21);

      // Complete all chapters
      for (let i = 4; i <= 14; i++) {
        gameState.completeChapter(i);
      }

      expect(gameState.getProgressPercentage()).toBe(100);
    });
  });

  describe('Edge Cases', () => {
    it('should handle missing properties in saved data', () => {
      const incompleteData = {
        currentChapter: 3,
        // Missing playerProgress and gameSettings
      };

      localStorage.setItem('gospel-game-progress', JSON.stringify(incompleteData));
      const result = gameState.loadProgress();

      expect(result).toBe(true);
      expect(gameState.currentChapter).toBe(3);
      // Should use default values for missing properties
      expect(gameState.playerProgress.completedChapters).toEqual([]);
      expect(gameState.gameSettings.audioEnabled).toBe(true);
    });

    it('should handle null values in saved data', () => {
      const dataWithNulls = {
        currentChapter: null,
        playerProgress: null,
        gameSettings: null,
      };

      localStorage.setItem('gospel-game-progress', JSON.stringify(dataWithNulls));
      const result = gameState.loadProgress();

      expect(result).toBe(true);
      // Should use default values when data is null
      expect(gameState.currentChapter).toBe(1);
      expect(gameState.playerProgress.completedChapters).toEqual([]);
    });
  });
});
