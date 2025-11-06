# Claude Code Hooks

This directory contains hooks that automatically trigger at specific points in the Claude Code workflow. Hooks solve the "skills don't activate automatically" problem by proactively suggesting and activating relevant skills based on context.

## Available Hooks

### `user-prompt-submit.js`
**When it runs:** Before Claude processes your prompt

**What it does:**
- Analyzes your prompt for task patterns
- Auto-activates relevant skills (content-driven-development, testing-blocks, etc.)
- Suggests specialized agents for complex tasks
- Enforces content-first principles

**Example triggers:**
- "Create a new hero block" → Auto-activates content-driven-development
- "Test my changes" → Auto-activates testing-blocks
- "Find pages using carousel block" → Suggests find-content command

### `pre-tool-use.js`
**When it runs:** Before any tool execution (file writes, commands, etc.)

**What it does:**
- Validates content-first principles before code changes
- Blocks block modifications without content-driven workflow active
- Checks dev server status
- Reminds about testing before git push

**Example protections:**
- Prevents writing block code without test content
- Warns before pushing without tests
- Ensures linting is scheduled

### `post-tool-use.js`
**When it runs:** After tool execution completes

**What it does:**
- Auto-runs linting after code changes
- Suggests next steps after implementations
- Tracks progress and suggests commits
- Maintains development momentum

**Example actions:**
- Auto-lint after saving .js/.css files
- Suggest testing after block implementation
- Remind to commit after multiple changes

### `session-start.js`
**When it runs:** When you start a new Claude Code session

**What it does:**
- Loads persistent dev docs
- Discovers available skills and agents
- Initializes development context
- Provides welcome summary

**Example initialization:**
- Loads architecture.md, patterns.md, decisions.md
- Lists available skills and agents
- Checks dev environment status

## How Hooks Work Together

```
┌─────────────────────────────────────────────────────────────┐
│ Session Start                                               │
│ └─> session-start.js: Load docs, discover skills           │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ User Types Prompt: "Create a new blog post card block"     │
│ └─> user-prompt-submit.js: Detect pattern, activate CDD    │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Claude Attempts to Write Block Code                        │
│ └─> pre-tool-use.js: Check if CDD active, validate content │
└─────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────┐
│ Code Written Successfully                                   │
│ └─> post-tool-use.js: Auto-lint, suggest testing next      │
└─────────────────────────────────────────────────────────────┘
```

## Configuration

Hooks are configured in `.clauderc`:

```json
{
  "hooks": {
    "enabled": true,
    "directory": ".claude/hooks"
  }
}
```

## Disabling Hooks

To temporarily disable hooks, modify `.clauderc`:

```json
{
  "hooks": {
    "enabled": false
  }
}
```

Or disable individual hooks by renaming them (e.g., `user-prompt-submit.js.disabled`).

## Creating Custom Hooks

See [Claude Code Hooks Documentation](https://code.claude.com/docs/en/hooks-guide) for details on creating your own hooks.

### Available Hook Types

- `user-prompt-submit` - Analyze and enhance user prompts
- `pre-tool-use` - Validate before tool execution
- `post-tool-use` - Follow up after tool execution
- `session-start` - Initialize session context
- `session-end` - Clean up and save context
- `file-change` - React to file system changes
- `git-commit` - Enhance commit messages

## Troubleshooting

### Hooks not triggering
1. Check `.clauderc` has `hooks.enabled: true`
2. Verify hook files are in `.claude/hooks/`
3. Check hook files export a default function
4. Review Claude Code logs for hook errors

### Hook blocking workflow
1. Hooks with `blockExecution: true` will prevent tool use
2. This is intentional for content-first enforcement
3. Follow suggested workflow or temporarily disable hook

## Related Documentation

- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Skills Documentation](../skills/README.md)
- [Agents Documentation](../agents/README.md)

