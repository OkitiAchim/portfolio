// Keep the original shader, but only render a canvas while it can be seen.
export default function visibleCanvas(canvas, draw) {
  const phone = new URLSearchParams(location.search).has("phone");
  let raf = 0, visible = false, parentVisible = !phone, lastFrame = -1, destroyed = false;
  const reduced = matchMedia("(prefers-reduced-motion: reduce)");
  const tick = (time) => {
    raf = 0;
    if (destroyed || !visible || !parentVisible || document.hidden) return;
    // This slow cloud field stays fluid at 30fps while leaving room for scrolling.
    if (lastFrame < 0 || time - lastFrame >= 32) {
      draw(); lastFrame = time;
    }
    if (!reduced.matches) raf = requestAnimationFrame(tick);
  };
  const sync = () => {
    if (destroyed) return;
    canvas.dataset.rendering = String(visible && parentVisible && !document.hidden && !reduced.matches);
    cancelAnimationFrame(raf); raf = 0; lastFrame = -1;
    if (visible && parentVisible && !document.hidden) raf = requestAnimationFrame(tick);
  };
  let parentObserver;
  if (phone && window.frameElement) {
    // The phone is same-origin: observe its element in the outer document.
    parentObserver = new window.parent.IntersectionObserver(([entry]) => { parentVisible = entry.isIntersecting; sync(); });
    parentObserver.observe(window.frameElement);
  } else parentVisible = true;
  const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0 });
  observer.observe(canvas);
  document.addEventListener("visibilitychange", sync);
  reduced.addEventListener("change", sync);
  return () => {
    destroyed = true;
    cancelAnimationFrame(raf); observer.disconnect(); document.removeEventListener("visibilitychange", sync); reduced.removeEventListener("change", sync);
    parentObserver?.disconnect();
  };
}
