import React, { useState, useEffect } from 'react';
import { FaGithub, FaGlobe } from 'react-icons/fa';

// Using raw.githubusercontent.com to fetch the images directly from your screenshot repo
const BASE_IMAGE_URL = 'https://raw.githubusercontent.com/createwithathuldas/Project_Screenshots/main/';

const projectsData = [
  {
    id: 'b2b-workflow',
    name: 'B2B Automation Workflow',
    description: 'Automated business-to-business workflow pipeline.',
    github: 'https://github.com/createwithathuldas/B2B-Automation',
    website: 'https://your-live-link.com', 
    image: `${BASE_IMAGE_URL}B2B-Automation_Workflow.png`
  },
  {
    id: 'imangel',
    name: 'IMANGEL',
    description: 'Image processing or related application.',
    github: 'https://github.com/createwithathuldas/IMANGEL',
    website: '', 
    image: `${BASE_IMAGE_URL}IMANGEL.jpg`
  },
  {
    id: 'moonapp',
    name: 'MoonApp',
    description: 'A modern web application tracking lunar phases or crypto.',
    github: 'https://github.com/createwithathuldas/MoonApp',
    website: 'https://moonapp-demo.com',
    image: `${BASE_IMAGE_URL}MoonApp.png`
  },
  {
    id: 'resrctracker',
    name: 'ResrcTracker',
    description: 'Resource tracking and management dashboard.',
    github: 'https://github.com/createwithathuldas/ResrcTracker',
    website: '',
    image: `${BASE_IMAGE_URL}ResrcTracker.png`
  },
  {
    id: 'bias-buster',
    name: 'Bias Buster',
    description: 'AI tool designed to detect and mitigate data bias.',
    github: 'https://github.com/createwithathuldas/Bias-Buster',
    website: 'https://biasbuster.app',
    image: `${BASE_IMAGE_URL}bias_buster_masterImage.png`
  },
  {
    id: 'data-visual',
    name: 'Data Visualizer',
    description: 'Interactive charts and data visualization platform.',
    github: 'https://github.com/createwithathuldas/DataVisual',
    website: 'https://datavisual.io',
    image: `${BASE_IMAGE_URL}dataVisual.webp`
  },
  {
    id: 'sugared',
    name: 'Sugared',
    description: 'E-commerce or dietary tracking interface.',
    github: 'https://github.com/createwithathuldas/Sugared',
    website: '',
    image: `${BASE_IMAGE_URL}sugared.jpg`
  }
];

const ProjectsSection = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hoveredProject, setHoveredProject] = useState(projectsData[0]);

  // Handle window resize for mobile detection
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const initialCount = isMobile ? 3 : 5;
  const visibleProjects = isExpanded ? projectsData : projectsData.slice(0, initialCount);

  return (
    <section style={styles.section}>
      <style>{mediaQueries}</style>
      
      <div style={styles.header}>
        <h2 style={styles.title}>Featured Projects</h2>
        <p style={styles.subtitle}>Recent work and experiments</p>
      </div>

      <div style={styles.container} className="projects-layout">
        
        {/* Left Column: Project List */}
        <div style={styles.listContainer} className="project-list">
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              style={{
                ...styles.projectCard,
                borderColor: hoveredProject.id === project.id ? '#8b5cf6' : '#27272a',
                backgroundColor: hoveredProject.id === project.id ? '#18181b' : '#121214',
              }}
              onMouseEnter={() => setHoveredProject(project)}
              onTouchStart={() => setHoveredProject(project)}
            >
              <div style={styles.cardContent}>
                <h3 style={styles.projectName}>{project.name}</h3>
                <p style={styles.projectDesc}>{project.description}</p>
              </div>

              <div style={styles.actions}>
                <a 
                  href={project.github} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={styles.iconBtn}
                  aria-label="GitHub Repository"
                >
                  <FaGithub size={20} />
                </a>
                
                {project.website ? (
                  <a 
                    href={project.website} 
                    target="_blank" 
                    rel="noreferrer" 
                    style={{ ...styles.iconBtn, color: '#8b5cf6' }}
                    aria-label="Live Website"
                  >
                    <FaGlobe size={20} />
                  </a>
                ) : (
                  <span style={{ ...styles.iconBtn, color: '#3f3f46', cursor: 'not-allowed' }} title="Not hosted">
                    <FaGlobe size={20} />
                  </span>
                )}
              </div>
            </div>
          ))}

          {projectsData.length > initialCount && (
            <button 
              style={styles.toggleBtn} 
              onClick={() => setIsExpanded(!isExpanded)}
            >
              {isExpanded ? 'Show Less' : 'Show More'}
            </button>
          )}
        </div>

        {/* Right Column: Direct Sticky Preview */}
        <div style={styles.stickyPreview} className="preview-container">
          {hoveredProject && (
            <div style={styles.imageWrapper}>
              <img 
                src={hoveredProject.image} 
                alt={hoveredProject.name} 
                style={styles.previewImage}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/600x400/121214/8b5cf6?text=Screenshot+Not+Found';
                }}
              />
              <div style={styles.imageOverlay}>
                <span style={styles.overlayText}>{hoveredProject.name}</span>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};

