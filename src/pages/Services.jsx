import { ArrowUpRight } from "lucide-react";
import { services } from "../data/site";
import {
  Eyebrow,
  PageHeading,
  Picture,
  RevealIn,
  TextLink,
  Invitation,
} from "../components/Editorial";

export default function Services() {
  return (
    <>
      <PageHeading
        number="02"
        label="OUR EXPERTISE"
        title="From possibility"
        italic="to a sense of place."
      >
        A home. A place of work. A space ready for a new chapter. Explore where
        we can begin.
      </PageHeading>
      <nav className="ww-service-index ww-wrap" aria-label="Explore services">
        {services.map((s) => (
          <a href={`#/services?service=${s.id}`} key={s.id}>
            <span>{s.n}</span>
            {s.title}
            <ArrowUpRight size={15} strokeWidth={1} />
          </a>
        ))}
      </nav>
      <div className="ww-wrap">
        {services.map((s, i) => (
          <section
            className={`ww-service-detail ${i % 2 ? "ww-service-reverse" : ""}`}
            id={s.id}
            key={s.id}
            data-nav-theme="light"
          >
            <Picture
              src={s.image}
              alt={`${s.title} — concept reference`}
              className="ww-service-detail-picture"
              eager={i === 0}
            />
            <RevealIn className="ww-service-detail-copy">
              <Eyebrow>{s.n} / OUR EXPERTISE</Eyebrow>
              <h2>{s.title}</h2>
              <h3>{s.short}</h3>
              <p>{s.description}</p>
              <ul>
                {s.scope.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="ww-service-note">{s.note}</p>
              <TextLink href={`#/contact?service=${s.id}`}>
                Discuss your project
              </TextLink>
            </RevealIn>
          </section>
        ))}
      </div>
      <section className="ww-scope-note ww-wrap" data-nav-theme="light">
        <Eyebrow>EVERY PROJECT IS INDIVIDUAL</Eyebrow>
        <p>
          Start with what your space needs. We will discuss the right
          combination of services, the project scope and the next steps
          together.
        </p>
        <span className="ww-editor-note">
          Service descriptions are presentation drafts pending the client’s
          final approval.
        </span>
      </section>
      <Invitation />
    </>
  );
}
