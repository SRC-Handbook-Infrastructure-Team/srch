---
title: AI Governance
order: 4
final: true
lastUpdated: 2026-04-21
---  

As AI systems scale in power and impact, so does the urgency to ensure they are aligned with legal standards and public accountability. Therefore, the need for effective AI governance has become critical to direct how these systems are developed, deployed, and overseen. 

## Defining AI Governance

AI governance refers to the system of rules, practices, and processes employed to ensure an organization’s use of AI technologies aligns with its strategies, objectives, and values, complete with legal requirements, ethical principles, and the requirements set by stakeholders.[^4]

At its core, AI governance is about accountability – the principle that AI “should be developed, deployed, and utilized such that responsibility for bad outcomes can be assigned to liable parties.”[^3] Governance, therefore, concerns not only what AI systems do, but also who bears responsibility when they malfunction, discriminate, and cause harm. 

Existing approaches in AI governance can be framed around three key questions: 

1. **What** are we concerned about, and what are you measuring for, then   
2. **How** are we measuring these things, and finally   
3. **Who** are the key stakeholders shaping how AI is governed?

### _What_ Is Being Regulated in AI Governance?

AI governance targets both the **technical components** of AI systems and the **sociotechnical settings** in which they operate: 

* **Data**: how data is collected, cleaned, and labeled; privacy concerns and data provenance; bias mitigation. 

* **Compute**: control over computing power, environmental footprint, and access inequities. 

* **Models**: model architecture, training data provenance, and transparency of weights or parameters. 

* **Deployment Contexts**: specific applications (e.g., surveillance, hiring, healthcare) that raise domain-specific risks. 

* **Decision Making**: across various downstream application scenarios, decision-making processes that produce real-world impact on institutions and communities.  

### _How_ Is AI Being Governed?

AI governance operates through multiple, overlapping mechanisms that translate accountability into practice. Generally, there are 5 major layers of governance approaches: technical design, industry standards, economic incentives, legislation and policies, and community conventions.  

#### Governance by Code: Technical Design

Governance by code embeds oversight directly into the technical stack, through how data is curated, how models are trained, and who controls access to compute. 

**{Data-governance}** encompasses filtering, anonymization, and bias mitigation at the dataset level. 

**{Algorithmic-governance}** influences model behavior through architectural choices, safety constraints, and transparency features. 


#### Governance by Coordination: Industry Standards

Governance by coordination refers to voluntary or semi-formal **{standards}** that create shared benchmarks for safety, documentation, and reliability without formal regulatory enforcement. These standards usually help establish what “responsible AI” looks like in practice. 

#### Governance by Market: Economic Incentives

{Market-forces} and procurement choices pressure organizations to align with governance norms. Funding mechanisms and liability regimes determine who can afford responsible development, which means accountability is (always) also an economic question. In particular, {procurement-governance} uses the purchasing power of large institutions (especially governments) to enforce responsible AI practices by making them a condition of access to public contracts. 

#### Governance by Law: Legislation and Policies

Governments enforce accountability through {binding-rules}, ranging from national executive orders and state-level laws to international frameworks, which set thresholds for risk, transparency, and liability. 


#### Governance by Norm: Community Conventions

Professional, academic, and {civic-communities} establish informal expectations about responsible AI practice, and they often drive change with bottom-up legitimacy that can later be crystallized into formal policy. 


Together, these mechanisms above express the “how” of governance. Accountability emerges not from any single layer, but from their interaction across technical infrastructure, regulatory bodies, market forces, and community norms. 


## Stakeholders in AI Governance

After defining the frameworks for key ingredients, governance approaches, and underlying values in AI governance, the next question is: ***Who*** *participates in shaping those frameworks?* 

The major stakeholders involved in AI governance can be divided into four categories: governments, industry actors, academic institutions, and civil society organizations. Each player has distinct incentives, capacities, and claims to legitimacy. Understanding their roles and tensions is essential to grasping how AI governance is negotiated in practice. 

![stakeholders](/assets/primer-photos/ADM/governance/stakeholders.png)

### Government Overview

