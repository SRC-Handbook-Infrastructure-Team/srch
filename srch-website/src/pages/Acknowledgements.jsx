import React from "react";
import { MdEmail } from "react-icons/md";
import { FaLinkedin, FaExternalLinkAlt } from "react-icons/fa"
import {
  Text,
  Heading,
  SimpleGrid,
  Link,
  Flex,
  Box,
  Image,
  Divider,
} from "@chakra-ui/react";
import team from "../team.json";

function TeamGrid({ filteredTeam }) {
  // Sort alphabetically
  const sortedTeam = [...filteredTeam].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  return (
    // TODO: fix this for mobile, honestly fix everything for mobile
    // TODO: add a past members section
    <SimpleGrid py={4} columns={3} spacing={4}>
      {/* Map through photo cards */}
      {sortedTeam.map((member) => (
        <Box
          key={member.id}
          display="flex"
          flexDirection="column"
          alignItems="center"
          textAlign="center"
          p={4}
          boxShadow="sm"
          bg="gray.100"
        >
          {/* TODO: Photos */}

          <Image
            src={member.photo ? `/srch-s25/member-photos/${member.photo}` : `/srch-s25/member-photos/temp-photo.jpg`}
            alt={member.photo || "Default photo"}
            boxSize="200px" // Sets a fixed size for the image
            objectFit="cover" // Ensures the image is cropped proportionally
          />
          <Flex align="center" gap={2} mb={2}>
            <Text fontWeight="bold">{member.name}</Text>
            <Link href={`mailto:${member.email}`} isExternal>
              <MdEmail />
            </Link>
            {member.linkedin && (
              <Link href={member.linkedin} isExternal>
                <FaLinkedin />
              </Link>
            )}
            {member.website && (
              <Link href={member.website} isExternal>
                <FaExternalLinkAlt />
              </Link>
            )}
          </Flex>
          <Text fontSize="sm">
            {member.position} | {member.pronouns}
          </Text>
          {/* <Text fontSize="sm">{member.pronouns}</Text> */}
          {/* TODO: recommend that this should just be Ph.D. */}
          <Text fontSize="sm">
            {member.degree}, {member.gradYear}
          </Text>
        </Box>
      ))}
    </SimpleGrid>
  );
}

function Acknowledgements() {
  const onlyLeaders = team.filter((member) => member.team == "N/A");
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  return (
    <div style={{ padding: "20px", marginLeft: isMobile ? "0" : "250px" }}>
      <Heading as="h1" size="xl" mt={5} mb={3}>
        Acknowledgements 
      </Heading>
      <Text>Thank you to our wonderful project coordinators!</Text>
      <TeamGrid filteredTeam={onlyLeaders} />
    </div>
  );
}

function Team({ teamName }) {
  console.log(team);
  const filteredTeam = team.filter((member) => member.team === teamName);
  const isActive = filteredTeam.filter((member) => member.active == "true");
  const notActive = filteredTeam.filter((member) => member.active == "false");

  const nameToTitleMap = {
    ai: "AI",
    privacy: "Privacy",
    accessibility: "Accessibility",
    product: "Product",
  };
  return (
    <div style={{ padding: "20px", marginLeft: isMobile ? "0" : "250px" }}>
      <Heading as="h1" size="xl" mt={5} mb={3}>
        {nameToTitleMap[teamName]} Team
      </Heading>
      <Divider my={4} borderColor="gray.300" />{" "}
      <Heading as="h2" size="lg" fontWeight="normal">
        Current Team Members
      </Heading>
      <TeamGrid filteredTeam={isActive} />
      {notActive.length > 0 && (
        <>
          <Heading as="h2" size="lg" fontWeight="normal">
            Past Team Members
          </Heading>
          <TeamGrid filteredTeam={notActive} />
        </>
      )}
    </div>
  );
}

function AdditionalContributors(){
  const contributors = team.filter((member) => member.team == "additional")
  return (
    <div style={{ padding: "20px", marginLeft: "250px" }}>
      <Heading>Additional Contributors</Heading>
      <Divider my={4} borderColor="gray.300" />{" "}
      <Heading as="h2" size="lg" fontWeight="normal" my={4}>
        User Studies
      </Heading>
      <Text my={4}>
        Thank you to everyone who participated in our user studies! Your
        feedback has been immensely valuable as we work towards improving our
        content and design! ...
      </Text>
      {contributors.map((member) => (
        <Text key={member.id}>
          {member.name}, <i>{member.position}</i>
        </Text>
      ))}
      <Heading as="h2" size="lg" fontWeight="normal" my={4}>
        Advisors
      </Heading>
      <Text my={4}>
        Thank you to everyone who advised our research teams! Your feedback has
        been immensely valuable as we develop and refine our primers! ...
      </Text>
    </div>
  );
}

export { Acknowledgements, Team, AdditionalContributors };
