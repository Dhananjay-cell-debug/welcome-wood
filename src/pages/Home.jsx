import { useState } from "react";
import { ArrowRight, Plus, Minus } from "lucide-react";
import Hero from "../sections/Hero";
import {
  Eyebrow,
  Picture,
  ProjectCard,
  RevealIn,
  TextLink,
  Invitation,
} from "../components/Editorial";
import { projects, services, process } from "../data/site";

function Expertise() {
  const [active, setActive] = useState(0);
  return (
    <section
      id="services"
      className="ww-section ww-expertise"
      data-nav-theme="light"
    >
      <div className="ww-wrap">
        <div className="ww-section-heading">
          <div>
            <Eyebrow>03 / OUR EXPERTISE</Eyebrow>
            <h2>
              Considered as a whole.
              <br />
              <em>Crafted in every detail.</em>
            </h2>
          </div>
          <TextLink href="#/services">Explore our expertise</TextLink>
        </div>
        <div className="ww-expertise-grid">
          <div className="ww-service-visual">
            {services.map((s, i) => (
              <img
                key={s.id}
                src={s.image}
                alt={s.title + " — concept reference"}
                className={active === i ? "is-active" : ""}
                loading="lazy"
              />
            ))}
            <span className="ww-image-tag">CONCEPT IMAGE</span>
            <span className="ww-service-caption">{services[active].short}</span>
          </div>
          <div className="ww-service-accordion">
            {services.map((s, i) => (
              <div
                className={`ww-service-item ${active === i ? "is-active" : ""}`}
                key={s.id}
              >
                <button
                  aria-expanded={active === i}
                  aria-controls={`service-preview-${s.id}`}
                  onClick={() => setActive(i)}
                >
                  <span className="ww-service-n">{s.n}</span>
                  <span>{s.title}</span>
                  {active === i ? (
                    <Minus size={17} strokeWidth={1} />
                  ) : (
                    <Plus size={17} strokeWidth={1} />
                  )}
                </button>
                <div
                  id={`service-preview-${s.id}`}
                  hidden={active !== i}
                  className="ww-service-body"
                >
                  <p>{s.description}</p>
                  <TextLink href={`#/services?service=${s.id}`}>
                    Discover this service
                  </TextLink>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default function Home({ revealed }) {
  return (
    <>
      <Hero revealed={revealed} />
      <section
        id="vision"
        className="ww-section ww-introduction"
        data-nav-theme="light"
      >
        <div className="ww-wrap">
          <RevealIn>
            <Eyebrow>01 / THE WELCOME WOODS WAY</Eyebrow>
            <div className="ww-intro-grid">
              <h2>
                A space is more
                <br />
                than what you see.
                <br />
                <em>It is how you feel.</em>
              </h2>
              <div className="ww-intro-aside">
                <span className="ww-small-rule" />
                <p>
                  Light across a wall. The warmth of timber under your hand. A
                  room that makes everyday life feel a little more considered.
                </p>
                <p>
                  Welcome Woods brings interiors, spatial thinking and execution
                  into one conversation, beginning with the people who will call
                  a space their own.
                </p>
                <TextLink href="#/studio">Meet the studio</TextLink>
              </div>
            </div>
          </RevealIn>
          <div className="ww-discipline-line">
            <span>RESIDENTIAL</span>
            <span>COMMERCIAL</span>
            <span>SPACE PLANNING</span>
            <span>INTERIOR STYLING</span>
          </div>
        </div>
      </section>

      <section
        id="projects"
        className="ww-section ww-selected"
        data-nav-theme="light"
      >
        <div className="ww-wrap">
          <div className="ww-section-heading">
            <div>
              <Eyebrow>02 / SELECTED SPACES</Eyebrow>
              <h2>
                Different spaces.
                <br />
                <em>One considered approach.</em>
              </h2>
            </div>
            <div>
              <p className="ww-heading-note">
                An exploration of the spaces,
                <br />
                materials and moments that move us.
              </p>
              <TextLink href="#/projects">Explore the collection</TextLink>
            </div>
          </div>
          <div className="ww-project-grid">
            <ProjectCard project={projects[0]} />
            <ProjectCard project={projects[1]} />
          </div>
          <p className="ww-editor-note">
            Design presentation — sample project layouts and reference imagery.
            Approved Welcome Woods projects will follow.
          </p>
        </div>
      </section>

      <section className="ww-full-moment" data-nav-theme="dark">
        <img
          src="/ref/ref-wide.jpg"
          alt="Concept interior showing soft daylight across a generous living space"
          loading="lazy"
        />
        <div className="ww-moment-shade" />
        <RevealIn className="ww-moment-copy">
          <Eyebrow>THE BEAUTY OF BELONGING</Eyebrow>
          <h2>
            Some spaces are seen.
            <br />
            <em>Others are felt.</em>
          </h2>
        </RevealIn>
        <span className="ww-moment-caption">
          CONCEPT IMAGE / AN EXPLORATION OF LIGHT & SPACE
        </span>
      </section>

      <Expertise />

      <section
        id="interiors"
        className="ww-section ww-craft"
        data-nav-theme="dark"
      >
        <div className="ww-wrap ww-craft-grid">
          <div className="ww-craft-copy">
            <Eyebrow>04 / THE MATERIAL LANGUAGE</Eyebrow>
            <h2>
              Honest materials.
              <br />
              <em>Quiet character.</em>
            </h2>
            <p>
              Timber with a grain of its own. Stone that catches the light.
              Textures that ask to be touched. We see the character of a space
              in the materials that bring it together.
            </p>
            <div className="ww-material-swatches">
              <span>
                <i className="ww-swatch-wood" />
                Timber
              </span>
              <span>
                <i className="ww-swatch-stone" />
                Stone
              </span>
              <span>
                <i className="ww-swatch-linen" />
                Linen
              </span>
              <span>
                <i className="ww-swatch-metal" />
                Metal
              </span>
            </div>
            <TextLink href="#/studio?section=philosophy">
              Our design philosophy
            </TextLink>
          </div>
          <RevealIn className="ww-craft-images">
            <Picture
              src="/ref/ref-detail-1.jpg"
              alt="Concept detail of warm natural materials"
              className="ww-craft-large"
            />
            <Picture
              src="/ref/ref-detail-2.jpg"
              alt="Concept furniture and finish detail"
              className="ww-craft-small"
            />
          </RevealIn>
        </div>
      </section>

      <section
        id="process"
        className="ww-section ww-home-process"
        data-nav-theme="light"
      >
        <div className="ww-wrap">
          <div className="ww-section-heading">
            <div>
              <Eyebrow>05 / FROM THE FIRST HELLO</Eyebrow>
              <h2>
                A clear path.
                <br />
                <em>A shared vision.</em>
              </h2>
            </div>
            <TextLink href="#/process">How we work</TextLink>
          </div>
          <div className="ww-process-summary">
            {[process[0], process[2], process[4]].map((p, i) => (
              <RevealIn key={p.n}>
                <span className="ww-process-dot">0{i + 1}</span>
                <h3>
                  {
                    [
                      "Listen & understand",
                      "Imagine & resolve",
                      "Create & complete",
                    ][i]
                  }
                </h3>
                <p>{p.body}</p>
                <ArrowRight size={22} strokeWidth={1} />
              </RevealIn>
            ))}
          </div>
          <p className="ww-editor-note">
            Proposed process for presentation. The final scope and sequence are
            agreed for each project.
          </p>
        </div>
      </section>

      <section className="ww-home-studio" data-nav-theme="light">
        <Picture
          src="/ref/ref-living-warm.jpg"
          alt="Concept architectural staircase with warm timber and natural light"
          caption={false}
        />
        <div className="ww-home-studio-copy">
          <Eyebrow>THE STUDIO</Eyebrow>
          <h2>
            Designed around
            <br />
            <em>the way you live.</em>
          </h2>
          <p>
            The most personal spaces begin with an understanding of the people
            behind them. Discover the thinking behind Welcome Woods.
          </p>
          <TextLink href="#/studio">A closer look</TextLink>
          <span className="ww-editor-note">Concept image</span>
        </div>
      </section>
      <div id="enquire">
        <Invitation />
      </div>
    </>
  );
}
