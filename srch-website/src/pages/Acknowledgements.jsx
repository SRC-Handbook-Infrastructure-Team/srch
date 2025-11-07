/**
 * ============================================================================
 * Acknowledgements.jsx (hero-as-overlay version, unified card layout)
 * ----------------------------------------------------------------------------
 * Purpose
 *   Renders the complete Acknowledgements page as a single-page layout with a
 *   hero section (fixed overlay) and a lower content container that slides
 *   over the hero as the user scrolls—mirroring the Home page feel.
 *
 * What’s in this file
 *   • Fixed hero banner (same “overlay” behavior as Home)
 *   • Team member grids for:
 *        - Leadership
 *        - AI
 *        - Privacy
 *        - Accessibility
 *        - Product
 *        - Additional Contributors (User Studies)
 *        - Additional Contributors (Faculty Advisors)
 *   • Footer at the bottom (logo + modules + quick links + feedback)
 *
 * Card behavior (Option 2 - Final)
 *   • If a member has a `photo` (string), we render an <Image>.
 *   • If photo is missing/empty, we render a DIV rectangle placeholder that
 *     matches the card spec (302×296, gray background). The name, pronouns,
 *     and sub-info are displayed below—never overlapping the placeholder.
 *   • Icons (email, LinkedIn, website) only render if the corresponding field
 *     is present. Each icon appears in a 31×30 circular framed button.
 *
 * Data contract with team.json
 *   • The `team` field determines which section a person appears in:
 *        - "leadership" | "ai" | "privacy" | "accessibility" | "product"
 *        - "additional" (Additional Contributors - User Studies)
 *        - "additional_faculty" (Additional Contributors - Faculty Advisors)
 *   • The `active` field controls whether someone is listed under “Active”
 *     or “Past Members” within a section (true/false as string).
 *   • Fields used: name, pronouns, position, degree, gradYear, email,
 *     linkedin, website, photo, team, active.
 *
 * Styling
 *   • All visual styling comes from Acknowledgements.css.
 *   • Critical classes: .ack-card, .ack-card-photo, .ack-photo-placeholder,
 *     .ack-card-name, .ack-card-fullname, .ack-card-pronouns, .ack-card-subinfo,
 *     .ack-card-icons, .ack-icon-btn, .ack-hero, .ack-lower-content, .line-divider,
 *     .link-section, .logo-area, .footer-logo, .modules (…and its variants).
 *
 * Notes
 *   • This file deliberately keeps presentational logic minimal and relies on
 *     CSS for consistent sizing/spacing to match Figma.
 *   • Grids are responsive via Chakra’s <SimpleGrid> (1–3 columns).
 *   • Footer section is an exact structural match to Home so both pages align.
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

// Footer assets (shared with Home)
import logoImage from "../assets/logo.png";
import privacyIcon from "../assets/privacy-icon.jpg";
import automatedIcon from "../assets/automated.png";
import aiIcon from "../assets/ai-icon.png";
import accessibilityIcon from "../assets/accessibility-icon.png";

// Data
import team from "../team.json";

/* =============================================================================
 * TeamGrid
 * -----------------------------------------------------------------------------
 * Renders a grid of team member cards with consistent formatting.
 * - Sorting is alphabetical by name for stability
 * - Each card:
 *     1) Photo or gray rectangle placeholder (302×296)
 *     2) Name + Pronouns
 *     3) Position | Degree, GradYear
 *     4) Action icons (email/linkedin/website) if present
 * - All spacing, font sizes, and icon dims are handled via CSS classes.
 * ===========================================================================*/
