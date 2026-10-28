import { useEffect, useRef, useState } from "react";

const clamp = (value) => Math.min(1, Math.max(0, value));

export default function usePhoneStory(paused) {
  const story = useRef(null);
  const frame = useRef(null);
  const web = useRef(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const reduced = matchMedia("(prefers-reduced-motion: reduce)");
    const sync = () => setEnabled(!reduced.matches && !new URLSearchParams(location.search).has("phone"));
    sync();
    reduced.addEventListener("change", sync);
    return () => reduced.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = story.current;
    const iframe = frame.current;
    const viewport = web.current;
    if (!enabled || !root || !iframe || !viewport) return;
    const mobile = matchMedia("(max-width: 1023px)");
    let target = 0, lastTop = -1, lastProgress = -1, lastMobileFocus = -1, raf = 0;
    let frameResize, frameMutation;
    let inView = false;
    const publishVisibility = () => iframe.contentWindow?.postMessage({ type: "portfolio:phone-visibility", visible: inView }, location.origin);
    const onPhoneReady = (event) => {
      if (event.origin === location.origin && event.source === iframe.contentWindow && event.data?.type === "portfolio:phone-ready") publishVisibility();
    };
    const visibility = new IntersectionObserver(([entry]) => { inView = entry.isIntersecting; publishVisibility(); });
    visibility.observe(viewport);
    window.addEventListener("message", onPhoneReady);
    const update = () => {
      raf = 0;
      // Mobile lets the copy pass first, then pins the phone below the navbar.
      const track = mobile.matches ? root.querySelector(".a-phone-track") : root;
      const pin = root.querySelector(mobile.matches ? ".a-phone-pin" : ".a-pin");
      const pinTop = parseFloat(getComputedStyle(pin).top) || 0;
      const start = track.getBoundingClientRect().top + window.scrollY - pinTop;
      const progress = clamp((window.scrollY - start) / Math.max(1, track.offsetHeight - pin.offsetHeight));
      const smooth = (value) => { const t = clamp(value); return t * t * (3 - 2 * t); };
      const mobileFocus = mobile.matches && !paused ? Math.min(smooth(progress / .2), smooth((1 - progress) / .22)) : 0;
      root.style.setProperty("--mobile-focus", String(mobileFocus));
      root.style.setProperty("--mobile-background-blur", `${(mobileFocus * 5.5).toFixed(2)}px`);
      root.style.setProperty("--phone-depth", `${(mobileFocus * 26).toFixed(2)}px`);
      root.style.setProperty("--phone-lift", `${(-mobileFocus * 8).toFixed(2)}px`);
      const p = clamp((progress - .045) / .855);
      const eased = p * p * (3 - 2 * p);
      if (lastProgress === eased && lastMobileFocus === mobileFocus) return;
      lastProgress = eased;
      lastMobileFocus = mobileFocus;
      root.dataset.phoneProgress = eased.toFixed(4);
      if (!paused) {
        const focus = Math.sin(eased * Math.PI);
        root.style.setProperty("--focus-blur", `${(focus * 2.4).toFixed(2)}px`);
        root.style.setProperty("--focus-opacity", String(1 - focus * .2));
        root.style.setProperty("--phone-angle", `${-5 + (mobile.matches ? mobileFocus * 3 : eased * 5)}deg`);
        root.style.setProperty("--phone-turn", `${-7 + (mobile.matches ? mobileFocus * 5 : eased * 7)}deg`);
        root.style.setProperty("--phone-scale", String(1 + (mobile.matches ? mobileFocus * .055 : focus * .025)));
        if (target > 0 && Math.abs(target * eased - lastTop) > .5) {
          iframe.contentWindow.scrollTo({ top: target * eased, behavior: "instant" });
          lastTop = target * eased;
        }
      } else {
        root.style.setProperty("--focus-blur", "0px");
        root.style.setProperty("--focus-opacity", "1");
      }
      root.style.setProperty("--phone-progress", `${eased * 100}%`);
    };
    const queue = () => { if (!raf) raf = requestAnimationFrame(update); };
    const measure = () => {
      const section = iframe.contentDocument?.querySelector("#about");
      if (!section) return;
      target = section.getBoundingClientRect().top + iframe.contentWindow.scrollY;
      lastProgress = -1;
      root.dataset.phoneReady = String(target > 0);
      if (target > 0) frameMutation?.disconnect();
      queue();
    };
    const size = () => {
      const scale = viewport.clientWidth / 390;
      if (!scale) return;
      iframe.style.width = "390px";
      iframe.style.height = `${Math.ceil(viewport.clientHeight / scale)}px`;
      iframe.style.transform = `scale(${scale})`;
      measure();
    };
    const attach = () => {
      frameResize?.disconnect(); frameMutation?.disconnect();
      const doc = iframe.contentDocument;
      const documentRoot = doc?.documentElement;
      if (!documentRoot) return;
      frameResize = new ResizeObserver(measure);
      frameResize.observe(documentRoot);
      if (doc.body) frameResize.observe(doc.body);
      frameMutation = new MutationObserver(measure);
      frameMutation.observe(documentRoot, { childList: true, subtree: true });
      size(); measure();
      publishVisibility();
    };
    const resize = new ResizeObserver(size);
    resize.observe(viewport);
    iframe.addEventListener("load", attach);
    if (iframe.contentDocument?.readyState === "complete") attach();
    window.addEventListener("scroll", queue, { passive: true });
    window.addEventListener("resize", queue, { passive: true });
    queue();
    return () => {
      cancelAnimationFrame(raf); resize.disconnect(); frameResize?.disconnect(); frameMutation?.disconnect();
      visibility.disconnect(); window.removeEventListener("message", onPhoneReady);
      iframe.removeEventListener("load", attach);
      window.removeEventListener("scroll", queue); window.removeEventListener("resize", queue);
      root.style.setProperty("--focus-blur", "0px"); root.style.setProperty("--focus-opacity", "1");
      root.style.removeProperty("--mobile-focus"); root.style.removeProperty("--mobile-background-blur");
      root.style.removeProperty("--phone-depth"); root.style.removeProperty("--phone-lift");
    };
  }, [enabled, paused]);

  return { story, frame, web, enabled };
}
