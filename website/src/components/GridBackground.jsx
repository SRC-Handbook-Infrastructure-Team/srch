import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import "../styles/GridBackground.css";

/**
 * GridBackground Component
 * Reusable grid background with colored squares, title, and subtitle.
 *
 * Features:
 * - Distance-based color blending: Squares near the text box blend toward --color-bg,
 *   while squares further away display full palette colors (max 300px distance)
 * - Gradient overlay: Fades from transparent at top to --color-bg at bottom for readability
 * - Theme-aware: Uses CSS custom property --color-bg instead of hardcoded white/colors
 * - Smooth animations: Color transitions (0.6s) on all changes, text fades in (0.8s) on page load
 *
 * Props:
 * - title: Page title (required)
 * - subtitle: Page subtitle (optional)
 * - children: Additional content to render below title/subtitle
 * - height: Height of the container (default: "600px")
 * - squareSize: Size of each grid square in pixels (default: 48)
 * - colors: Array of colors to use in the grid
 * - pattern: Optional pattern for square colors ("random", "gradient", or array of specific positions)
 * - theme: "light" or "dark" - adjusts default colors
 * - titleClass: CSS class for title styling
 * - subtitleClass: CSS class for subtitle styling
 */

function parseCssColorToRgb(colorValue) {
  const value = String(colorValue || "").trim();
  if (!value) return null;

  const hexMatch = value.match(/^#([a-f\d]{3}|[a-f\d]{6})$/i);
  if (hexMatch) {
    const hex = hexMatch[1];
    const expanded =
      hex.length === 3
        ? hex
            .split("")
            .map((char) => char + char)
            .join("")
        : hex;
    return {
      r: parseInt(expanded.slice(0, 2), 16),
      g: parseInt(expanded.slice(2, 4), 16),
      b: parseInt(expanded.slice(4, 6), 16),
    };
  }

  const rgbMatch = value.match(
    /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/i,
  );
  if (rgbMatch) {
    return {
      r: Number(rgbMatch[1]),
      g: Number(rgbMatch[2]),
      b: Number(rgbMatch[3]),
    };
  }

  return null;
}
export default function GridBackground({
  title,
  subtitle = null,
  children = null,
  height = "600px",
  squareSize = 48,
  colors = null,
  pattern = "random",
  theme = "light",
  titleClass = "website-title",
  subtitleClass = "info-section",
}) {
  const containerRef = useRef(null);
  const textBoxRef = useRef(null);
  const [textBoxBounds, setTextBoxBounds] = useState(null);
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined") {
      return { numCols: 0, numRows: 0 };
    }

    const parsedHeight =
      typeof height === "string" ? parseInt(height, 10) : Number(height);
    const containerHeight = Number.isFinite(parsedHeight) ? parsedHeight : 0;

    return {
      numCols: Math.ceil(window.innerWidth / squareSize),
      numRows: Math.ceil(containerHeight / squareSize),
    };
  });
  const [isReady, setIsReady] = useState(false);
  const [boundsInitialized, setBoundsInitialized] = useState(false);

  const lightColors = [
    "#9f1f2a",
    "#bb2b36",
    "#d44e5a",
    "#df6772",
    "#e77f87",
    "#c93641",
    "#e28e82",
    "#d86f77",
    "#c94955",
    "#ebadb4",
    "#e9c1c5",
  ];

  const darkColors = [
    "#081d12",
    "#0b2517",
    "#0e2b1a",
    "#12381f",
    "#12432c",
    "#124727",
    "#163d24",
    "#1b4a2a",
    "#1b6131",
    "#225f2a",
    "#246024",
    "#316951",
    "#1f4032",
    "#265f46",
    "#22563f",
    "#1c331e",
    "#1c4c29",
  ];

  const paletteColors = colors || (theme === "dark" ? darkColors : lightColors);

  useEffect(() => {
    const timer = requestAnimationFrame(() => {
      setIsReady(true);
    });
    return () => cancelAnimationFrame(timer);
  }, []);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const containerWidth = containerRef.current.offsetWidth;
      const containerHeight =
        typeof height === "string" ? parseInt(height, 10) : height;

      setDimensions({
        numCols: Math.ceil(containerWidth / squareSize),
        numRows: Math.ceil(containerHeight / squareSize),
      });
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, [squareSize, height]);

  const { numCols, numRows } = dimensions;
  const totalSquares = numCols * numRows;

  const squareColors = useMemo(() => {
    if (numCols === 0 || numRows === 0) return [];
    const total = numCols * numRows;

    return Array.from({ length: total }, (_, index) => {
      if (pattern === "random") {
        return paletteColors[Math.floor(Math.random() * paletteColors.length)];
      }
      if (Array.isArray(pattern)) {
        const patternItem = pattern.find((item) => item.index === index);
        return patternItem ? patternItem.color : paletteColors[0];
      }
      return paletteColors[index % paletteColors.length];
    });
  }, [numCols, numRows, pattern, paletteColors.join(",")]);

  useLayoutEffect(() => {
    if (!textBoxRef.current || !containerRef.current) return;

    const updateTextBoxBounds = () => {
      if (!textBoxRef.current || !containerRef.current) return;

      const containerRect = containerRef.current.getBoundingClientRect();
      const textBoxRect = textBoxRef.current.getBoundingClientRect();

      const relX = textBoxRect.left - containerRect.left;
      const relY = textBoxRect.top - containerRect.top;

      setTextBoxBounds({
        x: relX,
        y: relY,
        width: textBoxRect.width,
        height: textBoxRect.height,
      });

      setBoundsInitialized(true);
    };

    updateTextBoxBounds();

    window.addEventListener("resize", updateTextBoxBounds);
    window.addEventListener("scroll", updateTextBoxBounds);

    const observer = new ResizeObserver(updateTextBoxBounds);
    observer.observe(containerRef.current);
    observer.observe(textBoxRef.current);

    return () => {
      window.removeEventListener("resize", updateTextBoxBounds);
      window.removeEventListener("scroll", updateTextBoxBounds);
      observer.disconnect();
    };
  }, [squareSize, numCols, numRows]);

  const backgroundRgb = useMemo(() => {
    if (typeof document === "undefined") return null;
    const root = document.documentElement;
    if (!root) return null;

    const backgroundColor = getComputedStyle(root)
      .getPropertyValue("--color-bg")
      .trim();
    return parseCssColorToRgb(backgroundColor);
  }, [theme]);
  const getSquareColor = (index) => {
    if (!textBoxBounds) return squareColors[index] ?? paletteColors[0];

    const row = Math.floor(index / numCols);
    const col = index % numCols;

    const squareCenterX = col * squareSize + squareSize / 2;
    const squareCenterY = row * squareSize + squareSize / 2;

    const { x: txX, y: txY, width: txW, height: txH } = textBoxBounds;

    const closestX = Math.max(txX, Math.min(squareCenterX, txX + txW));
    const closestY = Math.max(txY, Math.min(squareCenterY, txY + txH));

    const dx = squareCenterX - closestX;
    const dy = squareCenterY - closestY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    const maxDistance = 300;
    const blendFactor = Math.min(1, distance / maxDistance);

    const baseColor = squareColors[index] ?? paletteColors[0];

    const hexToRgb = (hex) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : null;
    };

    const rgb = hexToRgb(baseColor);
    if (!rgb || !backgroundRgb) return baseColor;

    const r = Math.round(
      backgroundRgb.r + (rgb.r - backgroundRgb.r) * blendFactor,
    );
    const g = Math.round(
      backgroundRgb.g + (rgb.g - backgroundRgb.g) * blendFactor,
    );
    const b = Math.round(
      backgroundRgb.b + (rgb.b - backgroundRgb.b) * blendFactor,
    );

    return `rgb(${r}, ${g}, ${b})`;
  };

  return (
    <div
      ref={containerRef}
      className={`grid-background-container${isReady && boundsInitialized ? " grid-background-ready" : ""}`}
      style={{
        height,
        "--square-size": `${squareSize}px`,
        "--num-cols": numCols,
      }}
    >
      <div className="grid-background">
        {Array.from({ length: totalSquares }).map((_, index) => (
          <div
            key={index}
            className="grid-square"
            style={{ backgroundColor: getSquareColor(index) }}
          />
        ))}
      </div>
      <div className="grid-overlay" />
      <div className="grid-content">
        <div ref={textBoxRef} className="grid-text-box">
          <h1 className={titleClass}>{title}</h1>
          {subtitle && <p className={subtitleClass}>{subtitle}</p>}
        </div>
        {children}
      </div>
    </div>
  );
}
