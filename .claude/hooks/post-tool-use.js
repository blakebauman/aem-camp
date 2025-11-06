/**
 * PostToolUse Hook
 * 
 * Validates and follows up after tool execution.
 * Provides immediate feedback and suggests next steps.
 * 
 * This hook:
 * - Runs automatic linting after code changes
 * - Suggests testing after implementations
 * - Maintains development workflow momentum
 */

export default async function postToolUse({ tool, parameters, result, context }) {
  const suggestions = [];
  const autoActions = [];

  // Auto-lint after code file modifications
  if (
    context.needsLinting &&
    (tool === 'write' || tool === 'search_replace') &&
    (parameters.file_path?.endsWith('.js') || parameters.file_path?.endsWith('.css'))
  ) {
    autoActions.push({
      type: 'lint',
      message: 'Running automatic linting...',
      command: 'npm run lint:fix',
      reason: 'Code file was modified'
    });
  }

  // Suggest testing after block implementation
  if (
    (tool === 'write' || tool === 'search_replace') &&
    parameters.file_path?.includes('/blocks/') &&
    parameters.file_path?.endsWith('.js')
  ) {
    suggestions.push({
      type: 'testing',
      message: '**Next Step:** Test your block implementation',
      actions: [
        'View in browser: http://localhost:3000/your-test-content',
        'Run linting: `npm run lint`',
        'Use testing-blocks skill for comprehensive validation'
      ]
    });
  }

  // Suggest commit message after multiple changes
  if (context.fileChangesCount > 3 && !context.commitSuggested) {
    suggestions.push({
      type: 'git',
      message: '💾 **Tip:** You\'ve made several changes. Consider committing your progress.',
      actions: [
        'Review changes: `git status`',
        'Stage changes: `git add .`',
        'Commit: `git commit -m "your message"`'
      ]
    });
    context.commitSuggested = true;
  }

  // Update context
  const updatedContext = {
    ...context,
    fileChangesCount: (context.fileChangesCount || 0) + (
      (tool === 'write' || tool === 'search_replace') ? 1 : 0
    ),
    lastToolSuccess: result.success !== false,
    needsLinting: false // Reset after handling
  };

  return {
    suggestions,
    autoActions,
    contextUpdates: updatedContext
  };
}

