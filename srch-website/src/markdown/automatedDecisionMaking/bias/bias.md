---
title: Sources of Bias
order: 3
final: false
---

# Sources of Bias in Automated-Decision Making Systems

## What is Bias?

Bias is any **systemic process that discriminates against or favors a person or group over another based on stereotypical or inaccurate assumptions of the person or group**.[^1] Like people, algorithms are vulnerable to biases that make their decisions unfair.[^2] As automated-decision making systems (ADS) are increasingly embedded into day-to-day life, it is crucial to understand sources of bias in order to mitigate harms and enhance fairness.

## Sources of Bias in Automated-Decision Making Systems

We will organize sources of bias in ADS into two categories based on where they occur in the [drawer:ai dev life cycle](ai-dev-lifecycle). [drawer:Data generation](data-generation) is the first phase of the AI development lifecycle, where data is generated, measured, and collected from a sample population. **During the data generation phase, historical, representation, and measurement bias can occur.** [drawer:Model creation](model-creation) is the second phase of the AI development lifecycle, where an architecture is defined, weights are trained, and finally the model is deployed in real-world settings. **During model creation, learning, aggregation, evaluation, and deployment bias can occur.** Understanding each source of bias and how it is introduced into AI systems provides a starting point for measuring and mitigating bias.[^3]

### Bias in Data Generation

#### Historical Bias

**Historical bias is when a model becomes biased through data that reflects societal stereotypes.** This can occur even with perfect data sampling methods, as a biased society leads to biased data.

[drawer:Historical Bias Case Study: Gender Bias in Word Embeddings](historical-bias-case-study)

#### Representation Bias

**Representation bias occurs when datasets fail to include demographics, leading to underrepresentation.** Representation bias can happen if:

1. the target population doesn’t reflect the use population
2. if uneven sampling methods lead to underrepresentation, or
3. if there is pre-existing underrepresentation within a population.

For more information, see [drawer:here](repr-bias-explanation)

[drawer:Representation Bias Case Study: Underrepresentation In Automated Mental Illness Detection](representation-bias-case-study)

[drawer:Why Representation Bias _in AI_ is Different](repr-bias-notes)

#### Measurement Bias

**Measurement bias occurs when a measurement fails to represent the variable, person, or group being measured.**

This can occur in two ways:

- **Oversimplification:** If an overly simplistic measurement is used to represent a complex concept
- **Differential Measurement**: If groups are measured differently
- **Differential Accuracy**: If accuracy differs across groups

[drawer:Oversimplification Case Study: Healthcare Proxies In High Risk Care Management](measurement-bias-oversimplification-case-study)

[drawer:Differential Measurement Case Study: The Impact Of Over Policing On Recidivism Scores](measurement-bias-differential-measurement-case-study)

![Summary of bias in the data generation pipeline](/srch-s25/assets/primer-photos/dataGenerationBias.png)  
Figure 1: Bias in Data Generation (Suresh et al.)

### Bias in Model Creation

#### Aggregation Bias

**Aggregation bias occurs when distinct groups in a model are treated as one size fits all.** Underpinning aggregation bias is the assumption that sub-groups are homogenous enough to be treated the same in the dataset and processed together in aggregate, which is not always the case.

[drawer:Aggregation Bias Case Study: AI-based Reading Assistants For Readers With Dyslexia](aggregation-bias-case-study)

#### Learning Bias

**Learning bias occurs when modeling decisions amplify performance disparities.** Choices like which loss function is used, how many epochs are trained for, and what the learning rate is can exacerbate existing performance disparities in the model.

[drawer:Learning Bias Case Study: Distillation In Medical Models Misses Rare Cancers](learning-bias-case-study)

#### Evaluation Bias

**Evaluation bias occurs when evaluation benchmark datasets don’t represent the use population**.[^4]

[drawer:Evaluation Bias Case Study: Facial Expression Recognition In The Wild](evaluation-bias-case-study)

[drawer:Benefits and Risks of Benchmark Datasets](eval-bias-notes)

#### Deployment Bias

**Deployment bias occurs when a model is used to solve a problem that it was not designed for.**

[drawer:Deployment Bias Case Study: Using Recidivism Tools Off-Label](deployment-bias-case-study)

![Bias in model creation pipeline](/srch-s25/assets/primer-photos/modelCreationBias.png)  
Figure 2: Bias in Model Creation (Suresh et al.)

