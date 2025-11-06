/**
 * /new-block Command
 * 
 * Quick command to start the block development workflow with Content-Driven Development.
 * Automatically activates the block-developer agent and CDD skill.
 * 
 * Usage: /new-block [block-name] [description]
 * Example: /new-block hero-banner "Hero banner with video background"
 */

export default {
  name: 'new-block',
  description: 'Start Content-Driven Development workflow for a new block',
  usage: '/new-block [block-name] [description]',
  category: 'development',
  
  async execute({ args, context }) {
    const [blockName, ...descriptionParts] = args;
    const description = descriptionParts.join(' ');

    if (!blockName) {
      return {
        success: false,
        message: 'ERROR: Please provide a block name.\n\nUsage: `/new-block <block-name> [description]`\n\nExample: `/new-block hero "Hero banner with image"`'
      };
    }

    // Validate block name
    const validNamePattern = /^[a-z][a-z0-9-]*$/;
    if (!validNamePattern.test(blockName)) {
      return {
        success: false,
        message: `ERROR: Invalid block name: "${blockName}"\n\nBlock names must:\n- Start with lowercase letter\n- Contain only lowercase letters, numbers, and hyphens\n- Use kebab-case (e.g., "blog-post", "hero-banner")`
      };
    }

    // Check if block already exists
    const blockPath = `blocks/${blockName}`;
    const fs = await import('fs');
    if (fs.existsSync(blockPath)) {
      return {
        success: false,
        message: `ERROR: Block "${blockName}" already exists at ${blockPath}/\n\nUse a different name or modify the existing block.`
      };
    }

    // Prepare workflow message
    const message = [
      `**Starting Content-Driven Development for: \`${blockName}\`**`,
      '',
      description ? `**Description:** ${description}` : '',
      '',
      '**Workflow Steps:**',
      '1. Determine if test content exists or create it',
      '2. Design author-friendly content model',
      '3. Find similar blocks for reference patterns',
      '4. Implement block decoration (JavaScript)',
      '5. Add responsive styles (CSS)',
      '6. Test implementation',
      '7. Validate with linting',
      '',
      '**Next Step:** I\'ll guide you through creating test content first.',
      '',
      '---',
      '',
      'Do you have existing content we can use for testing this block, or should we create new test content?'
    ].filter(Boolean).join('\n');

    return {
      success: true,
      message,
      activateAgent: 'block-developer',
      activateSkill: 'content-driven-development',
      context: {
        ...context,
        blockName,
        blockDescription: description,
        workflowActive: 'new-block',
        contentDrivenActive: true
      }
    };
  }
};

