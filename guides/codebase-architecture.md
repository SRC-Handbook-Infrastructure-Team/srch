# SRCH Architecture Guide

This document explains how the SRCH codebase is organized, how the runtime works end-to-end, and how each tracked file fits into the system.

## 1) System overview

SRCH is a **Vite + React + React Router** single-page application that renders curriculum content from markdown files.

Core runtime pipeline:

1. `website/src/main.jsx` boots React and router.
2. `website/src/App.jsx` wraps the app in Chakra/Theme providers.
3. `website/src/AppRoutes.jsx` chooses route families:
   - Home/about/acknowledgments/search pages
   - Content routes rendered inside `SidebarLayout`
4. `website/src/util/MarkdownRenderer.jsx` loads markdown, parses frontmatter/sidebar refs/footnotes, and renders content.
5. `website/src/layouts/SidebarLayout.jsx` coordinates left contents sidebar + right drawer behavior in wide vs overlay layouts.
6. `website/src/util/SearchEngine.js` builds/queries a FlexSearch index used by all search UIs.

## 2) Data model and flow

### 2.1 Markdown content model

Each markdown file can contain:
- Frontmatter (`title`, `order`, optional `identifier`, `lastUpdated`)
- Main body content
- Optional `## Sidebar` section with keyed drawer entries
- Optional footnote definitions and Further Reading blocks

`MarkdownRenderer.jsx` and `ExportIndex.js` share this model so runtime rendering and precomputed caches stay aligned.

### 2.2 Navigation model

- Sections: `website/src/markdown/<section>/<section>.md`
- Subsections: `website/src/markdown/<section>/<subsection>/<subsection>.md`
- Loader APIs:
  - `getSections()`
  - `getSubsections(sectionId)`
  - `getContent(sectionId, subsectionId?)`

These are consumed by `NavBar`, `ContentsSidebar`, `Home`, `LandingPage`, `MarkdownPage`, and `Footer`.

### 2.3 Search model

- Build-time cache generation: `website/src/util/ExportIndex.js` → `website/public/search-index.json`
- Runtime index bootstrap: `initializeIndex()` in `SearchEngine.js`
- Query calls from:
  - `SearchBar` / `FloatingSearchResults`
  - `NavBarSearchResults`
  - `SearchResults`

## 3) UI architecture

### 3.1 Global shell

- `NavBar` is always present.
- `Footer` is shown on non-markdown routes and as part of `SidebarLayout` for markdown routes.
- `SidebarLayout` controls:
  - Left table of contents
  - Main content region
  - Right drawer for glossary/sidebar terms
  - Resize and collapse/open state

### 3.2 Route families

- Home: `/` and `/srch/`
- Informational pages: `/about`, `/acknowledgments`
- Search pages: `/search`, `/search/:query`, `/search/:query/:page`
- Content landing: `/:sectionId`
- Content page: `/:sectionId/:subsectionId`
- Content page + drawer: `/:sectionId/:subsectionId/:term`

### 3.3 Theme/layout responsiveness

- Theme persisted with `localStorage` key `srch-theme`.
- Layout mode: `wide` vs `overlay` based on viewport and sidebar widths.
- Key classes/attributes toggled on `<html>`:
  - `data-layout-mode`
  - `left-open`
  - `right-open`

## 4) File-by-file executable architecture map

### 4.1 Root + workflow + scripts

| File | Role | Connected to |
|---|---|---|
| `.github/workflows/deploy.yml` | GitHub Pages build/deploy workflow for `main` | Uses `website` build output |
| `.gitignore` | Repo-wide ignore rules | Keeps generated artifacts out of git |
| `LICENSE.txt` | Project license text | Legal metadata |
| `README.md` | Public project/contributor overview | Root entry doc |
| `deploy.sh` | Manual Brown-host deployment script | Builds website and uploads `website/dist` |
| `markdown_guides/MarkdownStylingGuide.md` | Authoring conventions for markdown structure/headings | Used by content contributors |
| `package.json` | Root workspace scripts (`dev`, `build`, deploy wrappers) | Delegates to `website` workspace |
| `package-lock.json` | Root lockfile | Dependency reproducibility |
| `scripts/dev.sh` | Local multi-service launcher (server + website logs/readiness) | Dev workflow helper |

