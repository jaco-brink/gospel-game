# API Documentation - Gospel Game

## Overview

This document provides comprehensive API documentation for the Gospel Game project, including core systems, utilities, and type definitions.

## Table of Contents

1. [Core Systems](#core-systems)
2. [Game State Management](#game-state-management)
3. [Utility Functions](#utility-functions)
4. [Type Definitions](#type-definitions)
5. [Event System](#event-system)
6. [Asset Management](#asset-management)

## Core Systems

### GameState

The main game state management system that handles player progress, settings, and game state.

#### Constructor

```typescript
new GameState();
```

Creates a new GameState instance with default values.

#### Properties

```typescript
interface GameState {
  currentChapter: number;
  playerProgress: PlayerProgress;
  gameSettings: GameSettings;
  isPaused: boolean;
  isLoading: boolean;
}
```

#### Methods

##### `getCurrentChapter(): number`

Returns the current chapter number.

```typescript
const chapter = gameState.getCurrentChapter();
console.log(chapter); // 1
```

##### `setCurrentChapter(chapter: number): void`

Sets the current chapter and saves progress.

```typescript
gameState.setCurrentChapter(3);
```

##### `completeChapter(chapter: number): void`

Marks a chapter as completed and saves progress.

```typescript
gameState.completeChapter(1);
```

##### `saveProgress(): void`

Saves the current game state to localStorage.

```typescript
gameState.saveProgress();
```

##### `loadProgress(): boolean`

Loads game state from localStorage. Returns `true` if successful, `false` otherwise.

```typescript
const success = gameState.loadProgress();
if (success) {
  console.log('Progress loaded successfully');
}
```

##### `updateSettings(newSettings: Partial<GameSettings>): void`

Updates game settings with new values.

```typescript
gameState.updateSettings({
  audioEnabled: false,
  musicVolume: 0.5,
});
```

##### `pause(): void`

Pauses the game.

```typescript
gameState.pause();
```

##### `resume(): void`

Resumes the game.

```typescript
gameState.resume();
```

##### `resetProgress(): void`

Resets all progress and returns to initial state.

```typescript
gameState.resetProgress();
```

##### `getProgressPercentage(): number`

Returns the percentage of completed chapters (0-100).

```typescript
const progress = gameState.getProgressPercentage();
console.log(`${progress}% complete`);
```

## Game State Management

### PlayerProgress

Represents the player's progress through the game.

```typescript
interface PlayerProgress {
  completedChapters: number[];
  currentLocation: string;
  inventory: string[];
  health: number;
  faith: number;
}
```

### GameSettings

Represents the game's configuration settings.

```typescript
interface GameSettings {
  audioEnabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  accessibilityMode: boolean;
}
```

## Utility Functions

### Math Utilities

#### `random(min: number, max: number): number`

Generates a random integer between min and max (inclusive).

```typescript
import { random } from '@/utils/helpers';

const roll = random(1, 6);
console.log(roll); // Random number between 1 and 6
```

#### `clamp(value: number, min: number, max: number): number`

Clamps a value between min and max.

```typescript
import { clamp } from '@/utils/helpers';

const health = clamp(150, 0, 100);
console.log(health); // 100
```

#### `lerp(start: number, end: number, t: number): number`

Linear interpolation between start and end values.

```typescript
import { lerp } from '@/utils/helpers';

const position = lerp(0, 100, 0.5);
console.log(position); // 50
```

#### `distance(x1: number, y1: number, x2: number, y2: number): number`

Calculates the Euclidean distance between two points.

```typescript
import { distance } from '@/utils/helpers';

const dist = distance(0, 0, 3, 4);
console.log(dist); // 5
```

### Collision Detection

#### `rectCollision(rect1: Rectangle, rect2: Rectangle): boolean`

Checks if two rectangles are colliding.

```typescript
import { rectCollision } from '@/utils/helpers';

const player = { x: 0, y: 0, width: 10, height: 10 };
const obstacle = { x: 5, y: 5, width: 10, height: 10 };

const isColliding = rectCollision(player, obstacle);
console.log(isColliding); // true
```

### Time Utilities

#### `formatTime(seconds: number): string`

Formats seconds into MM:SS format.

```typescript
import { formatTime } from '@/utils/helpers';

const timeString = formatTime(125);
console.log(timeString); // "02:05"
```

### Device Detection

#### `isTouchDevice(): boolean`

Detects if the current device supports touch input.

```typescript
import { isTouchDevice } from '@/utils/helpers';

if (isTouchDevice()) {
  console.log('Touch device detected');
}
```

#### `isMobileDevice(): boolean`

Detects if the current device is a mobile device.

```typescript
import { isMobileDevice } from '@/utils/helpers';

if (isMobileDevice()) {
  console.log('Mobile device detected');
}
```

### Performance Utilities

#### `debounce(func: Function, wait: number): Function`

Creates a debounced version of a function.

```typescript
import { debounce } from '@/utils/helpers';

const debouncedResize = debounce(() => {
  console.log('Window resized');
}, 250);

window.addEventListener('resize', debouncedResize);
```

#### `throttle(func: Function, limit: number): Function`

Creates a throttled version of a function.

```typescript
import { throttle } from '@/utils/helpers';

const throttledScroll = throttle(() => {
  console.log('Scrolling');
}, 100);

window.addEventListener('scroll', throttledScroll);
```

### Asset Loading

#### `preloadImage(src: string): Promise<HTMLImageElement>`

Preloads an image and returns a promise.

```typescript
import { preloadImage } from '@/utils/helpers';

try {
  const image = await preloadImage('/assets/player.png');
  console.log('Image loaded:', image);
} catch (error) {
  console.error('Failed to load image:', error);
}
```

#### `preloadAudio(src: string): Promise<HTMLAudioElement>`

Preloads an audio file and returns a promise.

```typescript
import { preloadAudio } from '@/utils/helpers';

try {
  const audio = await preloadAudio('/assets/music.mp3');
  console.log('Audio loaded:', audio);
} catch (error) {
  console.error('Failed to load audio:', error);
}
```

### Data Utilities

#### `deepClone<T>(obj: T): T`

Creates a deep clone of an object.

```typescript
import { deepClone } from '@/utils/helpers';

const original = { a: 1, b: { c: 2 } };
const cloned = deepClone(original);
console.log(cloned); // { a: 1, b: { c: 2 } }
console.log(cloned === original); // false
```

## Type Definitions

### Vector2D

Represents a 2D vector with x and y coordinates.

```typescript
interface Vector2D {
  x: number;
  y: number;
}
```

### Rectangle

Represents a rectangle with position and dimensions.

```typescript
interface Rectangle {
  x: number;
  y: number;
  width: number;
  height: number;
}
```

### GameConfig

Represents the game's configuration.

```typescript
interface GameConfig {
  fps: number;
  resolution: Vector2D;
  fullscreen: boolean;
  vsync: boolean;
}
```

### Chapter

Represents a game chapter.

```typescript
interface Chapter {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}
```

### GameEvent

Represents a game event.

```typescript
interface GameEvent {
  type: GameEventType;
  data?: unknown;
  timestamp: number;
}
```

### GameEventType

Enumeration of possible game event types.

```typescript
type GameEventType =
  | 'chapter_completed'
  | 'item_collected'
  | 'location_changed'
  | 'settings_updated'
  | 'game_saved'
  | 'game_loaded';
```

## Event System

### EventEmitter

A simple event emitter for game events.

#### Constructor

```typescript
const emitter = createEventEmitter();
```

#### Methods

##### `on(event: string, callback: Function): void`

Registers an event listener.

```typescript
emitter.on('chapter_completed', chapterId => {
  console.log(`Chapter ${chapterId} completed!`);
});
```

##### `off(event: string, callback: Function): void`

Removes an event listener.

```typescript
const handler = chapterId => console.log(`Chapter ${chapterId} completed!`);
emitter.on('chapter_completed', handler);
emitter.off('chapter_completed', handler);
```

##### `emit(event: string, data?: unknown): void`

Emits an event with optional data.

```typescript
emitter.emit('chapter_completed', 1);
```

### Usage Example

```typescript
import { createEventEmitter } from '@/utils/helpers';

// Create event emitter
const gameEvents = createEventEmitter();

// Register event listeners
gameEvents.on('chapter_completed', chapterId => {
  console.log(`Chapter ${chapterId} completed!`);
  updateProgress(chapterId);
});

gameEvents.on('item_collected', item => {
  console.log(`Collected: ${item.name}`);
  addToInventory(item);
});

// Emit events
gameEvents.emit('chapter_completed', 1);
gameEvents.emit('item_collected', { name: 'Key', id: 'key_001' });
```

## Asset Management

### Asset Types

The game supports various asset types:

- **Images**: PNG, JPG, WebP
- **Audio**: MP3, WAV, OGG
- **Fonts**: TTF, WOFF, WOFF2
- **Data**: JSON, CSV

### Asset Loading Strategy

1. **Critical Assets**: Loaded immediately on game start
2. **Chapter Assets**: Loaded when entering a chapter
3. **Optional Assets**: Loaded on demand

### Asset Paths

Assets are organized by type:

```
src/assets/
├── images/
│   ├── characters/
│   ├── backgrounds/
│   └── ui/
├── audio/
│   ├── music/
│   └── sfx/
└── fonts/
```

### Usage Examples

```typescript
// Load critical assets
const criticalAssets = [
  '/assets/images/player.png',
  '/assets/audio/music/theme.mp3',
  '/assets/fonts/main.woff2',
];

// Load chapter-specific assets
const chapterAssets = [
  '/assets/images/chapters/chapter1/background.jpg',
  '/assets/audio/sfx/chapter1/ambient.mp3',
];

// Preload assets
for (const asset of criticalAssets) {
  if (asset.endsWith('.png') || asset.endsWith('.jpg')) {
    await preloadImage(asset);
  } else if (asset.endsWith('.mp3') || asset.endsWith('.wav')) {
    await preloadAudio(asset);
  }
}
```

## Error Handling

### Common Error Types

```typescript
class GameError extends Error {
  constructor(
    message: string,
    public code: string,
  ) {
    super(message);
    this.name = 'GameError';
  }
}

class AssetLoadError extends GameError {
  constructor(assetPath: string) {
    super(`Failed to load asset: ${assetPath}`, 'ASSET_LOAD_ERROR');
  }
}

class SaveError extends GameError {
  constructor() {
    super('Failed to save game progress', 'SAVE_ERROR');
  }
}
```

### Error Handling Examples

```typescript
// Asset loading with error handling
try {
  const image = await preloadImage('/assets/player.png');
} catch (error) {
  if (error instanceof AssetLoadError) {
    console.error('Asset failed to load:', error.message);
    // Use fallback asset
    const fallbackImage = await preloadImage('/assets/fallback.png');
  }
}

// Save progress with error handling
try {
  gameState.saveProgress();
} catch (error) {
  if (error instanceof SaveError) {
    console.error('Failed to save progress:', error.message);
    // Show user notification
    showNotification('Failed to save progress. Please try again.');
  }
}
```

## Performance Guidelines

### Best Practices

1. **Use Object Pooling**: Reuse objects instead of creating new ones
2. **Batch Operations**: Group similar operations together
3. **Lazy Loading**: Load assets only when needed
4. **Caching**: Cache expensive calculations
5. **Debouncing/Throttling**: Limit frequent operations

### Performance Monitoring

```typescript
// Monitor frame rate
let frameCount = 0;
let lastTime = performance.now();

function monitorPerformance() {
  frameCount++;
  const currentTime = performance.now();

  if (currentTime - lastTime >= 1000) {
    const fps = Math.round((frameCount * 1000) / (currentTime - lastTime));
    console.log(`FPS: ${fps}`);
    frameCount = 0;
    lastTime = currentTime;
  }

  requestAnimationFrame(monitorPerformance);
}

monitorPerformance();
```

## Browser Compatibility

### Supported Browsers

- **Chrome**: 90+
- **Firefox**: 88+
- **Safari**: 14+
- **Edge**: 90+

### Feature Detection

```typescript
// Check for required features
function checkBrowserSupport(): boolean {
  const requiredFeatures = [
    'localStorage' in window,
    'requestAnimationFrame' in window,
    'Promise' in window,
    'fetch' in window,
  ];

  return requiredFeatures.every(supported => supported);
}

// Provide fallbacks for unsupported features
if (!checkBrowserSupport()) {
  console.warn('Browser may not support all features');
  // Implement fallbacks
}
```

## Conclusion

This API documentation provides a comprehensive reference for all major systems and utilities in the Gospel Game project. For more detailed examples and usage patterns, refer to the source code and test files.

Remember to:

- Follow the coding standards when using these APIs
- Write tests for any new functionality
- Update this documentation when adding new features
- Consider performance implications when using these APIs
