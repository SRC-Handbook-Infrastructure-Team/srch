---
title: Algorithmic Fairness
order: 1
final: false
---

# Algorithmic Fairness

When machines replace humans in **{making-high-impact-decision}**, it is important for their outcomes to remain fair. But what is algorithmic fairness?

## Definitions of Fairness

One common criterion for fairness within the CS community is procedural equality.

- **Procedural Equality**: Everyone is subject to the same decision-making process. For example, ATS, or applicant tracking systems, are automated decision-making systems that employers use to screen resumes in hiring processes. Procedural equality is achieved when the system runs every application in the same way.

However, decision-making does not happen in a vacuum. Rather, it exists within a societal context defined by **{Systems-of-Oppression}**, such as racism and sexism, that form an unequal baseline ‘procedurally fair’ algorithm that falsely assumes that every applicant starts from the same point and, as a result, can replicate pre-existing inequalities.

The limitations of procedural equality lead us to the concept of **{equity}**.

- **Equity**: Everyone is subject to a process that recognizes differences in opportunities and allocates outcomes accordingly.

Within equity, there is a technical distinction between individual and group fairness.

- **Individual Fairness**: Individuals who are similar (with respect to some task) should be treated similarly (with respect to that task).

An example of individual fairness would be in a resume screening system, individuals who have similar qualifications, including equivalent degrees, experience, and technical skills, should be ranked similarly.

- **Group Fairness**: Groups should be viewed as similar and be treated similarly, acknowledging that historically groups might have been treated differently and thus have different opportunities. Here are **{three-criteria-for-group-fairness}**:
  - **Independence**: A person’s group membership should not affect their outcome.
  - **Separation**: An individual’s group should not impact their outcomes depending on the “true outcome.”
  - **Sufficiency**: The output predictor means the same thing regardless of which group an individual is from.

## Beyond Definitions

All the fairness criteria above seem desirable. However, it is mathematically impossible to achieve both individual and group fairness. Within group fairness, it is also mathematically impossible to simultaneously achieve independence, separation, and sufficiency.

The **{mathematical-impossible-results}** generally follow this pattern: (a) construct a particular data distribution, and (b) demonstrate that any method that satisfies one form of fairness cannot satisfy another simultaneously. Thus , there exists a range of **{implementations}** that either prioritize certain fairness criteria over others or try to fulfill multiple criteria with minor violations and contextual adjustments.

![Pareto Front of Group Fairness Criteria](/srch-s25/assets/primer-photos/fairness1.png)

![Parallel Coordinates Plot of Group Fairness Criteria](/srch-s25/assets/primer-photos/fairness2.png)

A notable insight is that the data distributions capture _different beliefs_ about how skills are distributed in different populations. Therefore, the choice of an appropriate fairness measure relies on normative claims about the world in which the measure is applied.

While the selection of fairness criteria involves inevitable trade-offs, the ultimate decision is not purely mathematical but also political, since it decides who benefits and who suffers.

In fact, focusing solely on mathematically “fair” metrics can narrow our attention to isolated decision points, disconnected from broader social and political contexts in which these systems operate. This tendency leads us to conversations about **[nav:justice in automated decision-making](automatedDecisionMaking/justice)**.

## References

Bell, Andrew, Lucius Bynum, Nazarii Drushchak, Tetiana Zakharchenko, Lucas Rosenblatt, and Julia Stoyanovich. “The Possibility of Fairness: Revisiting the Impossibility Theorem in Practice.” In 2023 ACM Conference on Fairness, Accountability, and Transparency, 400–422. Chicago IL USA: ACM, 2023. https://doi.org/10.1145/3593013.3594007.

Chen, Zhisheng. “Ethics and Discrimination in Artificial Intelligence-Enabled Recruitment Practices.” Humanities and Social Sciences Communications 10, no. 1 (September 13, 2023): 1–12. https://doi.org/10.1057/s41599-023-02079-x.

Chouldechova, Alexandra. “Fair Prediction with Disparate Impact: A Study of Bias in Recidivism Prediction Instruments.” arXiv, February 28, 2017. https://doi.org/10.48550/arXiv.1703.00056.

Corbett-Davies, Sam, Emma Pierson, Avi Feller, Sharad Goel, and Aziz Huq. “Algorithmic Decision Making and the Cost of Fairness,” June 10, 2017. https://doi.org/10.1145/3097983.309809.

“Fairness and Machine Learning.” Accessed April 13, 2025. https://fairmlbook.org/.

“Fairness and Risk: An Ethical Argument for a Group Fairness Definition Insurers Can Use | Philosophy & Technology.” Accessed April 13, 2025. https://link.springer.com/article/10.1007/s13347-023-00624-9.