### 4.2 Website workspace config

| File | Role | Connected to |
|---|---|---|
| `website/.babelrc` | Babel config for `babel-node` script execution | `ExportIndex.js` script |
| `website/.gitignore` | Website-specific ignores (dist, generated indexes, playwright artifacts) | Prevents generated files from commits |
| `website/README.md` | Workspace deployment note | References root `deploy.sh` |
| `website/eslint.config.js` | ESLint ruleset for JS/JSX | `npm run lint` |
| `website/index.html` | SPA host HTML + early layout mode bootstrap script | Vite entry document |
| `website/package.json` | Website scripts (`dev`, `build`, `export-index`, lint, deploy) | Main frontend workspace config |
| `website/playwright.config.ts` | Playwright E2E runner config + dev server command | `src/tests/*.spec.ts` |
| `website/tsconfig.json` | TypeScript config for TS utility/tests | TS files + Playwright |
| `website/vite.config.js` | Vite config + plugins (copy 404, markdown cache watch, chunking) | Dev/build behavior |

### 4.3 App bootstrap and route composition

| File | Role | Connected to |
|---|---|---|
| `website/src/main.jsx` | React root mount + BrowserRouter | Loads `App` |
| `website/src/App.jsx` | Top-level provider composition + scroll restoration policy | Wraps `AppRoutes` |
| `website/src/AppRoutes.jsx` | Route selection and lazy route/page loading | NavBar, Footer, SidebarLayout, pages |

### 4.4 Layout, hooks, and context

| File | Role | Connected to |
|---|---|---|
| `website/src/layouts/LayoutContext.js` | Shared layout context contract/hook | Used by `SidebarLayout` and content pages |
| `website/src/layouts/SidebarLayout.jsx` | Main content shell with left/right sidebar orchestration | `ContentsSidebar`, `Footer`, resize hooks |
| `website/src/hooks/useResizableSidebar.js` | Generic resize/collapse state machine for sidebars | `SidebarLayout` |
| `website/src/hooks/useDrawerScrollWatcher.js` | Keeps drawer chip/scroll behavior consistent on URL term navigation | `MarkdownPage` |

### 4.5 Pages

| File | Role | Connected to |
|---|---|---|
| `website/src/pages/Home.jsx` | Home page sections, search entry, module card grid | `SearchBar`, section metadata loaders |
| `website/src/pages/LandingPage.jsx` | Section landing page with outline cards/subheading previews | `MarkdownRenderer`, `getSubsections` |
| `website/src/pages/MarkdownPage.jsx` | Main primer page, drawer URL sync, footnote origin mapping, curriculum objectives | `MarkdownRenderer`, `LayoutContext`, `primers_to_curriculum.json` |
| `website/src/pages/SearchResultsPage.jsx` | Full search page with query/page param handling | `SearchBar`, `SearchResults` |
| `website/src/pages/About.jsx` | About page rendered from markdown plus jump links | `MarkdownRenderer`, `getAboutHeadingLinks` |
| `website/src/pages/Acknowledgments.jsx` | Team roster/cards from JSON and public photos | `team.json`, `public/assets/member-photos` |

### 4.6 Shared components

| File | Role | Connected to |
|---|---|---|
| `website/src/components/NavBar.jsx` | Global nav, module menus, theme toggle, nav search | `MarkdownRenderer` preload helpers, `NavSearchBar`, `NavBarSearchResults` |
| `website/src/components/Footer.jsx` | Global footer links + module links from preloaded navigation | `sectionIcons`, markdown preload |
| `website/src/components/ContentsSidebar.jsx` | Left TOC with expand/collapse and heading parsing | `getSections/getSubsections/getContent` |
| `website/src/components/SearchBar.jsx` | Search input + floating dropdown results | `FloatingSearchResults` |
| `website/src/components/FloatingSearchResults.jsx` | Compact live results panel | `SearchEngine`, route navigation |
| `website/src/components/NavSearchBar.jsx` | Navbar search input variant | Search route navigation |
| `website/src/components/NavBarSearchResults.jsx` | Navbar result popover variant | `SearchEngine`, highlight target extraction |
| `website/src/components/SearchResults.jsx` | Full paginated search results list | `SearchEngine`, highlight target extraction |
| `website/src/components/ScrollManager.jsx` | Route-aware scroll save/restore behavior | Session storage by base route |
| `website/src/components/ScrollProgressBar.jsx` | Reading progress indicator on markdown pages | Scroll/resize listeners |
| `website/src/components/ui/provider.tsx` | Chakra + color mode provider wrapper | Used by `App` |
| `website/src/components/ui/color-mode.tsx` | Theme helpers/toggle hooks | Used by provider and potential Chakra UI controls |
| `website/src/components/ui/tooltip.tsx` | Shared tooltip wrapper | Reusable UI primitive |

