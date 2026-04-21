---
title: Intersections with Other Values
order: 3
final: false
lastUpdated: 2026-04-21
---

## Overview

The development of inclusive technology requires thoughtful consideration of how accessibility intersects with other values such as privacy, security, and usability. While these values are often treated as separate goals or controlled by separate teams, managing them does not have to be mutually exclusive with accessibility.[^27] In fact, prioritizing accessible features can create powerful positive externalities, ultimately leading to more innovative and equitable products.

## Why Accessibility Gets Overlooked

Companies often fail to prioritize accessibility due to a combination of organizational culture and prejudices. A common barrier is the mistaken belief that accessibility features only serve a small fraction of the population, which leads to them getting deprioritized.[^28] In reality, this overlooks a large share of the population: the World Health Organization estimates that about 1.3 billion people globally experience significant disability,[^34] and the Center for Disease Control reports that more than 1 in 4 US adults have a disability.[^13] These figures also exclude many temporary and situational impairments (e.g., injury or pregnancy) that can affect usability.

Another barrier is the belief that accessibility is too expensive or too time-consuming, especially when it is treated as a retrofit rather than a core design requirement. However, accessible features can be more costly to implement or lower quality when added at the end of production rather than integrated into the design process from the start.[^7]

These misconceptions are particularly impactful in environments where nobody is directly responsible for implementing accessibility features. Often embedded in HR departments, Compliance, or Product teams, accountability for accessibility is not always clearly communicated or adequately funded. This negligence can lead to failure on three distinct levels:

1. **Ethical:** Building inaccessible products actively excludes people with disabilities from society.[^25]
2. **Legal:** Exposing companies to lawsuits under frameworks like the Americans with Disabilities Act (ADA) or the European Accessibility Act can be costly and time-consuming.[^11]
3. **Business:** Ignoring accessibility alienates a massive global market while preventing the design of better experiences for everyone.[^24]

## The Framework

To understand the complexity of these intersections, developers should look beyond compliance checklists and instead utilize three analytical lenses: Disability, Equity, and Universality.

1. **Disability:** This lens centers on the lived experiences of people with disabilities and the social structures that contextualize them. It specifically asks how a feature acts as a barrier or an enabler for someone with visual, motor, cognitive, or auditory disabilities.
2. **Equity:** This lens examines power dynamics and fairness. This perspective forces us to ask who is disproportionately burdened by a design decision and whether the technology reinforces existing systemic inequalities or instead helps address them.
3. **Universality:** This lens broadens the scope to the general population. It reflects the “{curb-cut-effect}”: features originally designed to improve access for disabled users often end up benefiting many others as well. In digital contexts, captions, keyboard navigation, and clear layouts can help not only disabled users but also people in noisy environments, with temporary injuries, or in high-distraction settings.

For more information on these lenses, please refer to the [What is Accessibility](/accessibility/whatIsAccessibility) primer.

![Venn diagram showing Disability, Equity, and Universality converging in inclusive design.](/assets/primer-photos/accessibility/intersections-with-other-values/accessibility-intersections-venn.png)

*Figure: Venn diagram showing the three lenses used in this section (Disability, Equity, and Universality) and their convergence in inclusive design.*

## Intersections with Accessibility: Synergies and Tensions

The following sections explore how accessibility overlaps with values like privacy, security, and usability. Each intersection involves both synergies and tensions. While the examples are not exhaustive, they highlight the key trade-offs and opportunities that technologists must navigate.

## Accessibility & Privacy

Many assistive technologies function by collecting sensitive data to adapt to a user’s needs, leading to a clash between accessibility and the user’s privacy. This intersection thus raises a question: "What is the privacy cost for access?"

Through the Disability lens, we see that many assistive technologies require personal data to work as intended. This creates an equity imbalance, forcing users with disabilities to give up more privacy than the general population just to participate. Accessible privacy controls can reduce some of this burden by making consent, permissions, and settings easier to understand and manage. However, they do not fully eliminate the tradeoff, because some assistive tools still depend on collecting sensitive data that non-disabled users may never have to disclose.

