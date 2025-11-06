# AEM Edge Delivery Services Architecture

**Last Updated:** 2025-11-06
**Survives Context Resets:** ✅ Yes - Loaded on session start

## Project Overview

This is an **Adobe Experience Manager Edge Delivery Services** project built on the AEM boilerplate. The architecture prioritizes performance, author experience, and content-first development.

## Core Architecture Principles

### 1. Content-Driven Development (CDD)
**Authors first, developers second.** All development starts with content and author needs.

- Test content must exist before code
- Content models designed for authors, not developers
- Real content drives development and testing

### 2. Block-Based System
Everything is a **block** - self-contained, reusable components that transform authored content into rich experiences.

- Each block has its own directory in `blocks/`
- Blocks consist of `.js` (decoration logic) and `.css` (styles)
- Blocks are discovered and loaded automatically
- Initial content structure is the contract between authors and developers

### 3. Three-Phase Loading
Pages load in three progressive phases for optimal performance:

1. **Eager**: Critical for LCP (Largest Contentful Paint)
   - First section decoration
   - Above-the-fold content
   
2. **Lazy**: Below-the-fold content
   - Remaining sections
   - Header and footer
   
3. **Delayed**: Non-critical functionality
   - Analytics and marketing tags
   - Third-party scripts

## Directory Structure

```
├── blocks/              # Reusable content blocks
│   └── {block-name}/
│       ├── {block-name}.js    # Block decoration logic
│       └── {block-name}.css   # Block styles
│
├── scripts/             # Core JavaScript
│   ├── aem.js          # Core AEM library (DO NOT MODIFY)
│   ├── scripts.js      # App entry point, page lifecycle
│   └── delayed.js      # Delayed functionality
│
├── styles/              # Global styles
│   ├── styles.css      # Critical styles (eager)
│   └── lazy-styles.css # Additional styles (lazy)
│
├── .claude/             # Claude Code infrastructure
│   ├── hooks/          # Auto-activation hooks
│   ├── agents/         # Specialized agents
│   ├── skills/         # Development skills
│   ├── commands/       # Slash commands
│   └── docs/           # Persistent documentation (this file)
│
└── drafts/              # Local test content (optional)
```

## Key Files

### `scripts/aem.js`
**DO NOT MODIFY** - Core AEM library providing:
- Block decoration system
- Section management
- Image optimization
- Icon and button decoration
- Fragment loading

### `scripts/scripts.js`
Application entry point handling:
- Auto-blocking (e.g., hero blocks from h1+picture)
- Page lifecycle (`loadEager`, `loadLazy`, `loadDelayed`)
- Global utilities
- Custom decoration logic

### `scripts/delayed.js`
Deferred functionality:
- Analytics initialization
- Marketing tags
- Third-party integrations
- Non-critical features

## Block System Deep Dive

### Block Discovery
1. AEM backend delivers HTML with block markers: `<div class="block-name">`
2. `aem.js` discovers all blocks on page
3. Blocks are loaded based on section visibility
4. Block's `decorate(block)` function is called

### Block Decoration Pattern
```javascript
export default async function decorate(block) {
  // 1. Read initial structure (from authors)
  const cells = [...block.children];
  
  // 2. Extract data
  const data = extractData(cells);
  
  // 3. Transform DOM
  block.innerHTML = '';
  block.append(buildNewStructure(data));
  
  // 4. Add behavior (if needed)
  addEventListeners(block);
}
```

### Content Model Contract
The initial HTML structure delivered by AEM is the **content model** - the contract between authors and developers. Changes to this structure can break existing pages.

**Example: Hero Block Content Model**
```
<div class="hero">
  <div>
    <div><picture>...</picture></div>  <!-- Image -->
  </div>
  <div>
    <div><h1>Title</h1></div>          <!-- Title -->
    <div><p>Description</p></div>      <!-- Description -->
    <div><a href="#">CTA</a></div>     <!-- Call to action -->
  </div>
</div>
```

## Development Workflow

### Standard Development Process
1. **Content First**: Create or identify test content
2. **Design Model**: Ensure content model is author-friendly
3. **Find Patterns**: Search for similar blocks
4. **Implement**: Write decoration logic and styles
5. **Test**: Validate with real content
6. **Quality Check**: Linting, accessibility, performance
7. **PR**: Include test content URL for validation

### Skills Orchestration
- `content-driven-development` - Orchestrates entire workflow
- `building-blocks` - Implements block code
- `content-modeling` - Designs content structures
- `testing-blocks` - Validates quality
- `block-collection-and-party` - Finds reference implementations
- `docs-search` - Searches AEM documentation

