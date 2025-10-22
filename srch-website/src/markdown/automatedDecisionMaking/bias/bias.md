---
title: Sources of Bias
order: 3
final: false
---

# Sources of Bias in Automated-Decision Making Systems

## What is Bias?

Bias is any **systemic process that discriminates against or favors a person or group over another based on stereotypical or inaccurate assumptions of the person or group**.[^1] Like people, algorithms are vulnerable to biases that make their decisions unfair.[^2] As automated-decision making systems (ADS) are increasingly embedded into day-to-day life, it is crucial to understand sources of bias in order to mitigate harms and enhance fairness.

## Sources of Bias in Automated-Decision Making Systems

We will organize sources of bias in ADS into two categories based on where they occur in the {ai-dev-lifecycle}. {Data-Generation} is the first phase of the AI development lifecycle, where data is generated, measured, and collected from a sample population. **During the data generation phase, historical, representation, and measurement bias can occur.** {Model-Creation} is the second phase of the AI development lifecycle, where an architecture is defined, weights are trained, and finally the model is deployed in real-world settings. **During model creation, learning, aggregation, evaluation, and deployment bias can occur.** Understanding each source of bias and how it is introduced into AI systems provides a starting point for measuring and mitigating bias.[^3]

### Bias in Data Generation

#### Historical Bias

**Historical bias is when a model becomes biased through data that reflects societal stereotypes.** This can occur even with perfect data sampling methods, as a biased society leads to biased data.

{Historical-Bias-Case-Study--Gender-Bias-in-Word-Embeddings}

#### Representation Bias

**Representation bias occurs when datasets fail to include demographics, leading to underrepresentation.** Representation bias can happen if:

1. the target population doesn’t reflect the use population
2. if uneven sampling methods lead to underrepresentation, or
3. if there is pre-existing underrepresentation within a population.

For more information, see {here}.

{Representation-Bias-Case-Study--Underrepresentation-In-Automated-Mental-Illness-Detection}

{Why-Representation-Bias-in-AI-is-Different}

#### Measurement Bias

**Measurement bias occurs when a measurement fails to represent the variable, person, or group being measured.**

This can occur in two ways:

- **Oversimplification:** If an overly simplistic measurement is used to represent a complex concept
- **Differential Measurement**: If groups are measured differently
- **Differential Accuracy**: If accuracy differs across groups

{Oversimplification-Case-Study-Healthcare-Proxies-In-High-Risk-Care-Management}

{Differential-Measurement-Case-Study-The-Impact-Of-Over-Policing-On-Recidivism-Scores}


![Summary of bias in the data generation pipeline](/srch-s25/assets/primer-photos/dataGenerationBias.png)  
Figure 1: Bias in Data Generation (Suresh et al.)

### Bias in Model Creation

#### Aggregation Bias

**Aggregation bias occurs when distinct groups in a model are treated as one size fits all.** Underpinning aggregation bias is the assumption that sub-groups are homogenous enough to be treated the same in the dataset and processed together in aggregate, which is not always the case.

{Aggregation-Bias-Case-Study-AI-Based-Reading-Assistants-For-Readers-With-Dyslexia}

#### Learning Bias

**Learning bias occurs when modeling decisions amplify performance disparities.** Choices like which loss function is used, how many epochs are trained for, and what the learning rate is can exacerbate existing performance disparities in the model.

{Learning-Bias-Case-Study-Distillation-In-Medical-Models-Misses-Rare-Cancers}

#### Evaluation Bias

**Evaluation bias occurs when evaluation benchmark datasets don’t represent the use population**.[^4]

{Evaluation-Bias-Case-Study-Facial-Expression-Recognition-In-The-Wild}

{Benefits-and-Risks-of-Benchmark-Datasets}

#### Deployment Bias

**Deployment bias occurs when a model is used to solve a problem that it was not designed for.**

{Deployment-Bias-Case-Study-Using-Recidivism-Tools-Off-Label}

![Bias in model creation pipeline](/srch-s25/assets/primer-photos/modelCreationBias.png)  
Figure 2: Bias in Model Creation (Suresh et al.)

