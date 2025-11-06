# Troubleshooting Guide

**Last Updated:** 2025-11-06
**Survives Context Resets:** ✅ Yes - Loaded on session start

This document captures common issues and their solutions. Refer here before debugging from scratch.

## Development Server Issues

### Server Won't Start

**Symptoms:**
- `aem up` fails
- Port already in use error
- Connection refused

**Solutions:**

1. **Check if server already running:**
   ```bash
   lsof -i :3000
   # Kill if needed
   kill -9 <PID>
   ```

2. **Use different port:**
   ```bash
   aem up --port 3001
   ```

3. **Reinstall AEM CLI:**
   ```bash
   npm install -g @adobe/aem-cli
   ```

4. **Check Node version:**
   ```bash
   node --version  # Should be 18+
   ```

---

### Content Not Loading

**Symptoms:**
- Blank pages
- 404 errors for content
- Old content showing

**Solutions:**

1. **Clear browser cache:**
   - Hard refresh: Cmd+Shift+R (Mac) or Ctrl+Shift+R (Windows)

2. **Check content is published:**
   - Preview URL should work: `*.aem.page`
   - Verify content in Google Docs/SharePoint

3. **Check path matches:**
   - URL: `http://localhost:3000/my-page`
   - Should exist in Google Drive/SharePoint at `/my-page`

4. **Use local HTML for testing:**
   ```bash
   aem up --html-folder drafts
   ```
   Create test file in `drafts/my-page.html`

---

### Changes Not Reflecting

**Symptoms:**
- Code changes don't show
- Old styles still apply
- JavaScript not updating

**Solutions:**

1. **Hard refresh browser:**
   - Cmd+Shift+R or Ctrl+Shift+R

2. **Restart dev server:**
   ```bash
   # Kill server, then restart
   aem up
   ```

3. **Check file save:**
   - Ensure file actually saved
   - Check correct file (sometimes edit wrong file)

4. **Disable browser cache:**
   - Chrome DevTools → Network tab → "Disable cache" checkbox

---

## Block Issues

### Block Not Rendering

**Symptoms:**
- Block div is empty
- Console errors
- Block shows but unstyled

**Solutions:**

1. **Check block name matches:**
   - Directory: `blocks/my-block/`
   - Files: `my-block.js`, `my-block.css`
   - HTML class: `<div class="my-block">`

2. **Check JavaScript errors:**
   - Open browser console (Cmd+Option+J / F12)
   - Fix any errors shown

3. **Check decorate function:**
   ```javascript
   // Must export default function
   export default function decorate(block) {
     // ...
   }
   ```

4. **Check for async issues:**
   ```javascript
   // If using async, need async keyword
   export default async function decorate(block) {
     await someAsyncOperation();
   }
   ```

5. **Verify block is loaded:**
   ```javascript
   // Check in browser console
   document.querySelector('.my-block');
   ```

---

### Block Styles Not Applying

**Symptoms:**
- Block renders but looks unstyled
- Styles in DevTools but not applying
- Other blocks' styles interfering

**Solutions:**

1. **Check CSS file loaded:**
   - Look in Network tab for `my-block.css`
   - Should load automatically with block

2. **Check selector specificity:**
   ```css
   /* Ensure styles scoped to block */
   .my-block {
     /* styles */
   }
   
   .my-block .child {
     /* styles */
   }
   ```

3. **Check for typos:**
   - Class names match exactly
   - No extra spaces or characters

4. **Check CSS syntax:**
   - Run linting: `npm run lint:css`
   - Fix any errors

5. **Check load order:**
   - Block CSS loads after global styles
   - Use DevTools to verify styles loaded

---

### Content Model Changes Breaking Pages

**Symptoms:**
- Existing pages break after block update
- Missing content or layout issues
- JavaScript errors on live pages

**Solutions:**

1. **Understand the contract:**
   - Initial HTML structure is the contract
   - Changes affect ALL pages using block

2. **Make changes backward-compatible:**
   ```javascript
   export default function decorate(block) {
     // Support both old and new structures
     const cells = [...block.children];
     
     // Old format: 2 cells
     if (cells.length === 2) {
       // Handle old format
     } else {
       // Handle new format
     }
   }
   ```

3. **Test with existing pages:**
   - Find pages using block: `/find-content my-block`
   - Test all variants

4. **Consider versioning:**
   - Create new block variant instead
   - `my-block-v2` for breaking changes

5. **Update all affected pages:**
   - Coordinate with content team
   - Update authored content to new structure

---

## Linting Issues

### ESLint Errors

**Symptoms:**
- `npm run lint` fails
- CI checks fail
- Code style inconsistencies

**Solutions:**

1. **Auto-fix common issues:**
   ```bash
   npm run lint:fix
   ```

2. **Common ESLint errors:**

   **Missing file extension:**
   ```javascript
   // ❌ Wrong
   import { something } from './module';
   
   // ✅ Correct
   import { something } from './module.js';
   ```

   **Unused variables:**
   ```javascript
   // ❌ Wrong - variable declared but not used
   const unused = 123;
   
   // ✅ Correct - remove or use
   // (remove if not needed)
   ```

   **No-console:**
   ```javascript
   // ❌ Wrong (in production code)
   console.log('debug');
   
   // ✅ Correct (if needed, use eslint-disable)
   // eslint-disable-next-line no-console
   console.error('Important error:', error);
   ```

3. **Check line endings:**
   - Use Unix (LF), not Windows (CRLF)
   - Configure editor: `"files.eol": "\n"`

