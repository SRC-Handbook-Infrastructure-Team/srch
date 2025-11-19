/**
 * ============================================================================
 * About.jsx — full-hero overlay version (matches Acknowledgements + Home)
 * ----------------------------------------------------------------------------
 * • Full-viewport fixed hero using SRC gradient image
 * • Text block overlays the hero background
 * • Lower content slides upward after hero scroll
 * ============================================================================
 */

import "../LandingPage.css"
import Footer from "../components/Footer"
import NavBar from "../components/NavBar";

export default function About() {
  return (
    <>
      <NavBar />
      {/* 1. FIXED HERO (same structure as Acknowledgements) */}
      <div className="about-hero">
        <div className="about-upper-text">
          <div className="about-title">
            About the SRC
            <br />
            Handbook
          </div>
          <p className="about-sub">
            Learn how to use this resource, how it’s structured, and the story
            behind its creation.
          </p>
        </div>
      </div>

      {/* 2. LOWER CONTENT that scrolls above the hero */}
      <div className="about-lower-content">
        <section className="about-section">
          <h2>How to use the handbook</h2>

          <p>
            Each section contains a series of primers that are loosely aligned
            with learning objectives in the SRC curriculum. Use them to:
          </p>

          <ul>
            <li>
              <strong>Structure your lesson or course</strong> with embedded
              ethical modules
            </li>
            <li>
              <strong>Give students real examples</strong> that connect tech to
              society
            </li>
            <li>
              <strong>Foster inclusive, critical thinking</strong> in the
              classroom
            </li>
            <li>
              <strong>Adapt and contribute content</strong> so it remains
              relevant and impactful
            </li>
          </ul>
        </section>
      </div>
           <Footer />
    </>
  );
}
