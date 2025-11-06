# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 🚀 Enhanced with Claude Code Infrastructure

This project includes a comprehensive Claude Code infrastructure for scaled enterprise development:

- **Auto-activating skills** via hooks - Skills trigger automatically based on your actions
- **Specialized agents** for complex tasks - Delegate to experts for comprehensive handling  
- **Slash commands** for quick workflows - Type `/` for instant access to common tasks
- **Persistent documentation** - Knowledge survives context resets
- **Content-driven enforcement** - Hooks prevent code-before-content mistakes

### Quick Commands

```bash
/new-block hero          # Start new block workflow
/test-block hero         # Test a block comprehensively
/find-content hero dark  # Find pages using block+variant
/search-docs fragments   # Search AEM documentation
/pr-ready                # Check PR readiness
```

**See `AGENTS.md` for comprehensive infrastructure documentation.**

## Development Commands

```bash
# Install dependencies
npm install

# Linting
npm run lint              # Run both JS and CSS linting
npm run lint:js           # ESLint for JavaScript files
npm run lint:css          # Stylelint for CSS files
npm run lint:fix          # Auto-fix linting issues

# Local development
aem up                    # Start AEM Proxy (requires @adobe/aem-cli)
```

## Architecture

This is an **Adobe Experience Manager (AEM) Edge Delivery Services** project built on the AEM boilerplate. The architecture follows a modern, performant approach to web development:

### Core Structure
- **`scripts/`**: Core JavaScript modules
  - `aem.js`: Main AEM utilities and block management system
  - `scripts.js`: Application entry point and page lifecycle management
  - `delayed.js`: Deferred functionality loading
- **`blocks/`**: Modular UI components (accordion, cards, carousel, header, footer, etc.)
- **`styles/`**: Global CSS and typography

### Block System
The project uses a **block-based architecture** where each component in `blocks/` is a self-contained module with:
- `[block-name].js`: Component logic and decoration
- `[block-name].css`: Component styles

Blocks are automatically discovered and loaded based on DOM structure. The `scripts/aem.js` file handles:
- Block decoration and loading
- Section management
- Image optimization
- Icon and button decoration

### Key Patterns
- **Fragment Loading**: Components can reference content fragments via `/fragments/` URLs
- **Auto-blocking**: Hero blocks are automatically built from h1 + picture combinations
- **Lazy Loading**: Sections and blocks load progressively for performance
- **RUM Integration**: Built-in Real User Monitoring for performance tracking

### Development Workflow
1. Content is authored and stored externally (via AEM authoring)
2. The AEM CLI (`aem up`) serves content locally at `http://localhost:3000`
3. Blocks are developed as independent components in the `blocks/` directory
4. Global functionality goes in `scripts/` modules

### Navigation & Content
- Navigation is loaded as a fragment (typically from `/nav`)
- Breadcrumbs can be enabled via metadata
- Placeholders support internationalization
- Templates and themes applied via metadata

## Claude Code Infrastructure

### 📁 Directory Structure

```
.claude/
├── hooks/           # Auto-activation hooks
│   ├── user-prompt-submit.js    # Auto-activates skills
│   ├── pre-tool-use.js          # Validates before operations
│   ├── post-tool-use.js         # Follows up after operations
│   └── session-start.js         # Initializes sessions
├── agents/          # Specialized AI agents
│   ├── block-developer.json     # Complete block workflows
│   ├── content-modeler.json     # Content structure design
│   ├── testing-specialist.json  # Comprehensive QA
│   └── docs-expert.json         # Documentation search
├── skills/          # Development skills (existing)
│   ├── content-driven-development/
│   ├── building-blocks/
│   ├── content-modeling/
│   ├── testing-blocks/
│   ├── docs-search/
│   └── block-collection-and-party/
├── commands/        # Slash commands
│   ├── new-block.js
│   ├── test-block.js
│   ├── find-content.js
│   ├── search-docs.js
│   ├── find-examples.js
│   ├── start-server.js
│   └── pr-ready.js
├── docs/            # Persistent documentation
│   ├── architecture.md       # System architecture
│   ├── patterns.md          # Code patterns
│   ├── decisions.md         # ADRs
│   └── troubleshooting.md   # Common issues
└── examples/        # Reference implementations
    └── blog/        # Blog domain examples
        ├── blocks/  # Example block implementations
        └── docs/    # Example documentation

.agents/
└── discover-skills  # Script to list available skills
```

### 🎯 Skills (Auto-Activating)

Skills guide development processes and auto-activate based on your prompts:

- **Prompt:** "Create a hero block" → Activates `content-driven-development`
- **Prompt:** "Test my changes" → Activates `testing-blocks`
- **Prompt:** "Design content model" → Activates `content-modeling`
- **Prompt:** "Find carousel examples" → Activates `block-collection-and-party`
- **Prompt:** "How do fragments work?" → Activates `docs-search`