### 4.7 Utilities

| File | Role | Connected to |
|---|---|---|
| `website/src/util/MarkdownRenderer.jsx` | Content loading/parsing/rendering; preloading; footnotes; highlight; markdown APIs | Central utility used by most pages/components |
| `website/src/util/SearchEngine.js` | Index build/query/snippet pipeline | Consumed by all search UIs |
| `website/src/util/highlightTargets.js` | Extracts robust highlight targets from snippets | Search result navigation state |
| `website/src/util/remarkHighlight.ts` | Markdown AST highlight plugin | Used inside markdown render pipeline |
| `website/src/util/remarkSidebarRef.ts` | Converts `{term}` syntax into sidebar reference AST nodes | Used inside markdown render pipeline |
| `website/src/util/sectionIcons.js` | Theme-aware section icon resolution | Nav/footer/home/landing card icon usage |
| `website/src/util/ExportIndex.js` | Build-time scanner creating `search-index.json` + `markdown-data.json` caches | Called by `predev`/`prebuild` script |

### 4.8 Data and tests

| File | Role | Connected to |
|---|---|---|
| `website/src/team.json` | Team member metadata for acknowledgments page cards | `Acknowledgments.jsx` |
| `website/src/primers_to_curriculum.json` | Primer↔curriculum objective mapping data | `MarkdownPage.jsx` |
| `website/src/tests/darkMode.spec.ts` | Placeholder dark-mode test file (currently only comment) | Playwright suite |
| `website/src/tests/endToEnd.spec.ts` | Placeholder end-to-end flow file (empty body) | Playwright suite |
| `website/src/tests/leftSidebar.spec.ts` | Sidebar behavior tests (overlay/wide) | `SidebarLayout` + `ContentsSidebar` |
| `website/src/tests/navBar.spec.ts` | Placeholder navbar test file (currently only comment) | Playwright suite |
| `website/src/tests/nonContentPages.spec.ts` | Placeholder page test file (currently only comment) | Playwright suite |
| `website/src/tests/rightSidebar.spec.ts` | Right drawer behavior tests (overlay/wide) | `MarkdownPage` + `SidebarLayout` |
| `website/src/tests/search.spec.ts` | Search flow tests across nav, landing, results pages | Search components and routes |

### 4.9 Styles

Each CSS file maps directly to feature/page ownership:

- `website/src/styles/App.css` → global shell + variables
- `website/src/styles/NavBar.css` / `NavBarSearchResults.css` → navbar layers
- `website/src/styles/Footer.css` → footer
- `website/src/styles/Home.css` / `LandingPage.css` / `About.css` / `Acknowledgments.css` / `SearchResultsPage.css` → page-level styling
- `website/src/styles/MarkdownPage.css` / `MarkdownTables.css` → markdown/sidebars/drawer/table rendering
- `website/src/styles/SearchBar.css` / `SearchResults.css` / `FloatingSearchResults.css` → search surfaces

## 5) Content and asset architecture

### 5.1 Markdown content files

All markdown files under `website/src/markdown` are runtime curriculum sources loaded by `MarkdownRenderer` APIs. Their folder names define URL structure and navigation hierarchy.

### 5.2 Source assets (`website/src/assets`)

These are bundled by Vite and imported by components/pages for logos, theme-specific icons, gradients, and module icons.

### 5.3 Public assets (`website/public/assets`)

