# Common Patterns and Solutions

**Last Updated:** 2025-11-06
**Survives Context Resets:** Yes - Loaded on session start

This document captures common patterns, solutions, and code snippets used across the project. Reference this for consistency and to avoid reinventing solutions.

## Block Decoration Patterns

### Basic Block Decoration
```javascript
export default function decorate(block) {
  const rows = [...block.children];
  
  rows.forEach((row) => {
    const cells = [...row.children];
    // Process cells
  });
}
```

### Async Block Decoration (for API calls, fragment loading)
```javascript
export default async function decorate(block) {
  // Async operations
  const data = await fetchData();
  const fragment = await loadFragment('/fragments/...');
  
  // Build UI
  block.innerHTML = '';
  block.append(buildUI(data));
}
```

### Block with Variants
```javascript
export default function decorate(block) {
  const variant = [...block.classList].find(cls => 
    ['dark', 'light', 'large'].includes(cls)
  );
  
  if (variant === 'dark') {
    // Dark variant handling
  }
}
```

### Block with Configuration
```javascript
export default function decorate(block) {
  // First row often contains configuration
  const config = block.firstElementChild;
  const configData = {
    title: config.querySelector('h1, h2, h3')?.textContent,
    subtitle: config.querySelector('p')?.textContent,
  };
  
  // Remove config row after reading
  config.remove();
  
  // Process remaining content
  const contentRows = [...block.children];
}
```

## DOM Manipulation Patterns

### Creating Elements with Classes
```javascript
function createDiv(className, content = '') {
  const div = document.createElement('div');
  if (className) div.className = className;
  if (content) div.textContent = content;
  return div;
}
```

### Building Complex Structures
```javascript
function buildCard(data) {
  const card = document.createElement('div');
  card.className = 'card';
  
  card.innerHTML = `
    <div class="card-image">
      ${data.image ? `<img src="${data.image}" alt="${data.title}">` : ''}
    </div>
    <div class="card-content">
      <h3>${data.title}</h3>
      <p>${data.description}</p>
      ${data.link ? `<a href="${data.link}" class="button">Learn More</a>` : ''}
    </div>
  `;
  
  return card;
}
```

### Safe Text Extraction
```javascript
function getTextContent(element) {
  return element?.textContent?.trim() || '';
}

function getHref(element) {
  return element?.href || '#';
}

function getSrc(element) {
  return element?.querySelector('img')?.src || '';
}
```

## Image Handling Patterns

### Creating Optimized Picture Elements
```javascript
function createOptimizedPicture(src, alt = '', eager = false, breakpoints = [{ width: '750' }]) {
  const picture = document.createElement('picture');
  
  breakpoints.forEach((br) => {
    const source = document.createElement('source');
    source.type = 'image/webp';
    source.srcset = `${src}?width=${br.width}&format=webply&optimize=medium`;
    source.media = br.media || '';
    picture.appendChild(source);
  });
  
  const img = document.createElement('img');
  img.src = src;
  img.alt = alt;
  if (eager) {
    img.loading = 'eager';
    img.fetchPriority = 'high';
  } else {
    img.loading = 'lazy';
  }
  
  picture.appendChild(img);
  return picture;
}
```

### Preserving Existing Pictures
```javascript
function extractPicture(cell) {
  const picture = cell.querySelector('picture');
  if (picture) {
    // Clone to preserve optimization
    return picture.cloneNode(true);
  }
  return null;
}
```

## Link and Button Patterns

### Creating Buttons
```javascript
function createButton(text, href, variant = 'primary') {
  const a = document.createElement('a');
  a.href = href;
  a.className = `button button-${variant}`;
  a.textContent = text;
  return a;
}
```

### Processing Button Classes
```javascript
function decorateButtons(block) {
  const links = block.querySelectorAll('a');
  links.forEach((link) => {
    const up = link.parentElement;
    const twoup = link.parentElement?.parentElement;
    
    // Check if link should be a button
    if (up.childElementCount === 1 && 
        (up.tagName === 'P' || up.tagName === 'DIV')) {
      link.className = 'button';
      
      // Check for button variants (strong = primary, em = secondary)
      if (up.querySelector('strong')) {
        link.classList.add('button-primary');
      } else if (up.querySelector('em')) {
        link.classList.add('button-secondary');
      }
    }
  });
}
```

## Event Handling Patterns

### Click Handlers
```javascript
function setupClickHandlers(block) {
  const buttons = block.querySelectorAll('.button');
  
  buttons.forEach((button) => {
    button.addEventListener('click', (e) => {
      // Handle click
      console.log('Button clicked', button);
    });
  });
}
```

### Keyboard Accessibility
```javascript
function makeKeyboardAccessible(element, callback) {
  element.setAttribute('tabindex', '0');
  element.setAttribute('role', 'button');
  
  element.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      callback(e);
    }
  });
  
  element.addEventListener('click', callback);
}
```

### Carousel/Slider Navigation
```javascript
function setupCarousel(block) {
  const slides = [...block.querySelectorAll('.slide')];
  let currentSlide = 0;
  
  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }
  
  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }
  
  function prevSlide() {
    currentSlide = (currentSlide - 1 + slides.length) % slides.length;
    showSlide(currentSlide);
  }
  
  // Auto-advance
  const interval = setInterval(nextSlide, 5000);
  
  // Pause on hover
  block.addEventListener('mouseenter', () => clearInterval(interval));
}
```

## Fragment Loading Patterns

