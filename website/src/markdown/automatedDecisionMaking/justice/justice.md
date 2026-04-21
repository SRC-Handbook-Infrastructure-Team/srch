---
title: Justice in AI
order: 4
final: false
---

# Justice in Artificial Intelligence Outline

## Introduction

Justice is the idea that individuals should be treated fairly. However, what that means when trying to create the best AI Systems presents many questions, diverging opinions, and diversity in implementation.

While [fairness](/AI/fairness), as currently formalized in AI, relies on mathematical criteria, justice relies on an ever-evolving assumption about what counts as “just.” Justice reflects deeper philosophical tensions about what kind of justice AI systems should aim for: distributive, procedural, or other philosophical approaches. Justice requires tools that actively build on equality and access: Can AI be that tool?

## Conceptions of Justice

There are many efforts to build mathematically fair models and de-bias datasets as well as govern the outcomes of Automated Decision Systems (ADS). However, a philosophical notion of justice provides an intellectual framework for building models and tech. There is no one notion of justice that is accepted by everyone and some conceptions also conflict with each other, making all impossible to implement at once.[^1] The choice of guiding methodology largely depends on the outcome goal behind and values behind development of ADS. Principally, there are two big overarching conceptions that show different approaches to what justice should achieve:

| Process-Focused Justice                                                                                                                                                                                                                                                                                                                                                                                                               | Outcome-Focused Justice                                                                                                                                                                                                                                                                                                                           |
| ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Process-focused approaches to justice focus only on the process through which the users go, not on the outcomes of that process Process-focused justice is the idea that all individuals and groups should be respected and valued in automated decision-making processes. It applies to interactions with all kinds of decision-makers, whether that be a legal authority, corporate system, community institution, or an algorithm. | Outcome-focused justice focuses on the fairness of the outcomes or results of decisions and actions taken. This is a philosophy of fair distribution of resources, opportunities, or benefits, which can also be applied to AI outputs. This concept emphasizes that outcomes must not perpetuate existing inequities or systemic discrimination. |

#### Key Questions for Process-Focused Justice in AI:

- Are individuals treated with dignity and respect in automated decision-making processes and outcomes?
- Is there clear communication about why the system is making certain decisions?
- Can individuals contest the AI system’s decisions, and are those processes accessible and fair?
- Do appropriate mechanisms for accountability (e.g. effective auditing) exist?

Key components of process-focused (or procedural) justice are **respect, trustworthiness**, granting everyone a **voice** to tell their side, and **neutrality.**

**Respect** captures the idea that all individuals must be treated with dignity. This includes courteous communication, acknowledgment of people's concerns, and the absence of demeaning or dismissive behavior.

**Trustworthiness** refers to whether decision makers convey sincere, benevolent, and fair motives to those impacted by their decisions. People evaluate not only the logic of a decision but also the intentions behind it. Trust is strengthened when decision makers demonstrate concern for stakeholders' well-being and explain their reasoning in ways that signal integrity and accountability. A key aspect of trustworthiness is transparency and right to request explanations for model's performance, like in the {youtube-case|YouTube moderation case}.

**Voice** emphasizes that everyone affected by a decision is given the opportunity to share their perspective. This does not guarantee that every viewpoint will determine the outcome, but it ensures that the process is participatory rather than unilateral.

**Neutrality** refers to the expectation that decisions are unbiased. A procedurally just process requires that rules are applied consistently, that decision criteria are clearly explained, and that personal preferences or prejudices do not shape outcomes.

#### Key Questions for Outcome-focused justice (Distributive Justice) in AI:

- Do particular individuals or communities receive a disproportionate share of resources, opportunities, or risks because of the system’s design?
- What trade-offs, if any, exist between the three tenets of distributive justice (i.e., sufficiency, priority, and equality of opportunity)?
- Does the system cause the deepening of social, economic, or political advantages for certain groups while leaving other groups behind?

**Sufficiency**, **priority**, and **equality of opportunity** are three distinct ways to assess automated decision-making systems through the lens of distributive justice. They are at times contradictory, but show diverse proposed ways of achieving outcome-focused justice.

**Sufficiency** focuses on ensuring that all individuals and groups reach a minimum acceptable threshold of resources, protections, and opportunities. The core idea is that no one should fall below an ethically justifiable standard of well-being, even if outcomes are not perfectly equal. Rather than seeking to equalize all results, a sufficiency approach prioritizes meeting fundamental needs first and protecting the most vulnerable from serious harm. In AI systems, sufficiency asks whether automated decisions systematically push anyone below this threshold.

