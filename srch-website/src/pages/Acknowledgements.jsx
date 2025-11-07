/**
 * ============================================================================
 * Acknowledgements.jsx (hero-as-overlay version)
 * ----------------------------------------------------------------------------
 * This version mirrors the Home page structure:
 *   • Fixed full-viewport hero (gradient + title/description)
 *   • “Lower content” wrapper that starts after the hero via margin-top: 100vh
 *   • Same footer (logo + modules + quick links + feedback)
 * ============================================================================
 */

import "../Acknowledgements.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import {
  Text,
  Heading,
  SimpleGrid,
  Box,
  Image,
  Divider,
} from "@chakra-ui/react";
import NavBar from "../components/NavBar";
import { useNavigate } from "react-router-dom";

// assets used in footer (same as Home)
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.jpg";
import automatedIcon from "../assets/automated.png";
import aiIcon from "../assets/ai-icon.png";
import accessibilityIcon from "../assets/accessibility-icon.png";

import team from "../team.json";

/* ---------- small helpers from your previous version ---------- */
function TeamGrid({ filteredTeam }) {
  const sortedTeam = [...filteredTeam].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {sortedTeam.map((member, idx) => (
        <Box key={`${member.name}-${idx}`} className="ack-card">
          <Image
            className="ack-card-photo"
            src={
              member.photo
                ? `/srch-s25/assets/member-photos/${member.photo}`
                : `/srch-s25/assets/member-photos/temp-photo.jpg`
            }
            alt={member.name}
          />

          <div className="ack-card-name">
            <span className="ack-card-fullname">{member.name}</span>
            {member.pronouns && (
              <span className="ack-card-pronouns">{member.pronouns}</span>
            )}
          </div>

          <div className="ack-card-subinfo">
            {member.position}
            {member.degree && ` | ${member.degree}`}
            {member.gradYear && `, ${member.gradYear}`}
          </div>

          <div className="ack-card-icons">
            {member.email && (
              <a
                href={`mailto:${member.email}`}
                className="ack-icon-btn"
                target="_blank"
              >
                <MdEmail size={16} />
              </a>
            )}
            {member.linkedin && (
              <a href={member.linkedin} className="ack-icon-btn" target="_blank">
                <FaLinkedin size={16} />
              </a>
            )}
            {member.website && (
              <a href={member.website} className="ack-icon-btn" target="_blank">
                <FaExternalLinkAlt size={16} />
              </a>
            )}
          </div>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function TeamSection({ title, teamName }) {
  const members = team.filter((m) => m.team === teamName);
  const active = members.filter((m) => m.active === "true");
  const inactive = members.filter((m) => m.active === "false");
  if (members.length === 0) return null;

  return (
    <>
      <Heading as="h2" size="xl" mt={14} mb={6}>
        {title}
      </Heading>

      <TeamGrid filteredTeam={active} />

      {inactive.length > 0 && (
        <>
          <Heading as="h3" size="lg" mt={10} mb={4}>
            Past Members
          </Heading>
          <TeamGrid filteredTeam={inactive} />
        </>
      )}

      <Divider my={12} />
    </>
  );
}

function ContributorsSection() {
  const contributors = team
    .filter((m) => m.team === "additional")
    .sort((a, b) => a.name.localeCompare(b.name));

  const faculty = team
    .filter((m) => m.team === "additional_faculty")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Heading as="h2" size="xl" mt={12} mb={6}>
        Additional Contributors
      </Heading>

      <Heading as="h3" size="lg" mt={4} mb={2}>
        User Studies
      </Heading>
      {contributors.map((member, i) => (
        <Text key={i}>
          {member.name}, <i>{member.position}</i>
        </Text>
      ))}

      <Heading as="h3" size="lg" mt={8} mb={2}>
        Faculty Advisors
      </Heading>
      {faculty.map((member, i) => (
        <Text key={i}>
          {member.name}, <i>{member.position}</i>
        </Text>
      ))}
    </>
  );
}

/* ==============================
   Default export: full page
   ============================== */
export default function Acknowledgements() {
  const navigate = useNavigate();

  // same slugs as Home
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";

  return (
    <>
      <NavBar />

      {/* 1) FIXED HERO (like Home’s .upper-content) */}
      <div className="ack-hero">
        <div className="upper-text-section">
          <div className="website-title">Meet Our Team</div>
          <div className="info-section">
          </div>
        </div>
      </div>

      {/* 2) LOWER CONTENT starts AFTER the hero (slides over it) */}
      <div className="ack-lower-content">
        {/* Team sections */}
        <TeamSection title="Leadership" teamName="leadership" />
        <TeamSection title="AI Team" teamName="ai" />
        <TeamSection title="Privacy Team" teamName="privacy" />
        <TeamSection title="Accessibility Team" teamName="accessibility" />
        <TeamSection title="Product Team" teamName="product" />

        <ContributorsSection />

        {/* Divider + Footer (identical structure to Home) */}
        <div className="line-divider"></div>

        <div className="link-section">
          <div className="logo-area">
            <img src={logoImage} alt="SRC Handbook Logo" className="footer-logo" />
          </div>

          <div className="modules">
            <div className="modules-heading">Modules</div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={privacyIcon} alt="Privacy Icon" />
              </div>
              <button
                onClick={() => navigate(privacySlug)}
                className="module-link"
              >
                Privacy
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={accessibilityIcon} alt="Accessibility Icon" />
              </div>
              <button
                onClick={() => navigate(accessibilitySlug)}
                className="module-link"
              >
                Accessibility
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={automatedIcon} alt="Automated Decision Making Icon" />
              </div>
              <button
                onClick={() => navigate(decisionSlug)}
                className="module-link"
              >
                Automated Decision Making
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={aiIcon} alt="Generative AI Icon" />
              </div>
              <button onClick={() => navigate(aiSlug)} className="module-link">
                Generative AI
              </button>
            </div>
          </div>

          <div className="modules">
            <div className="module-heading">Quick Links</div>
            <div className="module-links">
              <button onClick={() => navigate("/about")} className="module-link">
                About
              </button>
              <button
                onClick={() => navigate("/acknowledgements")}
                className="module-link"
              >
                Acknowledgements
              </button>
            </div>
          </div>

          <div className="modules">
            <div className="module-heading">Have Feedback?</div>
            <p className="feedback-contact">
              Contact:{" "}
              <a href="mailto:src_handbook@brown.edu">src_handbook@brown.edu</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
