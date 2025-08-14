# Commit Message Conventions - Gospel Game

## Overview

This document establishes conventions for writing clear, consistent commit messages that help track project history and facilitate collaboration.

## Commit Message Format

```
<type>(<scope>): <description>

[optional body]

[optional footer(s)]
```

### Type

The type must be one of the following:

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation only changes
- **style**: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- **refactor**: A code change that neither fixes a bug nor adds a feature
- **perf**: A code change that improves performance
- **test**: Adding missing tests or correcting existing tests
- **chore**: Changes to the build process or auxiliary tools and libraries such as documentation generation

### Scope

The scope should be the name of the component affected (optional):

- **core**: Core game systems
- **ui**: User interface components
- **game**: Game-specific logic
- **utils**: Utility functions
- **test**: Testing framework
- **docs**: Documentation
- **build**: Build system
- **ci**: Continuous integration

### Description

The description contains a succinct description of the change:

- Use the imperative, present tense: "change" not "changed" nor "changes"
- Don't capitalize the first letter
- No dot (.) at the end

## Examples

### Feature Commits

```
feat(game): add player movement system
feat(ui): implement game menu component
feat(core): add save/load functionality
```

### Bug Fix Commits

```
fix(game): resolve collision detection issue
fix(ui): fix menu button alignment
fix(core): handle localStorage errors gracefully
```

### Documentation Commits

```
docs: update README with setup instructions
docs(core): add JSDoc comments to GameState class
docs(test): document testing best practices
```

### Refactoring Commits

```
refactor(utils): simplify helper functions
refactor(game): improve game loop performance
refactor(core): restructure GameState class
```

### Testing Commits

```
test(game): add unit tests for player movement
test(core): increase GameState test coverage
test(utils): add edge case tests for helpers
```

### Style Commits

```
style: format code with Prettier
style(game): fix indentation in game loop
style(ui): align CSS class naming conventions
```

### Performance Commits

```
perf(game): optimize rendering loop
perf(core): cache expensive calculations
perf(ui): lazy load non-critical components
```

### Build/Chore Commits

```
chore: update dependencies
chore(build): configure webpack optimization
chore(ci): add GitHub Actions workflow
```

## Commit Message Body

Use the body to explain what and why vs. how:

```
feat(game): add player inventory system

The inventory system allows players to collect and manage items
throughout their journey. This includes:

- Item collection from game world
- Inventory UI with drag-and-drop
- Item usage and combination
- Persistent storage across sessions

Closes #123
```

## Commit Message Footer

The footer should contain any information about Breaking Changes and is also the place to reference GitHub issues that this commit closes.

### Breaking Changes

Breaking changes should start with the word `BREAKING CHANGE:` with a space or two newlines. The rest of the commit message is then used for this.

```
feat(core): change GameState API

BREAKING CHANGE: GameState constructor now requires a config object.
The old signature `new GameState()` is no longer supported.

Migration guide:
- Replace `new GameState()` with `new GameState({})`
- Add configuration options as needed
```

### Referencing Issues

```
feat(game): add player inventory system

Closes #123
Fixes #456
Relates to #789
```

## Best Practices

### 1. Keep Commits Atomic

- Each commit should represent a single logical change
- Don't mix different types of changes in one commit
- Keep commits small and focused

### 2. Write Clear Descriptions

- Be specific about what changed
- Use active voice
- Avoid vague descriptions like "fix stuff" or "update things"

### 3. Reference Issues

- Always reference related issues when applicable
- Use GitHub's issue linking syntax

### 4. Test Before Committing

- Ensure all tests pass
- Verify the change works as expected
- Don't commit broken code

### 5. Review Your Commits

- Read your commit message before committing
- Ask yourself: "Will this make sense to someone else?"
- Consider the future developer reading this commit

## Examples of Good vs Bad Commits

### ✅ Good Commits

```
feat(game): add player health regeneration system
fix(ui): resolve menu button click area issue
docs: update API documentation with examples
refactor(core): extract game loop into separate class
test(game): add comprehensive movement tests
```

### ❌ Bad Commits

```
update
fix stuff
wip
temp
asdf
bug fix
added feature
```

## Commit Message Templates

### Feature Template

```
feat(<scope>): <description>

- What was added
- Why it was added
- How it works (if complex)

Closes #<issue-number>
```

### Bug Fix Template

```
fix(<scope>): <description>

- What was broken
- How it was fixed
- What caused the issue (if known)

Fixes #<issue-number>
```

### Refactor Template

```
refactor(<scope>): <description>

- What was refactored
- Why it was refactored
- What improvements were made

Relates to #<issue-number>
```

## Tools and Automation

### Pre-commit Hooks

Our project uses Husky to enforce commit message conventions:

```bash
# This will run automatically on commit
npx husky add .husky/commit-msg 'npx --no -- commitlint --edit "$1"'
```

### Commit Message Validation

We use commitlint to validate commit messages:

```json
// commitlint.config.js
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      ['feat', 'fix', 'docs', 'style', 'refactor', 'perf', 'test', 'chore']
    ],
    'scope-enum': [
      2,
      'always',
      ['core', 'game', 'ui', 'utils', 'test', 'docs', 'build', 'ci']
    ]
  }
};
```

## Conclusion

Following these commit message conventions:

- **Improves Collaboration**: Team members can quickly understand changes
- **Facilitates Code Reviews**: Clear descriptions help reviewers
- **Enables Better History**: Git log becomes a valuable resource
- **Supports Automation**: Tools can parse and categorize commits
- **Aids Debugging**: Clear history helps identify when bugs were introduced

Remember: **Good commit messages are a gift to your future self and your team**. Take the time to write them well.
