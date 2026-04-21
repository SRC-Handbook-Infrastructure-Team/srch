---
title: Biases in Design
order: 4
final: false
lastUpdated: 2026-04-21
---

## Overview: The Importance of Recognizing Biases

One of the biggest challenges to accessible technology is {cognitive-biases}, which are systematic patterns in how we think that can lead us to overlook certain users’ needs or make assumptions about how people interact with systems. As discussed in [What is Accessibility?](/accessibility/whatIsAccessibility), accessibility encompasses three interconnected dimensions: Universality, Disability, and Equity. Cognitive bias undermines accessibility across all three dimensions and can cause even well-meaning designers to unintentionally create barriers for users.

Cognitive biases shape design decisions by influencing how designers interpret user needs and system requirements. More generally, biases shape what we notice, prioritize, and whose needs we overlook. Accessibility requires recognizing how our instincts about what constitutes normal, intuitive, or good design are shaped by our own abilities and experiences. Understanding what bias is, which specific biases might appear, and how biases manifest can help us question those instincts. Bias recognition must precede bias prevention, because we cannot design accessible technology without first understanding how our assumptions shape design decisions.

To understand where these biases enter the design process, it is important to first understand three sets of conceptual ideas that explain why biases are persistent and harmful in design: 1. Mental models and familiarity, 2. The invisibility of bias, and 3. Exclusion.

### Mental models and familiarity

Individuals create {mental-models} for how they expect technology to function based on past experiences. These expectations are {judgmental-heuristics}—mental shortcuts that help people make quick decisions by drawing on what has worked before. Heuristics allow us to function efficiently when encountering large amounts of information and stimuli. In design contexts, aligning with well-established patterns and intuitive interactions can minimize confusion and improve usability.[^4] Because we inevitably draw from our own experiences when creating these patterns, however, we can unconsciously treat our own mental models as universal and risk creating systems that only work for people with backgrounds and abilities similar to our own. A hypothetical example of this mental model can be found {mouse|in most designers’ reliance on the mouse for navigation}.

For an activity that demonstrates how mental models vary even for simple everyday tasks, see the {draw-toast|Draw Toast exercise}.

### The invisibility of bias

Biases often operate unconsciously, making flawed decisions feel intuitively correct to the decision-maker. These mental shortcuts developed as evolutionary adaptations, helping early humans make quick judgments for survival.[^3] Cognitive psychologists have established that biases stem from unconscious, automatic processes that can enable fast and efficient decision-making.[^2] When we rely on familiar patterns or make assumptions about user capabilities, these choices are made {system|rapidly and intuitively}, rarely triggering self-doubt. In design contexts, studies show that designers frequently commit to concrete design concepts from the beginning, possibly ignoring alternative options.[^2]

Additionally, individuals often under-detect their own biases compared to those of others, causing a “bias blind spot”[^10] where people recognize bias in others more readily than in themselves. This creates a challenge in design contexts: we may acknowledge that the bias affects the field generally while remaining unaware of how it shapes our decisions. Even when we become aware that we have made an assumption, we may not recognize it as bias if the assumption aligns with professional training, industry standards, or widely accepted design principles.

### Exclusion

When biases go unexamined, designs will naturally center dominant groups—those who are most represented in design teams, user research, product marketing, and so on. The preferences, experiences, and assumptions of these groups can become the default, causing marginalized groups to be systematically overlooked over time. Inaccessible designs extend beyond individual inconvenience—they can prevent people from accessing essential services[^11], participating in civic life[^7], pursuing education[^6], or being able to work[^12]. These oversights compound into systemic barriers that reinforce existing inequities.

The biases described in the following section illustrate specific ways this exclusion may manifest in design decisions, from the patterns designers rely on to the assumptions they make about their users.

## Understanding Key Biases in Design

