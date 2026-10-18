---
title: "Case Study: Independence vs. Separation"
tags: ["automatedDecisionMaking", "fairness"]
---

#### Domain:

Lending (loan approvals)

#### Study:

[“Equality of Opportunity in Supervised Learning”](https://arxiv.org/pdf/1610.02413) by Hardt, Price & Srebro (2016) [^2]

#### Summary:

The authors present a post-processing method for classifiers that adjusts decision thresholds group-by-group so as to equalize false-positive and false-negative rates across groups. Essentially, they enforce the separation criterion (equal error rates) rather than the independence criterion (equal approval rates irrespective of group).

#### Why separation was chosen:

In the lending context, the authors argue that it is unfair if one demographic group faces systematically higher error rates (e.g., being wrongly denied or wrongly approved) even if the overall approval rate is the same. Prioritizing equal error rates ensures more equitable treatment conditional on “would repay” vs “would default.”

#### Trade-off illustrated:

By choosing separation, the authors implicitly accept differences in approval rates across groups (thus violating independence). This shows how the technical choice of fairness metric reflects a policy decision about whether we care more about outcome-parity or error-parity.

[^2]: Hardt, Moritz, Eric Price, and Nathan Srebro. "Equality of Opportunity in Supervised Learning." In _Advances in Neural Information Processing Systems 29_, edited by D. Lee, M. Sugiyama, U. Luxburg, I. Guyon, and R. Garnett. Curran Associates, Inc., 2016\. [https://arxiv.org/abs/1610.02413](https://arxiv.org/abs/1610.02413)
