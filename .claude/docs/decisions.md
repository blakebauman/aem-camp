# Architecture Decision Records

**Last Updated:** 2025-11-06
**Survives Context Resets:** Yes - Loaded on session start

This document records significant architectural and design decisions made for this project. Understanding these decisions helps maintain consistency and avoid revisiting resolved questions.

## ADR Format

Each decision includes:
- **Context**: Why the decision was needed
- **Decision**: What was decided
- **Consequences**: Impact of the decision
- **Status**: Active, Superseded, or Deprecated

---

## ADR-001: Enforce Content-Driven Development via Hooks

**Date:** 2025-11-06
**Status:** Active

### Context
Developers were sometimes writing block code before creating or identifying test content, leading to:
- Assumptions about content structure that didn't match author needs
- Time wasted creating test content retroactively
- Blocks that were developer-friendly but author-hostile
- Delayed PRs waiting for test content URLs

### Decision
Implement `pre-tool-use.js` hook that blocks file writes to block code (`blocks/**/*.js`, `blocks/**/*.css`) unless Content-Driven Development workflow is active (via context flag).

### Consequences
**Positive:**
- Forces content-first thinking
- Prevents wasted effort on code that may need rework
- Ensures test content exists for validation
- Improves author experience by starting with their needs

**Negative:**
- Adds friction for experienced developers who know they have content
- Requires setting context flag (via hook or explicit activation)
- May seem heavy-handed initially

**Mitigation:**
- Allow override via explicit skill activation
- Provide clear error messages guiding to correct workflow
- Document the reasoning prominently

---

## ADR-002: Auto-Activate Skills via Prompt Pattern Matching

**Date:** 2025-11-06
**Status:** Active

### Context
Skills weren't activating automatically - developers had to explicitly invoke them, leading to:
- Skills being forgotten or not used
- Inconsistent application of best practices
- Loss of skill benefits (guidance, orchestration, quality gates)

### Decision
Implement `user-prompt-submit.js` hook that analyzes user prompts for patterns and auto-activates relevant skills:
- "create block" → content-driven-development
- "test changes" → testing-blocks
- "content model" → content-modeling
- etc.

