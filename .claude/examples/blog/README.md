# Blog Domain Examples

This directory contains comprehensive examples using a generic blog domain to demonstrate AEM Edge Delivery Services patterns, the Claude Code infrastructure, and content-driven development.

## Purpose

These examples serve as:
- **Reference implementations** for common block patterns
- **Learning resources** for developers new to AEM EDS
- **Testing ground** for Claude Code infrastructure
- **Demonstrations** of content-driven development
- **Templates** for creating similar blocks

## Example Blocks

### 1. Blog Post Card (`blog-post-card`)
**Purpose:** Display a blog post summary with image, title, excerpt, metadata, and CTA

**Demonstrates:**
- Content extraction from table-like structure
- Image optimization and handling
- Date formatting
- Link decoration
- Card-based layouts
- Responsive grid patterns

**Content Model:**
- Row 1: Featured image
- Row 2: Post title
- Row 3: Post excerpt
- Row 4: Author name
- Row 5: Publish date
- Row 6: Read time
- Row 7: CTA link

**Variants:**
- Default (full card)
- Compact (smaller, less detail)
- Featured (larger, highlighted)

---

### 2. Blog Post List (`blog-post-list`)
**Purpose:** Display multiple blog posts in a grid or list

**Demonstrates:**
- Multiple item processing
- Fragment loading for posts
- Grid/list layout toggle
- Filtering and sorting
- Pagination patterns
- Loading states

**Content Model:**
- Multiple rows, each linking to a blog post card
- Optional: Filter configuration
- Optional: Display preferences (grid vs list)

**Variants:**
- Grid (cards in grid)
- List (vertical list)
- Masonry (Pinterest-style)

---

### 3. Blog Author Bio (`blog-author-bio`)
**Purpose:** Display author information with photo, bio, and social links

**Demonstrates:**
- Profile information display
- Icon integration (social media)
- Link decoration
- Image handling (profile photos)

**Content Model:**
- Row 1: Author photo
- Row 2: Author name
- Row 3: Author bio
- Row 4: Social links (multiple)

**Variants:**
- Inline (compact, in-content)
- Sidebar (larger, sidebar placement)
- Card (standalone card format)

---

### 4. Blog Categories (`blog-categories`)
**Purpose:** Display blog categories with post counts

**Demonstrates:**
- Navigation patterns
- Count display
- Link decoration
- Tag/category styling

**Content Model:**
- Multiple rows: category name | post count | link

**Variants:**
- List (vertical list)
- Pills (horizontal pills/tags)
- Cloud (tag cloud style)

---

### 5. Blog Hero (`blog-hero`)
**Purpose:** Featured blog post hero with large image and overlay text

**Demonstrates:**
- Hero patterns
- Overlay techniques
- Large image handling
- Responsive typography
- CTA placement

**Content Model:**
- Row 1: Background image
- Row 2: Post title
- Row 3: Post excerpt
- Row 4: Author & date
- Row 5: CTA

**Variants:**
- Default (centered overlay)
- Left (content left-aligned)
- Right (content right-aligned)
- Minimal (minimal overlay)

---

## Test Content

Test content for each block is provided in:
- `test-content/` - HTML files for local testing
- Examples demonstrate real blog content (no lorem ipsum)
- Multiple variants shown for each block
- Edge cases included (long titles, missing images, etc.)

## Usage

### Viewing Examples

1. Copy example block to your project:
   ```bash
   cp -r .claude/examples/blog/blocks/blog-post-card blocks/
   ```

2. Start dev server with local content:
   ```bash
   aem up --html-folder .claude/examples/blog/test-content
   ```

3. View test page:
   ```
   http://localhost:3000/blog-examples
   ```

### Adapting Examples

1. **Understand the content model** - Don't change without reason
2. **Modify decoration logic** - Adapt to your needs
3. **Customize styles** - Match your design system
4. **Test with your content** - Validate with real content

### Learning from Examples

Each example includes:
- **Inline comments** explaining key patterns
- **Variant handling** showing how to support multiple versions
- **Error handling** demonstrating graceful degradation
- **Accessibility** following WCAG 2.1 AA standards
- **Performance** optimized for Core Web Vitals

## File Structure

```
.claude/examples/blog/
├── README.md                    # This file
├── blocks/                      # Example block implementations
│   ├── blog-post-card/
│   │   ├── blog-post-card.js   # Decoration logic
│   │   └── blog-post-card.css  # Styles
│   ├── blog-post-list/
│   ├── blog-author-bio/
│   ├── blog-categories/
│   └── blog-hero/
├── test-content/                # Test HTML content
│   ├── blog-examples.html      # All examples on one page
│   ├── blog-post-card.html     # Individual block tests
│   ├── blog-post-list.html
│   └── ...
└── docs/                        # Additional documentation
    ├── content-models.md       # Content model specifications
    └── design-system.md        # Design system notes
```

