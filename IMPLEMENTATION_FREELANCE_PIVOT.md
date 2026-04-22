# Implementation Plan: Freelance Pivot Redesign

**Goal:** Transform the portfolio from a job-seeker site into a client-acquisition site.  
**Stack:** React 19 + Vite SPA. Content lives in `src/data/content.js`. Sections render via `App.jsx` with scroll-based navigation.

---

## Priority Order

1. Hero rewrite + SYS INDEX removal
2. Add Contact section + wire "LET'S TALK" to it
3. Delete Experience + Education sections
4. Rewrite About section
5. Reorder + rewrite Projects section
6. Global CTA pass + polish

---

## Task 1 — Hero Section (`src/components/Home/Hero.jsx`)

### Remove
- The right column entirely: the `SYS INDEX` widget (Projects / Roles / Locations stats grid)
- The `VIEW PROJECTS` button
- The `Featured Project` card

### Rewrite
- **Subtitle (purple/accent text):** Change from `"Systems-driven software developer and integration specialist"` to `"I build websites that turn visitors into paying clients."`
- **Body paragraph:** Replace the job-application bio with 2–3 client-focused sentences, e.g.:  
  > "I design and build conversion-focused websites for service businesses and founders. Every site I make is built around one goal: getting visitors to take action — book, call, or buy."

### CTA Buttons
- Keep only the `EMAIL ME` button (or rename to `Start a Project`)
- Make it the **primary filled button** using the existing teal/accent CSS variable  
  (currently styled as a ghost/secondary — swap the style class to the primary filled variant)
- Delete the `VIEW PROJECTS` ghost button

### CSS impact
- Hero layout shifts from 2-column to single centered column — update the flex/grid rule in `Hero.css` accordingly

---

## Task 2 — Contact Section (new file: `src/components/Home/Contact.jsx` + `Contact.css`)

This section does not exist yet. Create it from scratch.

### Section ID
`id="contact"` — this is what all CTAs across the page will link to

### Content
- **Headline:** `"Ready to start a project?"`
- **Sub-copy:** `"Tell me what you're building. I'll tell you how I can help."`
- **Form fields:** Name, Email, Project description (textarea)
- **Submit button:** `"Send Message"`
- **Trust line:** `"I respond within 24 hours."`

### Form behavior
- On submit: use `mailto:` link (consistent with current pattern) OR `fetch` to a form endpoint — decide at implementation time. A simple `mailto:` handler requires no backend.
- Add basic client-side validation (non-empty fields)

### Placement
- Add `<Contact />` in `App.jsx` between the Projects section and the Footer (or before wherever the current last section is)

### Wire "LET'S TALK" button
- In `src/components/Layout/Navbar.jsx` line ~39: change the `<a href="mailto:...">` to a `<button>` (or `<a href="#contact">`) that calls `scrollIntoView()` on `#contact`
- Follow the same `handleNavigate()` pattern already used for other nav items

---

## Task 3 — Navigation (`src/components/Layout/Navbar.jsx`)

### Remove nav links
- `Experience` → delete
- `Education` → delete

### Keep
- `About`
- `Projects`

### Update "LET'S TALK"
- Wire to `#contact` scroll (see Task 2)

### Result
Nav reads: `About · Projects · [LET'S TALK button]`

---

## Task 4 — Delete Experience + Education Sections

### In `App.jsx`
- Remove the `<Row />` render calls for `experience` and `education` data
- Remove the section wrappers with `id="experience"` and `id="education"`

### In `src/components/Layout/Navbar.jsx`
- Already handled in Task 3 (links removed)

### In `src/data/content.js`
- The `experience` and `education` exports can remain (no harm leaving them) or be deleted to keep the file clean — delete them for cleanliness

### CSS / whitespace
- Removing both sections eliminates the dead whitespace currently at the bottom of page 3
- No additional CSS changes needed unless section spacing is hardcoded

---

## Task 5 — About Section (`src/components/Home/About.jsx`)

### Remove
- **Core Details column**: age, location, languages — entire column/card
- **GitHub link** from the Links/social list

### Rewrite Summary
Replace job-application bio with client-facing copy, e.g.:  
> "I specialize in building conversion-focused websites for service businesses. My focus is on what happens after someone lands on your page — do they book, call, or buy? That's what I optimize for."

### Keep
- Email link
- LinkedIn link

### Add CTA
- At the bottom of the About section, add a `"Start a Project"` button that scrolls to `#contact`
- Style it as the primary filled accent button (same class as Hero CTA)

---

## Task 6 — Projects Section (`src/components/Home/Row.jsx` + `src/data/content.js`)

### Reorder projects
1. **Trichology Demo** — lead card (most client-relevant: a real marketing site)
2. **Intellicore.online** — second (can stay, de-emphasized)
3. **Studify** — last, labeled as personal project

Update the order in the `projects` array in `src/data/content.js`.

### Rewrite project descriptions (in `src/data/content.js`)
- **Trichology Demo:**  
  > "Conversion-focused marketing site with modal CTAs, anchor-based navigation, and a dedicated contact page — built to turn visitors into leads."
- **Intellicore.online:**  
  > "Full-stack food distribution platform with role-based access, real-time inventory management, and a responsive dashboard."
- **Studify:**  
  > "Personal project — AI-powered study material generator that turns uploaded documents into flashcards and quizzes."

### De-emphasize tech stack tags
- In `Row.jsx` (or wherever tags render): move tech stack tags below the description, reduce font size, or visually mute them with lower opacity
- Outcome/description should be the dominant text, tags secondary

### After-Projects CTA
- Below the Projects section in `App.jsx`, add a brief line:  
  `"Like what you see? Let's build something."` + a `"Start a Project"` button scrolling to `#contact`
- This can be a small inline JSX block or a minimal `<ProjectsCTA />` component

---

## Task 7 — Global Button Style Pass

### Primary CTA style
- Identify the CSS class for the filled accent button (likely `.btn-primary` or similar in `App.css`/`Hero.css`)
- Ensure every "Start a Project" / "Let's Talk" / "Send Message" button uses this class
- The current `EMAIL ME` button in the hero uses a ghost/secondary style — swap it

### Audit all CTA text for consistency
| Location | Button text | Action |
|---|---|---|
| Navbar | LET'S TALK | Scroll to `#contact` |
| Hero | Start a Project | Scroll to `#contact` |
| About (bottom) | Start a Project | Scroll to `#contact` |
| After Projects | Start a Project | Scroll to `#contact` |
| Contact form | Send Message | Submit form |

---

## File Change Summary

| File | Action |
|---|---|
| `src/components/Home/Hero.jsx` | Rewrite content, remove right column + featured card + VIEW PROJECTS button, restyle CTA |
| `src/components/Home/Hero.css` | Update layout from 2-col to single-col |
| `src/components/Home/About.jsx` | Remove Core Details column, remove GitHub link, rewrite summary, add CTA |
| `src/components/Home/Contact.jsx` | **Create new** — full contact form section |
| `src/components/Home/Contact.css` | **Create new** — styles for contact section |
| `src/components/Layout/Navbar.jsx` | Remove Experience + Education links, wire LET'S TALK to `#contact` |
| `src/data/content.js` | Reorder projects, rewrite descriptions, delete experience + education exports |
| `src/App.jsx` | Remove Experience + Education section renders, add `<Contact />`, add after-Projects CTA |

---

## Out of Scope (not in this plan)
- Backend form handling (EmailJS, Formspree, etc.) — form will use `mailto:` unless decided otherwise
- Any visual redesign beyond what's specified (colors, fonts, animations)
- New project additions
- SEO / meta tags
