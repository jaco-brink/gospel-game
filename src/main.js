// Main entry point for the Gospel Game
import './styles/main.css';
import { gameState } from './core/GameState.js';

// This was a deliberate linting error - now fixed
// const badVariable = 'this should fail';;

class GameLoader {
  constructor() {
    this.loadingScreen = document.getElementById('loading-screen');
    this.gameContainer = document.getElementById('game-container');
    this.isLoaded = false;
  }

  async init() {
    console.log("🎮 Gospel Game - The Pilgrim's Progress");
    console.log('🚀 Initializing game...');

    try {
      // Simulate loading time for assets
      await this.simulateLoading();

      // Initialize game components
      await this.initializeGame();

      // Hide loading screen and show game
      this.showGame();

      console.log('✅ Game initialized successfully!');
    } catch (error) {
      console.error('❌ Failed to initialize game:', error);
      this.showError('Failed to load game. Please refresh the page.');
    }
  }

  async simulateLoading() {
    // Simulate loading time (remove this in production)
    return new Promise(resolve => {
      setTimeout(resolve, 2000);
    });
  }

  async initializeGame() {
    // Initialize game systems
    console.log('🎯 Initializing game systems...');

    // Load saved progress
    const hasProgress = gameState.loadProgress();
    if (hasProgress) {
      console.log(`📂 Loaded progress: Chapter ${gameState.getCurrentChapter()}`);
    }

    // TODO: Initialize additional systems
    // - Audio system
    // - Input handling
    // - Rendering system

    console.log('🎯 Game systems initialized');
  }

  showGame() {
    this.loadingScreen.style.display = 'none';
    this.gameContainer.style.display = 'block';
    this.isLoaded = true;

    // Add a simple test interface for development
    this.createTestInterface();
  }

  createTestInterface() {
    const gameContainer = document.getElementById('game-container');
    gameContainer.innerHTML = `
      <div style="padding: 20px; color: white; font-family: Arial, sans-serif;">
        <h1>🎮 Gospel Game - Development Mode</h1>
        <p>Welcome to the Gospel Game! This is the development interface.</p>
        
        <div style="margin: 20px 0;">
          <h3>Game State:</h3>
          <p>Current Chapter: ${gameState.getCurrentChapter()}</p>
          <p>Progress: ${gameState.getProgressPercentage()}%</p>
          <p>Completed Chapters: ${gameState.playerProgress.completedChapters.length}</p>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Development Tools:</h3>
          <button onclick="window.runHelperTests()" style="margin: 5px; padding: 10px; background: #4ecdc4; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Run Helper Tests
          </button>
          <button onclick="gameState.completeChapter(${gameState.getCurrentChapter()})" style="margin: 5px; padding: 10px; background: #45b7d1; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Complete Current Chapter
          </button>
          <button onclick="gameState.setCurrentChapter(${gameState.getCurrentChapter() + 1})" style="margin: 5px; padding: 10px; background: #96ceb4; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Next Chapter
          </button>
          <button onclick="gameState.resetProgress()" style="margin: 5px; padding: 10px; background: #ff6b6b; border: none; border-radius: 5px; color: white; cursor: pointer;">
            Reset Progress
          </button>
        </div>
        
        <div style="margin: 20px 0;">
          <h3>Console Output:</h3>
          <div id="console-output" style="background: #1a1a1a; padding: 10px; border-radius: 5px; font-family: monospace; font-size: 12px; max-height: 200px; overflow-y: auto;">
            Check the browser console for detailed output...
          </div>
        </div>
      </div>
    `;

    // Make gameState available globally for testing
    window.gameState = gameState;
  }

  showError(message) {
    const loadingContent = this.loadingScreen.querySelector('.loading-content');
    loadingContent.innerHTML = `
      <h1>Gospel Game</h1>
      <p style="color: #ff6b6b;">${message}</p>
      <button onclick="location.reload()" style="margin-top: 20px; padding: 10px 20px; background: #4ecdc4; border: none; border-radius: 5px; color: white; cursor: pointer;">
        Try Again
      </button>
    `;
  }
}

// Initialize game when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  const game = new GameLoader();
  game.init();
});

// Handle window errors
window.addEventListener('error', event => {
  console.error('Global error:', event.error);
});

// Handle unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  console.error('Unhandled promise rejection:', event.reason);
});
