---
title: Accessibility Biases
order: 4
final: false
---

# The Importance of Recognizing Biases

Inclusive design is a method for creating products and experiences that are accessible, usable, and clear to a wide range of people. It expands beyond basic accessibility by addressing the diverse needs, backgrounds, and perspectives of users. For more information on inclusive design, see [nav:Design Processes](accessibility/designProcesses).

People develop [**mental models**](https://www.sciencedirect.com/topics/social-sciences/mental-model#:~:text=A%20mental%20model%20is%20a,of%20widespread%20erroneous%20mental%20models) based on past experiences. If a system contradicts familiar patterns, it becomes difficult to use. Cognitive biases, such as the tendency to rely on previous knowledge, influence how individuals expect technology to function. Aligning with well-established patterns and intuitive interactions minimizes confusion and improves usability.

Mistakes often stem from _poorly designed systems_ rather than user failure. Slips occur when actions are performed incorrectly due to design inconsistencies, while mistakes result from unclear or misleading instructions. Thoughtful design reduces errors by offering clear guidance, reversible actions, and safeguards against accidental inputs.

Complex interfaces require users to process and remember too much information at once, making interactions overwhelming. When a system demands high cognitive effort, it becomes harder to navigate and increases the likelihood of mistakes. Organizing information logically, reducing unnecessary steps, and maintaining consistency in design elements allow users to focus on completing tasks with minimal effort.
<br>

## Understanding the Biases in Design

Cognitive biases are systematic patterns of deviation from rationality in judgment, often caused by [**heuristics**](https://www.nature.com/articles/s41599-023-01542-z) that help people process information quickly but can lead to errors. When designing systems, products, or policies, cognitive biases can subtly shape decisions in ways that reinforce existing assumptions.

Please note that the case studies, used to support the biases mentioned below, are <i>hypothetical scenarios</i> not real-world examples. Key examples include:

[**Automation Bias**](https://cset.georgetown.edu/publication/ai-safety-and-automation-bias/#:~:text=Automation%20bias%20is%20the%20tendency,the%20face%20of%20contradictory%20information.) refers to the tendency for individuals to favor suggestions from automated systems over their own judgment especially as these technologies become more integrated into daily decision-making. This bias can lead people to overlook errors, ignore contradictory information, or fail to question flawed outputs, simply because they trust the authority or perceived objectivity of the system.

{Case-Study-for-Automation-Bias}

[**Availability Bias**](https://pmc.ncbi.nlm.nih.gov/articles/PMC7807127/) refers to the tendency for individuals to favor suggestions from automated systems over their own judgment especially as these technologies become more integrated into daily decision-making. This bias can lead people to overlook errors, ignore contradictory information, or fail to question flawed outputs, simply because they trust the authority or perceived objectivity of the system.

{Case-Study-for-Availability-Bias}

[**Choice Overload**](https://pmc.ncbi.nlm.nih.gov/articles/PMC11111947/) occurs when individuals are confronted with too many options leading to decision paralysis and diminished satisfaction with their final choice. The abundance of alternatives can make it difficult to evaluate each option thoroughly causing cognitive fatigue. As a result, users may struggle to make decisions, often leading to a sense of regret or doubt about their decision, even if the choice made was objectively good.

{Case-Study-for-Choice-Overload}

[**Confirmation Bias**](https://link.springer.com/article/10.1007/s10670-020-00252-1) is when individuals seek out, interpret, or remember information in a way that supports their existing beliefs or opinions, often ignoring content that challenges them.

{Case-Study-for-Confirmation-Bias}

[**Framing**](https://www.sciencedirect.com/science/article/pii/S0899825620300294) refers to the cognitive bias in which people make different decisions based on whether a situation is presented with a focus on positive (gain) or negative (loss) aspects, impacting their choices. The choice of language, context, or perspective in which information is framed can shape perceptions often without the individual being fully aware of the influence.

{Case-Study-for-Framing}

[**Implicit Bias**](https://www.researchgate.net/publication/323818238_New_Information_Technology_and_Implicit_Bias) describes the subconscious associations people make between certain attributes, such as race, gender, or age, and particular traits or behaviors. As a result, they can influence decisions in ways that perpetuate inequities, even among individuals who consciously reject discriminatory attitudes.

{Case-Study-for-Implicit-Bias}

Biases can unintentionally reinforce exclusion by shaping design choices that favor certain perspectives while overlooking others. By recognizing and mitigating these biases, designers can create more inclusive, user-centered systems that accommodate a broader range of needs and experiences.
<br>

## Mitigating Bias for Ethical, User-Centered Design

Effective design requires input from the people who will use the systems. Involving communities in the design process leads to solutions that are more relevant, equitable, and responsive to real-world needs.

### Common Principles of Participatory, Co-Design, and Inclusive Design Methods

**Participatory design** involves actively _including stakeholders, users, or impacted communities_ in the design process. It emphasizes conducting research with people rather than on or for them. Different terms exist for these approaches because they come from distinct academic traditions, but they all share the goal of integrating diverse voices into decision-making.

However, **co-design** takes this collaboration a step further by _treating community members or users as equal partners_ in the design process. In co-design, users are not just consulted or included– they actively collaborate with designers throughout all stages, from ideation to prototyping, making certain that their expertise directly shapes outcomes. This collaborative dynamic provides a deeper sense of ownership and empowerment among participants, resulting in solutions that are even more aligned with their needs and experiences.

A key aspect of this collaborative process is **parallel low-fidelity prototyping**, a design method where _multiple prototypes are developed simultaneously_. This approach allows designers to explore a wide range of design ideas and solutions concurrently, rather than commit to a single direction early on. By using quick, low-fidelity methods such as paper sketches or basic wireframes, designers can rapidly test and iterate on different concepts, gathering feedback and refining ideas in real-time. This iterative process is crucial for identifying the most effective design solutions while keeping user input at the center of development.

Fair and representative data collection is crucial for ensuring that datasets used in AI or UX research reflect the diversity of real-world experiences. This inclusivity helps prevent bias in model predictions and design decisions, which encourages more equitable and effective solutions for a broader range of users.

## Sidebar

Case-Study-for-Automation-Bias: 
A designer implements a high-contrast mode in a new app to improve accessibility for visually impaired users. After gathering feedback from a small group of users who respond positively, the designer assumes the solution effectively meets the needs of all individuals with visual impairments. However, this assumption reflects confirmation bias, as it overlooks users with different accessibility needs– such as those with light sensitivity, who may find high-contrast modes uncomfortable or even painful. By failing to consider a diverse range of user experiences, the designer unintentionally creates an exclusionary design that benefits some but alienates others. A more inclusive approach would involve engaging a wider range of users, incorporating iterative testing, and offering customizable contrast settings to accommodate varying accessibility needs.

Case-Study-for-Availability-Bias: 
A ticket booking website features an _interactive visual seat selection tool_, designed under the assumption that clicking on a seating chart is the most intuitive way to choose a seat. However, this approach overlooks users who rely on _screen readers_ or _keyboard navigation_, making the process inaccessible. Because the design is shaped by what seems familiar and efficient to sighted users, it fails to account for diverse interaction needs. Without alternative methods, such as a structured list view with text-based seat descriptions, users with visual or motor impairments may struggle to complete their booking. A more inclusive design would provide multiple ways to select seats, ensuring accessibility through keyboard-friendly navigation, ARIA labels, and text-based alternatives.

Case-Study-for-Choice-Overload:
A meal delivery service offers a vast array of customization options for users to choose from, including multiple dietary preferences, ingredient exclusions, meal types, and portion sizes. Although the intention is to cater to every possible preference, the overwhelming number of choices can create **choice overload**, especially for users with _cognitive or attention challenges_ who find it difficult to sift through all the options. For individuals with _visual impairments_, navigating through the dense array of categories and subcategories can be a time-consuming process. A more **accessible design** would simplify the decision-making process by offering clear categories, reducing unnecessary options, and providing guided assistance to help users focus on what matters most to them.

Case-Study-for-Confirmation-Bias: 
A high-contrast mode is introduced in a digital interface to improve accessibility for visually impaired users. Initial feedback from a small group of users is overwhelmingly positive, reinforcing the belief that the solution effectively meets accessibility needs. However, this **confirmation bias** leads to the oversight of _edge cases_, such as individuals with light sensitivity or migraines, who may find high-contrast displays uncomfortable or even painful. As a result, the design, intended to be inclusive, ends up inadvertently excluding users with different visual needs. A more effective approach would involve testing with a diverse range of users, considering multiple accessibility preferences, and offering customizable contrast settings to accommodate varying sensitivities.

Case-Study-for-Framing: 
A digital health app integrates _motivational nudges_ for users with cognitive disabilities, using phrases like “Don’t miss out, log your medication now!” to encourage adherence. While early user engagement metrics show improvement, the use of loss-framing inadvertently induces stress among users with anxiety or executive dysfunction, who interpret the phrasing as punitive. This **framing**, intended to drive behavior, ends up discouraging use among the very population it supports. A reframed, gain-oriented message, such as “You're on track, log your medication to keep the streak going!” proves more inclusive by supporting motivation without invoking fear of failure.

Case-Study-for-Implicit-Bias:
A fitness app uses color-coded progress indicators, such as green to signify success and red to indicate failure. While this design may seem intuitive for many users, it unintentionally excludes those with color vision deficiencies, such as red-green colorblindness, who may struggle to distinguish between these cues. As a result, critical performance feedback becomes less accessible, reinforcing an implicit bias toward users with typical color vision. This oversight highlights the importance of designing with multiple accessibility considerations in mind. A more inclusive approach would incorporate additional visual elements (i.e., icons, text labels, or patterns) to ensure all users, regardless of color perception, can effectively interpret their progress.