Governments are central to AI governance, while the approach differs significantly by region. While the EU has adopted a comprehensive, horizontal strategy (a single cross-sector law applying to all AI uses), China has taken a more centralized, state-led regulatory approach. In contrast, in the United States, government involvement in AI governance has spanned multiple levels but remains highly *decentralized*. While dozens of AI-related bills have been introduced in Congress, there is no unified, horizontal AI law akin to the EU AI Act. Instead, the US has taken a more fragmented, sector-specific vertical approach (separate rules for each industry or use case, such as healthcare or hiring). This decentralization gives agencies and state governments room to experiment, but also creates ambiguity around enforcement and consistency. 

The government stakeholder landscape can be segmented into **three areas**: 

1. **National/regional governments**: the national executive and legislative bodies.   
2. **Regulatory organizations:** independent agencies and commissions that enforce laws and have developed guidelines around some aspects of AI use   
3. **State entities:** state governments that create and enforce AI-related laws/policies within their own jurisdictions
4. **Standard-setting bodies:** while not formally a part of government, the standard-setting bodies play a critical role in creating shared benchmarks and best practices that guide government regulation. 

#### National/Regional Legislation 

National and regional {AI-legislation} represents the most direct form of governance by law. They usually define permissible uses, accountability mechanisms, and enforcement structures. Notably, these legislative approaches may vary dramatically across jurisdictions, reflecting different regulatory philosophies. 


#### Regulatory Organizations

{Regulatory-organizations} usually play the role of translating legislation into enforceable practice through investigation, rulemaking, and adjudication. Unlike legislatures that set broad mandates, these agencies develop technical standards, conduct audits, and impose penalties for non-compliance. 


#### US State and Local Governments

In the absence of federal legislation, {US-state-governments} have become active AI governance actors. These interventions vary widely by state and often target specific use cases. See Understanding AI Legislation: The CNTR AISLE Framework[^61] and US State AI Governance Legislation Tracker[^63] for more information. 


#### Standard-Setting Bodies

Alongside legislative actors and regulatory agencies, AI governance relies on {standard-setting-bodies} that develop technical benchmarks, auditing tools, and best-practice guidelines for AI systems. These bodies operate in the space between voluntary industry self-regulation and mandatory legal compliance. 


### Industry Overview

In the context of AI governance, companies are a primary industry stakeholder that needs to comply; therefore, they are usually one of the most powerful forces shaping the landscape. 

Industry stakeholders can range from frontier model developers to infrastructure providers and model deployers. Unlike the government that operates through legislation, its decisions around model training, release, and deployment govern AI through code, scale, and market influence. 

[image 2]

Mapping the AI Supply Chain: An Analysis of the Complex Relationships in the AI Ecosystem[^40]

| Category | Key Players | Governance Role |
| :---- | :---- | :---- |
| Frontier Developers | OpenAI, Anthropic, Google, Meta | Train and release cutting-edge general-purpose foundation models and often set de facto standards in the absence of regulation |
| Infrastructure Providers | Google Cloud, Microsoft Azure, AWS, NVIDIA | Control access to critical infrastructure for building AI systems: compute, storage, and data |
| Model Deployers | Amazon (E-Commerce), Walmart (Retail); JPMorgan, Upstart (Finance); Tesla (Auto) | Integrate AI models into their services across domains, often without developing models in-house |
| Venture Capitals and Startups | a16z, Sequoia, Y Combinator | Play an indirect but influential role in shaping governance norms by founding startups, lobbying for innovation-friendly policies, and resisting regulation |
| Industrial Consortia | U.S. Chamber of Commerce, Information Technology Industry Council (ITI), Chamber of Progress, TechNet, AI-Enabled ICT Workforce Consortium, MIT Generative AI Impact Consortium | Coordinate self-regulation, research, and policy dialogues; preempt regulation by standardizing responsible practices |

### Academia Overview
can
Academic institutions occupy a unique position in AI governance as they conduct independent research on AI. Their primary role in the AI governance space includes proposing best practices and governance methods, building relationships with other stakeholders, establishing projects, and serving as consultants and as {testimonials-in-policy-hearings}. 


| University | Lab/Center/Initiative |
| :---- | :---- |
| Brown University | Center for Technological Responsibility, Reimagination, and Redesign (CNTR)[^24] |
| Harvard University | Berkman Klein Center (BKC) For Internet & Society[^12] |
| Georgetown University | Center for Security and Emerging Technology (CSET)[^23] |
| Stanford University | Institute for Human-Centered Artificial Intelligence (HAI)[^39] |
| Princeton University | Center for Information Technology Policy (CITP)[^22] |
| UC Berkeley | Center for Human-Compatible AI (CHAI)[^21] |
| Carnegie Mellon University | Block Center for Technology and Society[^13] |

