/**
 * /search-docs Command
 * 
 * Quick command to search AEM Edge Delivery Services documentation.
 * Activates the docs-expert agent with docs-search skill.
 * 
 * Usage: /search-docs [query]
 * Example: /search-docs lazy loading blocks
 */

export default {
  name: 'search-docs',
  description: 'Search AEM Edge Delivery Services documentation',
  usage: '/search-docs [query]',
  category: 'documentation',
  
  async execute({ args, context }) {
    const query = args.join(' ');

    if (!query) {
      return {
        success: false,
        message: [
          'ERROR: Please provide a search query.',
          '',
          'Usage: `/search-docs <query>`',
          '',
          '**Examples:**',
          '- `/search-docs lazy loading`',
          '- `/search-docs block decoration`',
          '- `/search-docs fragments`',
          '- `/search-docs metadata`',
          '',
          '**Search Sources:**',
          '- aem.live documentation',
          '- Developer blogs',
          '- Tutorials and guides',
          '- Best practices'
        ].join('\n')
      };
    }

    const message = [
      `**Searching AEM Documentation for: "${query}"**`,
      '',
      '**Search Coverage:**',
      '- aem.live platform docs',
      '- Developer tutorials',
      '- Blog posts and guides',
      '- API references',
      '',
      'Searching...',
      ''
    ].join('\n');

    return {
      success: true,
      message,
      activateAgent: 'docs-expert',
      activateSkill: 'docs-search',
      enhancedPrompt: `Search the AEM Edge Delivery Services documentation for: ${query}`,
      context: {
        ...context,
        searchQuery: query,
        searchSource: 'aem-docs'
      }
    };
  }
};

