---
title: Markdown Styling Guide
order: 0
---

# Markdown Styling Guide

This guide explains how to format your markdown primers for the SRC website. We provide a specific structure and special features to create interactive and informative content.

## YAML Frontmatter

Every markdown file should begin with YAML frontmatter enclosed by triple dashes:

```markdown
---
title: Your Title Here
order: 1
---
```

The frontmatter contains metadata:

- `title`: The display title for the sidebar navigation
- `order`: A number that determines the position in the navigation (lower numbers appear first)

## Folder Structure

The markdown content follows this hierarchical structure:

```
/markdown/
  ├── about/                     # Section folder
  │   └── about.md               # Section landing page
  ├── automatedDecisionMaking/    # Section folder
  │   ├── automatedDecisionMaking.md  # Section landing page
  │   └── fairness/              # Subsection folder
  │       ├── fairness.md        # Subsection content
  │       └── drawer/            # Side panel content
  │           ├── individual-fairness.md
  │           └── group-fairness.md
  └── accessibility/              # Another section
      └── ...
```

## Headers

Use headers to structure your content:

```markdown
# Main Title (h1)

## Section (h2)

### Subsection (h3)

#### Minor subsection (h4)
```

Each file must have exactly one h1 header at the top and should include a References h2 header at the end if it's a main primer page.

## Special Links

### Side Panel (Drawer) Links

To add a button that opens a side panel with additional information:

```markdown
[drawer:Button Text](filename-without-extension)
```

Example: `[drawer:See Definition](individual-fairness)`

### Navigation Links

To add a button that navigates to another primer:

```markdown
[nav:Button Text](target-link)
```

For links to other subsections in the same section: `[nav:Bias Primer](bias)`
For links to subsections in other sections: `[nav:Privacy Primer](privacy/whatIsPrivacy)`

## Images

Images should be placed in `/public/srch-s25/assets/images/` and referenced like this:

```markdown
![Alt text](/public/srch-s25/assets/images/filename.jpg)
```

Always include meaningful alt text for accessibility.

## References

Every primer must include a References section at the end with Chicago-style citations:

```markdown
## References

Author Last Name, First Name. "Title of Article." _Journal Name_ Volume, Issue (Year): Pages. DOI or URL.

Author Last Name, First Name. _Title of Book_. Publisher City: Publisher Name, Year.
```

## Example Primer with Frontmatter

Here's a simple example of a well-structured primer:

```markdown
---
title: Understanding Privacy
order: 1
---

# Understanding Privacy

Introduction text goes here.

## First Section

Content with a [drawer:See Example](example1) side panel link.

## Second Section

Content with a [nav:Related Topic](another-primer) navigation link.

## References

Smith, John. "Title of Article." _Journal Name_ 10, 2 (2022): 12-34.
```

For more information or questions, contact the website team.