// Styles
const styles = {
  section: {
    width: '100%',
    padding: '80px 20px',
    backgroundColor: '#0a0a0a',
    color: '#e2e8f0',
    fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    boxSizing: 'border-box'
  },
  header: {
    textAlign: 'center',
    marginBottom: '56px'
  },
  title: {
    fontSize: '2rem',
    fontWeight: 600,
    marginBottom: '8px',
    color: '#ffffff',
    letterSpacing: '-0.5px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '0.95rem',
    fontWeight: 400,
    letterSpacing: '0.5px',
    textTransform: 'uppercase'
  },
  container: {
    maxWidth: '1200px',
    margin: '0 auto',
    display: 'flex',
    gap: '40px',
    alignItems: 'flex-start', // Essential for sticky behavior
    position: 'relative'
  },
  listContainer: {
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    gap: '16px'
  },
  projectCard: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '24px',
    border: '1px solid #27272a',
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
    boxSizing: 'border-box'
  },
  cardContent: {
    flex: 1,
    paddingRight: '20px'
  },
  projectName: {
    fontSize: '1.1rem',
    fontWeight: 500,
    color: '#f8fafc',
    marginBottom: '6px',
    marginTop: 0
  },
  projectDesc: {
    fontSize: '0.9rem',
    color: '#a1a1aa',
    margin: 0,
    lineHeight: 1.5
  },
  actions: {
    display: 'flex',
    gap: '16px',
    alignItems: 'center'
  },
  iconBtn: {
    color: '#a1a1aa',
    transition: 'color 0.2s ease',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'none',
    border: 'none',
    padding: 0,
    cursor: 'pointer'
  },
  toggleBtn: {
    marginTop: '16px',
    padding: '14px 24px',
    backgroundColor: '#121214',
    border: '1px solid #27272a',
    borderRadius: '8px',
    color: '#e2e8f0',
    fontSize: '0.95rem',
    fontWeight: 500,
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    alignSelf: 'center'
  },
  stickyPreview: {
    flex: '1', 
    position: '-webkit-sticky',
    position: 'sticky',
    top: '120px', 
    width: '100%',
    aspectRatio: '16/10',
    borderRadius: '12px',
    overflow: 'hidden',
    border: '1px solid #27272a',
    backgroundColor: '#121214',
    alignSelf: 'flex-start' // Prevents the image from stretching down the column
  },
  imageWrapper: {
    width: '100%',
    height: '100%',
    position: 'relative'
  },
  previewImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'opacity 0.3s ease'
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: '20px',
    background: 'linear-gradient(to top, rgba(10,10,10,0.9) 0%, transparent 100%)',
    display: 'flex',
    alignItems: 'flex-end'
  },
  overlayText: {
    color: '#ffffff',
    fontSize: '1.2rem',
    fontWeight: 500,
    letterSpacing: '0.5px'
  }
};

// CSS for Responsive Layout
const mediaQueries = `
  @media (max-width: 968px) {
    .projects-layout {
      flex-direction: column !important;
    }
    .preview-container {
      display: none !important; /* Hide side preview on tablets/mobile */
    }
    .project-list {
      width: 100% !important;
    }
  }

  .project-list button:hover {
    background-color: #18181b !important;
    border-color: #8b5cf6 !important;
  }

  /* Specific icon hover effects */
  a[aria-label="GitHub Repository"]:hover {
    color: #ffffff !important;
  }
  a[aria-label="Live Website"]:hover {
    color: #a78bfa !important;
  }
`;

export default ProjectsSection; 