### Consequences
**Positive:**
- Skills activate automatically when relevant
- Developers can use natural language
- Ensures best practices are followed
- Reduces cognitive load (don't have to remember to invoke skills)

**Negative:**
- Pattern matching may activate wrong skill
- Some patterns may be ambiguous
- Developers lose some explicit control

**Mitigation:**
- Use specific patterns, avoid overly broad matches
- Allow manual override and skill selection
- Provide feedback when skills auto-activate

---

## ADR-003: Specialized Agents for Complex Workflows

**Date:** 2025-11-06
**Status:** Active

### Context
Some tasks are complex and span multiple concerns:
- Creating a complete block (content modeling + implementation + testing)
- Comprehensive testing (multiple types, tools, checks)
- Documentation search (multiple sources, cross-referencing)

Single-purpose skills weren't sufficient for these orchestration needs.

### Decision
Create specialized agents with:
- Focused system prompts defining expertise
- Access to relevant skills
- Appropriate tool permissions
- Auto-activation patterns

Agents created:
- `block-developer`: Complete block development
- `content-modeler`: Content structure design
- `testing-specialist`: Comprehensive QA
- `docs-expert`: Documentation and examples

### Consequences
**Positive:**
- Complex tasks handled comprehensively
- Expertise codified in agent prompts
- Clear delegation of responsibilities
- Can work autonomously on multi-step tasks

**Negative:**
- More abstractions to understand
- Potential overlap between agents
- Agent choice may not always be clear

**Mitigation:**
- Clear agent descriptions and use cases
- Auto-activation based on task complexity
- Allow explicit agent delegation
- Document when to use which agent

---

## ADR-004: Persistent Dev Docs System

**Date:** 2025-11-06
**Status:** Active

### Context
Context resets in long conversations caused loss of:
- Architecture understanding
- Established patterns
- Decisions and their rationale
- Project-specific knowledge

Developers had to re-explain basics after each reset.

### Decision
Create `.claude/docs/` directory with persistent documentation:
- `architecture.md`: System overview and structure
- `patterns.md`: Common code patterns and solutions
- `decisions.md`: This file - ADRs
- `troubleshooting.md`: Common issues and solutions

Load these docs automatically on session start via `session-start.js` hook.

### Consequences
**Positive:**
- Knowledge survives context resets
- Consistent understanding across sessions
- Faster onboarding after reset
- Single source of truth for project

**Negative:**
- Docs must be kept up to date
- Additional files to maintain
- Increases initial context load

**Mitigation:**
- Keep docs concise and focused
- Update only on significant changes
- Use progressive disclosure (link to details)
- Mark last update date

---

## ADR-005: 500-Line Rule with Progressive Disclosure

**Date:** 2025-11-06
**Status:** Active

### Context
Some skills were becoming very long (200+ lines), making them:
- Hard to scan quickly
- Difficult to maintain
- Overwhelming to read completely
- Slow to load into context

### Decision
Implement 500-line rule for skills:
- Main SKILL.md: Overview, process, key info (< 500 lines)
- `resources/`: Detailed guides, examples, reference material
- Skills reference resources using progressive disclosure
- Load additional context only when needed

### Consequences
**Positive:**
- Skills easier to scan and understand
- Faster to load main skill content
- Details available when needed
- Better organized information

**Negative:**
- Requires refactoring existing skills
- May need to load additional files
- More files to maintain

**Mitigation:**
- Refactor incrementally
- Keep main skill self-sufficient for common cases
- Clear cross-references to resources
- Don't split unnecessarily

---

## ADR-006: Kebab-Case for All Files

**Date:** 2025-11-06
**Status:** Active

### Context
Mixed naming conventions (camelCase, kebab-case) made file discovery inconsistent and harder to remember.

### Decision
Use kebab-case for all files in `.claude/` infrastructure:
- Hooks: `user-prompt-submit.js`, `pre-tool-use.js`
- Agents: `block-developer.json`
- Commands: `new-block.js`, `find-content.js`
- Skills: `content-driven-development/`, `building-blocks/`

### Consequences
**Positive:**
- Consistent naming across project
- Easier to remember and type
- Matches common web conventions
- Better URL friendliness

**Negative:**
- Requires renaming existing files
- May differ from JavaScript conventions (camelCase)

**Mitigation:**
- Apply consistently going forward
- Update documentation to reflect naming
- Use clear examples

---

## ADR-007: Slash Commands for Common Workflows

**Date:** 2025-11-06
**Status:** Active

### Context
Some workflows were frequently needed but not complex enough for full agent delegation:
- Starting a new block
- Testing a block
- Finding content with a block
- Searching documentation

These needed quick, explicit invocation rather than auto-activation.

### Decision
Create slash commands (user-invoked) for common workflows:
- `/new-block` - Start CDD workflow
- `/test-block` - Run testing
- `/find-content` - Search for block usage
- `/search-docs` - Search AEM docs
- `/find-examples` - Find reference implementations
- `/start-server` - Start dev server
- `/pr-ready` - PR readiness check

### Consequences
**Positive:**
- Quick access to common workflows
- Explicit control (user-invoked)
- Consistent command interface
- Can activate agents/skills as needed

**Negative:**
- Another concept to learn (vs just natural language)
- Requires remembering command names
- May duplicate some auto-activation

**Mitigation:**
- Command autocomplete
- Clear command documentation
- Commands complement (not replace) auto-activation
- Use intuitive names

---

## Decision Template

Use this template for new ADRs:

```markdown
## ADR-XXX: Title

**Date:** YYYY-MM-DD
**Status:** Active | Superseded | Deprecated

### Context
Why was this decision needed?

### Decision
What was decided?

### Consequences
**Positive:**
- Benefits

**Negative:**
- Drawbacks

**Mitigation:**
- How to address drawbacks
```

---

**Note:** Update this document when making significant architectural or design decisions that affect the project long-term.

