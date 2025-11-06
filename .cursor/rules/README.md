# Cursor Rules for AEM Edge Delivery Services

This directory contains Cursor rules translated from the comprehensive Claude Code infrastructure in `.claude/`.

## Overview

The `.claude/` directory contains a sophisticated development infrastructure designed for Claude Code, including hooks, agents, commands, and skills. Since Cursor uses a different rule system, this directory provides equivalent **static rules** that capture the key knowledge and patterns.

## Mapping: Claude → Cursor

### What Translates Well 

| Claude System | Cursor Equivalent | Status |
|---------------|-------------------|--------|
| **Skills** (development guides) | `.mdc` rule files | Created |
| **Docs** (persistent knowledge) | `.mdc` rule files | Created |
| **Patterns** (code examples) | `.mdc` rule files | Created |
| **Decisions** (ADRs) | `.mdc` rule files | Created |

### What Doesn't Translate ERROR: 

| Claude System | Why Not Applicable |
|---------------|-------------------|
| **Hooks** | Runtime JS for Claude Code auto-activation |
| **Commands** | Slash commands specific to Claude Code |
| **Agents** | Sub-agent system specific to Claude Code |
| **Scripts** | Node.js scripts for Claude Code workflows |

## Created Cursor Rules

### Always Applied (Core Knowledge)

These rules are always active and provide foundational knowledge:

#### `aem-edge-delivery.mdc`
- **Source**: Original Cursor rule + Updated with rule navigation
- **Purpose**: Quick reference for common AEM tasks, coding standards, essential commands
- **Always Applied**: Yes
- **Key Feature**: Includes navigation to all specialized rules at the top

#### `architecture.mdc`
- **Source**: `.claude/docs/architecture.md`
- **Purpose**: Complete system architecture, directory structure, deployment pipeline
- **Always Applied**: Yes

### Context-Specific Rules (Apply as Needed)

These rules provide detailed guidance for specific tasks:

#### `content-driven-development.mdc`
- **Source**: `.claude/skills/content-driven-development/SKILL.md`
- **Purpose**: Mandatory content-first development workflow
- **When to Use**: All development tasks (blocks, core functionality, modifications)
- **Always Applied**: ERROR: No (apply when needed)

#### `building-blocks.mdc`
- **Source**: `.claude/skills/building-blocks/SKILL.md`
- **Purpose**: Block implementation patterns, decoration, styling
- **When to Use**: Creating or modifying blocks
- **Always Applied**: ERROR: No (apply when building blocks)

#### `content-modeling.mdc`
- **Source**: `.claude/skills/content-modeling/SKILL.md`
- **Purpose**: Designing author-friendly content structures
- **When to Use**: Designing content models for new/modified blocks
- **Always Applied**: ERROR: No (apply when modeling content)

#### `testing-blocks.mdc`
- **Source**: `.claude/skills/testing-blocks/SKILL.md`
- **Purpose**: Testing strategies, quality assurance, PR preparation
- **When to Use**: Testing code, preparing PRs
- **Always Applied**: ERROR: No (apply when testing)

#### `patterns.mdc`
- **Source**: `.claude/docs/patterns.md`
- **Purpose**: Common code patterns and solutions
- **When to Use**: Reference for common implementations
- **Always Applied**: ERROR: No (reference as needed)

#### `decisions.mdc`
- **Source**: `.claude/docs/decisions.md`
- **Purpose**: Architecture Decision Records (ADRs), rationale for key decisions
- **When to Use**: Understanding why things are the way they are
- **Always Applied**: ERROR: No (reference for context)

## How to Use Cursor Rules

### In Cursor IDE

1. **Mention rules in chat**: `@content-driven-development help me create a hero block`
2. **Reference in prompts**: "Following the building-blocks pattern, create a carousel"
3. **Rules auto-activate**: Always-applied rules are loaded automatically

### Always-Applied vs Context-Specific

**Always-Applied Rules** (`alwaysApply: true`):
- Loaded into every conversation
- Provide foundational knowledge
- Keep these minimal to avoid context bloat