These are served as static files by path:
- `member-photos/*` consumed by `Acknowledgments.jsx` via `team.json`
- `primer-photos/*` referenced from markdown content image links

## 6) Build, deploy, and runtime lifecycle

1. `npm run dev` (root) starts website dev server via workspace script.
2. `predev`/`prebuild` run `export-index`, which regenerates:
   - `website/public/search-index.json`
   - `website/public/markdown-data.json`
3. Vite serves/builds SPA; `copy-index-to-404` plugin creates `dist/404.html` for deep-link support on static hosting.
4. Deploy paths:
   - GitHub Pages via `.github/workflows/deploy.yml`
   - Brown-host deploy via `deploy.sh`

## 7) Complete tracked file inventory

The following appendices list every tracked file in the repository and map how each group is used.

### Appendix A — Root/workflow/docs/scripts/config files

- `.github/workflows/deploy.yml`
- `.gitignore`
- `LICENSE.txt`
- `README.md`
- `deploy.sh`
- `markdown_guides/MarkdownStylingGuide.md`
- `package-lock.json`
- `package.json`
- `scripts/dev.sh`
- `website/.babelrc`
- `website/.gitignore`
- `website/README.md`
- `website/eslint.config.js`
- `website/index.html`
- `website/package.json`
- `website/playwright.config.ts`
- `website/tsconfig.json`
- `website/vite.config.js`

### Appendix B — Source code, styles, markdown content, and tests

- `website/src/App.jsx`
- `website/src/AppRoutes.jsx`
- `website/src/components/ContentsSidebar.jsx`
- `website/src/components/FloatingSearchResults.jsx`
- `website/src/components/Footer.jsx`
- `website/src/components/NavBar.jsx`
- `website/src/components/NavBarSearchResults.jsx`
- `website/src/components/NavSearchBar.jsx`
- `website/src/components/ScrollManager.jsx`
- `website/src/components/ScrollProgressBar.jsx`
- `website/src/components/SearchBar.jsx`
- `website/src/components/SearchResults.jsx`
- `website/src/components/ui/color-mode.tsx`
- `website/src/components/ui/provider.tsx`
- `website/src/components/ui/tooltip.tsx`
- `website/src/hooks/useDrawerScrollWatcher.js`
- `website/src/hooks/useResizableSidebar.js`
- `website/src/layouts/LayoutContext.js`
- `website/src/layouts/SidebarLayout.jsx`
- `website/src/main.jsx`
- `website/src/markdown/about/about.md`
- `website/src/markdown/accessibility/accessibility.md`
- `website/src/markdown/accessibility/biasesInDesign/biasesInDesign.md`
- `website/src/markdown/accessibility/designProcesses/designProcesses.md`
- `website/src/markdown/accessibility/intersectionsWithOtherValues/intersectionsWithOtherValues.md`
- `website/src/markdown/accessibility/whatIsAccessibility/whatIsAccessibility.md`
- `website/src/markdown/automatedDecisionMaking/automatedDecisionMaking.md`
- `website/src/markdown/automatedDecisionMaking/bias/bias.md`
- `website/src/markdown/automatedDecisionMaking/fairness/fairness.md`
- `website/src/markdown/automatedDecisionMaking/governance/governance.md`
- `website/src/markdown/automatedDecisionMaking/justice/justice.md`
- `website/src/markdown/privacy/consent/consent.md`
- `website/src/markdown/privacy/dataOwnershipSurveillanceCapitalism/dataOwnershipSurveillanceCapitalism.md`
- `website/src/markdown/privacy/privacy.md`
- `website/src/markdown/privacy/privacyTradeoffs/privacyTradeoffs.md`
- `website/src/markdown/privacy/valueOfPrivacy/valueOfPrivacy.md`
- `website/src/markdown/privacy/whatIsPrivacy/whatIsPrivacy.md`
- `website/src/pages/About.jsx`
- `website/src/pages/Acknowledgments.jsx`
- `website/src/pages/Home.jsx`
- `website/src/pages/LandingPage.jsx`
- `website/src/pages/MarkdownPage.jsx`
- `website/src/pages/SearchResultsPage.jsx`
- `website/src/primers_to_curriculum.json`
- `website/src/styles/About.css`
- `website/src/styles/Acknowledgments.css`
- `website/src/styles/App.css`
- `website/src/styles/FloatingSearchResults.css`
- `website/src/styles/Footer.css`
- `website/src/styles/Home.css`
- `website/src/styles/LandingPage.css`
- `website/src/styles/MarkdownPage.css`
- `website/src/styles/MarkdownTables.css`
- `website/src/styles/NavBar.css`
- `website/src/styles/NavBarSearchResults.css`
- `website/src/styles/SearchBar.css`
- `website/src/styles/SearchResults.css`
- `website/src/styles/SearchResultsPage.css`
- `website/src/team.json`
- `website/src/tests/darkMode.spec.ts`
- `website/src/tests/endToEnd.spec.ts`
- `website/src/tests/leftSidebar.spec.ts`
- `website/src/tests/navBar.spec.ts`
- `website/src/tests/nonContentPages.spec.ts`
- `website/src/tests/rightSidebar.spec.ts`
- `website/src/tests/search.spec.ts`
- `website/src/util/ExportIndex.js`
- `website/src/util/MarkdownRenderer.jsx`
- `website/src/util/SearchEngine.js`
- `website/src/util/highlightTargets.js`
- `website/src/util/remarkHighlight.ts`
- `website/src/util/remarkSidebarRef.ts`
- `website/src/util/sectionIcons.js`

