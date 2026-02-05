import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const canvasRef = useRef(null);
  const [demoStep, setDemoStep] = useState(0);

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard');
    }
  }, [isAuthenticated, navigate]);

  // Demo Terminal Animation logic
  useEffect(() => {
    const timer = setInterval(() => {
      setDemoStep(prev => (prev < 3 ? prev + 1 : 0));
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  // Animated dot matrix background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
      constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.size = Math.random() * 2 + 1;
        this.speedX = Math.random() * 0.3 - 0.15;
        this.speedY = Math.random() * 0.3 - 0.15;
        this.opacity = Math.random() * 0.3 + 0.1;
      }

      update() {
        this.x += this.speedX;
        this.y += this.speedY;

        if (this.x > canvas.width) this.x = 0;
        if (this.x < 0) this.x = canvas.width;
        if (this.y > canvas.height) this.y = 0;
        if (this.y < 0) this.y = canvas.height;
      }

      draw() {
        ctx.fillStyle = `rgba(0, 255, 102, ${this.opacity})`;
        ctx.fillRect(this.x, this.y, this.size, this.size);
      }
    }

    const particleCount = Math.floor((canvas.width * canvas.height) / 10000);
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((particle) => {
        particle.update();
        particle.draw();
      });

      // Connect nearby particles
      particles.forEach((particleA, indexA) => {
        particles.slice(indexA + 1).forEach((particleB) => {
          const dx = particleA.x - particleB.x;
          const dy = particleA.y - particleB.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.strokeStyle = `rgba(0, 255, 102, ${0.1 * (1 - distance / 150)})`;
            ctx.lineWidth = 0.5;
            ctx.beginPath();
            ctx.moveTo(particleA.x, particleA.y);
            ctx.lineTo(particleB.x, particleB.y);
            ctx.stroke();
          }
        });
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="landing-page">
      <canvas ref={canvasRef} className="particle-canvas" />
      
      <div className="landing-content">
        <nav className="landing-nav glass-panel">
          <div className="nav-logo">
            <span className="logo-prompt">$</span> Trace.ai
          </div>
          <div className="nav-buttons">
            <button onClick={() => navigate('/login')} className="btn-nav-login">
              Log in
            </button>
            <button onClick={() => navigate('/signup')} className="btn-nav-signup">
              Get Started
            </button>
          </div>
        </nav>

        <main className="hero-section">
          <div className="hero-badge">
            <span className="badge-text">AI-POWERED CODE INTELLIGENCE</span>
          </div>
          
          <h1 className="hero-title">
            Ship Production Code
            <br />
            With <span className="hero-highlight">Confidence</span>
          </h1>
          
          <p className="hero-subtitle">
            The elite AI reviewer for modern developers. Trace bugs, optimize performance, 
            and elevate your engineering standards in seconds.
          </p>

          <div className="hero-cta">
            <button onClick={() => navigate('/signup')} className="btn-cta-primary">
              <span className="cta-icon">⚡</span>
              Begin First Review
            </button>
            <button onClick={() => navigate('/login')} className="btn-cta-secondary">
              View Dashboard
            </button>
          </div>

          {/* Demo Window Simulation */}
          <div className="demo-container">
            <div className="terminal-window">
              <div className="terminal-header">
                <div className="dot red"></div>
                <div className="dot yellow"></div>
                <div className="dot green"></div>
              </div>
              <div className="terminal-body">
                <div className="code-line">
                  <span className="line-num">1</span>
                  <span className="code-text">function calculateStats(data) {'{'}</span>
                </div>
                <div className="code-line">
                  <span className="line-num">2</span>
                  <span className="code-text">&nbsp;&nbsp;var results = [];</span>
                </div>
                
                {demoStep >= 1 && (
                  <div className="review-annotation">
                    <div className="annotation-header">TRACE.AI ANALYSIS</div>
                    <div className="annotation-body">
                      ⚠️ Best Practice: Use 'const' or 'let' instead of 'var' for block-scoping.
                    </div>
                  </div>
                )}

                <div className="code-line">
                  <span className="line-num">3</span>
                  <span className="code-text">&nbsp;&nbsp;for (var i = 0; i &lt; data.length; i++) {'{'}</span>
                </div>

                {demoStep >= 2 && (
                  <div className="review-annotation">
                    <div className="annotation-header">PERFORMANCE ALERT</div>
                    <div className="annotation-body">
                      ⚡ Loop Optimization: Consider using arr.map() for better readability and performance.
                    </div>
                  </div>
                )}
                
                <div className="code-line">
                  <span className="line-num">4</span>
                  <span className="code-text">&nbsp;&nbsp;&nbsp;&nbsp;results.push(data[i] * 2);</span>
                </div>
                <div className="code-line">
                  <span className="line-num">5</span>
                  <span className="code-text">&nbsp;&nbsp;{'}'}</span>
                </div>
              </div>
            </div>
          </div>
        </main>

        <section className="features-section">
          <h2 className="features-title">Engineered for Excellence</h2>
          <p className="features-subtitle">
            A suite of professional tools to help you master your craft
          </p>

          <div className="features-grid">
            <div className="feature-card glass-card">
              <div className="feature-icon-lg">🛡️</div>
              <h3 className="feature-card-title">Security First</h3>
              <p className="feature-card-desc">
                Automatically detect vulnerabilities and logic flaws before they hit production.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-lg">🚀</div>
              <h3 className="feature-card-title">Performance Boost</h3>
              <p className="feature-card-desc">
                Identify O(n²) bottlenecks and get optimized suggestions with complexity analysis.
              </p>
            </div>

            <div className="feature-card glass-card">
              <div className="feature-icon-lg">🧠</div>
              <h3 className="feature-card-title">Learning Hub</h3>
              <p className="feature-card-desc">
                Don't just fix code—understand the "why" with deep-dive learning notes.
              </p>
            </div>
          </div>
        </section>

        <div className="supported-languages">
          <p className="languages-label">// Enterprise Ready</p>
          <div className="languages-list">
            <span className="language-tag">JavaScript</span>
            <span className="language-tag">Python</span>
            <span className="language-tag">Go</span>
            <span className="language-tag">Java</span>
            <span className="language-tag">TypeScript</span>
            <span className="language-tag-more">+ More</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