## Impact of Bias

The impact of bias in ADS is far reaching and never fully known. For an overview of the types of harm bias can cause, click {here}.

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

## All Sidebar Content Below

ai-dev-lifecycle: 
Heading: Understanding AI Development Lifecycle

The AI development lifecycle provides a framework for understanding how bias is introduced to automated-decision making systems.

### Understanding Data Generation Phase of AI Development

In this phase, data is generated and a dataset is created. Data can be generated naturalistically or through experiments. **A dataset is created by defining and sampling from a target population, measuring variables of interest, pre-processing the dataset, and defining a train/test split.** For example, in a weather prediction AI model, weather data is generated naturally and simply needs to be measured to be collected. Questions of which regions to include (e.g. US or global), what kind of weather variables to include (e.g. temperature or precipitation, continuous or categorical values), what preprocessing steps to take, and how to define the testing dataset are all decisions with trade-offs.

### Understanding Model Creation Phase of AI Development

**Once a dataset is created, a model must be defined, trained, evaluated, and deployed.** Defining an AI model involves determining the model architecture, loss function, optimizer, and hyperparameters. Next the model is trained, requiring decisions about how many epochs to train on. Once trained, the model is evaluated on metrics like accuracy, F1 accuracy, and/or accuracy across categories. Following this, model post-processing like thresholding can be implemented to transform outputs into a task-specific format. Once the model has been trained, evaluated, and post-processed, it is deployed for real-world use. It is useful to view the model creation process as iterative rather than linear. Once a model is deployed, it can be trained on real-time data or augmented to increase accuracy for under-performing categories.[^1] ChatGPT is an example of this; it improves its output by training on user data (input) and personalizing responses through its user memory feature which stores a summary of user data.[^2]

[^1]: Suresh, “A Framework for Understanding Sources of Harm"
[^2]: “Memory and New Controls for ChatGPT”


Data-Generation:
Heading: Understanding Data Generation Phase of AI Development

In this phase, data is generated and a dataset is created. Data can be generated naturalistically or through experiments. A dataset is created by defining and sampling from a target population, measuring variables of interest, pre-processing the dataset, and defining a train/test split. For example, in a weather prediction AI model, weather data is generated naturally and simply needs to be measured to be collected. Questions of which regions to include (e.g. US or global), what kind of weather variables to include (e.g. temperature or precipitation, continuous or categorical values), what preprocessing steps to take, and how to define the testing dataset are all decisions with trade-offs.  


Model-Creation:
Heading: Understanding Model Creation Phase of AI Development

**Once a dataset is created, a model must be defined, trained, evaluated, and deployed.** Defining an AI model involves determining the model architecture, loss function, optimizer, and hyperparameters. Next the model is trained, requiring decisions about how many epochs to train on. Once trained, the model is evaluated on metrics like accuracy, F1 accuracy, and/or accuracy across categories. Following this, model post-processing like thresholding can be implemented to transform outputs into a task-specific format. Once the model has been trained, evaluated, and post-processed, it is deployed for real-world use. It is useful to view the model creation process as iterative rather than linear. Once a model is deployed, it can be trained on real-time data or augmented to increase accuracy for under-performing categories.[^1] ChatGPT is an example of this; it improves its output by training on user data (input) and personalizing responses through its user memory feature which stores a summary of user data.[^2]

[^1]: Suresh, “A Framework for Understanding Sources of Harm"
[^2]: “Memory and New Controls for ChatGPT”

Historical-Bias-Case-Study--Gender-Bias-in-Word-Embeddings:
Heading: Gender Bias in Word Embeddings
Societal gender biases are widely reflected in media, which is used to train large language models (LLMs)**. Because the training data of LLMs contains societal biases, the model learns to reflect this bias.**[^1] As LLMs become increasingly integrated into automatic-decision making systems, this causes harm to women and other gender minorities. This is an open area of research, as LLMs are resilient to alignment techniques and vulnerable to jailbreaking.[^2]