### Appendix C — Bundled source assets (website/src/assets)

- `website/src/assets/accessibility-icon.svg`
- `website/src/assets/accessibility-icon_white.svg`
- `website/src/assets/automatedDecisionMaking-icon.svg`
- `website/src/assets/automatedDecisionMaking-icon_white.svg`
- `website/src/assets/bookIcon.svg`
- `website/src/assets/bookIcon_white.svg`
- `website/src/assets/carot-icon.svg`
- `website/src/assets/carot-icon_white.svg`
- `website/src/assets/clock-icon.svg`
- `website/src/assets/clock-icon_white.svg`
- `website/src/assets/cntr-logo.png`
- `website/src/assets/generativeAI-icon.svg`
- `website/src/assets/generativeAI-icon_white.svg`
- `website/src/assets/instagram-logo.svg`
- `website/src/assets/instagram-logo_white.svg`
- `website/src/assets/landing-page-background-gradient.png`
- `website/src/assets/landing_page_background_gradient_dark.png`
- `website/src/assets/lightbulbIcon.svg`
- `website/src/assets/lightbulbIcon_white.svg`
- `website/src/assets/peopleIcon.svg`
- `website/src/assets/peopleIcon_white.svg`
- `website/src/assets/privacy-icon.svg`
- `website/src/assets/privacy-icon_white.svg`
- `website/src/assets/src_logo.svg`
- `website/src/assets/srch_logo.svg`
- `website/src/assets/srch_logo_white.svg`
- `website/src/assets/targetIcon.svg`
- `website/src/assets/targetIcon_white.svg`

### Appendix D — Public static assets (website/public/assets)

