// Jest setup file for the Gospel Game

// Mock browser APIs that might not be available in jsdom
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

Object.defineProperty(window, 'sessionStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock console methods to reduce noise in tests
const originalConsole = { ...console };
beforeAll(() => {
  jest.spyOn(console, 'log').mockImplementation(() => {});
  jest.spyOn(console, 'warn').mockImplementation(() => {});
  jest.spyOn(console, 'error').mockImplementation(() => {});
});

afterAll(() => {
  console.log = originalConsole.log;
  console.warn = originalConsole.warn;
  console.error = originalConsole.error;
});

// Mock requestAnimationFrame
Object.defineProperty(window, 'requestAnimationFrame', {
  value: (callback: FrameRequestCallback) => setTimeout(callback, 16),
  writable: true,
});

Object.defineProperty(window, 'cancelAnimationFrame', {
  value: (id: number) => clearTimeout(id),
  writable: true,
});

// Mock performance API
Object.defineProperty(window, 'performance', {
  value: {
    now: () => Date.now(),
  },
  writable: true,
});

// Global test utilities
global.testUtils = {
  // Helper to create a mock game state
  createMockGameState: () => ({
    currentChapter: 1,
    playerProgress: {
      completedChapters: [],
      currentLocation: 'start',
      inventory: [],
      health: 100,
      faith: 50,
    },
    gameSettings: {
      audioEnabled: true,
      musicVolume: 0.7,
      sfxVolume: 0.8,
      accessibilityMode: false,
    },
    isPaused: false,
    isLoading: false,
  }),

  // Helper to wait for async operations
  waitFor: (): Promise<void> => new Promise(resolve => setTimeout(resolve, 100)),

  // Helper to create mock events
  createMockEvent: (): unknown => ({
    type: 'test',
    data: {},
    timestamp: Date.now(),
  }),
};

// Extend global types for test utilities
declare global {
  var testUtils: {
    createMockGameState: () => unknown;
    waitFor: () => Promise<void>;
    createMockEvent: () => unknown;
  };
}
