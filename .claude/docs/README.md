# Persistent Development Documentation

**Purpose:** This directory contains documentation that survives context resets and provides persistent knowledge across Claude Code sessions.

## What's Here

These documents are automatically loaded on session start via the `session-start.js` hook, ensuring critical project knowledge is always available.

### `architecture.md`
**Complete system architecture and overview**

Contains:
- Project overview and principles
- Directory structure
- Key files and their purposes
- Block system deep dive
- Development workflow
- Content authoring
- Performance strategy
- Testing approach
- Deployment pipeline
- Common patterns
- Anti-patterns to avoid

**When to read:** Starting on project, after context reset, when making architectural decisions

---

### `patterns.md`
**Common code patterns and solutions**

Contains:
- Block decoration patterns
- DOM manipulation patterns
- Image handling
- Links and buttons
- Event handlers
- Fragment loading
- Data extraction
- CSS patterns
- Icon usage
- Intersection Observer
- Error handling
- Performance patterns
- Testing examples

**When to read:** Implementing blocks, solving common problems, ensuring consistency

---

### `decisions.md`
**Architecture Decision Records (ADRs)**

Contains:
- Significant decisions made
- Context for each decision
- Consequences and tradeoffs
- Current status
- Rationale for choices

**When to read:** Understanding why things are the way they are, making new decisions that might conflict

---

### `troubleshooting.md`
**Common issues and solutions**

Contains:
- Development server issues
- Block problems
- Linting errors
- Git and PR issues
- Performance problems
- Infrastructure issues

**When to read:** When something isn't working, before debugging from scratch

---

## How This Works

### Automatic Loading

The `session-start.js` hook loads these documents automatically when Claude Code starts:

```javascript
// On session start:
1. Load all .md files from .claude/docs/
2. Parse and make available in context
3. Update session context with loaded docs
```

### Benefits

**Survives Context Resets**
- Knowledge persists across conversations
- No need to re-explain architecture
- Faster recovery from resets

**Single Source of Truth**
- Consistent information
- One place to update
- No conflicting guidance

**Progressive Disclosure**
- Main content loaded automatically
- Details available when needed
- Efficient context usage

**Living Documentation**
- Updated as project evolves
- Captures real decisions and patterns
- Reflects current state

## Maintaining These Docs

### When to Update

Update these documents when:
- Architecture changes significantly
- New patterns become established
- Important decisions are made
- Common problems are solved
- Troubleshooting steps are discovered

### What to Include

**DO include:**
- Information needed across sessions
- Decisions that affect long-term development
- Patterns used repeatedly
- Solutions to common problems
- Project-specific knowledge

**DON'T include:**
- Temporary or one-off information
- External documentation (link instead)
- Overly detailed implementation
- Information that changes frequently

### Keep Docs Concise

Target limits:
- `architecture.md`: ~500 lines
- `patterns.md`: ~500 lines
- `decisions.md`: ~300 lines
- `troubleshooting.md`: ~400 lines

Use progressive disclosure:
- Main docs have overview and key info
- Link to skills/resources for details
- Reference external docs when appropriate

### Update Frequency

- **architecture.md**: When structure changes significantly
- **patterns.md**: When establishing new patterns
- **decisions.md**: When making important decisions
- **troubleshooting.md**: When solving new problems

Mark last update date at top of each file.

## Integration with Infrastructure

### Hooks Integration

- `session-start.js` loads these docs
- `user-prompt-submit.js` can reference doc content
- `pre-tool-use.js` enforces documented decisions

### Skills Integration

Skills can reference these docs:
```markdown
For detailed architecture, see [architecture.md](..docs/architecture.md)
For common patterns, see [patterns.md](..docs/patterns.md)
```

### Agents Integration

Agents have access to loaded docs through context:
```json
{
  "systemPrompt": "You have access to persistent project docs including architecture, patterns, and decisions. Reference these when relevant."
}
```

## Usage in Claude Code

### Referencing Docs

When responding to users, Claude can:
- Reference documented patterns
- Cite architectural decisions
- Link to troubleshooting steps
- Suggest reading specific docs

### After Context Reset

Post-reset, these docs are automatically reloaded, providing:
- Project understanding
- Established patterns
- Previous decisions
- Common solutions

No need for user to re-explain basics.

## Workflow Example

```
1. User starts new session
   └─> session-start.js runs
       └─> Loads docs from .claude/docs/
           └─> Claude has project context

2. User asks: "Create a carousel block"
   └─> user-prompt-submit.js analyzes
       └─> Activates content-driven-development
           └─> References architecture.md for process
               └─> Uses patterns.md for implementation

3. User encounters issue
   └─> Claude references troubleshooting.md
       └─> Provides documented solution
```

## Related Documentation

- [Skills README](../skills/README.md) - Development skills
- [Agents README](../agents/README.md) - Specialized agents
- [Hooks README](../hooks/README.md) - Auto-activation
- [Commands README](../commands/README.md) - Slash commands

## External Resources

- [AEM Live Documentation](https://www.aem.live/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- [AEM Boilerplate](https://github.com/adobe/aem-boilerplate)

---

**This documentation system is a key part of scaling Claude Code for enterprise development. Keep it maintained and up to date.**