## Impact of Bias

The impact of bias in ADS is far reaching and never fully known. For an overview of the types of harm bias can cause, click [drawer:here.](types-of-harm)

## Mitigating Bias In Automated-Decision Making Systems

Understanding sources of bias in AI is an essential first step to developing fairer technology. Check out the primer on Mitigating Bias in Automated-Decision Making Systems (coming soon!) and [nav:AI Governance](governance) for more information.

## References

Angwin, Julia, Jeff Larson, Lauren Kirchner, and Surya Mattu. “Machine Bias.” ProPublica, May 23, 2016\. [https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing](https://www.propublica.org/article/machine-bias-risk-assessments-in-criminal-sentencing).

Babisha, A., A. Swaminathan, D. Anuradha, C. Gnanaprakasam, and T. Kalaichelvi. “Advancements in Facial Expression Recognition: State-of-the-Art Techniques and Innovations.” International Journal of Intelligent Systems and Applications in Engineering, March 6, 2023. [https://ijisae.org/index.php/IJISAE/article/view/5097](https://ijisae.org/index.php/IJISAE/article/view/5097).

“Bias: The Basics: Addressing Bias.” Addressing Bias: Rights, Responsibilities and Responses. Accessed March 26, 2025. [https://www.knowyourrightsandresponsibilities.psu.edu/pages/bias/bias-the-basics\#:\~:text=What%20is%20Bias%3F,of%20the%20person%20or%20group](https://www.knowyourrightsandresponsibilities.psu.edu/pages/bias/bias-the-basics#:~:text=What%20is%20Bias%3F,of%20the%20person%20or%20group).

Billig, Michael. "Prejudice, categorization and particularization: From a perceptual to a rhetorical approach." European Journal of Social Psychology 15, no. 1 (1985): 79-103. [https://www.researchgate.net/publication/228056297_Prejudice_categorization_and_particularization_From_a_perceptual_to_a_rhetorical_approach](https://www.researchgate.net/publication/228056297_Prejudice_categorization_and_particularization_From_a_perceptual_to_a_rhetorical_approach]).

Buolamwini, Joy, and Timnit Gebru. "Gender shades: Intersectional accuracy disparities in commercial gender classification." In Conference on fairness, accountability and transparency, pp. 77-91. PMLR, 2018\. [https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf](https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf).

Collins, Erin. "Punishing risk." Geo. LJ 107 (2018): 57\. [https://www.law.georgetown.edu/georgetown-law-journal/wp-content/uploads/sites/26/2018/12/Punishing-Risk-2.pdf](https://www.law.georgetown.edu/georgetown-law-journal/wp-content/uploads/sites/26/2018/12/Punishing-Risk-2.pdf).

“Dyslexia FAQ.” Yale Dyslexia. Accessed April 14, 2025\. [https://dyslexia.yale.edu/dyslexia/dyslexia-faq/](https://dyslexia.yale.edu/dyslexia/dyslexia-faq/).

“Facial Recognition And The Facial Difference Community: 2024 Survey Results.” Face Equality International. Accessed March 13, 2025\. [https://faceequalityinternational.org/FEI_2024_survey_results.pdf](https://faceequalityinternational.org/FEI_2024_survey_results.pdf).

Fraenkel, Aaron. “COMPAS Recidivism Algorithm \- Fairness & Algorithmic Decision Making.” Fairness & Algorithmic Decision Making. Accessed March 30, 2025\. [https://afraenkel.github.io/fairness-book/content/04-compas.html\#compas-recidivism-algorithm](https://afraenkel.github.io/fairness-book/content/04-compas.html#compas-recidivism-algorithm).

Garg, Nikhil, Londa Schiebinger, Dan Jurafsky, and James Zou. "Word embeddings quantify 100 years of gender and ethnic stereotypes." Proceedings of the National Academy of Sciences 115, no. 16 (2018): E3635-E3644. [https://arxiv.org/pdf/1711.08412](https://arxiv.org/pdf/1711.08412).

Hofmann, Valentin, Pratyusha Ria Kalluri, Dan Jurafsky, and Sharese King. "AI generates covertly racist decisions about people based on their dialect." Nature 633, no. 8028 (2024): 147-154. [https://www.nature.com/articles/s41586-024-07856-5](https://www.nature.com/articles/s41586-024-07856-5).

MacMillan, Douglass, David Ovalle , and Aaron Schaffer. “Police Ignore Standards after AI Facial Recognition Matches \- Washington Post.” Washington Post, January 13, 2025\. [https://www.washingtonpost.com/business/interactive/2025/police-artificial-intelligence-facial-recognition/](https://www.washingtonpost.com/business/interactive/2025/police-artificial-intelligence-facial-recognition/).

Mehrabi, Ninareh, Fred Morstatter, Nripsuta Saxena, Kristina Lerman, and Aram Galstyan. "A survey on bias and fairness in machine learning." ACM computing surveys (CSUR) 54, no. 6 (2021): 1-35. [https://arxiv.org/pdf/1908.09635](https://arxiv.org/pdf/1908.09635).

Memory and new controls for ChatGPT. Accessed March 30, 2025\. [https://openai.com/index/memory-and-new-controls-for-chatgpt](https://openai.com/index/memory-and-new-controls-for-chatgpt).

Nerušil, Boris, Jaroslav Polec, Juraj Škunda, and Juraj Kačur. "Eye tracking based dyslexia detection using a holistic approach." Scientific Reports 11, no. 1 (2021): 15687\. [https://www.nature.com/articles/s41598-021-95275-1](https://www.nature.com/articles/s41598-021-95275-1).

Obermeyer, Ziad, Brian Powers, Christine Vogeli, and Sendhil Mullainathan. "Dissecting racial bias in an algorithm used to manage the health of populations." Science 366, no. 6464 (2019): 447-453. [https://pubmed.ncbi.nlm.nih.gov/31649194/](https://pubmed.ncbi.nlm.nih.gov/31649194/).

Roy, Arnab Kumar, Hemant Kumar Kathania, Adhitiya Sharma, Abhishek Dey, and Md Sarfaraj Alam Ansari. "ResEmoteNet: bridging accuracy and loss reduction in facial emotion recognition." IEEE Signal Processing Letters (2024). [https://ieeexplore.ieee.org/document/10812829](https://ieeexplore.ieee.org/document/10812829).

Srivathsa, Neha. “Multimodal, Self-Supervised Deep Learning-Based Estimation of Symptoms and Severity of Depression and Anxiety.” Thesis, 2022\. [https://purl.stanford.edu/vp366kq1885](https://purl.stanford.edu/vp366kq1885).

Suresh, Harini, and John Guttag. "A framework for understanding sources of harm throughout the machine learning life cycle." In Proceedings of the 1st ACM Conference on Equity and Access in Algorithms, Mechanisms, and Optimization, pp. 1-9. 2021\. [https://dl.acm.org/doi/fullHtml/10.1145/3465416.3483305](https://dl.acm.org/doi/fullHtml/10.1145/3465416.3483305).

Thaqi, Enkeleda, Mohamed Omar Mantawy, and Enkelejda Kasneci. "SARA: Smart AI reading assistant for reading comprehension." In Proceedings of the 2024 Symposium on Eye Tracking Research and Applications, pp. 1-3. 2024\. [https://dl.acm.org/doi/pdf/10.1145/3649902.3655661](https://dl.acm.org/doi/pdf/10.1145/3649902.3655661).

Understanding bias: A resource guide. Accessed March 26, 2025\. [https://www.justice.gov/d9/fieldable-panel-panes/basic-panes/attachments/2021/09/29/understanding_bias_content.pdf](https://www.justice.gov/d9/fieldable-panel-panes/basic-panes/attachments/2021/09/29/understanding_bias_content.pdf).

Yi, Sibo, Yule Liu, Zhen Sun, Tianshuo Cong, Xinlei He, Jiaxing Song, Ke Xu, and Qi Li. "Jailbreak attacks and defenses against large language models: A survey." arXiv preprint arXiv:2407.04295 (2024). [https://arxiv.org/pdf/2407.04295](https://arxiv.org/pdf/2407.04295).

Zimmerman, Eric. “Self Supervised Learning in Computational Pathology.” Research Topics in Self Supervised Learning. Lecture presented at the Research Topics in Self Supervised Learning, November 8, 2024\.

[^1]: “Bias: The Basics”
[^2]: Mehrabi, “A survey on bias and fairness in machine learning”
[^3]: Suresh, “A Framework for Understanding Sources of Harm “
[^4]: Suresh, “A Framework for Understanding Sources of Harm"
