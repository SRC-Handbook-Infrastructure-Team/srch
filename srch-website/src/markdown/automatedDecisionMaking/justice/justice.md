---
title: Concepts of Justice in AI
order: 2
final: false
---

# Concepts of Justice in AI

Justice in automated decision-making systems extends beyond identifying isolated instances of
bias or harm. It requires critical examination of how these systems mirror inequalities and
inequities in the broader world that they aim to encode.

## Types of Justice

While many variations of justice exist in the context of legal studies and political science, when
examining automated decision-making scenarios, two broad categories consistently emerge:
**distributive justice** and **procedural justice**.

- **Distributive Justice**: Fair distribution of resources, opportunities, or benefits in AI outputs by ensuring that outcomes do not perpetuate existing inequities or systemic discrimination.
- **Procedural Justice**: Insurance that all individuals and groups are respected and valued in automated decision-making processes.

### Distributive Justice (Outcome-Focused)

Distributive justice in automated decision-making emphasizes the equitable allocation of
resources, opportunities, and benefits in order to address and counteract systemic
discrimination and historical inequalities embedded in society. However, not all justice-related
efforts explicitly target these systemic concerns; different frameworks may instead prioritize
other aspects of fairness. Despite these variations, three (sometimes conflicting) conceptions
of distributive justice demonstrate distinct ways to assess automated decision-making
systems: **sufficiency**, **priority**, and **equality of opportunity**.

#### Sufficiency

The principle of **sufficiency** emphasizes ensuring that all individuals or groups receive a
minimum acceptable threshold of resources and opportunities, and guarantees that no one falls
below an ethically justifiable threshold. Rather than focusing on equal outcomes, sufficiency
prioritizes meeting fundamental needs first, which helps protect the most vulnerable individuals
from harm. In the context of automated decision-making, this approach ensures that AI systems
explicitly embed minimum ethical standards into their predictions and allocations.

{Case-Study-Annie-MOORE}

#### Priority

The principle of **priority** focuses on the allocation of resources and opportunities to individuals or groups in order to address existing disparities or urgent needs. This approach recognizes that certain populations may require more immediate or substantial support to achieve equitable outcomes. In automated decision-making, priority ensures that AI systems can identify and respond to these critical needs.

{Case-Study-SafeRent-Solutions-AI-Scoring-System}

{Case-Study-AI-Tools-for-LA-Housing}

#### Equality of Opportunity

**Equality of opportunity** ensures that all individuals have fair access to resources and
opportunities, regardless of their background. This principle aims to remove barriers that
prevent equitable participation and advancement in society. In the context of AI, equality of
opportunity involves designing systems that (a) do not perpetuate existing biases that reflect
morally arbitrary characteristics (e.g., race, gender) and (b) actively promote inclusivity.

{Case-Study-Algorithmic-Justice-League}

#### Key Questions for Distributive Justice

The following questions are meant to help diagnose whether an AI system is distributing
benefits and burdens fairly while spotlighting who gains, who loses, and why:

- Do particular individuals or communities receive a disproportionate share of resources,
  opportunities, or risks?
- What trade-offs, if any, exist between the three tenets of distributive justice
  (i.e., sufficiency, priority, and equality of opportunity)?
- Does the AI’s design explicitly account for differences in social, economic, or political
  advantages?

### Procedural Justice (Process-Focused)

Individuals’ perceptions of procedurally just encounters are based on four central features of
their interactions with any decision-maker, whether that be a legal authority, corporate system,
community institution, or an algorithm: **neutrality**, **respect**, **voice**, and **trustworthiness**.

![Procedural Justice Graphic](/srch/assets/primer-photos/yls_procedural_justice.png)
_Figure from Yale Law School representing the four pillars of procedural justice._

When considering the role of algorithms as automated decision-makers capable of making
authoritative decisions, these core features of procedural justice remain relevant.

- **Neutrality**: An algorithm shows neutrality when its decision rules are consistent,
  evidence‑based, and free from hidden biases. Practically, that means using validated
  features, documenting all preprocessing steps, stress‑testing for disparate impact, and
  publishing model cards so outsiders can see the logic. If two applicants present the
  same relevant facts, the system should reach the same conclusion every time and be
  able to demonstrate that consistency under audit.