[^1]: Garg, _Word Embeddings_
[^2]: Hoffman, _AI Generates Covertly Racist Decisions_; Yi, _Jailbreak Attacks_



Representation-Bias-Case-Study--Underrepresentation-In-Automated-Mental-Illness-Detection:
Heading: Underrepresentation in Automated Mental Illness Detection
For example, research out of Stanford showed that AI could detect anxiety and depression with 93% and 87% accuracy respectively. However, because the research study occurred at Stanford’s research hospital which serves a primarily White community, 0 black people were included in the study. If this AI model were used in healthcare systems serving diverse communities, the target population would fail to represent the use population, leading to sampling bias and higher error rates for people of color. In medicine, multi-site research studies are a common method to normalize regional data differences and enhance diversity. In AI, collecting data from diverse locations can be a way to reach diverse audiences and mitigate sampling bias.  


Why-Representation-Bias-in-AI-is-Different:
There are two unique ways that representation bias in AI is different from representation bias in other fields. 

1. Metadata is often not collected during the data generation process. Without this information, it is difficult to measure underrepresentation in a dataset.   
2. Without rigorous intersectional evaluation after model development, it is impossible to know how much a model is impacted by representation bias. 

In the private sector, profit incentives to minimize development costs can lead to datasets developed without metadata and models that are released before intersectional evaluation is completed. Representation related harms can be measured in academic research (e.g. “Gender Shades”[^1]) and regulated via governance structures. For more information on AI governance \[nav:check out this primer\](governance).    


[^1]:  Buolamwini, “Gender Shades”


Oversimplification-Case-Study-Healthcare-Proxies-In-High-Risk-Care-Management:
Heading: Healthcare Proxies In High Risk Care Management
Predictive algorithms used to approve high risk care management programs in healthcare screen 200 million people in the US each year. Algorithms produce risk scores to identify patients who will benefit most from these programs. However, healthcare spending was used as a proxy for health issues. Because Black patients spend less on healthcare due to socioeconomic and systemic barriers, Black patients at a given risk score are significantly sicker than White patients, with an average of 26.3% more chronic illnesses. As a result, measurement bias leads to higher need Black patients being denied access to high risk care management programs compared with lower need White patients with equivalent healthcare spending. In response, the healthcare company worked with researchers to develop a better proxy that combined health prediction with cost prediction, leading to an 84% reduction in bias.[^1]

[^1]: Obermeyer, “Dissecting Racial Bias”



Differential-Measurement-Case-Study-The-Impact-Of-Over-Policing-On-Recidivism-Scores:
Heading: Impact Of Over Policing-On Recidivism Scores
Criminal justice risk assessment models determine someone’s risk to re-offend based on number of arrests. However, over-policing of minority communities leads to an uneven mapping of crime to arrest, relative to White communities. As a result, commercial risk assessment tools like COMPAS are significantly more likely to falsely predict that a Black defendant will re-offend than a White defendant.

Aggregation-Bias-Case-Study-AI-Based-Reading-Assistants-For-Readers-With-Dyslexia:
Heading: AI Based Reading Assistants For Readers With Dyslexia
AI-based reading assistants have been developed to aid reading comprehension by using eye-tracking to provide definitions when readers struggle to comprehend words.[^1] Research shows that people with dyslexia have different eye movements when reading than people who don’t have dyslexia.[^2] If a reading assistant uses an underlying eye-tracking model that processes dyslexic and non-dyslexic eye-movement reading patterns in aggregate, it may fail to represent the distinct reading patterns of either subgroup accurately. In addition to aggregation bias, representation bias can further exacerbate performance disparities. Since people with dyslexia make up 20% of the population, if dyslexic reading patterns are not oversampled to account for underrepresentation in the use population, the model will also suffer from representation bias, leading to even higher error rates for people with dyslexia.[^3]

[^1]: Thaqi, “SARA: Smart AI Reading Assistant”
[^2]: Nerušil, “Eye Tracking”
[^3]: “Dyslexia FAQ”


