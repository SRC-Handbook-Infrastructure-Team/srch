const lightIconModules = import.meta.glob("../assets/*-icon.svg", {
  eager: true,
  import: "default",
});

const darkIconModules = import.meta.glob("../assets/*-icon_white.svg", {
  eager: true,
  import: "default",
});

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
