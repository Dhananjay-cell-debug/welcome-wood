import { useEffect, useRef } from "react";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import { prefersReducedMotion } from "../lib/pointer";

export function RevealIn({ children, className = "", as: Tag = "div" }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (prefersReducedMotion() || !("IntersectionObserver" in window)) return;
    el.classList.add("ww-reveal-ready");
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("ww-reveal-visible");
          observer.disconnect();
        }
      },
      { threshold: 0.08 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}

export function Eyebrow({ children, className = "" }) {
  return <p className={`ww-eyebrow ${className}`}>{children}</p>;
}

export function TextLink({ href, children, className = "", ...props }) {
  return (
    <a className={`ww-text-link ${className}`} href={href} {...props}>
      <span>{children}</span>
      <ArrowUpRight size={17} strokeWidth={1} />
    </a>
  );
}

export function Picture({
  src,
  alt,
  className = "",
  position = "center",
  caption = "Concept image · for design presentation",
  eager = false,
}) {
  return (
    <figure className={`ww-picture ${className}`}>
      <div className="ww-picture-crop">
        <img
          src={src}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          style={{ objectPosition: position }}
        />
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export function PageHeading({ number, label, title, italic, children }) {
  return (
    <section className="ww-page-heading ww-wrap" data-nav-theme="light">
      <Eyebrow>
        <span>{number}</span> / {label}
      </Eyebrow>
      <div className="ww-heading-row">
        <h1>
          {title}
          <br />
          <em>{italic}</em>
        </h1>
        {children && <p className="ww-intro-copy">{children}</p>}
      </div>
      <div className="ww-page-rule">
        <span>WELCOME WOODS INTERIOR</span>
        <span>DESIGNING SPACES. CREATING EXPERIENCES.</span>
      </div>
    </section>
  );
}

export function ProjectCard({ project, className = "" }) {
  return (
    <RevealIn className={`ww-project-card ${className}`}>
      <a
        href={`#/projects/${project.slug}`}
        aria-label={`Explore ${project.title}`}
      >
        <div className="ww-project-image">
          <img
            src={project.image}
            alt={`${project.category} concept with warm materials and considered natural light`}
            loading="lazy"
            decoding="async"
            style={{ objectPosition: project.position }}
          />
          <span className="ww-image-tag">DESIGN STUDY {project.number}</span>
          <span className="ww-image-arrow">
            <ArrowUpRight size={26} strokeWidth={1} />
          </span>
        </div>
        <div className="ww-project-meta">
          <span>{project.category}</span>
          <span>Concept preview</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.caption}</p>
      </a>
    </RevealIn>
  );
}

export function Invitation({ compact = false }) {
  return (
    <section
      className={`ww-invitation ${compact ? "ww-invitation-compact" : ""}`}
      data-nav-theme="dark"
    >
      <div className="ww-wrap">
        <Eyebrow>THE NEXT CHAPTER</Eyebrow>
        <div className="ww-invitation-row">
          <h2>
            Your space.
            <br />
            <em>Our next conversation.</em>
          </h2>
          <a
            href="#/contact"
            className="ww-circle-link"
            aria-label="Start a project"
          >
            <ArrowUpRight size={42} strokeWidth={1} />
          </a>
        </div>
        <div className="ww-invitation-bottom">
          <p>Every considered space begins with a simple hello.</p>
          <TextLink href="#/contact">Let’s begin</TextLink>
        </div>
      </div>
    </section>
  );
}

export function BackLink({
  href = "#/projects",
  children = "Back to selected spaces",
}) {
  return (
    <a href={href} className="ww-back-link">
      <ArrowRight size={15} strokeWidth={1} />
      {children}
    </a>
  );
}