### Civil Society Overview

Civil society stakeholders include any independent groups (separate from government or industry organizations, for example) that have a shared collective interest, which in this context is AI governance. These can include non-profit organizations, think tanks, and independent research institutes that have a variety of political perspectives and orientations. 

For civil-society organizations, they range from broad civil rights groups like American Civil Liberties Union (ACLU)[^9] and Center for Democracy and Technology (CDT)[^20] to think tanks like the Brookings Institution[^54], the Cato Institute[^55], the American Enterprise Institute (AEI)[^53] and the Heritage Foundation[^57], to groups with a more specific technical focus like the AI Now Institute[^52], as well as university-housed think tanks like Center for Security and Emerging Technology (CSET)[^23] and Center for Information Technology Policy (CITP)[^22].

Media and journalism organizations serve as information intermediaries in AI governance. They investigate industry practices, translate technical developments for various audiences, and hold both companies and regulators accountable. They range from technology-focused publications like WIRED[^65] to policy-focused ones like Tech Policy Press[^51], to specialized independent outlets like 404 Media[^1]. 

Philanthropic foundations are entities that fund think tanks, researchers, and policy efforts in the space of AI governance. They usually shape AI governance through strategic grantmaking across the ecosystem. There is a wide range of foundations that also represent different agendas and political ideologies, such as the MacArthur Foundation[^58], the Ford Foundation[^56], Open Philanthropy[^47], and many others.

## AI Governance in Practice

AI companion applications like Character.AI[^25] and Replika[^50] have scaled to millions of users, offering emotionally responsive chatbot interactions as friends, romantic partners, or mental health support. Critical incidents expose serious governance gaps. In October 2024[^44], a Florida mother sued Character.AI after her 14-year-old son died by suicide following months of interactions with a chatbot that allegedly encouraged self-harm and made romantic overtures. 

This case matters because it involves vulnerable populations, extraordinarily sensitive data disclosures governed only by consumer privacy policies rather than health protections, platforms making health claims while avoiding FDA oversight, and business models optimizing for engagement over well-being.

As outlined previously, AI governance mechanisms operate across all five layers in this case, while each has its own limitations and challenges.  

* **By code**: platforms implemented crisis-detection classifiers, routing users to helplines and age-gated content restrictions, though users report easy circumvention.   
* **By market**: the Character.AI lawsuit creates liability pressure, but accountability comes only after demonstrable harm.   
* **By law**: California's SB 243[^18] now requires crisis intervention protocols, age verification, and AI disclosure, the first domain-specific regulation, while existing FTC and Children's Online Privacy Protection Act (COPPA) authority remains largely unenforced.   
* **By coordination**: voluntary industry codes of conduct exist, but see minimal adoption.   
* **By norm**: academic research documenting psychological harms and investigative journalism on tragic incidents build public pressure, though media attention is episodic rather than sustained.

This case reveals fundamental governance challenges that cut across the AI ecosystem. 

* First, there is deep regulatory ambiguity: AI companions don't fit neatly into existing categories like social media, healthcare, or entertainment, so no single regulatory framework clearly applies.   
* Second, the problem outpaces our ability to measure and respond to it: companies deploy these systems at scale before we understand their psychological impacts, which means evaluating whether a chatbot creates harmful emotional dependency is far harder than auditing a hiring algorithm for bias.   
* Third, the case exposes how governance operates as contested negotiation across misaligned stakeholders: industry self-regulation proves insufficient to prevent foreseeable harms, market accountability only kicks in after tragedies occur, legal frameworks remain fragmented across jurisdictions, and civil society can document problems and create public pressure but lacks the enforcement power to compel change. 

Effective AI governance requires coordination across all five mechanisms and meaningful participation from all four stakeholder groups: government, industry, academia, and civil society.  No single layer or actor can establish accountability alone. As the AI companions case demonstrates, the most pressing governance challenges emerge at the intersections: when regulatory frameworks lag behind technical deployment, when market incentives misalign with public safety, when industry controls the information needed for independent oversight, and when vulnerable populations bear the costs of governance failures. 

Moving forward, successful AI governance will depend on building institutional capacity to respond at the speed of technological change, creating mechanisms for multi-stakeholder deliberation, and ensuring that those affected by AI systems have meaningful power in shaping how they are governed. The frameworks and examples in this primer provide a foundation for understanding how AI governance works in general, and where it still falls short. 

