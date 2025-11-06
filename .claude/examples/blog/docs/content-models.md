# Blog Domain Content Models

This document specifies the content models for all blog-related blocks. Content models are the contract between authors and developers - changes here affect all pages using these blocks.

## Design Principles

When designing these content models, we prioritized:

1. **Author Experience** - Easy to understand and use
2. **Consistency** - Similar patterns across blocks
3. **Flexibility** - Support variants and edge cases
4. **Simplicity** - Minimal required fields
5. **Forgiving** - Graceful handling of missing content

## Blog Post Card

**Purpose:** Display a single blog post summary

**Visual:** Card with image, title, excerpt, metadata, and CTA

### Content Structure

| Row | Content | Element | Required | Notes |
|-----|---------|---------|----------|-------|
| 1 | Featured Image | `<picture>` | Yes | Optimized by AEM |
| 2 | Title | Heading or `<p>` | Yes | Becomes `<h3>` |
| 3 | Excerpt | `<p>` | Yes | Brief summary |
| 4 | Author | `<p>` | No | Author name |
| 5 | Date | `<p>` | No | Publish date |
| 6 | Read Time | `<p>` | No | e.g., "5 min read" |
| 7 | CTA Link | `<a>` | No | Link to full post |

### Authoring Example (Table in Google Docs)

```
| Featured Image                              |
| Hero image for the blog post                |
| https://example.com/images/blog-post.jpg    |
| Mastering CSS Grid Layout                   |
| Learn how to create complex layouts with... |
| Jane Doe                                    |
| 2025-11-06                                  |
| 8 min read                                  |
| Read More (https://example.com/blog/post)   |
```

### Variants

**Default:**
- Block name: "Blog Post Card"
- Full card with all details

**Compact:**
- Block name: "Blog Post Card (compact)"
- Smaller, reduced details
- 2-line excerpt truncation

**Featured:**
- Block name: "Blog Post Card (featured)"
- Larger, highlighted
- Prominent border
- Larger image aspect ratio

### Edge Cases Handled

- Missing image: Gray placeholder shown
- Long title: Wraps naturally
- Missing metadata: Layout adjusts
- No CTA: Card still functional
- Invalid date: Shows original text

### Accessibility

- `role="article"` on block
- `aria-label` with post title
- Alt text on images (from picture element)
- Semantic heading structure

---

## Blog Post List

**Purpose:** Display multiple blog post cards

**Visual:** Grid or list of blog post cards

### Content Structure

| Row | Content | Element | Required | Notes |
|-----|---------|---------|----------|-------|
| 1 | Configuration | Text | No | Optional display settings |
| 2+ | Post Card | Link to fragment | Yes | Each row is a post |

### Authoring Example

```
| display: grid, items: 6                     |
| /fragments/blog/posts/post-1                |
| /fragments/blog/posts/post-2                |
| /fragments/blog/posts/post-3                |
| /fragments/blog/posts/post-4                |
| /fragments/blog/posts/post-5                |
| /fragments/blog/posts/post-6                |
```

**Alternative (Simpler):**
```
| /fragments/blog/posts/post-1                |
| /fragments/blog/posts/post-2                |
| /fragments/blog/posts/post-3                |
```

### Configuration Options (Optional Row 1)

Parse configuration from first row if it starts with key:value pairs:

- `display: grid|list|masonry` - Layout mode
- `items: N` - Number of items to show
- `columns: N` - Grid column count
- `sort: date|title` - Sort order

### Variants

**Grid (default):**
- Block name: "Blog Post List"
- Responsive grid layout

**List:**
- Block name: "Blog Post List (list)"
- Vertical list layout

**Masonry:**
- Block name: "Blog Post List (masonry)"
- Pinterest-style masonry grid

### Edge Cases Handled

- Single post: Shows as single card
- Many posts: Paginated or show all
- Missing fragments: Shows placeholder
- Mixed content: Filters non-post content

---

## Blog Author Bio

**Purpose:** Display author information

**Visual:** Author photo with bio and social links

### Content Structure

| Row | Content | Element | Required | Notes |
|-----|---------|---------|----------|-------|
| 1 | Photo | `<picture>` | No | Profile photo |
| 2 | Name | Heading or `<p>` | Yes | Author name |
| 3 | Bio | `<p>` | Yes | Short biography |
| 4+ | Social Links | `<a>` | No | Multiple allowed |

### Authoring Example

