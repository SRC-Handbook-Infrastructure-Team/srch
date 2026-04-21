---
title: Algorithmic Fairness
order: 2
final: true
lastUpdated: 2026-04-21
---

In cases where machines replace humans in making high-impact decisions, it is important for their outcomes to remain fair. But what does algorithmic fairness actually mean?

In social terms, fairness is an ideal about justice, equality, or due treatment. In computational settings, however, **fairness is also a formalized mathematical concept**. It aims to distill qualitative notions of equity into a quantitative framework. This framing allows for systematic evaluation but also exposes deep conceptual tensions: fairness has no single definition and often looks different across domains, reflecting the social values and constraints embedded in each.

Thus, fairness is also a design decision that encodes subjective choices about what interests to prioritize and trade-offs to accept. These choices are driven by values and context, and results in the field show that different fairness criteria cannot all be satisfied simultaneously—a fundamental impossibility that makes the pursuit of algorithmic fairness as much an ethical and political project as a technical one.

## Foundations of Fairness

To make fairness quantitatively auditable, systems are measured using different statistical metrics and constraints, developed over many years by many researchers. However, while these understandings of fairness bring structure and transparency, they also impose limits on what fairness really expresses. What can be tested mathematically is only a fragment of what fairness means in moral or social terms, and it relies on various assumptions about what data, labels, and decisions the system can represent. Additionally, evaluating fairness only at the model level cannot fully account for disparities in the outcomes when these models are used in the real world to make decisions. Algorithmic fairness cannot fully substitute for social, legal, or institutional equity interventions.

Algorithmic fairness is built on the notion of **comparative fairness**, which defines fairness through consistency of treatment or impact across individuals or groups. On an individual scale, one core idea is “treating like cases alike”: individuals who are similar according to some relevant criteria should receive similar predictions or decisions. For example, in credit card applications, two applicants with comparable credit histories and incomes should have similar approval probabilities. Group fairness definitions extend this comparative logic by enforcing parity conditions across groups rather than individuals.

## Sensitive Attributes and the Proxy Problem

**Sensitive attributes** distinguish the groups whose treatments one wants to assess and potentially correct, e.g., race, gender, or other data points considered personal or private. Many fairness definitions explicitly require knowledge of sensitive attributes, and they are necessary for identifying disparities, measuring fairness across groups, or implementing fairness interventions.

Excluding sensitive attributes appears to help with fair automated-decision making. If our model doesn't receive any information about sensitive attributes, how could it treat groups defined by said attributes unfairly? However, sensitive attributes are often encoded within other variables, an issue known as the **{proxy-problem}**. Even when sensitive attributes are excluded from a model, other variables may act as proxies because they correlate strongly with protected characteristics. Example proxies for sensitive attributes include:

- Zip codes as a proxy for race or income due to residential segregation
- Credit history as a proxy for socioeconomic status
- Linguistic patterns or name features as proxies for ethnicity or national origin
- Education as a proxy for social class or parental background

Because machine learning models are adept at detecting subtle patterns, they can inadvertently reintroduce group distinctions that a fairness intervention was meant to remove. This dynamic illustrates the **“fairness through unawareness” fallacy**, which is the mistaken belief that removing sensitive attributes ensures fairness. In reality, proxy features can perpetuate discrimination, undermining fairness metrics by indirectly encoding sensitive group membership. Effective fairness strategies, therefore, require thoughtful engagement with multifaceted and sensitive data, especially regarding systemic correlations and injustices.

## Individual Fairness:

{Individual-fairness} is centered around the idea that **similar individuals should receive similar predictions.** A core component here is the **similarity metric**: which features count, how they are weighted, and how statistical distance is measured. For example, in automated résumé screening, similarity might be defined using education, experience, and skills. According to a determined similarity metric, candidates with similar degrees, work experience, and skill sets should receive similar scores or hiring decisions.

