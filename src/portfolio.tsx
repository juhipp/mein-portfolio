import { useState, useEffect, useRef } from "react";
import type { RefObject } from "react";

// ── Types ──────────────────────────────────────────────────────────────────

interface Project {
  title: string;
  desc: string;
  tags: string[];
  year?: string;
  color: string;
  accent: string;
  dark?: boolean;
  category?: string;
  image?: string;
}

interface SkillItem {
  label: string;
  level: number;
  color: string;
}

// ── Data ───────────────────────────────────────────────────────────────────

const DEV_PROJECTS: Project[] = [
  {
    title: "leadity — SaaS-Anwendung",
    desc: "Entwicklung und Weiterentwicklung webbasierter Softwarelösungen mit Fokus auf skalierbare Frontend-Architekturen und moderne Benutzeroberflächen.",
    tags: ["Vue 3", "TypeScript", "Tailwind", "Bootstrap", "Git"],
    year: "2022–2025",
    color: "#2cff08",
    accent: "#0b7a53",
  },
  {
    title: "Communicators — Webprojekte",
    desc: "Umsetzung individueller Webseiten und modularer WordPress-Komponenten für kundenbasierte Digitalprojekte.",
    tags: ["WordPress", "SCSS", "PHP", "jQuery"],
    year: "2021",
    color: "#ff008c",
    accent: "#750041",
  },
  {
    title: "Pflege.de Plattform",
    desc: "Weiterentwicklung digitaler Serviceplattformen sowie Umsetzung neuer Frontend-Komponenten und bestehender Produktstrukturen.",
    tags: ["React", "Vue", "SASS", "Git"],
    year: "2016–2020",
    color: "#00ffe1",
    accent: "#00473f",
  },
  {
    title: "Softwerft — CMS & APIs",
    desc: "Entwicklung von Webseiten, Microsites und webbasierten Anwendungen innerhalb interdisziplinärer Kundenprojekte.",
    tags: ["TYPO3", "PHP", "Yii", "WordPress"],
    year: "2014–2016",
    color: "#ff8800",
    accent: "#753f00",
  },
];

const PHOTO_PROJECTS: Project[] = [
  {
    title: "Archiv mit über 50.000 Bildern ",
    desc: "25 Jahre hinter der Kamera,  50.000+ Bilder, thematisch sortiert, für Anfragen von Redaktionen und Verlage.",
    tags: ["Archiv", "seit 2001", "Kategorisiert"],
    color: "#1a1a1a",
    accent: "#ff8800",
    dark: true,
    image: "/images/Fotocollage.jpg",
  },
  {
    title: "Fotoreportage Nordlandshest",
    desc: "Unterwegs zu einer der seltensten Pferderassen Europas, dabei enstand eine sechsseitige Strecke über die Nordlandshest in der Cavallo.",
    tags: ["Fotoreportage", "Cavallo", "2026"],
    color: "#1a1a1a",
    accent: "#2cff08",
    dark: true,
    image: "/images/norge.jpg",
  },
  {
    title: "Fotobetreuung für Gestüte",
    desc: "Seit 2011 betreue ich fotografisch das Haflingergestüt Padenstedt, für Hengstportraits, Stuten/Fohlen und ihren jährlichen Katalog.",
    tags: ["Padenstedt", "Hengstpräsentation", "seit 2011"],
    color: "#1a1a1a",
    accent: "#ff008c",
    dark: true,
    image: "/images/pp.jpg",
  },
  {
    title: "Shootings für Privat",
    desc: "Individuelle private Fototermine, ob Portrait, Reportage-Stil oder freie Bildidee, nur das Pferd oder gemeinsam mit dem Menschen .",
    tags: ["Privatshootings", "Individuell", "Flexibel"],
    color: "#1a1a1a",
    accent: "#00ffe1",
    dark: true,
    image: "/images/lena.jpg",
  },
];

