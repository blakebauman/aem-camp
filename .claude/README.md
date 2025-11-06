# Claude Code Infrastructure for AEM Edge Delivery Services

This directory contains a comprehensive Claude Code infrastructure that solves the "skills don't activate automatically" problem and scales Claude Code for enterprise development.

## Core Capabilities

**Auto-Activating Skills** - Skills trigger automatically based on prompts and actions
**Specialized Agents** - Complex tasks delegated to expert agents  
**Smart Hooks** - Workflow automation and best practice enforcement
**Quick Commands** - Slash commands for instant common task access
**Persistent Knowledge** - Documentation survives context resets
**Content-First Enforcement** - Prevents code-before-content mistakes
**Comprehensive Examples** - Production-ready block implementations

## Quick Start

### For Developers

**Natural language workflow:**
```
"Create a hero block"
→ Auto-activates content-driven-development
→ Guides through content → implementation → testing
→ Quality gates enforced automatically
```

**Command workflow:**
```bash
/new-block hero              # Start block development
/test-block hero             # Run comprehensive testing
/find-content hero dark      # Find pages using block
/search-docs fragments       # Search AEM documentation
/pr-ready                    # Check PR readiness
```

### For Claude

When you (Claude) start a session:

1. **session-start.js** hook runs automatically
2. Loads persistent docs from `docs/`
3. Discovers skills, agents, commands
4. Sets up development context
5. Ready to work with full project knowledge

Throughout development:

- **user-prompt-submit.js** analyzes user prompts and auto-activates skills
- **pre-tool-use.js** validates operations (e.g., blocks code without content)
- **post-tool-use.js** auto-lints, suggests next steps
- Agents available for complex task delegation

## Directory Structure

```
.claude/
├── README.md           # This file
├── hooks/              # Auto-activation hooks
│   ├── README.md
│   ├── user-prompt-submit.js
│   ├── pre-tool-use.js
│   ├── post-tool-use.js
│   └── session-start.js
├── agents/             # Specialized AI agents
│   ├── README.md
│   ├── block-developer.md
│   ├── content-modeler.md
│   ├── testing-specialist.md
│   └── docs-expert.md
├── skills/             # Development skills
│   ├── content-driven-development/
│   ├── building-blocks/
│   ├── content-modeling/
│   ├── testing-blocks/
│   ├── docs-search/
│   └── block-collection-and-party/
├── commands/           # Slash commands
│   ├── README.md
│   ├── new-block.js
│   ├── test-block.js
│   ├── find-content.js
│   ├── search-docs.js
│   ├── find-examples.js
│   ├── start-server.js
│   └── pr-ready.js
├── docs/               # Persistent documentation
│   ├── README.md
│   ├── architecture.md
│   ├── patterns.md
│   ├── decisions.md
│   └── troubleshooting.md
└── examples/           # Reference implementations
    └── blog/
        ├── README.md
        ├── blocks/
        └── docs/
```

## Skills (Auto-Activating)

Skills are modular development guides that auto-activate based on patterns.

### Available Skills

| Skill | Purpose | Auto-Activates On |
|-------|---------|-------------------|
| **content-driven-development** | Orchestrates complete development workflow | "create block", "modify block" |
| **building-blocks** | Guides block implementation | Used by CDD workflow |
| **content-modeling** | Designs author-friendly structures | "content model", "authoring" |
| **testing-blocks** | Comprehensive testing guidance | "test", "validate", "PR ready" |
| **docs-search** | Searches aem.live documentation | "how to", "AEM feature" |
| **block-collection-and-party** | Finds reference implementations | "find example", "reference" |

### Skill Size (500-Line Rule)

All skills follow the 500-line rule with progressive disclosure:

- Main SKILL.md: < 500 lines (overview, process, key info)
- `resources/`: Detailed guides and references
- Load additional context only when needed

**Current sizes:**
- building-blocks: 199 lines 
- docs-search: 213 lines 
- content-modeling: 234 lines 
- content-driven-development: 294 lines 
- testing-blocks: 295 lines 
- block-collection-and-party: 412 lines 

**See:** Individual skill README files in `skills/*/SKILL.md`

## Agents (Specialized Experts)

Agents are autonomous Claude instances with specialized expertise for complex tasks.

### Available Agents

**Block Developer** (`@block-developer`)
- Complete block development workflows
- Content modeling → Implementation → Testing
- Auto-activates: "create block", "build block"

**Content Modeler** (`@content-modeler`)
- Author-friendly content structure design
- Variant and edge case handling
- Auto-activates: "content model", "authoring structure"