- **Tension:** Some assistive technologies depend on highly sensitive inputs. Voice assistants rely on microphone access and wake-word systems, which raise concerns about audio capture and downstream data handling. Eye-tracking and other adaptive systems can also involve biometric or behavioral data that may reveal sensitive information. This surveillance model also appears in personalized learning platforms, which monitor reading speed and error frequency to provide cognitive accessibility.[^5]

    - Accessibility settings can also become part of a distinctive device profile, which means that even when a user’s name is unknown, combinations of fonts, settings, and device characteristics may still increase trackability.[^9]

- **Synergy:** Privacy features and accessibility can reinforce each other when controls are understandable and usable. Clear permission prompts, readable privacy notices, and keyboard-accessible settings can improve cognitive accessibility of privacy controls and thus {promote-privacy-protection}.[^6]

![Diagram showing a privacy-by-design model for a voice-control feature, including user choices about data collection, storage, and processing.](/assets/primer-photos/accessibility/intersections-with-other-values/privacy-by-design-voice-control.png)

*Figure: This figure shows an idealized privacy-by-design model in which users can make clearer choices about how a voice-control feature collects, stores, and processes data.*

- **Takeaway:** Accessibility and privacy can be in genuine tension because some disabled users must share more data to access the same service. Better privacy design can reduce this burden, but it does not always erase the underlying tradeoff.

## Accessibility & Security

This intersection describes the divergence and convergence between system security and user access. From a Disability lens, security features can cause friction for users with visual, motor, or cognitive impairments. These barriers create equity issues when disabled users face disproportionate difficulty accessing essential services in the name of protecting systems from fraud or abuse. Meanwhile, within the context of Universality, when inaccessible or confusing security features are redesigned to be intuitive and easy to use, they improve usability for disabled users and others, thus strengthening security for everyone.

- **Tension:** Security features are frequently prime examples of inaccessible design. {CAPTCHA} (Completely Automated Public Turing test to tell Computers and Humans Apart) is a well-known example: visual challenges can be unusable for blind or low-vision users, while audio alternatives may still exclude some users or remain difficult in practice.[^33] Biometric authentication can also create barriers. Some users cannot reliably use fingerprint or facial recognition systems, which sheds light on the need for increasingly non-biometric alternatives.[^3]

![Example of a CAPTCHA challenge interface.](/assets/primer-photos/accessibility/intersections-with-other-values/captcha-example.png)

*Figure: Example of CAPTCHA.*[^12]

- **Synergy:** Good security design is accessible. For example, password managers are a powerful tool for security and accessibility, helping people to use more secure passwords without introducing extra cognitive strain. Security becomes more accessible when warnings, authentication steps, and recovery flows use plain language as well as screen-reader-compatible interfaces. This ensures all users, regardless of ability, understand risks and ultimately protect themselves.[^10] The same principle applies to newer, {recaptcha|less interaction-heavy bot defenses}: when systems decrease reliance on puzzle-style challenges and provide accessible fallback options, they can better protect both security and access.

![Before-and-after comparison of a survey page, showing accessibility improvements such as clearer headings, grouped form fields, explicit labels, and a more readable results table.](/assets/primer-photos/accessibility/intersections-with-other-values/accessible-survey-before-after.png)

*Figure: Example of a before and after of an accessible survey page. The latter shows accessibility improvements through clearer headings, grouped form fields, explicit labels, and a more readable results table.*[^32]

- **Takeaway:** When security tools are designed with accessibility in mind, they stop being barriers for disabled users and become clearer, safer protections for everyone.

## Accessibility & Sustainability

This intersection connects environmental goals like low energy consumption with equitable access. From the Equity lens, sustainable design for low-bandwidth environments equitably benefits users in developing regions or low-income areas, who are disproportionately impacted by such infrastructure. From the Disability lens, we can see that this lightweight design is critical for assistive tech compatibility. However, some energy-saving features can harm access, creating tensions we must carefully design around. The Universality lens reveals a synergy as well, since efficient code leads to pages that load more quickly, which then increases usability.

