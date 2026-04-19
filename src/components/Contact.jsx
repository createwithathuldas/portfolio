import LogoImg    from "./assets/Logo.png";
import GitHubImg  from "./assets/GitHub.png";
import LinkedInImg from "./assets/LinkedIn.png";
import GmailImg   from "./assets/Gmail.png";

const LINKS = [
  { label: "GitHub",   href: "https://github.com/createwithathuldas",         img: GitHubImg,   external: true  },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/athul-das-760105284/",    img: LinkedInImg, external: true  },
  { label: "Mail",     href: "https://mail.google.com/mail/?view=cm&fs=1&to=createwithathuldas@gmail.com",           img: GmailImg,    external: false },
];

export default function Contact() {
  return (
    <>
      <style>{`
        .cf-footer {
          width: 100%;
          box-sizing: border-box;
          padding: 32px 40px;
          border-top: 1px solid rgba(139,92,246,0.15);
          position: relative;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 24px;
        }
        .cf-footer::before {
          content: '';
          position: absolute;
          top: -1px; left: 0; right: 0; height: 1px;
          background: linear-gradient(90deg, transparent 0%, #7c3aed 30%, #e879f9 50%, #7c3aed 70%, transparent 100%);
        }
        .cf-brand {
          display: flex; align-items: center; gap: 13px; flex-shrink: 0;
        }
        .cf-logo-ring {
          width: 72px; height: 72px; border-radius: 50%;
          border: 1.5px solid rgba(168,85,247,0.4);
          overflow: hidden; flex-shrink: 0;
          box-shadow: 0 0 12px rgba(139,92,246,0.2);
        }
        .cf-logo-ring img { width: 100%; height: 100%; object-fit: cover; }
        .cf-name {
          font-family: 'Courier New', monospace;
          font-size: 30px; font-weight: 700;
          letter-spacing: 0.15em; color: #e8e8e8;
          text-transform: uppercase;
        }
        .cf-links { display: flex; align-items: flex-end; gap: 14px; }
        .cf-card {
          display: flex; flex-direction: column; align-items: center; gap: 8px;
          text-decoration: none;
        }
        .cf-img-wrap {
          width: 102px; height: 120px;
          border-radius: 8px; overflow: hidden;
          border: 1px solid rgba(168,85,247,0.2);
          background: rgba(139,92,246,0.06);
          position: relative;
          transition: all 0.3s cubic-bezier(0.23,1,0.32,1);
        }
        .cf-img-wrap img {
          width: 100%; height: 100%;
          object-fit: cover; object-position: center top;
          transition: transform 0.4s ease, filter 0.4s ease;
          filter: saturate(0.85);
        }
        .cf-overlay {
          position: absolute; inset: 0;
          background: linear-gradient(to top, rgba(139,92,246,0.35) 0%, transparent 50%);
          opacity: 0; transition: opacity 0.3s; border-radius: 8px;
        }
        .cf-card:hover .cf-img-wrap {
          border-color: rgba(168,85,247,0.7);
          box-shadow: 0 0 20px rgba(139,92,246,0.35), 0 -8px 24px rgba(139,92,246,0.15);
          transform: translateY(-6px);
        }
        .cf-card:hover .cf-img-wrap img {
          transform: scale(1.06);
          filter: saturate(1.1);
        }
        .cf-card:hover .cf-overlay { opacity: 1; }
        .cf-label {
          font-family: 'Courier New', monospace;
          font-size: 9px; letter-spacing: 0.2em;
          color: rgba(192,132,252,0.45);
          text-transform: uppercase;
          transition: color 0.25s;
        }
        .cf-card:hover .cf-label { color: #c084fc; }

        /* ── Mobile ── */
        @media (max-width: 600px) {
          .cf-footer {
            flex-direction: column;
            align-items: center;
            padding: 28px 20px;
            gap: 28px;
          }
          .cf-name {
            font-size: 22px;
          }
          .cf-logo-ring {
            width: 54px; height: 54px;
          }
          .cf-img-wrap {
            width: 80px; height: 94px;
          }
          .cf-links {
            gap: 10px;
          }
        }

        /* ── Tablet ── */
        @media (min-width: 601px) and (max-width: 900px) {
          .cf-footer {
            padding: 28px 28px;
          }
          .cf-name {
            font-size: 22px;
          }
          .cf-img-wrap {
            width: 88px; height: 104px;
          }
        }
      `}</style>

      <footer className="cf-footer" id="contact">
        <div className="cf-brand">
          <div className="cf-logo-ring">
            <img src={LogoImg} alt="Athul Das" />
          </div>
          <span className="cf-name">Athul Das</span>
        </div>

        <div className="cf-links">
          {LINKS.map(({ label, href, img, external }) => (
            <a
              key={label}
              className="cf-card"
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
            >
              <div className="cf-img-wrap">
                <img src={img} alt={label} />
                <div className="cf-overlay" />
              </div>
              <span className="cf-label">{label}</span>
            </a>
          ))}
        </div>
      </footer>
    </>
  );
}