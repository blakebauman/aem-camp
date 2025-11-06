/**
 * /find-examples Command
 * 
 * Search Block Collection and Block Party for reference implementations.
 * Activates the docs-expert agent with block-collection-and-party skill.
 * 
 * Usage: /find-examples [query]
 * Example: /find-examples carousel
 */

export default {
  name: 'find-examples',
  description: 'Find reference block implementations in Block Collection and Block Party',
  usage: '/find-examples [query]',
  category: 'documentation',
  
  async execute({ args, context }) {
    const query = args.join(' ');

    if (!query) {
      return {
        success: false,
        message: [
          '❌ Please provide a search query.',
          '',
          'Usage: `/find-examples <query>`',
          '',
          '**Examples:**',
          '- `/find-examples carousel`',
          '- `/find-examples video player`',
          '- `/find-examples tabs accordion`',
          '- `/find-examples form validation`',
          '',
          '**Search Sources:**',
          '- 🎨 Block Collection (curated examples)',
          '- 🎉 Block Party (community contributions)',
          '- 💻 GitHub repositories'
        ].join('\n')
      };
    }

    const message = [
      `🎨 **Searching for block examples: "${query}"**`,
      '',
      '**Searching:**',
      '- Block Collection (official examples)',
      '- Block Party (community blocks)',
      '- Related GitHub repos',
      '',
      'Finding reference implementations...',
      ''
    ].join('\n');

    return {
      success: true,
      message,
      activateAgent: 'docs-expert',
      activateSkill: 'block-collection-and-party',
      enhancedPrompt: `Find block examples and reference implementations for: ${query}`,
      context: {
        ...context,
        searchQuery: query,
        searchSource: 'block-examples'
      }
    };
  }
};