- **Tension:** Features designed to save energy can create accessibility barriers. A common example is power-saving modes on devices, which often work by lowering screen brightness and contrast. While this saves battery life (a sustainability goal), it can make the device completely unusable for users with low vision, forcing them to choose between a usable device and a charged one.[^26]

![iPhone Low Power Mode screen showing dimmed brightness.](/assets/primer-photos/accessibility/intersections-with-other-values/iphone-low-power-mode.png)

*Figure: Low power mode dims brightness on iPhone.*[^23]

- **Synergy:** Sustainable design can be inherently more accessible. Efficient, lightweight code is a sustainable practice that leads to faster-loading pages and reduced data consumption. This is an accessibility win for users on slow internet connections and benefits users with certain cognitive disabilities by providing a responsive experience.[^30]

- **Takeaway:** Sustainability and accessibility can reinforce each other when we design lightweight, efficient systems. However, we must avoid choices that worsen visibility or usability for disabled users.

## Accessibility & Usability

Accessibility and usability are deeply intertwined. From the Disability lens, accessibility is a prerequisite for usability; a product that cannot be perceived or operated is, by definition, unusable for that person. The Equity lens demands we prioritize this, ensuring usability is not only measured by what makes technology usable for the majority. The Universality lens shows the payoff of how features designed for a specific disability enhance usability for all users in different contexts (e.g., bright sunlight or quiet environments), exemplifying the curb cut effect.[^8]

- **Tension:** In some cases, the challenge is not only between accessibility and general usability, but also between different accessibility needs themselves. For example, over-labeling every element for screen readers can create verbose, cluttered audio output that is difficult to navigate.[^1] Similarly, adding too many specialized modes or controls for different disabilities into a single menu can be overwhelming for users with cognitive disabilities, paradoxically making the product less usable. In these cases, the issue is usually not accessibility itself, but inaccessible implementation or poor organization of accessibility features.

**Case Study:** {accessibility-is-not-one-size-fits-all|Accessibility vs. Accessibility}

- **Synergy:** Nearly all accessibility best practices are also usability best practices. High-contrast mode, designed for low vision, is now a universal feature for reducing eye strain or improving visibility in bright light. Clear layouts and plain language (for cognitive accessibility) help all users navigate more efficiently.[^21] Keyboard-only navigation (for mobility impairments) also benefits users who prefer not to use a mouse.

- **Takeaway:** In most cases, designing for accessibility simply is designing for usability. Tensions usually arise only when accessible features are implemented in a cluttered or unstructured way.

## Accessibility & Transparency

This intersection treats transparency not simply as disclosure, but as a form of comprehensibility. Information is only transparent if users can access it, perceive it, and actually understand what it means. From the disability lens, transparency fails when information is technically available but functionally inaccessible—for example, when a chart is visual-only, a video lacks captions or transcripts, or a permission request is written in dense technical language. In such cases, disclosure exists in form but not in practice.[^19] That is, transparency that is not comprehensible is not transparency at all. The Universality lens, furthermore, shows that designing for cognitive accessibility makes systems more transparent and trustworthy for all users, not just specialists.

- **Tension:** A push for radical transparency can be at odds with cognitive accessibility. For instance, algorithmic explainability reports that output complex statistical models or raw data are transparent but completely inaccessible to most users, especially those with cognitive disabilities. In this case, transparency without interpretation creates confusion, not clarity.
- **Synergy:** Transparency, when designed for the general public, is a core accessibility feature. Alt text for images makes visual information transparent to screen reader users. Video transcripts and captions do the same for audio content, making it transparent, searchable, and accessible. Using plain language to explain why a system needs a certain permission or how a feature works represents a strong synergy between transparency and cognitive accessibility.[^17]

- **Takeaway:** True transparency is not just about exposing information. Rather, it requires accessible formats and plain language so that disabled and non-expert users can actually understand what is happening.

## Accessibility & Accountability

