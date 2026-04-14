---
title: Markdown Styling Guide
order: 0
---

# Markdown Styling Guide

This guide describes the markdown format that is currently supported by the website renderer and page loader.

## Frontmatter

You can start each markdown file with frontmatter:

```markdown
---
title: Page Title
order: 1
lastUpdated: 2026-04-14
---
```

Use these keys:

- title: the name shown in the left navigation and page header
- order: where this page appears in the list
- lastUpdated: shown as Last updated on ... at the top of the page

Plain-language notes:

- Frontmatter here is simple key:value parsing, not full YAML support.
- Numbers are read as numbers.
- If lastUpdated is missing, the page also checks for a footer like _Last updated ..._.

## Folder Structure

Put content files under src/markdown in this pattern:

```
src/markdown/
  sectionId/
    sectionId.md
    subsectionId/
      subsectionId.md
```

Rules:

- A section page must be sectionId/sectionId.md.
- A subsection page must be sectionId/subsectionId/subsectionId.md.
- Hidden directories or files starting with . are ignored.
- A directory named drawer is ignored as a subsection.

## Headings And IDs

Use regular markdown headings:

```markdown
# Main Title (h1)

## Section (h2)

### Subsection (h3)

#### Minor subsection (h4)
```

What the site does:

- The page title bar at the top is built by the app outside markdown.
- The first markdown H1 in the file is removed before page content is shown.
- H2 and H3 headings get automatic anchor IDs.
- H2 headings are used as search anchors.

## Sidebar Drawers

Sidebar drawer content lives in the same file, after a divider heading that should be the very last heading in the file. Each sidebar should have a heading itself under the key as shown below (Heading: Drawer Title).

Use this divider heading:

- ## Sidebar

Format:

```markdown
## Sidebar

term-key:
Heading: Drawer Title
Drawer body markdown here.

another-term:
Another drawer body.
```

Rules:

- Each drawer key must be on its own line and end with a colon.
- Keys are matched without case sensitivity.
- Heading sets the drawer title shown to users.
- Drawer body text continues until the next key line.

To open a drawer from body text, use curly braces:

```markdown
Use {term-key} for inline drawer chips.
Use {term-key|Custom Label} to override chip text.
```

Notes:

- Extra spaces around braces are cleaned automatically.
- If the key does not exist, readers will see a visible missing marker.
- Brace tokens are parsed everywhere, so only use them for real drawer links.

## Links

Use normal markdown links:

```markdown
[External Source](https://example.org)
[Internal Route](/privacy/whatIsPrivacy)
[Jump To Section](#what-is-privacy)
```

What links do:

- External http/https links open in a new tab and show an external-link icon.
- Hash links scroll to anchors on the current page.
- Internal links should use absolute routes that start with /. For example: `/privacy`, `/accessibility/whatIsAccessibility`.

## Footnotes And Further Reading

Footnotes work with normal markdown footnote syntax and are shown in a collapsible References section. They can be defined at any point in the markdown file.

Recommended format:

```markdown
Some claim.[^1]

[^1]: Footnote text.
```

Notes:

- Use numeric footnote keys, like [^1], and make sure they are unique and correctly matched
- Footnote definitions are removed from body text and placed in the References panel.
- Back-links are created automatically.
- Footnotes can link back to drawer content when needed.

You can also add a separate Further Reading panel by including this heading:

```markdown
## Further Reading

- Optional bibliography or links
```

What the site does:

- The Further Reading section is pulled out of the body content.
- It is shown in its own collapsible Further Reading panel.

## GFM Features

GitHub-flavored markdown features are enabled, including:

- tables
- strikethrough
- task lists
- autolink literals
- footnote syntax

## Images

Use normal markdown image syntax:

```markdown
![Descriptive alt text](/assets/member-photos/example.jpg)
```

Guidelines:

- Always provide meaningful alt text.
- Use paths that point to public assets, for example /assets/....

## Example Page Skeleton

```markdown
---
title: What Is Privacy?
order: 1
lastUpdated: 2026-04-14
---

# What Is Privacy?

Intro paragraph with a drawer chip {contextual-integrity|contextual integrity}.

## Core Concepts

Discussion text and an external [source](https://example.org).[^1]

[^1]: Example footnote text.

## Further Reading

- Optional further reading list

## Sidebar

contextual-integrity:
Heading: Contextual Integrity
Contextual integrity explains privacy as appropriate information flow.
```