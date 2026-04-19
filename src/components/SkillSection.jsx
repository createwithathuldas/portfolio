import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';

const SkillsSection = () => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const [activeCard, setActiveCard] = useState(null);
  const [animatedBars, setAnimatedBars] = useState(false);

  const skillsData = [
    {
      id: 'languages',
      name: 'Programming Languages',
      range: '85-95%',
      value: 90,
      min: 85,
      max: 95,
      technologies: ['Python', 'C/C++', 'JavaScript', 'TypeScript', 'Go']
    },
    {
      id: 'frontend',
      name: 'Frontend Development',
      range: '80-90%',
      value: 85,
      min: 80,
      max: 90,
      technologies: ['React.js', 'Next.js', 'HTML5', 'CSS3', 'Tailwind']
    },
    {
      id: 'backend',
      name: 'Backend & Frameworks',
      range: '75-88%',
      value: 82,
      min: 75,
      max: 88,
      technologies: ['Node.js', 'Express', 'Django', 'REST APIs']
    },
    {
      id: 'ai',
      name: 'AI & Data Science',
      range: '70-85%',
      value: 78,
      min: 70,
      max: 85,
      technologies: ['NumPy', 'Pandas', 'OpenCV', 'Scikit-learn']
    },
    {
      id: 'devops',
      name: 'DevOps & Tools',
      range: '65-80%',
      value: 73,
      min: 65,
      max: 80,
      technologies: ['Git', 'Docker', 'Linux', 'CI/CD', 'AWS']
    },
    {
      id: 'database',
      name: 'Database & Systems',
      range: '70-85%',
      value: 78,
      min: 70,
      max: 85,
      technologies: ['PostgreSQL', 'MongoDB', 'Redis', 'System Design']
    }
  ];

  useEffect(() => {
    const timer = setTimeout(() => setAnimatedBars(true), 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!chartRef.current) return;

    const ctx = chartRef.current.getContext('2d');
    
    const gradient = ctx.createRadialGradient(200, 200, 0, 200, 200, 200);
    gradient.addColorStop(0, 'rgba(139, 92, 246, 0.25)');
    gradient.addColorStop(1, 'rgba(139, 92, 246, 0.05)');

    chartInstance.current = new Chart(ctx, {
      type: 'radar',
      data: {
        labels: skillsData.map(s => s.name.split(' ')[0]),
        datasets: [
          {
            label: 'Current',
            data: skillsData.map(s => s.value),
            backgroundColor: gradient,
            borderColor: '#8b5cf6',
            borderWidth: 2,
            pointBackgroundColor: '#0a0a0f',
            pointBorderColor: '#8b5cf6',
            pointBorderWidth: 2,
            pointRadius: 4,
            pointHoverRadius: 6,
            pointHoverBackgroundColor: '#8b5cf6',
            pointHoverBorderColor: '#fff',
            pointHoverBorderWidth: 2
          },
          {
            label: 'Range',
            data: skillsData.map(s => s.max),
            backgroundColor: 'transparent',
            borderColor: 'rgba(139, 92, 246, 0.15)',
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: false
          },
          {
            label: 'Base',
            data: skillsData.map(s => s.min),
            backgroundColor: 'transparent',
            borderColor: 'rgba(139, 92, 246, 0.15)',
            borderWidth: 1,
            borderDash: [4, 4],
            pointRadius: 0,
            fill: '-1'
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: {
          mode: 'index',
          intersect: false
        },
        plugins: {
          legend: { display: false },
          tooltip: {
            backgroundColor: '#0f0f0f',
            titleColor: '#8b5cf6',
            bodyColor: '#e5e5e5',
            borderColor: 'rgba(139, 92, 246, 0.3)',
            borderWidth: 1,
            padding: 12,
            displayColors: false,
            callbacks: {
              afterLabel: (context) => {
                if (context.datasetIndex === 0) {
                  const skill = skillsData[context.dataIndex];
                  return `Range: ${skill.range}`;
                }
                return null;
              }
            }
          }
        },
        scales: {
          r: {
            angleLines: { color: 'rgba(255, 255, 255, 0.05)' },
            grid: { color: 'rgba(255, 255, 255, 0.03)' },
            pointLabels: {
              color: '#a3a3a3',
              font: { size: 11, family: 'system-ui', weight: '500' }
            },
            ticks: { 
              display: false, 
              stepSize: 20, 
              max: 100, 
              min: 0 
            },
            suggestedMin: 50,
            suggestedMax: 100
          }
        },
        animation: {
          duration: 1500,
          easing: 'easeOutQuart'
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  const handleCardHover = (index) => {
    if (chartInstance.current) {
      chartInstance.current.setActiveElements([{ datasetIndex: 0, index }]);
      chartInstance.current.update();
    }
  };

  const handleCardLeave = () => {
    if (chartInstance.current) {
      chartInstance.current.setActiveElements([]);
      chartInstance.current.update();
    }
  };

  return (
    <section className="skills-section">
      <h2 className="section-title">Technical Skills</h2>
      
      <div className="skills-container">
        <div className="chart-wrapper">
          <canvas ref={chartRef} />
        </div>

        <div className="skills-list">
          {skillsData.map((skill, index) => (
            <div
              key={skill.id}
              className={`skill-item ${activeCard === skill.id ? 'active' : ''}`}
              onMouseEnter={() => handleCardHover(index)}
              onMouseLeave={handleCardLeave}
              onClick={() => setActiveCard(activeCard === skill.id ? null : skill.id)}
            >
              <div className="skill-info">
                <span className="skill-name">{skill.name}</span>
                <span className="skill-range">{skill.range}</span>
              </div>
              
              <div className="skill-bar">
                <div 
                  className="skill-progress"
                  style={{ width: animatedBars ? `${skill.value}%` : '0%' }}
                />
              </div>
              
              <div className="skill-techs">
                {skill.technologies.map((tech) => (
                  <span key={tech} className="tech-badge">{tech}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .skills-section {
          width: 100%;
          padding-inline: 0px;
          padding-block: 24px; 
          background: #0a0a0a;
          font-family: system-ui, -apple-system, sans-serif;
        }

        .section-title {
          text-align: center;
          font-size: 2rem;
          font-weight: 600;
          color: #fafafa;
          margin-bottom: 48px;
          letter-spacing: -0.5px;
        }

        .skills-container {
          max-width: 1200px;
          margin: 0 auto;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 48px;
        }

        .chart-wrapper {
          flex: 0 0 400px;
          height: 400px;
          position: relative;
        }

        .skills-list {
          flex: 1;
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 16px;
          max-width: 640px;
        }

        .skill-item {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          box-shadow: 0 2px 10px rgba(187, 0, 255, 0.92);
          border-radius: 12px;
          padding: 20px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .skill-item:hover {
          background: rgba(255, 255, 255, 0.04);
          border-color: rgba(139, 92, 246, 0.3);
        }

        .skill-item.active {
          background: rgba(139, 92, 246, 0.08);
          border-color: rgba(139, 92, 246, 0.5);
        }

        .skill-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 12px;
        }

        .skill-name {
          font-size: 0.875rem;
          font-weight: 500;
          color: #e5e5e5;
        }

        .skill-range {
          font-size: 0.8125rem;
          color: #8b5cf6;
          font-weight: 600;
          font-family: monospace;
        }

        .skill-bar {
          height: 4px;
          background: rgba(255, 255, 255, 0.06);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 12px;
        }

       .skill-progress {
  position: relative;
  overflow: hidden;
  height: 100%;
  /* 1. Slightly brighter base purple (was #8b5cf6) */
  background: #a78bfa; 
  border-radius: 2px;
  transition: width 1s cubic-bezier(0.4, 0, 0.2, 1);
  /* 2. Added a subtle neon glow */
  box-shadow: 0 0 12px rgba(167, 139, 250, 0.6); 
}

.skill-progress::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0) 0%,
    rgba(255, 255, 255, 0.2) 20%,
    /* 3. Much brighter, intense peak in the center */
    rgba(255, 255, 255, 0.9) 50%, 
    rgba(255, 255, 255, 0.2) 80%,
    rgba(255, 255, 255, 0) 100%
  );
  transform: translateX(-100%);
  animation: glass-shimmer 2.5s infinite cubic-bezier(0.4, 0, 0.2, 1);
}

@keyframes glass-shimmer {
  0% {
    transform: translateX(-100%) skewX(-15deg);
  }
  100% {
    transform: translateX(200%) skewX(-15deg);
  }
}

        .skill-techs {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .tech-badge {
          font-size: 0.75rem;
          padding: 4px 10px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 4px;
          color: #737373;
          transition: all 0.2s ease;
        }

        .skill-item:hover .tech-badge {
          color: #a3a3a3;
          background: rgba(255, 255, 255, 0.08);
        }

        @media (max-width: 1024px) {
          .skills-container {
            flex-direction: column;
            gap: 40px;
          }
          
          .chart-wrapper {
            flex: 0 0 auto;
            width: 100%;
            max-width: 400px;
            height: 350px;
          }
          
          .skills-list {
            max-width: 100%;
          }
        }

        @media (max-width: 640px) {
          .skills-section {
            padding: 40px 0px;
          }
          
          .section-title {
            font-size: 1.5rem;
            margin-bottom: 32px;
          }
          
          .skills-list {
            grid-template-columns: 1fr;
          }
          
          .chart-wrapper {
            height: 300px;
          }
        }
      `}</style>
    </section>
  );
};

export default SkillsSection;