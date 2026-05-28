import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import "../styles/GridBackground.css";

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
  title = null,
  subtitle = null,
  children = null,
  showOverlay = false,
  height = 600,
  squareSize = 48,
  colors = null,
  pattern = "random",
  theme = "light",
  titleClass = "website-title",
  subtitleClass = "info-section",
  titleIcon = null,
}) {
  const textMaskPaddingX = Math.max(96, Math.round(squareSize * 2));
  const textMaskPaddingY = Math.max(72, Math.round(squareSize * 1.5));
  const containerRef = useRef(null);
  const textBoxRef = useRef(null);
  const [textBoxBounds, setTextBoxBounds] = useState(null);
  const [dimensions, setDimensions] = useState(() => {
    if (typeof window === "undefined")
      return { numCols: 0, numRows: 0, gridTemplateColumns: "" };
    const w = window.innerWidth;
    const h = window.innerHeight;
    const floorCols = Math.max(1, Math.floor(w / squareSize));
    const leftover = Math.round(w - floorCols * squareSize);
    const useExtra = leftover >= 8;
    const numCols = floorCols + (useExtra ? 1 : 0);
    const gridTemplateColumns = useExtra
      ? `repeat(${floorCols}, ${squareSize}px) ${leftover}px`
      : `repeat(${floorCols}, ${squareSize}px)`;

    return {
      numCols,
      numRows: Math.max(1, Math.ceil(h / squareSize)),
      gridTemplateColumns,
    };
  });
  const [isReady, setIsReady] = useState(false);
  const [boundsInitialized, setBoundsInitialized] = useState(false);
  const resolvedHeight = typeof height === "string" ? height : `${height}px`;

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
    const timer = requestAnimationFrame(() => setIsReady(true));
    return () => cancelAnimationFrame(timer);
  }, []);

  useLayoutEffect(() => {
    const updateDimensions = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const containerWidth = rect.width;
      const containerHeight = rect.height;

      const floorCols = Math.max(1, Math.floor(containerWidth / squareSize));
      const leftover = Math.round(containerWidth - floorCols * squareSize);
      const useExtra = leftover >= 8;
      const numCols = floorCols + (useExtra ? 1 : 0);
      const gridTemplateColumns = useExtra
        ? `repeat(${floorCols}, ${squareSize}px) ${leftover}px`
        : `repeat(${floorCols}, ${squareSize}px)`;

      setDimensions({
        numCols,
        numRows: Math.max(1, Math.ceil(containerHeight / squareSize)),
        gridTemplateColumns,
      });
    };

    updateDimensions();

    const timers = [];
    timers.push(setTimeout(updateDimensions, 50));
    timers.push(setTimeout(updateDimensions, 250));

    let raf1 = requestAnimationFrame(() => {
      updateDimensions();
      raf1 = requestAnimationFrame(updateDimensions);
    });

    window.addEventListener("resize", updateDimensions);
    return () => {
      window.removeEventListener("resize", updateDimensions);
      timers.forEach((t) => clearTimeout(t));
      if (raf1) cancelAnimationFrame(raf1);
    };
  }, [squareSize]);

  const { numCols, numRows, gridTemplateColumns } = dimensions;
  const totalSquares = numCols * numRows;

  const squareColors = useMemo(() => {
    if (numCols === 0 || numRows === 0) return [];
    const total = numCols * numRows;
    return Array.from({ length: total }, (_, index) => {
      if (pattern === "random")
        return paletteColors[Math.floor(Math.random() * paletteColors.length)];
      if (Array.isArray(pattern)) {
        const p = pattern.find((it) => it.index === index);
        return p ? p.color : paletteColors[0];
      }
      return paletteColors[index % paletteColors.length];
    });
  }, [numCols, numRows, pattern, paletteColors.join(",")]);

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const updateTextBoxBounds = () => {
      if (!containerRef.current) return;
      if (!textBoxRef.current) {
        setTextBoxBounds(null);
        setBoundsInitialized(true);
        return;
      }

      const containerRect = containerRef.current.getBoundingClientRect();
      const textBoxRect = textBoxRef.current.getBoundingClientRect();
      const relX = textBoxRect.left - containerRect.left;
      const relY = textBoxRect.top - containerRect.top;

      setTextBoxBounds({
        x: relX - textMaskPaddingX,
        y: relY - textMaskPaddingY,
        width: textBoxRect.width + textMaskPaddingX * 2,
        height: textBoxRect.height + textMaskPaddingY * 2,
      });
      setBoundsInitialized(true);
    };

    updateTextBoxBounds();
    window.addEventListener("resize", updateTextBoxBounds);
    window.addEventListener("scroll", updateTextBoxBounds);
    const observer = new ResizeObserver(updateTextBoxBounds);
    observer.observe(containerRef.current);
    if (textBoxRef.current) observer.observe(textBoxRef.current);
    return () => {
      window.removeEventListener("resize", updateTextBoxBounds);
      window.removeEventListener("scroll", updateTextBoxBounds);
      observer.disconnect();
    };
  }, [squareSize, numCols, numRows, textMaskPaddingX, textMaskPaddingY]);

  const backgroundRgb = useMemo(() => {
    if (typeof document === "undefined") return null;
    const root = document.documentElement;
    if (!root) return null;
    const backgroundColor = getComputedStyle(root)
      .getPropertyValue("--color-bg")
      .trim();
    return parseCssColorToRgb(backgroundColor);
  }, [theme]);

  const computeDisplayColor = (index, baseArray) => {
    const baseHex = (baseArray && baseArray[index]) || paletteColors[0];
    if (!textBoxBounds) return baseHex;
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
    const rgb = hexToRgb(baseHex);
    if (!rgb || !backgroundRgb) return baseHex;
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

  const getSquareColor = (index) => {
    return computeDisplayColor(index, squareColors);
  };

  const containerStyle = {
    "--square-size": `${squareSize}px`,
    "--num-cols": numCols,
  };
  if (title) {
    containerStyle.minHeight = resolvedHeight;
  } else {
    containerStyle.height = resolvedHeight;
  }

  return (
    <div
      ref={containerRef}
      className={`grid-background-container${isReady && boundsInitialized ? " grid-background-ready" : ""}${!title ? " grid-background-no-text" : ""}${showOverlay ? " grid-background-show-overlay" : ""}`}
      style={containerStyle}
    >
      <div
        className="grid-background"
        style={gridTemplateColumns ? { gridTemplateColumns } : undefined}
      >
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
        {title && (
          <div className="grid-overlay-box">
            <div ref={textBoxRef} className="grid-text-box">
              <h1 className={titleClass}>
                {titleIcon && (
                  <span className="grid-title-icon">{titleIcon}</span>
                )}
                {title}
              </h1>
              {subtitle && <p className={subtitleClass}>{subtitle}</p>}
            </div>
          </div>
        )}
        {children}
      </div>
    </div>
  );
}
