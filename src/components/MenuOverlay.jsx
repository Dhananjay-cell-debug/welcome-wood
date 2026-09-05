import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import { contact, navigation } from "../data/site";
import { getLenis } from "../lib/useSmoothScroll";
import Monogram from "./Monogram";

export default function MenuOverlay({ open, onClose, routePath }) {
  const [hovered, setHovered] = useState(0);
  const root = useRef(null);
  const closeButton = useRef(null);
  useEffect(() => {
    if (!open) return;
    const before = document.activeElement;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    closeButton.current?.focus();
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key !== "Tab") return;
      const els = [...root.current.querySelectorAll("a[href], button")];
      const first = els[0],
        last = els[els.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      getLenis()?.start();
      window.removeEventListener("keydown", onKey);
      before?.focus({ preventScroll: true });
    };
  }, [open, onClose]);
  return (
    <div
      id="site-menu"
      ref={root}
      className={"ww-menu " + (open ? "is-open" : "")}
      role="dialog"
      aria-modal="true"
      aria-label="Site menu"
      aria-hidden={!open}
      inert={!open}
      data-lenis-prevent
    >
      <div className="ww-menu-top">
        <a href="#/" onClick={onClose} aria-label="Welcome Woods home">
          <Monogram strokeWidth={3} />
        </a>
        <button
          ref={closeButton}
          className="ww-menu-close"
          onClick={onClose}
          aria-label="Close menu"
        >
          CLOSE <X size={24} strokeWidth={1} />
        </button>
      </div>
      <div className="ww-menu-inner">
        <div className="ww-menu-grid">
          <nav aria-label="Main navigation">
            <p className="ww-eyebrow">WELCOME TO OUR WORLD</p>
            {navigation.map((n, i) => (
              <a
                key={n.href}
                className={
                  "ww-menu-link " +
                  (n.href === "#" + routePath ? "is-current" : "")
                }
                href={n.href}
                onClick={onClose}
                onMouseEnter={() => setHovered(i)}
                onFocus={() => setHovered(i)}
                aria-current={n.href === "#" + routePath ? "page" : undefined}
              >
                <span>0{i + 1}</span>
                <em>{n.label}</em>
              </a>
            ))}
          </nav>
          <div className="ww-menu-image">
            <img src={navigation[hovered].image} alt="" />
            <span>DESIGN PRESENTATION / CONCEPT IMAGE</span>
          </div>
        </div>
        <div className="ww-menu-bottom">
          <a href={"mailto:" + contact.email}>{contact.email}</a>
          <a href={"tel:" + contact.tel}>{contact.phone}</a>
          <span>Designing spaces. Creating experiences.</span>
        </div>
      </div>
    </div>
  );
}
