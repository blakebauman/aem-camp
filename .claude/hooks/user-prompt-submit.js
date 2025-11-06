/**
 * UserPromptSubmit Hook
 * 
 * Analyzes user prompts to automatically suggest and activate relevant skills,
 * agents, or commands based on the task at hand.
 * 
 * This hook solves the "skills don't activate automatically" problem by:
 * - Detecting task patterns in user prompts
 * - Suggesting relevant skills proactively
 * - Auto-routing to specialized agents for complex tasks
 */

export default async function userPromptSubmit({ prompt, context }) {
  const suggestions = [];
  const promptLower = prompt.toLowerCase();

  // Block development patterns
  if (
    promptLower.includes('create') && promptLower.includes('block') ||
    promptLower.includes('new block') ||
    promptLower.includes('build a block')
  ) {
    suggestions.push({
      type: 'skill',
      name: 'content-driven-development',
      reason: 'Block development requires content-first approach',
      autoActivate: true,
      message: '🎯 **Auto-activating Content-Driven Development workflow** for block creation.'
    });
  }

  // Modification patterns
  if (
    (promptLower.includes('modify') || promptLower.includes('change') || promptLower.includes('update')) &&
    promptLower.includes('block')
  ) {
    suggestions.push({
      type: 'skill',
      name: 'content-driven-development',
      reason: 'Block modifications require test content',
      autoActivate: true,
      message: '🎯 **Auto-activating Content-Driven Development workflow** for block modification.'
    });
  }

  // Content modeling patterns
  if (
    promptLower.includes('content model') ||
    promptLower.includes('author') && promptLower.includes('structure') ||
    promptLower.includes('authoring')
  ) {
    suggestions.push({
      type: 'skill',
      name: 'content-modeling',
      reason: 'Content modeling expertise needed',
      autoActivate: true,
      message: '📋 **Auto-activating Content Modeling skill** for author-friendly design.'
    });
  }

  // Testing patterns
  if (
    promptLower.includes('test') ||
    promptLower.includes('validate') ||
    promptLower.includes('pr') && (promptLower.includes('ready') || promptLower.includes('check'))
  ) {
    suggestions.push({
      type: 'skill',
      name: 'testing-blocks',
      reason: 'Testing guidance needed',
      autoActivate: true,
      message: '🧪 **Auto-activating Testing skill** for comprehensive validation.'
    });
  }

  // Documentation search patterns
  if (
    promptLower.includes('how to') && promptLower.includes('aem') ||
    promptLower.includes('aem.live') ||
    promptLower.includes('edge delivery') && promptLower.includes('documentation')
  ) {
    suggestions.push({
      type: 'skill',
      name: 'docs-search',
      reason: 'AEM documentation search needed',
      autoActivate: true,
      message: '📚 **Auto-activating Documentation Search** for AEM guidance.'
    });
  }

  // Find content patterns
  if (
    promptLower.includes('find') && promptLower.includes('block') ||
    promptLower.includes('pages') && promptLower.includes('using') ||
    promptLower.includes('where is') && promptLower.includes('block')
  ) {
    suggestions.push({
      type: 'command',
      name: 'find-content',
      reason: 'Block content search needed',
      autoActivate: false,
      message: '💡 **Tip:** Use `/find-content <block-name>` to search for pages using a block.'
    });
  }

  // Reference implementation patterns
  if (
    promptLower.includes('example') && promptLower.includes('block') ||
    promptLower.includes('similar block') ||
    promptLower.includes('reference') && promptLower.includes('implementation')
  ) {
    suggestions.push({
      type: 'skill',
      name: 'block-collection-and-party',
      reason: 'Reference implementations needed',
      autoActivate: true,
      message: '🎨 **Auto-activating Block Collection search** for reference implementations.'
    });
  }

  // Complex multi-step tasks - suggest agents
  if (
    promptLower.includes('entire') && promptLower.includes('block') ||
    promptLower.includes('complete') && promptLower.includes('workflow') ||
    promptLower.includes('from scratch')
  ) {
    suggestions.push({
      type: 'agent',
      name: 'block-developer',
      reason: 'Complex block development requires specialized agent',
      autoActivate: false,
      message: '🤖 **Suggestion:** Delegate this to the Block Developer agent for comprehensive handling?'
    });
  }

  // Content-first enforcement
  if (
    (promptLower.includes('code') || promptLower.includes('implement')) &&
    (promptLower.includes('block') || promptLower.includes('component')) &&
    !context.contentVerified
  ) {
    suggestions.push({
      type: 'warning',
      name: 'content-first-reminder',
      reason: 'Content-first principle enforcement',
      autoActivate: true,
      message: '⚠️ **Content-First Reminder:** Do you have test content ready? If not, use Content-Driven Development skill first.'
    });
  }

  // Return suggestions for Claude to act on
  return {
    suggestions,
    enhancedPrompt: suggestions.length > 0
      ? `${suggestions.map(s => s.message).join('\n\n')}\n\nOriginal request: ${prompt}`
      : prompt
  };
}

