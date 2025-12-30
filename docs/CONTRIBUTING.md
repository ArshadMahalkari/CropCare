# Contributing to CropCare

Thank you for your interest in contributing to CropCare! This document provides guidelines and instructions for contributing.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Commit Guidelines](#commit-guidelines)
- [Pull Request Process](#pull-request-process)
- [Testing](#testing)

## Code of Conduct

### Our Pledge

We are committed to providing a welcoming and inclusive environment for all contributors.

### Expected Behavior

- Be respectful and inclusive
- Welcome newcomers
- Focus on constructive feedback
- Be patient with questions

## Getting Started

### 1. Fork the Repository

1. Go to the [CropCare repository](https://github.com/yourusername/CropCare)
2. Click the "Fork" button
3. Clone your fork:
```bash
git clone https://github.com/yourusername/CropCare.git
cd CropCare
```

### 2. Set Up Development Environment

Follow the [Setup Guide](SETUP.md) to get your development environment running.

### 3. Create a Branch

```bash
git checkout -b feature/your-feature-name
# or
git checkout -b fix/your-bug-fix
```

## Development Workflow

### Branch Naming

- `feature/` - New features
- `fix/` - Bug fixes
- `docs/` - Documentation updates
- `refactor/` - Code refactoring
- `test/` - Test additions/updates
- `chore/` - Maintenance tasks

### Development Process

1. **Create Issue**: Discuss major changes in an issue first
2. **Create Branch**: From `main` branch
3. **Make Changes**: Write clean, tested code
4. **Test Locally**: Ensure everything works
5. **Commit**: Follow commit guidelines
6. **Push**: Push to your fork
7. **Pull Request**: Create PR with description

## Coding Standards

### JavaScript/Node.js

- Use ES6+ features
- Follow ESLint configuration
- Use meaningful variable names
- Add JSDoc comments for functions
- Maximum line length: 100 characters

**Example:**
```javascript
/**
 * Get crop advisory based on crop and soil type
 * @param {string} crop - Crop name
 * @param {string} soil - Soil type
 * @returns {Promise<Object>} Advisory result
 */
async function getAdvisory(crop, soil) {
  // Implementation
}
```

### React/JSX

- Use functional components with hooks
- Extract reusable components
- Use meaningful prop names
- Keep components small and focused

**Example:**
```jsx
function CropSelector({ crop, onCropChange }) {
  return (
    <select value={crop} onChange={onCropChange}>
      <option value="Rice">Rice</option>
      <option value="Cotton">Cotton</option>
    </select>
  );
}
```

### Python

- Follow PEP 8 style guide
- Use type hints where possible
- Add docstrings to functions
- Maximum line length: 88 characters (Black formatter)

**Example:**
```python
def detect_pest(crop: str) -> dict:
    """
    Detect pest/disease for a given crop.
    
    Args:
        crop: Name of the crop
        
    Returns:
        Dictionary with disease and solution
    """
    # Implementation
    pass
```

### General Guidelines

- Write self-documenting code
- Comment complex logic
- Remove commented-out code
- Use consistent indentation (2 spaces for JS, 4 for Python)
- Remove trailing whitespace

## Commit Guidelines

### Commit Message Format

```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation
- `style`: Formatting
- `refactor`: Code restructuring
- `test`: Adding tests
- `chore`: Maintenance

### Examples

```
feat(advisory): add wheat crop support

Add wheat to the list of supported crops with specific
advisory recommendations for different soil types.

Closes #123
```

```
fix(chat): handle empty message input

Prevent error when user sends empty message by adding
validation in frontend and backend.

Fixes #456
```

## Pull Request Process

### Before Submitting

- [ ] Code follows style guidelines
- [ ] All tests pass
- [ ] Documentation updated
- [ ] No console.logs or debug code
- [ ] Commits follow guidelines

### PR Description Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Testing
How was this tested?

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review completed
- [ ] Comments added for complex code
- [ ] Documentation updated
- [ ] No new warnings
```

### Review Process

1. Maintainers will review your PR
2. Address any feedback
3. Once approved, PR will be merged
4. Your contribution will be credited

## Testing

### Frontend Testing

```bash
cd frontend
npm test
```

### Backend Testing

```bash
cd backend
npm test
```

### Manual Testing Checklist

- [ ] All pages load correctly
- [ ] Authentication works
- [ ] API endpoints respond correctly
- [ ] Error handling works
- [ ] Mobile responsive
- [ ] Cross-browser compatible

## Areas for Contribution

### High Priority

- [ ] Automated testing
- [ ] Performance optimization
- [ ] Additional crop support
- [ ] Image upload for pest detection
- [ ] Mobile app version

### Documentation

- [ ] API documentation improvements
- [ ] Code examples
- [ ] Tutorial videos
- [ ] Translation to more languages

### Features

- [ ] Weather integration
- [ ] Market price information
- [ ] Farmer community features
- [ ] Offline mode support

## Questions?

- Open an issue for bugs or feature requests
- Check existing issues first
- Be specific and provide examples

## Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Credited in release notes
- Thanked in the project

Thank you for contributing to CropCare! 🌾