A strength of individual fairness is that if two people have similar profiles, they will receive similar predictions, which helps prevent arbitrary discrimination on an individual level. However, it also brings trade-offs, primarily the assumption that there is a standard of “similarity” that is both fair and measurable. If the chosen metric reflects biased historical data or is a proxy variable for social disadvantage, individual fairness can legitimize and perpetuate existing structural inequities while still appearing formally fair. Because it only looks at an individual level, it might entrench group disparities for protected groups, placing it in conflict with the ideals of group fairness we’ll discuss below. It can also be computationally costly, making it hard to scale in complex systems with many interacting features.

## Group Fairness:

Group fairness is based on the idea that groups of individuals should be treated similarly, acknowledging differences in historical and structural contexts. There are three key criteria: **independence, separation,** and **sufficiency.** Each offers a different interpretation of fairness and carries different assumptions and limitations.

To illustrate these concepts below, we can imagine an automated loan approval model for Groups A and B, where Group A marks a sensitive attribute and Group B is a baseline group. There are two types of predicted outputs:

- A probability score that reflects how recommended loan approval is for any input, ranging from 0 to 1
- The binary label of approved/not approved, which we can split by scores of \>=0.5 and \<0.5

### Independence

{Independence} requires that **predicted outcomes are statistically independent of sensitive attributes**; in other words, model predictions should not change depending on a person’s sensitive attributes.

Metrics such as **demographic parity** compare positive outcomes across groups, which, in the loan approval example, would be the outcome of getting approved or getting a high score. To satisfy independence, the approval rates should be very similar across groups.

![Bar graph showing independence](/assets/primer-photos/ADM/fairness/independence.png)

In the example above, there is a clear skew of Group A towards lower scores. Group A is less likely to receive a score above the positive threshold of 0.5, and therefore less likely to be approved, which violates independence. If independence were fully upheld, both groups would have equal rates of positive outcomes.

Independence is a helpful tool in looking at predicted outcomes. However, it assumes that differences in outcome rates across groups reflect unfairness, not legitimate disparities in qualifications or risk, which isn’t always the case. Even if Group A is actually less likely to pay off their loans, independence still mandates that they receive equal score distributions to Group B. It also ignores errors in false positive and false negative outcomes, which can significantly impact a model’s performance across groups.

### Separation

{Separation} requires that **predictions are conditionally independent of group membership given the true outcome**. In other words, individuals with the same actual outcome—in this case, whether an applicant is “qualified” according to ground truth data—should receive similar prediction behavior across groups. Truly unqualified people should have similar outcomes, and truly qualified people should as well. This is measured using group-specific outcome rates, including:

|                 | Approved / Scored High    | Not Approved / Scored Low                                         |
| :-------------- | :------------------------ | :---------------------------------------------------------------- |
| **Qualified**   | True Positive Rate (TPR)  | False Negative Rate (FNR): (complement of TPR, equal to 1 \- TPR) |
| **Unqualified** | False Positive Rate (FPR) | True Negative Rate (TPR) (complement of FPR, equal to 1 \- FPR)   |

The primary separation metrics assess parity across true positive rates and false positive rates to determine the difference between various groups, often summarized as an overall **equalized-odds gap**. To satisfy separation, these rates must be consistent across groups.

![Bar graphs showing separation](/assets/primer-photos/ADM/fairness/separation.png)

As depicted above, Group B has a much higher rate of approval among unqualified applicants, suggesting a worse false positive rate. Unqualified Group B applicants were more likely to be approved than similarly unqualified applicants from Group A, which shows a fairness disparity. The score distribution among qualified applicants follows similar patterns, with qualified applicants from Group A less likely to be approved than qualified applicants from Group B, suggesting a disparity in the true positive rate.

Separation discerns predictions across groups given their true outcome, which can be helpful in scenarios where there is correlation between the sensitive characteristic and target variable. However, separation assumes that classification errors should be equally distributed across groups even if base rates (the ground-truth proportion of positive cases in each group) differ, which may conflict with accuracy or sufficiency. It also requires access to a “ground truth” label like the applicant qualifications label above, which may itself embed historical or measurement biases in deciding what exactly “qualified” means.

### Sufficiency

{Sufficiency} requires that the **true outcome is conditionally independent of group membership given the predicted outcome**. In practice, this means that for individuals who receive the same predicted score or label, their probability of the actual outcome should be the same across groups. In other words, a given score must represent the same level of underlying qualification regardless of group membership.

