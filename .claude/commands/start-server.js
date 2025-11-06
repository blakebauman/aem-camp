/**
 * /start-server Command
 * 
 * Start the AEM Edge Delivery Services development server.
 * 
 * Usage: /start-server [options]
 * Example: /start-server --html-folder drafts
 */

export default {
  name: 'start-server',
  description: 'Start AEM development server',
  usage: '/start-server [options]',
  category: 'development',
  
  async execute({ args, context }) {
    const options = args.join(' ');
    
    const baseCommand = 'aem up --no-open --forward-browser-logs';
    const command = options ? `${baseCommand} ${options}` : baseCommand;

    const message = [
      '**Starting AEM Development Server**',
      '',
      `Command: \`${command}\``,
      '',
      '**Server Info:**',
      '- URL: http://localhost:3000',
      '- Auto-reload: Enabled',
      '- Browser logs: Forwarded to terminal',
      '',
      options.includes('--html-folder') 
        ? 'Using local HTML folder for content'
        : 'Using remote content from preview/live',
      '',
      '**Common Options:**',
      '- `--html-folder drafts` - Use local HTML files',
      '- `--port 3001` - Use different port',
      '',
      'Starting server...',
      ''
    ].join('\n');

    return {
      success: true,
      message,
      runCommand: command,
      runInBackground: true,
      context: {
        ...context,
        devServerStarted: Date.now(),
        devServerUrl: 'http://localhost:3000'
      }
    };
  }
};

