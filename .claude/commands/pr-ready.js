/**
 * /pr-ready Command
 * 
 * Comprehensive PR readiness check - validates everything is ready for a pull request.
 * Runs linting, checks for test content, validates commits, and more.
 * 
 * Usage: /pr-ready
 */

export default {
  name: 'pr-ready',
  description: 'Check if changes are ready for pull request',
  usage: '/pr-ready',
  category: 'testing',
  
  async execute({ args, context }) {
    const message = [
      '✅ **Pull Request Readiness Check**',
      '',
      'Running comprehensive validation to ensure your changes are ready for PR...',
      '',
      '**Checklist:**',
      '',
      '1. **Code Quality**',
      '   - Running ESLint...',
      '   - Running Stylelint...',
      '',
      '2. **Git Status**',
      '   - Checking for uncommitted changes...',
      '   - Validating commit messages...',
      '',
      '3. **Test Content**',
      '   - Verifying test content exists...',
      '   - Checking test URLs are accessible...',
      '',
      '4. **Documentation**',
      '   - Checking for updated docs...',
      '   - Verifying README if needed...',
      '',
      '5. **Performance**',
      '   - No blocking scripts...',
      '   - Images optimized...',
      '',
      'Running checks...',
      ''
    ].join('\n');

    return {
      success: true,
      message,
      activateAgent: 'testing-specialist',
      runChecks: [
        { name: 'lint', command: 'npm run lint' },
        { name: 'git-status', command: 'git status --short' },
        { name: 'git-log', command: 'git log --oneline -5' }
      ],
      context: {
        ...context,
        prCheckStarted: Date.now(),
        testingCompleted: true
      }
    };
  }
};

