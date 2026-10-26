import { useEffect, useRef } from "react";

export default function FlowDialog({ open, onClose, titleId, label, busy = false, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const dialog = ref.current;
    if (!open) {
      if (dialog.open) dialog.close();
      return;
    }
    const previousOverflow = document.body.style.overflow;
    if (!dialog.open) dialog.showModal();
    document.body.style.overflow = "hidden";
    window.dispatchEvent(new Event("portfolio:dialog"));
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      window.dispatchEvent(new Event("portfolio:dialog"));
    };
  }, [open]);

  const closeFromBackdrop = (event) => {
    if (busy || event.target !== ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) {
      ref.current.close();
    }
  };

  return (
    <dialog ref={ref} className="flow-dialog" data-lenis-prevent aria-labelledby={titleId} onClose={onClose}
      onCancel={(event) => { if (busy) event.preventDefault(); }} onClick={closeFromBackdrop}>
      <div className="flow-dialog-bar">
        <span>{label}</span>
        <button type="button" onClick={() => ref.current.close()} disabled={busy} aria-label="Close detail view">Close <span aria-hidden="true">×</span></button>
      </div>
      <div className="flow-dialog-scroll">{children}</div>
    </dialog>
  );
}
