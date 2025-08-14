// Global type declarations for tests
declare global {
  var testUtils: {
    createMockGameState: () => unknown;
    waitFor: () => Promise<void>;
    createMockEvent: () => unknown;
  };
}

export {};