### Loading and Decorating Fragments
```javascript
import { loadFragment } from '../scripts/scripts.js';

export default async function decorate(block) {
  const fragmentPath = block.querySelector('a')?.href;
  
  if (fragmentPath) {
    const fragment = await loadFragment(fragmentPath);
    block.innerHTML = '';
    block.append(fragment);
  }
}
```

### Loading Multiple Fragments
```javascript
export default async function decorate(block) {
  const links = [...block.querySelectorAll('a')];
  const fragments = await Promise.all(
    links.map(link => loadFragment(link.href))
  );
  
  block.innerHTML = '';
  fragments.forEach(fragment => {
    const wrapper = document.createElement('div');
    wrapper.className = 'fragment-wrapper';
    wrapper.append(fragment);
    block.append(wrapper);
  });
}
```

## Data Extraction Patterns

### Table-Like Content
```javascript
function extractTableData(block) {
  const rows = [...block.children];
  const data = [];
  
  rows.forEach((row) => {
    const cells = [...row.children];
    data.push({
      key: getTextContent(cells[0]),
      value: getTextContent(cells[1]),
    });
  });
  
  return data;
}
```

### List-Based Content
```javascript
function extractListItems(block) {
  const rows = [...block.children];
  
  return rows.map((row) => {
    const cells = [...row.children];
    return {
      image: cells[0]?.querySelector('picture'),
      title: getTextContent(cells[1]),
      description: getTextContent(cells[2]),
      link: cells[3]?.querySelector('a'),
    };
  });
}
```

## CSS Patterns

### Block Scoping
```css
/* All styles scoped to block */
.my-block {
  padding: 2rem;
}

.my-block .title {
  font-size: 2rem;
}

.my-block .card {
  border: 1px solid #eee;
}
```

### Responsive Grid Patterns
```css
.cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  padding: 2rem;
}

/* Mobile first - single column default */
@media (min-width: 600px) {
  .cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (min-width: 900px) {
  .cards {
    grid-template-columns: repeat(3, 1fr);
  }
}
```

### Variant Styles
```css
.hero {
  background: white;
  color: black;
}

.hero.dark {
  background: black;
  color: white;
}

.hero.large {
  min-height: 80vh;
}
```

### Common Utilities
```css
/* Container */
.hero > div {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

/* Button styles */
.hero .button {
  display: inline-block;
  padding: 0.75rem 1.5rem;
  background: var(--link-color);
  color: white;
  text-decoration: none;
  border-radius: 0.25rem;
}

.hero .button:hover {
  background: var(--link-hover-color);
}
```

## Icon Patterns

### Using Icons
```javascript
import { getIcon } from '../scripts/scripts.js';

// Create icon element
const searchIcon = getIcon('search');
button.prepend(searchIcon);
```

### Icon in Content
```html
<!-- Icons auto-decorated -->
<span class="icon icon-search"></span>
<span class="icon icon-close"></span>
```

## Intersection Observer Patterns

### Lazy Loading Content
```javascript
function setupLazyLoading(block) {
  const items = block.querySelectorAll('.lazy-item');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const item = entry.target;
        item.classList.add('loaded');
        loadItemContent(item);
        observer.unobserve(item);
      }
    });
  }, {
    rootMargin: '50px',
  });
  
  items.forEach(item => observer.observe(item));
}
```

### Animations on Scroll
```javascript
function setupScrollAnimations(block) {
  const elements = block.querySelectorAll('[data-animate]');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, {
    threshold: 0.1,
  });
  
  elements.forEach(el => observer.observe(el));
}
```

## Error Handling Patterns

### Safe Async Operations
```javascript
export default async function decorate(block) {
  try {
    const data = await fetchData();
    renderContent(block, data);
  } catch (error) {
    console.error('Error loading content:', error);
    block.innerHTML = '<p>Unable to load content. Please try again.</p>';
  }
}
```

### Graceful Degradation
```javascript
function decorateWithFallback(block) {
  const requiredElement = block.querySelector('.required');
  
  if (!requiredElement) {
    console.warn('Required element not found, using fallback');
    block.innerHTML = '<p>Content not available</p>';
    return;
  }
  
  // Normal decoration
  decorateNormal(block);
}
```

## Performance Patterns

### Debouncing
```javascript
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Usage
window.addEventListener('resize', debounce(() => {
  recalculateLayout();
}, 250));
```

### Throttling
```javascript
function throttle(func, limit) {
  let inThrottle;
  return function executedFunction(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
}

// Usage
window.addEventListener('scroll', throttle(() => {
  updateScrollPosition();
}, 100));
```

## Testing Patterns

### Unit Test Example (Vitest)
```javascript
import { describe, it, expect } from 'vitest';
import { extractTableData } from './my-block.js';

describe('extractTableData', () => {
  it('should extract data from table structure', () => {
    const mockBlock = document.createElement('div');
    mockBlock.innerHTML = `
      <div>
        <div>Key1</div>
        <div>Value1</div>
      </div>
    `;
    
    const data = extractTableData(mockBlock);
    
    expect(data).toEqual([
      { key: 'Key1', value: 'Value1' }
    ]);
  });
});
```

### Browser Test Example (Playwright)
```javascript
import { test, expect } from '@playwright/test';

test('hero block renders correctly', async ({ page }) => {
  await page.goto('http://localhost:3000/test-page');
  
  const hero = page.locator('.hero');
  await expect(hero).toBeVisible();
  
  const title = hero.locator('h1');
  await expect(title).toContainText('Expected Title');
  
  const button = hero.locator('.button');
  await expect(button).toHaveAttribute('href', '/expected-link');
});
```

---

**Note:** This document captures project-specific patterns. Update it when you establish new patterns or solve common problems in reusable ways.