Sufficiency is evaluated using group-wise calibration metrics, including **positive predictive value (PPV)**, which is the proportion of approved or high-scoring applicants who are truly qualified, and **negative predictive value (NPV)**, which is the proportion of denied or low-scoring applicants who are truly unqualified. These are computed separately by group and compared for parity. Perfect sufficiency implies that calibration curves overlap across groups or that PPV and NPV gaps are near zero.

![Bar graphs showing sufficiency](/assets/primer-photos/ADM/fairness/sufficiency.png)

As depicted above, among applicants who were predicted to be approved, Group B exhibits a much higher rate of true qualification than Group A, indicating a disparity in positive predictive value (PPV). In other words, an approval or high score corresponds to a stronger signal of true qualification for Group B than it does for Group A, meaning that identical model predictions do not have the same interpretive meaning across groups. The model therefore fails to satisfy sufficiency: conditional on receiving the same prediction, applicants from different groups experience systematically different probabilities of being truly qualified or unqualified.

The trade-offs of sufficiency are that it often conflicts with separation when base rates differ, meaning that achieving equal predictive meaning across groups can produce unequal error rates such as mismatched TPRs or FPRs. While sufficiency preserves interpretability and decision consistency, ensuring that a score communicates equal information for all individuals, it may still permit substantial differences in approval rates or error burdens across groups. Finally, like separation, it depends on ground-truth labels that may inherently reflect biases.

### “Impossibility of Fairness” and Trade-offs

Extensive research shows that independence, separation, and sufficiency are largely incompatible in practice. This result, often referred to as **{the-impossibility-theorem}**, shows that unless base rates are equal across groups or predictions are perfect, it is impossible for a model to perfectly satisfy all three fairness conditions simultaneously. Thus, any operational uses of fairness must select which definitions to relax and why.

Because the criteria are mutually exclusive, choosing which to enforce is not just a purely technical matter, but a value decision. Each fairness definition encodes a different moral or policy stance as written above, and selecting among them means deciding which conceptions of equity best fit the context.

Their fundamental incompatibility manifests as practical trade-offs among fairness goals and other system objectives. Common trade-offs include:

- {Independence-vs-Separation}: equalizing predicted outcomes across groups (independence) typically requires accepting unequal error rates, while equalizing error rates (separation) typically produces unequal outcomes — and when base rates differ between groups, satisfying both simultaneously is mathematically impossible.

- {Separation-vs-Sufficiency}: Equalizing error rates (separation) may conflict with ensuring that prediction scores mean the same thing across groups (sufficiency).

- {Accuracy-vs-Fairness}: Accuracy focuses on prediction performance (e.g., minimizing overall error). Fairness adjustments may require introducing constraints that degrade performance for some groups to satisfy fairness criteria.

- {Individual-vs-Group-Fairness}: Satisfying group fairness often requires treating individuals differently to compensate for historical inequality, which violates individual fairness principles. Enforcing individual fairness can perpetuate group disparities if the similarity metric is derived from biased data.

The impossibility theorem reframes fairness as a space of constrained choices. While {recent-research} focuses on reconciling and satisfying approximate fairness across multiple metrics, every fairness intervention still prioritizes some interpretation of equality over another. Understanding these trade-offs is essential for principled design: it clarifies that algorithmic fairness is less about finding a universal solution and more about making explicit, defensible decisions about which kinds of fairness to pursue and why.

## Importance of Fairness Research

Beyond the obvious goal of making algorithms more fair, formal research has transformed how automated decision systems are developed and evaluated. Its impact can be traced across multiple domains of technical and institutional practice:

