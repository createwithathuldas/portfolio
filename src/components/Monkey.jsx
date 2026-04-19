import React, { useEffect, useRef } from 'react';
import './styles/monkey.css';
import SocialButton from './SocialButton';

// Import your assets
import bodyImg from './assets/MonkeyBody.png';
import tailImg from './assets/MonkeyTail.png';
import bootImg from './assets/MonkeyBoot.png';
import bgVideo from './assets/BgMonkey.mp4'; 

export default function Monkey() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particlesArray = [];

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const mouse = {
      x: null,
      y: null,
      radius: 120 
    };

    const handleMouseMove = (event) => {
      mouse.x = event.clientX;
      mouse.y = event.clientY;
    };
    
    // Move mouse off-screen when it leaves the window
    const handleMouseLeave = () => {
        mouse.x = null;
        mouse.y = null;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseout', handleMouseLeave);

    // The Color Palette
    const colorPalette = ['#9B8EC7', '#CA5995', '#5D1C6A'];

    class Particle {
      constructor(x, y) {
        this.x = x;
        this.y = y;
        this.baseX = x; 
        this.baseY = y;
        this.size = Math.random() * 2.5 + 0.5; 
        this.density = (Math.random() * 30) + 1; 
        
        // 1. Assign a random color from your gradient palette
        this.color = colorPalette[Math.floor(Math.random() * colorPalette.length)];
        
        // 2. Assign a random slow drift speed (velocity)
        this.vx = (Math.random() - 0.5) * 0.8; 
        this.vy = (Math.random() - 0.5) * 0.8; 
      }

      draw() {
        ctx.fillStyle = this.color; 
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.closePath();
        ctx.fill();
      }

      update() {
        // --- AMBIENT DRIFT LOGIC ---
        // Slowly move the particle's "home base" 
        this.baseX += this.vx;
        this.baseY += this.vy;

        // Wrap around the screen if they drift off the edges
        if (this.baseX > canvas.width) this.baseX = 0;
        else if (this.baseX < 0) this.baseX = canvas.width;
        if (this.baseY > canvas.height) this.baseY = 0;
        else if (this.baseY < 0) this.baseY = canvas.height;

        // --- MOUSE REPULSION LOGIC ---
        let dx = mouse.x - this.x;
        let dy = mouse.y - this.y;
        let distance = Math.sqrt(dx * dx + dy * dy);
        
        let forceDirectionX = dx / distance;
        let forceDirectionY = dy / distance;
        
        let force = (mouse.radius - distance) / mouse.radius;
        let directionX = forceDirectionX * force * this.density;
        let directionY = forceDirectionY * force * this.density;

        if (distance < mouse.radius && mouse.x !== null) {
          // Push away from mouse
          this.x -= directionX;
          this.y -= directionY;
        } else {
          // Spring back to the moving home base
          this.x -= (this.x - this.baseX) * 0.05;
          this.y -= (this.y - this.baseY) * 0.05;
        }
      }
    }

    const init = () => {
      particlesArray = [];
      const numberOfParticles = (canvas.width * canvas.height) / 4000; // Tweaked slightly for better density
      for (let i = 0; i < numberOfParticles; i++) {
        let x = Math.random() * canvas.width;
        let y = Math.random() * canvas.height;
        particlesArray.push(new Particle(x, y));
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < particlesArray.length; i++) {
        particlesArray[i].update();
        particlesArray[i].draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    init();
    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseout', handleMouseLeave);
    };
  }, []);

  return (
    <section className="hero-section">
      <video className="bg-video" src={bgVideo} autoPlay loop muted playsInline />
      
      {/* The new Interactive Canvas Layer */}
      <canvas ref={canvasRef} id="liquid-canvas"></canvas>

      <div className="hero-content">
        <div className="hi-block">
          <h1 className="huge-text">HI</h1>
          <div className="monkey-wrapper">
            <img src={tailImg} alt="Monkey Tail" className="monkey-part tail" />
            <img src={bodyImg} alt="Monkey Body" className="monkey-part body" />
            <img src={bootImg} alt="Monkey Boot" className="monkey-part boot" />
          </div>
        </div>
        <h2 className="name-text">I'm ATHUL DAS</h2>
        <hr className="divider" />
         <h1 style={{fontFamily:'monospace',fontWeight:'100'}} id='title'>SDE | Ai Enthusiast | Open Source Contributor</h1>
         <SocialButton></SocialButton>
      </div>
    </section>
  );
}