{Case-Study-Shapley-Values-for-Credit-Scores}

- **Respect**: Respect in an automated setting is largely conveyed through user experience
  and data handling. Interfaces should provide plain‑language explanations, avoid
  dark‑pattern nudges, and accommodate accessibility needs (e.g., screen‑reader
  compatibility, multiple languages). On the back end, respect for users also means
  collecting only the data strictly necessary for the task and safeguarding it with strong
  privacy controls.

{Case-Study-SCHUFA}

- **Voice**: Algorithms can’t “listen,” but their designers can build structured channels for
  voice: pre‑deployment participatory design sessions, in‑app feedback forms, and
  post‑decision appeal mechanisms that route complaints to a human reviewer. Logging
  those interactions and feeding validated issues back into model retraining turns user
  voice into a live governance signal rather than a box‑checking exercise.

{Case-Study-Wikimedia-Value-Sensitive-Algorithm}

- **Trustworthiness**: Trustworthiness emerges when system owners act and are seen to act
  in the public’s interest. Concretely, that involves open sourcing evaluation code where
  possible, publishing third‑party audit reports, disclosing conflicts of interest, and
  committing to sunset or retrain the model when context shifts. Regular transparency
  updates signal that the algorithm’s creators are motivated by fairness and public
  well‑being, not just efficiency or profit.

{Case-Study-Pymetrics-Independent-Audit}

It is crucial to scrutinize automated decision-making algorithms through this procedural justice
framework to ensure they are designed and implemented in ways that uphold respect,
demonstrate neutrality, amplify individual and community voices, and foster trust in the
institutions that employ them.

#### Key Questions for Procedural Justice

The following questions are meant to help gauge whether an AI system’s decision‑making
process is procedurally just:

- Are individuals treated with dignity and respect in automated decision-making processes
  and outcomes?
- Is there clear communication about why the system is making certain decisions?
- Can individuals contest the AI system’s decisions, and are those processes accessible
  and fair?
- Do appropriate mechanisms for accountability (e.g. effective auditing) exist?

## Mechanisms for Algorithmic Accountability

Justice in automated decision-making requires mechanisms that reinforce the core tenets of
distributive justice and procedural justice. Mechanisms for algorithmic accountability serve
this critical role by establishing practices and safeguards to assess, maintain, and enhance
distributive and procedural justice throughout the decision-making process.

### Independent Auditing

Due to the continuous negative impact of biases originating from automated decision-making
systems, a recurring theme when discussing algorithmic accountability is the need for
third-party, external auditing as a counterbalance to purely internal oversight. External auditors
can help:

1. Identify overlooked biases that in-house teams might miss due to organizational blind
   spots or conflicts of interest.
2. Establish trust among affected communities because independent assessments
   increase transparency and legitimacy.
3. Create standardized governance practices across different industries and use cases,
   which will improve fairness metrics over time.

Independent external oversight is most effective when auditors can reliably access relevant data
or model outputs. However, many external auditors face barriers like restricted APIs or
excessive legal hurdles, which limit their ability to test for bias or harmful outcomes. Without a
clear path to the necessary information, audits risk being reduced to surface-level checks that
fail to address deeper, systemic issues, a phenomenon referred to as audit washing.

### Institutional Accountability

Holding a single developer accountable for biased code may do little to fix the deeper systemic
forces that shaped that bias in the first place. Therefore, it is crucial to spotlight the
responsibility of governments, large organizations, and social institutions, rather than just “bad
actors.” The obligation is on these groups as collectives rather than individual developers and
deployers of AI models to mitigate harm and ensure compliance with anti-discrimination
standards. Rather than imposing blanket liability on developers, lawmakers should focus on the
actual use cases to better tackle the root causes of AI bias and foster accountable AI
deployments.

{Timnit-Gebrus-Google-Exit}

## Tradeoffs between Efficiency and Bias

The bias-efficiency tradeoff highlights tensions in algorithmic decision-making between
optimizing for performance, cost, savings, and scale, while upholding justice. Algorithms provide
quick and cost-effective decisions, but these efficiencies can magnify social biases and overlook
local contexts, particularly when:

