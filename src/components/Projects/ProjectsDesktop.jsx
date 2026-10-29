import ArrowIcon from "../Flow/ArrowIcon";
import { useState } from "react";
import FlowReveal from "../Flow/FlowReveal";
import FlowDialog from "../Flow/FlowDialog";
import "../Flow/flow.css";

const projects = [
  {
    id: "01", name: "ERIP", category: "Geospatial intelligence", location: "Akure South",
    title: "Environmental Risk Intelligence Platform",
    titleLines: ["Environmental Risk", "Intelligence Platform"],
    description: "Making complex environmental data navigable. An interactive map for exploring flood susceptibility, population exposure, and the evidence behind every layer.",
    detail: "Environmental intelligence for Akure South, combining flood susceptibility screening with population exposure, land cover, rainfall, and terrain layers. Location profiles connect the map to supporting evidence, while the data sources view explains methods, attribution, and known limitations.",
    image: "/projects/erip_map.png", secondaryImage: "/projects/erip_details.png",
    imageAlt: "ERIP interactive risk map with dataset layer controls",
    secondaryAlt: "ERIP data sources and Ask ERIP assistant showing methods, attribution, and limitations",
    gallery: [
      { image: "/projects/erip_location.png", alt: "ERIP flood susceptibility map and selected location profile for Akure South", label: "Map detail / Location evidence" },
      { image: "/projects/erip_analytics.png", alt: "ERIP flood susceptibility histogram and evidence interpretation panel", label: "Analytics / Flood susceptibility screening" },
    ],
    detailLabel: "The evidence behind the map",
  },
  {
    id: "02", name: "SIMS", category: "Digital systems", location: "Administration, simplified",
    title: "Student Information Management System",
    titleLines: ["Student Information", "Management System"],
    description: "One clear workspace for the moving parts of a school. Student records, attendance, finance, and everyday administration, brought together.",
    detail: "A unified workspace for student records, attendance, finance, timetables, notifications, and administrative workflows. The dashboard brings key information into focus, with detailed views for the tasks behind the numbers.",
    image: "/projects/sims-dashboard.png", secondaryImage: "/projects/sims-students.png",
    imageAlt: "SIMS student information and administration dashboard",
    secondaryAlt: "SIMS detailed student administration interface",
    detailLabel: "The details behind the dashboard",
  },
];

function handleTilt(event) {
  if (document.documentElement.classList.contains("portfolio-scrolling") || event.pointerType !== "mouse" || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const rect = event.currentTarget.getBoundingClientRect();
  event.currentTarget.style.setProperty("--flow-tilt-x", `${-((event.clientY - rect.top) / rect.height - 0.5) * 2.5}deg`);
  event.currentTarget.style.setProperty("--flow-tilt-y", `${((event.clientX - rect.left) / rect.width - 0.5) * 2.5}deg`);
}

function resetTilt(event) {
  event.currentTarget.style.setProperty("--flow-tilt-x", "0deg");
  event.currentTarget.style.setProperty("--flow-tilt-y", "0deg");
}

export default function Projects() {
  const [selected, setSelected] = useState(null);
  const [tickerPaused, setTickerPaused] = useState(false);

  return (
    <section id="work" className={`flow-work ${tickerPaused ? "flow-ticker-paused" : ""}`} aria-labelledby="flow-work-title">
      <div className="flow-marquee" aria-hidden="true"><div>{[0, 1].map((n) => <span key={n}>Idea <b><ArrowIcon direction="ne" /></b> Interaction <b><ArrowIcon direction="ne" /></b> Impact <b><ArrowIcon direction="ne" /></b> </span>)}</div></div>
      <div className="flow-work-content">
        <div className="flow-chapter"><span>Selected work / 02 projects</span><button className="flow-motion-toggle" type="button" aria-pressed={tickerPaused} onClick={() => setTickerPaused(!tickerPaused)}>{tickerPaused ? "Play animated text" : "Pause animated text"}<span aria-hidden="true">{tickerPaused ? "▷" : "Ⅱ"}</span></button></div>
        <FlowReveal className="flow-work-heading">
          <h2 id="flow-work-title">Less talk.<br /><em>More impact.</em></h2>
          <p>Real problems.<br />Considered solutions.<br />A little unexpected delight.</p>
        </FlowReveal>
        {projects.map((project, index) => (
          <FlowReveal as="article" key={project.id} className={`flow-project ${index === 1 ? "flow-project-offset" : ""}`}>
            <button type="button" className="flow-project-visual" onClick={() => setSelected(project)}
              onPointerMove={handleTilt} onPointerLeave={resetTilt} onPointerCancel={resetTilt}
              aria-label={`Explore ${project.title}`} aria-haspopup="dialog">
              <span className="flow-browser-strip"><span aria-hidden="true">● ● ●</span><span>{project.name} / {project.location}</span><span aria-hidden="true"><ArrowIcon direction="ne" /></span></span>
              <span className="flow-image-wrap"><img src={project.image} alt={project.imageAlt} loading="lazy" decoding="async" />
                <span className="flow-project-open">Explore project <span aria-hidden="true"><ArrowIcon direction="ne" /></span></span>
              </span>
            </button>
            <div className="flow-project-info">
              <div><p className="flow-eyebrow">{project.id} / {project.category}</p><h3>{project.titleLines[0]}<br />{project.titleLines[1]}</h3></div>
              <div><p className="flow-project-description">{project.description}</p><button type="button" className="flow-text-link" onClick={() => setSelected(project)} aria-label={`A closer look at ${project.title}`} aria-haspopup="dialog">A closer look <span aria-hidden="true"><ArrowIcon direction="ne" /></span></button></div>
            </div>
          </FlowReveal>
        ))}
        <FlowReveal className="flow-work-outro"><span>The next project<br />could be yours.</span><a href="#contact" aria-label="Start your project"><span aria-hidden="true"><ArrowIcon direction="se" /></span></a></FlowReveal>
      </div>
      <FlowDialog open={Boolean(selected)} onClose={() => setSelected(null)} titleId="flow-project-title" label="A closer look / Selected work">
        {selected && <>
          <p className="flow-eyebrow">{selected.category} / {selected.name}</p>
          <h2 id="flow-project-title">{selected.title}</h2><p className="flow-dialog-description">{selected.detail}</p>
          <img className="flow-dialog-image" src={selected.image} alt={selected.imageAlt} />
          {selected.gallery?.map((view) => <div key={view.image}>
            <p className="flow-eyebrow">{view.label}</p>
            <img className="flow-dialog-image" src={view.image} alt={view.alt} loading="lazy" />
          </div>)}
          <p className="flow-eyebrow">Interface detail / {selected.detailLabel}</p>
          <img className="flow-dialog-image" src={selected.secondaryImage} alt={selected.secondaryAlt} loading="lazy" />
          <a className="flow-text-link" href="#contact" onClick={() => setSelected(null)}>Have something in mind? <span aria-hidden="true"><ArrowIcon direction="ne" /></span></a>
        </>}
      </FlowDialog>
    </section>
  );
}

