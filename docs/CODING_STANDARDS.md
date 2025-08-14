# Coding Standards - Gospel Game

## Overview

This document establishes coding standards and best practices for the Gospel Game project. All developers must follow these standards to maintain code quality, consistency, and readability.

## Table of Contents

1. [General Principles](#general-principles)
2. [JavaScript/TypeScript Standards](#javascripttypescript-standards)
3. [File Organization](#file-organization)
4. [Naming Conventions](#naming-conventions)
5. [Documentation Standards](#documentation-standards)
6. [Testing Standards](#testing-standards)
7. [Performance Guidelines](#performance-guidelines)
8. [Accessibility Standards](#accessibility-standards)
9. [Security Guidelines](#security-guidelines)

## General Principles

### Code Quality

- **Readability**: Code should be self-documenting and easy to understand
- **Maintainability**: Code should be modular and well-structured
- **Consistency**: Follow established patterns and conventions
- **Simplicity**: Prefer simple solutions over complex ones
- **Educational Value**: Code should be educational for young developers

### Performance Targets

- **60fps**: Maintain smooth gameplay performance
- **< 3s**: Initial load time under 3 seconds
- **< 1s**: Chapter transitions under 1 second
- **< 100ms**: User interaction response time

## JavaScript/TypeScript Standards

### TypeScript Usage

- Use TypeScript for all new code
- Maintain strict type checking
- Avoid `any` type - use proper type definitions
- Use interfaces for object shapes
- Use enums for constants

### Code Style

```typescript
// ✅ Good
interface PlayerState {
  health: number;
  position: Vector2D;
  inventory: string[];
}

const playerState: PlayerState = {
  health: 100,
  position: { x: 0, y: 0 },
  inventory: [],
};

// ❌ Bad
const playerState = {
  health: 100,
  position: { x: 0, y: 0 },
  inventory: [],
};
```

### Function Standards

```typescript
// ✅ Good - Clear function name, typed parameters, return type
function calculateDistance(point1: Vector2D, point2: Vector2D): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

// ❌ Bad - Unclear name, no types
function calc(p1, p2) {
  return Math.sqrt((p2.x - p1.x) ** 2 + (p2.y - p1.y) ** 2);
}
```

### Error Handling

```typescript
// ✅ Good - Proper error handling
async function loadGameData(): Promise<GameData> {
  try {
    const response = await fetch('/api/game-data');
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Failed to load game data:', error);
    throw new Error('Unable to load game data');
  }
}

// ❌ Bad - No error handling
async function loadGameData() {
  const response = await fetch('/api/game-data');
  return response.json();
}
```

## File Organization

### Directory Structure

```
src/
├── core/           # Core game systems
├── game/           # Game-specific logic
├── ui/             # User interface components
├── utils/          # Utility functions
├── assets/         # Game assets
├── types/          # TypeScript type definitions
├── test/           # Test utilities and setup
└── styles/         # CSS stylesheets
```

### File Naming

- **Components**: `PascalCase.tsx` (e.g., `GameMenu.tsx`)
- **Utilities**: `camelCase.ts` (e.g., `gameHelpers.ts`)
- **Types**: `camelCase.ts` (e.g., `gameTypes.ts`)
- **Tests**: `camelCase.test.ts` (e.g., `gameHelpers.test.ts`)
- **Styles**: `camelCase.css` (e.g., `gameMenu.css`)

### Import Organization

```typescript
// 1. External libraries
import React from 'react';
import { useState, useEffect } from 'react';

// 2. Internal modules (absolute imports)
import { GameState } from '@/core/GameState';
import { Vector2D } from '@/types/game';

// 3. Relative imports
import './GameMenu.css';
```

## Naming Conventions

### Variables and Functions

```typescript
// ✅ Good
const playerHealth = 100;
const isGamePaused = false;
const completedChapters = [1, 2, 3];

function calculatePlayerScore(): number {}
function isChapterCompleted(chapterId: number): boolean {}
function handlePlayerDeath(): void {}

// ❌ Bad
const ph = 100;
const gp = false;
const cc = [1, 2, 3];

function calc(): number {}
function check(): boolean {}
function handle(): void {}
```

### Constants

```typescript
// ✅ Good
const GAME_CONFIG = {
  fps: 60,
  resolution: { width: 1920, height: 1080 },
};

const CHAPTER_NAMES = {
  1: 'The Burden',
  2: 'The Wicket Gate',
} as const;

// ❌ Bad
const config = { fps: 60 };
const names = { 1: 'The Burden' };
```

### Classes and Interfaces

```typescript
// ✅ Good
interface PlayerProgress {
  completedChapters: number[];
  currentLocation: string;
}

class GameManager {
  private gameState: GameState;

  public startGame(): void {}
  private updateGameLoop(): void {}
}

// ❌ Bad
interface player {
  chapters: number[];
  location: string;
}

class game {
  private state: any;

  public start(): void {}
  private update(): void {}
}
```

## Documentation Standards

### JSDoc Comments

````typescript
/**
 * Calculates the distance between two points in 2D space.
 *
 * @param point1 - The first point with x and y coordinates
 * @param point2 - The second point with x and y coordinates
 * @returns The Euclidean distance between the two points
 *
 * @example
 * ```typescript
 * const distance = calculateDistance(
 *   { x: 0, y: 0 },
 *   { x: 3, y: 4 }
 * );
 * console.log(distance); // 5
 * ```
 */
function calculateDistance(point1: Vector2D, point2: Vector2D): number {
  const dx = point2.x - point1.x;
  const dy = point2.y - point1.y;
  return Math.sqrt(dx * dx + dy * dy);
}
````

### Inline Comments

```typescript
// ✅ Good - Explain why, not what
// Skip processing if game is paused to maintain performance
if (gameState.isPaused) {
  return;
}

// Calculate collision using AABB (Axis-Aligned Bounding Box)
const isColliding =
  rect1.x < rect2.x + rect2.width &&
  rect1.x + rect1.width > rect2.x &&
  rect1.y < rect2.y + rect2.height &&
  rect1.y + rect1.height > rect2.y;

// ❌ Bad - Obvious comments
const health = 100; // Set health to 100
const name = 'player'; // Set name to player
```

### README Documentation

- Every major component should have a README
- Include usage examples
- Document configuration options
- Provide troubleshooting guides

## Testing Standards

### Test Structure

```typescript
describe('GameState', () => {
  let gameState: GameState;

  beforeEach(() => {
    gameState = new GameState();
  });

  afterEach(() => {
    // Cleanup
  });

  describe('Initialization', () => {
    it('should initialize with default values', () => {
      expect(gameState.currentChapter).toBe(1);
      expect(gameState.playerProgress.health).toBe(100);
    });
  });

  describe('Chapter Management', () => {
    it('should advance to next chapter', () => {
      gameState.setCurrentChapter(2);
      expect(gameState.getCurrentChapter()).toBe(2);
    });
  });
});
```

### Test Coverage Requirements

- **Minimum Coverage**: 70% for all metrics
- **Critical Paths**: 100% coverage for game logic
- **Edge Cases**: Test error conditions and boundary values
- **Integration Tests**: Test component interactions

### Test Naming

```typescript
// ✅ Good - Descriptive test names
it('should save progress to localStorage when completing chapter', () => {
  // Test implementation
});

it('should handle invalid JSON gracefully', () => {
  // Test implementation
});

// ❌ Bad - Unclear test names
it('should work', () => {
  // Test implementation
});

it('test 1', () => {
  // Test implementation
});
```

## Performance Guidelines

### Optimization Principles

- **Measure First**: Profile before optimizing
- **Lazy Loading**: Load assets on demand
- **Caching**: Cache expensive calculations
- **Debouncing**: Limit frequent operations
- **Memory Management**: Clean up resources

### Performance Anti-patterns

```typescript
// ❌ Bad - Expensive operation in render loop
function gameLoop() {
  // This runs 60 times per second!
  const expensiveCalculation = calculateComplexPhysics();
  updateGame(expensiveCalculation);
}

// ✅ Good - Optimized game loop
let lastUpdate = 0;
function gameLoop(currentTime: number) {
  if (currentTime - lastUpdate < 16) return; // 60fps limit

  const expensiveCalculation = calculateComplexPhysics();
  updateGame(expensiveCalculation);
  lastUpdate = currentTime;
}
```

### Asset Loading

```typescript
// ✅ Good - Progressive loading
class AssetLoader {
  private loadedAssets = new Map<string, HTMLImageElement>();

  async preloadCriticalAssets(): Promise<void> {
    const criticalAssets = ['player.png', 'background.jpg'];

    await Promise.all(criticalAssets.map(asset => this.loadAsset(asset)));
  }

  async loadAsset(path: string): Promise<HTMLImageElement> {
    if (this.loadedAssets.has(path)) {
      return this.loadedAssets.get(path)!;
    }

    const img = new Image();
    await new Promise((resolve, reject) => {
      img.onload = resolve;
      img.onerror = reject;
      img.src = path;
    });

    this.loadedAssets.set(path, img);
    return img;
  }
}
```

## Accessibility Standards

### Keyboard Navigation

```typescript
// ✅ Good - Keyboard accessible
function GameMenu() {
  const handleKeyDown = (event: KeyboardEvent) => {
    switch (event.key) {
      case 'ArrowUp':
        navigateUp();
        break;
      case 'ArrowDown':
        navigateDown();
        break;
      case 'Enter':
        selectOption();
        break;
      case 'Escape':
        closeMenu();
        break;
    }
  };

  return (
    <div
      role="menu"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      {/* Menu items */}
    </div>
  );
}
```

### Screen Reader Support

```typescript
// ✅ Good - Screen reader friendly
function ProgressBar({ current, total }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);

  return (
    <div
      role="progressbar"
      aria-valuenow={current}
      aria-valuemin={0}
      aria-valuemax={total}
      aria-label={`Progress: ${percentage}%`}
    >
      <div style={{ width: `${percentage}%` }} />
    </div>
  );
}
```

### Color and Contrast

- Minimum contrast ratio: 4.5:1 for normal text
- Minimum contrast ratio: 3:1 for large text
- Don't rely solely on color to convey information
- Support high contrast mode

## Security Guidelines

### Input Validation

```typescript
// ✅ Good - Validate all inputs
function savePlayerName(name: string): void {
  if (typeof name !== 'string') {
    throw new Error('Name must be a string');
  }

  if (name.length < 1 || name.length > 50) {
    throw new Error('Name must be between 1 and 50 characters');
  }

  if (!/^[a-zA-Z0-9\s]+$/.test(name)) {
    throw new Error('Name contains invalid characters');
  }

  localStorage.setItem('playerName', name);
}
```

### Data Sanitization

```typescript
// ✅ Good - Sanitize user data
function sanitizeUserInput(input: string): string {
  return input
    .replace(/[<>]/g, '') // Remove potential HTML tags
    .trim()
    .substring(0, 100); // Limit length
}
```

### Secure Storage

```typescript
// ✅ Good - Secure data handling
class SecureStorage {
  private static readonly ENCRYPTION_KEY = 'game-secret-key';

  static saveProgress(data: GameProgress): void {
    const encrypted = this.encrypt(JSON.stringify(data));
    localStorage.setItem('game-progress', encrypted);
  }

  static loadProgress(): GameProgress | null {
    const encrypted = localStorage.getItem('game-progress');
    if (!encrypted) return null;

    try {
      const decrypted = this.decrypt(encrypted);
      return JSON.parse(decrypted);
    } catch (error) {
      console.error('Failed to load progress:', error);
      return null;
    }
  }

  private static encrypt(data: string): string {
    // Implement encryption (simplified for example)
    return btoa(data);
  }

  private static decrypt(data: string): string {
    // Implement decryption (simplified for example)
    return atob(data);
  }
}
```

## Code Review Checklist

### Before Submitting Code

- [ ] Code follows naming conventions
- [ ] All functions have proper TypeScript types
- [ ] Error handling is implemented
- [ ] Tests are written and passing
- [ ] Documentation is updated
- [ ] Performance impact is considered
- [ ] Accessibility requirements are met
- [ ] Security considerations are addressed
- [ ] Code is linted and formatted
- [ ] No console.log statements in production code

### Review Process

1. **Self-Review**: Review your own code before submitting
2. **Peer Review**: Have another developer review your code
3. **Automated Checks**: Ensure all CI/CD checks pass
4. **Final Approval**: Get approval from senior developer

## Tools and Automation

### Required Tools

- **ESLint**: Code linting and style enforcement
- **Prettier**: Code formatting
- **TypeScript**: Type checking
- **Jest**: Unit testing
- **Husky**: Pre-commit hooks

### IDE Configuration

```json
// .vscode/settings.json
{
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": true
  },
  "typescript.preferences.importModuleSpecifier": "relative",
  "eslint.validate": ["javascript", "typescript"]
}
```

## Conclusion

Following these coding standards ensures:

- **Consistency**: All code follows the same patterns
- **Quality**: High-quality, maintainable code
- **Collaboration**: Easy for team members to work together
- **Education**: Code serves as learning material
- **Performance**: Optimized for smooth gameplay
- **Accessibility**: Inclusive for all users

Remember: **Code is read much more often than it is written**. Write code for the next developer who will read it.
