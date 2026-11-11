//case study javascript file
import "../styles/CaseStudies.css";

import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

import { parseFrontmatter } from "../util/MarkdownData";

/*
 * Load the canonical case study markdown files directly.
 *
 * Example path:
 * ../case-studies/accessibility/biasesInDesign/draw-toast.md
 */
const caseStudyFiles = import.meta.glob("../case-studies/**/*.md", {
  query: "?raw",
  import: "default",
});

function stripMarkdown(text = "") {
  return String(text)
    .replace(/!\[[^\]]*\]\([^)]+\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\[\^[^\]]+\]/g, "")
    .replace(/^#+\s+/gm, "")
    .replace(/[*_`~>]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

function prettify(value = "") {
  return String(value)
    .replace(/([a-z])([A-Z])/g, "$1 $2")
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (char) => char.toUpperCase())
    .trim();
}

function parseCaseStudyPath(filePath) {
  const normalized = filePath.replace(/\\/g, "/");

  const marker = "/case-studies/";
  const markerIndex = normalized.indexOf(marker);

  if (markerIndex === -1) return null;

  const relative = normalized.slice(
    markerIndex + marker.length,
  );

  const parts = relative.split("/").filter(Boolean);

  /*
   * Expected:
   *
   * accessibility/
   *   biasesInDesign/
   *     draw-toast.md
   */
  if (parts.length < 3) return null;

  const sectionId = parts[0];
  const subsectionId = parts[1];
  const fileName = parts[parts.length - 1];

  if (!fileName.endsWith(".md")) return null;

  return {
    sectionId,
    subsectionId,
    slug: fileName.replace(/\.md$/i, ""),
  };
}

function CaseStudies() {
  const [caseStudies, setCaseStudies] = useState([]);
  const [selectedModule, setSelectedModule] =
    useState("all");

  useEffect(() => {
    let cancelled = false;

    async function loadCaseStudies() {
      try {
        const entries =
          Object.entries(caseStudyFiles);

        const loaded = await Promise.all(
          entries.map(async ([path, loader]) => {
            try {
              const routeData =
                parseCaseStudyPath(path);

              if (!routeData) {
                return null;
              }

              const rawMarkdown =
                await loader();

              const {
                content,
                frontmatter,
              } = parseFrontmatter(rawMarkdown);

              const cleanContent =
                stripMarkdown(content);

              return {
                id: `${routeData.sectionId}-${routeData.subsectionId}-${routeData.slug}`,

                title:
                  stripMarkdown(
                    frontmatter.title ||
                      prettify(routeData.slug),
                  ),

                description:
                  cleanContent.length > 120
                    ? `${cleanContent.slice(0, 120)}…`
                    : cleanContent,

                sectionId:
                  routeData.sectionId,

                subsectionId:
                  routeData.subsectionId,

                slug:
                  routeData.slug,

                href: `/${routeData.sectionId}/${routeData.subsectionId}/${routeData.slug}`,
              };
            } catch (error) {
              console.warn(
                `Unable to load case study: ${path}`,
                error,
              );

              return null;
            }
          }),
        );

        if (cancelled) return;

        const validStudies = loaded
          .filter(Boolean)
          .sort((a, b) =>
            a.title.localeCompare(b.title),
          );

        setCaseStudies(validStudies);
      } catch (error) {
        console.error(
          "Failed to load case studies:",
          error,
        );
      }
    }

    loadCaseStudies();

    return () => {
      cancelled = true;
    };
  }, []);

  const filters = [
    {
      id: "all",
      label: "All",
    },
    {
      id: "privacy",
      label: "Privacy",
    },
    {
      id: "accessibility",
      label: "Accessibility",
    },
    {
      id: "automatedDecisionMaking",
      label: "Automated Decision Making",
    },
  ];

  const filteredStudies = useMemo(() => {
    if (selectedModule === "all") {
      return caseStudies;
    }

    return caseStudies.filter(
      (study) =>
        study.sectionId === selectedModule,
    );
  }, [caseStudies, selectedModule]);

  return (
    <main className="case-study-library-page">
      <section className="case-study-library-content">
        <div className="case-study-filters">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={
                selectedModule === filter.id
                  ? "case-study-filter active"
                  : "case-study-filter"
              }
              onClick={() =>
                setSelectedModule(filter.id)
              }
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="case-study-grid">
          {filteredStudies.map((study) => (
            <Link
              key={study.id}
              to={study.href}
              className="case-study-card"
            >
              <h2 className="case-study-card-title">
                {study.title}
              </h2>

              <p>
                {study.description}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}

export default CaseStudies;
