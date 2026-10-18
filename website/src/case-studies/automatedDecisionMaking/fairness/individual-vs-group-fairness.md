---
title: "Case Study: Individual vs. Group Fairness"
tags: ["automatedDecisionMaking", "fairness"]
---

#### Domain:

General predictive classification tasks
Study: [“A Unified Approach to Quantifying Algorithmic Unfairness: Measuring Individual & Group Unfairness via Inequality Indices”](https://doi.org/10.48550/arXiv.1807.00787) by Speicher et al. (2018) [^5]

#### Summary:

This paper proposes a quantitative framework that measures unfairness using economic inequality indices. They define “benefit” values for individuals based on algorithmic outcomes and decompose overall unfairness into between-group (group unfairness) and within-group (individual unfairness) components. Through experiments, they show that optimizing for group-level parity can unintentionally increase within-group inequality, meaning individuals inside the same group are treated less consistently. Trade-off illustrated: Pursuing group fairness improves equality between demographic groups but can worsen fairness within those groups. The study demonstrates that no algorithm can simultaneously optimize both.

[^5]: Speicher, Till, Hoda Heidari, Nina Grgic-Hlaca, Krishna P. Gummadi, Adish Singla, Adrian Weller, and Muhammad Bilal Zafar. "A Unified Approach to Quantifying Algorithmic Unfairness: Measuring Individual & Group Unfairness via Inequality Indices." In _Proceedings of the 24th ACM SIGKDD International Conference on Knowledge Discovery & Data Mining_, edited by Yike Guo and Faisal Farooq, 2239–2248. New York: ACM, 2018\. [https://doi.org/10.1145/3219819.3220046](https://doi.org/10.1145/3219819.3220046).
