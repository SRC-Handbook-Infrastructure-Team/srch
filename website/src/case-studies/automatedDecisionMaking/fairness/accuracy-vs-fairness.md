---
title: "Case Study: Accuracy vs. Fairness"
tags: ["automatedDecisionMaking", "fairness"]
---

#### Domain:

Criminal Justice

#### Study:

“[Fairness in Criminal Justice Risk Assessments: The State of the Art](https://arxiv.org/abs/1703.09207)” by Berk et al. (2017) [^4]

#### Summary:

This study examines how different definitions of algorithmic fairness apply to criminal justice risk assessment tools, including systems that predict reoffending risk to guide bail, parole, or sentencing decisions. They show empirically that when base rates differ across demographic groups, achieving statistical fairness typically requires reducing predictive accuracy. Enforcing fairness constraints can shift decision thresholds, altering false positive and false negative rates and producing less precise predictions overall. Trade-off illustrated: The study demonstrates that optimizing purely for accuracy tends to reproduce historical disparities present in the data, while optimizing for fairness may lower overall predictive performance. Balancing these goals requires explicitly deciding how much accuracy one is willing to sacrifice for fairer outcomes, again making fairness a normative and policy choice instead of a purely technical parameter.

[^4]: Berk, Richard, Hoda Heidari, Shahin Jabbari, Michael Kearns, and Aaron Roth. "Fairness in Criminal Justice Risk Assessments: The State of the Art." _Sociological Methods & Research_ 50, no. 1 (2021): 3–44. [https://doi.org/10.1177/0049124118782533](https://doi.org/10.1177/0049124118782533).