[^1]:  "404 Media." 404 Media. https://www.404media.co/.

[^2]:  "AAU Response to OSTP RFI on AI Action Plan." Association of American Universities. https://www.aau.edu/key-issues/aau-responds-ostps-rfi-development-ai-action-plan.

[^3]:  "AI Accountability." Carnegie Council. https://carnegiecouncil.org/explore-engage/key-terms/ai-accountability.

[^4]:  "AI Governance: themes, knowledge gaps and future agendas." Emerald Publishing. https://www.emerald.com/insight/content/doi/10.1108/intr-01-2022-0042/full/html.

[^5]:  "AI Impact Assessment (AIIA)." IAPP. https://iapp.org/news/a/ai-assessments-how-and-when-to-conduct-them.

[^6]:  "AI Security Institute (AISI)." UK AI Security Institute. https://www.aisi.gov.uk/.

[^7]:  "Algorithmic Justice League (AJL)." Algorithmic Justice League. https://www.ajl.org/.

[^8]:  "Amazon." MIT Technology Review. https://www.technologyreview.com/2020/06/12/1003482/amazon-stopped-selling-police-face-recognition-fight/.

[^9]:  "American Civil Liberties Union (ACLU)." American Civil Liberties Union. https://www.aclu.org/.

[^10]:  "Andreessen Horowitz (a16z): Regulate AI Use, Not AI Development." Andreessen Horowitz. https://a16z.com/regulate-ai-use-not-ai-development/.

[^11]:  "Anthropic's Constitutional AI." arXiv. https://arxiv.org/pdf/2212.08073.

[^12]:  "Berkman Klein Center (BKC) For Internet & Society." Harvard Berkman Klein Center. https://cyber.harvard.edu/.

[^13]:  "Block Center for Technology and Society." Carnegie Mellon University. https://www.cmu.edu/block-center.

[^14]:  "Brussels Effect." Columbia Law School. https://scholarship.law.columbia.edu/books/232/.

[^15]:  "California AB489 (AI in Healthcare)." California Legislature. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB489.

[^16]:  "California AB853 (AI Transparency)." California Legislature. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260AB853.

[^17]:  "California Civil Rights Council: AI Employment Discrimination Regulations." California Civil Rights Department. https://calcivilrights.ca.gov/2025/06/30/civil-rights-council-secures-approval-for-regulations-to-protect-against-employment-discrimination-related-to-artificial-intelligence/.

[^18]:  "California SB 243." California Legislature. https://leginfo.legislature.ca.gov/faces/billNavClient.xhtml?bill_id=202520260SB243.

[^19]:  "California's GenAI procurement guidelines." California Department of Technology. https://cdt.ca.gov/wp-content/uploads/2024/07/3a-GenAI-Guidelines.pdf.

[^20]:  "Center for Democracy and Technology (CDT)." Center for Democracy and Technology. https://cdt.org/.

[^21]:  "Center for Human-Compatible AI (CHAI)." UC Berkeley CHAI. https://humancompatible.ai/.

[^22]:  "Center for Information Technology Policy (CITP)." Princeton CITP. https://citp.princeton.edu/.

[^23]:  "Center for Security and Emerging Technology (CSET)." Georgetown CSET. https://cset.georgetown.edu/.

[^24]:  "Center for Technological Responsibility, Reimagination, and Redesign (CNTR)." Brown University CNTR. https://cntr.brown.edu/.

[^25]:  "Character.AI." Wikipedia. https://en.wikipedia.org/wiki/Character.ai.

[^26]:  "Colorado's AI Act (SB24-205)." Colorado Legislature. https://leg.colorado.gov/bills/sb24-205.

[^27]:  "Cyberspace Administration of China (CAC)." Cyberspace Administration of China. https://www.cac.gov.cn/.

[^28]:  "Department of Justice (DOJ)." US Department of Justice. https://www.justice.gov/.

[^29]:  "DOJ Artificial Intelligence Strategy." US Department of Justice. https://www.justice.gov/d9/pages/attachments/2021/02/04/doj_artificial_intelligence_strategy_december_2020.pdf.