- Historical data reflect systemic discrimination.
- Design priorities emphasize speed, profit, or scalability at the expense of nuanced, local
  fairness considerations.
- Protected groups are indirectly penalized by proxy methods (e.g., [Bayesian Improved
  Surname Geocoding](https://www.rand.org/health-care/tools-methods/bisg.html)).
- Large-scale models adopt reductionist approaches that fail to account for local
  community needs (e.g., environmental costs).

{Case-Study-Biased-Car-Insurance-Premiums-in-Michigan}

## Glossary

- **Algorithmic Accountability**: Concept for ensuring automated decision-making systems operate ethically and transparently, with mechanisms (e.g., audits) to identify and mitigate injustices.
- **Audit Washing**: Superficial or ineffective audits that give a misleading impression of fairness without addressing systemic issues.
- **Bias**: Systematic unfairness in decision-making systems, based on superficial or inaccurate assumptions, leading to disproportionate harm or advantage for certain groups.
- **Bias-Efficiency Tradeoff**: Tension between achieving efficiency through automated systems and the potential amplification of biases or injustices.
- **Distributive Justice**: Fair allocation of resources and opportunities to address systemic discrimination and inequalities.
- **Equality of Opportunity**: Guaranteeing fair access to resources and opportunities regardless of background or identity.
- **Harm**: Negative consequences resulting from biased or unjust automated decisions.
- **Independent Auditing**: The practice of having neutral, third-party experts evaluate AI models and decisions for potential biases or harms.
- **Justice**: Fair treatment ensuring equitable processes and outcomes in automated decision-making.
- **Neutrality**: Central feature of procedural justice; ensuring impartiality and unbiased treatment within automated decisions.
- **Priority**: Preferential allocation of resources to groups or individuals facing the most urgent needs or significant disadvantages.
- **Procedural Justice**: Fairness in the processes that lead to automated decisions, emphasizing respect, neutrality, voice, and trustworthiness.
- **Respect**: Treating individuals with dignity and valuing their rights within decision-making processes.
- **Sufficiency**: Ensuring all individuals receive a minimum acceptable level of resources or opportunities to meet fundamental needs.
- **Trustworthiness**: Establishing confidence in automated systems by maintaining transparency, fairness, and accountability.
- **Voice**: Providing individuals the opportunity to express concerns or contest decisions made by algorithms.

## References

Angwin, Julia, Jeff Larson, Surya Mattu, and Lauren Kirchner. “Machine Bias.” _ProPublica_, May 23, 2016. https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing.

Appel, Ruth E. “Strengthening AI Accountability Through Better Third Party Evaluations.” _Stanford Institute for Human-Centered Artificial Intelligence_, November 6, 2024. https://hai.stanford.edu/news/strengthening-ai-accountability-through-better-third-party-evaluations.

Barocas, Solon, and Andrew D. Selbst. “Big Data’s Disparate Impact.” _California Law Review_ 104, no. 3 (2016): 671–732. https://dx.doi.org/10.2139/ssrn.2477899.

Bukoski, Michael. “Moral Uncertainty and Distributive Sufficiency.” _Ethical Theory and Moral Practice_ 24, no. 4 (2021): 949+. https://link.gale.com/apps/doc/A683675865/AONE?u=anon~671d731&sid=googleScholar&xid=9f3ccaee.

Buolamwini, Joy, dir. _Coded Bias_ [Film]. 7th Empire Media, 2020.

Elford, Gideon. “Equality of Opportunity.” In _The Stanford Encyclopedia of Philosophy_, Fall 2023 Edition, edited by Edward N. Zalta and Uri Nodelman. https://plato.stanford.edu/archives/fall2023/entries/equal-opportunity/.

Goodman, Ellen P., and Julia Tréhu. “AI Audit-Washing and Accountability.” _German Marshall Fund of the United States_, November 2022. https://www.gmfus.org/news/ai-audit-washing-and-accountability.

Holtug, Nils. “Prioritarianism.” In _Oxford Research Encyclopedia of Politics_. Oxford University Press, 2017. https://doi.org/10.1093/acrefore/9780190228637.013.232.

Kaufman, Alexander. “Distributive Justice, Theories of.” In _Encyclopedia of Applied Ethics_ (Second Edition), edited by Ruth Chadwick, 842–850. Academic Press, 2012. https://doi.org/10.1016/B978-0-12-373932-2.00227-1.

Kroll, Joshua A., Joanna Huey, Solon Barocas, Edward W. Felten, Joel R. Reidenberg, David G. Robinson, and Harlan Yu. “Accountable Algorithms.” _University of Pennsylvania Law Review_ 165, no. 3 (2017): 633–705. https://scholarship.law.upenn.edu/penn_law_review/vol165/iss3/3/.

RAND Corporation. "Bayesian Improved Surname Geocoding (BISG)." _RAND Health Care_. Accessed April 14, 2025. https://www.rand.org/health-care/tools-methods/bisg.html.

Stanford Law School. “Bias in Large Language Models and Who Should Be Held Accountable.” Accessed April 14, 2025. https://law.stanford.edu/press/bias-in-large-language-models-and-who-should-be-held-accountable/.

Stern, Carly. “LA Thinks AI Could Help Decide Which Homeless People Get Scarce Housing – and Which Don’t.” _Vox_, December 6, 2024. https://www.vox.com/the-highlight/388372/housing-policy-los-angeles-homeless-ai.

University of Oxford. _How AI Is Improving Outcomes for Resettled Refugees: The Annie™ MOORE Project_. 2022. https://www.economics.ox.ac.uk/annie-moore-increasing-employment-of-resettled-refugees-using-matching-machine-learning-and-integer.

Yale Law School. “Procedural Justice in Legal Processes.” Accessed April 14, 2025. https://law.yale.edu/justice-collaboratory/procedural-justice.

Zou, James, and Londa Schiebinger. “AI Can Be Sexist and Racist—It’s Time to Make It Fair.” _Nature_ 559, no. 7714 (2018): 324–326. https://doi.org/10.1038/d41586-018-05707-8.

## Sidebar

Case-Study-Annie-MOORE:
Heading: Annie MOORE
Annie MOORE is an AI-powered matching system that has been implemented by the U.S. refugee resettlement agency HIAS since 2018. The system operationalizes sufficiency by matching refugees to host communities where each individual has a high likelihood of achieving a minimum threshold of employment and economic security. The system assesses refugees’ backgrounds and personal needs against local opportunities and resources. Through this process, the system enhances refugee integration and facilitates targeted resource allocation, which allows agencies like HIAS to provide more tailored support to individuals facing significant challenges.

[Further Reading](https://www.economics.ox.ac.uk/annie-moore-increasing-employment-of-resettled-refugees-using-matching-machine-learning-and-integer?utm_source=chatgpt.com)

Case-Study-SafeRent-Solutions-AI-Scoring-System:
Heading: SafeRent Solutions AI Scoring System
In Massachusetts, an AI-driven tenant screening system by SafeRent Solutions demonstrates how algorithmic practices may undermine justice as priority. Traditionally, AI scoring systems have maintained heavy reliance on credit history and non-rental debt without accounting for the mitigating benefit of housing vouchers. In this case, SafeRent’s algorithm generated a “SafeRent Score” that incurred frequent penalizations on low-income applicants using housing vouchers, many of whom were Black and Hispanic.

The metric resulted in unfair rental application rejections despite exemplary records showing on-time rent payments. Rather than prioritizing the needs of applicants facing acute economic hardship, the system’s design treated voucher users as inherent risks due to lower traditional credit scores. As a result, landlords relying on the SafeRent Score denied housing opportunities to the very individuals who needed extra support. The subsequent lawsuit, filed in 2022 and settled for approximately $2.3 million in November 2024, forced SafeRent to suspend the SafeRent Score for voucher users for five years and mandated that property managers perform holistic assessments of these applicants.

This case shows that a scoring system misaligned with the principle of justice as priority can exacerbate existing inequities by failing to recognize that those who rely on vouchers are in urgent need of stable housing.

[Further Reading](https://www.theverge.com/2024/11/20/24297692/ai-landlord-tool-saferent-low-income-tenants-discrimination-settlement)

Case-Study-AI-Tools-for-LA-Housing:
Heading: AI Tools for LA Housing
In contrast to systems that penalize applicants by relying on traditional credit and eviction data, Los Angeles is piloting an AI-driven approach to housing allocation designed to prioritize those with the most urgent needs. In this model developed by USC researchers and community stakeholders, historical data is re-examined and adjusted for inherent biases. Instead of using a flat scoring system that inadvertently lowers scores for those with housing vouchers, the new system assigns additional weight to factors demonstrating acute vulnerability, like prolonged homelessness or pronounced gaps in income. This provision, currently being implemented by the Los Angeles Homeless Services Authority (LAHSA), ensures that applicants facing extreme hardship are given preferential consideration.

[Further Reading](https://www.vox.com/the-highlight/388372/housing-policy-los-angeles-homeless-ai)

Case-Study-Algorithmic-Justice-League:
Heading: Algorithmic Justice League
The Algorithmic Justice League (AJL), founded by Joy Buolawmwini, is dedicated to combating bias in AI systems to ensure equitable treatment across diverse populations. The documentary Coded Bias explores the AJL’s discovery that facial recognition technologies act on embedded biases in their training data when failing to accurately identify darker-skinned faces. The film also shows Buolawmwini’s advocacy for legislation to address algorithmic biases that undermine equality of opportunity.

- [Gender Shades](http://gendershades.org/overview.html): an interactive evaluation of the accuracy of AI-powered gender classification products

[Further Reading](https://www.ajl.org/)

Case-Study-Shapley-Values-for-Credit-Scores:
Heading: Shapley Values for Credit Scores
Traditional credit scorecards have used logistic regression models because their decision-making processes offer interpretability. However, more powerful machine learning models like XGBoost and random forest algorithms typically offer superior predictive accuracy at the cost of interpretability. This tradeoff creates a neutrality problem as decisions become opaque. Researchers addressed this challenge by developing a novel framework using Shapley values to create interpretable credit scorecards that maintain the predictive power of advanced models.

The Shapley values approach works by deriving credit scores for each predictor variable group in complex models like XGBoost and random forest. This method provides a mathematical guarantee that the contribution of each feature to the final decision is fairly allocated, which ensures consistency across applications. Researchers showed that removing discriminatory features like age and gender didn't significantly impact classification capabilities, proving that neutral credit scoring systems could achieve high accuracy without compromising fairness.

This approach to neutrality satisfies the technical requirements of consistency and evidence-based decision-making while also making the rules transparent enough for outsiders to verify the logic. The mathematically rigorous allocation of feature importance ensures that if two loan applicants present identical relevant facts, they will receive identical scores.

[Further Reading](https://pmc.ncbi.nlm.nih.gov/articles/PMC11318906/)

Case-Study-SCHUFA:
Heading: SCHUFA
SCHUFA, a German credit bureau, provides creditworthiness scores to lenders based on automated processing of personal data. When an individual was denied credit after SCHUFA supplied information about her, she requested access to details about how her score was determined. SCHUFA provided some data but refused to explain the calculation methodology, citing trade secrets. After a series of appeals, the case reached the CJEU, which ruled decisively on the side of respect for individuals.

The Court determined that when credit scoring agencies create probability scores through automated processing that significantly affect individuals, they engage in "automated decision-making" under Article 22 of the GDPR. This triggered important protections: the right to meaningful information about the logic involved, the right to human intervention, and the right to express one's point of view and challenge the decision.

This case established that respect in algorithmic systems requires more than merely efficient processing; it demands treating individuals as autonomous agents who deserve explanations and recourse. The judgment forcefully rejected the notion that commercial interests in algorithmic secrecy outweigh individuals' rights to understand decisions that affect their lives. This respect manifests through both interface transparency (providing explanations) and substantive rights (offering meaningful recourse).

[Further Reading](https://iapp.org/news/a/key-takeaways-from-the-cjeus-recent-automated-decision-making-rulings)

Case-Study-Wikimedia-Value-Sensitive-Algorithm:
Heading: Wikimedia Value-Sensitive Algorithm
Researchers at the University of Minnesota developed an "intelligent socialization algorithm" to help WikiProjects (self-organized groups within Wikipedia) identify and recruit suitable new members. Rather than designing the algorithm based solely on technical considerations, they employed "Value-Sensitive Algorithm Design", which incorporated stakeholders' explicit feedback in the early stages of algorithm creation.

This process began with interviews of WikiProject organizers to understand their recruitment practices and values. The researchers then translated these qualitative insights into specific algorithmic features and constraints. For example, they learned that project organizers valued editing activity as well as subject-matter expertise, communication skills, and cultural fit. The algorithm was designed to respect these multidimensional criteria rather than optimizing for simple metrics like edit count. After deployment, the system actively collected feedback from both project organizers and invitees, which helped create a continuous improvement loop. The results were notable, as experienced newcomers who received algorithm-generated invitations showed increased participation in projects compared to control groups.

This case shows that meaningful voice in algorithmic systems doesn't require humanlike understanding but rather deliberate design choices that value stakeholder input throughout the development and deployment process. By creating structured channels for stakeholder feedback and actually incorporating this feedback into system design, the WikiProjects recruitment algorithm transformed user voice from a passive input into an active governance mechanism.

[Further Reading](https://haiyizhu.com/wp-content/uploads/2018/09/VSAD_pre_camera_ready.pdf)

Case-Study-Pymetrics-Independent-Audit:
Heading: Pymetrics Trust
Pymetrics develops algorithms that assess job candidates based on their performance in gamified assessments designed to measure cognitive and emotional traits. Aware of potential concerns about bias in hiring algorithms, pymetrics voluntarily submitted its candidate screening tools to an independent audit by researchers from Northeastern University.

This cooperative audit was structured to maintain both rigor and independence. The auditors examined source code, tested statistical outcomes, and evaluated safeguards against manipulation. They specifically assessed whether pymetrics' implementation of the "four-fifths rule", a legal standard for detecting adverse impact in hiring, functioned as claimed. The audit confirmed that pymetrics' fairness guarantees were technically sound and included sufficient safeguards against both human error and intentional subversion.

This approach established trustworthiness through multiple mechanisms: independent verification by credible third parties, transparency about methods, and a demonstrated willingness to subject proprietary systems to external scrutiny. By providing evidence that its fairness claims were more than marketing rhetoric, pymetrics established itself as a trustworthy actor in the sensitive context of employment.

[Further Reading](https://mislove.org/publications/Pymetrics-FAccT.pdf)

Timnit-Gebrus-Google-Exit:
Heading: Timnit Gebru
Timnit Gebru’s forced exit from Google serves as a notable example of why holding an individual developer accountable does little to remedy the underlying systemic issues that produce biased AI. The case shows that it is the institution’s opaque review processes, profit-driven priorities, and entrenched cultural biases that create conditions ripe for discriminatory outcomes. Gebru’s experience, where her legitimate criticisms of internal practices and calls for transparency were used to scapegoat her as “problematic”, affirms that responsibility must lie with governments, large organizations, and social institutions. Therefore, lawmakers and regulators should focus on ensuring that companies deploy robust safeguards in their automated systems to address the root causes of bias across diverse use cases, from financial decision-making to hiring practices, instead of imposing blanket liability on individual developers.

[Further Reading](https://www.axios.com/2021/02/19/google-tweaks-diversity-research-policies-following-inquiry)

Case-Study-Biased-Car-Insurance-Premiums-in-Michigan:
Heading: Car Insurance Premiums in Michigan
Insurance companies have increasingly adopted AI to optimize pricing for car insurance. These algorithms analyze vast amounts of data, including location, driving history, and demographic information, to determine premiums. While these systems offer efficiency and cost savings, they often perpetuate existing biases. For example, studies have shown that drivers in predominantly Black neighborhoods within regions like Michigan are charged higher premiums compared to those in predominantly White neighborhoods, despite similar accident risks. This bias reflects historical discrimination and can exacerbate economic inequalities by disproportionately affecting marginalized communities. To address these types of issues, it is crucial to implement mechanisms for accountability, like those mentioned in this primer, to ensure fairness and equity in automated decision-making processes.

[Further Reading](https://www.governing.com/policy/michigans-fair-and-reasonable-reforms-allowed-car-insurers-to-charge-more-in-black-neighborhoods?utm_source=chatgpt.com)
