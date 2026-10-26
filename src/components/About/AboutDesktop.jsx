import ArrowIcon from "../Flow/ArrowIcon";
import { useRef, useState } from "react";
import phoneView from "../../assets/phoneView.png";
import FlowReveal from "../Flow/FlowReveal";
import usePhoneStory from "./usePhoneStory";
import "./about.css";

const values = [
  { title: "Precision", label: "The foundation", icon: "⌖", description: "Clarity, responsiveness, and intentional structure in every interaction.", detail: "Precision starts with the small decisions: readable type, clear hierarchy, and layouts that work at every size." },
  { title: "Motion", label: "The feeling", icon: "≈", description: "Subtle movement that creates emotion, direction, and a sense of life.", detail: "Motion guides attention. A considered transition helps people understand what changed, where they are, and what comes next." },
  { title: "Systems", label: "The long view", icon: "◇", description: "Scalable architecture that stays considered as your product grows.", detail: "A strong system connects the details: reusable components, consistent behavior, and a structure that makes the next idea easier to build." },
];

export default function About() {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const tabs = useRef([]);
  const { story, frame, web, enabled } = usePhoneStory(paused);
  const handleKeys = (event, index) => {
    if (!["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp", "Home", "End"].includes(event.key)) return;
    event.preventDefault();
    const next = event.key === "Home" ? 0 : event.key === "End" ? 2 : (index + (["ArrowRight", "ArrowDown"].includes(event.key) ? 1 : 2)) % 3;
    setActive(next); tabs.current[next]?.focus();
  };

  return <section className="flow-about" aria-labelledby="a-title">
    <div className="a-story" ref={story} data-sequence-enabled={enabled}>
      <div className="a-pin"><div className="a-atmosphere" aria-hidden="true" />
        <div className="a-story-shell">
          <div className="a-copy"><p className="a-eyebrow">About & capabilities / A closer look</p>
            <h2 id="a-title">Digital systems.<br /><em>A human touch.</em></h2>
            <p className="a-intro">I create immersive frontend experiences and scalable digital systems that combine visual precision, interaction design, and modern web engineering.</p>
            <p className="a-detail">My work lives at the intersection of creativity, performance, and structure. Thoughtful interfaces that feel fluid, intentional, and human.</p>
            <div className="a-signature"><strong>Achim Okiti</strong><small>Frontend developer & UI engineer</small></div>
            <a href="#services" className="a-link">Explore how I work <span aria-hidden="true"><ArrowIcon direction="se" /></span></a>
          </div>
          <div className="a-stage"><div className="a-grid" aria-hidden="true" /><span className="a-stage-label">Form / Function / Feeling</span>
            {enabled ? <div className="a-live-phone" aria-hidden="true"><div className="a-hardware"><div className="a-screen">
              <div className="a-status"><span>9:41</span><i /><span>▰ ▰</span></div>
              <div className="a-web" ref={web}><iframe ref={frame} src={new URLSearchParams(location.search).get("hero") === "preview" ? "/?phone=1&hero=preview" : "/?phone=1"} title="Mobile portfolio preview" tabIndex={-1} scrolling="no" inert /></div>
              <span className="a-home-indicator" /></div></div></div>
              : <img className="a-static-phone" src={phoneView} alt="UNBOX portfolio displayed on a mobile phone" width="1017" height="1524" loading="lazy" />}
            <div className="a-stage-note"><span aria-hidden="true"><ArrowIcon direction="ne" /></span><span>{enabled ? <>Scroll a little.<br />See the bigger picture.</> : <>Every detail,<br />intentional.</>}</span></div>
            <div className="a-caption"><span />{enabled ? "The actual page. A different perspective." : "Clarity at every scale."}</div>
          </div>
          {enabled && <div className="a-sequence"><span>{paused ? "Phone motion paused" : "Scroll to explore"}</span><div><span /></div><button type="button" aria-pressed={paused} onClick={() => setPaused(!paused)}>{paused ? "Play motion ▷" : "Pause motion Ⅱ"}</button><a href="#services">Skip to services <ArrowIcon direction="se" /></a></div>}
        </div>
      </div>
    </div>
    <div className="a-shell">
      <FlowReveal className="a-philosophy"><p className="a-eyebrow">The way I think</p><h3>Experiences that <em>feel alive.</em></h3><p>Every interaction should feel intentional. Every transition should carry weight. I blend motion, rhythm, typography, and engineering into experiences that communicate beyond visuals alone.</p></FlowReveal>
      <FlowReveal className="a-values" role="tablist" aria-label="Explore design values">
        {values.map((value, index) => <button key={value.title} type="button" role="tab" id={`a-value-${index}`} aria-label={value.title} aria-selected={active === index} aria-controls="a-value-study" tabIndex={active === index ? 0 : -1} ref={(el) => { tabs.current[index] = el; }} onClick={() => setActive(index)} onKeyDown={(e) => handleKeys(e, index)}>
          <span className="a-value-top"><span>0{index + 1}</span><span aria-hidden="true">{value.icon}</span></span><span className="a-value-title">{value.title}</span><span className="a-value-description">{value.description}</span><span className="a-value-bottom">{value.label}<b aria-hidden="true"><ArrowIcon direction="ne" /></b></span>
        </button>)}
      </FlowReveal>
      <div className="a-value-study" role="tabpanel" id="a-value-study" aria-labelledby={`a-value-${active}`}><span>0{active + 1}</span><p>{values[active].detail}</p><small>Select a principle to explore <ArrowIcon direction="up" /></small></div>
      <FlowReveal><a href="#services" className="a-bridge"><span>Designed with intention.<br />Built to endure.</span><span aria-hidden="true"><ArrowIcon direction="se" /></span></a></FlowReveal>
    </div>
  </section>;
}