Integrating accountability can enable users to support greater accessibility through opportunities for recourse. From the Disability lens, if a reporting form or grievance process is inaccessible (e.g., it uses complex jargon or has a visual CAPTCHA), accountability becomes impossible in practice. This is a failure of equity, as it systemically silences the users most likely to be harmed by design flaws. The Universality lens shows that building an accessible accountability process—using simple language, multi-modal inputs, and clear feedback—makes it easier for all users to report issues, strengthening the feedback loop for the entire system.

- **Tension:** Mechanisms for accountability can themselves create barriers when formal reporting systems prioritize rigid procedures or inaccessible verification steps in the name of institutional reliability. Complex forms, hidden contact information, or grievance processes that require navigating legal jargon can, furthermore, make a system more procedurally defensible while simultaneously making it harder for disabled users to seek recourse.[^31]

- **Synergy:** Accessible design is essential for enabling accountability. A clear, simple, and easy-to-find "Report a Problem" button is an accountability mechanism. Providing multi-modal options for reports (e.g., voice, text, or video) ensures that users with different disabilities can submit feedback. Furthermore, providing clear confirmation and follow-up messages in plain language (e.g., "We received your report and are reviewing it") makes the accountability loop itself accessible.[^2]

- **Takeaway:** Without accessible feedback channels, accountability is hollow. Accessible reporting tools empower disabled users and improve systems for everyone.

## Accessibility & Safety

This intersection balances protection from harm with open access. From the Disability lens, tensions run both ways. A safety feature, like content moderation, can censor vital disability discourse, while an accessibility feature can create a physical safety risk by exposing private data. The Equity lens asks who is being protected—automated safety tools often fail to protect marginalized users from harm while simultaneously censoring their non-normative content. The Universality lens reveals synergies, where safety tools designed for accessibility (like content warnings) give all users greater control over their experience.[^18]

- **Tension:** Safety features can create significant accessibility barriers. Content moderation may erroneously flag content from disability communities (e.g., discussions of medical conditions or anatomy) as sensitive or harmful, censoring them. Conversely, an accessibility feature like "read aloud" for notifications could compromise a user's physical safety by exposing a private message in a public or unsafe space.[^14]

- **Synergy:** Many safety features can also function as accessibility features. Content filters or “SafeSearch” modes can serve as important accessibility tools for some users with cognitive disabilities who want more control over what appears on screen. Clear, accessible block or mute buttons are also central safety tools, allowing users to avoid harassment. Trigger warnings are another example: they are a safety feature that can also support cognitive accessibility by allowing users to prepare for or skip distressing material.[^22]

- **Takeaway:** When safety tools are transparent, adjustable, and accessible, features like content filters, block buttons, and warnings can better protect users while also giving them more control over their experiences.

## Conclusion

By analyzing these intersections, we see that the tensions between accessibility and other values are often caused by resource constraints or oversights rooted in systemic barriers rather than inherent conflict. Though other values are sometimes prioritized over accessibility, more intentional design choices can help accomplish greater synergy between goals. When we apply the lenses of Equity, Disability, and Universality, we find that accessibility is not only compatible with privacy, security, sustainability, transparency, accountability, and safety—it is often the catalyst for achieving them more effectively.

These intersections demonstrate that accessibility is a foundational design principle that strengthens, rather than competes with, other values when it is built in from the start. Designers and policymakers who adopt the three-lens framework can better anticipate trade-offs, build in safeguards, and uncover synergies that benefit not only users with disabilities first, but also everyone else through the curb cut effect. Ultimately, accessibility is not only a legal or ethical requirement, but also a strategic pathway toward more human-centered technologies.

[^1]: Abstracta. “5 Accessibility Heuristic Principles for Better UX.” *Abstracta*, n.d. https://abstracta.us/blog/accessibility-testing/accessibility-heuristic/.

[^2]: Access Board, U.S. “Revised 508 Standards and 255 Guidelines.” *U.S. Access Board*, n.d. https://www.access-board.gov/ict/.

