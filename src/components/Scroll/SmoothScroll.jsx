import { useEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { setScrollEngine } from "./controller";
import "./scroll.css";

export default function SmoothScroll() {
  useEffect(() => {
    // The phone is driven directly by its parent; it must keep native scroll.
    if (new URLSearchParams(location.search).has("phone")) return;
    const lenis = new Lenis({ autoRaf: true, lerp: .14, smoothWheel: true, syncTouch: false, anchors: true, stopInertiaOnNavigate: true });
    setScrollEngine(lenis);
    let endTimer;
    const onScroll = () => {
      if (!document.documentElement.classList.contains("portfolio-scrolling")) {
        document.documentElement.classList.add("portfolio-scrolling");
        document.querySelectorAll(".flow-project-visual").forEach(card => {
          card.style.removeProperty("--flow-tilt-x"); card.style.removeProperty("--flow-tilt-y");
        });
      }
      clearTimeout(endTimer);
      endTimer = setTimeout(() => document.documentElement.classList.remove("portfolio-scrolling"), 120);
    };
    const dialogChange = () => { if (document.querySelector("dialog[open]")) lenis.stop(); else lenis.start(); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("portfolio:dialog", dialogChange);
    return () => {
      clearTimeout(endTimer); window.removeEventListener("scroll", onScroll); window.removeEventListener("portfolio:dialog", dialogChange);
      document.documentElement.classList.remove("portfolio-scrolling"); setScrollEngine(null); lenis.destroy();
    };
  }, []);
  return null;
}
