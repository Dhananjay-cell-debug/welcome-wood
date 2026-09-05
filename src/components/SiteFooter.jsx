import { contact, navigation } from "../data/site";
import Monogram from "./Monogram";
import { ArrowUpRight, ArrowUp } from "lucide-react";
import { scrollToTarget } from "../lib/useSmoothScroll";

export default function SiteFooter() {
  return (
    <footer className="ww-footer" data-nav-theme="light">
      <div className="ww-wrap">
        <div className="ww-footer-main">
          <a
            href="#/"
            className="ww-footer-brand"
            aria-label="Welcome Woods Interior home"
          >
            <Monogram strokeWidth={3} />
            <span>
              WELCOME WOODS<small>INTERIOR</small>
            </span>
          </a>
          <div className="ww-footer-links">
            <span className="ww-eyebrow">EXPLORE</span>
            {navigation.slice(1, 5).map((n) => (
              <a href={n.href} key={n.href}>
                {n.label}
              </a>
            ))}
          </div>
          <div className="ww-footer-links">
            <span className="ww-eyebrow">CONNECT</span>
            <a href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={13} />
            </a>
            <a href={`tel:${contact.tel}`}>{contact.phone}</a>
            <a href="#/recognition">Notes & recognition</a>
            <a href="#/contact">
              Start a project <ArrowUpRight size={13} />
            </a>
          </div>
        </div>
        <div className="ww-footer-wordmark" aria-hidden="true">
          Welcome Woods.
        </div>
        <div className="ww-footer-bottom">
          <span>© {new Date().getFullYear()} Welcome Woods Interior</span>
          <span>DESIGNING SPACES. CREATING EXPERIENCES.</span>
          <a
            href="#top"
            onClick={(e) => {
              e.preventDefault();
              scrollToTarget("#top");
            }}
            aria-label="Back to top"
          >
            BACK TO TOP <ArrowUp size={14} />
          </a>
        </div>
        <p className="ww-preview-notice">
          Design presentation · Current images and project stories are
          placeholders only. Final content is subject to client approval.
        </p>
      </div>
    </footer>
  );
}