Here are some key cognitive biases that commonly affect design decisions, along with examples illustrating their impact. The term bias here refers to ones that a designer might be subject to that leads to inaccessible and poorly designed products. Each subsection includes a definition and the potential impact. Notably, the following biases is not a comprehensive list of biases—for more, see [this comprehensive list of biases](https://thedecisionlab.com/biases).

### Automation bias

Automation bias is the tendency for people to favor suggestions from automated systems over their own judgment, especially as these technologies become more integrated into daily decision-making. This bias can lead people to overlook errors, ignore contradictory information, or fail to question flawed outputs simply because they trust the perceived authority or objectivity of the system.

### Availability bias

Availability bias is a cognitive shortcut in which people often judge the likelihood or importance of an event based on how easily examples come to mind. This usually means that vivid, recent, or emotionally charged memories can disproportionately influence decision-making regardless of their relevance.

### Choice overload

Choice overload occurs when individuals are confronted with too many options, causing them to experience decision paralysis. The abundance of alternatives can make it difficult to evaluate each option thoroughly, causing cognitive fatigue. As a result, users may struggle to make decisions, often leading to a sense of regret or doubt about their decision, even if the choice made was objectively good. If a poor choice was made due to the difficulty of evaluating alternatives, the user may be less likely to engage with the system in the future.

#### Confirmation bias

Confirmation bias is when individuals seek out, interpret, or remember information in a way that supports their existing beliefs or opinions, often ignoring information that challenges them. This reduces objectivity and may perpetuate errors in judgment or evaluation.

### Framing effect

The framing effect describes how the choice of language, context, and perspective presented alongside information changes how it is perceived, often without the individual being aware of its influence. Situations might be presented with a focus on positive (gain) or negative (loss) aspects. Framing may cause individuals to make decisions based on context cues rather than the information itself, leading them to be dissatisfied with choices or even feel deceived by an interface.

### Implicit bias

Implicit bias describes the subconscious associations made between certain attributes—such as race, gender, age, or ability—and particular traits or behaviors. Implicit biases can influence decisions in ways that perpetuate inequities, even among individuals who consciously reject discriminatory attitudes.

## Important Notes on Biases

### Biases rarely work in isolation.

It is often difficult to distinguish where one type of bias ends and another begins. For example, implicit bias about who uses technology might lead a designer to seek out certain user research participants (availability bias), which then reinforces their initial assumptions (confirmation bias). This overlap makes identifying specific biases in real-world scenarios challenging.

### Biases aggregate across levels.

These biases can aggregate across levels, creating a compound effect.[^1] For example:

- Individual level: a designer experiences availability bias and gets research from a specific demographic.
- Team level: confirmation bias leads the team to interpret positive feedback as proof that the design works.
- Organizational level: the company’s hiring practices result in homogeneous design teams who have similar blind spots.
- Industry level: the success of the product shapes industry standards for “what works.”

This compounding effect helps explain why accessibility problems persist systematically. Individual awareness, while necessary, is not sufficient without addressing team processes, organizational structures, and industry norms. Biases, including ones beyond what we mention in this primer, may operate simultaneously across these levels.

# Conclusion

Inaccessible design due to cognitive biases is not inevitable. Rather, accessibility can be achieved by questioning what is “obvious” and addressing our biases. Although bias cannot be eliminated entirely, it is vital to encourage critical awareness and accountability in how design decisions can include or exclude different user groups. The goal is to build the habit of asking whose needs a decision may overlook. Recognizing bias is the first step; the next requires understanding how to translate this awareness into concrete design processes.

_An update with real-world case study examples for the biases discussed in this primer will be available Fall ‘26._


[^1]: Balarezo, Jose D., Nicolai J. Foss, and Bo Bernhard Nielsen. "Organizational Learning: Understanding Cognitive Barriers and What Organizations Can Do about Them." *Management Learning* 55, no. 5 (2024): 741–68. https://doi.org/10.1177/13505076231210635.

[^2]: Bellman, Eric. “Amazon, to Win in Booming Rural India, Reinvents Itself.” 2018. *Wall Street Journal*. https://www.wsj.com/articles/amazon-to-win-in-booming-rural-india-reinvents-itself-11546196176.

[^3]: “Charting the Evolutionary Roots of Cognitive Biases.” 2025. *Vanderbilt Law School*. https://law.vanderbilt.edu/charting-the-evolutionary-roots-of-cognitive-biases/.

[^4]: “Cognitive Biases and Design Research: Using Insights from Behavioral Economics and Cognitive Psychology to Re-evaluate Design Research Methods.” In *Design and Complexity - DRS International Conference 2010*. 2010. https://dl.designresearchsociety.org/drs-conference-papers/drs2010/researchpapers/95/

[^5]: "Draw How To Make Toast: A Simple and Fun Introduction to Systems Thinking." n.d. http://www.drawtoast.com/.

[^6]: “Inclusive Schools: Designing for Disability in Classrooms.” 2022. *HMC Architects*. http://hmcarchitects.com/blog/2020/06/12/inclusive-schools-designing-for-disability-in-classrooms/.

[^7]: “Innovations in Accessible Elections – Final Report.” n.d. *Center for Civic Design*. https://civicdesign.org/avti/innovations-in-accessible-elections/.

[^8]: Kahneman, Daniel. *Thinking, Fast and Slow*. 1st ed. New York: Farrar, Straus and Giroux, 2011.

[^9]: Kannengiesser, Udo, and John S. Gero. “Design Thinking, Fast and Slow: A Framework for Kahneman’s Dual-System Theory in Design.” *Design Science* 5 (2019): e10. https://doi.org/10.1017/dsj.2019.9.

[^10]: Pronin, Emily, Daniel Y. Lin, and Lee Ross. "The Bias Blind Spot: Perceptions of Bias in Self Versus Others." *Personality and Social Psychology Bulletin* 28, no. 3 (2002): 369–81. https://doi.org/10.1177/0146167202286008.

[^11]: Ravensbergen, Léa, Mathilde Van Liefferinge, Jimenez Isabella, Zhang Merrina, and Ahmed El-Geneidy. "Accessibility by Public Transport for Older Adults: A Systematic Review." *Journal of Transport Geography* 103 (2022): 103408. https://doi.org/10.1016/j.jtrangeo.2022.103408.

[^12]: “Systemic Barriers in the Workplace: Disability Inclusion.” n.d. *Invisible Condition*. https://www.invisiblecondition.com/blog/systemic-barriers-in-the-workplace-disability-inclusion.


## Further Reading

- [Addressing Structural, Social, and Symbolic Exclusion of Disabled People \- Anna Cechony, Ahmmad Brown, 2025](https://journals.sagepub.com/doi/10.1177/19367244251344530?int.sj-full-text.similar-articles.5)
- [Considering cognitive biases in design: an integrated approach \- ScienceDirect](https://www.sciencedirect.com/science/article/pii/S1877050924002746)
- [Decolonising design in peacebuilding contexts \- ScienceDirect](https://www.sciencedirect.com/science/article/pii/S0142694X21000120)
- [Digital Accessibility by WeCo](https://theweco.com/)
- [Invisible Women: Data Bias in a World Designed for Men by Caroline Criado Pérez | Goodreads](https://www.goodreads.com/book/show/41104077-invisible-women)
- [Mitigating Cognitive Bias to Improve Organizational Decisions: An Integrative Review, Framework, and Research Agenda](https://www.researchgate.net/publication/385156312_Mitigating_Cognitive_Bias_to_Improve_Organizational_Decisions_An_Integrative_Review_Framework_and_Research_Agenda)
- [Retention and Transfer of Cognitive Bias Mitigation Interventions: A Systematic Literature Study \- PMC](https://pmc.ncbi.nlm.nih.gov/articles/PMC8397507/)
- [Unpacking Dominant Design: A critical analysis of power and dominant discourse in Design](https://dl.designresearchsociety.org/cgi/viewcontent.cgi?article=1338&context=iasdr)
- [What are Cognitive Biases? | IxDF](https://www.interaction-design.org/literature/topics/cognitive-biases)

## Sidebar

Cognitive-Biases:
Systematic patterns in how we think that can lead us to overlook certain users' needs or make assumptions about how people interact with systems.

Mental-Models:
Internal representations of how individuals expect something to function based on past experiences. We may treat our own mental models as universal and therefore risk creating systems that only work for people with similar backgrounds and abilities to ours.

Judgmental-Heuristics:
Mental shortcuts that help people make quick decisions by drawing on what has worked before.

mouse:
Heading: Mouse Reliance for Navigation
A designer who primarily uses a mouse may create an interface with hover-dependent menus and drag-and-drop functionality, assuming these interactions are intuitive. When they rely solely on their own mental model of interaction, they risk excluding users who navigate with keyboards, screen readers, or voice commands. This design solution is only effective for people with similar motor abilities and preferences, reflecting a bias in the designer’s mental model and thus overlooking users with needs that differ from the designer’s.

draw-toast:
Heading: Draw Toast: A Mental Model Exercise
Want to see mental models in action?
Try this exercise: take 30 seconds to sketch how you make toast. Now compare your drawing with someone else’s. You’ll likely find significant variation, showing how differently we might conceptualize the same routine task.

From the Draw Toast website: “\[drawings range from\] crisp and clear to cluttered and confused and from those that look at the whole system to those that pick out a single component. The point is to highlight the biases. No single drawing is complete or comprehensive. Each simply represents a point of view.”[^5]

In design, we might assume our toast-making process is universal, but users might have completely different mental models. Get step-by-step instructions for the activity at [http://www.drawtoast.com/](http://www.drawtoast.com/). ![Examples of the toast-making process](/assets/primer-photos/accessibility/biases/drawToast.png)
Figure 1\. Examples of the toast-making process.

system:
Heading: System 1 and System 2 Thinking

To understand why these automatic processes may dominate our thinking, we can look to Kahneman’s dual-system theory. The theory provides a two-system basis for human decision-making: System 1 for fast, intuitive thinking and System 2 for slow, deliberate reasoning. For further elaboration on the mechanisms of these two systems, see Kahneman’s _Thinking Fast and Slow_.[^8]

In design practices, System 1 drives efficiency but also fuels design fixation, where teams jump directly from “what this should do” to “how it should look,” relying on familiar solutions that feel intuitive.[^9] Studies show that design processes often institutionalize this speed through design catalogs, selection charts, and pattern libraries, which codify past solutions for rapid reuse.

![Google’s Material Design icon library showing common UI icons.](/assets/primer-photos/accessibility/biases/iconLibrary.png)
Figure 2\. Google’s Material Design icon library showing common UI icons. 

The figure above shows Google’s Material Design library, a famous example of a pattern library. Its Figma library has over 3.5 million users. Notice the search icon in the upper left. While widely recognized in the West, UX research has documented that users in some regions of India interpreted this icon as a ping-pong paddle instead of a search tool, highlighting how even standard library icons can lead to miscommunication across cultures.[^2] This demonstrates how accessibility is contextual, and the biases leading to a single design solution may not hold for all users.

Tools that effectively engage biases strengthen _reflexive_ and _reactive_ reasoning: fast, experience-based modes that can reduce cognitive effort but can also embed assumptions over time. Engaging System 2, the slower and reflective mode of reasoning, encourages designers to move beyond automatic responses and reassess past assumptions, decreasing (but not eradicating) the chance that design decisions lead to exclusion or oversights of diverse user needs.
