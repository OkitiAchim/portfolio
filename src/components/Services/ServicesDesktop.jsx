import ArrowIcon from "../Flow/ArrowIcon";
import { useRef, useState } from "react";
import FlowReveal from "../Flow/FlowReveal";
import "./services.css";
import "./service-panels.css";
import "./services-light.css";
import "./service-glass.css";

const services = [
  {
    title: "Website Development", lines: ["Website", "Development"], chapter: "01 / Build",
    description: "High-performance websites built around your brand, your audience, and your goals.",
    skills: ["React", "TypeScript", "Next.js"],
    kicker: "Website development / The deliverables", heading: ["Good on the surface.", "Solid underneath."],
    items: ["Responsive layouts, from phone to desktop", "Reusable components and scalable structure", "Thoughtful interactions and clear navigation"],
    cta: "Let’s build your website", projectType: "A website",
  },
  {
    title: "Modern Web Design", lines: ["Modern", "Web Design"], chapter: "02 / Shape",
    description: "Refined interfaces with visual clarity, smooth interaction, and a distinctive point of view.",
    skills: ["UI systems", "Motion", "Responsive"],
    kicker: "Modern web design / The deliverables", heading: ["A clear point of view.", "A natural way through."],
    items: ["Visual hierarchy, typography, and layout", "Consistent interface components and states", "Purposeful motion and responsive interaction"],
    cta: "Let’s shape your interface", projectType: "An interface",
  },
  {
    title: "Build & Deployment", lines: ["Build &", "Deployment"], chapter: "03 / Launch",
    description: "A considered launch, with performance, accessibility, and the details that make it last.",
    skills: ["Git", "Web Vitals", "Vercel"],
    kicker: "Build & deployment / The deliverables", heading: ["The final details.", "The first impression."],
    items: ["Performance and accessibility checks", "A version-controlled deployment workflow", "A polished handoff, ready for real visitors"],
    cta: "Let’s plan your launch", projectType: "Something else",
  },
];

function ServiceVisual({ active }) {
  return (
    <div className="svc-service-visual" data-scene={active} aria-hidden="true">
      <div className="svc-visual-caption"><span>The details make the difference</span><span>0{active + 1} / 03</span></div>
      <div className="svc-visual-scene svc-scene-development">
        <div className="svc-wire-browser"><div className="svc-wire-top"><i /><i /><i /><span>Your next website</span></div>
          <div className="svc-wire-nav"><strong>Brand.</strong><span /><span /><b><ArrowIcon direction="ne" /></b></div>
          <div className="svc-wire-hero"><span>Something<br /><em>worth exploring.</em></span><i /></div>
          <div className="svc-wire-body"><i /><i /><i /></div>
        </div>
        <div className="svc-wire-phone"><span /><div>Made<br /><em>for every<br />screen.</em></div><b><ArrowIcon direction="ne" /></b></div>
        <div className="svc-responsive-caption"><i />One experience. Every screen.</div>
      </div>
      <div className="svc-visual-scene svc-scene-design">
        <div className="svc-type-study"><small>Hierarchy / Rhythm / Character</small><span>Aa<span><ArrowIcon direction="ne" /></span></span><div><i /><i /><i /><i /><i /></div></div>
        <div className="svc-interaction-study"><span>A detail worth feeling.</span><div><span>Explore</span><b><ArrowIcon direction="ne" /></b></div></div>
      </div>
      <div className="svc-visual-scene svc-scene-launch">
        <div className="svc-launch-orbit"><svg viewBox="0 0 400 240"><path d="M40 160 C100 160 75 80 150 80 S210 160 270 130 S300 45 365 45" /><circle cx="40" cy="160" r="8" /><circle cx="150" cy="80" r="8" /><circle cx="270" cy="130" r="8" /><circle cx="365" cy="45" r="8" /></svg>
          <span className="svc-launch-label svc-l1">Refine</span><span className="svc-launch-label svc-l2">Check</span><span className="svc-launch-label svc-l3">Deploy</span><span className="svc-launch-label svc-l4">Live <ArrowIcon direction="ne" /></span>
        </div>
        <div className="svc-launch-caption"><span className="svc-launch-indicator" />Every detail, ready for the real world.</div>
      </div>
    </div>
  );
}

