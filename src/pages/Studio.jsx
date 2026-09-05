import {
  Eyebrow,
  PageHeading,
  Picture,
  RevealIn,
  TextLink,
  Invitation,
} from "../components/Editorial";
import Monogram from "../components/Monogram";

export default function Studio() {
  return (
    <>
      <PageHeading
        number="01"
        label="THE STUDIO"
        title="Spaces with soul."
        italic="Made for living."
      >
        A considered approach to interiors, materials and the everyday
        experience of a space.
      </PageHeading>
      <div className="ww-wrap">
        <Picture
          src="/ref/ref-living-warm.jpg"
          alt="Concept interior with sculptural timber staircase and daylight"
          className="ww-studio-banner"
          eager
        />
      </div>
      <section className="ww-section ww-wrap" data-nav-theme="light">
        <div className="ww-editorial-split">
          <Eyebrow>OUR POINT OF VIEW</Eyebrow>
          <RevealIn>
            <h2>
              A room should feel
              <br />
              as good as it looks.
              <br />
              <em>And feel like you.</em>
            </h2>
            <div className="ww-two-paragraphs">
              <p>
                Welcome Woods Interior brings together residential and
                commercial interiors, space planning and interior styling. Our
                starting point is simple: understand the life a space needs to
                hold.
              </p>
              <p>
                From the broad arrangement of a room to the material you touch
                every day, the small decisions shape the whole experience.
                Warmth, usefulness and a sense of belonging guide the direction.
              </p>
            </div>
          </RevealIn>
        </div>
      </section>
      <section
        id="philosophy"
        className="ww-section ww-philosophy"
        data-nav-theme="dark"
      >
        <div className="ww-wrap">
          <div className="ww-section-heading">
            <div>
              <Eyebrow>THE THINGS WE LOOK FOR</Eyebrow>
              <h2>
                A quieter kind
                <br />
                <em>of distinction.</em>
              </h2>
            </div>
            <p className="ww-heading-note">
              A design direction rooted in how
              <br />a space feels, works and ages.
            </p>
          </div>
          <div className="ww-value-grid">
            {[
              [
                "01",
                "People before plans",
                "Start with the daily rituals, practical needs and personal preferences that make every brief different.",
              ],
              [
                "02",
                "Materials with character",
                "Let texture, grain and the natural qualities of a material contribute to the identity of a room.",
              ],
              [
                "03",
                "Purpose in every detail",
                "Connect proportion, circulation, lighting and storage so beauty has a practical foundation.",
              ],
            ].map(([n, title, body]) => (
              <RevealIn key={n}>
                <span>{n}</span>
                <h3>{title}</h3>
                <p>{body}</p>
              </RevealIn>
            ))}
          </div>
        </div>
      </section>
      <section
        className="ww-section ww-wrap ww-studio-materials"
        data-nav-theme="light"
      >
        <Picture
          src="/ref/ref-detail-3.jpg"
          alt="Concept material and furniture detail"
        />
        <div>
          <Eyebrow>THE FINISHING TOUCH</Eyebrow>
          <h2>
            Less noise.
            <br />
            <em>More feeling.</em>
          </h2>
          <p>
            A considered space does not need to say everything at once. A few
            materials, placed with care. Light allowed to move. Furniture that
            belongs. The confidence to leave room for life.
          </p>
          <TextLink href="#/projects">Explore the design studies</TextLink>
        </div>
      </section>
      <section className="ww-section ww-team-section" data-nav-theme="light">
        <div className="ww-wrap">
          <div className="ww-section-heading">
            <div>
              <Eyebrow>THE PEOPLE BEHIND THE SPACES</Eyebrow>
              <h2>
                A shared eye.
                <br />
                <em>A personal commitment.</em>
              </h2>
            </div>
            <p className="ww-heading-note">
              Meet the people who will bring
              <br />
              your project into focus.
            </p>
          </div>
          <div className="ww-team-layout">
            <div className="ww-team-portrait">
              <Monogram className="ww-team-mark" strokeWidth={3} />
              <span>STUDIO PORTRAIT TO FOLLOW</span>
            </div>
            <div className="ww-team-story">
              <Eyebrow>STUDIO PROFILE / COMING INTO FOCUS</Eyebrow>
              <h3>The Welcome Woods story</h3>
              <p>
                This space is reserved for the founder’s introduction, the
                studio’s journey and the people behind the work.
              </p>
              <p className="ww-editor-note">
                Profile, names, roles and photographs will be added with the
                team’s approval.
              </p>
              <TextLink href="#/contact">Connect with the studio</TextLink>
            </div>
          </div>
        </div>
      </section>
      <section className="ww-recognition-teaser ww-wrap" data-nav-theme="light">
        <Eyebrow>NOTES & RECOGNITION</Eyebrow>
        <h3>Stories worth sharing.</h3>
        <TextLink href="#/recognition">The studio archive</TextLink>
      </section>
      <Invitation />
    </>
  );
}
