import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

function getScrollEnvironment() {
  if (typeof document === "undefined") {
    return { scrollContainer: null };
  }

  return {
    scrollContainer:
      document.scrollingElement || document.documentElement || document.body,
  };
}

function getScrollProgress(scrollContainer) {
  if (!scrollContainer || typeof document === "undefined") return 0;

  const scrollTop = window.scrollY || document.documentElement.scrollTop || 0;
  const maxScroll = Math.max(
    0,
    (document.documentElement.scrollHeight || 0) - window.innerHeight,
  );

  if (maxScroll === 0) return 0;

  return Math.max(0, Math.min(100, (scrollTop / maxScroll) * 100));
}

export default function ScrollProgressBar() {
  const location = useLocation();
  const progressFillRef = useRef(null);
  const progressBarRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;

    let animationFrame = 0;
    let scrollContainer = null;

    const updateProgress = () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
      animationFrame = requestAnimationFrame(() => {
        const environment = getScrollEnvironment();
        scrollContainer = environment.scrollContainer;
        const progress = getScrollProgress(scrollContainer);

        if (progressFillRef.current) {
          progressFillRef.current.style.transform = `scaleX(${progress / 100})`;
        }

        if (progressBarRef.current) {
          progressBarRef.current.setAttribute(
            "aria-valuenow",
            String(Math.round(progress)),
          );
        }
      });
    };

    updateProgress();

    scrollContainer = getScrollEnvironment().scrollContainer;

    if (scrollContainer) {
      window.addEventListener("scroll", updateProgress, { passive: true });
    }

    window.addEventListener("resize", updateProgress, { passive: true });

    const timeoutId = window.setTimeout(updateProgress, 0);

    return () => {
      window.clearTimeout(timeoutId);
      if (animationFrame) cancelAnimationFrame(animationFrame);
      if (scrollContainer) {
        window.removeEventListener("scroll", updateProgress);
      }
      window.removeEventListener("resize", updateProgress);
    };
  }, [location.pathname]);

  return (
    <div
      ref={progressBarRef}
      className="progress-bar"
      aria-hidden="true"
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={0}
    >
      <div ref={progressFillRef} className="progress-bar-fill" />
    </div>
  );
}
