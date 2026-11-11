/**
 * Resolves section icon assets by section id and theme so visual identifiers
 * remain consistent across navigation and content views.
 */

import { MdEco } from "react-icons/md";

const lightIconModules = import.meta.glob("../assets/*-icon.svg", {
  eager: true,
  import: "default",
});

const darkIconModules = import.meta.glob("../assets/*-icon_white.svg", {
  eager: true,
  import: "default",
});

// TODO: replace with custom sustainability-icon.svg (+ _white) like other sections;
// MdEco + SVG sizing CSS are temporary until final artwork lands.
const libraryIconsBySection = new Map([["sustainability", MdEco]]);

function normalizeSectionKey(value = "") {
  return String(value || "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
}

function extractSectionIdFromPath(path = "") {
  const fileName = path.split("/").pop() || "";
  const id = fileName
    .replace(/-icon_white\.svg$/i, "")
    .replace(/-icon\.svg$/i, "");
  return normalizeSectionKey(id);
}

function buildIconMap(modules) {
  const map = new Map();

  Object.entries(modules || {}).forEach(([path, iconUrl]) => {
    const key = extractSectionIdFromPath(path);
    if (!key) return;
    map.set(key, iconUrl);
  });

  return map;
}

const lightIconsBySection = buildIconMap(lightIconModules);
const darkIconsBySection = buildIconMap(darkIconModules);

export function getSectionIconById(sectionId, theme = "light") {
  const key = normalizeSectionKey(sectionId);
  if (!key) return null;

  const isDark = theme === "dark";
  const themedMap = isDark ? darkIconsBySection : lightIconsBySection;
  const fallbackMap = isDark ? lightIconsBySection : darkIconsBySection;

  return themedMap.get(key) || fallbackMap.get(key) || null;
}

export function getSectionLibraryIconById(sectionId) {
  const key = normalizeSectionKey(sectionId);
  if (!key) return null;
  return libraryIconsBySection.get(key) || null;
}

export function SectionIcon({
  sectionId,
  theme = "light",
  className = "",
  size,
  width,
  height,
  alt = "",
  "aria-hidden": ariaHidden,
}) {
  const src = getSectionIconById(sectionId, theme);
  if (src) {
    return (
      <img
        className={className}
        src={src}
        alt={alt}
        width={width ?? size}
        height={height ?? size}
        aria-hidden={ariaHidden ?? (!alt || undefined)}
      />
    );
  }

  const Icon = getSectionLibraryIconById(sectionId);
  if (!Icon) return null;

  const hasExplicitSize = size != null || width != null || height != null;
  const isDark = theme === "dark";

  return (
    <Icon
      className={className}
      {...(hasExplicitSize
        ? { size: size ?? width ?? height }
        : { size: "1em" })}
      color={isDark ? "#fff" : "#222222"}
      aria-hidden={ariaHidden ?? (!alt || true)}
      role={alt ? "img" : undefined}
      aria-label={alt || undefined}
    />
  );
}
