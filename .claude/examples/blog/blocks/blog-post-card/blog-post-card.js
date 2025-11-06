/**
 * Blog Post Card Block
 * 
 * Displays a blog post summary with image, title, excerpt, metadata, and CTA.
 * 
 * Content Model (author-friendly structure):
 * - Row 1: Featured image (picture element)
 * - Row 2: Post title (heading)
 * - Row 3: Post excerpt (paragraph)
 * - Row 4: Author name (text)
 * - Row 5: Publish date (text)
 * - Row 6: Read time (text, e.g., "5 min read")
 * - Row 7: CTA link (link to full post)
 * 
 * Variants:
 * - Default: Full card with all details
 * - Compact: Smaller card, reduced details
 * - Featured: Larger, highlighted card
 * 
 * Example usage in authored content:
 * - Block name: "Blog Post Card"
 * - Add variant class: "Blog Post Card (compact)" or "Blog Post Card (featured)"
 */

/**
 * Safely extracts text content from an element
 * @param {Element} element - The element to extract text from
 * @returns {string} The trimmed text content or empty string
 */
function getTextContent(element) {
  return element?.textContent?.trim() || '';
}

/**
 * Formats a date string into a readable format
 * @param {string} dateString - The date string to format
 * @returns {string} Formatted date or original string if parsing fails
 */
function formatDate(dateString) {
  try {
    const date = new Date(dateString);
    // Format: "Nov 6, 2025"
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  } catch {
    // If date parsing fails, return original string
    return dateString;
  }
}

/**
 * Builds the card structure from extracted data
 * @param {Object} data - The extracted card data
 * @returns {DocumentFragment} The built card structure
 */
function buildCard(data) {
  const card = document.createDocumentFragment();

  // Image container
  if (data.image) {
    const imageContainer = document.createElement('div');
    imageContainer.className = 'blog-post-card-image';
    imageContainer.append(data.image);
    card.append(imageContainer);
  }

  // Content container
  const content = document.createElement('div');
  content.className = 'blog-post-card-content';

  // Title
  if (data.title) {
    const title = document.createElement('h3');
    title.className = 'blog-post-card-title';
    title.textContent = data.title;
    content.append(title);
  }

  // Excerpt
  if (data.excerpt) {
    const excerpt = document.createElement('p');
    excerpt.className = 'blog-post-card-excerpt';
    excerpt.textContent = data.excerpt;
    content.append(excerpt);
  }

  // Metadata (author, date, read time)
  if (data.author || data.date || data.readTime) {
    const metadata = document.createElement('div');
    metadata.className = 'blog-post-card-metadata';

    const metaParts = [];
    
    if (data.author) {
      metaParts.push(`<span class="author">${data.author}</span>`);
    }
    
    if (data.date) {
      metaParts.push(`<span class="date">${formatDate(data.date)}</span>`);
    }
    
    if (data.readTime) {
      metaParts.push(`<span class="read-time">${data.readTime}</span>`);
    }

    metadata.innerHTML = metaParts.join('<span class="separator">•</span>');
    content.append(metadata);
  }

  // CTA button
  if (data.link) {
    const ctaContainer = document.createElement('div');
    ctaContainer.className = 'blog-post-card-cta';
    ctaContainer.append(data.link);
    
    // Ensure link is styled as button
    data.link.classList.add('button', 'button-primary');
    
    content.append(ctaContainer);
  }

  card.append(content);

  return card;
}

/**
 * Decorate function - transforms authored content into final structure
 * @param {HTMLElement} block - The block element to decorate
 */
export default function decorate(block) {
  // Get all rows from authored content
  const rows = [...block.children];

  // Validate we have minimum required content
  if (rows.length < 3) {
    console.warn('Blog Post Card: Insufficient content rows. Expected at least 3 (image, title, excerpt).');
    block.innerHTML = '<p>Incomplete blog post card content</p>';
    return;
  }

  // Extract data from content model
  const data = {
    // Row 1: Featured image (preserve the optimized picture element)
    image: rows[0]?.querySelector('picture')?.cloneNode(true),
    
    // Row 2: Title (from heading or first paragraph)
    title: getTextContent(rows[1]?.querySelector('h1, h2, h3, h4, h5, h6, p')),
    
    // Row 3: Excerpt
    excerpt: getTextContent(rows[2]?.querySelector('p')),
    
    // Row 4: Author (optional)
    author: rows[3] ? getTextContent(rows[3].querySelector('p')) : '',
    
    // Row 5: Date (optional)
    date: rows[4] ? getTextContent(rows[4].querySelector('p')) : '',
    
    // Row 6: Read time (optional)
    readTime: rows[5] ? getTextContent(rows[5].querySelector('p')) : '',
    
    // Row 7: CTA link (optional)
    link: rows[6]?.querySelector('a')?.cloneNode(true),
  };

  // Detect variant
  const variant = [...block.classList].find(cls => 
    ['compact', 'featured'].includes(cls)
  );

  // Clear block and rebuild with new structure
  block.innerHTML = '';
  
  // Add variant-specific wrapper if needed
  if (variant) {
    const wrapper = document.createElement('div');
    wrapper.className = `blog-post-card-wrapper variant-${variant}`;
    wrapper.append(buildCard(data));
    block.append(wrapper);
  } else {
    block.append(buildCard(data));
  }

  // Add aria-label for accessibility
  block.setAttribute('role', 'article');
  if (data.title) {
    block.setAttribute('aria-label', `Blog post: ${data.title}`);
  }
}