- `website/public/assets/member-photos/aanya.jpg`
- `website/public/assets/member-photos/aj.jpeg`
- `website/public/assets/member-photos/alexandra-hogue.jpg`
- `website/public/assets/member-photos/annahurd.JPEG`
- `website/public/assets/member-photos/anushka-parikh.jpeg`
- `website/public/assets/member-photos/avery-espiritu.jpeg`
- `website/public/assets/member-photos/brooke-wangenheim.jpeg`
- `website/public/assets/member-photos/cflick.JPG`
- `website/public/assets/member-photos/christina.png`
- `website/public/assets/member-photos/dawson-lin.jpg`
- `website/public/assets/member-photos/dennis-wang.jpg`
- `website/public/assets/member-photos/doren.JPG`
- `website/public/assets/member-photos/emma.jpg`
- `website/public/assets/member-photos/ethan.jpg`
- `website/public/assets/member-photos/huda.jpeg`
- `website/public/assets/member-photos/jasmine-kamara.JPEG`
- `website/public/assets/member-photos/jasminekamara.jpeg`
- `website/public/assets/member-photos/jiayi.png`
- `website/public/assets/member-photos/jo.jpg`
- `website/public/assets/member-photos/joe.jpg`
- `website/public/assets/member-photos/julia.jpg`
- `website/public/assets/member-photos/jun.jpg`
- `website/public/assets/member-photos/kalie.jpg`
- `website/public/assets/member-photos/kaluki-kithome.jpeg`
- `website/public/assets/member-photos/karina.png`
- `website/public/assets/member-photos/kathy-li.jpg`
- `website/public/assets/member-photos/meredith-mendola.jpeg`
- `website/public/assets/member-photos/michelle.png`
- `website/public/assets/member-photos/nava-litt.JPG`
- `website/public/assets/member-photos/omar-dixon.jpg`
- `website/public/assets/member-photos/peyton.jpg`
- `website/public/assets/member-photos/rehma-saqib.jpeg`
- `website/public/assets/member-photos/richard-zhang.jpg`
- `website/public/assets/member-photos/samdeet.jpg`
- `website/public/assets/member-photos/sana.jpg`
- `website/public/assets/member-photos/sasha-oquendo.jpg`
- `website/public/assets/member-photos/selena.jpg`
- `website/public/assets/member-photos/sonya-rashkovan.jpeg`
- `website/public/assets/member-photos/suresh.jpg`
- `website/public/assets/member-photos/temp-photo.jpg`
- `website/public/assets/member-photos/tenzin.jpg`
- `website/public/assets/member-photos/tiffany.jpeg`
- `website/public/assets/member-photos/will-tolmie.JPG`
- `website/public/assets/primer-photos/ADM/bias/biasInDataGeneration.png`
- `website/public/assets/primer-photos/ADM/bias/biasInModelTraining.png`
- `website/public/assets/primer-photos/ADM/bias/biasOverSystemLifecycle.png`
- `website/public/assets/primer-photos/ADM/fairness/independence.png`
- `website/public/assets/primer-photos/ADM/fairness/separation.png`
- `website/public/assets/primer-photos/ADM/fairness/sufficiency.png`
- `website/public/assets/primer-photos/ADM/governance/stakeholders.png`
- `website/public/assets/primer-photos/ADM/justice/yls_procedural_justice.png`
- `website/public/assets/primer-photos/accessibility/biases/drawToast.png`
- `website/public/assets/primer-photos/accessibility/biases/iconLibrary.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/affordanceExample.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/designProcessProgression.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/feedbackExample.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/ladderOfParticipation.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/mappingExample.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/signifierExample.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/the-curb-cut-effect.png`
- `website/public/assets/primer-photos/accessibility/designProcesses/unused_flow.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/accessibility-intersections-venn.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/accessible-survey-before-after.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/captcha-example-brown.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/captcha-example.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/iphone-low-power-mode.png`
- `website/public/assets/primer-photos/accessibility/intersections-with-other-values/privacy-by-design-voice-control.png`
- `website/public/assets/primer-photos/genAI/copyright/A_Recent_Entrance_to_Paradise.jpg`
- `website/public/assets/primer-photos/genAI/copyright/copyright_graph.jpg`
- `website/public/assets/primer-photos/genAI/copyright/copyright_rights.png`
- `website/public/assets/primer-photos/genAI/copyright/generative_ai_figure.png`
- `website/public/assets/primer-photos/genAI/copyright/generative_ai_table.png`
- `website/public/assets/primer-photos/genAI/copyright/ghibli_meme.jpg`
- `website/public/assets/primer-photos/genAI/copyright/intellectual_property.png`
- `website/public/assets/primer-photos/genAI/copyright/zarya.jpg`
- `website/public/assets/primer-photos/privacy/consent/parade_de_cirque.png`
- `website/public/assets/primer-photos/privacy/dataOwnership/data_ownership.png`
- `website/public/assets/primer-photos/privacy/whatIsPrivacy/dataLifecycle.png`
- `website/public/assets/primer-photos/privacy/whatIsPrivacy/layered_model_of_privacy.png`
- `website/public/assets/primer-photos/privacy/whatIsPrivacy/table_of_privacy.png`