## Content-Driven Development with Examples

### Using Examples in Your Workflow

1. **Start with content model** (see `docs/content-models.md`)
2. **Review example implementation** matching your needs
3. **Adapt to your requirements** while preserving author-friendliness
4. **Test with your content** using your CMS
5. **Customize styles** for your brand
6. **Validate thoroughly** using testing-blocks skill

### Example-Driven Learning Path

**Beginner:**
1. Start with `blog-post-card` (simple, self-contained)
2. Study the code comments
3. Experiment with modifications
4. Create your own card-based block

**Intermediate:**
5. Move to `blog-post-list` (multiple items, more complex)
6. Understand fragment loading patterns
7. Learn filtering and sorting techniques
8. Create your own list-based block

**Advanced:**
9. Study `blog-hero` (advanced layout and styling)
10. Learn performance optimization techniques
11. Understand responsive design patterns
12. Create complex custom blocks

## Claude Code Infrastructure Demonstrations

### Skills in Action

Examples demonstrate how skills guide development:

**content-driven-development:**
- Each example started with content model design
- Test content created before code
- Validates content-first approach

**building-blocks:**
- Clean, commented implementation
- Follows decoration patterns
- Uses established CSS conventions

**content-modeling:**
- Author-friendly content structures
- Variant support
- Edge case handling

**testing-blocks:**
- Linting compliance
- Accessibility standards
- Performance considerations

### Hooks in Action

These examples trigger hooks:

**user-prompt-submit:**
- "Create a blog post card" → Auto-activates CDD
- "Test blog hero block" → Auto-activates testing
- "Find blog card examples" → Activates block-collection

**pre-tool-use:**
- Prevents modifying blocks without content
- Enforces content-first workflow

**post-tool-use:**
- Auto-lints after code changes
- Suggests next steps after implementation

### Agents in Action

Examples work well with agents:

**block-developer:**
- Handles complete block development
- From content model through testing
- Follows all best practices

**content-modeler:**
- Designs author-friendly structures
- Considers variants and edge cases
- Documents authoring guidelines

**testing-specialist:**
- Validates implementations
- Runs comprehensive checks
- Prepares for PR

**docs-expert:**
- Finds similar patterns
- References documentation
- Discovers solutions

### Commands in Action

Use commands with examples:

```bash
/new-block blog-post-card "Display blog post summaries"
/test-block blog-post-card
/find-content blog-post-card
/find-examples card layout
```

## Best Practices Demonstrated

### Code Quality
✅ Clean, readable code
✅ Comprehensive comments
✅ ESLint compliant
✅ Stylelint compliant

### Content Models
✅ Author-friendly structures
✅ Clear, logical organization
✅ Support for variants
✅ Handle edge cases

### Performance
✅ Optimized images
✅ Lazy loading where appropriate
✅ Minimal JavaScript
✅ CSS scoped to blocks

### Accessibility
✅ Semantic HTML
✅ ARIA labels where needed
✅ Keyboard navigation
✅ Screen reader friendly

### Responsive Design
✅ Mobile-first approach
✅ Standard breakpoints
✅ Flexible layouts
✅ Touch-friendly targets

## Common Patterns Shown

1. **Content Extraction**
   - Reading initial structure
   - Safe text/attribute retrieval
   - Handling optional content

2. **DOM Transformation**
   - Building new structures
   - Preserving optimizations
   - Clean replacement

3. **Image Handling**
   - Optimized pictures
   - Proper alt text
   - Responsive images

4. **Link Decoration**
   - Button styling
   - Link enhancement
   - Accessible links

5. **Variant Handling**
   - Reading variant classes
   - Conditional logic
   - CSS variations

6. **Error Handling**
   - Graceful degradation
   - Fallback content
   - Console warnings

## Contributing Examples

To add new examples:

1. **Follow existing patterns** in structure and style
2. **Include comprehensive comments** explaining key concepts
3. **Provide test content** with multiple variants
4. **Document content model** in `docs/content-models.md`
5. **Ensure quality** - linting, accessibility, performance
6. **Test thoroughly** with various content scenarios

## Related Resources

- [Architecture Documentation](../../docs/architecture.md)
- [Common Patterns](../../docs/patterns.md)
- [Building Blocks Skill](../../skills/building-blocks/SKILL.md)
- [Content Modeling Skill](../../skills/content-modeling/SKILL.md)

---

**These examples are designed to be production-ready starting points. Adapt them to your specific needs while maintaining the quality standards demonstrated.**

