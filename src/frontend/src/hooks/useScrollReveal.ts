import { useEffect, useRef } from "react";

export function useScrollReveal<T extends HTMLElement>(
  threshold = 0.12,
  delay = 0,
) {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, delay);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -40px 0px" },
    );

    el.classList.add("scroll-reveal");
    observer.observe(el);

    return () => observer.disconnect();
  }, [threshold, delay]);

  return ref;
}

export function useScrollRevealChildren(
  selector = ".reveal-child",
  threshold = 0.1,
  staggerMs = 80,
) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const children = container.querySelectorAll<HTMLElement>(selector);
    for (const child of children) {
      child.classList.add("scroll-reveal");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            const index = Array.from(children).indexOf(
              entry.target as HTMLElement,
            );
            setTimeout(() => {
              entry.target.classList.add("revealed");
            }, index * staggerMs);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold, rootMargin: "0px 0px -30px 0px" },
    );

    for (const child of children) {
      observer.observe(child);
    }
    return () => observer.disconnect();
  }, [selector, threshold, staggerMs]);

  return containerRef;
}