[^3]: Alexiou, Gus. “Disfigurement Charity Exposes Rampant Exclusion By AI Facial Recognition Tools.” *Forbes*, February 27, 2025. https://www.forbes.com/sites/gusalexiou/2025/02/27/disfigurement-charity-exposes-rampant-exclusion-by-ai-facial-recognition-tools/.

[^4]: Alharbi, Rahaf, John Tang, and Karl Henderson. "Accessibility Barriers, Conflicts, and Repairs: Understanding the Experience of Professionals with Disabilities in Hybrid Meetings." In *Proceedings of the 2023 CHI Conference on Human Factors in Computing Systems*. 2023. https://doi.org/10.1145/3544548.3581541.

[^5]: American Civil Liberties Union. “The Privacy-Invading Potential of Eye Tracking Technology.” *ACLU*, n.d. https://www.aclu.org/news/national-security/privacy-invading-potential-eye-tracking-technology.

[^6]: American Foundation for the Blind. “The Talking Book.” *AFB*, n.d. https://afb.org/online-library/unseen-minority-0/chapter-10.

[^7]: AudioEye. “Website Accessibility vs. Lawsuit Costs: Save Money Early.” *AudioEye*, n.d. https://www.audioeye.com/post/website-accessibility-vs-lawsuit-costs/.

[^8]: Bai, Yang. “The Relationship between Website Accessibility and Usability: An Examination of U.S. County Government Online Portals.” *The Electronic Journal of e-Government* 17, no. 1 (2019). https://academic-publishing.org/index.php/ejeg/article/view/666.

[^9]: BrowserLeaks. “Font Fingerprinting.” *BrowserLeaks*, n.d. https://browserleaks.com/fonts.

[^10]: Bureau of Internet Accessibility. “Ditch the Fancy Vocabulary for Accessible Language.” *BOIA*, n.d. https://www.boia.org/blog/ditch-the-fancy-vocabulary-for-accessible-language.

[^11]: Bureau of Internet Accessibility. “The Robles v. Domino’s Settlement (And Why It Matters).” *BOIA*, n.d. https://www.boia.org/blog/the-robles-v.-dominos-settlement-and-why-it-matters.

[^12]: Cloudflare. “How CAPTCHAs Work | What Does CAPTCHA Mean?” *Cloudflare*, n.d. https://www.cloudflare.com/learning/bots/how-captchas-work/.

[^13]: Centers for Disease Control and Prevention. “Disability Impacts All of Us Infographic.” *CDC Disability and Health*, n.d. https://www.cdc.gov/disability-and-health/articles-documents/disability-impacts-all-of-us-infographic.html.

[^14]: Future of Privacy Forum. “Contextualizing the Kids Online Safety and Privacy Act: A Deep Dive into the Federal Kids Bill.” *Future of Privacy Forum*, n.d. https://fpf.org/blog/contextualizing-the-kids-online-safety-and-privacy-act-a-deep-dive-into-the-federal-kids-bill/.

[^15]: Gaggi, Ombretta. "A Study on Accessibility of Google ReCAPTCHA Systems." In *Proceedings of the 2022 Workshop on Open Challenges in Online Social Networks*, 25–30. 2022. https://doi.org/10.1145/3524010.3539498.

[^16]: Hofmann, Megan, Devva Kasnitz, Jennifer Mankoff, and Cynthia L. Bennett. "Living Disability Theory: Reflections on Access, Research, and Design." In *Proceedings of the 22nd International ACM SIGACCESS Conference on Computers and Accessibility*. 2020. https://doi.org/10.1145/3373625.3416996.

[^17]: Iwarsson, Susanne, and Agneta Ståhl. “Accessibility, Usability and Universal Design—Positioning and Definition of Concepts Describing Person-Environment Relationships.” *Disability and Rehabilitation* 25, no. 2 (2003): 57–66. https://doi.org/10.1080/0963828021000007969.

