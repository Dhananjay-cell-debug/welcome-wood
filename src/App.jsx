import { useCallback, useEffect, useRef, useState } from "react";
import ScrollTrigger from "gsap/ScrollTrigger";
import Home from "./pages/Home";
import Studio from "./pages/Studio";
import Services from "./pages/Services";
import { Projects, ProjectDetail } from "./pages/Projects";
import Process from "./pages/Process";
import Contact from "./pages/Contact";
import Recognition from "./pages/Recognition";
import SiteFooter from "./components/SiteFooter";
import Nav from "./components/Nav";
import Veil from "./components/Veil";
import MenuOverlay from "./components/MenuOverlay";
import HairlineFrame from "./components/HairlineFrame";
import CoutureCursor from "./components/CoutureCursor";
import MusicPlayer from "./components/MusicPlayer";
import { TextLink } from "./components/Editorial";
import useSmoothScroll, { getLenis } from "./lib/useSmoothScroll";
import useRoute from "./lib/useRoute";
import { prefersReducedMotion } from "./lib/pointer";
import { projects } from "./data/site";
import "./editorial.css";

const CRITICAL = [
  "/ref/ref-living-tall.jpg",
  "/ref/ref-living-warm.jpg",
  "/ref/ref-living-dusk.jpg",
];
const TITLES = {
  "/": "Designing Spaces. Creating Experiences.",
  "/studio": "The Studio",
  "/services": "Our Expertise",
  "/projects": "Selected Spaces",
  "/process": "The Process",
  "/contact": "Start a Project",
  "/recognition": "Notes & Recognition",
};

function decode(src) {
  return new Promise((resolve) => {
    const img = new Image();
    img.src = src;
    if (img.decode) img.decode().then(resolve, resolve);
    else {
      img.onload = resolve;
      img.onerror = resolve;
    }
  });
}

export default function App() {
  const route = useRoute();
  const [isInitialHome] = useState(() => route.path === "/");
  const [revealed, setRevealed] = useState(!isInitialHome);
  const [introDone, setIntroDone] = useState(!isInitialHome);
  const [menuOpen, setMenuOpen] = useState(false);
  const navMarkRef = useRef(null);
  const mainRef = useRef(null);
  const previousPath = useRef(route.path);
  useSmoothScroll();

  useEffect(() => {
    if (!isInitialHome) return;
    let cancelled = false;
    let hold;
    const start = performance.now();
    Promise.all(CRITICAL.map(decode)).then(() => {
      hold = setTimeout(
        () => !cancelled && setRevealed(true),
        Math.max(
          0,
          (prefersReducedMotion() ? 0 : 1500) - (performance.now() - start),
        ),
      );
    });
    const failsafe = setTimeout(() => !cancelled && setRevealed(true), 6000);
    return () => {
      cancelled = true;
      clearTimeout(hold);
      clearTimeout(failsafe);
    };
  }, [isInitialHome]);

  useEffect(() => {
    document.body.style.overflow = introDone ? "" : "hidden";
    if (introDone) getLenis()?.start();
    else getLenis()?.stop();
    return () => {
      document.body.style.overflow = "";
    };
  }, [introDone]);

  const project = route.path.startsWith("/projects/")
    ? projects.find((p) => p.slug === route.path.split("/")[2])
    : null;
  const pageTitle = project?.title || TITLES[route.path] || "Page not found";
  useEffect(() => {
    document.title = pageTitle + " — Welcome Woods Interior";
    const description =
      project?.summary ||
      "Welcome Woods Interior — residential and commercial interiors, space planning and interior styling. Design presentation.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
    document
      .querySelector('meta[property="og:title"]')
      ?.setAttribute("content", document.title);
    document
      .querySelector('meta[property="og:description"]')
      ?.setAttribute("content", description);
  }, [pageTitle, project]);

  useEffect(() => {
    const params = new URLSearchParams(route.query);
    const targetId =
      route.path === "/services"
        ? params.get("service")
        : params.get("section");
    const target = targetId ? document.getElementById(targetId) : null;
    const lenis = getLenis();
    if (target) {
      if (lenis) lenis.scrollTo(target, { immediate: true });
      else target.scrollIntoView({ behavior: "instant" });
    } else if (lenis) lenis.scrollTo(0, { immediate: true });
    else window.scrollTo({ top: 0, behavior: "instant" });
    ScrollTrigger.refresh();
    if (previousPath.current !== route.path)
      mainRef.current?.focus({ preventScroll: true });
    previousPath.current = route.path;
    const id = window.setTimeout(() => ScrollTrigger.refresh(), 250);
    return () => clearTimeout(id);
  }, [route.path, route.query]);

  const onIntroFinished = useCallback(() => setIntroDone(true), []);
  const toggleMenu = useCallback(() => setMenuOpen((v) => !v), []);
  const closeMenu = useCallback(() => setMenuOpen(false), []);
  let page;
  switch (route.path) {
    case "/":
      page = <Home revealed={revealed} />;
      break;
    case "/studio":
      page = <Studio />;
      break;
    case "/services":
      page = <Services />;
      break;
    case "/projects":
      page = <Projects />;
      break;
    case "/process":
      page = <Process />;
      break;
    case "/contact":
      page = (
        <Contact
          key={route.query}
          selectedService={route.params.get("service") || ""}
        />
      );
      break;
    case "/recognition":
      page = <Recognition />;
      break;
    default:
      page = project ? (
        <ProjectDetail key={project.slug} project={project} />
      ) : (
        <section className="ww-not-found" data-nav-theme="light">
          <h1>A little off plan.</h1>
          <p>This page could not be found. Let’s find your way back.</p>
          <TextLink href="#/">Return home</TextLink>
        </section>
      );
  }

  return (
    <div id="top" className="relative bg-cream">
      <a
        className="ww-skip-link"
        href="#main-content"
        onClick={(e) => {
          e.preventDefault();
          mainRef.current?.focus();
          mainRef.current?.scrollIntoView({ behavior: "instant" });
        }}
      >
        Skip to content
      </a>
      <div inert={menuOpen || !introDone}>
        <main
          id="main-content"
          tabIndex={-1}
          ref={mainRef}
          key={route.path}
          style={{ outline: "none" }}
        >
          {page}
        </main>
        <SiteFooter />
      </div>
      <Nav
        navMarkRef={navMarkRef}
        revealed={introDone}
        menuOpen={menuOpen}
        onToggleMenu={toggleMenu}
        routePath={route.path}
      />
      <MenuOverlay open={menuOpen} onClose={closeMenu} routePath={route.path} />
      <HairlineFrame revealed={introDone} />
      {route.path === "/" && (
        <MusicPlayer revealed={introDone} menuOpen={menuOpen} />
      )}
      {isInitialHome && (
        <Veil
          revealed={revealed}
          navMarkRef={navMarkRef}
          onFinished={onIntroFinished}
        />
      )}
      <CoutureCursor />
      <div className="grain" />
    </div>
  );
}