Friedler, Sorelle A., Carlos Scheidegger, and Suresh Venkatasubramanian. “The (Im)Possibility of Fairness: Different Value Systems Require Different Mechanisms for Fair Decision Making.” Commun. ACM 64, no. 4 (March 22, 2021): 136–43. https://doi.org/10.1145/3433949.

Garcia, Ana Cristina Bicharra, Marcio Gomes Pinto Garcia, and Roberto Rigobon. “Algorithmic Discrimination in the Credit Domain: What Do We Know about It?” AI & SOCIETY 39, no. 4 (August 1, 2024): 2059–98. https://doi.org/10.1007/s00146-023-01676-3.

Green, Ben. “Escaping the Impossibility of Fairness: From Formal to Substantive Algorithmic Fairness.” Philosophy & Technology 35, no. 4 (October 8, 2022): 90. https://doi.org/10.1007/s13347-022-00584-6.

Hsu, Brian, Rahul Mazumder, Preetam Nandy, and Kinjal Basu. “Pushing the Limits of Fairness Impossibility: Who’s the Fairest of Them All?,” n.d.

Khader, Serene J. “Why Is Oppression Wrong?” Philosophical Studies 181, no. 4 (April 1, 2024): 649–69. https://doi.org/10.1007/s11098-023-02084-5.

Kim, Joon Sik, Jiahao Chen, and Ameet Talwalkar. “FACT: A Diagnostic for Group Fairness Trade-Offs.” arXiv, July 7, 2020. https://doi.org/10.48550/arXiv.2004.03424.

Kleinberg, Jon, Sendhil Mullainathan, and Manish Raghavan. “Inherent Trade-Offs in the Fair Determination of Risk Scores.” arXiv, November 17, 2016. https://doi.org/10.48550/arXiv.1609.05807.

Minow, Martha. “EQUALITY VS. EQUITY.” American Journal of Law and Equality 1 (September 1, 2021): 167–93. https://doi.org/10.1162/ajle_a_00019.

Qin, Shaojun (Marco), Jia ,Nan, Luo ,Xueming, Liao ,Chengcheng, and Ziyao and Huang. “Perceived Fairness of Human Managers Compared with Artificial Intelligence in Employee Performance Evaluation.” Journal of Management Information Systems 40, no. 4 (October 2, 2023): 1039–70. https://doi.org/10.1080/07421222.2023.2267316.

Rosen, Eva, and Philip Garboden. “Algorithms and Racial Discrimination in the US Housing Market.” In Artificial Intelligence and the City. Routledge, 2023.

Saxena, Devansh, Karla Badillo-Urquiola, Pamela J. Wisniewski, and Shion Guha. “A Human-Centered Review of Algorithms Used within the U.S. Child Welfare System.” In Proceedings of the 2020 CHI Conference on Human Factors in Computing Systems, 1–15. CHI ’20. New York, NY, USA: Association for Computing Machinery, 2020. https://doi.org/10.1145/3313831.3376229.

School, Stanford Law. “How Will AI Impact Racial Disparities in Education?” Stanford Law School, June 29, 2024. https://law.stanford.edu/2024/06/29/how-will-ai-impact-racial-disparities-in-education/.

Ueda, Daiju, Taichi Kakinuma, Shohei Fujita, Koji Kamagata, Yasutaka Fushimi, Rintaro Ito, Yusuke Matsui, et al. “Fairness of Artificial Intelligence in Healthcare: Review and Recommendations.” Japanese Journal of Radiology 42, no. 1 (2024): 3–15. https://doi.org/10.1007/s11604-023-01474-3.

Zhu, Linna, Michael Neal, and Caitlin Young. “Racial Disparities in Automated Valuation Models: New Evidence Using Property Condition and Machine Learning,” n.d.

## All Sidebar Content Below

Systems-of-Oppression:
Examples of systems of oppression include: racism, sexism, classism, ableism, ageism, homophobia, transphobia, xenophobia. 