[^18]: Leça, Matheus de Morais, and Ronnie de Souza Santos. “Towards User-Focused Cross-Domain Testing: Disentangling Accessibility, Usability, and Fairness.” *arXiv* (2025). https://arxiv.org/html/2501.06424v1.

[^19]: LLYC. “Radical Transparency: How to Make the Most of Technology and Boost Stakeholder Dialogue.” *LLYC IDEAS*, n.d. https://llyc.global/en/ideas/radical-transparency-how-to-make-the-most-of-technology-and-boost-stakeholder-dialogue/.

[^20]: Martín, Adriana, Alejandra Cechich, and Gustavo Rossi. “Accessibility at Early Stages: Insights from the Designer Perspective.” In *Proceedings of the International Cross-Disciplinary Conference on Web Accessibility (W4A ’11)*. New York: Association for Computing Machinery, 2011. https://doi.org/10.1145/1969289.1969302.

[^21]: Nielsen, Jakob. “10 Usability Heuristics for User Interface Design.” *Nielsen Norman Group*, April 24, 1994. Updated January 30, 2024. https://www.nngroup.com/articles/ten-usability-heuristics/.

[^22]: Palo Alto Networks. “Safe Search Enforcement.” *Palo Alto Networks Documentation*, n.d. https://docs.paloaltonetworks.com/advanced-url-filtering/administration/url-filtering-features/safe-search-enforcement.

[^23]: Payette Forward. “Why Does My iPhone Keep Dimming? Here’s The Truth!” *Payette Forward*, n.d. https://www.payetteforward.com/why-does-my-iphone-keep-dimming-heres-truth/.

[^24]: Retail TouchPoints. “The Cost of Inaccessibility: Businesses Lose More Than $6.9 Billion Annually.” *Retail TouchPoints*, n.d. https://www.retailtouchpoints.com/executive-viewpoints/the-cost-of-inaccessibility-businesses-lose-more-than-6-9-billion-annually/145764/.

[^25]: Sustainability Directory. “What Are the Ethical Trade-Offs between Data Accessibility and the Environmental Cost of Storage?” *Sustainability Directory*, n.d. https://lifestyle.sustainability-directory.com/learn/what-are-the-ethical-trade-offs-between-data-accessibility-and-the-environmental-cost-of-storage/.

[^26]: Sustainability Directory. “Why Is Accessibility Important in Design for Sustainability?” *Sustainability Directory*, n.d. https://lifestyle.sustainability-directory.com/question/why-is-accessibility-important-in-design-for-sustainability/.

[^27]: TetraLogical. “Sustainable Accessibility in Complex Organisations: Organisational Realities.” *TetraLogical*, November 7, 2025. https://tetralogical.com/blog/2025/11/07/sustainable-accessibility-in-complex-organisations-organisational-realities/.

[^28]: Texas A&M University. “Myths about Accessibility.” *Texas A&M University Accessibility Resources*, n.d. https://itaccessibility.tamu.edu/resources/myths_about_accessibility.html.

[^29]: Thinking Autism Guide. “Understanding Competing Accessibility Needs.” *Thinking Autism Guide*, October 2018. https://thinkingautismguide.com/2018/10/acknowledging-and-accepting-competing-accessibility.html.

[^30]: ThoughtLab. “Sustainable Web Design: How Your Website Can Help Save the Planet.” *ThoughtLab*, n.d. https://www.thoughtlab.com/blog/sustainable-web-design-how-your-website-can-help-s/.

[^31]: W3C. “Accessibility, Usability, and Inclusion.” *Web Accessibility Initiative (WAI)*, n.d. https://www.w3.org/WAI/fundamentals/accessibility-usability-inclusion/.

[^32]: W3C. “Before and After Demonstration: Overview.” *Web Accessibility Initiative (WAI)*, n.d. https://www.w3.org/WAI/demos/bad/.

[^33]: W3C. “Inaccessibility of CAPTCHA: Alternatives to Visual Turing Tests on the Web.” *W3C Group Draft Note*, December 16, 2021. https://www.w3.org/TR/turingtest/.

