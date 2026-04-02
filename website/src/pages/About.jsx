/**
 * ============================================================================
 * About.jsx — full-hero overlay version (matches Acknowledgments + Home)
 * ----------------------------------------------------------------------------
 * • Full-viewport fixed hero using SRC gradient image
 * • Text block overlays the hero background
 * • Lower content slides upward after hero scroll
 * ============================================================================
 */

import "../styles/About.css";
export default function About() {
  return (
    <>
      <div className="upper-content">
        <div className="upper-text-section">
          <div className="website-title" id="about-title">
            About the SRC Handbook
          </div>
          <div className="info-section">
            Learn how to use this resource, how it’s structured, and the story
            behind its creation.
          </div>
        </div>
      </div>

      <div className="about-lower-content">
        <section className="about-section">
          <div className="section-title" style={{ overflowWrap: "break-word" }}>
            How to use the handbook
          </div>
          <p>
            Each section contains a series of primers that are loosely aligned
            with learning objectives in the SRC curriculum.
          </p>
        </section>
      </div>
    </>
  );
}