**Context-Specific Rules** (`alwaysApply: false`):
- Loaded only when explicitly mentioned or relevant
- Provide detailed guidance for specific tasks
- Can be more comprehensive

## Differences from Claude Code Infrastructure

### What You Lose (Moving from Claude to Cursor)

1. **Auto-Activation**: Claude hooks automatically trigger skills based on prompts
   - **Workaround**: Explicitly mention rules in Cursor prompts

2. **Quality Gates**: Claude pre-tool-use hook prevents code-before-content
   - **Workaround**: Manually follow Content-Driven Development process

3. **Slash Commands**: Quick `/new-block`, `/test-block` commands in Claude
   - **Workaround**: Use natural language in Cursor

4. **Specialized Agents**: Claude can delegate to expert agents
   - **Workaround**: Mention specific rules for focused expertise

5. **Session Persistence**: Claude session-start hook auto-loads docs
   - **Workaround**: Always-applied rules provide core knowledge

### What's the Same ✓

1. **Core Knowledge**: Same architecture, patterns, and principles
2. **Development Process**: Same Content-Driven Development workflow
3. **Code Standards**: Same linting, testing, performance requirements
4. **Best Practices**: Same anti-patterns, checklists, and guidelines

## Using Both Systems

If you're working with both Claude Code and Cursor:

### In Claude Code
- Full infrastructure active (hooks, agents, commands, skills)
- Skills auto-activate based on prompts
- Content-first enforced by hooks
- Slash commands available

### In Cursor
- Reference static rules explicitly
- Follow Content-Driven Development manually
- Use natural language instead of slash commands
- Mention specific rules for focused guidance

## Workflow Comparison

### Creating a New Block

**In Claude Code:**
```
User: "Create a testimonial carousel block"

→ Hook analyzes prompt
→ Auto-activates content-driven-development skill
→ Guides through content → implementation → testing
→ Pre-tool-use hook blocks code without content
→ Post-tool-use hook auto-lints
```

**In Cursor:**
```
User: "@content-driven-development @building-blocks Create a testimonial carousel block"

→ Rules loaded into context
→ AI follows Content-Driven Development process
→ User manually ensures content exists first
→ User manually runs linting
```

## Maintenance

### Keeping Rules in Sync

When updating `.claude/` infrastructure:

1. **Skills updated** → Update corresponding `.mdc` files
2. **Docs updated** → Update `architecture.mdc`, `patterns.mdc`, `decisions.mdc`
3. **New patterns** → Add to `patterns.mdc`
4. **New decisions** → Add to `decisions.mdc`

### Adding New Rules

When creating new Cursor rules:

```markdown
---
alwaysApply: false
description: Brief description of rule purpose
---

# Rule Title

Content here...
```

**Naming convention:** Use kebab-case matching the concept (e.g., `content-modeling.mdc`)

## Quick Reference

### For Content-First Development
→ Use `@content-driven-development`

### For Block Implementation
→ Use `@building-blocks` + `@patterns`

### For Content Structure Design
→ Use `@content-modeling`

### For Testing and QA
→ Use `@testing-blocks`

### For Understanding Architecture
→ Read `architecture.mdc` (always applied)

### For Code Patterns
→ Reference `patterns.mdc`

### For Decision Context
→ Read `decisions.mdc`

## Resources

### Claude Code Infrastructure
- **Full Documentation**: See `.claude/README.md`
- **Skills**: `.claude/skills/*/SKILL.md`
- **Persistent Docs**: `.claude/docs/`
- **Examples**: `.claude/examples/blog/`

### AEM Documentation
- [AEM Live](https://www.aem.live/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Block Collection](https://github.com/adobe/aem-block-collection)
- [Block Party](https://block-party.aem.live/)

---

**Note:** This Cursor rules system is a static adaptation of the dynamic Claude Code infrastructure. Both systems share the same knowledge and principles, but Claude Code provides additional automation and enforcement through hooks and agents.

