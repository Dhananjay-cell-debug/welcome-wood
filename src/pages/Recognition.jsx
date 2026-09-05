import {
  Eyebrow,
  PageHeading,
  Picture,
  TextLink,
  Invitation,
} from "../components/Editorial";

export default function Recognition() {
  return (
    <>
      <PageHeading
        number="06"
        label="THE STUDIO ARCHIVE"
        title="Notes, voices"
        italic="& recognition."
      >
        A home for the stories around the work: publications, project
        recognition and the people who experience our spaces.
      </PageHeading>
      <div className="ww-wrap">
        <Picture
          src="/ref/ref-detail-2.jpg"
          alt="Concept detail with warm materials and soft light"
          className="ww-archive-banner"
          eager
        />
      </div>
      <section className="ww-section ww-wrap" data-nav-theme="light">
        <div className="ww-section-heading">
          <div>
            <Eyebrow>AN ARCHIVE IN THE MAKING</Eyebrow>
            <h2>
              Good work has
              <br />
              <em>many perspectives.</em>
            </h2>
          </div>
          <p className="ww-heading-note">
            The layouts are ready.
            <br />
            The real stories will follow.
          </p>
        </div>
        <div className="ww-archive-grid">
          {[
            [
              "01",
              "In print & online",
              "PUBLICATIONS",
              "A space for approved press features, editorial coverage and links to the original stories.",
            ],
            [
              "02",
              "Work, recognised",
              "AWARDS",
              "A space for verified awards, the project behind each recognition and the year it was received.",
            ],
            [
              "03",
              "In their own words",
              "CLIENT REFLECTIONS",
              "A space for genuine client experiences, shared with their permission.",
            ],
          ].map(([n, title, label, body]) => (
            <article className="ww-archive-card" key={n}>
              <span className="ww-archive-n">{n}</span>
              <Eyebrow>{label}</Eyebrow>
              <h3>{title}</h3>
              <p>{body}</p>
              <span className="ww-archive-status">CONTENT TO FOLLOW</span>
            </article>
          ))}
        </div>
        <p className="ww-editor-note">
          Presentation layouts only. No awards, press coverage or testimonials
          are claimed.
        </p>
      </section>
      <section className="ww-archive-contact ww-wrap">
        <Eyebrow>FOR EDITORIAL & COLLABORATION ENQUIRIES</Eyebrow>
        <h3>Let’s make a connection.</h3>
        <TextLink href="#/contact">Contact the studio</TextLink>
      </section>
      <Invitation compact />
    </>
  );
}