[^30]:  "EEOC's role in AI." Equal Employment Opportunity Commission. https://www.eeoc.gov/sites/default/files/2024-04/20240429_What%20is%20the%20EEOCs%20role%20in%20AI.pdf.

[^31]:  "Equal Employment Opportunity Commission (EEOC)." Equal Employment Opportunity Commission. https://www.eeoc.gov/overview.

[^32]:  "EU AI Office." European Commission. https://digital-strategy.ec.europa.eu/en/policies/ai-office.

[^33]:  "EU Artificial Intelligence Act." EU AI Act. https://artificialintelligenceact.eu/.

[^34]:  "EU Commission." European Commission. https://commission.europa.eu/index_en.

[^35]:  "Executive Order 14110: Safe, Secure, and Trustworthy Development and Use of Artificial Intelligence." Federal Register. https://www.federalregister.gov/documents/2023/11/01/2023-24283/safe-secure-and-trustworthy-development-and-use-of-artificial-intelligence.

[^36]:  "Federal Trade Commission (FTC)." Federal Trade Commission. https://www.ftc.gov/.

[^37]:  "FTC: Artificial Intelligence tag page." Federal Trade Commission. https://www.ftc.gov/industry/technology/artificial-intelligence.

[^38]:  "IBM." Medium. https://medium.com/@Joy.Buolamwini/ibm-leads-more-should-follow-racial-justice-requires-algorithmic-justice-and-funding-da47e07e5b58.

[^39]:  "Institute for Human-Centered Artificial Intelligence (HAI)." Stanford HAI. https://hai.stanford.edu/.

[^40]:  "Mapping the AI Supply Chain: An Analysis of the Complex Relationships in the AI Ecosystem." AI Supply Chains. https://aisupplychains.org/.

[^41]:  "Microsoft." CNBC. https://www.cnbc.com/2020/06/11/microsoft-says-will-not-sell-facial-recognition-software-to-police.html.

[^42]:  "Ministry of Industry and Information Technology (MIIT)." Ministry of Industry and Information Technology. https://www.miit.gov.cn/.

[^43]:  "National Institute of Standards and Technology (NIST)." National Institute of Standards and Technology. https://www.nist.gov/.

[^44]:  "NBC News: Florida teen death lawsuit against Character.AI." NBC News. https://www.nbcnews.com/tech/characterai-lawsuit-florida-teen-death-rcna176791.

[^45]:  "NYC AI Action Plan." NYC Government. https://www.nyc.gov/assets/oti/downloads/pdf/reports/artificial-intelligence-action-plan.pdf.

[^46]:  "NYC Automated Employment Decision Tools (AEDT)." NYC Government. https://www.nyc.gov/site/dca/about/automated-employment-decision-tools.page.

[^47]:  "Open Philanthropy." Open Philanthropy. https://www.openphilanthropy.org/.

[^48]:  "Overview of all AI Act National Implementation Plans." EU AI Act. https://artificialintelligenceact.eu/national-implementation-plans/.

[^49]:  "Reinforcement Learning from Human Feedback (RLHF)." arXiv. https://arxiv.org/pdf/2307.15217.

[^50]:  "Replika." Wikipedia. https://en.wikipedia.org/wiki/Replika.

[^51]:  "Tech Policy Press." Tech Policy Press. https://www.techpolicy.press/.

[^52]:  "the AI Now Institute." AI Now Institute. https://ainowinstitute.org/.

[^53]:  "the American Enterprise Institute (AEI)." American Enterprise Institute. https://www.aei.org/.

[^54]:  "the Brookings Institution." Brookings Institution. https://www.brookings.edu/.

[^55]:  "the Cato Institute." Cato Institute. https://www.cato.org/.

[^56]:  "the Ford Foundation." Ford Foundation. https://www.fordfoundation.org/.

[^57]:  "the Heritage Foundation." Heritage Foundation. https://www.heritage.org/.

[^58]:  "the MacArthur Foundation." MacArthur Foundation. https://www.macfound.org/.

[^59]:  "the NIST AI Risk Management Framework (AI RMF)." National Institute of Standards and Technology. https://www.nist.gov/itl/ai-risk-management-framework.

[^60]:  "the OECD AI Principles." OECD. https://oecd.ai/en/ai-principles.

[^61]:  "Understanding AI Legislation: The CNTR AISLE Framework." Brown University CNTR. https://cntr.brown.edu/news/2025-03-12/cntr-aisle-framework.

