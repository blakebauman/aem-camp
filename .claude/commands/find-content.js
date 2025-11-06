/**
 * /find-content Command
 * 
 * Search for pages using a specific block across the site.
 * Uses the find-block-content.js script from content-driven-development skill.
 * 
 * Usage: /find-content [block-name] [variant]
 * Example: /find-content hero dark
 */

export default {
  name: 'find-content',
  description: 'Find pages using a specific block',
  usage: '/find-content [block-name] [variant]',
  category: 'content',
  
  async execute({ args, context }) {
    const [blockName, variant] = args;

    if (!blockName) {
      return {
        success: false,
        message: '❌ Please provide a block name.\n\nUsage: `/find-content <block-name> [variant]`\n\nExample: `/find-content hero`\nExample: `/find-content cards three-up`'
      };
    }

    const message = [
      `🔍 **Searching for pages using block: \`${blockName}\`${variant ? ` (variant: ${variant})` : ''}**`,
      '',
      '**Search Targets:**',
      '- 📍 Local: http://localhost:3000',
      '- 🌐 Preview: *.aem.page',
      '- ✅ Live: *.aem.live',
      '',
      'Running search script...',
      ''
    ].join('\n');

    // Prepare command
    const scriptPath = '.claude/skills/content-driven-development/scripts/find-block-content.js';
    const command = variant 
      ? `node ${scriptPath} ${blockName} localhost:3000 ${variant}`
      : `node ${scriptPath} ${blockName}`;

    return {
      success: true,
      message,
      runCommand: command,
      context: {
        ...context,
        searchedBlock: blockName,
        searchedVariant: variant
      }
    };
  }
};