[^34]: World Health Organization. “Disability.” *WHO*, March 7, 2023. https://www.who.int/news-room/fact-sheets/detail/disability-and-health.


## Sidebar

curb-cut-effect:
Heading: Curb Cut Effect

A curb cut is the sloped section built into a sidewalk curb to make it easier for wheelchair users to move between the sidewalk and the street. The idea is that a design created for disabled users often ends up helping many others, too. In this guide, that same logic applies to digital design.

For more, please refer to the [Design Processes](/accessibility/designProcesses) primer.

CAPTCHA:
Heading: Why Websites Use CAPTCHAs

CAPTCHAs are typically used to reduce spam, credential stuffing, fake account creation, bulk scraping, and other forms of automated abuse. 

CAPTCHAs are designed to be specifically hard for bots to complete, which becomes increasingly more difficult as artificial intelligence improves. Many CAPTCHAs have historically been based on distorted text because this is an open problem in AI. CAPTCHAs have also been used to help improve technologies: [digitizing books and providing labels to datasets for machine learning](https://blog.goodaudience.com/how-we-all-helped-unknowingly-google-to-digitize-books-acb45bc65084).

Here, the problem is not the security goal itself. Rather, the problem is that many CAPTCHA implementations block legitimate users, which is why more accessible alternatives and fallback options matter.

Please see [captcha.net](http://www.captcha.net/) for more about CAPTCHAs.

accessibility-is-not-one-size-fits-all:
Heading: Accessibility Is Not Always One-Size-Fits-All

Accessibility is not always a matter of finding one solution that works for everyone. In some cases, different disabled users may have genuinely conflicting access needs. A feature that improves access for one group may create barriers for another. These are known as **access conflicts**.[^4] 

For example, highly detailed screen-reader to make content accessible to blind users may produce overwhelming or inefficient audio output for others. Or, in a more specific example, the sound of a bus's door ramp being lowered to let on a wheel-chair user could cause someone with a syncope (fainting) disorder triggered by loud noises to faint, as Hofmann et al. describe from their lives in "[Living Disability Theory: Reflections on Access, Research, and Design.](https://dl.acm.org/doi/10.1145/3373625.3416996)"[^16]

As such, accessibility should not be understood as a single fixed standard or a universal design choice that automatically serves all disabled people equally. Instead, accessible design requires acknowledging trade-offs, offering meaningful alternatives where possible, and ultimately avoiding the assumption that one user profile represents disability as a whole.

As one disability advocate notes, efforts to make something “fully accessible” can become overly prescriptive and may actually end up erasing disabled people whose needs do not fit that model. Indeed, designers should approach it as an ongoing process of negotiating competing access needs with humility and care.[^29]

Promote-Privacy-Protection:
For more, please see the [Consent](/privacy/consent) primer in the privacy section.

recaptcha:
Heading: Improved CAPTCHA Techniques
Due to a number of problems with existing CAPTCHAs, including inaccessibility and poor efficacy, Google has been working to develop [improved forms of CAPTCHAs](https://developers.google.com/recaptcha/docs/versions) that record and analyze the behavior of website users to determine if they are human. Some of these upgrades to the system have been improvements to accessibility, allowing users with visual and/or hearing impairments to easily complete CAPTCHA tasks.

However, these upgraded CAPTCHAs can continue to raise accessibility concerns. For example, Google's reCAPTCHA v2 asked users to click a checkbox, recording their actions as they did so. This task still renders these CAPTCHAs inaccessible for some groups. For example, visually impaired users often prefer keyboard navigation to the use of a mouse, which is more likely to be detected by the test as automated behavior. In addition, the fallback to these systems remains traditional CAPTCHAs, adding more layers of barriers rather than removing them.

More recent work by Google with their 'reCAPTCHA v3,' which tracks and analyzes user behavior _without_ the additional checkbox-marking challenge has been more successful in making CAPTCHA accessible. In their 2022 study, Gaggi found that there was no clear influence of visual impairment on ability to pass these new tests, with a success rate of 99.42% across all groups.[^15]