[^62]:  "US Census Bureau: Differential Privacy for the 2020 Census." US Census Bureau. https://www.census.gov/programs-surveys/decennial-census/decade/2020/planning-management/process/disclosure-avoidance/differential-privacy.html.

[^63]:  "US State AI Governance Legislation Tracker." IAPP. https://iapp.org/resources/article/us-state-ai-governance-legislation-tracker/.

[^64]:  "Virginia's HB2094." Virginia Legislature. https://lis.virginia.gov/bill-details/20251/HB2094/text/HB2094.

[^65]:  "WIRED." WIRED. https://www.wired.com/.

## Sidebar

Data-governance:
Heading: A case study of data governance
**Privacy-enhancing technologies (PETs)** enable data analysis while protecting individual privacy through methods like differential privacy, federated learning, and homomorphic encryption. For example, the US Census Bureau adopted differential privacy for the 2020 Census[^62]. By adding carefully calibrated statistical noise to aggregate data releases, the Bureau ensured that no individual’s information could be reverse-engineered from public statistics.


Algorithmic-governance: 
Heading: A case study of algoirthmic governance
**Reinforcement Learning from Human Feedback (RLHF)**[^49] and Anthropic’s Constitutional AI[^11] exemplify governance-by-design, encoding normative values into training objectives. In RLHF, models are aligned with human preferences by learning from ranked responses, usually with safety and helpfulness as guiding principles. In particular, Constitutional AI builds on this by replacing human raters with a “constitution” of ethical criteria for the model to critique and refine its own outputs. Overall, these design-based approaches operationalize governance goals into the model’s objective function, shifting oversight upstream into the development process.

standards:
Heading: Two types of standards in AI governance by coordination
**Principles-based standards** usually articulate high-level values that organizations should aim to uphold. For instance, the OECD AI Principles[^60] established principal values for innovative and trustworthy AI, including human-centered values, transparency, robustness, accountability, and respect for human rights. **Procedural standards** offer structured guidance on how to identify, manage, and regulate risks and harms throughout the AI lifecycle. For example, the NIST AI Risk Management Framework (AI RMF)[^59] provides a structured, procedural guidance for organizations to identify, assess, and manage AI risks throughout the model lifecycle. It is distinguished from principle-based approaches by offering a concrete methodology that maps risks to organizational contexts. Among various procedural standards, AI Impact Assessment (AIIA)[^5] represents a special mechanism that systematically evaluates potential harms before deployment. Typically, AIIAs involve documenting the system’s purpose and context, identifying affected stakeholders, analyzing risks across dimensions, and establishing ongoing monitoring protocols.

Market-forces:
Heading: A case study of market forces influencing AI governance
Venture capital firm Andreessen Horowitz (a16z)[^10] shows how market actors shape governance through strategic advocacy against regulation. Through white papers, Congressional testimony, and public campaigns, a16z has lobbied for "innovation-friendly" policies that minimize compliance burdens on startups, arguing that heavy-handed regulation would disadvantage US competitiveness and concentrate power in incumbent tech giants who can afford compliance costs. 

procurement-governance:
Heading: A case study of procurement governance
Government procurement functions as a powerful market-based governance mechanism by making responsible AI practices a condition of accessing public contracts. For example, California’s GenAI procurement guidelines[^19] require risk assessments conducted by state agencies and vendor disclosures about AI capabilities. The mechanism shifts accountability upstream by requiring compliance during development rather than after deployment.

binding-rules: 
Heading: A case study of legally binding rules in AI governance
The EU Artificial Intelligence Act[^33], which entered into force in August 2024, marks the world’s first comprehensive horizontal AI regulation. It introduces a risk-based framework that classifies AI systems into four risk tiers: minimal, limited, high, and prohibited. The Act creates enforcement through both national authorities and significant fines, which sets a potential “Brussels Effect[^14]” where global companies adopt EU standards internationally  In the US, the legislative landscape is much more fragmented. Both Virginia’s HB2094[^64] and Colorado’s AI Act[^26] adopt a decision-centric consumer-protection approach, defining AI risk through consequential decision-making capabilities and concrete involvement. 

civic-communities:
Heading: A case study of civic advocacy in AI governance
Founded by Joy Buolamwini, the Algorithmic Justice League (AJL)[^7]’s campaign against facial recognition bias pushed both corporate reform and municipal legislation. AJL initially exposed severe accuracy disparities in commercial facial recognition systems through research, which catalyzed corporate responses from IBM[^38], Amazon[^8], and Microsoft[^41], as well as legislative actions, with multiple US cities banning government use of the technology.  