const DEV_SKILLS: SkillItem[] = [
  { label: "HTML & CSS", level: 98, color: "#2cff08" },
  { label: "VUE 3", level: 90, color: "#ff008c" },
  { label: "TypeScript", level: 88, color: "#ff8800" },
  { label: "React", level: 77, color: "#00ffe1" },
  { label: "PHP", level: 40, color: "#ffff62" },
];

const TOOLS = [
  "VS Code",
  "Git",
  "Jira",
  "Nextcloud",
  "Adobe Photoshop",
  "Canon",
  "Englisch (flüssig)",
  "KI Tools",
  "Typo3",
  "WordPress",
  "Lightroom",
  "Canva",
  "Camera RAW",
];

const SOCIAL_LINKS = [
  { label: "GitHub", url: "https://github.com/juliahipp" },
  { label: "LinkedIn", url: "https://linkedin.com/in/julia-hipp" },
];

const NAV_ITEMS = ["Über mich", "Praxis", "Kenntnisse", "Kontakt"];

// ── Global CSS ─────────────────────────────────────────────────────────────

const globalCSS = `
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,wght@0,300;0,400;0,500;0,700;1,300&family=DM+Mono&display=swap');

  *, *::before, *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  html {
    scroll-behavior: smooth;
    background: #FAFAF8;
  }

  body {
    font-family: 'DM Sans', sans-serif;
    background: #FAFAF8;
    color: #111;
    text-align: left;
    border: none;
    overflow-x: hidden;
  }

  #app {
    border: none;
    text-align: left;
    background-color: #000000;
  }

  ::selection {
    background: #1a1a1a;
    color: #fff;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  /* ── Typography (zentrale Textstile, statt Inline-Styles) ────────────── */

  /* Große Section-Überschriften (Praxis, Skills) */
  .heading-lg {
    font-size: clamp(28px, 4vw, 40px);
    font-weight: 700;
    letter-spacing: -0.03em;
    color: #0a0a0a;
  }

  /* Sehr große Headlines (Hero, Kontakt) */
  .heading-xl {
    font-weight: 700;
    letter-spacing: -0.04em;
    color: #0a0a0a;
    line-height: 1.1;
  }

  /* Fließtext-Absätze */
  .text-body {
    font-size: 16px;
    color: #666;
    line-height: 1.65;
  }
  .text-body-muted {
    font-size: 14px;
    color: #888;
    line-height: 1.65;
  }

  /* Kleine Meta-/Mono-Texte (Jahreszahlen, Prozentwerte) */
  .text-mono-sm {
    font-size: 12px;
    color: #999;
    font-family: 'DM Mono', monospace;
  }

  /* Karten-Titel (DevCard / PhotoCard) */
  .card-title {
    font-size: 18px;
    font-weight: 700;
    margin-bottom: 8px;
    letter-spacing: -0.02em;
  }
  .card-title-light { color: #111; }
  .card-title-dark { color: rgba(255,255,255,0.92); }

  .card-desc {
    font-size: 14px;
    line-height: 1.65;
  }
  .card-desc-light { color: #555; }
  .card-desc-dark { color: rgba(255,255,255,0.55); }

  /* Navigation */
  .nav-link {
    cursor: pointer;
    font-size: 14px;
    color: #555;
    font-weight: 500;
    transition: color 0.2s;
  }
  .nav-link:hover { color: #111; }

  /* Buttons */
  .btn {
    display: inline-block;
    padding: 14px 32px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 600;
    letter-spacing: 0.02em;
    cursor: pointer;
    transition: background 0.2s, transform 0.15s;
    border: none;
  }

  .btn-primary {
    background: #111;
    border: 0.5px solid #ffff62;
    color: #fff;
    position: relative;
    overflow: hidden;
    z-index: 1;
  }

  .btn-primary::before {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      90deg,
      #2cff08,
      #00ffe1,
      #ff00c8,
      #ff8800
    );
    background-size: 300% 300%;
    opacity: 0;
    transition: opacity 0.35s ease;
    z-index: -1;
    animation: neonFlow 6s linear infinite;
  }

  .btn-primary:hover::before {
    opacity: 1;
  }

  .btn-primary:hover {
    border: 0.5px solid #fff;
    color: #000;
  }

  @keyframes neonFlow {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  .btn-outline { background: transparent; border: 1.5px solid #1a1a1a; color: #111; }
  .btn-outline:hover { background: #111; color: #fff; }

  /* Tabs */
  .tab {
    padding: 9px 22px;
    border-radius: 50px;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s;
    border: 1.5px solid #ddd;
    background: transparent;
    color: #666;
  }
  .tab:hover { border-color: #aaa; color: #333; }
  .tab.active { background: #111; color: #fff; border-color: #111; }

  /* Layout */
  .section {
    padding: 80px 24px;
    max-width: 900px;
    margin: 0 auto;
  }

  .grid-2 {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }

  /* Cards */
  .card {
    border-radius: 16px;
    padding: 28px 28px 24px;
    display: flex;
    flex-direction: column;
    gap: 14px;
    transition: box-shadow 0.3s ease;
    cursor: default;
  }
  .card-dev {
    background: #fff;
    border: 1px solid #e8e8e8;
    box-shadow: 0 2px 8px rgba(0,0,0,0.04);
  }
  .card-dev:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.10); }
  .card-photo {
    border: 2px solid var(--accent-color, transparent);
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    position: relative;
    overflow: hidden;
    padding: 0;
    display: flex;
    flex-direction: column;
    height: 100%;
    gap: 0;
  }
  .card-photo:hover { box-shadow: 0 12px 40px rgba(0,0,0,0.35); }

  .card-photo-image {
    height: 180px;
    width: 100%;
    overflow: hidden;
    position: relative;
  }
  .card-photo-image img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
    transition: transform 0.4s ease;
  }
  .card-photo:hover .card-photo-image img {
    transform: scale(1.04);
  }
  .card-photo-placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: rgba(255,255,255,0.3);
    font-family: 'DM Mono', monospace;
  }

  .card-photo-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 14px 28px 24px;
    gap: 14px;
    min-height: 0;
  }

  /* Tags */
  .tag {
    font-size: 11px;
    font-weight: 600;
    letter-spacing: 0.06em;
    padding: 3px 10px;
    border-radius: 20px;
    text-transform: uppercase;
  }
  .tag-light { border: none; }
  .tag-dark {
    background: rgba(255,255,255,0.12);
    color: rgba(255,255,255,0.75);
    border: 1px solid rgba(255,255,255,0.15);
  }

  /* Section label */
  .section-label {
    font-size: 12px;
    font-weight: 600;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: #888;
    margin-bottom: 12px;
  }

  /* Skill bar */
  .skill-bar-bg {
    background: #e8e8e8;
    border-radius: 4px;
    height: 6px;
    overflow: hidden;
  }
  .skill-bar-fill {
    height: 100%;
    border-radius: 4px;
    transition: width 1s cubic-bezier(.4,0,.2,1);
  }

  /* Tool pill */
  .tool-pill {
    padding: 7px 16px;
    border-radius: 50px;
    border: 1.5px solid #e0e0e0;
    font-size: 13px;
    color: #444;
    font-weight: 500;
  }

  /* Colors */
  .neon-green { color: #2cff08; }
  .neon-pink { color: #ff00c8; }
  .neon-turquoise { color: #00ffe1; }
  .neon-orange { color: #ff8800; }

  /* Social link */
  .social-link {
    font-size: 14px;
    color: #888;
    cursor: pointer;
    font-weight: 500;
    transition: color 0.2s;
  }
  .social-link:hover { color: #111; }

  /* Fade-in animation */
  .fade-in {
    transition: opacity 0.6s ease, transform 0.6s ease;
  }
  .fade-in.hidden { opacity: 0; transform: translateY(32px); }
  .fade-in.visible { opacity: 1; transform: translateY(0); }

  /* ─────────────────────────────────────────
     BURGER MENU
  ───────────────────────────────────────── */

  .burger {
    width: 46px;
    height: 46px;
    border-radius: 14px;
    border: 1px solid #e8e8e8;
    background: #ffffff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 5px;
    cursor: pointer;
    transition:
      transform 0.25s ease,
      box-shadow 0.3s ease,
      border-color 0.3s ease;
    position: relative;
    padding: 0;
  }

  .burger span {
    display: block;
    width: 20px;
    height: 2px;
    border-radius: 999px;
    transition:
      transform 0.3s ease,
      opacity 0.3s ease,
      box-shadow 0.3s ease;
  }

  .burger span:nth-child(1) {
    background: #2cff08;
    box-shadow: 0 0 8px rgba(44,255,8,0.7);
  }
  .burger span:nth-child(2) {
    background: #ff00c8;
    box-shadow: 0 0 8px rgba(255,0,200,0.7);
  }
  .burger span:nth-child(3) {
    background: #00ffe1;
    box-shadow: 0 0 8px rgba(0,255,225,0.7);
  }

  .burger:hover {
    transform: translateY(-2px);
    border-color: #d0d0d0;
    box-shadow:
      0 0 12px rgba(44,255,8,0.12),
      0 0 18px rgba(255,0,200,0.10),
      0 0 22px rgba(0,255,225,0.10);
  }

  .burger:hover span:nth-child(3) {
    background: #ff8800;
    box-shadow: 0 0 10px rgba(255,136,0,0.7);
  }

  .burger.active span:nth-child(1) {
    transform: translateY(7px) rotate(45deg);
  }
  .burger.active span:nth-child(2) {
    opacity: 0;
  }
  .burger.active span:nth-child(3) {
    transform: translateY(-7px) rotate(-45deg);
  }

  /* ─────────────────────────────────────────
     RESPONSIVE NAVIGATION
  ───────────────────────────────────────── */

  .desktop-nav {
    display: flex;
    gap: 32px;
  }

  .burger {
    display: none;
  }

  @media (max-width: 768px) {
    .desktop-nav {
      display: none;
    }

    .burger {
      display: flex;
    }

    .mobile-menu {
      position: fixed;
      top: 72px;
      left: 20px;
      right: 20px;
      background: rgba(255,255,255,0.92);
      backdrop-filter: blur(18px);
      border: 1px solid #e8e8e8;
      border-radius: 24px;
      padding: 24px;
      display: flex;
      flex-direction: column;
      gap: 18px;
      z-index: 99;
      box-shadow:
        0 0 30px rgba(44,255,8,0.08),
        0 0 40px rgba(255,0,200,0.06);
      animation: mobileMenuIn 0.25s ease;
    }

    .mobile-link {
      font-size: 18px;
      font-weight: 600;
      color: #111;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    .mobile-link:hover {
      transform: translateX(4px);
    }
  }

  @keyframes mobileMenuIn {
    from { opacity: 0; transform: translateY(-12px); }
    to { opacity: 1; transform: translateY(0); }
  }

  /* ── Kontakt-Sektion (mobile first) ────────────────────────────────── */

  .contact-section {
    display: flex;
    flex-direction: column;
    gap: 32px;
    text-align: center;
  }

  .contact-image {
    flex: 0 0 auto;
    width: 100%;
    max-width: 260px;
    margin: 0 auto;
  }

  .contact-text {
    text-align: center;
  }

  @media (min-width: 768px) {
    .contact-section {
      flex-direction: row;
      text-align: left;
      gap: 48px;
    }

    .contact-image {
      flex: 0 0 260px;
      width: 260px;
      margin: 0;
    }

    .contact-text {
      text-align: right;
    }
  }

  /* ── Skills-Bereich (mobile first) ─────────────────────────────────── */

  .skills-grid {
    display: grid;
    grid-template-columns: 1fr;
    gap: 48px;
  }

  @media (min-width: 768px) {
    .skills-grid {
      grid-template-columns: 1fr 1fr;
      gap: 0 64px;
    }
  }
`;

