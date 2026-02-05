# Contributing to AI Code Mentor

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

---

## 🚀 Getting Started

1. **Fork the repository**
2. **Clone your fork**
   ```bash
   git clone https://github.com/your-username/AIcodeMentor.git
   cd AIcodeMentor
   ```
3. **Create a branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 🛠️ Development Setup

Follow the [QUICKSTART.md](QUICKSTART.md) guide to set up your development environment.

---

## 📝 Code Style Guidelines

### Backend (JavaScript/Node.js)
- Use **ES6+** syntax
- Use **const/let** (no var)
- Add JSDoc comments for functions
- Follow **Airbnb style guide**
- Use meaningful variable names
- Keep functions small and focused

### Frontend (React)
- Use **functional components**
- Use **hooks** for state management
- Follow **React best practices**
- Keep components focused (single responsibility)
- Use **PropTypes** for type checking (optional)

### General
- **Indentation**: 2 spaces
- **Quotes**: Single quotes for JS, double for JSX
- **Semicolons**: Required
- **Line length**: Max 100 characters

---

## 🏗️ Project Structure

```
AIcodeMentor/
├── server/           # Backend
│   ├── controllers/  # Request handlers
│   ├── models/       # Database schemas
│   ├── routes/       # API endpoints
│   ├── middleware/   # Auth, validation
│   └── services/     # Business logic
└── client/           # Frontend
    ├── components/   # Reusable UI
    ├── pages/        # Route pages
    ├── services/     # API clients
    └── context/      # Global state
```

---

## ✨ Feature Requests

### Before Submitting
1. Check if the feature already exists
2. Search existing issues for duplicates
3. Consider if it aligns with project goals

### Creating a Feature Request
Use this template:
```markdown
**Feature Description**
A clear description of the feature

**Use Case**
Why this feature is needed

**Proposed Solution**
How you think this should work

**Alternatives Considered**
Other approaches you've considered
```

---

## 🐛 Bug Reports

### Before Reporting
1. Check if the bug is already reported
2. Verify it's reproducible
3. Test on the latest version

### Creating a Bug Report
Use this template:
```markdown
**Bug Description**
Clear description of the bug

**Steps to Reproduce**
1. Go to...
2. Click on...
3. See error

**Expected Behavior**
What should happen

**Actual Behavior**
What actually happens

**Environment**
- OS: [e.g., macOS 12.0]
- Node version: [e.g., 18.0.0]
- Browser: [e.g., Chrome 100]
```

---

## 🔀 Pull Request Process

### 1. Make Your Changes
- Write clean, readable code
- Follow the code style guidelines
- Add comments for complex logic

### 2. Test Your Changes
- Ensure backend tests pass (if applicable)
- Test frontend UI changes
- Check for console errors
- Verify on different browsers

### 3. Commit Your Changes
Use conventional commit messages:
```bash
feat: add user profile page
fix: resolve login authentication bug
docs: update README installation steps
style: format code with prettier
refactor: simplify AI service logic
test: add unit tests for auth controller
```

### 4. Push and Create PR
```bash
git push origin feature/your-feature-name
```
- Go to GitHub and create a Pull Request
- Fill out the PR template
- Link related issues

### 5. PR Template
```markdown
**Description**
Brief description of changes

**Type of Change**
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

**Testing**
- [ ] Tested locally
- [ ] No console errors
- [ ] Works on mobile/desktop

**Screenshots** (if applicable)
Add screenshots of UI changes
```

---

## 🧪 Testing

### Backend
```bash
cd server
npm test  # When tests are added
```

### Frontend
```bash
cd client
npm test  # When tests are added
```

### Manual Testing Checklist
- [ ] User can sign up
- [ ] User can login
- [ ] Code submission works
- [ ] AI review displays correctly
- [ ] Dashboard shows history
- [ ] Learning mode works
- [ ] Logout works

---

## 📚 Areas for Contribution

### High Priority
- [ ] Add unit tests (backend & frontend)
- [ ] Add integration tests
- [ ] Improve error handling
- [ ] Add loading skeletons
- [ ] Enhance mobile responsiveness

### Medium Priority
- [ ] Add more programming languages (C++, Go, Rust)
- [ ] Implement code syntax validation
- [ ] Add user profile customization
- [ ] Implement dark mode toggle
- [ ] Add code snippet favorites

### Nice to Have
- [ ] Add social login (Google, GitHub)
- [ ] Implement code sharing
- [ ] Add achievements/badges system
- [ ] Create admin dashboard
- [ ] Add email notifications

---

## 🎨 Design Guidelines

### UI/UX Principles
- **Simplicity**: Keep interfaces clean and intuitive
- **Consistency**: Follow existing design patterns
- **Accessibility**: Ensure WCAG compliance
- **Responsive**: Mobile-first approach

### Color Palette
- Primary: `#667eea` (Purple)
- Secondary: `#764ba2` (Dark Purple)
- Success: `#2ecc71`
- Error: `#e74c3c`
- Warning: `#f39c12`

---

## 📖 Documentation

### Code Comments
- Add JSDoc for all exported functions
- Explain **why**, not **what**
- Keep comments up-to-date

### README Updates
- Update relevant documentation
- Add examples for new features
- Keep setup instructions current

---

## ⚖️ License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

## 🤝 Code of Conduct

### Our Standards
- Be respectful and inclusive
- Provide constructive feedback
- Accept criticism gracefully
- Focus on what's best for the community

### Unacceptable Behavior
- Harassment or discrimination
- Trolling or insulting comments
- Spam or self-promotion
- Publishing private information

---

## 💬 Questions?

- Create a GitHub issue
- Tag with "question" label
- Be specific and clear

---

## 🙏 Thank You!

Every contribution helps make this project better. Whether it's a bug report, feature suggestion, or code contribution - we appreciate your support!

---

**Happy Coding!** 🚀
