---
title: Consent
order: 5
lastUpdated: 2026-04-21
---

# Consent

What is the best way to protect privacy? For many people, protecting privacy in digital contexts begins and ends with consent. While consent can be a powerful tool, it is not a perfect, universally-applicable solution. In this primer, we explore the strengths and weaknesses of a consent-based model along with some alternative approaches to safeguarding privacy.

## What is consent?

**Consent** is the process of granting another party special rights and obligations to act in a domain where normally only the **consenter** (i.e., the person giving consent) is allowed to act. In this way, consent transforms the morally unacceptable into the morally acceptable.[^1] For instance, the granting of consent distinguishes a guest from an intruder. As a society, we place importance on consent because it is often “an effective means of respecting individuals as autonomous decision makers with rights of self-determination, including rights to make choices, take or avoid risks, express preferences, and, perhaps most importantly, resist exploitation.”[^2]

We commonly categorize consent as {explicit-tacit-implicit|explicit, tacit, or implicit} based on the level of autonomy granted to the consenter. **Explicit consent** is expressed through opting in and taking affirmative action (e.g., emphatically saying “yes”) to establish consent. **Tacit consent** is expressed through failing to opt out (e.g., remaining silent when offered the chance to object). **Implicit consent** relies on outside interpretation of whether one’s actions are sufficiently indicative of consent (e.g. going to a haunted house indicates agreement to being scared). The idea is that, “by virtue of entering into a situation,” a person has “agreed to the activities that are broadly known to occur in that context.”[^3]



## Consent and digital privacy

