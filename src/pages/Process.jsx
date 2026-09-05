import { useState } from "react";
import { Plus, Minus } from "lucide-react";
import { faqs, process } from "../data/site";
import {
  Eyebrow,
  PageHeading,
  Picture,
  RevealIn,
  TextLink,
  Invitation,
} from "../components/Editorial";

export function FAQs() {
  const [active, setActive] = useState(null);
  return (
    <div className="ww-faqs">
      {faqs.map(([question, answer], i) => (
        <div className="ww-faq" key={question}>
          <button
            aria-expanded={active === i}
            aria-controls={`faq-answer-${i}`}
            onClick={() => setActive(active === i ? null : i)}
          >
            {question}
            {active === i ? <Minus size={18} /> : <Plus size={18} />}
          </button>
          <p id={`faq-answer-${i}`} hidden={active !== i}>
            {answer}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function Process() {
  return (
    <>
      <PageHeading
        number="04"
        label="THE PROCESS"
        title="Good spaces begin"
        italic="with good conversations."
      >
        A thoughtful journey from the first discussion to the finishing details,
        with room for your ideas at every step.
      </PageHeading>
      <div className="ww-wrap">
        <Picture
          src="/ref/ref-kitchen.jpg"
          alt="Concept kitchen with warm materials and considered detailing"
          className="ww-process-banner"
          eager
        />
      </div>
      <section
        className="ww-section ww-wrap ww-process-layout"
        data-nav-theme="light"
      >
        <aside>
          <Eyebrow>FROM IDEA TO EVERYDAY</Eyebrow>
          <h2>
            Six moments.
            <br />
            <em>One shared direction.</em>
          </h2>
          <p>
            A proposed framework for working together. Your project’s scope,
            sequence and deliverables will be confirmed with the team.
          </p>
          <TextLink href="#/contact">Start the conversation</TextLink>
        </aside>
        <div className="ww-process-timeline">
          {process.map((p) => (
            <RevealIn key={p.n} className="ww-process-step">
              <span className="ww-step-n">{p.n}</span>
              <Eyebrow>{p.subtitle}</Eyebrow>
              <h3>{p.title}</h3>
              <p>{p.body}</p>
              <div className="ww-step-outcome">
                <span>TAKING SHAPE</span>
                {p.deliverable}
              </div>
            </RevealIn>
          ))}
        </div>
      </section>
      <section className="ww-section ww-prepare" data-nav-theme="dark">
        <div className="ww-wrap ww-prepare-grid">
          <div>
            <Eyebrow>BEFORE WE MEET</Eyebrow>
            <h2>
              Bring your ideas.
              <br />
              <em>We will start there.</em>
            </h2>
          </div>
          <div>
            <p>
              You do not need to have everything figured out. A few useful
              starting points can make the first conversation more meaningful.
            </p>
            <ul>
              <li>A location and the kind of space</li>
              <li>Existing plans or a few site photographs</li>
              <li>What you want the space to do for you</li>
              <li>References, preferences and priorities</li>
              <li>An indicative budget and timeframe, if known</li>
            </ul>
          </div>
        </div>
      </section>
      <section
        className="ww-section ww-wrap ww-faq-layout"
        data-nav-theme="light"
      >
        <div>
          <Eyebrow>A LITTLE MORE CLARITY</Eyebrow>
          <h2>
            Before
            <br />
            <em>we begin.</em>
          </h2>
        </div>
        <FAQs />
      </section>
      <Invitation compact />
    </>
  );
}
