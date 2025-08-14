# Troubleshooting Guide - Gospel Game

## Overview

This guide helps developers resolve common issues encountered during development of the Gospel Game project.

## Table of Contents

1. [Development Environment Issues](#development-environment-issues)
2. [Build and Compilation Issues](#build-and-compilation-issues)
3. [Testing Issues](#testing-issues)
4. [Linting and Formatting Issues](#linting-and-formatting-issues)
5. [TypeScript Issues](#typescript-issues)
6. [Performance Issues](#performance-issues)
7. [Browser Compatibility Issues](#browser-compatibility-issues)
8. [Common Error Messages](#common-error-messages)

## Development Environment Issues

### Server Won't Start

**Problem**: `npm run dev` fails to start the development server.

**Solutions**:

```bash
# Check if port 3456 is already in use
lsof -i :3456

# Kill process using the port
kill -9 <PID>

# Or use a different port
npm run dev -- --port 3457
```

**Common Causes**:

- Port already in use by another application
- Insufficient permissions
- Node.js version incompatibility

### Dependencies Installation Issues

**Problem**: `npm install` fails or shows errors.

**Solutions**:

```bash
# Clear npm cache
npm cache clean --force

# Delete node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Use yarn instead
yarn install

# Check Node.js version
node --version  # Should be >= 18.0.0
```

### Git Issues

**Problem**: Pre-commit hooks fail or Git operations are slow.

**Solutions**:

```bash
# Skip pre-commit hooks (emergency only)
git commit --no-verify -m "emergency fix"

# Reset Husky
npx husky install

# Check Git configuration
git config --list
```

## Build and Compilation Issues

### Vite Build Errors

**Problem**: `npm run build` fails with compilation errors.

**Solutions**:

```bash
# Check for TypeScript errors first
npm run type-check

# Fix linting issues
npm run lint:fix

# Clear build cache
rm -rf dist
npm run build

# Check for missing dependencies
npm ls
```

### Module Resolution Issues

**Problem**: Import statements fail with "Cannot resolve module" errors.

**Solutions**:

```typescript
// Check import paths
import { GameState } from '@/core/GameState';  // ✅ Correct
import { GameState } from '../core/GameState'; // ✅ Also correct
import { GameState } from './GameState';       // ❌ Wrong path

// Verify file exists
ls src/core/GameState.ts

// Check tsconfig.json paths
{
  "compilerOptions": {
    "paths": {
      "@/*": ["src/*"]
    }
  }
}
```

## Testing Issues

### Jest Tests Fail

**Problem**: `npm test` fails with various errors.

**Solutions**:

```bash
# Run tests with verbose output
npm test -- --verbose

# Run specific test file
npm test -- src/utils/helpers.test.ts

# Run tests in watch mode for debugging
npm run test:watch

# Check test coverage
npm run test:coverage
```

### Test Environment Issues

**Problem**: Tests fail due to missing browser APIs.

**Solutions**:

```typescript
// Add to test setup file
Object.defineProperty(window, 'localStorage', {
  value: {
    getItem: jest.fn(),
    setItem: jest.fn(),
    removeItem: jest.fn(),
    clear: jest.fn(),
  },
  writable: true,
});

// Mock other browser APIs as needed
global.Image = jest.fn(() => ({
  onload: jest.fn(),
  onerror: jest.fn(),
  src: '',
}));
```

### Coverage Issues

**Problem**: Test coverage is below 70% threshold.

**Solutions**:

```bash
# Generate coverage report
npm run test:coverage

# Check which files need more tests
open coverage/lcov-report/index.html

# Add tests for uncovered functions
# Focus on critical game logic first
```

## Linting and Formatting Issues

### ESLint Errors

**Problem**: ESLint reports many errors or warnings.

**Solutions**:

```bash
# Auto-fix ESLint issues
npm run lint:fix

# Check specific file
npx eslint src/main.js

# Ignore specific rules (use sparingly)
/* eslint-disable no-console */
console.log('debug info');
/* eslint-enable no-console */
```

### Prettier Issues

**Problem**: Code formatting is inconsistent.

**Solutions**:

```bash
# Format all files
npm run format

# Format specific file
npx prettier --write src/main.js

# Check formatting without changing
npx prettier --check src/
```

### Pre-commit Hook Failures

**Problem**: Git commits fail due to linting/formatting issues.

**Solutions**:

```bash
# Fix issues before committing
npm run lint:fix
npm run format
git add .
git commit -m "fix: resolve linting issues"

# Skip hooks (emergency only)
git commit --no-verify -m "emergency fix"
```

## TypeScript Issues

### Type Errors

**Problem**: TypeScript compilation fails with type errors.

**Solutions**:

```typescript
// Check types
npm run type-check

// Fix common type issues
interface PlayerState {
  health: number;
  position: Vector2D;
}

// Use proper typing
const player: PlayerState = {
  health: 100,
  position: { x: 0, y: 0 },
};

// Avoid 'any' type
// ❌ Bad
const data: any = getData();

// ✅ Good
interface GameData {
  score: number;
  level: number;
}
const data: GameData = getData();
```

### Module Declaration Issues

**Problem**: TypeScript can't find module declarations.

**Solutions**:

```typescript
// Create type declarations for external modules
// src/types/global.d.ts
declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
```

## Performance Issues

### Slow Game Performance

**Problem**: Game runs below 60fps or feels sluggish.

**Solutions**:

```typescript
// Optimize game loop
let lastUpdate = 0;
function gameLoop(currentTime: number) {
  // Limit to 60fps
  if (currentTime - lastUpdate < 16) return;

  updateGame();
  renderGame();
  lastUpdate = currentTime;

  requestAnimationFrame(gameLoop);
}

// Use object pooling for frequently created objects
class ObjectPool<T> {
  private pool: T[] = [];

  get(): T {
    return this.pool.pop() || this.create();
  }

  release(obj: T): void {
    this.pool.push(obj);
  }
}
```

### Memory Leaks

**Problem**: Memory usage increases over time.

**Solutions**:

```typescript
// Clean up event listeners
class GameComponent {
  private listeners: Array<() => void> = [];

  addEventListener(element: HTMLElement, event: string, handler: EventListener) {
    element.addEventListener(event, handler);
    this.listeners.push(() => element.removeEventListener(event, handler));
  }

  destroy() {
    this.listeners.forEach(cleanup => cleanup());
    this.listeners = [];
  }
}

// Clear intervals and timeouts
class GameManager {
  private intervals: number[] = [];

  setInterval(callback: () => void, delay: number): number {
    const id = setInterval(callback, delay);
    this.intervals.push(id);
    return id;
  }

  cleanup() {
    this.intervals.forEach(clearInterval);
    this.intervals = [];
  }
}
```

## Browser Compatibility Issues

### Feature Detection

**Problem**: Game doesn't work in older browsers.

**Solutions**:

```typescript
// Check for required features
function checkBrowserSupport(): boolean {
  const requiredFeatures = [
    'localStorage' in window,
    'requestAnimationFrame' in window,
    'Promise' in window,
  ];

  return requiredFeatures.every(supported => supported);
}

// Provide fallbacks
if (!('localStorage' in window)) {
  // Use alternative storage
  window.localStorage = {
    getItem: () => null,
    setItem: () => {},
    removeItem: () => {},
    clear: () => {},
  };
}
```

### CSS Compatibility

**Problem**: Styles don't work in older browsers.

**Solutions**:

```css
/* Use fallbacks for modern CSS */
.game-container {
  display: flex; /* Modern browsers */
  display: -webkit-flex; /* Safari */
  display: -ms-flexbox; /* IE10 */
}

/* Use feature queries */
@supports (display: grid) {
  .game-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
  }
}

@supports not (display: grid) {
  .game-grid {
    display: flex;
    flex-wrap: wrap;
  }
}
```

## Common Error Messages

### "Cannot find module"

**Solution**: Check import paths and file existence

```bash
# Verify file exists
ls src/core/GameState.ts

# Check import statement
import { GameState } from '@/core/GameState';
```

### "Property does not exist on type"

**Solution**: Add proper type definitions

```typescript
// Add missing properties to interface
interface GameState {
  currentChapter: number;
  playerProgress: PlayerProgress;
  // Add missing property
  gameSettings: GameSettings;
}
```

### "Expected 2 arguments but got 1"

**Solution**: Check function signatures

```typescript
// Check function definition
function calculateDistance(point1: Vector2D, point2: Vector2D): number {
  // Implementation
}

// Ensure all required arguments are provided
const distance = calculateDistance(point1, point2);
```

### "Cannot assign to read-only property"

**Solution**: Use proper mutation methods

```typescript
// ❌ Bad - direct assignment
const config = { fps: 60 };
config.fps = 30; // Error if config is readonly

// ✅ Good - create new object
const newConfig = { ...config, fps: 30 };
```

## Getting Help

### Before Asking for Help

1. **Check this guide** for common solutions
2. **Search existing issues** on GitHub
3. **Run diagnostic commands**:
   ```bash
   npm run type-check
   npm run lint
   npm test
   npm run build
   ```
4. **Check browser console** for errors
5. **Verify your environment**:
   ```bash
   node --version
   npm --version
   git --version
   ```

### When Creating Issues

Include the following information:

- **Error message** (exact text)
- **Steps to reproduce**
- **Expected vs actual behavior**
- **Environment details** (OS, Node.js version, browser)
- **Relevant code snippets**
- **Screenshots** (if UI-related)

### Useful Commands

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build

# Testing
npm test             # Run all tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Run tests with coverage

# Code Quality
npm run lint         # Check for linting issues
npm run lint:fix     # Fix linting issues
npm run format       # Format code
npm run type-check   # Check TypeScript types

# Git
git status           # Check repository status
git log --oneline    # View recent commits
git diff             # View changes
```

## Conclusion

Most issues can be resolved by:

1. **Reading error messages carefully**
2. **Checking the documentation**
3. **Running diagnostic commands**
4. **Searching for similar issues**
5. **Asking for help with proper context**

Remember: **Every problem has a solution**. Take your time to understand the issue before implementing fixes.
