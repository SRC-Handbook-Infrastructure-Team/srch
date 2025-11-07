/**
 * ---------------------------------------------------------------------------
 *  Acknowledgements.jsx
 * ---------------------------------------------------------------------------
 *  This file renders the FULL acknowledgements page as a **single page**.
 *
 *  ✅ Includes:
 *     - Leadership
 *     - AI
 *     - Privacy
 *     - Accessibility
 *     - Product
 *     - Additional Contributors + Faculty Advisors
 *
 *  ✅ Uses Chakra UI layout for spacing but all card visuals
 *     come from **Acknowledgements.css** using classes:
 *         - .ack-card
 *         - .ack-card-photo
 *         - .ack-card-name
 *         - .ack-card-fullname
 *         - .ack-card-pronouns
 *         - .ack-card-subinfo
 *         - .ack-card-icons
 *         - .ack-icon-btn
 *
 *  ✅ Produces pixel-perfect cards based on your Figma specs:
 *        • 302 × 296 card
 *        • 188px photo
 *        • Pronouns #00000085
 *        • 20px / 600 name font
 *
 *  The file is structured into:
 *      1. TeamGrid (card renderer)
 *      2. TeamSection (section wrapper)
 *      3. ContributorsSection (additional contributors)
 *      4. Acknowledgements (full page export)
 *
 *  This file is approximately 200 lines with full documentation.
 * ---------------------------------------------------------------------------
 */

import "../Acknowledgements.css";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa";

import {
  Text,
  Heading,
  SimpleGrid,
  Link,
  Flex,
  Box,
  Image,
  Divider,
  useMediaQuery,
} from "@chakra-ui/react";

import NavBar from "../components/NavBar";
import team from "../team.json";

/* ===========================================================================
   ✅ 1. TEAM GRID — Reusable component that renders all cards in a grid
   =========================================================================== */

/**
 * TeamGrid
 * --------
 * Renders a grid (1–3 columns) of all team member cards.
 * Each card uses CSS classes that match your Figma styling.
 */
function TeamGrid({ filteredTeam }) {
  const sortedTeam = [...filteredTeam].sort((a, b) =>
    a.name.localeCompare(b.name)
  );

  return (
    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
      {sortedTeam.map((member, index) => (
        <Box key={`${member.name}-${index}`} className="ack-card">

          {/* ✅ Photo */}
          <Image
            className="ack-card-photo"
            src={
              member.photo
                ? `/srch-s25/assets/member-photos/${member.photo}`
                : `/srch-s25/assets/member-photos/temp-photo.jpg`
            }
            alt={member.name}
          />

          {/* ✅ Name + Pronouns */}
          <div className="ack-card-name">
            <span className="ack-card-fullname">{member.name}</span>
            {member.pronouns && (
              <span className="ack-card-pronouns">{member.pronouns}</span>
            )}
          </div>

          {/* ✅ Role + Degree + Grad Year */}
          <div className="ack-card-subinfo">
            {member.position}
            {member.degree && ` | ${member.degree}`}
            {member.gradYear && `, ${member.gradYear}`}
          </div>

          {/* ✅ Icon Row */}
          <div className="ack-card-icons">
            {member.email && (
              <a href={`mailto:${member.email}`} className="ack-icon-btn" target="_blank">
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

/* ===========================================================================
   ✅ 2. TEAM SECTION — Wraps a full team section (title, active, inactive)
   =========================================================================== */

/**
 * TeamSection
 * -----------
 * Renders:
 *    • Section title
 *    • Active members (TeamGrid)
 *    • Past members (TeamGrid)
 *    • Divider
 */
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

/* ===========================================================================
   ✅ 3. CONTRIBUTORS — Additional contributors + faculty advisors
   =========================================================================== */

function ContributorsSection() {
  const contributors = team
    .filter((m) => m.team === "additional")
    .sort((a, b) => a.name.localeCompare(b.name));

  const faculty = team
    .filter((m) => m.team === "additional_faculty")
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <>
      <Heading as="h2" size="xl" mt={14} mb={6}>
        Additional Contributors
      </Heading>

      <Heading as="h3" size="lg" mt={4} mb={2}>
        User Studies
      </Heading>

      {contributors.map((member, index) => (
        <Text key={index}>
          {member.name}, <i>{member.position}</i>
        </Text>
      ))}

      <Heading as="h3" size="lg" mt={8} mb={2}>
        Faculty Advisors
      </Heading>

      {faculty.map((member, index) => (
        <Text key={index}>
          {member.name}, <i>{member.position}</i>
        </Text>
      ))}
    </>
  );
}

/* ===========================================================================
   ✅ 4. FULL PAGE — Entire Acknowledgements page in one component
   =========================================================================== */

export default function Acknowledgements() {
  const [isMobile] = useMediaQuery("(max-width: 768px)");

  return (
    <>
      <NavBar />

      {/* ✅ TOP HERO */}
      <div className="ack-hero">
        <div className="upper-text-section">
          <div className="website-title">Meet Our Team</div>
        </div>
      </div>

      {/* ✅ MAIN CONTENT */}
      <div
        style={{
          padding: "40px 60px",
          marginLeft: isMobile ? "0" : "250px",
        }}
      >
        <TeamSection title="Leadership" teamName="leadership" />
        <TeamSection title="AI Team" teamName="ai" />
        <TeamSection title="Privacy Team" teamName="privacy" />
        <TeamSection title="Accessibility Team" teamName="accessibility" />
        <TeamSection title="Product Team" teamName="product" />

        <ContributorsSection />
      </div>
    </>
  );
}
