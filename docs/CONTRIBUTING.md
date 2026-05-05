# Contributing to AI-Powered Air Quality Prediction System

Thank you for your interest in contributing to this project! This document provides guidelines and instructions for contributing.

## 🚀 Getting Started

### Prerequisites
- Python 3.8+
- Node.js 16+
- Git
- MongoDB

### Development Setup
1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/aqi-prediction-system.git
   cd aqi-prediction-system
   ```

3. Set up the development environment:
   ```bash
   # Backend setup
   cd website/Backend
   npm install
   pip install -r requirements.txt

   # Frontend setup
   cd ../Frontend
   npm install
   ```

## 📝 Contribution Guidelines

### Types of Contributions
- **Bug reports**: Report issues you encounter
- **Feature requests**: Suggest new features
- **Code contributions**: Submit pull requests
- **Documentation**: Improve documentation
- **Testing**: Help with testing and QA

### Code Style
- **Python**: Follow PEP 8 guidelines
- **JavaScript**: Use ESLint configuration
- **React**: Follow React best practices
- **Commit messages**: Use conventional commits

### Pull Request Process
1. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes
3. Test your changes:
   ```bash
   # Run tests
   npm test
   python -m pytest tests/

   # Check code style
   npm run lint
   ```

4. Commit your changes:
   ```bash
   git commit -m "feat: add new feature description"
   ```

5. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

6. Create a Pull Request

## 🧪 Testing

### Running Tests
```bash
# Frontend tests
cd website/Frontend
npm test

# Backend tests
cd website/Backend
npm test

# Python tests
python -m pytest tests/
```

### Test Coverage
- Aim for 80%+ test coverage
- Include unit tests for new features
- Add integration tests for API endpoints

## 📚 Documentation

### Code Documentation
- Use JSDoc for JavaScript
- Use docstrings for Python
- Update README for new features
- Add examples for complex functions

## 🐛 Bug Reports

### Before Submitting
- Check existing issues
- Test with latest version
- Include steps to reproduce
- Provide environment details

### Bug Report Template
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Step 1
2. Step 2
3. Step 3

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g. Windows 11]
- Browser: [e.g. Chrome 96]
- Version: [e.g. 1.0.0]
```

## 💡 Feature Requests

### Before Submitting
- Check existing feature requests
- Provide clear use case
- Include implementation ideas
- Consider impact on existing users

## 🏷️ Issue Labels

- `bug`: Something isn't working
- `enhancement`: New feature or improvement
- `documentation`: Documentation improvements
- `good first issue`: Good for newcomers
- `help wanted`: Extra attention needed

## 🤝 Code of Conduct

### Our Pledge
We pledge to make participation in our project a harassment-free experience for everyone.

### Our Standards
- Be respectful and inclusive
- Provide constructive feedback
- Focus on what's best for the community
- Show empathy towards others

## 📞 Getting Help

- **GitHub Issues**: For bug reports and feature requests
- **Discussions**: For questions and general discussion
- **Email**: support@aqi-prediction.com

## 🏆 Recognition

Contributors will be recognized in:
- README.md contributors section
- Release notes
- Project documentation

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.
