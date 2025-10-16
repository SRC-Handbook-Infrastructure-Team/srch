---
title: Intersections with Other Core Values
order: 2
final: false
---

# Intersections with Other Core Values

Designing technology solutions that ensure privacy, security, accessibility, and usability often requires a balancing act. The case studies below illustrate how these values intersect—sometimes creating tension, and at other times offering opportunities for innovation. Click on each sidebar button to view the full details of that case study.

---

## Case Studies

#### 1. {ASR-vs-User-Privacy}

---

#### 2. {CAPTCHA-Tests-vs-Security-and-Accessibility}

---

#### 3. {MFA-vs-Accessibility}

---

#### 4. {Screen-Readers-vs-Privacy}

---

#### 5. {Document-Accessibility-vs-Privacy-Protections}

## All Sidebar Content Below
ASR-vs-User-Privacy:
Heading: ASR vs. User Privacy
**Overview:** <br />Voice AI devices like smart assistants use Automatic Speech Recognition (ASR) to improve user experience. However, the constant listening required for activation commands raises privacy concerns, as unintended data collection can capture sensitive personal information such as age, gender, and emotional state. This data is susceptible to unauthorized access and misuse, including the potential for voice cloning. <br /> <br /> **Challenges Include:** <br />- Unintended data capture through continuous listening <br />- Risks of unauthorized access and misuse (e.g., targeted advertising or fraudulent impersonation) <br /> <br />**Sources:** <br />_[Victoria University article](https://ojs.victoria.ac.nz/wfeess/article/view/7646/6827) <br /> _[Wired coverage on smart assistants](https://www.wired.com/story/whos-listening-talk-google-assistant/)

CAPTCHA-Tests-vs-Security-and-Accessibility: 
Heading: CAPTCHA vs. Security and Accessibility
**Overview:** <br />CAPTCHA tests distinguish human users from bots and enhance online security. However, traditional visual CAPTCHAs can be inaccessible for users with visual impairments, while audio CAPTCHA alternatives may pose challenges for those with hearing disabilities. These accessibility gaps can force users to adopt insecure workarounds, such as third-party CAPTCHA solvers, which introduce additional vulnerabilities. <br /> <br /> **Challenges Include:** <br /> - Accessibility barriers in both visual and audio CAPTCHA implementations <br />- Increased risk of security breaches when users resort to workarounds <br /> <br /> **Sources:** <br /> - [A11y Collective on accessible CAPTCHA](https://www.a11y-collective.com/blog/accessible-captcha/) <br /> - [W3C documentation on human verification (Turing tests)](https://www.w3.org/TR/turingtest/)

MFA-vs-Accessibility:
Heading: MFA vs. Accessibility 
**Overview:** <br /> Multi-Factor Authentication (MFA) greatly enhances security by requiring multiple steps for identity verification. Yet, various MFA methods can exclude users with disabilities. For instance, time-based one-time passwords (TOTPs) may be challenging for those with cognitive impairments, and audio or visual methods might not be accessible to all. In some cases, users disable MFA to overcome these barriers, potentially lowering their overall security.<br /> <br /> **Challenges Include:**<br />- Difficulties for users with cognitive, visual, or auditory impairments<br />- Security risks when users opt to disable MFA due to accessibility challenges.<br /><br />**Sources:**

- [CrowdStrike on MFA](https://www.crowdstrike.com/en-us/cybersecurity-101/identity-protection/multifactor-authentication-mfa/)
- [IALabs discussion on accessibility challenges in MFA](https://ialabs.ie/accessibility-challenges-in-mfa/)
- [Microsoft’s guidance on accessible authentication methods](https://learn.microsoft.com/en-us/entra/identity/authentication/accessibility/authentication-methods-accessibility)

Screen-Readers-vs-Privacy:
Heading: Screen Readers v. Privacy: 
**Overview:** <br />Screen readers are essential for users with visual impairments, converting on-screen text into speech or braille. Yet, when these tools read sensitive information (such as passwords or financial details) aloud in public, there’s a risk of privacy breaches. Additionally, some screen readers might not effectively convey security warnings, leaving users vulnerable to phishing or other attacks. <br /><br />**Challenges Include:** <br />- Unintended disclosure of sensitive information in public settings <br />- Insufficient delivery of security-related messages by the screen reader
<br /><br />**Sources:**<br />- [Research from Indiana University](https://vision.soic.indiana.edu/papers/impairments2015chi.pdf)
<br />- [Florian Alt’s analysis on screen reader vulnerabilities](https://www.florian-alt.org/unibw/wp-content/publications/janeiro2024ieeesp.pdf)

Document-Accessibility-vs-Privacy-Protections:
Heading: Document Accessibility vs. Privacy Protections
**Overview:** <br />Enhancing digital document accessibility—through searchable PDFs or Optical Character Recognition (OCR)—can sometimes lead to unintentional privacy risks. For example, metadata embedded in documents or data extracted via OCR may reveal sensitive personal information. This case study highlights the need for privacy-preserving accessibility measures, such as metadata redaction and controlled access.<br /><br />**Challenges Include:** <br />- Exposure of sensitive metadata from accessible public records <br />- Potential privacy risks from automated OCR processes<br /><br />**Sources:** <br />- [Microsoft’s guide to OCR data privacy and security](https://learn.microsoft.com/en-us/legal/cognitive-services/computer-vision/ocr-data-privacy-security)<br />- [Smallpdf on mitigating PDF metadata risks](https://smallpdf.com/blog/security-risks-with-pdf-metadata-and-how-to-mitigate-them)