**Priority** emphasizes directing resources and opportunities to those who are worst off or face the most urgent needs. It acknowledges that some individuals or groups require more intensive or immediate support in order to achieve genuinely fair outcomes. For automated decision-making, priority asks whether AI systems are capable of recognizing existing disparities and responding in ways that reduce them rather than entrench them. This lens focuses on how outcomes are distributed, especially for people who are already disadvantaged.

**Equality of opportunity** ensures that all individuals have fair access to valuable resources and life chances, regardless of morally arbitrary characteristics such as race, gender, or socioeconomic background. Principally, it aims to remove any barriers that prevent equitable participation and advancement in society. In the context of AI, equality of opportunity involves designing systems that avoid reproducing historical biases and that support inclusive access to beneficial decisions. It evaluates not only who “wins” or “loses” in an algorithmic process, but whether people had a fair chance, given their starting position, to benefit from the technology.

**Case Study:** {Generative-AI-Based-Tutoring-System-for-Upper-Egypt-Community-Schools|Generative AI-Based Tutoring System for Upper Egypt Community Schools}

## Other Notions of Justice

However, beyond the principally-different conceptions of justice (process vs outcome), many other ideas and philosophies have emerged to capture the breadth of inequalities and areas of life that get affected by possible injustices.

## Restorative Justice

