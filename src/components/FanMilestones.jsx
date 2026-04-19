import React, { useEffect, useRef, useState, useCallback } from "react";
import './styles/FanMilestones.css'; // <-- Importing the new CSS file
import { 
  FaTrophy, 
  FaCertificate, 
  FaGraduationCap, 
  FaUserTie, 
  FaCode, 
  FaTimes, 
  FaLinkedin,
  FaProjectDiagram,
  FaBullhorn
} from "react-icons/fa";
import { tr } from "framer-motion/client";

const milestones = [
  {
    tag: "Hackathon", year: "2025", label: "GetWork",
    title: "1st Place · GetWork Hackathon",
    desc: "Won a rigorous two-day hackathon judged by senior engineers from Oracle, Walmart, Micron, and Optum.",
    details: "Overcame early setbacks to completely redesign and execute a winning approach overnight. Evaluated by industry experts on innovation, adaptability, and high-pressure execution.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_securing-first-place-at-the-getwork-hackathon-activity-7403141337262592001-EHk2?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: true,
  },
  {
    tag: "Publication", year: "2025", label: "IJSCI",
    title: "Published Paper · IJSCI",
    desc: "Published research on 'Algorithmic Complexity in AI Systems: Balancing Efficiency and Performance'.",
    details: "Featured in the International Journal of Sciences and Innovation Engineering (Vol 2, Issue 10). Explored how computational efficiency impacts real-world AI scalability and robustness.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_research-artificialintelligence-complexitytheory-activity-7390382678535180288-Gqm8?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: true,
  },
  {
    tag: "Certification", year: "2026", label: "IBM",
    title: "IBM AI Developer Professional Certificate",
    desc: "Earned official AI Developer certification issued by Coursera and IBM.",
    details: "Validated practical skills and knowledge in building, deploying, and utilizing artificial intelligence models and enterprise tools.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_ibm-ai-developer-professional-certificate-activity-7431615218117488640-ZgtX?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: true,
  },
  {
    tag: "Intensive", year: "2026", label: "Google & Kaggle",
    title: "5-Day AI Agents Intensive",
    desc: "Completed rigorous architectural training for building intelligent AI agents conducted by Google.",
    details: "Focused on designing goal-driven systems, balancing capability with direction, and mastering fundamentals of decision-oriented AI architectures, state, and policy.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_a-certificate-is-not-a-trophy-it-is-a-standard-activity-7407489841720020992-g2Wq?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  },
  {
    tag: "Open Source", year: "2026", label: "SymPy",
    title: "Requested First PR · SymPy Library",
    desc: "Resolved a high-precision Float pickling regression (Issue #19988) in the globally utilized SymPy ecosystem.",
    details: "Conducted root cause analysis on internal precision attributes, wrote robust regression tests, and successfully navigated the CI pipeline of a large-scale open-source Python library.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_opensource-python-sympy-activity-7423409460758401024-SDOr?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  },
  {
    tag: "Competition", year: "2026", label: "Nirmala College",
    title: "1st Prize · CSS Coding",
    desc: "Secured first place in the CSS Coding Competition at CAMEO 2026 Intercollegiate IT Fest.",
    details: "Competed in the 'StyleFormerX' event, demonstrating consistent fundamentals and strong frontend web development execution.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_css-webdevelopment-coding-activity-7430529133333413888-loVu?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  },
  {
    tag: "Leadership", year: "2026", label: "Institution",
    title: "Founder · Campus Coding Club",
    desc: "Initiated a student-driven tech community to build practical skills across various IT domains.",
    details: "Led initiatives to spark curiosity and organize programs in cybersecurity, AI/ML, cloud computing, and web development to sustain student engagement.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_hi-everyone-i-started-a-coding-club-at-my-activity-7418959686269530112-Rshj?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  },
  {
    tag: "Skill Badge", year: "2025", label: "Google Cloud",
    title: "Prompt Design in Vertex AI",
    desc: "Earned an introductory skill badge from Google Cloud Skills Boost.",
    details: "Gained practical, hands-on experience in effective prompt design and engineering utilizing Google's Vertex AI platform.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_prompt-design-in-vertex-ai-activity-7356861975437496321-z_4P?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  },
  {
    tag: "Membership", year: "2025", label: "IAENG",
    title: "Member · IAENG",
    desc: "Accepted into the International Association of Engineers.",
    details: "Joined a global non-profit to connect with tech professionals across 30+ countries and access the latest research in engineering and computer science.",
    link: "https://www.linkedin.com/posts/athul-das-760105284_iaeng-engineering-computerscience-activity-7400792501101486080-wHOd?utm_source=share&utm_medium=member_desktop&rcm=ACoAAEUSMfgB87Iww36OMnypDDuH67DmyYKN7aQ",
    gold: false,
  }
];

const getIconForTag = (tag, color, size) => {
  const t = tag.toLowerCase();
  if (t.includes("hackathon") || t.includes("competition")) return <FaTrophy color={color} size={size} />;
  if (t.includes("certificat")) return <FaCertificate color={color} size={size} />;
  if (t.includes("course")) return <FaGraduationCap color={color} size={size} />;
  if (t.includes("member")) return <FaUserTie color={color} size={size} />;
  if (t.includes("project")) return <FaProjectDiagram color={color} size={size} />;
  if (t.includes("event")) return <FaBullhorn color={color} size={size} />;
  return <FaCode color={color} size={size} />;
};

function getConstants() {
  const vw = typeof window !== "undefined" ? window.innerWidth : 1440;
  const vh = typeof window !== "undefined" ? window.innerHeight : 900;
  const isMobile = vw < 600;
  const isTablet = vw < 1024;

  const CARD_W = isMobile ? Math.round(vw * 0.52) : isTablet ? 210 : 250;
  const CARD_H = Math.round(CARD_W * 1.28);
  const RADIUS = isMobile ? Math.round(vh * 0.44) : Math.round(vh * 0.5);
  const SPREAD = isMobile ? 20 : 24;

  return { SPREAD, RADIUS, CARD_W, CARD_H };
}

export default function FanMilestones() {
  const outerRef = useRef(null);
  const [floatActive, setFloatActive] = useState(0);
  const [consts, setConsts] = useState(getConstants);
  const [selectedMilestone, setSelectedMilestone] = useState(null);
  
  const activeIdx = Math.round(floatActive);
  const activeMilestone = milestones[activeIdx];

  useEffect(() => {
    const onResize = () => setConsts(getConstants());
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  useEffect(() => {
    const outer = outerRef.current;
    if (!outer) return;
    const handleScroll = () => {
      const sectionTop = outer.offsetTop;
      const scrolled = window.scrollY - sectionTop;
      const scrollable = outer.offsetHeight - window.innerHeight;
      const progress = Math.max(0, Math.min(1, scrolled / scrollable));
      setFloatActive(progress * (milestones.length - 1));
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const goTo = useCallback((idx) => {
    const clamped = Math.max(0, Math.min(milestones.length - 1, idx));
    setFloatActive(clamped);
    const outer = outerRef.current;
    if (!outer) return;
    const sectionTop = outer.offsetTop;
    const scrollable = outer.offsetHeight - window.innerHeight;
    const targetScroll = sectionTop + (clamped / (milestones.length - 1)) * scrollable;
    window.scrollTo({ top: targetScroll, behavior: "smooth" });
  }, []);

  const handleFanClick = useCallback((e) => {
    const { clientX, currentTarget } = e;
    const { left, width } = currentTarget.getBoundingClientRect();
    if (clientX - left < width / 2) goTo(activeIdx - 1);
    else goTo(activeIdx + 1);
  }, [activeIdx, goTo]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goTo(activeIdx - 1);
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goTo(activeIdx + 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIdx, goTo]);

  const { SPREAD, RADIUS, CARD_W, CARD_H } = consts;

  return (
    <section
      ref={outerRef}
      className="milestones-section"
      style={{ height: `${milestones.length * 100}vh` }}
    >
      <div className="milestones-container">
        <div className="ambient-glow" />

        {/* Header */}
        <div className="header-container">
          <p className="header-tag">Career path</p>
          <h2 className="header-title">Milestones</h2>
          <p className="header-subtitle">{activeMilestone.title}</p>
        </div>

        {/* Fan Component */}
        <div className="fan-zone" onClick={handleFanClick}>
          {activeIdx > 0 && <div className="nav-arrow nav-left">‹</div>}
          {activeIdx < milestones.length - 1 && <div className="nav-arrow nav-right">›</div>}

          <div className="pivot-container">
            {milestones.map((m, i) => {
              // Dynamic Math needed for scrolling UI
              const angle    = (i - floatActive) * SPREAD;
              const absAngle = Math.abs(angle);
              const sc       = Math.max(0.48, 1 - absAngle * 0.0072);
              const op       = absAngle > 88 ? 0 : Math.max(0.09, 1 - absAngle * 0.013);
              const zIdx     = Math.round(100 - absAngle);
              const isActive = absAngle < 5;

              // Dynamic sizing calculations
              const fLabel = Math.round(CARD_W * 0.125);
              const fDesc  = Math.round(CARD_W * 0.062);
              const fTag   = Math.round(CARD_W * 0.053);
              const fYear  = Math.round(CARD_W * 0.057);
              const br     = Math.round(CARD_W * 0.1);
              const playS  = Math.round(CARD_W * 0.155);

              // CSS Classes based on state
              const themeClass = m.gold ? 'theme-gold' : 'theme-purple';
              const activeClass = isActive ? 'is-active' : '';

              return (
                <div 
                  key={i} 
                  className="card-wrapper"
                  style={{
                    transform: `rotate(${angle}deg)`,
                    zIndex: zIdx,
                  }}
                >
                  <div 
                    className={`milestone-card ${themeClass} ${activeClass}`}
                    onClick={(e) => {
                      if (isActive) {
                        e.stopPropagation(); 
                        setSelectedMilestone(m); 
                      }
                    }}
                    style={{
                      top: -(RADIUS + CARD_H),
                      left: -CARD_W / 2,
                      width: CARD_W,
                      height: CARD_H,
                      borderRadius: br,
                      transform: `scale(${sc})`,
                      opacity: op,
                    }}
                  >
                    {/* Image Zone */}
                    <div className="card-image-zone">
                      <div 
                        className="image-pattern"
                        style={{ backgroundSize: `${CARD_W * 0.088}px ${CARD_W * 0.088}px` }} 
                      />
                      {m.gold && <div className="image-overlay-gold" />}
                      
                      <div 
                        className="card-icon-wrapper"
                        style={{
                          bottom: CARD_W * 0.055, 
                          left: CARD_W * 0.055,
                          width: playS, 
                          height: playS,
                        }}
                      >
                        {getIconForTag(m.tag, m.gold ? "#fef3c7" : "#ede9fe", playS * 0.45)}
                      </div>
                      
                      <span 
                        className="card-year"
                        style={{
                          top: CARD_W * 0.042, 
                          right: CARD_W * 0.048,
                          fontSize: fYear,
                        }}
                      >
                        {m.year}
                      </span>
                    </div>

                    {/* Text Zone */}
                    <div 
                      className="card-text-zone"
                      style={{ padding: `${CARD_H * 0.046}px ${CARD_W * 0.06}px` }}
                    >
                      <div>
                        <p 
                          className="card-label"
                          style={{ margin: `0 0 ${CARD_H * 0.016}px`, fontSize: fLabel }}
                        >
                          {m.label}
                        </p>
                        <p className="card-desc" style={{ fontSize: fDesc,fontWeight: 800 }}>
                          {m.title}
                        </p>
                      </div>
                      <div className="card-tags" style={{ marginTop: CARD_H * 0.028 }}>
                        <span 
                          className="tag-badge tag-category"
                          style={{ fontSize: fTag, padding: `${CARD_H * 0.013}px ${CARD_W * 0.043}px` }}
                        >
                          {m.tag}
                        </span>
                        {m.gold && (
                          <span 
                            className="tag-badge tag-top"
                            style={{ fontSize: fTag, padding: `${CARD_H * 0.013}px ${CARD_W * 0.043}px` }}
                          >
                            ★ Top
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Dots Pagination */}
        <div className="dots-container">
          {milestones.map((m, i) => (
            <div
              key={i}
              className="dot"
              onClick={() => goTo(i)}
              style={{
                width: i === activeIdx ? 24 : 7,
                background: i === activeIdx
                  ? (m.gold ? "#f59e0b" : "#7c3aed")
                  : "#1c1438",
              }}
            />
          ))}
        </div>
      </div>

      {/* Detail Modal Overlay */}
      {selectedMilestone && (
        <div className="modal-overlay" onClick={() => setSelectedMilestone(null)}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedMilestone(null)}>
              <FaTimes size={20} />
            </button>

            <h3 className="modal-title">
              {selectedMilestone.title}
            </h3>
            <span className={`modal-meta ${selectedMilestone.gold ? 'gold' : 'purple'}`}>
              {selectedMilestone.label} • {selectedMilestone.year}
            </span>
            <p className="modal-desc">
              {selectedMilestone.details}
            </p>

            <a 
              href={selectedMilestone.link} 
              target="_blank" 
              rel="noreferrer" 
              className="modal-link"
            >
              <FaLinkedin size={18} /> View on LinkedIn
            </a>
          </div>
        </div>
      )}
    </section>
  );
}