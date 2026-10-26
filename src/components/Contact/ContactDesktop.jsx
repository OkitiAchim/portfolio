import { useState } from "react";
import FlowReveal from "../Flow/FlowReveal";
import FlowDialog from "../Flow/FlowDialog";
import "../Flow/flow.css";

const email = "Ovwegbaokiti@gmail.com";
const projectTypes = ["A website", "An interface", "A web application", "Something else"];

export default function ContactView({ form, handleChange, handleSubmit, status, isSending }) {
  const [review, setReview] = useState(null);
  const [emailCopy, setEmailCopy] = useState("Copy email");
  const [briefCopy, setBriefCopy] = useState("Copy brief");

  async function copy(text, setter, success) {
    try {
      await navigator.clipboard.writeText(text);
      setter(success);
    } catch {
      setter("Select the text to copy");
    }
  }

  const reviewBrief = (event) => {
    event.preventDefault();
    setBriefCopy("Copy brief");
    setReview({ ...form });
  };
  const briefText = review ? `PROJECT BRIEF\n\nProject: ${review.projectType}\nName: ${review.name}\nEmail: ${review.email}\n\nThe idea\n${review.message}` : "";

  return (
    <section className="flow-contact" aria-labelledby="flow-contact-title">
      <div className="flow-contact-content">
        <div className="flow-contact-top"><p className="flow-eyebrow">Your move / Let’s talk</p><span className="flow-contact-status"><i aria-hidden="true" />Open to new conversations</span></div>
        <FlowReveal><h2 id="flow-contact-title" className="flow-contact-title">Something<br /><span>on your mind?</span><a href="#contact-brief" aria-label="Start your project brief"><span aria-hidden="true">↗</span></a></h2></FlowReveal>
        <div className="flow-contact-grid">
          <FlowReveal className="flow-contact-copy">
            <p>A website. A better interface.<br />That idea you keep coming back to.</p><p>Let’s give it a place to live.</p>
            <a href={`mailto:${email}`} className="flow-email">{email}<span aria-hidden="true">↗</span></a>
            <button type="button" className="flow-copy-email" onClick={() => copy(email, setEmailCopy, "Email copied ✓")} aria-live="polite">{emailCopy}<span aria-hidden="true">⧉</span></button>
            <div className="flow-direct-links"><a href="https://wa.me/2349052193656" target="_blank" rel="noopener noreferrer">WhatsApp <span aria-hidden="true">↗</span></a><a href="tel:+2349063703235">+234 906 370 3235 <span aria-hidden="true">↗</span></a></div>
          </FlowReveal>
          <FlowReveal className="flow-brief-wrap">
            <form className="flow-brief" id="contact-brief" onSubmit={reviewBrief}>
              <div className="flow-brief-heading"><span>Let’s start with the basics</span><span>Project brief <span aria-hidden="true">↘</span></span></div>
              <fieldset><legend>01 / What are we making?</legend><div className="flow-choices">{projectTypes.map((type) => <label key={type} className="flow-choice"><input type="radio" name="projectType" value={type} checked={form.projectType === type} onChange={handleChange} required /><span>{type}<b aria-hidden="true">{form.projectType === type ? "✓" : "+"}</b></span></label>)}</div></fieldset>
              <div className="flow-form-fields"><label htmlFor="contact-name">Your name<input id="contact-name" name="name" autoComplete="name" placeholder="Your name" value={form.name} onChange={handleChange} required maxLength={120} /></label><label htmlFor="contact-email">Your email<input id="contact-email" name="email" type="email" autoComplete="email" placeholder="you@company.com" value={form.email} onChange={handleChange} required maxLength={254} /></label></div>
              <label className="flow-message-label" htmlFor="contact-message">02 / Tell me a little about it<textarea id="contact-message" name="message" placeholder="The idea, the challenge, the possibilities…" rows={3} value={form.message} onChange={handleChange} required maxLength={5000} /></label>
              <button className="flow-submit" type="submit" disabled={isSending}><span>Review project brief</span><span aria-hidden="true">↗</span></button>
              <p className="flow-form-note">A little context goes a long way. Review your message before sending.</p>
            </form>
          </FlowReveal>
        </div>
        <footer className="flow-footer"><a className="flow-wordmark" href="#hero" aria-label="Back to the top">UNBOX<span>®</span></a><p>© {new Date().getFullYear()} AchimOkiti.dev<br />Design & development</p><div><a href="https://github.com/OkitiAchim" target="_blank" rel="noopener noreferrer">GitHub <span aria-hidden="true">↗</span></a><a href="#hero">Back to top <span aria-hidden="true">↑</span></a></div></footer>
      </div>
      <FlowDialog open={Boolean(review)} onClose={() => setReview(null)} busy={isSending} titleId="flow-brief-title" label="Your project brief / Review & send">
        {review && <>
          <p className="flow-eyebrow">A first step, considered.</p><h2 id="flow-brief-title">Your idea,<br /><em>in focus.</em></h2>
          <dl className="flow-brief-summary"><div><dt>Project</dt><dd>{review.projectType}</dd></div><div><dt>Name</dt><dd>{review.name}</dd></div><div><dt>Email</dt><dd>{review.email}</dd></div></dl>
          <div className="flow-brief-message"><p className="flow-eyebrow">The idea</p><p>{review.message}</p></div>
          <form onSubmit={handleSubmit} className="flow-review-actions">
            {status.message && <p className={`flow-send-status flow-send-${status.type}`} role={status.type === "error" ? "alert" : "status"}>{status.message}</p>}
            {status.type !== "success" && <button type="submit" className="flow-submit" disabled={isSending}><span>{isSending ? "Sending your message…" : status.type === "error" ? "Try sending again" : "Send message"}</span><span aria-hidden="true">↗</span></button>}
            <div className="flow-review-tools"><button type="button" className="flow-text-link" disabled={isSending} onClick={() => setReview(null)}>{status.type === "success" ? "Close" : "Edit brief"}<span aria-hidden="true">↙</span></button><button type="button" className="flow-text-link" aria-live="polite" onClick={() => copy(briefText, setBriefCopy, "Brief copied ✓")}>{briefCopy}<span aria-hidden="true">⧉</span></button></div>
            <p className="flow-form-note">{status.type === "success" ? "You can keep a copy of your brief for reference." : <>Your message will be sent to Achim. Prefer email? <a href={`mailto:${email}`}>{email}</a></>}</p>
          </form>
        </>}
      </FlowDialog>
    </section>
  );
}