**Restorative justice is a set of principles and practices to deal with crimes or incidents, as violations of people and relationships. While it holds perpetrators accountable, it attempts to determine what can be done to repair that harm and rebuild the damaged relationships.**
Restorative justice can help victims build a constructive relationship or dialogue with those who harmed them, but only through a voluntary, safe, and facilitated encounter in which offenders accept responsibility and all affected parties have a voice. Its goal is repair:[^5] supporting victims’ healing, giving offenders a chance to make amends, and helping the wider community restore trust, safety, and relational health. It also seeks transformation by addressing not only individual harm but also the deeper social or structural causes of wrongdoing, so that people, relationships, and systems can change. One example of these initiatives is the {dfBL-case|Data for Black Lives's effort to build data-based reparations for healthcare}.

#### Key AI Questions for Restorative Justice:

- Which people and communities most affected by this AI system have been harmed, excluded, or misrepresented by similar systems in the past?
- Are harmed people and communities meaningfully involved in shaping how this system is designed, reviewed, and governed?
- What concrete harms, exclusions, or injustices could this AI system perpetuate, and what specific steps are built in to acknowledge, prevent, and repair those harms?
- Does this system merely avoid repeating past harm, or does it also address the deeper structural causes that made those harms possible?

## Epistemic Justice

**The key theorist of epistemic justice Miranda Fricker explains it through the prism of epistemic injustice. She theorized that epistemic injustice is “wrong done to someone in her capacity as a knower.”[^7] At the core of it, epistemic injustice occurs when certain people’s knowledge, experiences, or interpretive frameworks are systematically excluded or devalued. Along with Fricker, many theorists since then, like Revathi Krishnaswamy, Raewyn Connell, Boaventura De Sousa Santos, Victoria Zurita, Chen Bar-Itzhak, and others, have applied epistemic justice frameworks to literature, politics, science, and other domains where marginalization and delegitimating occur towards knowledge and ways of understanding come from non-dominant cultural centers.[^8]**

In AI, this manifests through {data-colonialism}, biased training sets, and {hegemonic-definitions-of-accuracy}. Algorithmic systems often silence marginalized perspectives by codifying only the dominant worldview, turning epistemic inequality into {technological-infrastructure}.

#### Key AI Questions for Epistemic Justice:

- Whose knowledge, perspectives, and lived experiences are included in the data and design and which are missing?
- Does the AI system privilege one cultural or epistemic framework as “objective” or “neutral”?
- Do marginalized communities have the power to contest how they are represented or categorized?
- Does the system unintentionally silence, distort, or misinterpret certain groups?

## Structural Justice

**Stuctural bias examines not just what an AI system decides, but the wider web of institutions, norms, and power relations it may reinforce. Structural harm emerges when technological systems reproduce social processes that systematically expose some populations to domination, deprivation, or vulnerability while expanding the opportunities of others[^11]. For example, feminist theorists highlight that structural violence is sustained through policies, organizational routines, and cultural norms that constrain autonomy and reproduce inequality, even when no individual intends harm.[^12] Evaluating AI through this lens requires asking not only whether the model is biased, but whose power it extends, whose lives it becomes entangled with, and whose vulnerabilities it amplifies.**

#### Key AI Questions for Structural Justice:

- Does the AI reproduce existing power hierarchies or actively challenge them?
- Are there institutional practices, laws, or economic structures that the AI amplifies that disadvantage certain groups?
- Does the AI system increase surveillance, monitoring, or control over already marginalized populations?
- Does the AI rely on data collected through extraction, coercion, or [limited consent](/privacy/consent)?

## Environmental Justice

**Environmental justice examines how environmental benefits, burdens, and risks are distributed across communities, and whether some groups bear disproportionate harms from environmental degradation. When applied to AI, environmental justice assesses how algorithmic systems influence environmental governance, resource allocation, climate risk management, and the ecological footprint of {AI-infrastructure} itself.**

#### Key AI Questions for Environmental Justice:

- Who bears the environmental costs of AI development? Are these costs geographically or socio-economically concentrated?
- Are Indigenous and local communities consulted when environmental models rely on land, cultural resources, or ecological knowledge?
- How are environmental harms and benefits distributed across regions, particularly the Global South versus the Global North?

ADS systems don’t exist in a vacuum but within the same social, political, and environmental systems that shape human institutions. As a result, questions of justice in AI cannot be reduced to a single definition of fairness or a single technical solution. Instead, they emerge at the intersection of multiple traditions of justice that illuminate different dimensions of how technological systems affect people and communities.

Deciding which approach to justice to take will be driven by the community for whom the technology is created, the overall goals, and agency of the developer, but various frameworks laid out in this primer show that justice in AI is inherently multidimensional. A system may appear procedurally fair while producing unequal outcomes. It may reduce bias in predictions while still reinforcing structural inequalities or extracting environmental resources from vulnerable communities. Addressing justice in AI therefore requires looking beyond isolated technical metrics toward a more comprehensive understanding of how algorithmic systems operate within society.

## Bibliography

Buccella, Alessandra. 2023\. "'AI for All' Is a Matter of Social Justice." AI and Ethics 3: 1143-1152.

Burnett, Camille, Michael Swanberg, Ashley Hudson, and Donna Schminkey. 2018\. "Structural Justice: A Critical Feminist Framework Exploring the Intersection between Justice, Equity and Structural Reconciliation." Journal of Health Disparities Research and Practice 11, no. 4, article 4\.

Data for Black Lives. 2020\. "What Is Data for Black Lives?" September 1, 2020\. https://d4bl.org/videos/55-what-is-data-for-black-lives.

Fricker, Miranda. 2007\. Epistemic Injustice: Power and the Ethics of Knowing. Oxford: Oxford University Press. https://doi.org/10.1093/acprof:oso/9780198237907.001.0001.

Gabriel, Iason. 2022\. "Toward a Theory of Justice for Artificial Intelligence." Daedalus 151, no. 2: 218-231.

Guo, Cindy X., Elizabeth X., and Monica Lange. 2023\. "Data Colonialism and Data Sets." Harvard Law Review Blog, June 22, 2023\. https://harvardlawreview.org/blog/2023/06/data-colonialism-and-data-sets/.

Hao, Karen. 2022\. "A New Vision of Artificial Intelligence for the People." MIT Technology Review, April 22, 2022\.

Kaur, Kirandeep, Ben Grama, Nairita Roy Chaudhuri, and Maria Jose Recalde-Vela. 2023\. "Ethics and Epistemic Injustice in the Global South: A Response to Hopman's Human Rights Exceptionalism as Justification for Covert Research." Journal of Human Rights Practice 15, no. 2: 347-373. https://doi.org/10.1093/jhuman/huad008.

Maddox, Raglan, and Melody E. Morton Ninomiya. 2025\. "Indigenous Sovereignty in Research and Epistemic Justice: Truth Telling through Research." Global Public Health 20, no. 1\. https://doi.org/10.1080/17441692.2024.2436436.

Mejias, Ulises A., and Nick Couldry. 2024\. Data Grab: The New Colonialism of Big Tech and How to Fight Back. N.p.: WH Allen.

Miller, David. 2017\. "Justice." In The Stanford Encyclopedia of Philosophy. https://plato.stanford.edu/entries/justice/.

Newman v. Google LLC, No. 5:20-cv-04011 (N.D. Cal. filed June 16, 2020).

Newman v. Google LLC, No. 20-CV-04011-LHK, slip op. (N.D. Cal. June 25, 2021).

Nicholas, Jeffery. 2012\. "Structural Justice." Review of Responsibility for Justice, by Iris Marion Young. The Review of Politics 74: 521-524. https://doi.org/10.1017/S0034670512000678.

Rafanelli, Lucia M. 2022\. "Justice, Injustice, and Artificial Intelligence: Lessons from Political Theory and Philosophy." Big Data and Society 9, no. 1\.

Santoni de Sio, Filippo, Txai Almeida, and Jeroen van den Hoven. 2024\. "The Future of Work: Freedom, Justice and Capital in the Age of Artificial Intelligence." Critical Review of International Social and Political Philosophy 27, no. 5: 659-683.

Stanford Humanities Center. 2024\. "Round Table: Epistemic Justice." YouTube video. Filmed January 20, 2022, posted August 29, 2024\. https://www.youtube.com/watch?v=\[insert video ID\].

Stempel, Jonathan, and Rosalba O'Brien. 2023\. "YouTube Defeats Racial Bias Lawsuit by Black, Hispanic Content Creators." Reuters, August 17, 2023\. https://www.reuters.com/legal/youtube-defeats-racial-bias-lawsuit-by-black-hispanic-content-creators-2023-08-17/.

"Three Core Elements of Restorative Justice." n.d. Restorative Justice. Accessed April 20, 2026\. https://restorativejustice.org/what-is-restorative-justice/three-core-elements-of-restorative-justice/.

Zurita, Victoria, and Chen Bar-Itzhak. 2024\. "In Search of Epistemic Justice." Arcade: A Digital Salon, Stanford Humanities Center, Spring 2024\. https://shc.stanford.edu/arcade/colloquies/search-epistemic-justice.

[^1]: Miller, David. 2017\. “Justice (Stanford Encyclopedia of Philosophy).” Stanford Encyclopedia of Philosophy. https://plato.stanford.edu/entries/justice/.

[^2]: Stempel, Jonathan, and Rosalba O'Brien. 2023\. “YouTube defeats racial bias lawsuit by Black, Hispanic content creators.” _Reuters_, August 17, 2023\. https://www.reuters.com/legal/youtube-defeats-racial-bias-lawsuit-by-black-hispanic-content-creators-2023-08-17/.

[^3]: _Newman v. Google LLC_, No. 5:20-cv-04011 (N.D. Cal. filed June 16, 2020).

[^4]: _Newman v. Google LLC_, No. 20-CV-04011-LHK, slip op. (N.D. Cal. June 25, 2021).

[^5]: “Three Core Elements of Restorative Justice.” n.d. Restorative Justice. Accessed April 20, 2026\. https://restorativejustice.org/what-is-restorative-justice/three-core-elements-of-restorative-justice/.

[^6]: _Data for Black Lives_. 2020\. “What is Data for Black Lives?” September 1, 2020\. https://d4bl.org/videos/55-what-is-data-for-black-lives.

[^7]: Fricker, Miranda, _Epistemic Injustice: Power and the Ethics of Knowing_ (Oxford, 2007; online edn, Oxford Academic, 1 Sept. 2007), https://doi.org/10.1093/acprof:oso/9780198237907.001.0001, accessed 20 Apr. 2026\.

[^8]: Zurita, Victoria, and Chen Bar-Itzhak. "In Search of Epistemic Justice." _Arcade: A Digital Salon_, Stanford Humanities Center, Spring 2024\. [https://shc.stanford.edu/arcade/colloquies/search-epistemic-justice](https://shc.stanford.edu/arcade/colloquies/search-epistemic-justice).

[^9]: Maddox, Raglan, and Melody E. Morton Ninomiya. 2025\. “Indigenous Sovereignty in Research and Epistemic Justice: Truth Telling through Research.” _Global Public Health_ 20 (1). doi:10.1080/17441692.2024.2436436.

[^10]: Kirandeep Kaur, Ben Grama, Nairita Roy Chaudhuri, Maria Jose Recalde-Vela, Ethics and Epistemic Injustice in the Global South: A Response to Hopman’s Human Rights Exceptionalism as Justification for Covert Research, _Journal of Human Rights Practice_, Volume 15, Issue 2, July 2023, Pages 347–373, [https://doi.org/10.1093/jhuman/huad008](https://doi.org/10.1093/jhuman/huad008).

[^11]: Nicholas, Jeffery. (2012). STRUCTURAL JUSTICE Iris Marion Young: Responsibility for Justice. (Oxford: Oxford University Press, 2011\. Pp. xxv, 193.). The Review of Politics. 74\. 521-524. 10.1017/S0034670512000678.

[^12]: Burnett, Camille; Swanberg, Michael; Hudson, Ashley; and Schminkey, Donna (2018) "Structural Justice: A critical feminist framework exploring the intersection between justice, equity and structural reconciliation.," _Journal of Health Disparities Research and Practice_: Vol. 11: Iss. 4, Article 4\.

[^13]: Soudi, Marwa, Esraa Ali, Maha Bali, and Nihal Mabrouk. “Generative AI-Based Tutoring System for Upper Egypt Community Schools.” _In Proceedings of the 2023 Conference on Human Centered Artificial Intelligence: Education and Practice (HCAIep ’23)_, 16–21. New York: ACM, 2023. https://doi.org/10.1145/3633083.3633085.

## Sidebar

youtube-case:
Heading: YouTube Content Moderation Appeals (2023)[^2]
In the [lawsuit _Newman v. Google_](https://www.courthousenews.com/wp-content/uploads/2020/06/newman-google.pdf)[^3], Black and Hispanic creators argued that YouTube disproportionately restricted, demonetized, and downranked their videos, and they specifically alleged that the platform interfered with, delayed, or ignored appeals, preventing timely manual review and leaving creators without effective recourse while they lost audience reach and revenue. This case can be understood primarily as a case about alleged unequal treatment in platform moderation and untransparent—procedurally unjust—appeals process. The case was not simply that creators lacked an appeal path, but the complaint centered on a broader claim that YouTube’s moderation systems were not race-neutral and instead treated creators from minority groups differently from similarly situated white creators. The creators ultimately [lost](https://www.govinfo.gov/content/pkg/USCOURTS-cand-3_20-cv-04011/pdf/USCOURTS-cand-3_20-cv-04011-0.pdf)[^4], and the case was dismissed with prejudice, meaning it can not be brought again. Although algorithmic discrimination by race was plausible in theory, the plaintiffs did not come close to showing that they had actually suffered discrimination on the record before the court, according to the judge. Newman v. Google illustrates how disputes over platform moderation can combine group fairness concerns with procedural justice concerns. The plaintiffs claimed that minority creators were treated unequally and that appeals were ineffective or obstructed, which raised questions about voice, transparency, and neutral review.

dfbl-case:
Heading: Data for Black Lives's effort to build data-based reparations for healthcare
[Data for Black Lives (D4BL)](https://d4bl.org/) is a movement of activists, organizers, and scientists that challenges the use of data and algorithms as tools of racial oppression and argues for data practices that serve Black communities instead. Its work spans abolition, political education, data governance, and algorithmic justice, and it produces campaigns, reports, events, and datasets. Rather than treating data harms as isolated technical flaws, D4BL places them in the longer history of systemic injustice, from redlining to predictive policing to unequal health outcomes.[^6] One concrete example is its COVID-19 racial disparity data work, including the [D4BL COVID-19 Disparities Tracker](https://d4bl.org/datasets/44-d4-bl-covid-19-disparities-tracker) and related datasets on Black COVID-19 cases and deaths. These projects consolidated and surfaced race-based public health data at a moment when many institutions were failing to make such disparities visible. In doing so, D4BL was not simply collecting data for its own sake. It was using data infrastructure to document harm, support public accountability, and direct attention toward communities bearing disproportionate health burdens. D4BL’s dataset initiatives show what a restorative orientation to data can look like. Its work suggests that just health AI requires more than reducing bias in models. It requires recognizing historical harm, involving affected communities in governance, and building datasets and analytic systems that help repair inequity rather than reproduce it. In that sense, D4BL reflects restorative justice through all three dimensions: creating space for affected communities to shape the conversation, using data to address concrete harm, and pushing for structural transformation in how data systems are governed. The dataset can be found [here](https://docs.google.com/spreadsheets/d/1NFViedF47p-P0MKKl8_O0mKAhba0Yqn200EfUR4GlcQ/edit?gid=0#gid=0).

Generative-AI-Based-Tutoring-System-for-Upper-Egypt-Community-Schools:
Heading: Generative AI-Based Tutoring System for Upper Egypt Community Schools[^13]
This tutoring system piloted in Egypt brought together teachers and AI experts to build a learning platform for under-resourced schools. The focus was on supporting mostly female students, and teachers were involved throughout the design process to make the platform fit real classroom needs. This tool hit all three pillars of distributive justice: Sufficiency: The platform provides a baseline level of educational support to learners who otherwise have insufficient access to tutoring or quality instruction. Priority: the design and distribution method prioritizes girls in low-resource schools, recognizing that they face urgent, systemic barriers. Equality of Opportunity: Teachers co-designed the system to ensure fair access to meaningful learning, preventing AI from reproducing gendered educational disparities.

data-colonialism:
Data colonialism as defined by Nick Couldry and Ulises Mejias in their book _The Costs of Connection_ is “process by which governments, non-governmental organizations and corporations claim ownership of and privatize the data that is produced by their users and citizens.” For further reading and watching, see Professor Nick Couldry’s [explanation](https://www.lse.ac.uk/lse-player/what-is-data-colonialism) of data colonialism and how it shows up in tech practices.

hegemonic-definitions-of-accuracy:
Hegemonic definitions of accuracy or epistemological hegemony refer to situations in which one dominant group’s standards for what counts as true, credible, valid, or “accurate” are treated as neutral and universal, while other ways of knowing or other speakers are discounted. In practice, this means that knowledge is judged not only by evidence, but also by who is speaking, which social perspective is treated as authoritative, and which histories of power shape credibility. An example would be an AI or institutional system that treats mainstream, Western, bureaucratic, or majority-group data categories as the most “accurate” way to describe reality, while dismissing the lived testimony of marginalized people or ignoring Indigenous and community-based understandings. For more information and discussion on this topic, see the “[Round Table: Epistemic Justice](https://youtu.be/S0uQ534Ox9g?si=4TRzMoARVxGvEbZQ)” from the Stanford Humanities Center.

technological-infrastructure:
Heading: Indigenous Data Sovereignty in Language AI (Papa Reo, Te Hiku Media)[^9][^10]

Te Hiku Media, a Māori-led media organization in Aotearoa New Zealand, has developed Papa Reo, a language AI platform grounded in Indigenous knowledge systems and principles of data sovereignty. The project emerged from decades of work to revitalize te reo Māori and responds directly to the limitations of Western-centered AI development, which typically relies on large-scale data extraction, standardization, and centralized control. In contrast, Indigenous approaches emphasize relationality, community accountability, and the right of communities to control how their knowledge is collected, used, and shared. Western data practices often treat knowledge as neutral “data” to be extracted and validated through dominant frameworks, sidelining local epistemologies and reducing communities to sources of input. This reproduces epistemic injustice by privileging Euro-Western standards of accuracy and authority, while silencing or distorting other ways of knowing. In AI, this logic is reflected in the “more is more” paradigm, where large datasets are scraped and aggregated with little regard for consent, context, or community benefit, often reinforcing historical patterns of exclusion and marginalization. Papa Reo offers a different model. Rather than extracting Māori language data into global systems, Te Hiku Media built its own infrastructure for speech recognition and natural language processing, using community-held archives and participatory data collection. Crucially, the project ensures that Māori communities retain ownership and governance over their data, and that the benefits of AI development flow back to them. This includes developing tools tailored to smaller datasets and supporting other Indigenous communities in building their own capabilities, rather than forcing them into dominant technological frameworks. The Papa Reo case demonstrates how Indigenous data governance can actively resist epistemic injustice. It reframes communities not as passive data subjects but as knowledge holders and decision-makers, restores control over meaning-making and representation, and challenges the assumption that openness and scale are inherently just. In doing so, it points toward a broader transformation of AI: from extractive systems that reproduce historical inequities to relational systems that respect sovereignty, enable participation, and sustain cultural knowledge in the digital age. The project can be found here: [https://papareo.io/](https://papareo.io/)

AI-infrastructure:
Heading: Thirsty for power and water, AI-crunching data centers sprout across the West

[Several U.S. cities](https://andthewest.stanford.edu/2025/thirsty-for-power-and-water-ai-crunching-data-centers-sprout-across-the-west/), Phoenix, Las Vegas, The Dalles (Oregon), reported significant community conflict over the water consumption of hyperscale data centers used to train and host large AI models. Public records revealed that some centers used billions of gallons of potable water per year for cooling, disproportionately affecting local drought-prone or low-income regions. This case illustrates how AI infrastructure can produce environmental injustice by placing ecological burdens on communities with limited political power, while the benefits flow primarily to distant corporate and global users.