```
| Author photo                                |
| https://example.com/authors/jane-doe.jpg    |
| Jane Doe                                    |
| Jane is a web developer and technical...    |
| Twitter (https://twitter.com/janedoe)       |
| LinkedIn (https://linkedin.com/in/janedoe)  |
| GitHub (https://github.com/janedoe)         |
```

### Social Link Detection

Automatically detects and adds icons for:
- Twitter / X
- LinkedIn
- GitHub
- Facebook
- Instagram
- Website (generic link icon)

### Variants

**Inline:**
- Block name: "Blog Author Bio"
- Compact, in-content placement

**Sidebar:**
- Block name: "Blog Author Bio (sidebar)"
- Larger, sidebar placement

**Card:**
- Block name: "Blog Author Bio (card)"
- Standalone card format

---

## Blog Categories

**Purpose:** Display blog categories with counts

**Visual:** List or pills showing categories

### Content Structure

| Row | Content | Required | Notes |
|-----|---------|----------|-------|
| 1+ | Category Name \| Count \| Link | Yes | Pipe-separated |

### Authoring Example

```
| Web Development | 42 | /blog/category/web-dev     |
| JavaScript | 28 | /blog/category/javascript      |
| CSS | 19 | /blog/category/css                |
| Performance | 15 | /blog/category/performance     |
| Accessibility | 12 | /blog/category/accessibility |
```

**Alternative (Simpler):**
```
| Web Development (https://example.com/blog/category/web-dev)     |
| JavaScript (https://example.com/blog/category/javascript)       |
| CSS (https://example.com/blog/category/css)                     |
```
Count can be auto-calculated or omitted.

### Variants

**List:**
- Block name: "Blog Categories"
- Vertical list with counts

**Pills:**
- Block name: "Blog Categories (pills)"
- Horizontal pills/tags

**Cloud:**
- Block name: "Blog Categories (cloud)"
- Tag cloud with size based on count

---

## Blog Hero

**Purpose:** Featured blog post hero with large image

**Visual:** Large background image with overlay text

### Content Structure

| Row | Content | Element | Required | Notes |
|-----|---------|---------|----------|-------|
| 1 | Background Image | `<picture>` | Yes | Full-width hero image |
| 2 | Title | Heading | Yes | Post title |
| 3 | Excerpt | `<p>` | No | Post summary |
| 4 | Metadata | `<p>` | No | Author & date |
| 5 | CTA | `<a>` | No | Read more link |

### Authoring Example

```
| Hero background                             |
| https://example.com/images/hero-bg.jpg      |
| The Future of Web Development               |
| Exploring the latest trends and technologies that are shaping... |
| By Jane Doe • Nov 6, 2025                   |
| Read Full Article (https://example.com/blog/future-of-web) |
```

### Variants

**Default:**
- Block name: "Blog Hero"
- Centered overlay

**Left:**
- Block name: "Blog Hero (left)"
- Content left-aligned

**Right:**
- Block name: "Blog Hero (right)"
- Content right-aligned

**Minimal:**
- Block name: "Blog Hero (minimal)"
- Minimal overlay, focus on image

### Accessibility

- `role="banner"` on hero
- Sufficient color contrast on overlay
- Alt text on background image
- Keyboard accessible CTA

---

## General Guidelines

### For All Blocks

**Images:**
- Use picture elements (AEM auto-optimizes)
- Always include alt text
- Use appropriate aspect ratios

**Links:**
- Use descriptive text (not "click here")
- Include destination in parentheses if needed
- Mark external links appropriately

**Text:**
- Keep titles concise (< 80 characters)
- Excerpts should be 1-2 sentences
- Metadata in consistent format

**Optional Fields:**
- Block should work with only required fields
- Layout adjusts when optional fields missing
- No broken layout with partial content

### Content Quality

**DO:**
- ✅ Use real, meaningful content
- ✅ Provide complete required fields
- ✅ Test with edge cases (long titles, etc.)
- ✅ Include descriptive alt text
- ✅ Use consistent date formats

**DON'T:**
- ❌ Use "lorem ipsum" placeholder text
- ❌ Leave required fields empty
- ❌ Use overly long titles (>100 chars)
- ❌ Forget alt text on images
- ❌ Use ambiguous link text

---

## Version History

**v1.0 (2025-11-06)**
- Initial content models
- Five blog blocks defined
- Variants documented
- Edge cases specified

---

**Note:** These content models are living documents. Update when making changes that affect authoring.

