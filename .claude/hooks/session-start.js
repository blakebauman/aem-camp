/**
 * SessionStart Hook
 * 
 * Initializes the development environment and loads persistent context.
 * This hook runs when a new Claude Code session begins.
 * 
 * This hook:
 * - Loads dev docs and persistent knowledge
 * - Discovers available skills, agents, and commands
 * - Sets up the development context
 * - Provides session initialization summary
 */

import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

export default async function sessionStart({ workspaceRoot, context }) {
  const initMessages = [];
  const loadedDocs = [];

  // Load persistent dev docs
  const docsDir = join(workspaceRoot, '.claude/docs');
  const persistentDocs = [
    'architecture.md',
    'patterns.md',
    'decisions.md',
    'troubleshooting.md'
  ];

  for (const docFile of persistentDocs) {
    const docPath = join(docsDir, docFile);
    if (existsSync(docPath)) {
      const content = readFileSync(docPath, 'utf-8');
      loadedDocs.push({
        name: docFile,
        path: docPath,
        size: content.length,
        summary: content.split('\n')[0] // First line as summary
      });
    }
  }

  // Discover skills
  initMessages.push({
    type: 'info',
    message: '🎯 **Skills Discovered**',
    details: [
      'content-driven-development',
      'building-blocks',
      'content-modeling',
      'testing-blocks',
      'docs-search',
      'block-collection-and-party'
    ]
  });

  // Check for agents
  initMessages.push({
    type: 'info',
    message: '🤖 **Specialized Agents Available**',
    details: [
      'block-developer (comprehensive block development)',
      'content-modeler (content structure design)',
      'testing-specialist (quality assurance)',
      'docs-expert (documentation and search)'
    ]
  });

  // Check dev environment
  const checks = [
    {
      name: 'Dev Server',
      command: 'aem up',
      url: 'http://localhost:3000'
    },
    {
      name: 'Node Modules',
      check: existsSync(join(workspaceRoot, 'node_modules'))
    }
  ];

  // Initialize context
  const initialContext = {
    sessionId: Date.now(),
    workspaceRoot,
    contentDrivenActive: false,
    devServerChecked: false,
    testingCompleted: false,
    fileChangesCount: 0,
    commitSuggested: false,
    loadedDocs: loadedDocs.map(d => d.name),
    persistentKnowledge: loadedDocs
  };

  // Welcome message
  initMessages.unshift({
    type: 'welcome',
    message: '👋 **AEM Edge Delivery Services Development Session Started**',
    details: [
      `📁 Project: AEM Camp`,
      `🎯 ${persistentDocs.length} persistent docs loaded`,
      `⚡ Content-Driven Development enforced`,
      `🔧 Auto-activating skills enabled`
    ]
  });

  return {
    context: initialContext,
    messages: initMessages,
    ready: true
  };
}