**Testing Specialist** (`@testing-specialist`)
- Comprehensive testing and QA
- Unit, browser, linting, performance
- Auto-activates: "test block", "validate", "PR ready"

**Documentation Expert** (`@docs-expert`)
- AEM documentation search
- Block Collection/Party discovery
- Auto-activates: "how to", "find example"

### Agent Configuration

Agents are **Markdown files with YAML frontmatter** following the [Claude Code format](https://code.claude.com/docs/en/sub-agents#file-format):

```markdown
---
name: agent-name
description: When to use this agent...
tools: Read, Write, Grep  # Optional
model: inherit  # Optional
---

System prompt in Markdown...
```

**Configuration includes:**
- YAML frontmatter (name, description, tools, model)
- System prompt with responsibilities and workflow
- Markdown formatting for clarity
- Optional tool restrictions

**See:** `agents/README.md` for detailed agent documentation

## Hooks (Auto-Activation System)

Hooks automatically trigger at specific workflow points to enforce best practices.

### Active Hooks

**user-prompt-submit.js**
- Analyzes user prompts before processing
- Auto-activates relevant skills
- Suggests agents for complex tasks
- Enforces content-first principles

**pre-tool-use.js**
- Validates before tool execution
- Blocks block code changes without content
- Checks prerequisites
- Provides guidance on violations

**post-tool-use.js**
- Auto-runs linting after code changes
- Suggests next workflow steps
- Tracks progress
- Recommends commits

**session-start.js**
- Loads persistent documentation
- Discovers skills/agents/commands
- Initializes development context
- Provides welcome summary

### How Hooks Solve Problems

**Problem:** Skills don't activate automatically
**Solution:** `user-prompt-submit.js` analyzes prompts and auto-activates

**Problem:** Code written before content exists
**Solution:** `pre-tool-use.js` blocks operations without content

**Problem:** Forgetting to lint after changes
**Solution:** `post-tool-use.js` auto-lints and suggests testing

**Problem:** Context resets lose knowledge
**Solution:** `session-start.js` reloads persistent docs

**See:** `hooks/README.md` for detailed hook documentation

## Commands (Quick Workflows)

Slash commands provide instant access to common workflows.

### Development Commands
- `/new-block <name> [description]` - Start block development workflow
- `/start-server [options]` - Start AEM dev server

### Testing Commands
- `/test-block <name>` - Run comprehensive block testing
- `/pr-ready` - Check if changes ready for pull request

### Content Commands
- `/find-content <block> [variant]` - Find pages using a block

### Documentation Commands
- `/search-docs <query>` - Search AEM documentation
- `/find-examples <query>` - Find reference implementations

### Command vs Skill vs Agent

**Commands (User-Invoked):**
- Explicit `/command-name` invocation
- Quick, focused actions
- Direct control

**Skills (Model-Invoked):**
- Auto-activate via hooks
- Detailed process guidance
- Used within workflows

**Agents (Model-Invoked):**
- Auto-activate or delegated
- Complex multi-step tasks
- Autonomous handling

**See:** `commands/README.md` for detailed command documentation

## Persistent Documentation

Documentation that survives context resets, loaded automatically on session start.

### Available Docs

**architecture.md** (500 lines)
- Complete system architecture
- Directory structure
- Key patterns and principles
- Development workflow
- Performance and testing

**patterns.md** (500 lines)
- Common block decoration patterns
- DOM manipulation patterns
- Image and link handling
- CSS patterns
- Testing patterns

**decisions.md** (300 lines)
- Architecture Decision Records (ADRs)
- Context for key decisions
- Consequences and tradeoffs
- Decision timeline

**troubleshooting.md** (400 lines)
- Common issues and solutions
- Development server problems
- Block issues
- Linting errors
- Performance problems

### Why Persistent Docs Matter

**Problem:** Context resets lose project knowledge
**Solution:** Critical info stored in `docs/`, loaded on session start

**Benefits:**
- Knowledge survives resets
- Consistent understanding
- Single source of truth
- Faster recovery from resets

**See:** `docs/README.md` for documentation system details

## Examples (Reference Implementations)

Comprehensive blog domain examples demonstrate all patterns and best practices.

### Example Blocks

**blog-post-card** - Complete card block
- Content-driven development approach
- Author-friendly content model
- Multiple variants (default, compact, featured)
- Responsive design
- Comprehensive comments

**blog-post-list** - Multiple item display
- Grid/list layouts
- Fragment loading
- Filtering and sorting

**blog-author-bio** - Profile display
- Image handling
- Social link icons
- Multiple variants

**blog-categories** - Category navigation
- List/pills/cloud variants
- Count display
- Link decoration

**blog-hero** - Featured post hero
- Large image handling
- Overlay techniques
- Responsive typography

### Example Benefits

- **Learning:** Progressive difficulty (simple → advanced)
- **Reference:** Production-ready starting points
- **Patterns:** All common patterns demonstrated
- **Testing:** Test content and edge cases included

**See:** `examples/blog/README.md` for all examples

## Configuration

Infrastructure configured via `.clauderc` in project root:

```json
{
  "project": {
    "name": "AEM Edge Delivery Services - Camp",
    "type": "web-application"
  },
  "hooks": {
    "enabled": true,
    "directory": ".claude/hooks"
  },
  "agents": {
    "enabled": true,
    "directory": ".claude/agents"
  },
  "commands": {
    "enabled": true,
    "directory": ".claude/commands"
  },
  "skills": {
    "enabled": true,
    "directory": ".claude/skills"
  },
  "docs": {
    "directory": ".claude/docs",
    "persistAcrossContexts": true
  }
}
```

## Learning Path

### Beginner: Understanding the System

1. Read this README (overview)
2. Review `docs/architecture.md` (project structure)
3. Try commands: `/new-block`, `/search-docs`
4. Review `examples/blog/blog-post-card` (simple example)

### Intermediate: Working with Infrastructure

5. Review `docs/patterns.md` (common patterns)
6. Study hooks: `hooks/README.md`
7. Try natural language: "Create a testimonial block"
8. Review `examples/blog/blog-post-list` (more complex)

### Advanced: Mastering the System

9. Review agents: `agents/README.md`
10. Study decisions: `docs/decisions.md` (why things are this way)
11. Create custom commands/hooks
12. Contribute new patterns to `docs/patterns.md`

## Troubleshooting

### Skills Not Activating

**Check:**
- `.clauderc` has `skills.enabled: true`
- Files exist in `.claude/skills/`
- Hook files in `.claude/hooks/`

**Try:**
- Explicit command: `/new-block`
- Mention skill: "Use content-driven-development"
- Check `.claude/hooks/user-prompt-submit.js`

### Hooks Blocking Workflow

**Why:** Hook is enforcing best practices (e.g., content-first)

**Solution:**
- Follow suggested workflow
- Use proper skill activation
- See `hooks/README.md` for details

**Temporary disable:**
- Rename hook: `pre-tool-use.js.disabled`
- Or disable in `.clauderc`

### Context Reset

**No action needed!**

- `session-start.js` runs automatically
- Persistent docs reload
- Skills/agents/commands rediscovered
- Continue working with full context

### Need Help

**Resources:**
- `docs/troubleshooting.md` - Common issues
- `docs/architecture.md` - System overview  
- `/search-docs <topic>` - Search AEM docs
- Individual README files in each directory

## Reference

### Key Files

- **Project Level:**
  - `AGENTS.md` - Main infrastructure guide for agents
  - `CLAUDE.md` - Quick reference for Claude Code
  - `.clauderc` - Configuration file

- **Infrastructure:**
  - `.claude/README.md` - This file (overview)
  - `.claude/hooks/README.md` - Hook system details
  - `.claude/agents/README.md` - Agent documentation
  - `.claude/commands/README.md` - Command reference
  - `.claude/docs/README.md` - Persistent docs system

- **Skills:**
  - `.claude/skills/*/SKILL.md` - Individual skill guides

- **Examples:**
  - `.claude/examples/blog/README.md` - Example overview
  - `.claude/examples/blog/docs/content-models.md` - Content models

### External Resources

- [Claude Code Documentation](https://code.claude.com/docs)
- [Agent Skills Overview](https://code.claude.com/docs/en/skills)
- [Subagents Guide](https://code.claude.com/docs/en/sub-agents)
- [Hooks Guide](https://code.claude.com/docs/en/hooks-guide)
- [Reference Repository](https://github.com/diet103/claude-code-infrastructure-showcase)

## Success Criteria

This infrastructure successfully addresses:

**Skills don't activate automatically**
→ Solved via `user-prompt-submit.js` hook with pattern matching

**500-line rule with progressive disclosure**
→ All skills < 500 lines, resources for details

**Specialized agents for complex tasks**
→ 4 agents with focused expertise

**Dev docs survive context resets**
→ Persistent docs in `.claude/docs/`, loaded on session start

**Comprehensive examples**
→ Blog domain examples with production-ready code

**Scaled for enterprise**
→ Complete infrastructure, quality gates, automation

---

**This infrastructure transforms Claude Code from a helpful assistant into a comprehensive development platform. Welcome to the future of AI-assisted development!**