// ── Hooks ──────────────────────────────────────────────────────────────────

function useInView(threshold = 0.15): [RefObject<HTMLDivElement>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setVisible(true);
      },
      { threshold },
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, []);
  return [ref, visible];
}

// ── Sub-components ─────────────────────────────────────────────────────────

function Tag({ label, color, accent, dark = false }: { label: string; color: string; accent: string; dark?: boolean }) {
  return (
    <span className={`tag ${dark ? "tag-dark" : "tag-light"}`} style={dark ? {} : { background: color, color: accent }}>
      {label}
    </span>
  );
}

function SkillBar({ level, color, delay = 0 }: { level: number; color: string; delay?: number }) {
  const [width, setWidth] = useState(0);
  const [ref, visible] = useInView(0.1);
  useEffect(() => {
    if (visible) setTimeout(() => setWidth(level), delay);
  }, [visible]);
  return (
    <div ref={ref} className="skill-bar-bg">
      <div
        className="skill-bar-fill"
        style={{
          width: `${width}%`,
          background: color,
          boxShadow: `0 0 12px ${color}`,
        }}
      />
    </div>
  );
}

function SkillRow({ skill, delay }: { skill: SkillItem; delay: number }) {
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 500, color: "#333" }}>{skill.label}</span>
        <span className="text-mono-sm">{skill.level}%</span>
      </div>
      <SkillBar level={skill.level} color={skill.color} delay={delay} />
    </div>
  );
}