export default function Services() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabs = useRef([]);
  const selected = services[active];

  const handleKeys = (event, index) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? services.length - 1
      : (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : services.length - 1)) % services.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  const selectBrief = () => {
    window.dispatchEvent(new CustomEvent("portfolio:service-inquiry", { detail: { projectType: selected.projectType } }));
  };

  const moveGlass = (event) => {
    const card = event.currentTarget;
    const bounds = card.getBoundingClientRect();
    card.style.setProperty("--glass-x", `${((event.clientX - bounds.left) / bounds.width) * 100}%`);
    card.style.setProperty("--glass-y", `${((event.clientY - bounds.top) / bounds.height) * 100}%`);
  };
  const resetGlass = (event) => {
    event.currentTarget.style.removeProperty("--glass-x");
    event.currentTarget.style.removeProperty("--glass-y");
  };

  return (
    <section className="flow-services" data-motion-paused={paused} aria-labelledby="svc-title">
      <div className="svc-shell">
        <div className="svc-chapter"><span>Web development services</span><button type="button" className="svc-motion-toggle" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play illustrations" : "Pause illustrations"}<span aria-hidden="true">{paused ? "▷" : "Ⅱ"}</span></button></div>
        <FlowReveal className="svc-services-intro"><h2 id="svc-title">Your vision,<br /><em>brought online.</em></h2><p>A website for your business, portfolio, or product. I connect design and development to create polished, responsive experiences that help your brand speak with confidence.</p></FlowReveal>
        <FlowReveal className="svc-service-cards" role="tablist" aria-label="Explore services">
          {services.map((service, index) => <button key={service.title} ref={(element) => { tabs.current[index] = element; }}
            type="button" role="tab" id={`svc-tab-${index}`} aria-label={service.title} aria-selected={active === index}
            aria-controls="svc-detail" tabIndex={active === index ? 0 : -1} onClick={() => setActive(index)} onKeyDown={(event) => handleKeys(event, index)} onPointerMove={moveGlass} onPointerLeave={resetGlass}>
            <span className="svc-service-top"><span>{service.chapter}</span><span aria-hidden="true"><ArrowIcon direction="ne" /></span></span>
            <span className="svc-service-title">{service.lines[0]}<br />{service.lines[1]}</span>
            <span className="svc-service-description">{service.description}</span>
            <span className="svc-tech-list">{service.skills.map((skill) => <span key={skill}>{skill}</span>)}</span>
            <span className="svc-service-bottom">What’s included <b aria-hidden="true">{active === index ? "−" : "+"}</b></span>
          </button>)}
        </FlowReveal>
        <FlowReveal className="svc-service-detail" id="svc-detail" role="tabpanel" aria-labelledby={`svc-tab-${active}`}>
          <div className="svc-detail-copy" key={active}><p className="svc-eyebrow">{selected.kicker}</p><h3>{selected.heading[0]}<br />{selected.heading[1]}</h3><ul>{selected.items.map((item) => <li key={item}><ArrowIcon /><span>{item}</span></li>)}</ul>
            <a href="#contact" className="svc-quiet-link" onClick={selectBrief}>{selected.cta}<span aria-hidden="true"><ArrowIcon direction="ne" /></span></a>
          </div>
          <ServiceVisual active={active} />
        </FlowReveal>
        <FlowReveal className="svc-services-exit"><div><p className="svc-eyebrow">From possibility to proof</p><h3>See ideas <em>come to life.</em></h3></div><a href="#projects" aria-label="Continue to selected work"><span aria-hidden="true"><ArrowIcon direction="se" /></span></a></FlowReveal>
      </div>
    </section>
  );
}
