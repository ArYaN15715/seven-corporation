import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { HeroSection } from "@/pages/sections/HeroSection";
import { InsuranceSection } from "@/pages/sections/InsuranceSection";
import {
  FloatingWhatsApp,
  LocationSection,
} from "@/pages/sections/LocationSection";
import { PropertiesSection } from "@/pages/sections/PropertiesSection";
import { ServicesSection } from "@/pages/sections/ServicesSection";
import { TestimonialsSection } from "@/pages/sections/TestimonialsSection";
import { TrustSection } from "@/pages/sections/TrustSection";
import { useEffect, useRef } from "react";

function CustomCursor() {
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ring = ringRef.current;
    if (!ring || window.matchMedia("(pointer: coarse)").matches) return;

    let x = 0;
    let y = 0;
    let raf: number;

    const onMove = (e: MouseEvent) => {
      x = e.clientX;
      y = e.clientY;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        ring.style.left = `${x - 18}px`;
        ring.style.top = `${y - 18}px`;
        ring.style.opacity = "1";
      });
    };

    const onEnterInteractive = () => {
      ring.style.width = "52px";
      ring.style.height = "52px";
      ring.style.borderColor = "oklch(0.75 0.18 195 / 0.9)";
      ring.style.background = "oklch(0.75 0.18 195 / 0.06)";
    };

    const onLeaveInteractive = () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
      ring.style.borderColor = "oklch(0.75 0.18 195 / 0.5)";
      ring.style.background = "transparent";
    };

    document.addEventListener("mousemove", onMove, { passive: true });

    const interactives = document.querySelectorAll<HTMLElement>(
      "a,button,[role='button']",
    );
    for (const el of interactives) {
      el.addEventListener("mouseenter", onEnterInteractive);
      el.addEventListener("mouseleave", onLeaveInteractive);
    }

    return () => {
      document.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ringRef}
      className="cursor-ring"
      style={{
        width: "36px",
        height: "36px",
        left: "-100px",
        top: "-100px",
        opacity: 0,
      }}
      aria-hidden="true"
    />
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <CustomCursor />
      <FloatingWhatsApp />
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <PropertiesSection />
        <InsuranceSection />
        <TrustSection />
        <TestimonialsSection />
        <LocationSection />
      </main>
      <Footer />
    </div>
  );
}