## Content Authoring

### Authoring Interfaces
- **Google Docs/SharePoint**: Document-based authoring
- **Document Authoring (DA)**: Sidekick-enhanced authoring
- **Universal Editor**: WYSIWYG editing
- **GitHub**: Direct code/content editing

### Content Delivery
1. Author creates/edits content
2. Content published to preview: `*.aem.page`
3. Content approved and published to live: `*.aem.live`
4. CDN caches and delivers content globally

### Metadata and Configuration
Pages can include metadata for:
- Page titles and descriptions
- Social sharing
- Robots directives
- Custom scripts and styles
- Template and theme selection

## Performance Strategy

### Core Web Vitals Focus
- **LCP** (Largest Contentful Paint): < 2.5s
  - Eager load first section only
  - Optimize hero images
  - Minimize blocking resources

- **FID** (First Input Delay): < 100ms
  - Minimize JavaScript on initial load
  - Use passive event listeners
  - Defer non-critical scripts

- **CLS** (Cumulative Layout Shift): < 0.1
  - Reserve space for images
  - Avoid DOM shifts during decoration
  - Size placeholders correctly

### Optimization Techniques
- Automatic image optimization (WebP, sizing)
- Lazy loading below-the-fold content
- Progressive enhancement
- Minimal JavaScript payload
- CSS scoped to blocks

## Testing Strategy

### Types of Tests
1. **Manual Testing**: Visual validation, basic functionality
2. **Unit Tests**: Logic-heavy utilities (vitest)
3. **Browser Tests**: Complex interactions (Playwright/Puppeteer)
4. **Performance Tests**: PageSpeed Insights on PR

### Testing Philosophy
- **Keeper Tests**: Maintain for critical functionality
- **Throwaway Tests**: Use for validation, then discard
- Test behavior, not implementation
- Real content = real tests

## Deployment Pipeline

### Environments
- **Local**: `localhost:3000` (dev server with live content)
- **Preview**: `{branch}--{repo}--{owner}.aem.page`
- **Live**: `main--{repo}--{owner}.aem.live`

### PR Workflow
1. Create feature branch
2. Make changes (code syncs to preview automatically)
3. Open PR with preview link in description
4. Automated checks run (linting, PSI)
5. Human review
6. Merge to main
7. Live deployment

## Key Patterns

### Fragment Loading
Load reusable content fragments:
```javascript
const fragment = await loadFragment('/fragments/header');
block.append(fragment);
```

### Variant Handling
Blocks support variants via CSS classes:
```html
<div class="hero dark">...</div>
<div class="cards three-up">...</div>
```

### Icon System
Icons automatically loaded from `/icons/{name}.svg`:
```javascript
// In code
const icon = getIcon('search');

// Or auto-decorated
<span class="icon icon-search"></span>
```

### Responsive Design
Mobile-first with standard breakpoints:
- Mobile: default (< 600px)
- Tablet: `@media (min-width: 600px)`
- Desktop small: `@media (min-width: 900px)`
- Desktop large: `@media (min-width: 1200px)`

## Anti-Patterns to Avoid

❌ **Don't:**
- Modify `scripts/aem.js` (core library)
- Start coding before content exists
- Create developer-friendly but author-hostile models
- Skip linting
- Commit without testing
- Push without PR validation URL
- Use complex build processes
- Add unnecessary dependencies

✅ **Do:**
- Follow Content-Driven Development
- Design for authors
- Keep blocks simple and focused
- Test with real content
- Maintain performance budgets
- Document complex decisions
- Follow existing patterns

## Resources

### Documentation
- [AEM Live Documentation](https://www.aem.live/)
- [Developer Tutorial](https://www.aem.live/developer/tutorial)
- [Anatomy of a Project](https://www.aem.live/developer/anatomy-of-a-project)
- [David's Model](https://www.aem.live/docs/davidsmodel)

### Reference Code
- [AEM Boilerplate](https://github.com/adobe/aem-boilerplate)
- [Block Collection](https://github.com/adobe/aem-block-collection)
- [Block Party](https://block-party.aem.live/)

### Tools
- [@adobe/aem-cli](https://www.npmjs.com/package/@adobe/aem-cli)
- [AEM Sidekick](https://www.aem.live/developer/sidekick)

---

**Note:** This document is loaded automatically on session start and survives context resets. Update it when architecture or patterns change significantly.

