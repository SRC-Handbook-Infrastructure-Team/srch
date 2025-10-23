---
title: What Is Privacy?
order: 1
final: true
---

# What is privacy?

Here we present some of the answers different thinkers and disciplines give to the question, "What is privacy about?" We do not aim to comprehensively survey theories or take sides in the many debates happening around this topic in philosophy, psychology, anthropology, and other disciplines. Rather, we offer several lenses through which to understand privacy and what it delineates. The goal is to get students thinking critically about privacy and its applications to computer science.

## Lens 1: Privacy is about the ability to restrict access to oneself.

Most people colloquially understand privacy as the condition of restricted access. We have privacy when we can close a door, make a friends-only post on social media, or otherwise limit when and where others perceive us. This conception is in line with **access-based approaches**, which cast privacy as about **who has access to an individual and under what conditions**. Having access to an individual could entail having physical proximity to or contact with them, learning information about them, observing them, etc.

### Access as a gateway

Through this lens, privacy functions as [drawer:a gate we can open or close to others](gate). Using the example of a close friends list on social media, we open the access gateway by adding accounts to that list and close the gateway by removing them.

### Anti-informational definitions of privacy

Taken to its logical extreme, the access-based lens suggests that "an individual enjoys perfect privacy when he is completely inaccessible to others" (Gavison 1980, 428). We therefore lose privacy when our information becomes accessible to others. One way to guarantee data's inaccessibility is to never produce it in the first place, leading some to conclude that privacy is best defined as **protection against the creation of information**. While most scholars have moved away from such anti-informational definitions in recent decades, the idea that privacy is fundamentally opposed to information is earning renewed attention following the publication of Lowry Pressly's [_The Right to Oblivion_](https://www.hup.harvard.edu/books/9780674260528) (2024).

## Lens 2: Privacy is about the ability to control the flow of information about oneself.

### Classic control-based approaches

Control-based approaches **consider privacy in terms of how data is not only accessed but also collected, shared, and used**. Through this lens, privacy is more than just an access gateway that we can open or close. Advocates promote a control-based approach to privacy as empowering people to actively govern their privacy **throughout the data lifecycle**, from creation through destruction. In accordance with this principle, the [European Union's GDPR](https://gdpr.eu/what-is-gdpr/) (General Data Protection Regulation) and similar data privacy regulations (e.g., the California Consumer Privacy Act) require that data subjects maintain a high level of control over their personal information for the duration of its existence.

**Figure:** Diagram of the research data lifecycle from the [Longwood Medical Area Research Data Management Working Group](https://datamanagement.hms.harvard.edu) at Harvard Medical School. Detailed accessible version available online [here](https://datamanagement.hms.harvard.edu/plan-design/biomedical-data-lifecycle#).
![The Biomedical Data Lifecycle diagram depicts the core stages of the research lifecycle. The center of the wheel has a grey circle labeled Store & Manage. The layer surrounding this is cut into six segments in this order: Plan &  Design, Collect & Create, Analyze & Collaborate, Evaluate & Archive, Share & Disseminate, and Publish & Reuse. Clockwise guiding arrows are at the edge of each segment, showing that one stage leads into the next. The third layer expands on each topic by listing activities or resources that are involved in each of the seven segments in the other two layers.](/srch-s25/assets/primer-photos/dataLifecycle.png)

Westin defines privacy as "the claim of individuals, groups, or institutions to determine for themselves when, how and to what extent information about them is communicated to others" (1967, 7). Privacy loss is therefore thought of as the loss of control over personal information (Véliz 2024, 75). For example, a [drawer:man-in-the-middle attack](mitm) intercepts communications along what was believed to be a private channel, violating the sender's privacy by undermining their ability to control the flow of information.

Contrary to an access-based perspective, a control-based approach views the possibility of unauthorized access to information as eroding privacy, even if that information is never actually accessed. We might use the metaphor of a diary to think through the difference. Say someone takes your diary, which is full of all your most private thoughts, from your desk drawer, locks it in a safe without reading it, and throws away the key. From an access-based perspective, you have not lost privacy because no one read your diary. From a control-based perspective, you have lost privacy because the diary is no longer in your possession.

### Contextual integrity

In the last decade, Helen Nissenbaum's theory of [drawer:contextual integrity](integrity) has gained traction, especially among computer scientists. Contextual integrity is a theory of privacy developed within the landscape of 21st century computing. Nissenbaum posits that privacy is best understood as the "appropriate flow of personal information" (2010, 127). Appropriate flow of information is defined circumstantially according to five parameters: the data subject, sender, recipient, information type, and transmission principle (e.g., confidentially, with notice, with consent). This conception of privacy allows people to define for themselves the boundaries of acceptable data collection, storage, use, and dissemination. It is therefore flexible and responsive to evolving ethical norms.

## Lens 3: Privacy is about the separation of public and private spheres.

A lens of privacy focused on the separation of public and private spheres is in line with the idea that certain kinds of information are inherently private. Compared to contextual integrity, this view is more rigid in its approach to boundary-setting. Public-private distinctions have long been thought of in spatial terms. The home, for instance, is a private sphere and the town square a public one. However, modern theories under this umbrella are as concerned with the _who_ and _what_ than the _where_.

### Spheres as relational

Some claim that privacy is about **moderating relationships between different entities by allowing disparate access to one's private sphere**. One recent way of representing this idea is a layered model of privacy (sometimes referred to as "the onion model of privacy"). The layered model presents privacy as nested, with personal and bodily intimacy and privacy at the center. The middle layers are personal relationships, and the outer layer is civil society more broadly. Privacy loss, analogous to removing layers and letting others in, makes us vulnerable. Voluntary disclosure can be viewed as "a gesture of trust that, when received with sensitivity and trustworthiness, strengthens relationships" (Véliz 2024, p. 83).

**Figure:** The layered model of privacy depicted with matryoshki (Russian nesting dolls).
![An illustration of three matryoshki (Russian nesting dolls) in descending size from left to right. An arrow pointing to the largest doll is labeled "Civil society (e.g., things shared with the government)." An arrow pointing to the medium-sized doll is labeled "Personal relationships (e.g., things shared with friends)." An arrow pointing to the smallest doll is labeled "Personal & bodily intimacy (e.g., things shared with life partner)."](/srch-s25/assets/primer-photos/layeredModelPrivacy.jpeg)

### Spheres as action-based

Others think of privacy **being inherent to specific types of actions (i.e., the what)** rather than spatial or relational contexts (i.e., the where and with whom). These thinkers believe privacy is about a **private sphere of action** that should be free from external interference. Examples of activities that are commonly understood to fall within the private sphere of action include voting, making medical decisions, and engaging in consensual sexual activity.

This conception of privacy aligns with the "[drawer:constitutionally protected reasonable expectation of privacy](constitution)" established in _Katz v. United States_. Privacy rights in certain spheres are inferred from the Bill of Rights and have historically protected autonomy around "child rearing and education, family relationships, procreation, marriage, contraception, and abortion" (Inness 1992, 64).

### Delineating public and private

Public-private distinctions have been continually re-examined throughout history with the proliferation of new technologies. For instance, [drawer:Warren and Brandeis](warren-brandeis)' efforts in 1890 to define a legal right to privacy were inspired by the evolution of photographic technology, which could broadcast private or semi-private moments in unprecedented ways. Did the public sphere now include anything the camera's lens could capture? Warren and Brandeis said no. This sort of reasoned delineation between public and private is a key aspect of [drawer:developing appropriate privacy protections](protections).

In the 21st century, technology enables [drawer:previously unimaginable intrusions](intrusions) into private spheres. The home has long been considered the locus of privacy, and the integration of computers into home life creates a "porousness" wherein information may leak out.

## Lens 4: Privacy is about plausible deniability.

A somewhat recent development in our thinking on privacy comes from Cynthia Dwork and colleagues in cryptography who have developed techniques to define privacy mathematically. Through this lens, data is private when it functionally cannot be uncovered or linked back to a specific individual, thus preserving a person's ability to plausibly deny a piece of information.

[Canetti, Dwork, Naor, and Ostrovsky (1997)](https://link.springer.com/chapter/10.1007/BFb0052229) introduced the concept of deniable encryption. A **deniable encryption** scheme is one in which a message can be decrypted with the real key to reveal the true message or a fake key to reveal some other text. This allows someone to give the appearance of transparency without actually sacrificing privacy.

[Dwork, McSherry, Nissim, and Smith (2006)](https://link.springer.com/chapter/10.1007/11681878_14#Bib1) describes **differential privacy (DP)**, a [drawer:framework](dp) used for privacy-preserving statistical analysis and machine learning. Differentially private algorithms rely on the careful introduction of statistical noise to obscure identity without meaningfully altering results. The inclusion or non-inclusion of a particular observation has no statistically significant impact on the outcome, so there is no way to prove a certain individual is represented in the data set. On this basis, a person can always plausibly deny contributing data.

#### Figure: Table summarizing four views of privacy.

| Privacy is about…                            | Someone has privacy if…                                                                        |
| -------------------------------------------- | ---------------------------------------------------------------------------------------------- |
| Access restriction                           | Their physical self and information about them is inaccessible to others                       |
| Information flow control                     | They are empowered to control if and how information about them is collected, shared, and used |
| The separation of public and private spheres | Their personal spaces, relationships, and actions are free from interference                   |
| Plausible deniability                        | There is a mathematical guarantee their information or identity is unrecoverable               |

## Privacy from whom?

Privacy is relational and must be understood with respect to a certain person or entity. The importance of the "privacy from whom?" question is well illustrated in this short example:

"Consider the case of a couple having a quiet conversation in their home. While neither spouse has privacy with respect to the other and with regard to their feelings (assuming they are being honest), the couple have privacy with respect to the passersby who cannot hear or see them." (Véliz 2024, 83)

The things we want to keep private and how we want our privacy to be protected naturally vary depending on from whom we desire privacy. [nav:Value of Privacy](privacy/valueOfPrivacy) includes a number of case studies on circumstances in which privacy from certain entities promotes various individual and societal goods.

## References

Alibeigi, Ali, Abu Bakar Munir, and Md Ershadul Karim. "Right to Privacy, a Complicated Concept to Review." _Library Philosophy and Practice (e-Journal)_, January 1, 2019. https://digitalcommons.unl.edu/libphilprac/2841.

Allen, Anita. "Privacy-as-Data Control: Conceptual, Practical, and Moral Limits of the Paradigm." _Connecticut Law Review_ 32 (January 1, 2000): 861–75. https://scholarship.law.upenn.edu/faculty_scholarship/790.

Bhave, Devasheesh P., Laurel H. Teo, and Reeshad S. Dalal. "Privacy at Work: A Review and a Research Agenda for a Contested Terrain." _Journal of Management_ 46, no. 1 (2020): 127–64. https://doi.org/10.1177/0149206319878254.

boyd, danah. "What Is Privacy?" _The Message_ (blog), August 1, 2014. https://medium.com/message/what-is-privacy-5ed72c66aa86.

Bratman, Ben. "Brandeis & Warren's 'The Right to Privacy' and the Birth of the Right to Privacy." _Tennessee Law Review_ 69 (January 1, 2002): 623. https://scholarship.law.pitt.edu/fac_articles/63.

Bye, Kent. "Primer on the Contextual Integrity Theory of Privacy with Philosopher Helen Nissenbaum." _Voices of VR_ (blog), June 24, 2021. https://voicesofvr.com/998-primer-on-the-contextual-integrity-theory-of-privacy-with-philosopher-helen-nissenbaum/.

Canetti, Rein, Cynthia Dwork, Moni Naor, and Rafail Ostrovsky. "Deniable Encryption." In _Advances in Cryptology — CRYPTO '97_, edited by Burton S. Kaliski, 1294:90–104. Berlin, Heidelberg: Springer Berlin Heidelberg, 1997. https://doi.org/10.1007/BFb0052229.

Clark, Andy, and David Chalmers. "The Extended Mind." _Analysis_ 58, no. 1 (January 1998): 7–19. http://www.jstor.org/stable/3328150.

Desfontaines, Damien. "A List of Real-World Uses of Differential Privacy." _Ted Is Writing Things_ (blog), March 22, 2025. https://desfontain.es/blog/real-world-differential-privacy.html.

Dwork, Cynthia, Frank McSherry, Kobbi Nissim, and Adam Smith. "Calibrating Noise to Sensitivity in Private Data Analysis." In _Theory of Cryptography_, edited by Shai Halevi and Tal Rabin, 265–84. Berlin, Heidelberg: Springer, 2006. https://doi.org/10.1007/11681878_14.

Electronic Privacy Information Center. "Differential Privacy." epic.org. Accessed April 12, 2025. https://epic.org/differential-privacy/.

FPC. "Fair Information Practice Principles (FIPPs)." Accessed April 11, 2025. https://www.fpc.gov/resources/fipps/.

Freivogel, William H. "The Right to Be Let Alone." In _The SAGE Guide to Key Issues in Mass Media Ethics and Law_, edited by William H. Freivogel and William A. Babcock, 303–18. 2455 Teller Road, Thousand Oaks California 91320: SAGE Publications, Inc., 2015. https://doi.org/10.4135/9781483346540.n27.

Gavison, Ruth. "Privacy and the Limits of Law." _The Yale Law Journal_ 89, no. 3 (1980): 421–71. https://doi.org/10.2307/795891.

GDPR. "General Data Protection Regulation (GDPR) – Legal Text," May 25, 2018. https://gdpr-info.eu/.

Gellman, Bart, and Ashkan Soltani. "NSA Infiltrates Links to Yahoo, Google Data Centers Worldwide, Snowden Documents Say." _The Wahington Post_, October 30, 2013. https://www.washingtonpost.com/world/national-security/nsa-infiltrates-links-to-yahoo-google-data-centers-worldwide-snowden-documents-say/2013/10/30/e51d661e-4166-11e3-8b74-d89d714ca4dd_story.html.

Harvard University Privacy Tools Project. "Differential Privacy." Accessed April 11, 2025. https://privacytools.seas.harvard.edu/differential-privacy.

Inness, Julie C. _Privacy, Intimacy, and Isolation_. New York: Oxford Univ. Press, 1996. https://doi.org/10.1093/0195104609.001.0001.

Koops, Bert-Jaap, Bryce Newell, Tjerk Timan, Ivan Škorvánek, Tomislav Chokrevski, and Maša Galič. "A Typology of Privacy." _University of Pennsylvania Journal of International Law_ 38, no. 2 (January 1, 2017): 483–575. https://scholarship.law.upenn.edu/jil/vol38/iss2/4.

Lindemulder, Gregg, and Matthew Kosinski. "What Is a Man-in-the-Middle (MITM) Attack?" IBM, June 11, 2024. https://www.ibm.com/think/topics/man-in-the-middle.

LMA Research Data Management Working Group. "Biomedical Data Lifecycle." Harvard Biomedical Data Management, 2024. https://datamanagement.hms.harvard.edu/plan-design/biomedical-data-lifecycle.

Lundgren, Björn. "A Dilemma for Privacy as Control." _The Journal of Ethics_ 24, no. 2 (2020): 165–75. https://doi.org/10.1007/s10892-019-09316-z.

Mulligan, Deirdre K., Colin Koopman, and Nick Doty. "Privacy Is an Essentially Contested Concept: A Multi-Dimensional Analytic for Mapping Privacy." _Philosophical Transactions of the Royal Society A: Mathematical, Physical and Engineering Sciences_ 374, no. 2083 (December 28, 2016). https://doi.org/10.1098/rsta.2016.0118.

Nissenbaum, Helen. _Privacy in Context: Technology, Policy, and the Integrity of Social Life_. Stanford, CA: Stanford University Press, 2010.

Oyez. "Carpenter v. United States." Accessed April 11, 2025. https://www.oyez.org/cases/2017/16-402.

Oyez. "Griswold v. Connecticut." Accessed April 11, 2025. www.oyez.org/cases/1964/496.

Oyez. "Katz v. United States." Accessed April 11, 2025. https://www.oyez.org/cases/1967/35.

Oyez. "Kyllo v. United States." Accessed April 11, 2025. https://www.oyez.org/cases/2000/99-8508.

Oyez. "United States v. Jones." Accessed April 11, 2025. https://www.oyez.org/cases/2011/10-1259.

Oyez. "Van Buren v. United States." Accessed April 11, 2025. https://www.oyez.org/cases/2020/19-783.

Pressly, Lowry. _The Right to Oblivion: Privacy and the Good Life_. 1st ed. Cambridge: Harvard University Press, 2024. https://doi.org/10.2307/jj.16394399.

Roessler, Beate, and Judith DeCew. "Privacy." In _The Stanford Encyclopedia of Philosophy_, edited by Edward N. Zalta and Uri Nodelman, Winter 2023. Metaphysics Research Lab, Stanford University, 2023. https://plato.stanford.edu/archives/win2023/entries/privacy/.

Solove, Daniel J. "A Taxonomy of Privacy." _University of Pennsylvania Law Review_ 154, no. 3 (January 1, 2006): 477. https://doi.org/10.2307/40041279.

Thomson, Judith Jarvis. "The Right to Privacy." _Philosophy & Public Affairs_ 4, no. 4 (1975): 295–314. https://www.jstor.org/stable/2265075.

Véliz, Carissa. "In the Privacy of Our Streets." In _Surveillance, Privacy and Public Space_, edited by Bryce Clayton Newell, Tjerk Timan, and Bert-Jaap Koops, 1st ed., 16–32. Routledge, 2018. https://doi.org/10.4324/9781315200811.

———. _The Ethics of Privacy and Surveillance_. Oxford Philosophical Monographs. Oxford: Oxford University Press, 2024. https://philpapers.org/rec/VLITEO.

Warren, Samuel D., and Louis D. Brandeis. "The Right to Privacy." _Harvard Law Review_ 4, no. 5 (December 15, 1890): 193–220. https://doi.org/10.2307/1321160.

Wheeler, Evan. _Security Risk Management: Building an Information Security Risk Management Program from the Ground Up_. Elsevier Science & Technology Books, 2011. https://doi.org/10.1016/C2010-0-64926-1.
