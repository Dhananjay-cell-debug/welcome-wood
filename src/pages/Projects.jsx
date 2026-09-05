import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { projects } from "../data/site";
import { getLenis } from "../lib/useSmoothScroll";
import {
  BackLink,
  Eyebrow,
  PageHeading,
  Picture,
  ProjectCard,
  Invitation,
  TextLink,
} from "../components/Editorial";

export function Projects() {
  return (
    <>
      <PageHeading
        number="03"
        label="SELECTED SPACES"
        title="An eye for detail."
        italic="A feeling of home."
      >
        An editorial collection of design studies. Each one explores a different
        way a space can feel.
      </PageHeading>
      <div className="ww-wrap ww-collection-note">
        <span>THE DESIGN COLLECTION</span>
        <span>01 — 03</span>
        <p>
          Concept studies for layout presentation. Photography and project
          details will be replaced with approved Welcome Woods work.
        </p>
      </div>
      <section className="ww-wrap ww-portfolio-grid" data-nav-theme="light">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </section>
      <section className="ww-portfolio-end ww-wrap" data-nav-theme="light">
        <span className="ww-small-rule" />
        <Eyebrow>THE COLLECTION CONTINUES</Eyebrow>
        <h2>
          Every space has a story.
          <br />
          <em>Yours could be next.</em>
        </h2>
        <TextLink href="#/contact">Tell us what you have in mind</TextLink>
      </section>
      <Invitation compact />
    </>
  );
}

function Gallery({ images, title }) {
  const [active, setActive] = useState(null);
  const dialog = useRef(null);
  const previousFocus = useRef(null);
  const isOpen = active !== null;
  useEffect(() => {
    if (!isOpen) return;
    const el = dialog.current;
    const oldOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    getLenis()?.stop();
    el.showModal();
    const key = (e) => {
      if (e.key === "ArrowRight") setActive((i) => (i + 1) % images.length);
      if (e.key === "ArrowLeft")
        setActive((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener("keydown", key);
    return () => {
      el.close();
      document.body.style.overflow = oldOverflow;
      getLenis()?.start();
      window.removeEventListener("keydown", key);
      previousFocus.current?.focus();
    };
  }, [isOpen, images.length]);
  return (
    <>
      <div className="ww-detail-gallery">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={(e) => {
              previousFocus.current = e.currentTarget;
              setActive(i);
            }}
            aria-label={`Enlarge ${img.alt}`}
          >
            <Picture src={img.src} alt={img.alt} caption={false} />
            <span className="ww-gallery-number">
              0{i + 1} <span>VIEW IMAGE ↗</span>
            </span>
          </button>
        ))}
      </div>
      <dialog
        ref={dialog}
        className="ww-lightbox"
        aria-label={`${title} image gallery`}
        onCancel={() => setActive(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) setActive(null);
        }}
      >
        {active !== null && (
          <>
            <button
              className="ww-lightbox-close"
              onClick={() => setActive(null)}
              aria-label="Close image gallery"
            >
              <X size={25} strokeWidth={1} />
            </button>
            <img src={images[active].src} alt={images[active].alt} />
            <div className="ww-lightbox-bottom">
              <button
                aria-label="Previous image"
                onClick={() =>
                  setActive((i) => (i - 1 + images.length) % images.length)
                }
              >
                <ArrowLeft size={22} />
              </button>
              <p>
                {active + 1} / {images.length} <span>CONCEPT IMAGE</span>
              </p>
              <button
                aria-label="Next image"
                onClick={() => setActive((i) => (i + 1) % images.length)}
              >
                <ArrowRight size={22} />
              </button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
}

export function ProjectDetail({ project }) {
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  const images = [
    { src: project.wide, alt: "Wide interior concept" },
    { src: project.portrait, alt: "Room and spatial proportions concept" },
    { src: project.detail, alt: "Materials and finishing detail concept" },
  ];
  return (
    <>
      <div className="ww-project-heading ww-wrap" data-nav-theme="light">
        <BackLink />
        <Eyebrow>
          DESIGN STUDY {project.number} / {project.category}
        </Eyebrow>
        <h1>{project.title}</h1>
        <p>{project.caption}</p>
      </div>
      <div className="ww-wrap">
        <Picture
          src={project.image}
          alt={project.category + " concept"}
          position={project.position}
          className="ww-project-hero"
          eager
        />
      </div>
      <section className="ww-project-specs ww-wrap" data-nav-theme="light">
        <div>
          <Eyebrow>DISCIPLINE</Eyebrow>
          <p>{project.category}</p>
        </div>
        <div>
          <Eyebrow>PRESENTATION</Eyebrow>
          <p>Concept design study</p>
        </div>
        <div>
          <Eyebrow>MATERIAL DIRECTION</Eyebrow>
          <p>{project.materials.join(" · ")}</p>
        </div>
      </section>
      <section className="ww-section ww-wrap" data-nav-theme="light">
        <div className="ww-editorial-split">
          <Eyebrow>THE IDEA</Eyebrow>
          <div>
            <h2>{project.theme}</h2>
            <p className="ww-story-intro">{project.summary}</p>
            <div className="ww-two-paragraphs">
              <div>
                <Eyebrow>THE BRIEF</Eyebrow>
                <p>{project.brief}</p>
              </div>
              <div>
                <Eyebrow>THE APPROACH</Eyebrow>
                <p>{project.approach}</p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="ww-wrap" data-nav-theme="light">
        <Gallery images={images} title={project.title} />
        <p className="ww-editor-note">
          All imagery on this study is a reference for presentation. No project
          ownership, location, area, completion date or project credit is being
          claimed.
        </p>
      </section>
      <section
        className="ww-section ww-wrap ww-project-story-footer"
        data-nav-theme="light"
      >
        <div>
          <Eyebrow>THE PROJECT STORY, WHEN READY</Eyebrow>
          <h3>
            From first idea
            <br />
            <em>to the final detail.</em>
          </h3>
        </div>
        <p>
          The final case study will bring together the client brief, approved
          project facts, a complete image gallery, site progress and the story
          of the finished space.
        </p>
      </section>
      <a
        href={`#/projects/${next.slug}`}
        className="ww-next-project"
        data-nav-theme="dark"
      >
        <img src={next.image} alt="" loading="lazy" />
        <div className="ww-wrap">
          <Eyebrow>NEXT DESIGN STUDY</Eyebrow>
          <h2>{next.title}</h2>
          <ArrowRight size={38} strokeWidth={1} />
          <span>CONCEPT IMAGE</span>
        </div>
      </a>
    </>
  );
}
