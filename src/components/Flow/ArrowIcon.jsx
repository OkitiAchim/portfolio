import "./arrow-icon.css";

// SVG avoids platform emoji substitution and inherits the surrounding typography.
export default function ArrowIcon({ direction = "ne" }) {
  return <svg className="ui-arrow" data-direction={direction} width="1em" height="1em" viewBox="0 0 24 24" fill="none" aria-hidden="true" focusable="false">
    <path d="M5 19 19 5M5 5h14v14" />
  </svg>;
}
