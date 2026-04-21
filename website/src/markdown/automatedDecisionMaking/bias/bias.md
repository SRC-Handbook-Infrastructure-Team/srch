---
title: Bias in Automated Decision-Making Systems
order: 1
final: true
---

## What is Bias?

Automated decision-making (ADM) systems are increasingly embedded in day-to-day life: the Stanford AI index reports that as of 2024, 78% of businesses were working to incorporate AI into operations, that GPT 4 can outperform human doctors in key clinical tasks, and that as of 2025, Waymo provides over 150,000 rides in self-driving cars per week.[^5]

Decisions made by ADM systems, like human decision-making, can be flawed. One of the primary ways in which decisions can be flawed is due to bias. **Bias** is any systemic process that discriminates against or favors a person or group over another based on stereotypical or inaccurate assumptions of the person or group.

Ultimately, society benefits from processes and decision makers that minimize bias. Understanding the ways in which ADM systems can be biased and the harms that may arise from those biases allows one to make informed decisions about whether imperfect ADM outcomes or imperfect human decision-making would ultimately lead to minimizing bias.

For example, judges are imperfect decision makers. They often let high-risk defendants out on bail; some are prone to being overly strict, all get hungry. Legal scholar Cass Sunstein argues that when evaluating the use of an AI risk prediction model in the justice system, the model should be evaluated against the imperfection of the current system.[^11] Evaluating systems of decision-making and attempting to implement systems that minimize biases can help reduce harms caused by bias.

**Types of Potential Harm from Bias in Automated Decision-Making Systems:**  
Biases in ADM systems can lead to material harm to people's health and livelihood making it essential that ADM system creators and implementers are aware of the potential biases that may arise.

**Allocative Harm** occurs when biased systems deny individuals or groups access to resources, opportunities, or benefits.

**Representational Harm** arises when certain people or groups are stigmatized, stereotyped, or underrepresented, shaping how they are perceived and valued in society.

## Sources of Bias in Automated Decision-Making Systems

We can organize sources of bias in ADM systems into three categories based on where they occur in the ADM system development life cycle: bias in data curation, bias in model creation and bias in model testing and deployment.

Data Curation occurs when data is gathered, labeled and collected into data sets. Data sets are then employed in model creation to help train models to have proper responses to stimuli. Once models are created, they are then tested on new data sets to ensure that they respond appropriately and accurately before they are then deployed for their intended use. Biases can be introduced throughout all the stages of this process.

![Figure 1 description: A flowchart diagram illustrating sources of bias in machine learning data pipelines, flowing left to right. It begins with a "data generation" box feeding into a globe icon labeled "world," where red bold text marks "HISTORICAL BIAS." An arrow leads to a "population definition & sampling" step connecting to a crowd icon labeled "sample," marked with red bold text "REPRESENTATION BIAS." From there, a "measurement" step feeds into a cylinder labeled "dataset," marked with red bold text "MEASUREMENT BIAS." The dataset then flows through "preprocessing, train/test split" and branches into two outputs: "training data" and "test data." A second parallel lower pathway runs from "population definition & sampling" through "measurement" and "preprocessing, train/test split" to a final output labeled "benchmarks." The three bias types — Historical Bias, Representation Bias, and Measurement Bias — are highlighted in red throughout to indicate key failure points in the pipeline.](/assets/primer-photos/ADM/bias/biasOverSystemLifecycle.png)

**Figure 1:** Bias in Data Curation and Model Generation (adapted from Suresh et al.)_[^12]_

## Bias in Data Curation

Bias can be introduced at the very start of the ADM system lifecycle during **data curation**. Data curation is how data is generated, collected, represented, and measured. **Figure 2** below is a visual representation of bias in data curation, the first half of the ADM system lifecycle shown in **Figure 1**.

![Figure 2 description: A left-to-right flowchart showing sources of bias in machine learning data pipelines. Starting from "data generation" and a globe ("world"), the flow passes through population sampling, measurement, and preprocessing stages before splitting into "training data," "test data," and "benchmarks" outputs. Three bias types are labeled in red at key stages: "Historical Bias" at data generation, "Representation Bias" at population sampling, and "Measurement Bias" at measurement.](/assets/primer-photos/ADM/bias/biasInDataGeneration.png)

**Figure 2:** Bias in Data Generation (adapted from Suresh et al.)[^12]

During data curation, developers' decisions about what data to include, how to define variables, and which populations to represent all reflect **structural** factors, such as existing social hierarchies, institutional priorities, and historical inequities. The "structure" that shapes bias can be defined as the broader social, political, and economic context in which the data is produced.

Bias in **data curation** displays itself through **historical bias, representation bias, and measurement bias.** Each of these mechanisms describes a different way that social inequality, exclusion, or distortion can enter a dataset.

### Historical Bias