---

### Stylelint Errors

**Symptoms:**
- CSS linting fails
- Style inconsistencies

**Solutions:**

1. **Auto-fix:**
   ```bash
   npm run lint:fix
   ```

2. **Common Stylelint errors:**

   **Selector not scoped:**
   ```css
   /* ❌ Wrong - global selector */
   .button {
     color: red;
   }
   
   /* ✅ Correct - scoped to block */
   .my-block .button {
     color: red;
   }
   ```

   **Missing units:**
   ```css
   /* ❌ Wrong */
   .my-block {
     padding: 10;
   }
   
   /* ✅ Correct */
   .my-block {
     padding: 10px;
   }
   ```

---

## Git and PR Issues

### PR Checks Failing

**Symptoms:**
- GitHub checks fail
- PSI (PageSpeed Insights) fails
- Can't merge PR

**Solutions:**

1. **Check linting:**
   ```bash
   npm run lint
   ```
   Fix any errors

2. **Add preview link to PR:**
   - Required for PSI checks
   - Format: `https://branch--repo--owner.aem.page/test-page`
   - Must be accessible URL with test content

3. **Check performance:**
   - Visit preview link
   - Run Lighthouse
   - Fix performance issues:
     - Optimize images
     - Remove blocking scripts
     - Minimize JavaScript

4. **Wait for checks:**
   - Some checks take time
   - Use `gh pr checks --watch`

---

### Merge Conflicts

**Symptoms:**
- Can't merge branch
- Git shows conflicts

**Solutions:**

1. **Update from main:**
   ```bash
   git checkout main
   git pull
   git checkout your-branch
   git merge main
   ```

2. **Resolve conflicts:**
   - Open conflicted files
   - Look for `<<<<<<<`, `=======`, `>>>>>>>`
   - Choose correct version
   - Remove conflict markers

3. **Test after resolving:**
   - Ensure code still works
   - Run linting
   - Test block functionality

---

## Performance Issues

### Poor Lighthouse Scores

**Symptoms:**
- Low performance score
- High LCP, CLS, or FID
- PR checks failing

**Solutions:**

1. **Optimize images:**
   ```javascript
   // Use optimized pictures
   const picture = createOptimizedPicture(
     src, 
     alt, 
     true,  // eager load above fold
     [{ width: '750' }]
   );
   ```

2. **Reduce JavaScript:**
   - Remove unused code
   - Lazy load non-critical features
   - Use `loadDelayed` for analytics

3. **Fix layout shift (CLS):**
   - Reserve space for images
   - Avoid DOM changes during decoration
   - Set dimensions on media

4. **Optimize LCP:**
   - Eager load hero images
   - Minimize blocking resources
   - Load first section eagerly

---

## Claude Code Infrastructure Issues

### Skills Not Activating

**Symptoms:**
- Skills don't auto-activate
- Patterns not matching
- Manual invocation required

**Solutions:**

1. **Check `.clauderc`:**
   ```json
   {
     "skills": {
       "enabled": true
     }
   }
   ```

2. **Check hook configuration:**
   ```json
   {
     "hooks": {
       "enabled": true,
       "directory": ".claude/hooks"
     }
   }
   ```

3. **Verify skill exists:**
   - Check `.claude/skills/{skill-name}/SKILL.md`
   - Verify frontmatter YAML

4. **Check pattern matching:**
   - Review `user-prompt-submit.js`
   - Patterns may need adjustment

5. **Explicitly invoke:**
   - Use command: `/new-block` 
   - Or mention skill: "Use content-driven-development skill"

---

### Hooks Blocking Workflow

**Symptoms:**
- Can't write files
- Hook prevents operation
- "Content-first violation" errors

**Solutions:**

1. **Follow suggested workflow:**
   - Hook is enforcing best practices
   - Use Content-Driven Development workflow

2. **Activate workflow explicitly:**
   - Use `/new-block` command
   - Invoke content-driven-development skill

3. **Temporarily disable hook:**
   - Rename hook file: `pre-tool-use.js.disabled`
   - Or disable in `.clauderc`

---

### Agent Not Being Used

**Symptoms:**
- Expected agent doesn't activate
- Wrong agent activates
- No agent delegation

**Solutions:**

1. **Check auto-activation patterns:**
   - Review agent JSON file
   - `autoActivateOn` patterns

2. **Explicitly delegate:**
   ```
   @block-developer Create a hero block
   @testing-specialist Validate my changes
   ```

3. **Check agent exists:**
   - `.claude/agents/{agent-name}.json`
   - Valid JSON syntax

4. **Verify configuration:**
   ```json
   {
     "agents": {
       "enabled": true
     }
   }
   ```

---

## When All Else Fails

1. **Check basics:**
   - File saved?
   - Correct directory?
   - Typos?

2. **Restart everything:**
   - Close all terminals
   - Restart dev server
   - Hard refresh browser
   - Restart Claude Code

3. **Check documentation:**
   - Read `.claude/docs/architecture.md`
   - Review `.claude/docs/patterns.md`
   - Check skill README files

4. **Search for similar issues:**
   - Check Block Collection issues
   - Search aem.live documentation
   - Ask in community channels

5. **Create minimal reproduction:**
   - Simplify to smallest failing case
   - Test in isolation
   - Helps identify root cause

---

**Note:** Add new issues and solutions to this document as you encounter and resolve them. Keep it updated as a living document.

