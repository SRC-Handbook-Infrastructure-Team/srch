---
title: Design Processes
identifier: "2.e"
order: 5
final: false
lastUpdated: April 21, 2026
---

When designing a product, there are many possible routes from ideation to implementation. Design processes provide structure along these routes, offering methods for gathering user needs, testing ideas, and iterating on products through feedback.

Thoughtful design processes that take users' needs into account support **usability** and **accessibility**. Usability refers to the ease of access and use of a product or service, and accessibility includes the evaluation and implementation of accessibility standards.
The forthcoming Understanding Accessibility Standards primer will introduce key standards and legal requirements that designers consider. Integrating these standards throughout the iterative design process helps us discover accessibility barriers earlier and reflect critically on these products through an accessibility lens.

## Core Design Concepts

[Universal Design Principles](https://udl.berkeley.edu/universal-design) ensure that a product is designed for diverse users in terms of accessibility and usability. These principles offer designers a lens to evaluate their design decisions. They are not a strict checklist that designers must follow every time, but a framework that identifies where a product may unintentionally exclude users. These principles include equitable use, flexibility in use, simple and intuitive use, perceptible information, tolerance for error, low physical effort, and size and space for approach and use.[^14]

The concepts below build on this foundation at the level of individual design decisions. The following concepts are not drawn directly from the Universal Design framework's principles, which describe what accessible design should achieve, but each connects to the principles in practice: Hick's Law operationalizes simple and intuitive use, while affordances and feedback translate equitable and error-tolerant design into concrete decisions.

### Simplifying Choices (Hick’s Law)

Hick’s Law (or the Hick-Hyman Law) states that the time it takes to make a decision increases with the number and complexity of the choices.[^6]

Simplifying choices improves efficiency and reduces cognitive load for users. When interfaces minimize unnecessary decisions, users can act more quickly and confidently. For accessibility, reducing cognitive demands especially supports users with ADHD, memory differences, or cognitive impairments.

**Case Study:** {simplifying-choices|Simplifying Choices}

Applying Hick's Law reduces confusion and creates interfaces that are easier to use for users with cognitive differences. Thoughtful simplification prevents oversimplification—removing too many cues (e.g., physical buttons) can harm users who rely on tactile or patterned input.

### Affordances and Signifiers

An **affordance** is a property of an object that, based on its design, suggests how it can be used. A **signifier** is a perceivable indicator that communicates affordances—it indicates how to perform those actions.[^9]

Clear affordances and signifiers make an interface intuitive and easier to use. Accessibility is improved when users can immediately perceive what actions are possible and how to execute them, even when their attention or sensory abilities vary.

**Case Study:** {affordance-and-signifiers|Universal Symbols}

Strong affordances and signifiers reduce learning time and prevent user errors, especially for disabled users, as clear cues ensure they can use the product confidently without trial-and-error.

### Mapping

**Mapping** is the connection between controls and functions, which should clearly match so that users can easily predict outcomes.[^9]

Intuitive, well-mapped interfaces reduce errors and improve learnability. Mapping supports accessibility by allowing users to understand a system’s functionality without trial-and-error, whereas bad mapping may significantly confuse users.

**Case Study:** {iphone-volume-and-brightness-sliders|Mapping}

Good mapping supports users with limited reasoning or memory by making systems more predictable.

### Feedback

**Feedback** is the communication of the results of an action. Systems should provide immediate and meaningful responses to user actions.

Feedback confirms to users that actions have been received, so that users understand the status of both the system and their action. Strong feedback is an important part of accessible design, as it makes sure that users with cognitive or sensory differences can still perceive outcomes clearly.

**Case Study:** {whatsapp-message-delivery-feedback|Feedback}

Clear multimodal feedback prevents user errors and supports accessibility across sensory differences.

## Design Orientations: Defining Who We’re Designing For

**Design orientations** describe how a project defines and prioritizes its intended users. Each orientation invites us to think about accessibility and inclusion in different ways, whether by focusing on a specific user group, aiming for universal design, or designing with marginalized communities first. These orientations shape what "success" means and whose experiences are centered.

These design orientations are not mutually exclusive. However, designers may begin creating a product for a specific group while following universal design principles, ultimately working toward a universally usable product. The intersections of these orientations and processes allow designers to address both specialized and wider user needs.

The following orientations describe different ways designers define and prioritize their users. **Target group**, **universal design**, and **inclusive design** are approaches a designer can deliberately choose. The **curb cut effect**, in contrast, is not an orientation but a potential outcome of these orientations, describing how designing for a specific group can end up benefiting a broader audience.

### Target Group

A **target group** requires a prioritization of who you are designing for based on their needs and contexts, with a specific **user population** in mind.

The importance of designing for a target group lies in meeting specialized needs more effectively than general-purpose design. While this approach focuses resources on specific users, it can also create innovations (i.e., the curb cut effect) that improve usability for broader audiences—though this benefit is not guaranteed.

This orientation helps ensure that a clearly defined group’s needs are met more effectively than they would be through general-purpose design.

**Case Study:** {seeing-ai-for-blind-and-low-vision-users|Target Group}

### Universal Design

**Universal design** is a design that can be accessed, understood, and used to the greatest extent possible by all people regardless of their age, size, ability, or disability.[^4]

Universal design helps reduce the likelihood of excluding users by anticipating any potential variations between users at the early stages of design, ensuring that it is a consistent and accessible experience for everyone.

**Case Study:** {universal-design|Universal Design}

### Inclusive Design

Where universal design aims to create one solution that works for everyone from the start, **inclusive design** begins by identifying who is currently excluded and designing with them first. The key distinction from a target group approach is not just who is centered, but how: target group defines a population and designs for them, while inclusive design treats excluded users as active participants in the design process itself.

Going more in depth, inclusive design is a **human-centered** approach that considers the full range of human diversity—including ability, language, culture, gender, age, and other forms of difference.[^4] It often begins by focusing on a specific group whose needs are not fully met by existing systems, then extends benefits outward to create solutions usable by a broader range of users.

| Design Approach | Description |
| :--- | :--- |
| User&#8209;centered&nbsp;design | Focuses on understanding the goals, preferences, wants, and needs of target users. This data is captured through market research and used to formulate product ideas and improve design iterations. |
| Human&#8209;centered&nbsp;design | Moves beyond individual needs and considers how a product can impact society and the environment. Inclusive design draws from this tradition because it asks not just "how does this user interact with the product" but "what broader conditions are excluding this person in the first place."[^13] |

<!-- The weird &#8209; and &nbsp; are to make those stay on one line -->

**Case Study:** {inclusive-design|Inclusive Design}

### Curb Cut Effect

The **curb cut effect** is not a design orientation itself, but an outcome that can result from any of the above approaches. It illustrates how accessibility-focused design can extend benefits far beyond its target audience, showing how designing for a perceived edge case can improve experiences universally.  
![Sketch of the curb-cut effect](/assets/primer-photos/accessibility/designProcesses/the-curb-cut-effect.png)  
**Figure 1:** Sketch of the curb-cut effect (by Jono Hey, [sketchplanations.com](https://sketchplanations.com/the-curb-cut-effect)[^5])

After World War II, disabled veterans in the United States advocated for curb cuts (short ramps from sidewalks to adjoining streets) to increase their access in the built environment. Advocacy eventually led to legislation mandating curb cuts in federally funded facilities.[^10] Curb cuts also benefit people pushing strollers or luggage, demonstrating that when we design for those at the margins, we often create better experiences for everyone.

**Case Study:** {closed-captions|Closed Captions}

However, the curb cut effect is not always guaranteed. If a design solves a barrier that only applies to a very specific context, the benefits may not extend beyond that group. This is why understanding design orientations and using inclusive methods, as well as following accessibility standards, increases the likelihood of improving usability.

## Design Process

The next step is understanding how those core design concepts come to life in practice with **Design Processes**. The following design processes reflect varying degrees of user involvement, from conducting research on users to engaging users as collaborators in participatory design.

In the US, laws such as the ADA require that physical and digital environments be usable by people with disabilities, while standards like WCAG extend those requirements into more specific technical guidance. These represent the floor of accessible design, which is necessary but not sufficient for meaningful inclusion. For detailed information on specific legal requirements and accessibility standards like WCAG, see the Accessibility Standards primer.

Beyond these standards, designers can engage a range of processes that bring users increasingly into the center of the design process.

### User Research

**User research** involves systematically studying target users to learn more about their behaviors, goals, and contexts. Some common methods of user research include:

- **User Persona:** A fictional representation of a target user, based on research into their behaviors, attitudes, and goals.
- **User Stories:** A short, informal description of a product feature from the perspective of the end-user, explaining who the user is, what they want to do, and why they want to do it.
- **Contextual Inquiry:** Observing and interviewing users in their natural environments to understand how context is shaping their interactions.

User research moves assumptions into evidence-based insights, ensuring the designed product is empathy-driven and grounded in users' actual lived experiences.

### Participatory Design

**Participatory design** practices engage users as active collaborators throughout the design process by placing them in power over when and how systems are created for them. A key component of this practice is the continued involvement of **stakeholders**—users are not only consulted for feedback on a completed product, but are included throughout the design process.

Participatory design incorporates meaningful user participation and perspectives, especially for **underserved groups**, without granting full decision-making power.

**Case Study:** {co-creating-ar-activities-with-older-adults|Participatory Design}

### Co-Design

**Co-design** extends participatory design in user involvement by treating users not just as contributors, but as **equal partners** in shaping the solution. Users are actively engaged in defining scope and problems, generating prototypes and ideas, and making decisions along with designers and developers. Co-design allows participants to define what “problem,” “success,” and “meaningful use” look like—something participatory design may not fully involve users in.

Co-design helps designers better understand user needs, increasing user engagement and promoting collaboration among stakeholders, all leading to more user-centered, engaged, creative, and innovative outcomes. Co-design is especially valuable in contexts where standard research methods may exclude participants, such as **children** or older adults with complex communication or cognitive needs.

**Case Study:** {co-designing-with-kids-with-complex-needs|Co-designing with Kids with Complex Needs}

### Arnstein’s Ladder of Participation

{arnsteins-ladder|Arnstein’s Ladder} is a framework that clarifies the difference between token participation and real user power in decision-making, helping designers assess the depth and authenticity of their user involvement.

## Conclusion

Design processes shape not only how a product is made, but also whose needs and experiences guide the product’s design. Throughout this primer, we saw that meeting legal requirements is only a starting point to designing for meaningful accessibility; it requires clear design orientations, grounding decisions in user research, and incorporating participatory and co-design approaches.

No single design process guarantees accessibility. Instead, accessibility grows out of an ongoing commitment to involve users early and iteratively. Ultimately, accessible design is not a technical add-on but a reflection of whose voices and experiences are included in shaping our products and systems.

[^1]: Arnstein, S. R. (1969). "A Ladder of Citizen Participation." _Journal of the American Institute of Planners_, 35(4), 216–224. https://doi.org/10.1080/01944366908977225

[^2]: Birkeland, J. (2023, June 5). "Behind the design: Headspace." _Apple Developer_. https://developer.apple.com/news/?id=fkfnhq8u

[^3]: Center for Universal Design, NC State University College of Design. (1997). _The Principles of Universal Design_. https://design.ncsu.edu/research/center-for-universal-design/

[^4]: Centre for Inclusive Design & PwC Australia. (2019). _The Benefit of Designing for Everyone_. https://centreforinclusivedesign.org.au/wp-content/uploads/2021/05/inclusive-design-report-digital-160519.pdf

[^5]: Hey, Jono. (2021). "The Curb-Cut Effect." Sketchplanations. https://sketchplanations.com/the-curb-cut-effect

[^6]: Hick, W. E. (1952). "On the Rate of Gain of Information." _Quarterly Journal of Experimental Psychology, 4_(1), 11–26. https://lawsofux.com/hicks-law/

[^7]: Microsoft. (2021). "Seeing AI App Launches on Android." https://blogs.microsoft.com/accessibility/seeing-ai-app-launches-on-android-including-new-and-updated-features-and-new-languages/

[^8]: Microsoft. (n.d.). "Xbox Adaptive Controller." https://www.xbox.com/en-US/accessories/controllers/xbox-adaptive-controller

[^9]: Norman, D. A. (2013). _The Design of Everyday Things: Revised and Expanded Edition_. Basic Books. https://jnd.org/affordances-and-design/

[^10]: Peterson, Julia. (2015). "Smashing Barriers to Access: Disability Activism and Curb Cuts." _National Museum of American History_. https://americanhistory.si.edu/explore/stories/smashing-barriers-access-disability-activism-and-curb-cuts

[^11]: Scribewire. (2021). _The History of Closed Captioning_. https://scribewire.ca/blog/the-history-of-closed-captioning

[^12]: Shahi, S. (2019). _Co-designing with kids with complex needs_. Inclusive Design Research Centre, OCAD University. https://community-led.design/case-studies/co-designing-with-kids-with-complex-needs/

[^13]: Shark Design. (2024). _User-centered design vs. human-centered design: Which approach is right for you?_ https://sharkdesign.com/blog/user-centered-design-vs-human-centered-design-which-approach-is-right-for-you/

[^14]: UC Berkeley Center for Teaching & Learning. (n.d.). _Universal design_. https://udl.berkeley.edu/universal-design

[^15]: Ullal, A., Tauseef, M., Watkins, A., Juckett, L., Maxwell, C., Tate, J., Mion, L. C., & Sarkar, N. (2024). An iterative participatory design approach to develop collaborative augmented reality activities for older adults in long-term care facilities. _Proceedings of the SIGCHI Conference on Human Factors in Computing Systems_. https://doi.org/10.1145/3613904.3642595

## Sidebar

simplifying-choices:
CaseStudy: accessibility/designProcesses/simplifying-choices

seeing-ai-for-blind-and-low-vision-users:
CaseStudy: accessibility/designProcesses/seeing-ai-for-blind-and-low-vision-users

inclusive-design:
CaseStudy: accessibility/designProcesses/inclusive-design

iphone-volume-and-brightness-sliders:
CaseStudy: accessibility/designProcesses/iphone-volume-and-brightness-sliders

whatsapp-message-delivery-feedback:
CaseStudy: accessibility/designProcesses/whatsapp-message-delivery-feedback

affordance-and-signifiers:
CaseStudy: accessibility/designProcesses/affordance-and-signifiers

universal-design:
CaseStudy: accessibility/designProcesses/universal-design

closed-captions:
CaseStudy: accessibility/designProcesses/closed-captions

co-creating-ar-activities-with-older-adults:
CaseStudy: accessibility/designProcesses/co-creating-ar-activities-with-older-adults

co-designing-with-kids-with-complex-needs:
CaseStudy: accessibility/designProcesses/co-designing-with-kids-with-complex-needs

arnsteins-ladder:
Heading: Note: Arnstein’s Ladder of Participation
Sherry R. Arnstein’s 1969 Ladder of Citizen Participation highlights a key idea in the design process and accessibility: “There is a critical difference between going through the empty ritual of participation and having the real power needed to affect the outcome of the process."[^1] Arnstein outlines eight layers of participation, grouped into three levels:

- **Nonparticipation**: Manipulation, Educating
- **Tokenism**: Informing, Consultation, Placation
- **Citizen Power**: Partnership, Delegated Power, Citizen Control

Tokenism describes situations where users are asked what they think, but decision-making remains in the power of someone else. This allows power-holders to claim that “all sides were considered,” even though only some sides ultimately benefit.

Arnstein’s Ladder helps us assess where our design processes actually sit on the ladder. This model is helpful for distinguishing the intentions behind user research, participatory design, and co-design—ensuring that participation is actually impactful rather than symbolic.
