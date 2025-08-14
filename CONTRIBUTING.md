# Contributing to Gospel Game

## Overview

Thank you for your interest in contributing to the Gospel Game! This document provides guidelines and information for contributors.

## Table of Contents

1. [Getting Started](#getting-started)
2. [Development Workflow](#development-workflow)
3. [Code Standards](#code-standards)
4. [Testing Guidelines](#testing-guidelines)
5. [Pull Request Process](#pull-request-process)
6. [Issue Reporting](#issue-reporting)
7. [Communication](#communication)

## Getting Started

### Prerequisites

- **Node.js 18.0.0** or higher
- **npm 8.0.0** or higher
- **Git** for version control
- **VS Code** (recommended) or your preferred editor

### Setup

1. **Fork the repository**

   ```bash
   # Fork on GitHub, then clone your fork
   git clone https://github.com/your-username/gospel-game.git
   cd gospel-game
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

4. **Verify setup**
   ```bash
   npm test
   npm run lint
   npm run type-check
   ```

### Project Structure

```
gospel-game/
├── src/                    # Source code
│   ├── core/              # Core game systems
│   ├── game/              # Game-specific logic
│   ├── ui/                # User interface components
│   ├── utils/             # Utility functions
│   ├── types/             # TypeScript type definitions
│   ├── test/              # Test utilities
│   └── styles/            # CSS stylesheets
├── docs/                  # Documentation
├── story/                 # Story content
├── tasks/                 # Development tasks
└── public/                # Static files
```

## Development Workflow

### 1. Create a Feature Branch

```bash
# Update your fork
git fetch origin
git checkout main
git pull origin main

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Make Your Changes

- Follow the [coding standards](#code-standards)
- Write tests for new functionality
- Update documentation as needed
- Keep commits atomic and well-described

### 3. Test Your Changes

```bash
# Run all tests
npm test

# Check code quality
npm run lint
npm run type-check

# Build the project
npm run build
```

### 4. Commit Your Changes

```bash
# Stage changes
git add .

# Commit with conventional message
git commit -m "feat(game): add player inventory system"

# Push to your fork
git push origin feature/your-feature-name
```

### 5. Create a Pull Request

1. Go to your fork on GitHub
2. Click "New Pull Request"
3. Select your feature branch
4. Fill out the PR template
5. Submit for review

## Code Standards

### General Principles

- **Readability**: Code should be self-documenting
- **Maintainability**: Modular and well-structured
- **Consistency**: Follow established patterns
- **Educational Value**: Code should teach good practices

### TypeScript Guidelines

```typescript
// ✅ Good - Proper typing
interface PlayerState {
  health: number;
  position: Vector2D;
  inventory: string[];
}

function updatePlayerHealth(player: PlayerState, amount: number): void {
  player.health = Math.max(0, Math.min(100, player.health + amount));
}

// ❌ Bad - No typing
function updateHealth(player, amount) {
  player.health += amount;
}
```

### Naming Conventions

```typescript
// Variables and functions
const playerHealth = 100;
const isGamePaused = false;
function calculatePlayerScore(): number {}

// Constants
const GAME_CONFIG = { fps: 60 };
const CHAPTER_NAMES = { 1: 'The Burden' } as const;

// Classes and interfaces
interface PlayerProgress {}
class GameManager {}
```

### Documentation

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

## Testing Guidelines

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
});
```

### Test Requirements

- **Coverage**: Minimum 70% for all metrics
- **Critical Paths**: 100% coverage for game logic
- **Edge Cases**: Test error conditions
- **Integration**: Test component interactions

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run specific test file
npm test -- src/core/GameState.test.ts
```

## Pull Request Process

### Before Submitting

- [ ] Code follows [coding standards](docs/CODING_STANDARDS.md)
- [ ] All tests pass
- [ ] Code is linted and formatted
- [ ] Documentation is updated
- [ ] No console.log statements in production code
- [ ] Performance impact is considered
- [ ] Accessibility requirements are met

### PR Template

```markdown
## Description

Brief description of the changes made.

## Type of Change

- [ ] Bug fix (non-breaking change which fixes an issue)
- [ ] New feature (non-breaking change which adds functionality)
- [ ] Breaking change (fix or feature that would cause existing functionality to not work as expected)
- [ ] Documentation update

## Testing

- [ ] Unit tests pass
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Accessibility testing completed

## Checklist

- [ ] My code follows the style guidelines of this project
- [ ] I have performed a self-review of my own code
- [ ] I have commented my code, particularly in hard-to-understand areas
- [ ] I have made corresponding changes to the documentation
- [ ] My changes generate no new warnings
- [ ] I have added tests that prove my fix is effective or that my feature works
- [ ] New and existing unit tests pass locally with my changes

## Screenshots (if applicable)

Add screenshots to help explain your changes.

## Additional Notes

Any additional information or context.
```

### Review Process

1. **Automated Checks**: CI/CD pipeline runs tests and linting
2. **Code Review**: At least one maintainer reviews the code
3. **Testing**: Verify changes work as expected
4. **Approval**: Maintainer approves and merges

## Issue Reporting

### Before Creating an Issue

1. **Search existing issues** for similar problems
2. **Check the documentation** for solutions
3. **Try the troubleshooting guide** in `docs/TROUBLESHOOTING.md`
4. **Reproduce the issue** in a clean environment

### Issue Template

```markdown
## Bug Report

### Description

Clear and concise description of the bug.

### Steps to Reproduce

1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

### Expected Behavior

What you expected to happen.

### Actual Behavior

What actually happened.

### Environment

- OS: [e.g. macOS, Windows, Linux]
- Browser: [e.g. Chrome, Firefox, Safari]
- Node.js Version: [e.g. 18.0.0]
- npm Version: [e.g. 8.0.0]

### Additional Context

Any other context about the problem.

### Screenshots

If applicable, add screenshots to help explain your problem.
```

### Feature Request Template

```markdown
## Feature Request

### Description

Clear and concise description of the feature you'd like to see.

### Problem Statement

A clear and concise description of what problem this feature would solve.

### Proposed Solution

A clear and concise description of what you want to happen.

### Alternative Solutions

A clear and concise description of any alternative solutions you've considered.

### Additional Context

Add any other context or screenshots about the feature request.
```

## Communication

### Code of Conduct

We are committed to providing a welcoming and inspiring community for all. Please:

- **Be respectful** and inclusive
- **Be collaborative** and constructive
- **Be helpful** and supportive
- **Be patient** with newcomers

### Communication Channels

- **GitHub Issues**: Bug reports and feature requests
- **GitHub Discussions**: General questions and discussions
- **Pull Requests**: Code reviews and feedback

### Getting Help

1. **Check the documentation** first
2. **Search existing issues** for similar problems
3. **Ask in GitHub Discussions** for general questions
4. **Create an issue** for bugs or feature requests

## Recognition

### Contributors

All contributors are recognized in:

- **README.md**: List of contributors
- **GitHub Contributors**: Automatic recognition
- **Release Notes**: Credit for significant contributions

### Types of Contributions

We welcome all types of contributions:

- **Code**: Bug fixes, features, improvements
- **Documentation**: Guides, tutorials, API docs
- **Testing**: Test cases, bug reports
- **Design**: UI/UX improvements, graphics
- **Content**: Story content, educational materials
- **Infrastructure**: Build tools, CI/CD

## Conclusion

Thank you for contributing to the Gospel Game! Your contributions help make this project better for everyone.

Remember:

- **Start small**: Begin with documentation or small bug fixes
- **Ask questions**: Don't hesitate to ask for clarification
- **Be patient**: Code reviews take time
- **Learn together**: We're all here to learn and grow

Happy coding! 🎮