As scholar Meg Leta Jones puts it, “Consent is arguably the central moral and legal tenet to both modern privacy and data protection theory, practice, and culture.”[^4] [Article 4](https://gdpr.eu/article-4-definitions/) of the **General Data Protection Regulation (GDPR)** defines consent in the context of data privacy as a “*freely given, specific, informed and unambiguous* indication of the data subject's wishes by which he or she, by a statement or by a clear affirmative action, signifies *agreement to the processing of personal data* relating to him or her” \[emphasis added\]. 

The interrelationship between consent and privacy was established by {Warren-and-Brandeis|Warren and Brandeis} in their [1890 article](https://doi.org/10.2307/1321160) proposing a legal right to privacy.[^5] To various degrees across time and place, consent has been considered a legal and ethical basis for digital privacy since the advent of personal computing in the mid-twentieth century.

The US perspective on privacy is particularly deferential to consent, taking a **market-based** **perspective** wherein individuals are treated as **privacy consumers** who are entitled to adequate information in order to make decisions about their privacy. Americans enact consent in large part through the products and services they choose to purchase. This paradigm is referred to as **notice and choice**. A. Michael Froomkin argues that notice and consent “reflects principles of individual autonomy, freedom of choice, and rationality” central to American consumer culture.[^6]

The US approach stands in contrast to the European Union (EU) system, formalized by the GDPR, which takes **rights-based** **perspective** and treats individuals as {data-subjects|data subjects.} The consent question is separate from the commercial transaction; choosing a certain product or service does not nullify one’s rights to make decisions about their data privacy. Additionally, the EU system is more restrictive in terms of what users can consent to. For instance, under EU law, users cannot consent to a vague statement like “We share your data with our partners” in a privacy policy. On the other hand, under US law, agreeing to such a policy is considered valid consent to any and all third-party data processing.

## FRIES: A framework for thinking about meaningful consent

The FRIES acronym was originally created by Planned Parenthood to capture the key elements of consent in sexual interactions. Here, we {adapt-fries|adapt} FRIES into a framework for thinking about what meaningful consent looks like in the context of digital privacy. 

**F is for freely given**. Sometimes referred to as voluntariness, the requirement for consent to be freely given concerns the absence of manipulation, coercion, and other forms of external influence on someone’s decisions about their digital privacy. Examples of external influences include misleading interfaces, a lack of options when accessing essential services, and power imbalances between parties. A related concept is {conditionality}, the bundling of privacy permissions with non-negotiable and/or crucial parts of a product or service’s terms. 

**R is for reversible**. The reversibility of consent concerns the “right to {limit-access|limit access or entirely remove} your data at any time” without detriment.[^8] Users should be informed of this right *before* consenting. Regarding exercisability, GDPR Article 7(3) specifies, “It shall be as easy to withdraw as to give consent.” For instance, if agreeing to share certain personal data requires simply checking a box, so should the process of removing access. Reversibility matters because both {users-preferences|users’ preferences} and the {behavior-consent|behavior of those who solicited consent} may change over time (e.g., when terms of service are updated). 

**I is for informed**. For consent to be informed, users must be provided *accessible* information about who can access their data, the purposes for which their data will be processed, and how their data will be handled and stored. This means providing upfront notice in clear language rather than burying details in dense legalese. Human-computer interaction (HCI) researchers Batya Friedman et al. remark that “What is disclosed should address the important values, needs, and interests of the individual, explicitly state the purpose or reason for undertaking the action, and avoid unnecessary technical detail.”[^9]

**E is for engaged**. Engaged digital consent is *active*, not passive, and takes place in a context that allows users to make intentional decisions. As opposed to tacit (opt-out) consent and implicit (inferred) consent, explicit consent requires affirmative user action to communicate choice. For example, {clickwrap-browsewrap-shrinkwrap|clickwrap, browsewrap, and shrinkwrap} are three consent mechanisms commonly used in computing that fall in different places along the implicit-to-explicit spectrum. Appropriate contextual factors for engagement include the user’s cognitive capacity to offer meaningful consent,[^10] minimal distraction during the consent process,[^11] and a manageable number of requests for consent so that each may be considered fully.[^12] 

**S is for specific.** Una Lee and Dann Toliver of the [Consentful Tech Project](https://www.consentfultech.io) explain specificity to mean only using “data the user has directly given, not data acquired through other means like scraping or buying” and “only in ways the user has consented to.”[^13] An important concept here is **granularity**, the idea that data subjects should be allowed to consent or not consent to each data processing operation separately. Under the GDPR, the data processor must specify a legitimate purpose for each operation. This acts as safeguard against **function creep**, defined as “the gradual widening or blurring of purposes for which data is processed.”[^14] 

## Consent in practice

The design and implementation of digital consent interfaces can either undermine or support meaningful consent. “Design is inherently a persuasive act, where the designer creates intentional change in the world that either directly or indirectly induces behavioral or social change,” write Colin M. Gray and colleagues from Purdue University.[^15] These designs are often discussed through the lens of {behavioral-economics|behavioral economics.} 

The visual presentation of options and default settings selected by the consent requester are proven to change users’ behavior, as {majority-of-users|the majority of users do not change privacy settings} from the default.[^17] It is also possible to influence user choice by making the website’s preferred options stand out and deemphasizing or requiring extra steps to access unpreferred options.[^18] Some scholars and practitioners refer to deceptive design schemes as **dark patterns**. Dark patterns are “instances where designers use their knowledge of human behavior (e.g., psychology) and the desires of end users to implement {deceptive-functionality|deceptive functionality} that is not in the user’s best interest.”[^19]

Conversely, design can be employed in ways that promote meaningful consent. Graphic design techniques like salience, framing, and layering and separation combined with logically structured information delivery can greatly increase the accessibility of privacy policies, empowering informed consenters.[^20] A number of {frameworks-practice|frameworks} have been proposed to formalize such ethically-aware design practices.

## How is consent upheld?

### By the free market

In the US, consent is upheld largely through **free market competition**, which incentivizes companies to adopt good consent practices in exchange for economic benefit. The theory is that subverting consent exposes companies to potential legal, financial, and reputational damage.[^26] For instance, companies should have an interest in addressing privacy concerns during development rather than risk public backlash to security breaches during a faster rollout.[^27]

An enormous variety of companies, organizations, and individuals create products and offer services that implicate digital privacy. In the for-profit realm, market participants may use {privacy-selling-point|privacy features as selling points} or offer {privacy-add-on|privacy as an optional, paid add-on.} Other market participants are in the business of privacy itself, for example, providing {personal-data-removal|personal data removal} or {virtual-private-network|virtual private network (VPN)} services. Privacy may be central to the mission of both {for-profit-companies|for-profit companies} and {non-profit-initiatives|non-profit initiatives}, leading these organizations to take a privacy-first approach to development and delivery. 


### By users themselves

When users’ consent is undermined, they may take action by equipping modifications for existing products (e.g., {browser-extensions|browser extensions}) or by educating themselves on {how-to-evade|how to evade insidious tracking techniques}. 

### By the government

Where market forces and individual action are deemed insufficient to uphold meaningful consent, we rely on **{government-regulation|government regulation}** to do so. Government regulation puts guardrails on consent. It sets limits on what people can consent to, defines legal standards for soliciting and documenting meaningful consent, and {holds-accountable|holds accountable} those who violate consent. 

Despite persistent {lobbying} since the 1970s, the US is one of the few democracies in the world that does not have a federal **data protection agency**.[^28] {dpas|Data protection agencies (DPAs)} are generally established as administrative and regulatory authorities that work with the government but have, to varying degrees, some separation from the government. In the absence of such a body, the Federal Trade Commission (FTC) has become the de facto enforcer of US privacy law under its authority to police unfair and deceptive trade practices. 

Regulation also has the potential to influence how we think about and practice digital consent beyond its jurisdictional scope. Legal and political scholars use the terms {brussels-effect|‘Brussels effect’} and {california-effect|‘California effect’} to refer to the way EU and California law, respectively, increase regulatory standards by making compliance with more stringent requirements the easiest path forward for companies that operate in multiple jurisdictions.[^29]



### By watchdogs

**Watchdogs** keep tabs on companies and regulators, holding them to account by exposing wrongdoing and compelling transparency. {ngos|Non-governmental organizations (NGOs)}, {intergovernmental-organizations|intergovernmental organizations}, {media-outlets|media outlets}, and {independent-journalists|independent journalists} can all act as watchdogs. Their work helps people make informed decisions about the companies with which they choose to do business, ensuring free market competition respects individual privacy. Watchdogs also attempt to expose flaws in regulatory systems and may advocate for legislative or judicial solutions.

## Criticisms of the consent model for digital privacy

Criticisms of the consent model for digital privacy take two general forms. Some scholars disagree with the idea that consent should be the main tool we reach for to protect privacy, while others raise practical concerns about implementation. 

Arguing against consent as the primary mechanism for privacy protection, Daniel J. Solove asserts that consent “attempts to be neutral about substance,” meaning it is agnostic about what the consenter is agreeing to. This has the effect of legitimizing nearly any type of data collection and use.[^31] Additional legal scholars, including Ari Ezra Waldman, argue that framing consent strictly in terms of autonomy and self-determination puts the onus on the individual to manage their privacy and shifts the blame for any harm they suffer from the consent requester to the consent granter.[^32] The key ethical (and legal) question becomes ‘Did they consent to what was done?’ instead of ‘Was there a violation of privacy?’. As long as organizations can maintain the appearance of obtaining meaningful consent, they are legally free to handle data as they wish.

Taking a step back from these broad critiques, we can identify a number of flaws in current implementations of consent. 

### Informed consent vs. time

Many scholars believe that ‘informed consent’ is *not* an achievable standard around which to build regulation. The concern, especially in the era of **Big Data**, is that the consent model places an excessive burden on users, giving them “the responsibility to decide on complex issues they lack the time, or capacity, to fully comprehend and assess.”[^33] Thoroughly evaluating every consent request one encounters would require an unrealistic amount of both time and techno-legal expertise. Research suggests we would have to dedicate a month of work to reading all the privacy policies we are presented with each year.[^34] The average privacy policy has not only quadrupled in length but greatly increased in complexity since the mid-1990s.[^35] 

Repeated, detailed requests for consent cause many people to experience **consent fatigue** (also called consent desensitization), a condition characterized by decreased “motivation and depth of processing,”[^36] which has the ultimate effect of precluding the user’s full engagement.[^37] These factors underlie what communications researchers Jonathan A. Obar and Anne Oeldorf-Hirsch call “**the biggest lie of the internet**”—checking ‘I agree to these terms and conditions’ when, in fact, {we-have-not-even|we have not even read them}.[^38]

### Informed consent vs. aggregation

Another challenge to informed consent is what scholars refer to as the **aggregation effect**. The consent model for digital privacy asks users to continually make decisions about what usually amounts to relatively small pieces of data. Viewed individually, these data points may not reveal much about a person. But as in a pointillist painting, many small points can, when viewed en masse, form a revealing portrait.[^40] It is particularly challenging to weigh the consequences of the aggregation effect when we do not know who has what data on us, potential {harms-are-distant|harms are distant}, or the circumstances from which negative effects might arise {cannot-be-anticipated|cannot be anticipated}.

![Close-up of a male character in Seurat's painting showing the small, distinct dots of contrasting color characteristic of pointillism.](/assets/primer-photos/privacy/consent/parade_de_cirque.png)

**Figure:** Detail from *Parade de cirque*, an 1889 painting by the inventor of pointillism, Georges Seurat.

### Accountability infrastructure

A further critique is that we lack sufficient **accountability infrastructure** to make our best approximations of informed consent meaningful. For consent to be meaningful, we must trust that there are systems in place to enforce the terms to which we have agreed. In the biomedical context, professional codes of ethics, laws and regulations, oversight bodies (e.g., Institutional Review Boards), medical licensing boards, and avenues for malpractice litigation serve this purpose.[^43] Similar accountability mechanisms are not typically available, at least to most Americans, in the realm of digital privacy and online tracking. What’s more, the harms of privacy violations are difficult to quantify and practically impossible to rectify. Fines and awards of damages have historically {done-little-harm|done little harm to Big Tech’s bottom line} and may be viewed as ‘the cost of doing business’ rather than serious deterrents to unethical behavior.[^44] In light of these facts, some critics refer to our current system as **{consent-theater|consent theater}**, since we enact the process of consent without truly empowering the consenter. Such disillusionment contributes to **{privacy-nihilism|privacy nihilism}** as people feel increasingly {powerless-to-control|powerless to control their data}.



### Informed consent vs. the illusion of choice

Additionally, the imbalance in **bargaining power** between users and institutions challenges the requirement that consent be **freely given**. “\[T\]o “choose” not to use the Internet is in a very real sense to “choose” not to participate in modern society or the modern economy,” contend legal scholars Neil Richards and Woodrow Hartzog.[^45] This extends to other forms of data processing—for example, {signing-away|signing away privacy rights in exchange for welfare} or {submitting-workplace|submitting to workplace surveillance for fear of losing one’s job}. When it comes to products, terms and policies tend to converge within market segments, becoming “so uniform and standardized that the consumer effectively has no choice.”[^46] 

### Who consents?

Even more concerningly, some individuals affected by the data collection, storage, and processing concerned are not asked for their consent at all. For example, tenants may be living under the gaze of {smart-home-devices|smart home devices} for which their landlord configured the privacy settings.[^48] In our increasingly connected world, **consent by association** with network members is hotly debated. For instance, consent by association is highly relevant in discussions of privacy in {genetic-testing|genetic testing}, {social-media-ecosystems|social media ecosystems}, and {human-subjects|human subjects research}. In some cases, people {may-not-be-aware|may not be aware} data is being collected about them. Finally, individuals (e.g., {children}) may be asked to consent when they do not have the capacity to do so. 

## Strengthening consent

Scholars and practitioners have suggested ways to improve digital consent as a privacy-protecting tool. Some of their ideas have been tested and implemented, while others remain theoretical. 

On the consenter’s side, auditing of companies’ policies and behavior helps users make informed consent decisions. Some auditing projects rely on {human-expertise|human expertise}, while others employ {artificial-intelligence|artificial intelligence (AI)} to automate review. Experts are also experimenting with AI to {automate-aspects|automate aspects of the consent process} by predicting user preferences and selecting privacy settings appropriately. The idea is to offload the straight-forward decisions to an AI-based tool, keeping the user in the loop as necessary.[^57] Even if such a tool functioned perfectly, however, automation in this sphere raises ethical and legal questions about the validity and meaningfulness of consent given by a non-human proxy.[^58]

Several key proposals for reducing the burden of consent management come from the realm of human subjects research. Tiered consent, meta-consent, and dynamic consent have been proposed specifically to handle the issue of {secondary-data-use|secondary data use}. 

**Tiered consent** provides potential participants with more granular options and aims to facilitate informed decision-making by {ordering-those-options|ordering those options by risk and sensitivity}.[^61] Two considerations for tiered consent are: 

1. That there is no objective, universally applicable way to do this categorization and  
2. That presenting many options is counterproductive to meaningful consent because it can cause information overload.[^62]

**Meta-consent** attempts to support engagement and autonomy by asking research participants during the consent process for the initial use of their data whether or not they want to receive {consent-requests|consent requests for future uses}. Individuals can pick a format, such as blanket consent (or non-consent), broad consent, tiered consent, or case-by-case consent, that aligns with their values, risk tolerance, and logistic preferences.[^63] 

**{dynamic-consent|Dynamic consent}** utilizes web-based platforms to empower research subjects to update their meta-consent preferences, respond to real-time data use requests from studies, and {communicate-investigators|communicate with investigators in real time}. Dynamic consent platforms may include an educational component and {assess-participant|assess participant comprehension} during the initial consent process. The most common criticism of dynamic consent platforms is that they are costly and labor-intensive to maintain. 

Experts have also put forth more radical ideas on restructuring the practice of digital consent.

Complex systems researcher Juniper Lovato and colleagues suggest empowering users of social networks to make their consent conditional on the consent of others, in effect forming a community with commonly held privacy standards. This model, which they call **{distributed-consent|distributed consent}**, attempts to address the issue of consent by association through a sort of ‘**herd privacy**’ analogous to herd immunity. The researchers further recommend the creation of **consent passports** with predetermined privacy standards that users can easily compare to the Terms of Service of a platform they are considering joining.

The idea of **{consent-receipts|consent receipts}** has gained traction in recent years as a way of recording the terms agreed upon and requesting changes to or deletion of one’s data. Like receipts in commercial contexts, each party receives a copy that can be used as proof of the transaction. Consent receipts can improve data minimization by serving such authentication purposes, and, “as a systematic and machine-readable mechanism,” they support automation and make it easier for data processors to fulfill the rights of data contributors.[^65]

Additionally, **encryption** sets up a system in which authorization is needed to access, or **decrypt**, personal data. That authorization may be managed directly between agreed parties or involve a trusted third party. Examples of encryption protocols that help enforce consent include **sticky policies**, where decryption is bound to specific conditions specified in the privacy policy, and **distributed access control enforcement**, where decryption keys are granted on-demand through a decentralized validation system.[^66]

Finally, **{binary-governance|binary governance}** involves the pairing of data subject rights and data processor obligations within a framework that views privacy as a civic good with collective value. The idea of binary governance is that comprehensive legislation should include not only **negative obligations** (requirements to avoid wrongdoing, e.g., violation of individual rights) but **affirmative obligations** (requirements to take positive action). Examples of affirmative obligations imposed on companies by the GDPR and California Privacy Rights Act (CPRA) include regular {risk-assessments|risk assessments}, data minimization, design specifications for consent interfaces, and storage of consent records.[^67] Another proposal is establishing a **{fiduciary-duty|fiduciary duty}** for data holders that would legally obligate them to act in the best interests of data subjects just as financial fiduciaries are required to act in the best interest of their clients. 

### Alternatives to a consent-based approach to privacy

In its ideal form, meaningful digital consent empowers people to make decisions about their data with the ultimate goal of safeguarding privacy in a manner compatible with their values. However, consent is not the only way to accomplish this end, and, in certain circumstances, alternatives may work better in light of logistical, legal, or ethical considerations.

One way of accomplishing the end of privacy is through **anonymization**, which, as privacy scholars Solon Barocas and Helen Nissenbaum write, “seems to take data outside the scope of privacy, as it no longer maps onto identifiable subjects.”[^68] While the word ‘anonymous’ literally means nameless, Nissenbaum defines anonymity here as the stricter condition of **being unreachable**.[^69] Anonymization is a great option in theory, but often fails in practice due to data breaches and ever-advancing re-identification techniques.

**Statistical disclosure limitation (SDL) techniques** help ensure privacy in data analysis and sidestep the issue of soliciting consent for each secondary use case. SDL techniques modify or restrict data in ways that prevent individuals from being identified {while-analysis|while still allowing for useful statistical analysis}. 

* **{Coarsening}** involves aggregating data into broader categories to make individual records harder to pick out.   
* **{data-swapping|Data swapping}** entails switching values between selected pairs of records to introduce inaccuracies that make identification more difficult without warping the high-level findings of interest.   
* Approaches using **{synthetic-data|synthetic data}** replace sensitive values with simulated records drawn from probability distributions that preserve important statistical relationships present in the original data. Multiple versions of the dataset, which may be partially or fully synthetic, are made available to analysts so uncertainty can be accounted for appropriately.[^70]   
* Finally, **noise infusion** involves injecting random statistical noise into the underlying data or a specific query to obscure individual data points. **Differential privacy (DP)** is a widely used mathematical framework based on calibrated noise infusion.    

A **paternalistic** **approach** to privacy places some or all of the decision-making power granted to individuals under a consent-based model in the hands of a governing body tasked with safeguarding individuals from harm. Paternalism is predicated upon the belief that some data collection, ownership, and use practices are morally and ethically wrong regardless of whether a subject consents. Proponents of paternalism argue that, just as we rely on agencies like the National Highway Traffic Safety Administration (NHTSA) and the Food and Drug Administration (FDA) to ensure reasonable safety standards for the cars we drive and products we consume, it makes sense to rely on an expert group to ensure reasonable safety standards for privacy.[^72] “Failing to limit who can ask for informed consent, when they can ask, and how many times ignores the reality that people need time and space if their choices are to be meaningful,” write Richards and Hartzog.[^73]

**Libertarian paternalism** takes a less restrictive approach by nudging users towards more privacy-preserving options without eliminating less privacy-preserving ones. Such applications of {choice-architecture|choice architecture} are sometimes called **light patterns**. Examples of light patterns include making the default option for log-in creation password generation, color coding settings based on level of privacy protection, reminders about privacy implications when entering sensitive information, and {incorporating-personalized|incorporating personalized scenarios into permissions dialogues}.[^74] 

Paternalism hinges on who gets to make the rules and using what standards. This raises obvious issues for implementation. Reasonable, well-intentioned people constantly disagree about how to balance {tradeoffs} between privacy and other goods like security, social cohesion, {sci-and-med|scientific and medical progress}, and so on. And if governing entities look to industry norms to set standards of reasonableness, paternalistic systems are likely to further entrench the prioritization of profit over individual rights.[^75]

The theory of **{contextual-integrity|contextual integrity}** put forth by privacy scholar Helen Nissenbaum understands consent as one possible aspect of the appropriate flow of information, defined according to the subject, sender, recipient, information type, and **transmission principles** (of which ‘with consent’ and ‘with notice’ are options).[^78] An appealing feature of contextual integrity as a privacy protection framework is its ability to reflect evolving ethical norms and societal interests.

<!-- Note: duplicates have not been removed and these are not in alphabetical order. For this case, that represents
a substantial amount of work, so we're skipping it for right now-->

[^1]:  A. John Simmons, “Tacit Consent and Political Obligation,” *Philosophy & Public Affairs* 5, no. 3 (1976): 274–91.

[^2]:  Solon Barocas and Helen Nissenbaum, “Big Data’s End Run around Anonymity and Consent,” in *Privacy, Big Data, and the Public Good: Frameworks for Engagement*, ed. Julia Lane et al. (Cambridge University Press, 2014), 56–57.

[^3]:  Batya Friedman et al., “Informed Consent by Design,” in *Security and Usability* (O’Reilly Media, Inc., 2005), 503, https://old.vsdesign.org/publications/pdf/Security\_and\_Usability\_ch24.pdf.

[^4]:  “The Development of Consent to Computing,” *IEEE Annals of the History of Computing* 41, no. 4 (2019): 37, https://doi.org/10.1109/MAHC.2019.2896282.

[^5]:  Samuel D. Warren and Louis D. Brandeis, “The Right to Privacy,” *Harvard Law Review* 4, no. 5 (1890): 193–220, https://doi.org/10.2307/1321160.

[^6]:  “Big Data: Destroyer of Informed Consent,” *Yale Journal of Law & Technology* 21 (2019): 30\.

[^7]:  Meg Leta Jones, *The Character of Consent: The History of Cookies and the Future of Technology Policy*, Information Policy Series (MIT Press, 2024), 71\.

[^8]:  Una Lee and Dann Toliver, “Building Consentful Tech,” And Also Too, 2017, https://www.andalsotoo.net/wp-content/uploads/2018/10/Building-Consentful-Tech-Zine-SPREADS.pdf.

[^9]:  “Informed Consent by Design,” 499\.

[^10]:  Neil Richards and Woodrow Hartzog, “The Pathologies of Digital Consent,” Washington University Law Review, Trust and Privacy in the Digital Age, vol. 96, no. 6 (2019), https://openscholarship.wustl.edu/law\_lawreview/vol96/iss6/11.

[^11]:  Friedman et al., “Informed Consent by Design.”

[^12]:  Daniel J. Solove, “Privacy Self-Management and the Consent Dilemma,” *Harvard Law Review* 126 (2013): 1880–903.

[^13]:  “Building Consentful Tech.”

[^14]:  Article 29 Working Party (WP29), “Guidelines on Consent under Regulation 2016/679,” April 10, 2018, 12\.

[^15]:  Colin M. Gray et al., “The Dark (Patterns) Side of UX Design,” *Proceedings of the 2018 CHI Conference on Human Factors in Computing Systems*, April 21, 2018, 2, https://doi.org/10.1145/3173574.3174108.

[^16]:  Max Witynski, “Behavioral Economics, Explained,” *UChicago News*, n.d., accessed January 1, 2026, https://news.uchicago.edu/explainer/what-is-behavioral-economics.

[^17]:  Friedman et al., “Informed Consent by Design.”

[^18]:  Midas Nouwens et al., “Dark Patterns after the GDPR: Scraping Consent Pop-Ups and Demonstrating Their Influence,” *Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems*, April 21, 2020, 1–13, https://doi.org/10.1145/3313831.3376321.

[^19]:  Gray et al., “The Dark (Patterns) Side of UX Design.”

[^20]:  Ramona Schmidt et al., “Challenges and Solutions in Implementing Informed Consent in Digital Environments: A Scoping Review,” *IEEE Access* 13 (2025): 71974, https://doi.org/10.1109/ACCESS.2025.3562773.

[^21]:  Batya Friedman and David G. Hendry, *Value Sensitive Design: Shaping Technology with Moral Imagination* (The MIT Press, 2019), https://doi.org/10.7551/mitpress/7585.001.0001.

[^22]:  Mary Flanagan and Helen Nissenbaum, *Values at Play in Digital Games* (The MIT Press, 2014), https://doi.org/10.7551/mitpress/9016.001.0001.

[^23]:  Katie Shilton, “Values Levers: Building Ethics into Design,” *Science, Technology, & Human Values* 38, no. 3 (2013): 374–97, https://doi.org/10.1177/0162243912436985.

[^24]:  Jeffrey Bardzell and Shaowen Bardzell, “What Is ‘Critical’ about Critical Design?,” *Proceedings of the SIGCHI Conference on Human Factors in Computing Systems*, April 27, 2013, 3297–306, https://doi.org/10.1145/2470654.2466451.

[^25]:  Phoebe Sengers et al., “Reflective Design,” *Proceedings of the 4th Decennial Conference on Critical Computing: Between Sense and Sensibility*, August 20, 2005, 49–58, https://doi.org/10.1145/1094562.1094569.

[^26]:  Friedman et al., “Informed Consent by Design.”

[^27]:  Data & Society Research Institute, “Data & Society Research Institute Comments to NTIA on ‘Stakeholder Engagement on Cybersecurity in the Digital Ecosystem,’” Data & Society, May 27, 2015, https://datasociety.net/pubs/dcr/Data\&Society\_NTIA-comments\_May2015.pdf.

[^28]:  Electronic Privacy Information Center, “Enforcement of Privacy Laws,” Epic.Org, 2025, https://epic.org/issues/data-protection/enforcement-of-privacy-laws/.

[^29]:  Wikipedia contributors, “Brussels Effect,” in *Wikipedia* (Wikipedia, The Free Encyclopedia, November 24, 2025), https://en.wikipedia.org/wiki/Brussels\_effect.

[^30]:  Jones, *The Character of Consent*.

[^31]:  “Privacy Self-Management and the Consent Dilemma,” 1880\.

[^32]:  Ari Ezra Waldman, “Privacy, Practice, and Performance,” *California Law Review* 110 (2022), https://doi.org/10.15779/Z38JD4PQ3D.

[^33]:  Fida K. Dankar et al., “Dynamic-Informed Consent: A Potential Solution for Ethical Dilemmas in Population Sequencing Initiatives,” Computational and Structural Biotechnology Journal 18 (2020): 919, https://doi.org/10.1016/j.csbj.2020.03.027.

[^34]:  Jones, The Character of Consent, 3\.

[^35]:  Isabel Wagner, “Privacy Policies across the Ages: Content of Privacy Policies 1996–2021,” *ACM Transactions on Privacy and Security* 26, no. 3 (2023): 1–32, https://doi.org/10.1145/3590152.

[^36]:  Caspar Barnes et al., “Enabling Demonstrated Consent for Biobanking with Blockchain and Generative AI,” *The American Journal of Bioethics* 25, no. 4 (2025): 96–111, https://doi.org/10.1080/15265161.2024.2416117.

[^37]:  Woodrow Hartzog, “The Case Against Idealising Control,” *European Data Protection Law Review* 4 (2018), https://scholarship.law.bu.edu/cgi/viewcontent.cgi?article=4050\&context=faculty\_scholarship.

[^38]:  Jonathan A. Obar and Anne Oeldorf-Hirsch, “The Biggest Lie on the Internet: Ignoring the Privacy Policies and Terms of Service Policies of Social Networking Services,” *Information, Communication & Society* 23, no. 1 (2018): 128–47, https://doi.org/10.1080/1369118X.2018.1486870.

[^39]:  Paul Bernal, “Collaborative Consent: Harnessing the Strengths of the Internet for Consent in the Online Environment,” *International Review of Law, Computers & Technology* 24, no. 3 (2010): 287–97, https://doi.org/10.1080/13600869.2010.522335.

[^40]:  Daniel J. Solove, “Digital Dossiers and the Aggregation Effect,” *TeachPrivacy*, November 25, 2024, https://teachprivacy.com/digital-dossiers-and-the-aggregation-effect/.

[^41]:  Froomkin, “Big Data: Destroyer of Informed Consent.”

[^42]:  Froomkin, “Big Data: Destroyer of Informed Consent.”

[^43]:  Solon Barocas and Helen Nissenbaum, “On Notice: The Trouble with Notice and Consent,” *Proceedings of the Engaging Data Forum: The First International Forum on the Application and Management of Personal Electronic Information*, October 2009, 6, https://ssrn.com/abstract=2567409.

[^44]:  Rene Millman, “Big Tech Needs Less than a Month to Pay off over $7 Billion in 2025 Fines, Proton Warns,” *TechRadar*, January 28, 2026, https://www.techradar.com/vpn/vpn-privacy-security/big-tech-could-need-only-one-month-to-pay-off-over-usd7-billion-in-2025-fines-proton-warns.

[^45]:  Richards and Hartzog, “The Pathologies of Digital Consent,” 1487\.

[^46]:  Nancy Kim, “Clicking and Cringing,” Oregon Law Review 86 (2007): 821, https://scholarlycommons.law.cwsl.edu/cgi/viewcontent.cgi?article=1054\&context=fs.

[^47]:  Aiha Nguyen, *The Constant Boss: Work Under Digital Surveillance* (Data & Society, 2021), https://datasociety.net/wp-content/uploads/2021/05/The\_Constant\_Boss.pdf.

[^48]:  Data & Society Research Institute, “Data & Society Research Institute Comments to NTIA on ‘Stakeholder Engagement on Cybersecurity in the Digital Ecosystem.’”

[^49]:  Juniper L. Lovato et al., “Limits of Individual Consent and Models of Distributed Consent in Online Social Networks,” *2022 ACM Conference on Fairness Accountability and Transparency*, June 21, 2022, 2252, https://doi.org/10.1145/3531146.3534640.

[^50]:  Alan Mislove et al., “You Are Who You Know: Inferring User Profiles in Online Social Networks,” Proceedings of the Third ACM International Conference on Web Search and Data Mining, ACM, February 4, 2010, 251–60, https://doi.org/10.1145/1718487.1718519.

[^51]:  James P. Bagrow et al., “Information Flow Reveals Prediction Limits in Online Social Activity,” Nature Human Behaviour 3, no. 2 (2019): 122–28, https://doi.org/10.1038/s41562-018-0510-5.

[^52]:  Jones, The Character of Consent, 180\.

[^53]:  Froomkin, “Big Data: Destroyer of Informed Consent,” 33\.

[^54]:  Barocas and Nissenbaum, “Big Data’s End Run around Anonymity and Consent,” 61\.

[^55]:  Luger and Rodden, “Terms of Agreement,” 230\.

[^56]:  Richards and Hartzog, “The Pathologies of Digital Consent,” 1490\.

[^57]:  Meg Leta Jones et al., “AI and the Ethics of Automating Consent,” *IEEE Security & Privacy* 16, no. 3 (2018): 64–72, https://doi.org/10.1109/MSP.2018.2701155.

[^58]:  Jones et al., “AI and the Ethics of Automating Consent.”

[^59]:  Jones et al., “AI and the Ethics of Automating Consent,” 69\.

[^60]:  Dankar et al., “Dynamic-Informed Consent.”

[^61]:  Barnes et al., “Enabling Demonstrated Consent for Biobanking with Blockchain and Generative AI,” 97\.

[^62]:  Natalie Ram, “Tiered Consent And The Tyranny Of Choice,” *Jurimetrics*, Spring 2008, http://scholarworks.law.ubalt.edu/all\_fac/873.

[^63]:  Thomas Ploug and Søren Holm, “Meta Consent – A Flexible Solution to the Problem of Secondary Use of Health Data,” *Bioethics* 30, no. 9 (2016): 721–32, https://doi.org/10.1111/bioe.12286.

[^64]:  Bernal, “Collaborative Consent.”

[^65]:  Schmidt et al., “Challenges and Solutions in Implementing Informed Consent in Digital Environments,” 71977\.

[^66]:  Schmidt et al., “Challenges and Solutions in Implementing Informed Consent in Digital Environments.”

[^67]:  Jones, *The Character of Consent*.

[^68]:  Barocas and Nissenbaum, “Big Data’s End Run around Anonymity and Consent,” 45\.

[^69]:  Helen Nissenbaum, “The Meaning of Anonymity in an Information Age,” *The Information Society* 15, no. 2 (1999): 141–44, https://doi.org/10.1080/019722499128592.

[^70]:  Alan F. Karr and Jerome P. Reiter, “Using Statistics to Protect Privacy,” in *Privacy, Big Data, and the Public Good: Frameworks for Engagement*, ed. Julia Lane et al. (Cambridge University Press, 2014).

[^71]:  Karr and Reiter, “Using Statistics to Protect Privacy,” 278–79.

[^72]:  Solove, “Privacy Self-Management and the Consent Dilemma,” 1901\.

[^73]:  Richards and Hartzog, “The Pathologies of Digital Consent,” 1494\.

[^74]:  Ana Caraban et al., “23 Ways to Nudge: A Review of Technology-Mediated Nudging in Human-Computer Interaction,” *Proceedings of the 2019 CHI Conference on Human Factors in Computing Systems*, May 2, 2019, 1–15, https://doi.org/10.1145/3290605.3300733.

[^75]:  Kim, “Clicking and Cringing.”

[^76]:  Dankar et al., “Dynamic-Informed Consent.”

[^77]:  Froomkin, “Big Data: Destroyer of Informed Consent.”

[^78]:  Scott Berinato, “‘Stop Thinking About Consent: It Isn’t Possible and It Isn’t Right,’” *Harvard Business Review*, The Big Idea Series  /  Tracked, September 24, 2018, https://www5.qa.hbr.org/2018/09/stop-thinking-about-consent-it-isnt-possible-and-it-isnt-right.

## Sidebar

explicit-tacit-implicit:
Heading: Explicit, tacit, or implicit
To illustrate, consider what explicit, tacit, and implicit consent might look like when interacting with cookies: 

- When a user opens webpage A, a banner appears asking if they want to opt in to third-party cookies. By selecting the ‘yes’ option they are explicitly consenting to such tracking. 

- When a user opens a webpage B, a banner appears asking if they want to opt out of third-party cookies. By not unchecking the pre-selection ‘yes’ option, they are tacitly consenting to such tracking. 

- When a user opens webpage C, no banner appears. The footer at the bottom of the page says that by browsing the website they are agreeing to the terms available at the provided link. Buried in these terms is a provision stating that third-party cookies are employed. By continuing to use the website, whether or not the user has read the terms, they are tacitly consenting to such tracking. 

For more information about what cookies are and how they work, check out the article “[Understanding Cookies in Web Browsers](https://www.geeksforgeeks.org/websites-apps/understanding-cookies-in-web-browsers/).” 

To learn more about opt-in and opt-out consent in the context of digital privacy, see the article “[What is Opt-Out and Opt-In Consent?](https://www.datagrail.io/blog/data-privacy/opt-out-and-opt-in-consent-explained/)” by DataGrail.

Warren-and-Brandeis:
Heading: Warren and Brandeis
See [What is Privacy?](/privacy/whatIsPrivacy) for a more detailed discussion of Warren and Brandeis’ contributions to our thinking about privacy.

data-subjects:
Heading: Data Subjects
Rather than adopting a concept like the data subject that transcends legal domains, the US protects data privacy through a patchwork of laws that address specific situations. For example, the Fair Credit Reporting Act (FCRA) concerns consumers, the Family Educational Rights and Privacy Act (FERPA) concerns students, and the Health Insurance Portability and Accountability Act (HIPAA) concerns patients.[^7] 

adapt-fries:
Heading: Adapt
FRIES The Consentful Tech Project, an initiative of Allied Media Projects, also applies FRIES to digital consent. You can check out their version at [ConsentfulTech.io](https://www.consentfultech.io/).

conditionality:
Heading: Conditionality
Conditionality undermines one’s ability to freely give consent because one must agree to all the terms or else not use the product or service, which is unrealistic in the absence of true alternatives.  

For example, university students access all sorts of essentials—like housing, dining, and healthcare—via their ID cards. Receiving an ID card and unlocking this access is conditional upon agreement to certain data processing and sharing by the university. Consent is take-it-or-leave-it as there is no option to enroll as a student without assenting to the university’s terms. Since most institutions have similar terms, the option to attend a different school does not provide a student with meaningful freedom of choice.

limit-access:
Heading: Limit access or entirely remove 
There is no universally-accepted definition of reversing consent. Different jurisdictions, industries, and data processors take different stances on what should happen when a user withdraws consent. An example of a lower standard is not using research participants’ data for future studies, while an example of a higher standard is the right to erasure (also called the ‘right to be forgotten’) encoded in [GDPR Article 17](https://gdpr.eu/article-17-right-to-be-forgotten/).

users-preferences:
Heading: Users' preferences 
One recent trend in users’ preferences is growing opposition to ‘mommy bloggers,’ family vloggers, and other parent influencers who publicly share details of their children’s lives. As explored in the article “[Influencer Parents and The Kids Who Had Their Childhood Made Into Content](https://www.teenvogue.com/story/influencer-parents-children-social-media-impact),” some content creators are changing course and not posting their kids anymore after learning, sometimes firsthand, about [the risks ‘sharenting’ poses](https://www.newyorker.com/culture/cultural-comment/instagram-facebook-and-the-perils-of-sharenting). For further reading, check out this [blog post](https://www.laurenbeechingpr.com/blog/is-family-vlogging-on-its-way-out-the-ethical-dilemma-of-monetising-childhood) examining consent and the ethics of family vlogging. 

Another example of user preferences shifting due to privacy and safety concerns is a transgender person wanting to erase their pre-transition digital footprint to avoid being outed or discriminated against. The articles “[Taking Control of Your Digital Identity](https://translifeline.org/taking-control-of-your-digital-identity/)” by Trans Lifeline and “[Standing Up for LGBTQ+ Digital Safety this International Day Against Homophobia](https://www.eff.org/uk/deeplinks/2025/05/standing-lgbtq-digital-safety-international-day-against-homophobia?language=uk)” from the Electronic Frontier Foundation (EFF) offer digital harm prevention tips and resources.

behavior-consent:
Heading: Behavior of those who solicited consent
Mozilla and Zoom are two data processors that recently received public backlash for changing their products’ Terms of Service. Both the [Mozilla Firefox](https://consumerrights.wiki/w/Firefox_introduces_TOS) and [Zoom](https://themarkup.org/hello-world/2023/08/12/this-is-what-happens-when-people-start-actually-reading-privacy-policies) examples concern policy updates that left the door open for training artificial intelligence (AI) on user data.

clickwrap-browsewrap-shrinkwrap:
Heading: Clickwrap, browsewrap, and shrinkwrap 
**Clickwrap** requires a user to click a button, check box, or link to agree to a website or software’s terms of service. Those terms may or may not be displayed in full for the user to peruse before consenting and may be structured as opt-in or opt-out.  

**Browsewrap** is a tacit consent mechanism whereby users are presumed to agree to a website’s terms of service simply by browsing the site. 

**Shrinkwrap**, like browsewrap, is a tacit consent mechanism but one that applies to physical products (e.g., data or software on discs). A shrinkwrap agreement considers the opening of the package consent to the terms of service attached, even if those terms are not accessible without opening the package. See the article “[Clickwrap vs Browsewrap vs Shrinkwrap](https://privacyterms.io/terms/clickwrap-vs-shrinkwrap-vs-browsewrap/)” for an in-depth comparison.

behavioral-economics:
Heading: Behavioral economics 
Behavioral economics combines psychology and economics to try to understand why people sometimes act in ways neoclassical economics would consider irrational.[^16] Richard Thaler and Cass Sunstein brought mainstream attention to behavioral economics with their 2008 book [*Nudge: Improving Decisions about Health, Wealth, and Happiness*](https://psycnet.apa.org/record/2008-03730-000). Nudge theory posits that the decision environment, or **choice architecture**, can be intentionally designed to promote certain behaviors. Thaler and Sunstein define a **nudge** as “any aspect of the choice architecture that alters people’s behavior in a predictable way without forbidding any option or significantly changing their economic incentive.”

majority-of-users:
Heading:the majority of users do not change privacy settings 
For instance, a [2019 study](https://doi.org/10.1145/3319535.3354212) on cookies found that most webpage visitors will accept a privacy-invasive default allowing cookies to be set for all purposes (i.e., will not opt out) while less than 0.1% of visitors will opt in to those settings when given the choice.

deceptive-functionality:
Heading:Deceptive functionality 
Dark pattern strategies as defined by [Gray et al. (2018)](https://doi.org/10.1145/3173574.3174108): 

- **Nagging** – “a minor redirection of expected functionality that may persist over one or more interactions” (e.g., pop-ups with options to either postpone or accept but not to permanently decline) 

- **Obstruction** – “impeding a task flow, making an interaction more difficult than it inherently needs to be with the intent to dissuade an action” (e.g., preventing users from easily comparing prices by not allowing website text to by copied and pasted) 

- **Sneaking** – “an attempt to hide, disguise, or delay the divulging of information that has relevance to the user” (e.g., requiring consent to a privacy statement that permits the sale of the users data in order to unsubscribe from an email newsletter)  

- **Interface interference** – “any manipulation of the user interface that privileges specific actions over others, thereby confusing the user or limiting discoverability of important action possibilities” (e.g., hiding information in the fine print; preselecting options) 

- **Forced action** – “any situation in which users are required to perform a specific action to access (or continue to access) specific functionality” (e.g., making levels of a mobile game impossible without purchasing power ups)

frameworks-practice:
Heading:Frameworks 
Ethically aware design approaches: 
- **Value sensitive design** – a methodological framework for incorporating “both moral and technical imagination” throughout the stages of design[^21] 

- **Values at play** – “a theoretical and practical guide to integrating human values into the conception and design of digital games”[^22] 

- **Value levers** – “practices that open new conversations about social values and encourage consensus around those values as design criteria”[^23] 

- **Critical design** – “a research through design methodology that foregrounds the ethics of design practice, reveals potentially hidden agendas and values, and explores alternative design values”[^24] 

- **Reflective design** – reflection on “the ways in which technologies reflect and perpetuate unconscious cultural assumptions” and the creation of alternatives[^25]

privacy-selling-point:
Heading:Privacy features as selling points
Apple regularly highlights its products’ privacy features in marketing materials under the slogan: “Privacy. That’s iPhone.” [A 2022 advertisement](https://www.forbes.com/sites/kateoflahertyuk/2022/05/25/apple-slams-facebook-and-google-with-bold-new-privacy-ad/) depicts a user’s data on auction—until the protagonist activates ‘Mail Privacy Protection.’ [A series of billboards](https://www.dandad.org/work/d-ad-awards-archive/privacy-thats-iphone) in 2023 show people holding up iPhones to cover their faces. And in 2024, Apple released [a two-minute Hitchcockian film](https://lbbonline.com/news/apples-privacy-features-on-iphone-fend-off-bird-like-surveillance-cameras-in-fantastical-film) in which bird-like security cameras hunt people’s browsing data before iPhone users open Safari, causing the cameras to explode in midair. 

privacy-add-on:
Heading:Privacy as an optional, paid add-on 
Some companies have business models wherein users must purchase the right to control how their data is treated. You may hear such models referred to as **‘pay-for-privacy,’ ‘consent-or-pay,’** or **‘freemium pricing’** (from the words ‘free’ and ‘premium’). In her [Columbia Law Review article](https://www.columbialawreview.org/content/paying-for-privacy-and-the-personal-data-economy/), Stacy-Ann Elvy argues that pay-for-privacy models “facilitate the transformation of privacy into a tradable product, may engender or worsen unequal access to privacy, and could further enable predatory and discriminatory behavior.” In [comments to the UK’s Information Commissioner's Office (ICO)](https://epic.org/documents/epic-comments-to-uk-ico-call-for-views-on-consent-or-pay-business-models/), EPIC asserts, “Consent is a facially invalid basis for processing data under ‘consent or pay’ business models.” Other authors explore [the move to paid subscriptions on social networks](https://www.techpolicy.press/pay-or-okay-the-move-to-paid-subscriptions-on-social-networks/?ref=theethicaltechdigest.org#) and [what freemium pricing looks like in the realm of generative AI](https://www.safehire.ai/blog-posts/free-ai-versus-paid-ai-is-your-data-really-safe-what-you-need-to-know).

personal-data-removal:
Heading: personal data removal Personal data removal services are in the business of reducing customers’ digital footprints by requesting that **data brokers** and **people-finder sites** remove their information. Popular options include Aura, DeleteMe, Incogni, and Optery. Check out [this article](https://www.pcmag.com/explainers/personal-data-removal-services-how-they-work-and-why-you-need-one) from *PCMag* or [this one](https://www.cnet.com/tech/services-and-software/a-guide-to-data-removal-services-should-you-pay-for-privacy/) from *CNET* to learn more about how they work. 

virtual-private-network:
Heading:Virtual private networks (VPNs)
VPNs work by encrypting the user’s data and routing their internet connection through a remote server, masking their real IP address and location. The Center for Democracy and Technology (CDT) offers a helpful [primer](https://cdt.org/insights/techsplanations-part-5-virtual-private-networks/) on VPNs and how they relate to privacy.

for-profit-companies:
Heading:For-profit companies 
Microsoft, for example, has [instructed its employees to prioritize security](https://www.thurrott.com/microsoft/306687/microsoft-asks-all-of-its-employees-to-prioritize-security) and offers extensive resources on data privacy through the [Microsoft Trust Center](https://www.microsoft.com/en-us/trust-center/privacy). 

It should be noted that with for-profit companies, it is nearly impossible to disentangle motivations rooted in brand image and profit from those rooted in genuine concern for user privacy.

non-profit-initiatives:
Heading: Non-profit initiatives 
**The Tor Project**, established as a nonprofit in 2006, was established to maintain development of the Tor network. Tor is an acronym of ‘The Onion Router.’ **Onion routing** protects users’ privacy by directing their internet traffic through multiple servers and encrypting it at each step. Click the links to learn more about The Tor Project’s [history](https://www.torproject.org/about/history/), [principles](https://blog.torproject.org/tor-social-contract/), and [plans for advancing digital rights in 2026](https://blog.torproject.org/advancing-digital-rights-in-2026/).  

The **Open Source Initiative** (OSI) was formed in 1998 to promote “development based on the sharing and collaborative improvement of software source code.” Open source products are potentially subject to high levels of public scrutiny, which encourages good privacy-respecting behavior by developers. You can read more about the history of OSI [here](https://opensource.org/about/history-of-the-open-source-initiative). 

[**Signal**](https://signal.org/) is an encrypted messaging app funded through grants and donations and based on open source code. It is designed to minimize data collection and protect user metadata. 

browser-extensions:
Heading:Browser extensions 
Browser extensions are software add-ons that offer a specific functionality or feature within a web browser.  

A popular type of browser extension are ad blockers, which prevent advertisements from appearing when users load webpages. [Privacy Badger](https://privacybadger.org/), from the digital rights nonprofit Electronic Frontier Foundation (EFF), specifically blocks trackers and ads that violate user consent with the goal of incentivizing advertisers to adopt better privacy practices. 

Daniel C. Howe and Helen Nissenbaum have created several browser extensions to subvert the web tracking ecosystem. With Vincent Toubiana they developed TrackMeNot, which obfuscates a user’s search history by automatically adding random “ghost queries.” With Mushon Zer-Aviv they developed AdNauseam, which ‘clicks’ every ad behind the scenes to make engagement analytics useless. For more on [TrackMeNot](https://www.trackmenot.io/), see [Howe and Nissenbaum’s chapter](https://nissenbaum.tech.cornell.edu/papers/D.Howe_TrackMehot.pdf) in *Lessons from the Identity Trail* (2008). For more on [AdNauseam](https://adnauseam.io/), check out the article “[Engineering Privacy and Protest: A Case Study of AdNauseam](https://nissenbaum.tech.cornell.edu/papers/EngineeringPrivacyandProtest-AdNauseam.pdf)” or watch [Nissenbaum’s 2019 talk](https://www.youtube.com/watch?v=vZpu3UrGeZg) at the Simons Institute for the Theory of Computing.

how-to-evade:
Heading: How to evade insidious tracking techniques 
The following are examples of educational resources published by groups or individuals interested in helping people take control of their digital privacy: 
- The research and organizing initiative [Our Data Bodies](https://www.odbproject.org) offers the [*Digital Defense Playbook: Community Power Tools for Reclaiming Data*](https://www.odbproject.org/wp-content/uploads/2019/03/ODB_DDP_HighRes_Single.pdf). 
- Investigative tech reporter [Yael Grauer](https://yaelwrites.com) maintains the [Big Ass Data Broker Opt-Out List](https://github.com/yaelwrites/Big-Ass-Data-Broker-Opt-Out-List), a US-based volunteer project guiding users on how to remove their information from data broker sites. 
- The international digital rights nonprofit [Access Now](https://www.accessnow.org) offers [guides](https://www.accessnow.org/guides/) searchable by issue, region, and language. Access Now also has a [Digital Security Helpline](https://www.accessnow.org/help/) which provides 24/7 technical support for activists, journalists, and other human rights defenders.  
- [GLAAD's Social Media Safety Program](https://glaad.org/smsi/lgbtq-social-media-safety-program/) works to secure safer online spaces for LGBTQ+ individuals. Resources include the [We Keep Us Safe](https://glaad.org/smsi/lgbtq-digital-safety-guide/) digital safety guide and an annual [Social Media Safety Index & Platform Scorecard](https://glaad.org/smsi/social-media-safety-index-2025/). 

government-regulation:
Heading:Government regulation 
The Electronic Frontier Foundation (EFF) article “[Digital Privacy Legislation is Civil Rights Legislation](https://www.eff.org/deeplinks/2023/04/digital-privacy-legislation-civil-rights-legislation)” offers a social justice perspective on the importance of government regulation. A brief [summary of laws governing privacy in the US](https://epic.org/issues/privacy-laws/united-states/) is available from the Electronic Privacy Information Center (EPIC). To follow the latest developments in state-level privacy law, check out the [State Privacy Legislation Tracker](https://iapp.org/resources/article/us-state-privacy-legislation-tracker/) from the IAPP. 

holds-accountable:
Heading:Holds accountable
EPIC’s webpage on [Enforcement of Privacy Laws](https://epic.org/issues/data-protection/enforcement-of-privacy-laws/) provides a useful summary of this topic in the US context. To learn more about private rights of action in US privacy law, check out [this](https://iapp.org/resources/article/private-rights-of-action-us-privacy-legislation/) IAPP resource and [this](https://www.eff.org/deeplinks/2019/01/you-should-have-right-sue-companies-violate-your-privacy) Electronic Frontier Foundation (EFF) article on the subject.

lobbying:
Heading:Lobbying 
The Electronic Privacy Information Center (EPIC) explains the motivations behind its campaign for an American data protection agency in the article “[The U.S. Urgently Needs a Data Protection Agency](https://epic.org/campaigns/dpa/).”

dpas:
Heading:Data protection agencies (DPAs) 

You can read more about the missions and contributions of select federal data protection agencies at their English-language websites linked below: 
- Canada – [Office of the Privacy Commissioner of Canada (OPC)](https://www.priv.gc.ca/en/) 
- France – [Commission Nationale de l’Informatique et des Libertés (CNIL)](https://www.cnil.fr/en) 
- Singapore – [Personal Data Protection Commission](https://www.pdpc.gov.sg/) = South Africa – [The Information Regulator](https://inforegulator.org.za/) 
- United Kingdom – [Information Commissioner's Office (ICO)](https://ico.org.uk) 

For a comprehensive list of data protection authorities around the world, visit the IAPP’s [Global Privacy Law and DPA Directory](https://iapp.org/resources/global-privacy-directory/). 

brussels-effect:
Heading:Brussels effect 
To learn more about the Brussels effect, see the following reports: “[The Brussels Effect and the GDPR: EU Institutions as Catalysts for Global Data Protection Norms](https://edpi.eu/brussels-effect)” from the European Digital Policy Initiative (EDPI) and “[Mapping the Brussels Effect: The GDPR Goes Global](https://cepa.org/comprehensive-reports/mapping-the-brussels-effect-the-gdpr-goes-global/)” from the Center for European Policy Analysis (CEPA). 

california-effect:
Heading:California effect 
The [California Consumer Privacy Act of 2018 (CCPA)](https://oag.ca.gov/privacy/ccpa) and its 2020 expansion through the  (CPRA) currently comprise the most stringent digital privacy laws in the US. For a summary of California’s recently passed privacy legislation, check out [this blog post](https://www.insideprivacy.com/state-privacy/california-enacts-new-privacy-laws/).  

Legal experts consider California the ‘the one to watch’ in the realm of [state privacy regulation](https://www.squirepattonboggs.com/insights/publications/2025-state-privacy-roundup-key-trends-and-california-developments-to-watch-in-2026/). For instance, California jurisprudence allows consumers to opt out of websites selling or sharing personal information using an automated signal, which has spurred the development of a [Global Privacy Control (GPC) specification](https://globalprivacycontrol.org). The development is a collaboration between privacy experts, large media companies, and non-profit organizations. The GPC specification is intended to replace the now-deprecated [Do Not Track (DNT)](https://en.wikipedia.org/wiki/Do_Not_Track) HTTP header field.[^30] 

ngos:
Heading:Non-governmental organizations (NGOs) The following are examples of prominent NGOs that function as watchdogs for digital consent: 
- [Consumer Watchdog](https://consumerwatchdog.org/issues/privacy/) advocates for US consumer rights and frequently challenges the data-sharing practices of Big Tech. 
- [Distributed Denial of Secrets (DDoSecrets)](https://ddosecrets.com/) is a transparency collective that publishes leaked datasets of public interest to expose corporate and governmental corruption. 
- The [Electronic Frontier Foundation (EFF)](https://www.eff.org/issues/privacy) defends civil liberties in the digital world through high-impact litigation and the development of privacy-enhancing tools. 
- The [Electronic Privacy Information Center (EPIC)](https://epic.org/about/) utilizes public interest litigation and rigorous research to highlight emerging privacy threats, focusing on holding the government and commercial sectors to account for data misuse. 
- The [International Digital Accountability Council (IDAC)](https://digitalwatchdog.org/) monitors the mobile app ecosystem, conducting technical investigations to ensure platforms and developers are adhering to their stated privacy promises. 
- [Mozilla Foundation](https://www.mozillafoundation.org/en/) audits consumer technology through its [\*Privacy Not Included](https://www.mozillafoundation.org/en/privacynotincluded/) consumer guides. 
- The Vienna-based NGO [noyb](https://noyb.eu/en) works to enforce European data laws, like the GDPR and the ePrivacy Directive, by filing strategic legal complaints against companies that fail to obtain valid user consent.  
- [Open Rights Group (ORG)](https://www.openrightsgroup.org/what-we-do/) is a UK-based organization that campaigns against mass surveillance and for the protection of free expression online, pushing for legislative reforms that put users back in control of their data. 
- [Privacy International](https://privacyinternational.org/) is a global organization that investigates how governments and corporations use surveillance technology and advocates for stronger legal protections. 
- The [Security Lab at Amnesty International](https://securitylab.amnesty.org/) conducts forensic investigations to expose state-sponsored spyware and digital attacks used against activists, journalists, and human rights defenders. 
- [World Privacy Forum](https://worldprivacyforum.org/) is a research-focused group that analyzes data practices and educates policymakers and consumers. 

intergovernmental-organizations:
Heading:Intergovernmental organizations
The [UN Special Rapporteur on the right to privacy](https://www.ohchr.org/en/special-procedures/sr-privacy) is an independent expert mandated to monitor, investigate, and report on privacy violations worldwide while advising governments on aligning their laws with international human rights standards.

media-outlets:
Heading:Media outlets 
The following are examples of media watchdogs in digital privacy: 
- [*404 Media*](https://www.404media.co/) is a reporter-owned investigative site that provides on-the-ground reporting on the tools used by data brokers, police, and hackers to bypass privacy protections and exploit user data. 
- [*IAPP News*](https://iapp.org/news?size=n_16_n) is the editorial arm of the International Association of Privacy Professionals. IAPP News acts as a specialized monitor that tracks global regulatory enforcement, legislative shifts, and industry compliance. 
- [*The Markup*](https://themarkup.org/) is a non-profit newsroom that uses transparent, data-driven investigative journalism to audit how powerful institutions use technology. The Markup’s slogan is “challenging technology for the public good.” 
-  [*WIRED*](https://www.wired.com/tag/privacy/) is a leading global publication and mainstream watchdog that provides deep-dive reporting and cultural analysis on technology and the risks of the digital age.

independent-journalists:
Heading:Independent journalists 

- [Julia Angwin](https://juliaangwin.com), co-founder of [*The Markup*](https://themarkup.org/) and founder of [*Proof News*](https://www.proofnews.org), is known as a pioneer in algorithmic auditing and has developed forensic tools to expose how companies track users across the web. 
- [Joseph Cox](https://www.404media.co/author/joseph-cox/), co-founder of [*404 Media*](https://www.404media.co/), tracks the ‘gray market’ of location data and exposes how data brokers sell sensitive user info to law enforcement and government agencies. 
- Troy Hunt is a software developer, [blogger](https://www.troyhunt.com), [Microsoft Regional Director](https://mvp.microsoft.com/en-US/RD/profile/cfba70c0-3c9a-e411-93f2-9cb65495d3c4), and creator of [*Have I Been Pwned*](https://haveibeenpwned.com/), a service that aggregates data breaches and helps people establish if they’ve been impacted. 
- Brian Krebs, author of the blog [*Krebs on Security*](https://krebsonsecurity.com/), is a veteran investigator most famous for breaking news on massive retail data breaches. 
- [Casey Newton](https://en.wikipedia.org/wiki/Casey_Newton), publisher of the newsletter [*Platformer*](https://www.platformer.news), is an influential analyst who focuses on executive leadership at major social media companies. 
- [Zach Whittaker](https://zackwhittaker.com), a cybersecurity reporter and author of the newsletter [*this week in security*](https://this.weekinsecurity.com/), is known for finding unsecured databases and compelling companies to secure them before they are exploited. 
- [Kim Zetter](https://en.wikipedia.org/wiki/Kim_Zetter) is a forensic investigative reporter who breaks stories on the intersection of cybersecurity and national security.

we-have-not-even:
Heading:we have not even read them 
As an April Fools’ Day joke, UK videogame retailer Gamestation changed its terms and conditions so that “all of the 7500 people who bought from Gamestation online on 1 April 2010 effectively consented to the sale of their immortal souls.”[^39] See coverage from law firm [Pinsent Masons](https://www.pinsentmasons.com/out-law/news/nobody-reads-terms-and-conditions-its-official) for more.

harms-are-distant:
Heading:Harms are distant 
This issue of people’s inability to accurately estimate the long-term risks of data sharing is sometimes called privacy myopia.[^41] 

cannot-be-anticipated:
Heading:cannot be anticipated 
For example, data we once considered de-identified often becomes identifiable because of advances unpredicted at the time of ‘de-identification.’[^42] See the Re-identification primer to learn more.

done-little-harm:
Heading:Big Tech’s bottom line 
Alphabet (parent company of Google), Apple, Meta, and Amazon were fined $7.8 billion in 2025, a sum which, with how much revenue they make, will take them less than a month to pay off. This finding comes from [Proton’s work tracking Big Tech fines](https://proton.me/tech-fines-tracker), a project the group taglines “Big Tech, small consequences.” 

consent-theater:
Heading:Consent theater
“Consent theater” is a variation on the term “security theater,” coined by privacy and computer security specialist Bruce Schneier in his 2003 book *Beyond Fear: Thinking Sensibly About Security in an Uncertain World*. Security theater refers to the practice of implementing toothless security procedures that give the appearance of improved safety. It is commonly used in reference to airport security as operated by the United States Transportation Security Administration (TSA). The term “consent theater” gained traction in 2021 through a [conference paper](https://doi.org/10.1145/3411763.3451230) by a team from the CISPA Helmholtz Center for Information Security and a [blog post](https://onezero.medium.com/consent-theater-a32b98cd8d96) by author and activist Cory Doctorow.

privacy-nihilism:
Heading:Privacy nihilism
Professor Ian Bogost explores the topic in his article “[Welcome to the Age of Privacy Nihilism](https://www.theatlantic.com/technology/archive/2018/08/the-age-of-privacy-nihilism-is-here/568198/)” published in *The Atlantic* in 2018.

powerless-to-control:
Heading:Powerless to control their data 
In [this article](https://www.consumerreports.org/electronics/personal-information/i-tried-to-get-my-name-off-peoplesearch-sites-it-was-nearly-a0741114794/) for *Consumer Reports*, Mara Hvistendahl describes the “herculean task” of trying to remove herself from data broker and people-search sites.

signing-away:
Heading:Signing away privacy rights in exchange for welfare 
For further reading on intersection between privacy and socioeconomic status, check out these resources: 
- “[Building Digital Benefits That Protect Privacy for All](https://www.georgetownpoverty.org/issues/building-digital-benefits-that-protect-privacy/)” (2025) – Georgetown Law Center on Poverty and Inequality blog post by affiliated scholar Jae June Lee 
- “[The Class Differential in Privacy Law](https://brooklynworks.brooklaw.edu/cgi/viewcontent.cgi?article=1140&context=blr)” (2012) – *Brooklyn Law Review* article by Michele Estrin Gilman, Venerable Professor of Law at the University of Baltimore 
- [*The Poverty of Privacy Rights*](https://www.sup.org/books/law/poverty-privacy-rights) (2017) – book by Khiara M. Bridges, Professor of Law and Anthropology at Boston University

submitting-workplace:
Heading:Submitting to workplace surveillance for fear of losing one’s job 
The 2021 report “[The Constant Boss: Work Under Digital Surveillance](https://datasociety.net/wp-content/uploads/2021/05/The_Constant_Boss.pdf)” by Aiha Nguyen, director of *Data & Society’s* Labor Futures Program, examines the consent-related issues with workplace surveillance, particularly of low-wage and hourly workers. 

A member of United for Respect, representative of the retail worker advocacy group, told Aiha Nguyen that Walmart managers asked employees to download an app on their personal devices to check inventory and scan misshelved items, neglecting to mention that the app requires camera access and location services, which are constantly active by default.[^47]

smart-home-devices:
Heading:Smart home devices 
The articles “[Smart Locks Endanger Tenants’ Privacy and Should Be Regulated](https://www.eff.org/deeplinks/2023/04/smart-locks-endanger-tenants-privacy-and-should-be-regulated)” by Mario Trujillo and Adam Schwartz of the Electronic Frontier Foundation (EFF) and “[In smart apartments, is tenants’ privacy for rent?](https://www.bostonglobe.com/2020/02/11/business/smart-apartments-is-tenants-privacy-rent/)” by [Hiawatha Bray](https://www.bostonglobe.com/about/staff-list/staff/hiawatha-bray/?p1=Article_Byline) of the *Boston Globe* dive into this issue.

genetic-testing:
Heading:Genetic testing 
Widely available DNA testing, including through direct-to-consumer services like 23andMe, raises challenging questions about individual and group privacy. If you are interested in exploring this topic, Martin Gomberg’s IAPP opinion piece (“[Privacy laws, ethics and the conundrum of DNA](https://iapp.org/news/a/privacy-laws-ethics-and-the-conundrum-of-dna-2)”) and Ethan Magistro’s *Princeton Legal Journal Forum* article (“[It’s Not Just Me, It’s Also You: How Shared DNA Complicates Consent](https://legaljournal.princeton.edu/wp-content/uploads/sites/826/2024/04/1-Prin.L.J.F.-19.pdf)”) are good starting points. 


social-media-ecosystems:
Heading:Social media ecosystems 
“In a digital age, individual consent is flawed and ineffectual when protected class data and social profiles can be easily inferred via our social networks,” writes complex systems researcher Juniper Lovato.[^49]  

[A 2010 study](https://doi.org/10.1145/1718487.1718519) of college students’ Facebook profiles found that “multiple attributes can be inferred globally when as few as 20% of the users reveal their attribute information.”[^50] More recently, [a 2019 study](%20https://doi.org/10.1038/s41562-018-0510-5) out of the University of Vermont concluded “that 95% of the potential predictive accuracy for an individual is achievable using their social ties only, without requiring that individual’s data.”[^51] 

Facebook has consistently taken advantage of consent by association. In the infamous Cambridge Analytica incident, “users took surveys that captured their data and, if they had not adjusted their privacy settings, data from users’ friends and contacts.”[^52] Around the same time, the phenomenon of Facebook **shadow profiles** gained attention. The *Vox* article “[Facebook collects data on you even if you don’t have an account](https://www.vox.com/2018/4/20/17254312/facebook-shadow-profiles-data-collection-non-users-mark-zuckerberg)” explains how and why Facebook engages in the practice. 

human-subjects:
Heading:Human subjects research 
**Positive externalities** in human subjects research (i.e., spillover effects through which we learn about individuals or groups beyond the study population) are nothing new. In many cases, the whole point of the research endeavor is learning about people beyond those who consented to be studied. The problem identified by scholars like A. Michael Froomkin is that, in the era of **Big Data** and advanced **algorithmic learning**, “data derived from a large population can in some circumstances generate particularized predictions about small populations, or even individuals, outside the study group.”[^53] This has been referred to as the ‘**tyranny of the minority**,’ explained by Solon Barocas and Helen Nissenbaum as a situation in which “the volunteered information of the few can unlock the same information about the many.”[^54] 

To learn more, check out the article “[Predictive privacy: Collective data protection in the context of artificial intelligence and big data](https://doi.org/10.1177/20539517231166886)” by Rainer Mühlhoff.  

The Spanish Data Protection Agency (AEPD) offers a helpful [primer](https://www.aepd.es/en/prensa-y-comunicacion/blog/group-privacy) on the concept of **group privacy**. 

may-not-be-aware:
Heading:May not be aware 
Back in 2013, Ewa Luger and Tom Rodden described living in an “era of ubiquity” when it came to **smart environments**. Like other researchers, they were concerned with data captured “below the line of user visibility.”[^55] This is highly relevant when considering **Internet of Things (IoT) devices**, physical objects equipped to sense and share information across networks. No version of consent—explicit, tacit, or implicit—is valid if people are unaware they are being tracked. 

The Office of the Victorian Information Commissioner (OVIC) in Australia has a helpful primer called “[Internet of Things and Privacy – Issues and Challenges](https://ovic.vic.gov.au/privacy/resources-for-organisations/internet-of-things-and-privacy-issues-and-challenges/).” Another useful reference may be the Data & Society Research Institute’s [comments](https://datasociety.net/pubs/dcr/Data&Society_NTIA-comments_May2015.pdf) to the US National Telecommunication and Information Administration (NTIA) on cybersecurity in the digital ecosystem.

children:
Heading:Children 
Meaningful consent requires the consenter to have the appropriate cognitive capacity to engage in the decision-making process. Therefore, children categorically cannot provide valid consent. However, in practice, “whether legally or illegally, it has been trivially easy to circumvent the consent of **legally incapacitated** minors in ways that have led to serious financial and even physical harm.”[^56] 

To learn more, check out the [resources](https://epic.org/issues/data-protection/childrens-privacy/) the Electronic Privacy Information Center (EPIC) provides on children’s privacy. 

Individuals, including family members, frequently violate children’s consent by posting content of and about them online. The article “[Influencer Parents and The Kids Who Had Their Childhood Made Into Content](https://www.teenvogue.com/story/influencer-parents-children-social-media-impact)” highlights some examples.


human expertise:
Heading:Human expertise 
For example, [Terms of Service; Didn’t Read (ToS;DR)](https://tosdr.org/en/), founded by attorney Hugo Roy, programmer Michiel de Jong, and web designer Jan-Christoph Borchardt in 2012, is a community project that grades the privacy practices of major websites, apps, and services.

artificial-intelligence:
Heading:Artificial intelligence (AI) For example, the [webXray Privacy Search Engine](https://webxray.ai/) uses proprietary machine learning models to support legal and compliance professionals in identifying and addressing privacy violations.

automate-aspects:
Heading:Automate aspects of the consent process 
The [Usable Privacy Policy Project](https://usableprivacy.org) and the [Personalized Privacy Assistant Project](https://privacyassistant.org) are two initiatives that have attempted to semi-automate digital consent. Back in 2018, the Usable Privacy Policy Project was able to match 80% of users to a “privacy profile” that aligned with their actual privacy choices; just 6% of users changed their settings from what the automated tool selected for them.[^59] The Personalized Privacy Assistant Project involves multiple research areas including applications for the **Internet of Things (IoT)**, modeling privacy preferences, and transparency for **Big Data**.

secondary-data-use:
Heading:Secondary data use 
Secondary data use refers to the re-analysis of existing data that was originally collected for another purpose. Classically, consent to secondary use has taken the form of either blanket consent (consent to any and all future uses of data) or broad consent (consent to all future uses of data within certain limits, e.g., for studies of a certain health condition).[^60]

ordering-those-options:
Heading:Ordering those options by risk and sensitivity 
For an example of how tiered consent might be implemented, see the journal article “[A tiered-layered-staged model for informed consent in personal genome testing](https://www.nature.com/articles/ejhg2012237)” by Bunnik et al. (2012). 

consent-requests:
Heading:consent requests for future uses
For an example of how meta-consent might be implemented, see the journal article “[Eliciting meta consent for future secondary research use of health data using a smartphone application \- a proof of concept study in the Danish population](https://doi.org/10.1186/s12910-017-0209-6)” by Ploug & Holm (2017).

dynamic-consent:
Heading:Dynamic consent 
[Kaye et al. (2015)](https://www.nature.com/articles/ejhg201471) and [Budin-Ljøsne et al. (2017)](https://link.springer.com/article/10.1186/s12910-016-0162-9) are good overviews of dynamic consent as a theory and project. [Steinsbekk et al. (2013)](https://www.nature.com/articles/ejhg2012282) refutes its characterization as an improvement on broad consent (consent to all future uses of data within certain limits, e.g., for studies of a certain health condition).

communicate-investigators:
Heading:Communicate with investigators in real time 
Enabling two-way communication between subjects and investigators is a step towards reducing the power disparities that have historically existed between these groups. Coupled with greater bargaining power for potential participants, two-way communication could make the digital consent process less like an ultimatum and more like a negotiation. This is consistent with **collaborative consent** as described by Paul Bernal.[^64]

assess-participant:
Heading:assess participant comprehension 
The National Institutes of Health (NIH) [All of Us Research Program](https://allofus.nih.gov) implements this kind of competency check in an attempt to ensure individuals consenting to contribute data have the cognitive capacity to make an informed and engaged decision. Check out [All of Us’ description](https://allofus.nih.gov/article/all-us-consent-process) of their consent process or [this assessment](https://pubmed.ncbi.nlm.nih.gov/33275082/) published in the journal *AJOB Empirical Bioethics* to learn more.

distributed-consent:
Heading:Distributed consent
For a more in-depth explanation of distributed consent, read “[Limits of Individual Consent and Models of Distributed Consent in Online Social Networks](https://dl.acm.org/doi/10.1145/3531146.3534640)” by Lovato et al. (2022). Using a decentralized model uncharacteristic of other platforms, the social network [Mastodon](https://docs.joinmastodon.org) implements some of the principles discussed by Lovato and colleagues.

consent-receipts:
Heading:consent receipts 
To learn more, check out the article “[Consent Receipts for a Usable and Auditable Web of Personal Data](https://ieeexplore.ieee.org/document/9730898)” by Vitor Jesus and Harshvarhan J. Pandit. As a member of the [W3C Data Privacy Vocabularies and Controls Community Group](https://www.w3.org/groups/cg/dpvcg/), Pandit is a leading contributor to [technical guidance](https://w3c.github.io/dpv/guides/consent-27560) on the implementation of this technology.

binary-governance:
Heading:Binary governance Legal scholar Margot Kaminski is credited with coining the term binary governance. See her article “[Binary Governance: Lessons from the GDPR’s Approach to Algorithmic Accountability](https://scholar.law.colorado.edu/cgi/viewcontent.cgi?article=2374&context=faculty-articles)” (2019) for more. 

risk-assessments:
Heading:Risk assessments 
Learn more about the **data protection impact assessments (DPIA)** required for high-risk processing under article 35 of the GDPR [here](https://gdpr.eu/data-protection-impact-assessment-template/). |

fiduciary-duty:
Heading:Fiduciary duty
The idea of data fiduciaries is explored in the article “[Data Controllers as Data Fiduciaries: Theory, Definitions & Burdens of Proof](https://scholar.law.colorado.edu/lawreview/vol95/iss1/4/)” (2024) by Noelle Wilson and Amanda Reid of the University of North Carolina Center for Information, Technology, and Public Life.


while-analysis:
Heading:While still allowing for useful statistical analysis 
Economists Ian M. Schmutte and Lars Vilhuber provide an overview of balancing privacy and usability in their [chapter](https://admindatahandbook.mit.edu/book/v1.1/discavoid.html) of the *Handbook on Using Administrative Data for Research and Evidence-based Policy* published by the Massachusetts Institute of Technology. The work of the [United State Census Bureau](https://www.census.gov/about/policies/privacy/statistical_safeguards.html) is an excellent case study of how SDL techniques are applied to protect individual identities while still delivering valuable demographic insights. 

Coarsening:
Heading: Coarsening
For example, shifting the scale of analysis from a census tract to a larger geographic area such as a county or state makes it more difficult to identify someone based on details like their month and day of birth. It is common to **top code** or **bottom code** entries beyond a certain threshold into a single category (e.g., ‘90 years or older’) when values on one or both extremes are rare.[^71]  

One way to formalize such indistinguishability is **k-anonymity**, which requires that the values of each individual record released match at least *k*−1 other records from the batch. To learn more about k-anonymity, check out Latanya Sweeney’s paper “[Achieving K-Anonymity Privacy Protection Using Generalization and Suppression](https://doi.org/10.1142/s021848850200165x)” (2002). 

data-swapping:
Heading: Data swapping 
To learn more about data swapping, see [Dalenius & Reiss (1982)](https://doi.org/10.1016/0378-3758\(82\)90058-1) and [Fienberg & McIntyre (2005)](https://www.scb.se/contentassets/ca21efb41fee47d293bbee5bf7be7fb3/data-swapping-variations-on-a-theme-by-dalenius-and-reiss.pdf).

synthetic-data:
Heading: Synthetic data 
For further reading on synthetic data, see the explainer “[Synthetic Data \- what, why and how?](https://royalsociety.org/-/media/policy/projects/privacy-enhancing-technologies/Synthetic_Data_Survey-24.pdf)” by scholars of the Alan Turing Institute (the United Kingdom’s national institute for data science) or the post “[When what is old is new again – The reality of synthetic data](https://www.priv.gc.ca/en/blog/20221012)” published on the Office of the Privacy Commissioner of Canada’s *Privacy Tech-Know* blog.

choice-architecture:
Heading:Choice architecture 
See the [‘Consent in Practice’](#consent-in-practice) section for more background on behavioral economics, choice architecture, nudges, and dark patterns. Alessandro Acquisti is a leading scholar on the digital privacy applications of behavioral economics. His articles “[Nudging Privacy: The Behavioral Economics of Personal Information](https://doi.org/10.1109/MSP.2009.163)” (2009) and “[Nudges for Privacy and Security: Understanding and Assisting Users’ Choices Online](https://doi.org/10.1145/3054926)” (2017) are recommended reading on the topic. 

incorporating-personalized:
Heading:Incorporating personalized scenarios into permissions dialogues 
Marian Harbach and colleagues from the Usable Security and Privacy Lab at Leibniz University Hannover found that people made more privacy-conscious choices when presented with a Google Play Store permissions dialogue that told users in text that the app could see and delete their photos and showed a random selection of images from the user’s camera roll to illustrate this point. For the full details of their experiment, see their paper “[Using Personal Examples to Improve Risk Communication for Security and Privacy Decisions](http://dx.doi.org/10.1145/2556288.2556978)” (2014).

tradeoffs:
Heading:Tradeoffs 
(The Privacy Tradeoffs)[/privacy/tradeoffs] primer explores in depth the issue of balancing privacy against other goods.

sci-and-med:
Heading:scientific and medical progress 
Some scientists believe data sharing for research purposes should be non-optional since advancing human health is in the public interest, and they propose strong anti-discrimination laws to safeguard individuals’ privacy.[^76] One issue such a proposal addresses is **consent bias**, a hindrance to generalizability which occurs because people who consent to participate in studies are almost always systematically different from those who do not consent to participate.[^77] These ideas are explored in the *New York Times* article “[Balancing Privacy With Data Sharing for the Public Good](https://www.nytimes.com/2021/02/19/business/privacy-open-data-public.html)” by Harvard economist David Deming.

contextual-integrity:
Heading:Contextual integrity 
For an overview of contextual integrity, watch and/or read Voices of VR’s “[Primer on the Contextual Integrity Theory of Privacy with Philosopher Helen Nissenbaum](https://voicesofvr.com/998-primer-on-the-contextual-integrity-theory-of-privacy-with-philosopher-helen-nissenbaum/)”.  

Information flow control (IFC) models are one way of operationalizing the tenets of contextual integrity, and some cybersecurity researchers are working on systems that enable more nuanced control. The 2024 paper “[Sesame: Practical End-to-End Privacy Compliance with Policy Containers and Privacy Regions](https://doi.org/10.1145/3694715.3695984)” from Brown’s Efficient and Trustworthy Operating Systems (ETOS) Group is an example of such work. 