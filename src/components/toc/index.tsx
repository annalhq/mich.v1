"use client";

import React, { useEffect, useRef, useState } from "react";

import { AlignCenter, X } from "lucide-react";

import { cn } from "@/lib/utils";

export const TableOfContents = () => {
  const [headings, setHeadings] = useState<
    { id: string; text: string; level: string }[]
  >([]);
  const [activeId, setActiveId] = useState<string>("");
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMobileViewport, setIsMobileViewport] = useState(false);
  const [progress, setProgress] = useState(0);
  const rafIdRef = useRef<number | null>(null);

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll("h2, h3"))
      .filter((el) => el.id)
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName.toLowerCase(),
      }));

    setHeadings(elements);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: "-10% 0px -85% 0px" }
    );

    document.querySelectorAll("h2, h3").forEach((heading) => {
      if (heading.id) {
        observer.observe(heading);
      }
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 1279px)");
    const update = () => setIsMobileViewport(mediaQuery.matches);

    update();
    mediaQuery.addEventListener("change", update);

    return () => mediaQuery.removeEventListener("change", update);
  }, []);

  useEffect(() => {
    if (!isMobileViewport) return;

    const handleScroll = () => {
      if (rafIdRef.current) return;

      rafIdRef.current = window.requestAnimationFrame(() => {
        rafIdRef.current = null;

        const scrollTop = window.scrollY;
        const docHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollProgress =
          docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
        const next = Math.min(100, Math.max(0, scrollProgress));

        setProgress((prev) => {
          if (Math.abs(prev - next) < 0.5) return prev;
          return next;
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current) window.cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    };
  }, [isMobileViewport]);

  useEffect(() => {
    if (!isMobileOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsMobileOpen(false);
    };

    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [isMobileOpen]);

  if (headings.length === 0) return null;

  const activeIndex = headings.findIndex((h) => h.id === activeId);

  const safeActiveIndex = Math.max(0, activeIndex);
  const mobileSubtitle = headings[safeActiveIndex]?.text ?? "";

  return (
    <>
      <aside
        className={cn(
          "toc-root fixed left-0 top-1/2 z-50 hidden -translate-y-1/2 xl:flex",
          isHovered && "toc-root-open"
        )}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocusCapture={() => setIsHovered(true)}
        onBlurCapture={() => setIsHovered(false)}
      >
        <div className="toc-indicator" aria-hidden>
          <AlignCenter size={14} className="text-slate-4" />
        </div>

        <div className="toc-sidebar" aria-label="Table of contents">
          <div className="toc-glass-bg">
            <h4 className="toc-heading">Contents</h4>
            <ul className="toc-item">
              {headings.map((heading, index) => (
                <li
                  key={heading.id}
                  className={cn(
                    "toc-list-item",
                    heading.level === "h3" && "ml-3 text-sm",
                    activeId === heading.id && "toc-list-item-active"
                  )}
                  style={{
                    animationDelay: `${index * 30}ms`,
                  }}
                >
                  <a href={`#${heading.id}`}>
                    <span className="title">{heading.text}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </aside>

      <button
        onClick={() => setIsMobileOpen((prev) => !prev)}
        className="mobile-toc-trigger xl:hidden"
        aria-label="Toggle table of contents"
        aria-expanded={isMobileOpen}
      >
        <div className="progress-ring" aria-hidden>
          <svg
            className="progress-ring-svg"
            width="48"
            height="48"
            viewBox="0 0 48 48"
          >
            <circle
              className="progress-ring-bg"
              cx="24"
              cy="24"
              r="20"
              fill="none"
            />
            <circle
              className="progress-ring-circle"
              cx="24"
              cy="24"
              r="20"
              fill="none"
              strokeDasharray={125.6}
              strokeDashoffset={125.6 - (125.6 * progress) / 100}
            />
          </svg>
          <span className="progress-text">{safeActiveIndex + 1}</span>
        </div>
      </button>

      <div
        className={cn(
          "mobile-toc-overlay",
          isMobileOpen && "mobile-toc-overlay-open"
        )}
        onClick={() => setIsMobileOpen(false)}
      />

      <div
        className={cn(
          "mobile-toc-sheet",
          isMobileOpen && "mobile-toc-sheet-open"
        )}
        role="dialog"
        aria-modal="true"
        aria-label="Table of contents"
      >
        <div className="mobile-toc-handle" aria-hidden />

        <div className="mobile-toc-header">
          <div className="mobile-toc-header-text">
            <h3 className="mobile-toc-title">Contents</h3>
            <p className="mobile-toc-subtitle">{mobileSubtitle}</p>
          </div>
          <button
            onClick={() => setIsMobileOpen(false)}
            className="mobile-toc-close"
            aria-label="Close"
          >
            <X size={20} />
          </button>
        </div>

        <div className="mobile-toc-progress">
          <div
            className="mobile-toc-progress-bar"
            style={{
              width: `${((safeActiveIndex + 1) / headings.length) * 100}%`,
            }}
          />
        </div>

        <ul className="mobile-toc-list">
          {headings.map((heading, index) => (
            <li
              key={heading.id}
              className={cn(
                "mobile-toc-item",
                heading.level === "h3" && "mobile-toc-item-sub",
                activeId === heading.id && "mobile-toc-item-active"
              )}
              style={{
                animationDelay: `${index * 45}ms`,
              }}
            >
              <a href={`#${heading.id}`} onClick={() => setIsMobileOpen(false)}>
                <span className="mobile-toc-number">{index + 1}</span>
                <span className="mobile-toc-text">{heading.text}</span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
