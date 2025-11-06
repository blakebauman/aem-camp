# Claude Code Commands

This directory contains slash commands for quick, common workflows in AEM Edge Delivery Services development. Commands provide shortcuts to activate skills, agents, and run scripts.

## What Are Commands?

Commands are user-invoked shortcuts that:
- Start specific workflows
- Activate relevant agents and skills
- Run common scripts and checks
- Provide quick access to tools

Unlike hooks (which are automatic) and agents (which are model-invoked), **commands are user-invoked** - you explicitly type `/command-name` to trigger them.

## Available Commands

### Development Commands

#### `/new-block`
Start Content-Driven Development workflow for a new block.

```
/new-block <block-name> [description]
```

**Examples:**
```
/new-block hero "Hero banner with video background"
/new-block blog-card
/new-block testimonial-carousel "Rotating testimonial display"
```

**What it does:**
- Validates block name format
- Checks if block already exists
- Activates Block Developer agent
- Starts Content-Driven Development workflow
- Guides through test content creation

---

#### `/start-server`
Start the AEM development server.

```
/start-server [options]
```

**Examples:**
```
/start-server
/start-server --html-folder drafts
/start-server --port 3001
```

**Options:**
- `--html-folder <path>` - Use local HTML files
- `--port <number>` - Use different port
- Any other `aem up` options

---

### Testing Commands

#### `/test-block`
Run comprehensive testing on a block.

```
/test-block <block-name>
```

**Examples:**
```
/test-block hero
/test-block blog-card
```

**What it does:**
- Validates block exists
- Activates Testing Specialist agent
- Runs testing checklist:
  - Code quality (linting)
  - Visual validation (responsive)
  - Functionality testing
  - Performance checks
  - Accessibility validation

---

#### `/pr-ready`
Comprehensive PR readiness check.

```
/pr-ready
```

**What it does:**
- Runs linting checks
- Validates git status and commits
- Checks for test content
- Verifies documentation
- Validates performance considerations
- Activates Testing Specialist agent

---

### Content Commands

#### `/find-content`
Search for pages using a specific block.

```
/find-content <block-name> [variant]
```

**Examples:**
```
/find-content hero
/find-content cards three-up
/find-content hero dark
```

**What it does:**
- Searches site query index
- Finds all pages with specified block
- Optionally filters by variant
- Returns URLs for testing

**Search locations:**
- Local (localhost:3000)
- Preview (*.aem.page)
- Live (*.aem.live)

---

### Documentation Commands

#### `/search-docs`
Search AEM Edge Delivery Services documentation.

```
/search-docs <query>
```

**Examples:**
```
/search-docs lazy loading
/search-docs block decoration
/search-docs fragments
/search-docs metadata
```

**What it does:**
- Activates Documentation Expert agent
- Searches aem.live documentation
- Includes blogs, tutorials, guides
- Returns relevant links and info

---

#### `/find-examples`
Find reference block implementations.

```
/find-examples <query>
```

**Examples:**
```
/find-examples carousel
/find-examples video player
/find-examples tabs accordion
```

**What it does:**
- Activates Documentation Expert agent
- Searches Block Collection (official)
- Searches Block Party (community)
- Returns code examples and patterns

---

## Command Categories

### Development
- `/new-block` - Create new block
- `/start-server` - Start dev server

### Testing
- `/test-block` - Test specific block
- `/pr-ready` - PR readiness check

### Content
- `/find-content` - Find pages using block

### Documentation
- `/search-docs` - Search AEM docs
- `/find-examples` - Find block examples

## Using Commands

### Basic Usage

Simply type the command with a forward slash:

```
/new-block hero
```

### With Arguments

Most commands accept arguments:

```
/new-block hero "Hero with video"
/find-content cards three-up
/search-docs lazy loading images
```

### Command Completion

Claude Code provides autocomplete for commands. Start typing `/` to see available commands.

## Commands vs Skills vs Agents

**Commands (User-Invoked):**
- You explicitly type `/command`
- Immediate, specific action
- Quick workflows and shortcuts
- Direct control

**Skills (Model-Invoked by Hooks):**
- Automatically activated by hooks
- Based on prompt patterns
- Detailed guidance and process
- Used within workflows

**Agents (Model-Invoked):**
- Specialized autonomous handling
- Complex multi-step tasks
- Can be auto-activated or delegated
- Comprehensive expertise

**When to use each:**

| Scenario | Use |
|----------|-----|
| "I want to start creating a new block" | `/new-block` command |
| Natural prompt: "Create a hero block" | Hook auto-activates skill/agent |
| "Test my hero block changes" | `/test-block` command |
| Complex: "Build complete blog system" | Delegate to agent |

## Creating Custom Commands

To create a new command:

1. Create `{command-name}.js` in `.claude/commands/`
2. Export default object with:
   - `name`: Command name (without `/`)
   - `description`: What it does
   - `usage`: Usage syntax
   - `category`: Command category
   - `execute`: Async function

### Example:

```javascript
export default {
  name: 'my-command',
  description: 'Does something useful',
  usage: '/my-command [args]',
  category: 'development',
  
  async execute({ args, context }) {
    // Command logic here
    
    return {
      success: true,
      message: 'Command completed!',
      activateAgent: 'agent-name', // optional
      activateSkill: 'skill-name', // optional
      runCommand: 'shell command', // optional
      context: { /* updated context */ }
    };
  }
};
```

### Return Object Properties:

- `success`: Boolean indicating success/failure
- `message`: Message to display to user
- `activateAgent`: Agent to activate (optional)
- `activateSkill`: Skill to activate (optional)
- `runCommand`: Shell command to execute (optional)
- `runInBackground`: Run command in background (optional)
- `enhancedPrompt`: Modified prompt for Claude (optional)
- `context`: Updated context object (optional)

## Configuration

Commands are configured in `.clauderc`:

```json
{
  "commands": {
    "enabled": true,
    "directory": ".claude/commands"
  }
}
```

## Troubleshooting

### Command not found
- Check file is in `.claude/commands/`
- Verify filename matches command name
- Check export default syntax
- Restart Claude Code

### Command fails
- Check args are provided correctly
- Verify required files/paths exist
- Review error message
- Check command execute function

### Command doesn't activate agent/skill
- Verify agent/skill name is correct
- Check agent/skill exists
- Review return object properties
- Check .clauderc configuration

## Best Practices

**Command Design:**
- Keep commands focused and simple
- Validate inputs early
- Provide helpful error messages
- Return clear success/failure status
- Use consistent message formatting

**Naming:**
- Use kebab-case: `new-block`, not `newBlock`
- Be descriptive: `test-block`, not `test`
- Avoid ambiguity: `find-content`, not `find`
- Keep short but clear

**User Experience:**
- Show what will happen
- Provide examples in error messages
- Give progress updates
- Suggest next steps
- Use icons for quick scanning

**Integration:**
- Activate appropriate agents/skills
- Update context for workflow continuity
- Chain with other commands when needed
- Return relevant information

## Related Documentation

- [Commands Guide](https://code.claude.com/docs/en/commands)
- [Skills Documentation](../skills/README.md)
- [Agents Documentation](../agents/README.md)
- [Hooks Documentation](../hooks/README.md)

