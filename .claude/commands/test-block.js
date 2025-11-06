/**
 * /test-block Command
 * 
 * Quick command to run comprehensive testing on a block.
 * Activates the testing-specialist agent with testing-blocks skill.
 * 
 * Usage: /test-block [block-name]
 * Example: /test-block hero
 */

export default {
  name: 'test-block',
  description: 'Run comprehensive testing on a block',
  usage: '/test-block [block-name]',
  category: 'testing',
  
  async execute({ args, context }) {
    const [blockName] = args;

    if (!blockName) {
      return {
        success: false,
        message: '❌ Please provide a block name.\n\nUsage: `/test-block <block-name>`\n\nExample: `/test-block hero`'
      };
    }

    // Check if block exists
    const blockPath = `blocks/${blockName}`;
    const fs = await import('fs');
    if (!fs.existsSync(blockPath)) {
      return {
        success: false,
        message: `❌ Block "${blockName}" not found at ${blockPath}/\n\nAvailable blocks:\n${listAvailableBlocks()}`
      };
    }

    // Check for test content
    const testContentReminder = context.testContentUrl 
      ? `**Test Content:** ${context.testContentUrl}`
      : '⚠️ **Test Content URL not set** - You\'ll need to provide this for validation.';

    const message = [
      `🧪 **Starting Comprehensive Testing for: \`${blockName}\`**`,
      '',
      testContentReminder,
      '',
      '**Testing Checklist:**',
      '',
      '**1. Code Quality**',
      '- [ ] ESLint checks pass',
      '- [ ] Stylelint checks pass',
      '- [ ] No console errors/warnings',
      '',
      '**2. Visual Validation**',
      '- [ ] Renders correctly on desktop',
      '- [ ] Renders correctly on tablet',
      '- [ ] Renders correctly on mobile',
      '- [ ] All variants work as expected',
      '',
      '**3. Functionality**',
      '- [ ] Interactive features work',
      '- [ ] Edge cases handled gracefully',
      '- [ ] Loading states appropriate',
      '',
      '**4. Performance**',
      '- [ ] No layout shift (CLS)',
      '- [ ] Images optimized',
      '- [ ] No blocking resources',
      '',
      '**5. Accessibility**',
      '- [ ] Keyboard navigation works',
      '- [ ] ARIA labels present',
      '- [ ] Proper heading hierarchy',
      '- [ ] Color contrast adequate',
      '',
      '**Next Step:** I\'ll start by running linting checks.',
      ''
    ].join('\n');

    return {
      success: true,
      message,
      activateAgent: 'testing-specialist',
      activateSkill: 'testing-blocks',
      context: {
        ...context,
        blockName,
        workflowActive: 'test-block',
        testingStarted: Date.now()
      }
    };
  }
};

function listAvailableBlocks() {
  const fs = require('fs');
  const blocksDir = 'blocks';
  
  if (!fs.existsSync(blocksDir)) {
    return '(blocks directory not found)';
  }

  try {
    const blocks = fs.readdirSync(blocksDir, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => `  - ${dirent.name}`)
      .join('\n');
    
    return blocks || '(no blocks found)';
  } catch (err) {
    return '(error listing blocks)';
  }
}