AI-legislation:
Heading: Case studies of AI legislation
European Union The EU AI Act[^33] is the world’s first comprehensive horizontal AI regulation. It categorizes systems into risk tiers and imposes requirements accordingly, such as transparency, documentation, and liability structures.  China In 2021, China introduced binding AI regulations through the Cyberspace Administration of China (CAC)[^27], targeting recommendation algorithms, deepfakes, and generative AI.  United States No national AI law equivalent to the EU AI Act currently exists; instead, executive actions like EO 14110[^35] aim to coordinate federal agency efforts on AI safety, transparency, and equity. 

Regulatory-organizations:
Heading: Case studies of regulatory organizations
United States Federal Trade Commission (FTC)[^36]: Addresses and prevents deceptive and unfair practices in AI systems through consumer protection and competition laws. See the FTC’s Artificial Intelligence tag page[^37].  Department of Justice (DOJ)[^28]: Enforces anti-discrimination and antitrust law as it intersects with AI use, combating criminal misuses of AI and ensuring its deployment aligns with legal and ethical principles. See the DOJ’s Artificial Intelligence Strategy[^29].  Equal Employment Opportunity Commission (EEOC)[^31]: Ensures that AI tools used in employment decisions do not create barriers or perpetuate bias based on protected characteristics, applying existing federal anti-discrimination laws. See the EEOC’s role in AI[^30].  Europe The EU Commission[^34], with support from the EU AI Office[^32], creates and enforces AI legislation like the AI Act, while national regulatory ss are responsible for implementing and overseeing the rules at the Member State level. See the Overview of all AI Act National Implementation Plans[^48].  China Cyberspace Administration of China (CAC)[^27]: Formulates and enforces rules on AI development and use, with a strong focus on content moderation, data security, and generative AI usage.  Ministry of Industry and Information Technology (MIIT)[^42]: Guides national AI development through strategic initiatives: industry standards, computing infrastructure, ethical guidelines, fostering innovation ecosystems, etc.


US-state-governments:
Heading: Case studies of state-level AI legislation
California Introduced several landmark bills focusing on high-risk AI systems, deepfake disclosure, and safety audits, most notably the Transparency in Frontier Artificial Intelligence Act (SB 53), making it the first US state to directly regulate the safety of powerful AI models. The state has implemented an extensive suite of laws focusing on transparency[^16], consumer protection[^18], and the use of AI in specific sectors like healthcare[^15] and employment[^17].  New York City Regulates AI through its landmark Automated Employment Decision Tools (AEDT)[^46] law, requiring employers to conduct annual bias audits, notify candidates about automated employment decision tool usage, and allow candidates to request alternative processing. The city also launched an AI Action Plan[^45] in 2023 to govern its own use of AI and support agency implementation. 

standard-setting-bodies:
Heading: Case studies of standard-setting bodies in AI governance
The National Institute of Standards and Technology (NIST)[^43] introduced the AI Risk Management Framework (AI RMF)[^59] that helps organizations identify, assess, and manage risks associated with AI systems across sectors. The framework effectively translates abstract principles like “trustworthiness” into concrete, assessable organizational practices.  The Center for AI Standards and Innovation (CAISI), established within NIST, represents a federal effort to build technical capacity for evaluating frontier AI models and developing safety standards.  Similarly, in the UK, emerging bodies like the AI Security Institute (AISI)[^6] are tasked with model evaluation and ecosystem oversight. It is worth noting that AISI has secured voluntary commitments from major AI developers to provide early access to models for pre-deployment safety testing, which is a significant governance innovation that addresses the information asymmetry between industry and government stakeholders.

testimonials-in-policy-hearings:
Heading: A case study of testimonials from academic institutions in AI governance
This response[^2] from the Association of American Universities (AAU) to the Trump administration’s RFI on the AI Action plan shows what American universities/research institutions seek from the government in the context of AI development. AAU’s “overarching recommendation for the new AI Action Plan is to pursue a focused initiative to accelerate AI for discovery” and that “this initiative should seek to align government investments with industry, universities, and other stakeholders to develop the tools, practices, partnerships, and infrastructure to catalyze scientific progress using AI.”