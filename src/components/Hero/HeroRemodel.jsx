import ArrowIcon from "../Flow/ArrowIcon";
import "./hero-remodel.css";

export default function HeroRemodel({ canvasRef }) {
  return <section className="h-remodel" aria-labelledby="h-remodel-title">
    <canvas ref={canvasRef} className="h-webgl" aria-hidden="true" />
    <div className="h-vignette" aria-hidden="true" />
    <div className="h-shell">
      <div className="h-meta"><span>Achim Okiti <i>/</i> Frontend developer & UI engineer</span></div>
      <div className="h-body">
        <div className="h-headline"><p className="h-eyebrow">Creative thinking. Considered engineering.</p><h1 id="h-remodel-title">Building systems<br />that <em>think,</em><br /><span>scale & endure.</span></h1></div>
        <div className="h-aside"><span className="h-index" aria-hidden="true"><ArrowIcon direction="ne" /></span><p>Crafting high-performance web applications, geospatial platforms, and AI-powered experiences.</p><span className="h-note">Designed with intention.<br />Built to endure.</span></div>
      </div>
      <div className="h-bottom"><div className="h-actions"><a href="#projects" className="h-primary">Explore selected work <span aria-hidden="true"><ArrowIcon direction="ne" /></span></a><a href="#about" className="h-secondary">A little about me <span aria-hidden="true"><ArrowIcon direction="se" /></span></a></div><a className="h-scroll" href="#about"><span className="h-scroll-line" aria-hidden="true" />Scroll to discover <span aria-hidden="true"><ArrowIcon direction="down" /></span></a></div>
    </div>
  </section>;
}