**Discover skills:** Run `./.agents/discover-skills` or check `.claude/skills/`

### 🤖 Agents (Specialized Experts)

Delegate complex tasks to specialized agents:

- **@block-developer** - Complete block development (content → code → testing)
- **@content-modeler** - Author-friendly content structure design
- **@testing-specialist** - Comprehensive testing and QA
- **@docs-expert** - Documentation search and reference discovery

**Usage:** Mention `@agent-name` or let auto-activation handle it

### ⚡ Hooks (Auto-Activation System)

Hooks enforce best practices and provide automatic guidance:

- **user-prompt-submit** - Analyzes prompts, activates relevant skills
- **pre-tool-use** - Validates before operations (e.g., enforces content-first)
- **post-tool-use** - Auto-lints, suggests next steps
- **session-start** - Loads persistent docs, discovers infrastructure

**Benefits:** Skills activate automatically, mistakes prevented before they happen

### 💬 Commands (Quick Workflows)

Slash commands for instant access to common tasks:

```bash
/new-block <name>              # Start block development
/test-block <name>             # Comprehensive testing
/find-content <block> [variant]# Find pages using block
/search-docs <query>           # Search AEM docs
/find-examples <query>         # Find reference blocks
/start-server [options]        # Start dev server
/pr-ready                      # Check PR readiness
```

### 📚 Persistent Documentation

Documentation that survives context resets, loaded automatically:

- **architecture.md** - System overview, structure, patterns
- **patterns.md** - Common code patterns and solutions
- **decisions.md** - Architecture Decision Records (ADRs)
- **troubleshooting.md** - Common issues and fixes

**Location:** `.claude/docs/` - Check there for detailed information

### 🎨 Examples

Blog domain examples demonstrate best practices:

- **blog-post-card** - Complete card block with variants
- **blog-post-list** - Grid/list with multiple items
- **blog-author-bio** - Profile with social links
- **blog-categories** - Category navigation
- **blog-hero** - Featured post hero

**Location:** `.claude/examples/blog/`

## Working with the Infrastructure

### First Time Setup

1. Infrastructure is already configured via `.clauderc`
2. Skills, agents, hooks, and commands are ready to use
3. Start working naturally - infrastructure activates automatically

### Daily Workflow

**Creating a block:**
```
Option 1 (Command): /new-block testimonial "Testimonial carousel"
Option 2 (Natural): "Create a testimonial carousel block"
→ Infrastructure auto-activates content-driven-development
→ Guides through content → implementation → testing
```

**Testing changes:**
```
Option 1 (Command): /test-block testimonial
Option 2 (Natural): "Test my testimonial block"
→ Infrastructure auto-activates testing-blocks
→ Runs comprehensive validation
```

**Finding content:**
```
Command: /find-content hero dark
→ Searches site for pages using hero block with dark variant
```

**Searching docs:**
```
Option 1 (Command): /search-docs lazy loading
Option 2 (Natural): "How do I implement lazy loading?"
→ Infrastructure auto-activates docs-search
→ Searches aem.live documentation
```

### Content-First Enforcement

The `pre-tool-use.js` hook **blocks** block code changes without test content:

```javascript
// ❌ This will be prevented
1. Try to write block code
2. Hook detects no content-driven-development active
3. Blocks operation, suggests proper workflow

// ✅ This is the correct flow
1. Use /new-block or "Create a block"
2. Content-driven-development activates
3. Guide creates/identifies test content
4. THEN code can be written
```

**Why?** Prevents wasted effort on code that may need rework when real content reveals issues.

### After Context Reset

When context resets occur:

1. **session-start.js** hook runs automatically
2. Loads persistent documentation from `.claude/docs/`
3. Discovers available skills, agents, commands
4. You continue working with full project knowledge
5. No need to re-explain architecture or patterns

### Troubleshooting

**Skills not activating?**
- Check `.clauderc` has `skills.enabled: true`
- Try explicit command: `/new-block`
- Check `.claude/skills/` directory exists

**Hooks blocking workflow?**
- Hook is enforcing best practices
- Follow suggested workflow (usually content-driven-development)
- See `.claude/hooks/README.md` for details

**Need help?**
- Check `.claude/docs/troubleshooting.md`
- Review `.claude/docs/architecture.md`
- Search docs: `/search-docs <topic>`

## Reference Documentation

Comprehensive documentation available in:

- **`AGENTS.md`** - Complete infrastructure guide
- **`.claude/hooks/README.md`** - Hook system details
- **`.claude/agents/README.md`** - Agent documentation
- **`.claude/commands/README.md`** - Command reference
- **`.claude/skills/*/SKILL.md`** - Individual skill guides
- **`.claude/docs/`** - Persistent project knowledge
- **`.claude/examples/blog/`** - Reference implementations