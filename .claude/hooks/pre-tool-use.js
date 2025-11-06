/**
 * PreToolUse Hook
 * 
 * Validates and prepares before tool execution.
 * Enforces content-driven development principles and best practices.
 * 
 * This hook ensures:
 * - Content exists before code changes
 * - Proper skill activation before file modifications
 * - Quality gates are checked before major changes
 */

export default async function preToolUse({ tool, parameters, context }) {
  const warnings = [];
  const blocks = [];

  // Detect if we're creating or modifying block files
  const isBlockFile =
    parameters.file_path &&
    parameters.file_path.includes('/blocks/') &&
    (parameters.file_path.endsWith('.js') || parameters.file_path.endsWith('.css'));

  // Detect if we're writing/editing block code
  const isBlockModification =
    (tool === 'write' || tool === 'search_replace') &&
    isBlockFile;

  // Content-first enforcement for block modifications
  if (isBlockModification && !context.contentDrivenActive) {
    warnings.push({
      severity: 'high',
      message: '🛑 **Content-First Violation Detected**',
      detail: 'You are about to modify block code without activating Content-Driven Development workflow.',
      action: 'Please use the `content-driven-development` skill first to ensure test content exists.',
      blockExecution: true
    });
  }

  // Linting reminder for code modifications
  if ((tool === 'write' || tool === 'search_replace') && 
      (parameters.file_path?.endsWith('.js') || parameters.file_path?.endsWith('.css'))) {
    context.needsLinting = true;
  }

  // Dev server check for first-time users
  if (isBlockModification && !context.devServerChecked) {
    warnings.push({
      severity: 'low',
      message: '**Dev Server Check**',
      detail: 'Is your AEM dev server running?',
      action: 'Run `aem up` if not already started.',
      blockExecution: false
    });
    context.devServerChecked = true;
  }

  // Testing reminder before PR
  if (tool === 'run_terminal_cmd' && 
      (parameters.command?.includes('git push') || parameters.command?.includes('gh pr'))) {
    if (!context.testingCompleted) {
      warnings.push({
        severity: 'medium',
        message: 'WARNING: **Testing Reminder**',
        detail: 'Have you completed testing before pushing?',
        action: 'Use the `testing-blocks` skill for comprehensive validation.',
        blockExecution: false
      });
    }
  }

  // Allow tool execution if no blocking warnings
  const shouldBlock = warnings.some(w => w.blockExecution);

  return {
    proceed: !shouldBlock,
    warnings,
    modifiedParameters: parameters, // Could modify parameters if needed
    contextUpdates: {
      ...context,
      lastToolAttempt: tool,
      lastWarnings: warnings
    }
  };
}

