# Development Guide

## Quick Start

1. **Start the development server:**

   ```bash
   npm run dev
   ```

2. **Open your browser:**
   Navigate to `http://localhost:3456`

3. **Check the console:**
   Open browser developer tools to see initialization logs

## Current Features

### ✅ Completed (TASK-000)

- **Development Environment**: Vite dev server on port 3456
- **Project Structure**: Organized source code directories
- **Basic Game Framework**: Loading screen and game container
- **Game State Management**: Save/load progress system
- **Utility Functions**: Helper functions for game development
- **Development Interface**: Test interface for development tools

### 🚧 In Progress

- **TASK-001**: Linting and Code Quality Tools
- **TASK-002**: TypeScript Setup
- **TASK-003**: Testing Framework Setup

## Development Interface

The current development interface includes:

- **Game State Display**: Shows current chapter and progress
- **Test Buttons**:
  - Run Helper Tests: Tests utility functions
  - Complete Current Chapter: Marks chapter as complete
  - Next Chapter: Advances to next chapter
  - Reset Progress: Clears all saved progress

## File Structure

```
src/
├── main.js              # Main entry point
├── styles/
│   └── main.css         # Main stylesheet
├── core/
│   └── GameState.js     # Game state management
├── utils/
│   ├── helpers.js       # Utility functions
│   └── helpers.test.js  # Basic tests (placeholder)
├── game/                # Game-specific logic (empty)
├── ui/                  # UI components (empty)
└── assets/              # Game assets (empty)
```

## Next Steps

1. **TASK-001**: Set up ESLint and Prettier
2. **TASK-002**: Configure TypeScript
3. **TASK-003**: Set up Jest testing framework
4. **TASK-004**: Establish coding standards
5. **TASK-005**: Set up CI/CD pipeline

## Testing

Currently, basic tests are included in `src/utils/helpers.test.js`. These will be replaced with proper Jest tests in TASK-003.

To run the current tests:

1. Open the development interface
2. Click "Run Helper Tests"
3. Check the browser console for results

## Browser Compatibility

The game is designed to work on:

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Performance Targets

- **60fps**: Smooth gameplay
- **< 3s**: Initial load time
- **< 1s**: Chapter transitions

## Accessibility

The game includes:

- Keyboard navigation support
- Screen reader compatibility
- High contrast mode support
- Reduced motion support

## Development Tips

1. **Check the console**: All game events are logged
2. **Use the test interface**: Test game state changes
3. **Save progress**: Game automatically saves to localStorage
4. **Hot reload**: Vite automatically reloads on file changes

## Troubleshooting

### Server won't start

- Check if port 3456 is available
- Ensure Node.js 18+ is installed
- Run `npm install` to install dependencies

### Game won't load

- Check browser console for errors
- Ensure JavaScript is enabled
- Try clearing browser cache

### Tests fail

- Check browser console for detailed error messages
- Ensure all helper functions are properly exported
- Verify test logic matches function behavior