function TeamGrid({ filteredTeam }) {
  const sortedTeam = [...filteredTeam].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {sortedTeam.map((member, idx) => {
        const hasPhoto =
          typeof member.photo === "string" && member.photo.trim().length > 0;

        return (
          <Box key={`${member.name}-${idx}`} className="ack-card">
            {/* --- Photo region (image or placeholder rectangle) --- */}
            {hasPhoto ? (
              <Image
                className="ack-card-photo"
                src={`/srch-s25/assets/member-photos/${member.photo}`}
                alt={member.name}
              />
            ) : (
              <div className="ack-card-photo ack-photo-placeholder" aria-hidden="true" />
            )}

            {/* --- Name + Pronouns row --- */}
            <div className="ack-card-name">
              <span className="ack-card-fullname">{member.name}</span>
              {member.pronouns && member.pronouns.trim() !== "" && (
                <span className="ack-card-pronouns">{member.pronouns}</span>
              )}
            </div>

            {/* --- Role | Degree, GradYear --- */}
            <div className="ack-card-subinfo">
              {member.position}
              {member.degree && member.degree.trim() !== "" && ` | ${member.degree}`}
              {member.gradYear && member.gradYear.trim() !== "" && `, ${member.gradYear}`}
            </div>

            {/* --- Icon row (conditionally renders each icon) --- */}
            <div className="ack-card-icons">
              {member.email && member.email.trim() !== "" && (
                <a
                  href={`mailto:${member.email}`}
                  className="ack-icon-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Email ${member.name}`}
                  title={`Email ${member.name}`}
                >
                  <MdEmail size={16} />
                </a>
              )}

              {member.linkedin && member.linkedin.trim() !== "" && (
                <a
                  href={member.linkedin}
                  className="ack-icon-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name} on LinkedIn`}
                  title="LinkedIn"
                >
                  <FaLinkedin size={16} />
                </a>
              )}

              {member.website && member.website.trim() !== "" && (
                <a
                  href={member.website}
                  className="ack-icon-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${member.name}'s website`}
                  title="Website"
                >
                  <FaExternalLinkAlt size={16} />
                </a>
              )}
            </div>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

/* =============================================================================
 * TeamSection
 * -----------------------------------------------------------------------------
 * Wraps a single team into a titled block. Supports “Active” vs “Past Members”
 * using the string flags "true"/"false" in `active`.
 * - If the team has no members, returns null (no section header).
 * - The divider at the end visually separates sections.
 * ===========================================================================*/
function TeamSection({ title, teamName }) {
  const members = team.filter((m) => m.team === teamName);
  if (members.length === 0) return null;

  const active = members.filter((m) => String(m.active).toLowerCase() === "true");
  const inactive = members.filter((m) => String(m.active).toLowerCase() === "false");

  return (
    <>
      <Heading as="h2" size="xl" mt={14} mb={6}>
        {title}
      </Heading>

      {/* Active members */}
      <TeamGrid filteredTeam={active.length > 0 ? active : members} />

      {/* Past members (only if present and distinct) */}
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

/* =============================================================================
 * Acknowledgements (Default Export)
 * -----------------------------------------------------------------------------
 * Assembles the page:
 *   1) NavBar
 *   2) Hero overlay (fixed background gradient with headline)
 *   3) Lower content that scrolls over hero:
 *        - All team sections (as card grids)
 *        - Two "Additional Contributors" sections as cards:
 *            • User Studies  (team === "additional")
 *            • Faculty Advisors (team === "additional_faculty")
 *        - Footer (logo + modules + quick links + feedback)
 *
 * This implementation ensures “Additional” entries render as full cards using
 * the same styling and placeholder behavior as core teams.
 * ===========================================================================*/
export default function Acknowledgements() {
  const navigate = useNavigate();

  // Slugs borrowed from Home to keep navigation consistent
  const privacySlug = "/privacy/whatIsPrivacy";
  const accessibilitySlug = "/accessibility/whatIsAccessibility";
  const decisionSlug = "/automatedDecisionMaking/fairness";
  const aiSlug = "/generativeAI/copyright";

  return (
    <>
      {/* Global site navigation */}
      <NavBar />

      {/* 1) Fixed hero (visual overlay). Behavior matches Home’s upper-content.
          The actual size/scroll handoff is controlled in Acknowledgements.css:
          - .ack-hero (position: fixed; background image)
          - .ack-lower-content (margin-top: Nvh to start after the hero)
      */}
      <div className="ack-hero">
        <div className="upper-text-section">
          <div className="website-title">Meet Our Team</div>
          {/* Optional supporting copy under the heading (kept empty for now) */}
          <div className="info-section"></div>
        </div>
      </div>

      {/* 2) Lower content that “slides” over the hero */}
      <div className="ack-lower-content">
        {/* Core teams */}
        <TeamSection title="Leadership" teamName="leadership" />
        <TeamSection title="AI Team" teamName="ai" />
        <TeamSection title="Privacy Team" teamName="privacy" />
        <TeamSection title="Accessibility Team" teamName="accessibility" />
        <TeamSection title="Product Team" teamName="product" />

        {/* Additional Contributors — now as full cards (no longer plain text) */}
        <TeamSection
          title="Additional Contributors — User Studies"
          teamName="additional"
        />
        <TeamSection
          title="Additional Contributors — Faculty Advisors"
          teamName="additional_faculty"
        />

        {/* Visual divider before footer */}
        <div className="line-divider"></div>

        {/* 3) Footer (structurally mirrors Home’s link-section block) */}
        <div className="link-section">
          {/* Logo column */}
          <div className="logo-area">
            <img
              src={logoImage}
              alt="SRC Handbook Logo"
              className="footer-logo"
            />
          </div>

          {/* Modules column */}
          <div className="modules">
            <div className="modules-heading">Modules</div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={privacyIcon} alt="Privacy Icon" />
              </div>
              <button onClick={() => navigate(privacySlug)} className="module-link">
                Privacy
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={accessibilityIcon} alt="Accessibility Icon" />
              </div>
              <button onClick={() => navigate(accessibilitySlug)} className="module-link">
                Accessibility
              </button>
            </div>

            <div className="primer-link">
              <div className="primer-link-photo">
                <img src={automatedIcon} alt="Automated Decision Making Icon" />
              </div>
              <button onClick={() => navigate(decisionSlug)} className="module-link">
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

          {/* Quick links column */}
          <div className="modules">
            <div className="module-heading">Quick Links</div>
            <div className="module-links">
              <button onClick={() => navigate("/about")} className="module-link">
                About
              </button>
              <button onClick={() => navigate("/acknowledgements")} className="module-link">
                Acknowledgements
              </button>
            </div>
          </div>

          {/* Feedback column */}
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
