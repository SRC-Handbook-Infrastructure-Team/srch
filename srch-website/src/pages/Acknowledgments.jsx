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
 *   • Hero banner
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
 *

 *
 * Styling
 *   • All visual styling comes from Acknowledgements.css.
 *   • Critical classes: .ack-card, .ack-card-photo, .ack-photo-fallback,
 *     .ack-card-name, .ack-card-fullname, .ack-card-pronouns, .ack-card-subinfo,
 *     .ack-card-icons, .ack-icon-btn, .ack-hero, .ack-lower-content, .line-divider,
 *     .link-section, .logo-area, .footer-logo, .modules (…and its variants).
 *
 * ============================================================================
 */

import "../styles/Acknowledgments.css";

import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { Heading, Divider } from "@chakra-ui/react";
import { useState } from "react";
import team from "../team.json";

/* =============================================================================
 * Utilities
 * -----------------------------------------------------------------------------
 * Centralize how we compute an image src so it’s easy to swap storage paths.
 * ===========================================================================*/
function getMemberPhotoSrc(member) {
  // Current convention: files isrch/srch/assets/member-photos
  // Examplsrchsh.jpg" -> "/srch/assets/member-photos/suresh.jpg"
  return `assets/member-photos/${member.photo}`;
}

/* =============================================================================
 * TeamGrid
 * -----------------------------------------------------------------------------
 * Renders a grid of team member cards with consistent formatting.
 * - Sorting is alphabetical by name for stability
 * - Each card:
 *     1) Photo (masked by ../src/assets/Photo.png) or masked gray placeholder
 *     2) Name + Pronoun
 *     3) Position | Degree, GradYear
 *     4) Action icons (email/linkedin/website) if present
 * - All spacing, font sizes, and icon dims are handled via CSS classes.
 *
 * ===========================================================================*/
function TeamGrid({ filteredTeam, teamName }) {
  const isLeadership = String(teamName || "").toLowerCase() === "leadership";

  const sortedTeam = [...filteredTeam].sort((a, b) => {
    const aPosition = String(a.position || "").toLowerCase();
    const bPosition = String(b.position || "").toLowerCase();

    const aIsProjectDirector = aPosition.includes("project director");
    const bIsProjectDirector = bPosition.includes("project director");

    if (isLeadership && aIsProjectDirector !== bIsProjectDirector) {
      return aIsProjectDirector ? -1 : 1;
    }

    const aIsLead = aPosition.includes("lead");
    const bIsLead = bPosition.includes("lead");

    if (aIsLead !== bIsLead) return aIsLead ? -1 : 1;

    return a.name.localeCompare(b.name);
  });

  return (
    <div className="ack-grid">
      {sortedTeam.map((member, idx) => {
        const hasPhoto =
          typeof member.photo === "string" && member.photo.trim().length > 0;
        const photoSrc = hasPhoto ? getMemberPhotoSrc(member) : null;

        return (
          <div key={`${member.name}-${idx}`} className="ack-card">
            {photoSrc ? (
              <img
                className="ack-card-photo"
                src={photoSrc}
                alt={member.name}
                loading="lazy"
                decoding="async"
              />
            ) : (
              <div
                className="ack-card-photo ack-photo-fallback"
                aria-hidden="true"
              />
            )}

            <div className="ack-card-name">
              <span className="ack-card-fullname">{member.name}</span>
              {member.pronouns && member.pronouns.trim() !== "" && (
                <span className="ack-card-pronouns">{member.pronouns}</span>
              )}
            </div>

            <div className="ack-card-subinfo">
              {member.position}
              {member.degree &&
                member.degree.trim() !== "" &&
                ` | ${member.degree}`}
              {member.gradYear &&
                member.gradYear.trim() !== "" &&
                `, ${member.gradYear}`}
            </div>

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
          </div>
        );
      })}
    </div>
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
  const targetTeam = String(teamName || "").toLowerCase();
  const members = team.filter(
    (m) => String(m.team || "").toLowerCase() === targetTeam,
  );
  if (members.length === 0) return null;

  const [showPast, setShowPast] = useState(false);

  const active = members.filter(
    (m) => String(m.active).toLowerCase() === "true",
  );
  const inactive = members.filter(
    (m) => String(m.active).toLowerCase() === "false",
  );

  return (
    <div className="team-section">
      <Heading
        as="h2"
        size="xl"
        mt={14}
        mb={6}
        className="team-section-heading"
      >
        {title}
      </Heading>

      {/* Active members */}
      <TeamGrid
        filteredTeam={active.length > 0 ? active : members}
        teamName={teamName}
      />

      {inactive.length > 0 && (
        <>
          <button
            type="button"
            className="team-section-toggle"
            onClick={() => setShowPast((prev) => !prev)}
            aria-expanded={showPast}
            aria-controls={`${targetTeam}-past-members`}
          >
            <span className={`team-section-caret ${showPast ? "open" : ""}`}>
              ▸
            </span>
            {showPast ? "Hide past members" : "Show past members"}
          </button>

          {showPast && (
            <div id={`${targetTeam}-past-members`}>
              <Heading
                as="h3"
                size="lg"
                mt={6}
                mb={4}
                className="team-section-heading"
              >
                Past Members
              </Heading>
              <TeamGrid filteredTeam={inactive} teamName={teamName} />
            </div>
          )}
        </>
      )}
    </div>
  );
}

/* =============================================================================
 * Acknowledgements (Default Export)
 * -----------------------------------------------------------------------------
 * Assembles the page:
 *   1)  Hero overlay
 *   2) Lower content that scrolls over hero:
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
  return (
    <>

      {/* Behavior matches Home’s upper-content.
          The actual size/scroll handoff is controlled in Acknowledgements.css:
          - .ack-hero (position: fixed; background image)
          - .ack-lower-content (margin-top: Nvh to start after the hero)
      */}
      <div className="upper-content">
        <div className="upper-text-section">
          <div className="website-title">Meet our Team!</div>
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
      </div>
    </>
  );
}
