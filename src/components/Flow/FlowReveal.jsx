import { useEffect, useRef } from "react";

export default function FlowReveal({ as: Tag = "div", className = "", children, ...props }) {
  const ref = useRef(null);

  useEffect(() => {
    const element = ref.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!element || preference.matches || !("IntersectionObserver" in window)) return;

    element.classList.add("flow-waiting");
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.classList.remove("flow-waiting");
        observer.disconnect();
      }
    }, { threshold: 0.06 });
    const reveal = () => {
      if (preference.matches) {
        element.classList.remove("flow-waiting");
        observer.disconnect();
      }
    };
    observer.observe(element);
    preference.addEventListener("change", reveal);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", reveal);
      element.classList.remove("flow-waiting");
    };
  }, []);

  return <Tag ref={ref} className={`flow-reveal ${className}`} {...props}>{children}</Tag>;
}