**Historical bias** occurs when a model's data reflects societal stereotypes. Even if a dataset perfectly reflects reality, it can still be historically biased because it reflects prejudices that exist in the real world.

One example of historical bias is gender bias due to large language models being trained on {data-that-reflects-historical-sexism}.[^4]

#### Statistical vs. Taste-Based discrimination

Historical bias creates the distinction between statistical discrimination and taste-based discrimination.

**Statistical discrimination** occurs in a limited-information environment where agents form expectations based on factors often associated with membership in a certain group.

**Taste-based discrimination** occurs due to an agent's prejudiced group preferences.[^3]

### Representation Bias

**Representation bias** occurs when a model's dataset underrepresents or omits certain groups or attributes. This representation disparity can occur due to skewed sampling, unbalanced inclusion criteria, or limited diversity in the data sources.

**Sampling Bias:** When the method of data collection systematically excludes members of the target population.

* **Example:** A dataset that does not include hyphenated last names being used to train a name-generation model

**{Underrepresentation-bias}:** When the data available on the target population is insufficient to properly train the model.

* **Example:** A dataset being used to train a model identifying cancer from MRI scans that does not have enough scans of rare cancers.

### Measurement Bias

**Measurement bias** arises when a variable is chosen to act as a proxy for prediction of an abstract concept, but the proxy is inherently biased. For example, past credit scores are used as a proxy for fiscal responsibility, but minority groups have been historically denied opportunities to build good credit. If the proxies being used by a model are based on a history of discrimination, they can introduce bias into the model.

* **Example:** A case study on {healthcare-risk-assessment} algorithms demonstrates how using money spent on healthcare as a proxy variable for health need can be biased against groups that systematically spend less on healthcare.[^10]

## Bias in Model Creation

### Model Creation

Bias can also emerge in model creation: the definition of the model architecture and the training of the weights. Engineers may bring their own biases into the design process, deciding which trade-offs to prioritize and which populations to optimize their model for. Figure 3 below is a visual representation of bias in model creation, the second half of the ADM system lifecycle shown in Figure 1\.

![Figure 3 description: A left-to-right flowchart showing sources of bias in the model training and deployment stage of a machine learning pipeline. Training data feeds into "model learning" (labeled "Learning Bias" in red), while test data and benchmarks feed into "evaluation" (labeled "Evaluation Bias" in red). Both, along with a "model definition" step (labeled "Aggregation Bias" in red), feed into a central "model" block. The model then runs to produce a grid-style "model output," which passes through post-processing and human interpretation before reaching a globe icon representing the "world," with this final stage labeled "Deployment Bias" in red.](/assets/primer-photos/ADM/bias/biasInModelTraining.png)

**Figure 3:** Bias in Model Creation (adapted from Suresh et al.)[^12]

### How does bias appear in model creation?

The modeling stage involves countless design choices, so each of these choices can introduce or amplify inequities depending on what the model prioritizes and who it is optimized to serve. Bias in model creation typically appears through four main mechanisms: **aggregation bias, learning bias, evaluation bias, and deployment bias**.

### Aggregation Bias

**Aggregation bias** occurs when distinct groups are treated as homogeneous in a model, even though these populations differ in meaningful ways. Aggregation bias will often lead the model's performance to be unequal across subgroups. In some cases, it can lead to a model that is not optimal for _any_ group, or a model that only works properly for the dominant population.

### Learning Bias

**Learning bias** occurs when a model's encoded priorities make it practical to overlook a minority group. An objective function to evaluate a model's performance, such as accuracy or mean squared error, might be programmed so that a model can succeed by ignoring or excluding a minority group while still performing well according to the objective function.

* **Example:** say a model is given the objective to get the highest percent correct answers guessing people's ages from photographs. If the model is given 100 subjects to attempt to guess their ages and guesses all 90 White people correctly and all 10 Black people incorrectly, the overall level of accuracy would be 90%. Looking just at the model's accuracy, it may seem like the model is performing well. But, when you look closer, it becomes clear that the model is unable to correctly predict age for _any_ Black people. This model is optimizing for the majority population, ignoring minority group errors and exhibiting learning bias.

* **Example:** One {case-study-by-MIT-researchers} found learning bias and historical bias to be present in a now-defunct Amazon hiring software.[^8] This demonstrates how two or more biases can occur simultaneously.

### Evaluation Bias

**Evaluation bias** occurs _after_ model creation, when evaluation benchmark datasets are input to train a model, but they do not represent the user population. Many ADM systems are evaluated on narrow or sanitized datasets, which creates a misleadingly positive picture of model performance. When models perform positively on sanitized datasets, engineers do not work to further improve model performance. When such models are then deployed in more diverse, uncontrolled environments, they perform worse than developers intended.

