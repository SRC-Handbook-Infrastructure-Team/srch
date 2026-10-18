---
title: "Case Studies: Improved CAPTCHA Techniques"
tags: ["accessibility", "intersectionsWithOtherValues"]
---

Due to a number of problems with existing CAPTCHAs, including inaccessibility and poor efficacy, Google has been working to develop [improved forms of CAPTCHAs](https://developers.google.com/recaptcha/docs/versions) that record and analyze the behavior of website users to determine if they are human. Some of these upgrades to the system have been improvements to accessibility, allowing users with visual and/or hearing impairments to easily complete CAPTCHA tasks.

However, these upgraded CAPTCHAs can continue to raise accessibility concerns. For example, Google's reCAPTCHA v2 asked users to click a checkbox, recording their actions as they did so. This task still renders these CAPTCHAs inaccessible for some groups. For example, visually impaired users often prefer keyboard navigation to the use of a mouse, which is more likely to be detected by the test as automated behavior. In addition, the fallback to these systems remains traditional CAPTCHAs, adding more layers of barriers rather than removing them.

More recent work by Google with their 'reCAPTCHA v3,' which tracks and analyzes user behavior _without_ the additional checkbox-marking challenge, has been more successful in making CAPTCHA accessible. In their 2022 study, Gaggi found that there was no clear influence of visual impairment on ability to pass these new tests, with a success rate of 99.42% across all groups.[^15]

[^15]: Gaggi, Ombretta. "A Study on Accessibility of Google ReCAPTCHA Systems." In _Proceedings of the 2022 Workshop on Open Challenges in Online Social Networks_, 25–30. 2022. https://doi.org/10.1145/3524010.3539498.
