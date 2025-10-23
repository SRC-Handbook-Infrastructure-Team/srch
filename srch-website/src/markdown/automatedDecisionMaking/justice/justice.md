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

[drawer:Case Study: Annie MOORE](annie-moore)

#### Priority

The principle of **priority** focuses on the allocation of resources and opportunities to individuals or groups in order to address existing disparities or urgent needs. This approach recognizes that certain populations may require more immediate or substantial support to achieve equitable outcomes. In automated decision-making, priority ensures that AI systems can identify and respond to these critical needs.

[drawer:Case Study: SafeRent Solutions AI Scoring System](saferent-solutions)
[drawer:Case Study: AI Tools for LA Housing](la-housing-pilot)

#### Equality of Opportunity

**Equality of opportunity** ensures that all individuals have fair access to resources and
opportunities, regardless of their background. This principle aims to remove barriers that
prevent equitable participation and advancement in society. In the context of AI, equality of
opportunity involves designing systems that (a) do not perpetuate existing biases that reflect
morally arbitrary characteristics (e.g., race, gender) and (b) actively promote inclusivity.

[drawer:Case Study: Algorithmic Justice League](ajl)

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

![Procedural Justice Graphic](/srch-s25/assets/primer-photos/yls_procedural_justice.png)
_Figure from Yale Law School representing the four pillars of procedural justice._

When considering the role of algorithms as automated decision-makers capable of making
authoritative decisions, these core features of procedural justice remain relevant.

- **Neutrality**: An algorithm shows neutrality when its decision rules are consistent,
  evidence‑based, and free from hidden biases. Practically, that means using validated
  features, documenting all preprocessing steps, stress‑testing for disparate impact, and
  publishing model cards so outsiders can see the logic. If two applicants present the
  same relevant facts, the system should reach the same conclusion every time and be
  able to demonstrate that consistency under audit.

[drawer:Case Study: Shapley Values for Credit Scores](shapley-neutrality)

- **Respect**: Respect in an automated setting is largely conveyed through user experience
  and data handling. Interfaces should provide plain‑language explanations, avoid
  dark‑pattern nudges, and accommodate accessibility needs (e.g., screen‑reader
  compatibility, multiple languages). On the back end, respect for users also means
  collecting only the data strictly necessary for the task and safeguarding it with strong
  privacy controls.

[drawer:Case Study: SCHUFA](schufa-respect)

- **Voice**: Algorithms can’t “listen,” but their designers can build structured channels for
  voice: pre‑deployment participatory design sessions, in‑app feedback forms, and
  post‑decision appeal mechanisms that route complaints to a human reviewer. Logging
  those interactions and feeding validated issues back into model retraining turns user
  voice into a live governance signal rather than a box‑checking exercise.

[drawer:Case Study: Wikimedia Value-Sensitive Algorithm](wikimedia-voice)

- **Trustworthiness**: Trustworthiness emerges when system owners act and are seen to act
  in the public’s interest. Concretely, that involves open sourcing evaluation code where
  possible, publishing third‑party audit reports, disclosing conflicts of interest, and
  committing to sunset or retrain the model when context shifts. Regular transparency
  updates signal that the algorithm’s creators are motivated by fairness and public
  well‑being, not just efficiency or profit.

[drawer:Case Study: Pymetrics Independent Audit](pymetrics-trust)

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

[drawer:Case Study: Timnit Gebru’s Google Exit](timnit-gebru)

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

[drawer:Case Study: Biased Car Insurance Premiums in Michigan](car-insurance)

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
