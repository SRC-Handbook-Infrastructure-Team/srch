import "../styles/Acknowledgments.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";
import { Heading } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import team from "../team.json";

function getMemberPhotoSrc(member) {
  return `/assets/member-photos/${member.photo}`;
}
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
            {photoSrc && (
              <img
                className="ack-card-photo"
                src={photoSrc}
                alt={member.name}
                decoding="async"
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

function Acknowledgments() {
  const [theme, setTheme] = useState("light");
  useEffect(() => {
    const root = document.documentElement;
    if (!root) return;
    const storedTheme = window.localStorage.getItem("srch-theme");
    const prefersDark =
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches;
    const initialTheme =
      storedTheme === "light" || storedTheme === "dark"
        ? storedTheme
        : prefersDark
          ? "dark"
          : "light";
    setTheme(initialTheme);
    root.setAttribute("data-theme", initialTheme);
  }, []);

  return (
    <>
      <div className="upper-content">
        <div className="upper-text-section">
          <div className="website-title">Meet our team!</div>
          <div className="info-section">
            This handbook is the result of a collaborative effort across
            disciplines. We are grateful to the individuals whose insights,
            feedback, and support shaped its development.
          </div>
        </div>
      </div>
      <div className="ack-lower-content">
        <TeamSection title="Leadership" teamName="leadership" />
        <TeamSection title="Product Team" teamName="product" />
        <TeamSection title="Accessibility Team" teamName="accessibility" />
        <TeamSection title="AI Team" teamName="ai" />
        <TeamSection title="Privacy Team" teamName="privacy" />
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

export default Acknowledgments;