function DevCard({ project, index }: { project: Project; index: number }) {
  const [ref, visible] = useInView();
  return (
    <div ref={ref} className={`card card-dev fade-in ${visible ? "visible" : "hidden"}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div style={{ width: 40, height: 40, borderRadius: 10, background: project.color }} />
        <span className="text-mono-sm">{project.year}</span>
      </div>
      <div>
        <h3 className="card-title card-title-light">{project.title}</h3>
        <p className="card-desc card-desc-light">{project.desc}</p>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
        {project.tags.map((t) => (
          <Tag key={t} label={t} color={project.color} accent={project.accent} />
        ))}
      </div>
    </div>
  );
}

function PhotoCard({ project, index }: { project: Project; index: number }) {
  const [ref, visible] = useInView();
  return (
    <div
      ref={ref}
      className={`card card-photo fade-in ${visible ? "visible" : "hidden"}`}
      style={{
        transitionDelay: `${index * 0.1}s`,
        // @ts-ignore – CSS custom property
        "--accent-color": project.accent,
        boxShadow: `0 2px 12px rgba(0,0,0,0.15), 0 0 16px ${project.color}22`,
      }}>
      {/* Bildbereich */}
      <div className="card-photo-image" style={{ background: "rgb(26, 26, 26)" }}>
        {project.image ? <img src={project.image} alt={project.title} loading="lazy" /> : <span className="card-photo-placeholder">Bild folgt</span>}
      </div>

      {/* Textbereich */}
      <div className="card-photo-content" style={{ background: "rgb(26, 26, 26)" }}>
        <div>
          <h3 className="card-title card-title-dark">{project.title}</h3>
          <p className="card-desc card-desc-dark">{project.desc}</p>
        </div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: "auto" }}>
          {project.tags.map((t) => (
            <Tag key={t} label={t} color={project.color} accent="rgb(26,26,26)" dark />
          ))}
        </div>
      </div>
    </div>
  );
}

function HeroHeadline() {
  return (
    <div>
      <h1 className="heading-xl" style={{ fontSize: "clamp(38px, 6.5vw, 72px)", marginBottom: 24 }}>
        Julia Hipp
        <br />
      </h1>
      <h2 style={{ fontSize: "clamp(20px, 3vw, 28px)", fontWeight: 500, lineHeight: 1.4, padding: "0 0 20px 0" }}>
        <span style={{ color: "#ff008c", padding: "0  10px 0 0" }}>programmiert</span>-
        <span style={{ color: "#2cff08", padding: "0  10px 0 10px" }}>designt</span>-
        <span style={{ color: "#00d4ff", padding: "0  10px 0 10px" }}>schreibt</span>-
        <span style={{ color: "#ff8c00", padding: "0  0px 0 10px" }}>fotografiert</span>
      </h2>
    </div>
  );
}

// ── Main Component ─────────────────────────────────────────────────────────

export default function Portfolio() {
  const [tab, setTab] = useState<"dev" | "photo">("dev");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [heroRef, heroVisible] = useInView(0.1);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      <style>{globalCSS}</style>

      <div style={{ minHeight: "100vh", background: "#FAFAF8", maxWidth: 1000, margin: "0 auto" }}>
        {/* NAV */}
        <nav
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 100,
            padding: "0 32px",
            height: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: scrolled ? "rgba(250,250,248,0.92)" : "transparent",
            backdropFilter: scrolled ? "blur(12px)" : "none",
            borderBottom: scrolled ? "1px solid #e8e8e8" : "1px solid transparent",
            transition: "all 0.3s ease",
            maxWidth: 1000,
            margin: "0 auto",
            backgroundColor: "#ffffff",
          }}>
          <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: "-0.02em", background: "#ffff62", padding: "4px 8px" }}>julia.hipp</span>
          <div className="desktop-nav">
            {NAV_ITEMS.map((n) => (
              <span key={n} className="nav-link" onClick={() => scrollTo(n.toLowerCase().replace(" ", "-"))}>
                {n}
              </span>
            ))}
          </div>
          <button className={`burger ${menuOpen ? "active" : ""}`} onClick={() => setMenuOpen(!menuOpen)}>
            <span />
            <span />
            <span />
          </button>
        </nav>
        {menuOpen && (
          <div className="mobile-menu">
            {NAV_ITEMS.map((n) => (
              <span
                key={n}
                className="mobile-link"
                onClick={() => {
                  scrollTo(n.toLowerCase().replace(" ", "-"));
                  setMenuOpen(false);
                }}>
                {n}
              </span>
            ))}
          </div>
        )}

        {/* HERO */}
        <div
          id="über-mich"
          style={{
            minHeight: "80vh",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            padding: "100px 32px 60px",
            maxWidth: 900,
            margin: "0 auto",
          }}>
          <div ref={heroRef} className={`fade-in ${heroVisible ? "visible" : "hidden"}`}>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                background: "#fff",
                borderRadius: 50,
                border: "1px solid #2cff08",
                padding: "6px 16px",
                marginBottom: 32,
              }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#2cff08", display: "inline-block" }} />
              <span style={{ fontSize: 13, color: "#000", fontWeight: 500 }}>Offen für neue Herausforderungen</span>
            </div>

            <HeroHeadline />

            <p className="text-body" style={{ fontSize: 18, maxWidth: 580, marginBottom: 40 }}>
              Frontend-Entwicklerin. Freiberufliche Fotojournalistin. Ich arbeite an den Schnittstellen von Technik, Gestaltung und Geschichten.
            </p>

            <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
              <button className="btn btn-primary" onClick={() => scrollTo("praxis")}>
                Praxis ansehen
              </button>
              <button className="btn btn-primary" onClick={() => scrollTo("kontakt")}>
                Kontakt aufnehmen
              </button>
            </div>
          </div>
        </div>

        {/* PROJEKTE */}
        <section id="praxis" className="section">
          <p className="section-label">Berufliche Stationen</p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 36 }}>
            <h2 className="heading-lg">Praxis</h2>
            <div style={{ display: "flex", gap: 8 }}>
              <button className={`tab ${tab === "dev" ? "active" : ""}`} onClick={() => setTab("dev")}>
                Development
              </button>
              <button className={`tab ${tab === "photo" ? "active" : ""}`} onClick={() => setTab("photo")}>
                Fotojournalismus
              </button>
            </div>
          </div>

          {tab === "dev" && (
            <div className="grid-2">
              {DEV_PROJECTS.map((p, i) => (
                <DevCard key={p.title} project={p} index={i} />
              ))}
            </div>
          )}

          {tab === "photo" && (
            <>
              <p className="text-body-muted" style={{ marginBottom: 24 }}>
                Neben meiner Arbeit als Entwicklerin fotografiere ich freiberuflich für Pferdemagazine und Buchverlage im In- und Ausland. Meine
                Schwerpunkte sind Pferde-, und Tierfotografie für Redaktionen und privat Personen.
              </p>
              <div className="grid-2">
                {PHOTO_PROJECTS.map((p, i) => (
                  <PhotoCard key={p.title} project={p} index={i} />
                ))}
              </div>
            </>
          )}
        </section>

        {/* SKILLS */}
        <div style={{ background: "#fff", borderTop: "1px solid #e8e8e8", borderBottom: "1px solid #e8e8e8" }}>
          <section id="kenntnisse" className="section">
            <p className="section-label">Mein Werkzeugkasten</p>
            <h2 className="heading-lg" style={{ marginBottom: 48 }}>
              Skills
            </h2>

            <div className="skills-grid">
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>
                  Development
                </p>
                <div style={{ display: "grid", gap: 28 }}>
                  {DEV_SKILLS.map((s, i) => (
                    <SkillRow key={s.label} skill={s} delay={i * 80} />
                  ))}
                </div>
              </div>
              <div>
                <p style={{ fontSize: 12, fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase", color: "#aaa", marginBottom: 28 }}>
                  Werkzeuge
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 12 }}>
                  {TOOLS.map((tool) => (
                    <span key={tool} className="tool-pill">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>

        {/* KONTAKT */}
        <section id="kontakt" className="section contact-section">
          <div className="contact-image">
            <img
              src="/images/julia294.jpg"
              alt="Julia Hipp"
              style={{ width: "100%", aspectRatio: "3/4", objectFit: "cover", borderRadius: 16, border: "2px solid #ff008c" }}
            />
          </div>

          <div className="contact-text">
            <p className="section-label">Lass uns reden</p>
            <h2 className="heading-xl" style={{ fontSize: "clamp(32px,5vw,56px)", marginBottom: 20 }}>
              Bereit für eine neue Kollegin?
              <br />
              <span style={{ fontSize: "clamp(20px,2.5vw,36px)", fontStyle: "italic", fontWeight: 300, color: "#555" }}>
                Ich bin offen für eine Festanstellung
              </span>
            </h2>
            <p className="text-body" style={{ padding: "36px 0" }}>
              Ob Web-Projekt, Foto-Auftrag oder beides zusammen — <br />
              ich freue mich über spannende Anfragen und neue Kooperationen.
            </p>
            <a href="mailto:hallo@juliahipp.de" className="btn btn-primary">
              hallo@juliahipp.de
            </a>
            <div style={{ display: "flex", gap: 20, justifyContent: "center", marginTop: 32 }}>
              {SOCIAL_LINKS.map(({ label, url }) => (
                <a key={label} href={url} target="_blank" rel="noopener noreferrer" className="social-link">
                  {label}
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer
          style={{
            borderTop: "1px solid #e8e8e8",
            padding: "24px 32px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: 13,
            color: "#aaa",
          }}>
          <span>© 2026 Julia Hipp</span>
        </footer>
      </div>
    </>
  );
}