Researchers have found that facial expression recognition datasets used in model evaluation do not contain the diversity of faces that exist in the target population. This has caused companies to output models that do not correctly recognize diverse faces with a high level of accuracy.[^2] This was discovered by Joy Buolamwini in her MIT thesis {Gender-Shades}.

## Bias in Model Deployment

### Deployment Bias

**Deployment bias** arises after _model creation_, when models are used to solve problems they were never designed to address or towards a population on whose data they were never trained. Even if the model is well-trained and fairly evaluated, it can still produce harmful and discriminatory outcomes when used in an improper way or in a population it was never intended to be used on.

## Conclusion

| Type of Bias        | Definition                                                                                                                                    | When It Occurs                               |
| :------------------ | :-------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| Historical Bias     | When data reflects pre-existing societal inequalities or stereotypes                                                                          | Before data collection and sampling          |
| Representation Bias | When the dataset fails to represent the target population                                                                                     | During data collection and dataset formation |
| Measurement Bias    | When a variable is chosen to act as a proxy for the prediction of an abstract concept, but the proxy does not properly represent the concept. | During data labeling/feature engineering     |
| Aggregation Bias    | When distinct groups are treated as homogeneous                                                                                               | During model design and feature aggregation  |
| Learning Bias       | When a model's encoded priorities make it practical to overlook a minority group                                                              | During model learning                        |
| Evaluation Bias     | When evaluation datasets don't reflect the diversity of user population                                                                       | During testing/validation                    |
| Deployment Bias     | When models are used in contexts different from those they were designed for                                                                  | During deployment/implementation             |


Bias can occur at all stages of the automated decision-making system lifecycle, ranging from how data is generated and measured, how models are optimized and evaluated, to where models are deployed. When creating a model, it is essential to critically examine the data input into a model during training and evaluation, as well as the assumptions you approach the project with. By having an awareness of the ways in which ADM systems become biased and examining our own assumptions, we can build ADM systems that serve target populations effectively and fairly.


