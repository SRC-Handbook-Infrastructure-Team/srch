---
title: "Case Study: Separation vs. Sufficiency"
tags: ["automatedDecisionMaking", "fairness"]
---

#### Domain:

Insurance (premium pricing / risk prediction)

#### Study:

[“An Ethical Argument for a Group Fairness Definition Insurers Can Use”](https://link.springer.com/article/10.1007/s13347-023-00624-9) by Baumann & Loi (2023) [^3]

#### Summary:

The authors examine algorithmic risk scoring for insurance premiums and argue that the most appropriate fairness metric in this domain is sufficiency (calibration), so a predicted risk score should mean the same thing across demographic groups. They critique both independence and separation as normatively and mathematically ill-fitting for insurance. Why sufficiency was chosen: In insurance, predicted risk scores are used to set premiums or underwriting decisions; thus, fairness demands that those scores correspond to actual risk equivalently for all groups. Focusing on separation (equal error rates) could force distortions in the calibration of risk scores—undermining the actuarial validity of pricing. Trade-off illustrated: By choosing sufficiency, the authors accept that error rates or outcome distributions might differ across groups. This reinforces how the fairness criterion selection is a technical decision that encodes value judgments about what fairness means in that domain.

[^3]: Baumann, Joachim, and Michele Loi. "Fairness and Risk: An Ethical Argument for a Group Fairness Definition Insurers Can Use." _Philosophy & Technology_ 36, no. 3 (2023): 45\. [https://doi.org/10.1007/s13347-023-00624-9](https://doi.org/10.1007/s13347-023-00624-9).
