# Three Criteria for Group Fairness
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