- Quantitative evaluation and benchmarking: Fairness metrics established quantitative baselines for model evaluation. Tools such as fairness scorecards, disparity ratios, and equalized odds plots became standard diagnostic components in fairness audits and model documentation.
- Algorithmic methods and toolkits: Research produced concrete algorithmic techniques for enforcing fairness, such as reweighting, adversarial debiasing, constrained optimization, and post-processing calibration.
- Regulatory translation: Formal fairness definitions have informed legal and policy discourse, including the Algorithmic Discrimination Protections section of the **AI Bill of Rights** [^10]. Statistical parity and disparate impact metrics appear in draft standards and regulatory frameworks across government and compliance frameworks.
- Shift in machine learning practice: Fairness research reframed model performance as multi-objective: accuracy must now be evaluated alongside equity. This shift led to routine inclusion of fairness metrics in ML papers, competitions, and internal product evaluations at major AI companies.

Collectively, these developments mark the field’s central contribution: turning fairness from a moral claim into a measurable property of computational systems. Any research or product that carries real-world impact also carries social responsibility, and algorithmic fairness begins to quantify and move towards more fair outcomes.

## Conclusion

Algorithmic fairness attempts to reconcile the technical logic of machine learning with the moral logic of equity. By translating social principles into quantitative constraints, it brings structure and accountability to automated systems, but also narrows what fairness can express. Formal definitions—namely independence, separation, and sufficiency—make fairness measurable, yet each captures only one dimension of equality, and the impossibility theorem shows that not all can perfectly coexist. Fairness is not a single technical goal or ideal, but a set of competing priorities and trade-offs that reflect intentional choices and values.

<!-- BIBLIOGRRAPHY ----------------------------------------------------------------------------------------------------------------------- -->

