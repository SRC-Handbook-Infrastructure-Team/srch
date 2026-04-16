# Socially Responsible Computing Handbook (SRCH)

This Handbook is your guide to integrating ethics, responsibility, and social awareness into computer science teaching. Whether you're an instructor designing a syllabus, a TA leading discussions, or a student exploring what impact your work can have, this site offers curated modules, case studies, discussion prompts, and resource tools.

## Visit The Handbook

- Main site: https://srch.cs.brown.edu
- Repository: https://github.com/SRC-Handbook-Infrastructure-Team/srch

## What Is SRCH?

The Socially Responsible Computing Handbook (SRCH) is an open resource reference guide to navigating and discussing contemporary and ongoing intersections between technology and society from a variety of academic perspectives.

It is an ongoing collaboration between the Socially Responsible Computing program in the Brown University Computer Science Department and the Center for Technological Responsibility, Reimagination, and Redesign in the Brown University Data Science Institute.

SRCH seeks to provide a central resource that compiles the current thinking and scholarship on sociotechnical issues, presenting a roadmap of topics and ideas that can be successfully used in and out of the classroom.

SRCH is not quite a textbook, but rather a scholarly dynamic reference work, maintaining a growing set of interconnected articles about society and technology for a broad academic audience.

SRCH is developed in collaboration between:

1. The Socially Responsible Computing program in the Brown University Computer Science Department
2. The Center for Technological Responsibility, Reimagination, and Redesign in the Brown University Data Science Institute

## Who It Is For

SRCH is primarily targeted towards teachers, professors, teaching assistants, and other academics who want to include materials on ethics, society, and computing in their curricula.

Primary audiences include:

1. Instructors and professors
2. Teaching assistants
3. Students and researchers
4. Others developing or teaching computing-and-society content

Each section of SRCH is written to be understood at the undergraduate level without prior knowledge, allowing the Handbook itself to be used as a tool for teaching.

## How To Use The Handbook

The Handbook is currently organized into four core modules:

1. Privacy
2. Accessibility
3. Automated Decision Making
4. Generative AI

The SRC Handbook is currently organized into four core modules: Privacy, Accessibility, Automated Decision Making, and Generative AI. Each module contains primers aligned to learning objectives, with side panels throughout that expand on key ideas, definitions, and case studies.

## Project History

SRCH was founded in May 2024 by Michelle L. Ding (Brown University Class of 2025, Current Ph.D Student), with advisors Julia Netter and Suresh Venkatasubramanian.

Milestones:

1. Fall 2024: First cohort launched (privacy and product teams)
2. Spring 2025: AI and accessibility teams added
3. Spring 2025: First primers published

Today, Julia Netter and Suresh Venkatasubramanian continue to advise the project, along with Meredith Mendola, Program Manager of the Center for Tech Responsibility.

For current and past contributors, please see the Acknowledgments page in the Handbook.

## Funding And Support

The handbook is hosted by Brown University and supported by grants from the Public Interest Technology University Network, Google Research, and the Ford Foundation.

## Connect With Us

We are excited to hear about how SRCH is being used!

Email: src_handbook@brown.edu

If you are a funder or want to discuss financial support, please contact:

1. suresh_venkatasubramanian@brown.edu
2. julia_netter@brown.edu

## Contributing

The code and content of our website is public, and we happily welcome contributions to either.

### Contribution Types

1. Content contributions: Add or make changes to primer markdown, references, definitions, and case studies.
2. Product contributions: Improve UX, navigation, and accessibility.

### Codebase Structure

The project uses a website-focused frontend layout with content stored in markdown files.

1. Primary app source: [website/src](website/src)
2. Primer content: [website/src/markdown](website/src/markdown)
3. Page components: [website/src/pages](website/src/pages)
4. Shared UI components: [website/src/components](website/src/components)
5. Styles: [website/src/styles](website/src/styles)
6. Markdown rendering logic: [website/src/util](website/src/util)
7. Public assets: [website/public](website/public)

### How To Contribute

1. Fork the repository.
2. Make changes with commit messages.
3. Run local checks before submitting:

```bash
npm install
npm run dev
```

4. Open a pull request that includes:
   - A short summary of what changed
   - Why the change was made

## License

This work is licensed under CC BY-NC-SA 4.0.
