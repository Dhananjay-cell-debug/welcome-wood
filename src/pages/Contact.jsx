import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, Check, ArrowLeft } from "lucide-react";
import { contact, services } from "../data/site";
import { Eyebrow, PageHeading, TextLink } from "../components/Editorial";
import { FAQs } from "./Process";
import { scrollToTarget } from "../lib/useSmoothScroll";

export default function Contact({ selectedService = "" }) {
  const [draft, setDraft] = useState(null);
  const panelRef = useRef(null);
  const hadDraft = useRef(false);
  useEffect(() => {
    if (draft) {
      const preview = panelRef.current.querySelector(".ww-draft");
      preview?.focus({ preventScroll: true });
      scrollToTarget(preview);
    } else if (hadDraft.current) {
      panelRef.current.querySelector('input[name="name"]')?.focus();
    }
    hadDraft.current = Boolean(draft);
  }, [draft]);
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    service: services.some((s) => s.id === selectedService)
      ? selectedService
      : "",
    type: "",
    area: "",
    budget: "",
    timeline: "",
    message: "",
    consent: false,
  });
  function change(e) {
    setValues((v) => ({
      ...v,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));
  }
  function prepare(e) {
    e.preventDefault();
    const service =
      services.find((s) => s.id === values.service)?.title || "To be discussed";
    const body = `Hello Welcome Woods,\n\nI would like to discuss a project.\n\nName: ${values.name}\nEmail: ${values.email}\nPhone: ${values.phone}\nProject location: ${values.city}\nSpace: ${values.type}\nService: ${service}\nApproximate area: ${values.area || "To be discussed"}\nBudget: ${values.budget || "To be discussed"}\nDesired start: ${values.timeline || "To be discussed"}\n\nAbout the project:\n${values.message || "I would love to discuss the possibilities."}\n\nThank you,\n${values.name}`;
    setDraft({ body, service });
  }
  const input = (name, label, props = {}) => (
    <label className="ww-field" key={name}>
      <span>
        {label}
        {props.required && " *"}
      </span>
      <input name={name} value={values[name]} onChange={change} {...props} />
    </label>
  );
  return (
    <>
      <PageHeading
        number="05"
        label="START A PROJECT"
        title="Tell us about"
        italic="your space."
      >
        A place you have. An idea you are carrying. A new beginning. We would
        love to hear about it.
      </PageHeading>
      <section className="ww-contact-layout ww-wrap" data-nav-theme="light">
        <aside className="ww-contact-aside">
          <Eyebrow>LET’S TALK</Eyebrow>
          <h2>
            A simple hello.
            <br />
            <em>A world of possibility.</em>
          </h2>
          <p>
            Share a little about your project and what you have in mind. We can
            take the conversation from there.
          </p>
          <div className="ww-contact-method">
            <Eyebrow>EMAIL THE STUDIO</Eyebrow>
            <a href={`mailto:${contact.email}`}>
              {contact.email}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="ww-contact-method">
            <Eyebrow>GIVE US A CALL</Eyebrow>
            <a href={`tel:${contact.tel}`}>
              {contact.phone}
              <ArrowUpRight size={16} />
            </a>
          </div>
          <div className="ww-contact-method">
            <Eyebrow>YOUR FIRST POINT OF CONTACT</Eyebrow>
            <span>{contact.name}</span>
          </div>
          <p className="ww-contact-footnote">
            Please include your project’s city. The team will confirm
            availability for your location.
          </p>
        </aside>
        <div className="ww-enquiry-panel" ref={panelRef}>
          {!draft ? (
            <form onSubmit={prepare}>
              <div className="ww-form-heading">
                <Eyebrow>YOUR PROJECT, IN A FEW WORDS</Eyebrow>
                <span>* Required fields</span>
              </div>
              <div className="ww-form-grid">
                {input("name", "Your name", {
                  required: true,
                  autoComplete: "name",
                  placeholder: "How should we address you?",
                  maxLength: 100,
                })}
                {input("email", "Email address", {
                  required: true,
                  type: "email",
                  autoComplete: "email",
                  placeholder: "you@example.com",
                  maxLength: 150,
                })}
                {input("phone", "Phone number", {
                  required: true,
                  type: "tel",
                  autoComplete: "tel",
                  placeholder: "+91",
                  pattern: "[+0-9() .-]{7,20}",
                  title: "Enter a valid phone number (7–20 characters)",
                })}
                {input("city", "Project city / location", {
                  required: true,
                  autoComplete: "address-level2",
                  placeholder: "Where is your space?",
                  maxLength: 150,
                })}
                <label className="ww-field">
                  <span>Type of space *</span>
                  <select
                    name="type"
                    required
                    value={values.type}
                    onChange={change}
                  >
                    <option value="">Select your space</option>
                    <option>Apartment / home</option>
                    <option>Independent house / villa</option>
                    <option>Commercial space</option>
                    <option>Something else</option>
                  </select>
                </label>
                <label className="ww-field">
                  <span>What can we help with? *</span>
                  <select
                    name="service"
                    required
                    value={values.service}
                    onChange={change}
                  >
                    <option value="">Choose a service</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.id}>
                        {s.title}
                      </option>
                    ))}
                    <option value="discuss">I would like to discuss</option>
                  </select>
                </label>
                {input("area", "Approximate area", {
                  placeholder: "e.g. 1,500 sq. ft. (optional)",
                  maxLength: 60,
                })}
                {input("budget", "Indicative budget", {
                  placeholder: "A range, if you have one (optional)",
                  maxLength: 80,
                })}
                <label className="ww-field ww-field-wide">
                  <span>When would you like to begin?</span>
                  <select
                    name="timeline"
                    value={values.timeline}
                    onChange={change}
                  >
                    <option value="">Let’s discuss</option>
                    <option>As soon as practical</option>
                    <option>Within 3 months</option>
                    <option>Within 6 months</option>
                    <option>Just exploring for now</option>
                  </select>
                </label>
                <label className="ww-field ww-field-wide">
                  <span>A little about your project</span>
                  <textarea
                    name="message"
                    rows="3"
                    value={values.message}
                    onChange={change}
                    placeholder="Your ideas, your priorities, what you want the space to feel like…"
                    maxLength={2000}
                  />
                </label>
              </div>
              <label className="ww-consent">
                <input
                  type="checkbox"
                  name="consent"
                  required
                  checked={values.consent}
                  onChange={change}
                />
                <span>
                  I would like Welcome Woods to contact me about this project.
                </span>
              </label>
              <button className="ww-submit" type="submit">
                Prepare enquiry <ArrowUpRight size={21} strokeWidth={1} />
              </button>
              <p className="ww-form-note">
                Preview your enquiry, then open it in your email app. Nothing is
                sent or stored by this website.
              </p>
            </form>
          ) : (
            <div className="ww-draft" tabIndex={-1} aria-live="polite">
              <Check size={30} strokeWidth={1} />
              <Eyebrow>READY FOR YOUR REVIEW</Eyebrow>
              <h2>
                Your next chapter
                <br />
                <em>starts here.</em>
              </h2>
              <p>
                Your enquiry draft is ready. Review it below and open your email
                app when you are ready to send.
              </p>
              <pre>{draft.body}</pre>
              <a
                className="ww-submit"
                href={`mailto:${contact.email}?subject=${encodeURIComponent(`Project enquiry — ${values.city}`)}&body=${encodeURIComponent(draft.body)}`}
              >
                Open email draft <ArrowUpRight size={21} strokeWidth={1} />
              </a>
              <button className="ww-edit-draft" onClick={() => setDraft(null)}>
                <ArrowLeft size={16} /> Edit your details
              </button>
              <p className="ww-form-note">
                Not sent yet. If your email app does not open, email{" "}
                {contact.email} directly. No details are stored by this preview.
              </p>
            </div>
          )}
        </div>
      </section>
      <section
        className="ww-section ww-wrap ww-faq-layout"
        data-nav-theme="light"
      >
        <div>
          <Eyebrow>GOOD TO KNOW</Eyebrow>
          <h2>
            A few questions,
            <br />
            <em>answered.</em>
          </h2>
          <TextLink href="#/process">Explore the process</TextLink>
        </div>
        <FAQs />
      </section>
    </>
  );
}