Learning-Bias-Case-Study-Distillation-In-Medical-Models-Misses-Rare-Cancers:
Heading: Distillation In Medical Models Misses Rare Cancers
When AI models are distilled to be more compact, they lose the nuance necessary to capture under-represented features in the data. For example, **in AI-based breast cancer screening**, **rare cancers are under-represented in medical images.** If a breast cancer detection model is distilled, performance disparities for under-represented cancers will increase because the distilled model has fewer parameters with which it can learn complex underrepresented features in the data.[^1] 

[^1]:  Zimmerman, *Self Supervised Learning*

Evaluation-Bias-Case-Study-Facial-Expression-Recognition-In-The-Wild:
Heading: Facial Expression Recognition In The Wild
Evaluation bias is present in facial expression recognition datasets. Common benchmarks like AffectNet and FER2013 contain images taken in controlled settings and processed to account for crops, rotation, and more. **In a model that seeks to predict facial expressions in naturalistic settings, benchmarking against these datasets would introduce evaluation bias by failing to reflect the use population**. Indeed, many facial expression recognition models report up to 95% accuracy, but state-of-the-art expression recognition “in the wild” is only 72%.[^1]

[^1]: Babisha, _Advancements in Facial Expression Recognition;_ Roy, _ResEmoteNet_

Benefits-and-Risks-of-Benchmark-Datasets:
Criminal risk assessment tools are intended to model the risk of recidivism, the likelihood that a convicted criminal will commit a crime in the future. These algorithms are designed to assist judges in determining bail amounts and bail eligibility. **In practice, risk assessment tools (which predict the likelihood of future crime) are used to determine sentencing lengths (the punishment for a current crime conviction).**[^1]

Often arising out of a lack of AI literacy and overreliance on technology, deployment bias can have catastrophic human impact and undermine fairness in the criminal justice system.[^2] For a more thorough analysis of (in)justice in risk assessment tools, see the \[nav:Justice Primer\](justice).

[^1]: Angwin, _Machine Bias_
[^2]: Collins, _Punishing Risk_


Deployment-Bias-Case-Study-Using-Recidivism-Tools-Off-Label:
Criminal risk assessment tools are intended to model the risk of recidivism, the likelihood that a convicted criminal will commit a crime in the future. These algorithms are designed to assist judges in determining bail amounts and bail eligibility. **In practice, risk assessment tools (which predict the likelihood of future crime) are used to determine sentencing lengths (the punishment for a current crime conviction).**[^1]

Often arising out of a lack of AI literacy and overreliance on technology, deployment bias can have catastrophic human impact and undermine fairness in the criminal justice system.[^2] For a more thorough analysis of (in)justice in risk assessment tools, see the \[nav:Justice Primer\](justice).

[^1]: Angwin, _Machine Bias_
[^2]: Collins, _Punishing Risk_

here:
Heading: Types of Harm in Automated-Decision Making Systems
**Allocative Harm**  
When opportunities are withheld from certain people or groups  
E.g: Racial bias in loan-worthiness systems lead to race-based loan denial.[^1]

**Representational Harm**  
When certain people or groups are stigmatized or stereotyped18  
E.g: LLMs disproportionately feature marginalized groups as victims in stories.

**Quality of Service Harms**  
When the quality of service an individual or group receives is diminished due to bias in AI systems[^2]  
E.g: People with facial differences have to wait longer for manual processing at airport security checkpoints.

**Interpersonal and Social System Harms**  
When an individual experiences interpersonal harm or societal harm due to bias in AI systems  
E.g: False arrests due to erroneous facial recognition make it difficult for people to clear their names and cause emotional injury to children traumatized by watching their parents getting arrested.[^3]

**If we fail to mitigate bias, we will build system that generate injustice.** For an overview of justice in automated-decision making systems, refer to the \[drawer:Justice Primer\](justice).

[^1]:  Suresh, *A Framework for Understanding Sources of Harm*

[^2]:  *Facial Recognition And The Facial Difference Community*

[^3]:   MacMillan, *Police Ignore Standards*