[^1]: Hardt, Moritz, Eric Price, Nati Srebro, et al. (eds.). “Classification.” In _Fairness and Machine Learning_. [https://fairmlbook.org/classification.html](https://fairmlbook.org/classification.html?utm_source)

[^2]: Hardt, Moritz, Eric Price, and Nathan Srebro. "Equality of Opportunity in Supervised Learning." In _Advances in Neural Information Processing Systems 29_, edited by D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett. Curran Associates, Inc., 2016\. [https://arxiv.org/abs/1610.02413](https://arxiv.org/abs/1610.02413)

[^3]: Baumann, Joachim, and Michele Loi. "Fairness and Risk: An Ethical Argument for a Group Fairness Definition Insurers Can Use." _Philosophy & Technology_ 36, no. 3 (2023): 45\. [https://doi.org/10.1007/s13347-023-00624-9](https://doi.org/10.1007/s13347-023-00624-9).

[^4]: Berk, Richard, Hoda Heidari, Shahin Jabbari, Michael Kearns, and Aaron Roth. "Fairness in Criminal Justice Risk Assessments: The State of the Art." _Sociological Methods & Research_ 50, no. 1 (2021): 3–44. [https://doi.org/10.1177/0049124118782533](https://doi.org/10.1177/0049124118782533).

[^5]: Speicher, Till, Hoda Heidari, Nina Grgic-Hlaca, Krishna P. Gummadi, Adish Singla, Adrian Weller, and Muhammad Bilal Zafar. "A Unified Approach to Quantifying Algorithmic Unfairness: Measuring Individual & Group Unfairness via Inequality Indices." In _Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining_, edited by Yike Guo and Faisal Farooq, 2239–2248. New York: ACM, 2018\. [https://doi.org/10.1145/3219819.3220046](https://doi.org/10.1145/3219819.3220046).

[^6]: Bell, Andrew, Lucius Bynum, Nazarii Drushchak, Lucas Rosenblatt, Tetiana Zakharchenko, and Julia Stoyanovich. "The Possibility of Fairness: Revisiting the Impossibility Theorem in Practice." In _2023 ACM Conference on Fairness, Accountability, and Transparency (FAccT '23)_, June 12–15, 2023, Chicago, IL. New York: ACM, 2023\. [https://doi.org/10.1145/3593013.3594007](https://doi.org/10.1145/3593013.3594007).

[^7]: Green, Ben. "Escaping the Impossibility of Fairness: From Formal to Substantive Algorithmic Fairness." _Philosophy & Technology_ 35 (2022): 90\. [https://doi.org/10.1007/s13347-022-00584-6](https://doi.org/10.1007/s13347-022-00584-6).

[^8]: Hsu, Brian, Rahul Mazumder, Preetam Nandy, and Kinjal Basu. "Pushing the Limits of Fairness Impossibility: Who's the Fairest of Them All?" In _Advances in Neural Information Processing Systems 35_, edited by Sanmi Koyejo, S. Mohamed, A. Agarwal, Danielle Belgrave, K. Cho, and A. Oh. New Orleans, LA: NeurIPS, 2022\. [https://arxiv.org/abs/2208.12606](https://arxiv.org/abs/2208.12606).

[^9]: Sahlgren, Otto. "What's Impossible about Algorithmic Fairness?" _Philosophy & Technology_ 37 (2024): 124\. [https://doi.org/10.1007/s13347-024-00814-z](https://doi.org/10.1007/s13347-024-00814-z).

[^10]: Krantz, Tom, and Alexandra Jonker. "What Is the AI Bill of Rights?" IBM Think. Last modified February 26, 2026\. [https://www.ibm.com/think/topics/ai-bill-of-rights](https://www.ibm.com/think/topics/ai-bill-of-rights).

<!-- ALL MY SIDEBARS BELOW ----------------------------------------------------------------------------------------------------------------------- -->

## Sidebar

proxy-problem:
Heading: The Proxy Problem
The proxy problem arises when features in a dataset encode information about sensitive attributes indirectly through statistical correlation. Even if protected variables such as race, gender, or age are excluded, the joint distribution of other variables often contains enough signal to allow a model to infer them. In large datasets, these correlations can be subtle and nonlinear, amplified by the capacity of modern learning algorithms to detect complex dependencies. These proxies mean that prediction can be influenced by sensitive attributes, even if excluded.

Formally, if a sensitive attribute _A_ is not included in the feature set _X_, but some subset of _X_ still provides information about _A_, then the model’s prediction function _f(X)_ will depend on _A_ indirectly.

This means that the assumption of “fairness through unawareness” fails: omitting A from the model does not prevent the algorithm from using it implicitly. The extent of this dependence can be measured by the statistical association between _A_ and _X_, for example, through mutual information or other measures of predictability.

Proxies can emerge through multiple mechanisms:

- Explicit correlation between variables (e.g., postal code correlated with race due to residential segregation).
- Derived or composite features that aggregate information from correlated inputs (e.g., credit utilization ratios reflecting socioeconomic status).
- Representation learning in neural networks, where hidden layers encode latent attributes predictive of sensitive categories.

Detecting proxies is difficult because sensitive information may be dispersed across many variables rather than isolated in one. One common diagnostic method is to train an auxiliary classifier that attempts to predict _A_ (the sensitive attribute) from _X_ (the feature set). If the classifier performs well, then the feature space encodes sensitive information. Statistical independence tests and conditional mutual-information analysis are also used to quantify proxy strength.

Various mitigation strategies aim to reduce this dependence:

- Causal inference approaches try to block the causal paths from _A_ to the predicted outcome _Y_.
- Adversarial debiasing methods train the model so that its representations are predictive of _Y_ but not of _A_.
- Information-theoretic methods penalize the amount of information about _A_ contained in the prediction.

However, these techniques rely on assumptions about the data-generating process and causal structure, and they rarely remove proxy influence completely. Because social and economic variables are deeply correlated, proxy effects are often unavoidable. Effective fairness assessment must therefore consider both explicit use of sensitive attributes and their indirect presence throughout the feature space.

individual-fairness:
Heading: Individual fairness

### Formal definition:

For a prediction function _Ŷ_ \= _f(X)_, and a task-specific similarity metric _d(·,·)_ over individuals, the model should satisfy a Lipschitz-style condition: | _f(xi​)−f(xj​)_ | ≤ L ⋅ _d (xi​,xj​)_ for all individuals _xi_, _xj_. The closer two individuals are according to the similarity metric, the more similar their predicted outcomes must be.

### Common Metrics:

1. Lipschitz violations: Proportion or magnitude of prediction differences exceeding the similarity bound.
2. Pairwise consistency metrics: Frequency of near-neighbor pairs with large score gaps or conflicting decisions. x
3. Ranking stability measures: Evaluations of whether individuals with similar feature profiles receive comparable rankings or thresholded decisions.

### Key assumption:

A valid, ethically defensible, and task-relevant similarity metric exists that captures which characteristics should matter for the decision and how much they should matter relative to one another.

### Limitations:

- Heavily depends on how similarity is defined; if the chosen metric is derived from historically biased data or includes proxy features correlated with protected characteristics, the fairness constraint can perpetuate structural inequities while appearing formally neutral.
- Does not guarantee group-level parity and may entrench disparities across protected groups.
- Potentially substantial computational overhead, as pairwise or neighborhood-based fairness checks scale poorly to large datasets.

independence:
Heading: Independence

### Formal definition:

Where _X_ is the space of feature vectors, _Y_ is the true outcome, _A_ is a sensitive attribute, and _Ŷ_ \= _f (X)_ is the prediction*,* independence holds when _Ŷ_ ⊥ _A._[^1]

### Common Metrics:

- Demographic parity difference: Difference in positive outcome rates across groups. These can be compared with minimum/maximum, pairwise differences, or using a reference group. Smaller values indicate greater parity.
- Demographic parity ratio: Ratio of positive outcome rates across groups. Values closer to 1 indicate greater parity.
- Mean score difference: Gap between average predicted scores across groups for continuous predictions.

### Key Assumption:

Differences in outcome rates across groups reflect inherent unfairness, not legitimate differences in qualifications or risk.

### Limitations:

- Does not distinguish between disparities arising from bias and those arising from genuine differences in predictive features.
- Allows false positive and negative rates to be unevenly distributed.
- Can reduce predictive accuracy by forcing equal selection rates across dissimilar populations.

separation:
Heading: Separation

### Formal definition:

Where _X_ is the space of feature vectors, _Y_ is the true outcome, _A_ is a sensitive attribute, and _Ŷ_ \= _f (X)_ is the prediction*,* separation holds when _Ŷ_ ⊥ \*A | Y.\*[^1]

### Common Metrics:

- True Positive Rate (TPR) difference (equal opportunity): Difference in correctly approved qualified individuals across groups. Values closer to 0 indicate greater parity.
- False Positive Rate (FPR) difference: Difference in incorrectly approved unqualified individuals across groups. Values closer to 0 indicate greater parity.
- False Negative Rate (FNR) difference: Difference in incorrectly denied qualified individuals across groups. Values closer to 0 indicate greater parity.
- Equalized odds difference: Combined measure of TPR and FPR differences, often taking their maximum. Values closer to 0 indicate greater parity.

### Key assumption:

Differences in error rates across groups are unfair, even if true outcome rates differ between groups.

### Limitations:

- Requires access to accurate ground truth labels, which may themselves be biased or socially constructed.
- Treats all misclassification errors as equivalent regardless of their real-world impact.
- Conflicts with sufficiency when outcome base rates differ across groups.

sufficiency:
Heading: Sufficiency

### Formal definition:

Where _X_ is the space of feature vectors, _Y_ is the true outcome, _A_ is a sensitive attribute, and _Ŷ_ \= _f (X)_ is the prediction*,* sufficiency holds when _Y_ ⊥ \*A | Ŷ\*[^1]

### Common metrics:

- Positive predictive value (PPV) gap: Difference in true qualification rates among approved or high-score individuals across groups.
- Negative predictive value (NPV) gap: Difference in true unqualification rates among denied or low-score individuals across groups.
- Expected calibration error (ECE): Average deviation between predicted probabilities and observed outcome frequencies, stratified by group.
- Calibration curves / reliability diagrams: Visual checks of probability alignment across groups.
- Brier score or log loss by group: Measures of probabilistic prediction quality across demographic strata.

### Key assumption:

Prediction scores represent true and comparable probabilities across all groups and can be meaningfully interpreted as equal estimates of underlying risk.

### Limitations:

- Assumes probability estimates are well-calibrated and comparable across groups.
- Permits disparities in selection rates and error burdens across demographic groups.
- Requires large sample sizes for reliable estimation.
- Depends on accurate ground-truth labels, which may embed social, historical, or measurement bias.

the-impossibility-theorem:
Heading: The Impossibility Theorem
The impossibility theorem in algorithmic fairness formalizes the claim that standard group fairness criteria—independence, separation, and sufficiency—cannot all hold simultaneously except under restrictive or trivial conditions. The result follows from the probabilistic relationships among the sensitive attribute (_A_), the true outcome (_Y_), and the model prediction (_Ŷ_). Each fairness criterion specifies a conditional independence constraint, as defined above:

- Independence: _Ŷ_ is independent of _A → Ŷ ⟂ A_
- Separation: _Ŷ_ is independent of A given the true outcome \*Y → Ŷ ⟂ A | Y\*
- Sufficiency: _Y_ is independent of A given the prediction _Ŷ → Y ⟂ A | Ŷ_

Each expresses a different fairness intuition: equality of outcomes, equality of errors, and equality of interpretation.

The conflict arises because these conditional independence relations cannot all hold simultaneously unless group base rates _P(Y_\=1 _ | A)_ are equal or the model is perfectly accurate (_Ŷ \= Y_).

### Mathematical outline:

Let the model output a score _S \= f(X)_, estimating _P(Y=1 | X)_.

- Independence (demographic parity) requires _P(S | A=a)_ to be identical across groups.
- Separation (equalized odds) requires _P(S | Y=y, A=a)_ to be identical across groups.
- Sufficiency (calibration) requires _P(Y=1 | S=s, A=a) \= s_ for all groups _a_.

These conditions overconstrain the joint distribution of _S, Y,_ and _A_. If sufficiency and separation both hold, then by the law of total probability _P(Y=1 | A=a) \= Σs P(Y=1 | S=s, A=a) P(S=s | A=a)_ must be identical across groups. In other words, combining sufficiency and separation forces the group-level base rates _P(Y \= 1 | A \= a)_ to be identical. Unless the model is perfect or groups truly have identical Y distributions, these two conditions cannot both be satisfied.

Likewise, enforcing independence alongside either sufficiency or separation generally leads to degenerate cases (such as constant predictions or identical label distributions). Demographic parity requires equal prediction rates regardless of differences in true outcomes. If we also require separation, we are demanding that both outcome rates and error rates match across groups—something that can occur only if the true label distributions are the same or the model makes no errors.

Similarly, independence and sufficiency can only hold together when the true outcome _Y_ carries no information about _A_. Because real datasets almost always exhibit different base rates and imperfect accuracy, these constraints cannot all be satisfied at once.

Independence-vs-Separation:
Heading: Independence vs. separation

### Domain:

Lending (loan approvals)

### Study:

[“Equality of Opportunity in Supervised Learning”](https://arxiv.org/pdf/1610.02413) by Hardt, Price & Srebro (2016) [^2]

### Summary:

The authors present a post-processing method for classifiers that adjusts decision thresholds group-by-group so as to equalize false-positive and false-negative rates across groups. Essentially, they enforce the separation criterion (equal error rates) rather than the independence criterion (equal approval rates irrespective of group).

### Why separation was chosen:

In the lending context, the authors argue that it is unfair if one demographic group faces systematically higher error rates (e.g., being wrongly denied or wrongly approved) even if the overall approval rate is the same. Prioritizing equal error rates ensures more equitable treatment conditional on “would repay” vs “would default.”

### Trade-off illustrated:

By choosing separation, the authors implicitly accept differences in approval rates across groups (thus violating independence). This shows how the technical choice of fairness metric reflects a policy decision about whether we care more about outcome-parity or error-parity.

Separation-vs-Sufficiency:

### Domain:

Insurance (premium pricing / risk prediction)

### Study:

[“An Ethical Argument for a Group Fairness Definition Insurers Can Use”](https://link.springer.com/article/10.1007/s13347-023-00624-9) by Baumann & Loi (2023) [^3]

### Summary:

The authors examine algorithmic risk scoring for insurance premiums and argue that the most appropriate fairness metric in this domain is sufficiency (calibration), so a predicted risk score should mean the same thing across demographic groups. They critique both independence and separation as normatively and mathematically ill-fitting for insurance. Why sufficiency was chosen: In insurance, predicted risk scores are used to set premiums or underwriting decisions; thus, fairness demands that those scores correspond to actual risk equivalently for all groups. Focusing on separation (equal error rates) could force distortions in the calibration of risk scores—undermining the actuarial validity of pricing. Trade-off illustrated: By choosing sufficiency, the authors accept that error rates or outcome distributions might differ across groups. This reinforces how the fairness criterion selection is a technical decision that encodes value judgments about what fairness means in that domain. |

Accuracy-vs-Fairness:
Heading: Accuracy vs. Fairness

### Domain:

Criminal Justice

### Study:

“[Fairness in Criminal Justice Risk Assessments: The State of the Art](https://arxiv.org/abs/1703.09207)” by Berk et al. (2017) [^4]

### Summary:

This study examines how different definitions of algorithmic fairness apply to criminal justice risk assessment tools, including systems that predict reoffending risk to guide bail, parole, or sentencing decisions. They show empirically that when base rates differ across demographic groups, achieving statistical fairness typically requires reducing predictive accuracy. Enforcing fairness constraints can shift decision thresholds, altering false positive and false negative rates and producing less precise predictions overall. Trade-off illustrated: The study demonstrates that optimizing purely for accuracy tends to reproduce historical disparities present in the data, while optimizing for fairness may lower overall predictive performance. Balancing these goals requires explicitly deciding how much accuracy one is willing to sacrifice for fairer outcomes, again making fairness a normative and policy choice instead of a purely technical parameter. |

Individual-vs-Group-Fairness:
Heading: Individual vs. Group Fairness

## Domain:

General predictive classification tasks
Study: [“A Unified Approach to Quantifying Algorithmic Unfairness: Measuring Individual & Group Unfairness via Inequality Indices”](https://doi.org/10.48550/arXiv.1807.00787) by Speicher et al. (2018) [^5]

### Summary:

This paper proposes a quantitative framework that measures unfairness using economic inequality indices. They define “benefit” values for individuals based on algorithmic outcomes and decompose overall unfairness into between-group (group unfairness) and within-group (individual unfairness) components. Through experiments, they show that optimizing for group-level parity can unintentionally increase within-group inequality, meaning individuals inside the same group are treated less consistently. Trade-off illustrated: Pursuing group fairness improves equality between demographic groups but can worsen fairness within those groups. The study demonstrates that no algorithm can simultaneously optimize both. |

recent-research:
Heading: Pushing The Boundaries of the Impossibility Theorem
Recent works have sought to push the boundaries of the impossibility theorem:

In [“The Possibility of Fairness: Revisiting the Impossibility Theorem in Practice,”](https://dl.acm.org/doi/pdf/10.1145/3593013.3594007) Bell et al. (2023)[^6] show that if fairness metrics are treated as approximate rather than exact constraints, many models can satisfy multiple fairness criteria simultaneously. Using analytical arguments and experiments, the authors argue that the impossibility theorem is less restrictive in practice, and approximate fairness along multiple metrics is often achievable.

In [“Escaping the Impossibility of Fairness: From Formal to Substantive Algorithmic Fairness,”](https://link.springer.com/article/10.1007/s13347-022-00584-6) Green (2022)[^7] argues for a shift from formal fairness metrics to substantive fairness, emphasizing that fairness must be grounded in social context, institutional practices, and normative reasoning.

In [“Pushing the Limits of Fairness Impossibility: Who’s the Fairest of Them All?,”](https://proceedings.neurips.cc/paper_files/paper/2022/file/d3222559698f41247261b7a6c2bbaedc-Paper-Conference.pdf) Hsu et al. (2022)[^8] propose a post-processing algorithm that optimizes across multiple fairness criteria simultaneously, mitigating incompatibilities between independence, separation, and sufficiency without requiring perfect balance.

In [“What’s Impossible about Algorithmic Fairness?,”](https://link.springer.com/article/10.1007/s13347-024-00814-z) Sahlgren (2024)[^9] provides a philosophical analysis of the impossibility results in algorithmic fairness, examining what kind of “impossibility” they establish and how this relates to broader questions about feasibility and the norms we attach to fairness criteria.