- [Social Identities and Systems of Oppression | National Museum of African American History and Culture](https://nmaahc.si.edu/learn/talking-about-race/topics/social-identities-and-systems-oppression)
- [Why Is Oppression Wrong? | Philosophical Studies](https://link.springer.com/article/10.1007/s11098-023-02084-5#Sec2)
- Brown’s [Race, Power, and Privilege courses](https://college.brown.edu/design-your-education/explore-open-curriculum/course-selection/curricular-programs/examining-race) dive deeper into examining “structural inequality, racial formations and/or disparities and systems of power within a complex, pluralistic world.”

making-high-impact-decision:
Heading: Examples of High-Impact Applications:
- [Resume Screening](https://www.nature.com/articles/s41599-023-02079-x)
- [Performance Assessment](https://www.tandfonline.com/doi/full/10.1080/07421222.2023.2267316)
- [Tenant Screening](https://www.taylorfrancis.com/chapters/edit/10.4324/9781003365877-24/algorithms-racial-discrimination-us-housing-market-eva-rosen-philip-garboden)
- [Property Appraisal](https://www.huduser.gov/portal/periodicals/cityscape/vol26num1/ch15.pdf)
- [Credit Scoring](https://link.springer.com/article/10.1007/s00146-023-01676-3)
- [Clinical Care](https://pmc.ncbi.nlm.nih.gov/articles/PMC10764412/)
- [Child Welfare](https://dl.acm.org/doi/abs/10.1145/3313831.3376229?)
- [Pretrial Risk Assessment](https://www.innovatingjustice.org/wp-content/uploads/2019/07/Beyond_The_Algorithm.pdf)
- [Educational Performance](https://law.stanford.edu/2024/06/29/how-will-ai-impact-racial-disparities-in-education/)

equity:
Heading: Definitions of Equity
For a deeper dive into equality vs. equity:
[Minow: Equality vs. Equity](https://direct.mit.edu/ajle/article/doi/10.1162/ajle_a_00019/107229/EQUALITY-VS-EQUITY)

three-criteria-for-group-fairness:
Heading: Three Criteria for Group Fairness
Let G be a variable denoting the group, Y a variable denoting the label for the training data (“true outcome”), and R the output of the procedure: 

##### Independence

<u>Formal Definition</u> R and G are independent, i.e. RG and P(R | G)=P(R) 

<u>Example</u> An individual’s gender should not affect their likelihood of being screened in for hiring. Notably, this measures the group-level statistical independence between group membership and outcome. It thus differs from individual fairness, which examines fairness on an instance level. 

##### Separation

<u>Formal Definition</u> R and G are independent, conditioned on Y, i.e. RG | Y and P(R | Y, G)=P(R | Y) 

<u>Example</u> Applicants who are capable of succeeding in a job should be equally likely to be screened out (resulting in a false negative outcome) in the hiring process irrespective of their gender.

##### Sufficiency
<u>Formal Definition</u>n Y and G are independent, conditioned on R, i.e. YG | R and P(Y | R, G)=P(Y | R) 
<u>Example</u> A female applicant receiving a “7” should be equally capable of succeeding in a job as a male candidate with the same score. 

To learn more about technical definitions of fairness, see [Fairness and Machine Learning](https://fairmlbook.org/)

mathematical-impossible-results:
Heading: Papers Explaining the Impossibility of Fairness

##### Theory-focused
- *[The (Im)possibility of fairness: different value systems require different mechanisms for fair decision-making](http://dx.doi.org/10.1145/3433949)*: The impossibility of achieving all fairness criteria in one case; mechanisms must align with specific values
- *[FACT Diagnostic: How to Better Understand Trade-offs Involving Group Fairness](https://arxiv.org/pdf/2004.03424)*: A framework to analyze trade-offs between fairness metrics

##### Case-study-focused
- *[Inherent Trade-Offs in the Fair Determination of Risk Scores](https://arxiv.org/pdf/1609.05807)*: Proves automated risk score calculation cannot satisfy multiple fairness criteria at once
- *[Fair prediction with disparate impact](https://arxiv.org/pdf/1703.00056)*: Shows enforcing fairness metrics often reduces accuracy
- *[Algorithmic decision making and the cost of fairness](https://arxiv.org/pdf/1701.08230)*: Quantifies efficiency losses when prioritizing fairness

implementations:
Heading: Papers Addressing the Impossibility of Fairness

##### Choosing One or Multiple Criteria over the Others
- *[Equality of Opportunity in Supervised Learning](https://arxiv.org/pdf/1610.02413)*: Proposes a mechanism that prioritizes separation by equalizing odds across groups in supervised learning
- *[Fairness and Risk: An Ethical Argument for a Group Fairness Definition Insurers Can Use](https://link.springer.com/article/10.1007/s13347-023-00624-9)*: Argued that sufficiency is the most applicable criterion for automated decision making in insurance premiums


##### Escaping the Impossibility of Fairness 
- *[Escaping the Impossibility of Fairness: From Formal to Substantive Algorithmic Fairness](https://link.springer.com/article/10.1007/s13347-022-00584-6)* and *[The Possibility of Fairness: Revisiting the Impossibility Theorem in Practice](https://dl.acm.org/doi/pdf/10.1145/3593013.3594007)*: Escaping the mathematical impossibility of fairness by considering social contexts, practices, and justice implications
- *[Pushing the limits of fairness impossibility: Who’s the fairest of them all?](https://proceedings.neurips.cc/paper_files/paper/2022/file/d3222559698f41247261b7a6c2bbaedc-Paper-Conference.pdf)*: A post-processor that improves fairness across various definitions simultaneously 