[^1]: Barocas, Solon, and Andrew D. Selbst. "Big Data's Disparate Impact." _California Law Review_ 104, no. 3 (2016): 671\. [https://doi.org/10.15779/Z38BG31](https://doi.org/10.15779/Z38BG31).

[^2]: Buolamwini, Joy, and Timnit Gebru. "Gender Shades: Intersectional Accuracy Disparities in Commercial Gender Classification." _Proceedings of Machine Learning Research_ 81 (2018): 1–15. [https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf](https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf).

[^3]: Ewens, Michael, Bryan Tomlin, and Liang Choon Wang. "Statistical Discrimination or Prejudice? A Large Sample Field Experiment." _Review of Economics and Statistics_ 96, no. 1 (March 2014): 119–134. [https://doi.org/10.1162/REST_a_00365](https://doi.org/10.1162/REST_a_00365).

[^4]: Garg, Nikhil, Londa Schiebinger, Dan Jurafsky, and James Zou. "Word Embeddings Quantify 100 Years of Gender and Ethnic Stereotypes." _Proceedings of the National Academy of Sciences_ 115, no. 16 (April 2018): E3635–E3644. [https://doi.org/10.1073/pnas.1720347115](https://doi.org/10.1073/pnas.1720347115).

[^5]: Gil, Yolanda, and Raymond Perrault, co-dirs. _Artificial Intelligence Index Report 2025_. Stanford, CA: Stanford University Human-Centered Artificial Intelligence, 2025\. [https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf](https://hai.stanford.edu/assets/files/hai_ai_index_report_2025.pdf).

[^6]: Hort, Max, Zhenpeng Chen, Jie M. Zhang, Mark Harman, and Federica Sarro. "Bias Mitigation for Machine Learning Classifiers: A Comprehensive Survey." _ACM Journal on Responsible Computing_ 1, no. 2 (2024): 1–52. [https://doi.org/10.1145/3631326](https://doi.org/10.1145/3631326).

[^7]: Huang, Linus Ta-Lun, and Tsung-Ren Huang. "Generative Bias: Widespread, Unexpected, and Uninterpretable Biases in Generative Models and Their Implications." _AI & Society_. Published ahead of print, 2025\. [https://doi.org/10.1007/s00146-025-02533-1](https://doi.org/10.1007/s00146-025-02533-1).

[^8]: Langenkamp, Max, Allan Costa, and Chris Cheung. "Hiring Fairly in the Age of Algorithms." arXiv preprint, arXiv:2004.07132. April 15, 2020\. [https://arxiv.org/abs/2004.07132](https://arxiv.org/abs/2004.07132).

[^9]: Leavy, Susan, Barry O'Sullivan, and Eugenia Siapera. "Data, Power and Bias in Artificial Intelligence." Paper presented at the AI for Social Good Workshop, Harvard CRCS, online, July 20–21, 2020\. [https://crcs.seas.harvard.edu/sites/g/files/omnuum6171/files/crcs/files/ai4sg_2020_paper_81.pdf](https://crcs.seas.harvard.edu/sites/g/files/omnuum6171/files/crcs/files/ai4sg_2020_paper_81.pdf).

[^10]: Obermeyer, Ziad, Brian Powers, Christine Vogeli, and Sendhil Mullainathan. "Dissecting Racial Bias in an Algorithm Used to Manage the Health of Populations." _Science_ 366, no. 6464 (October 25, 2019): 447–453. [https://doi.org/10.1126/science.aax2342](https://doi.org/10.1126/science.aax2342).

[^11]: Sunstein, Cass R. "Algorithms, Correcting Biases." _Social Research: An International Quarterly_ 86, no. 2 (Summer 2019): 499–511. [https://doi.org/10.1353/sor.2019.0024](https://doi.org/10.1353/sor.2019.0024).

[^12]: Suresh, Harini, and John Guttag. "A Framework for Understanding Sources of Harm throughout the Machine Learning Life Cycle." _EAAMO '21: Equity and Access in Algorithms, Mechanisms, and Optimization_, October 5–9, 2021\. [https://doi.org/10.1145/3465416.3483305](https://doi.org/10.1145/3465416.3483305).

## Sidebar

data-that-reflects-historical-sexism:
Heading: Word Embeddings Quantify 100 Years of Gender and Ethnic Stereotypes

When training data is input into a word embedding program, words are assigned vector representations within the multi-dimensional space. Associated words are positioned closer to each other in the high-dimensional vector space as a result of shared context. 

[Garg et. al. (2018)](https://doi.org/10.1073/pnas.1720347115) found that words associated with women are systematically closer to traditionally female occupations, adjectives, and traits than words associated with men are to traditionally female occupations, adjectives, and traits. Similar disparities in distance exist between racial groups and certain occupations, adjectives, and traits. Their work laid the groundwork for subsequent research demonstrating how statistical patterns in training data associated with societal biases can lead to models that encode bias and reproduce it in their output.

Underrepresentation-bias:
Heading: Representation Bias in Image-Generating Software

[Huang and Huang (2025)](https://doi.org/10.1007/s00146-025-02533-1) found that with Generative Adversarial Networks (GANs), a type of image-generating AI software, models will exacerbate societal biases and improperly represent minority groups. For example, if a GAN is asked to create images of engineers, it will overwhelmingly generate images of White males. This is because images of White males were the primary images in the dataset that the model was trained on. In their analysis of AI image-generating software, the models were shown to underrepresent minority groups because the training datasets did not include sufficient representation of minorities.

When datasets overrepresent some demographics and underrepresent others, the resulting model will learn unevenly, performing well for majority groups but poorly for individuals from underrepresented or minority groups.

healthcare-risk-assessment:
Heading: Dissecting racial bias in an algorithm used to manage the health of populations

[Obermeyer et al. (2019)](https://www.science.org/doi/10.1126/science.aax2342) found that to assess patient need, many hospitals use risk assessment software. One variable imputed into risk assessment models is healthcare spending. In the software studied by Obermeyer et. al., healthcare spending was used as a proxy in an algorithm that predicts health need to identify patients who will benefit most from healthcare programs. Because Black patients spend less on healthcare due to socioeconomic and systemic barriers, Black patients at a given risk score are significantly sicker than White patients with the same score. This is an example of measurement bias because the proxy variable, cost, was a poor measure of the target variable, health need.

case-study-by-MIT-researchers:
Heading: Hiring Fairly in the Age of Algorithms

[Langenkamp et. al. (2020)](https://arxiv.org/abs/2004.07132) found that starting in 2014, Amazon used an ADM system to filter through resumes and find the best candidates. However, since the model was optimized to choose the best candidates, and in past hiring data, the majority of good candidates had been male, the model learned to use maleness as an indicator that someone would be a good candidate. This led to a model making hiring decisions that systematically disadvantaged women. 

This study demonstrates learning bias because the model was taught to find the best candidates, so the software came to understand maleness as a factor that contributed to being a good candidate. However, this is simultaneously an example of historical bias, because historical sexism in the field of engineering contributed to the fact that the majority of past engineers hired were male.

Gender-Shades:
Heading: Intersectional Accuracy Disparities in Commercial Gender Classification

[Buolamwini and Gebru (2018)](https://proceedings.mlr.press/v81/buolamwini18a/buolamwini18a.pdf) created a dataset of thousands of pictures of male and female faces drawn from parliament members from across the world with a range of skin tones. They then assessed the efficacy of facial recognition technologies from IBM, Microsoft, and Face++ at recognizing faces and genders. While they found that models had a high level of overall accuracy, when looking at model accuracy by race and gender, they found that the models were only about 65-80% accurate in detecting dark-skinned, female faces as opposed to light-skinned male faces, with which all three models had an over 99% accuracy rate.
