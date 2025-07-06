// Stars animation
class StarField {
    constructor() {
        this.canvas = document.getElementById('starsCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.stars = [];
        this.numStars = 150;
        this.mouse = { x: 0, y: 0 };
        
        this.init();
        this.animate();
        this.handleResize();
        this.handleMouseMove();
    }
    
    init() {
        this.resize();
        this.createStars();
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createStars() {
        this.stars = [];
        
        for (let i = 0; i < this.numStars; i++) {
            this.stars.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                radius: Math.random() * 2 + 0.5,
                opacity: Math.random() * 0.8 + 0.2,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                driftX: (Math.random() - 0.5) * 0.2,
                driftY: (Math.random() - 0.5) * 0.2,
                originalX: 0,
                originalY: 0
            });
            
            // Store original position for mouse interaction
            this.stars[i].originalX = this.stars[i].x;
            this.stars[i].originalY = this.stars[i].y;
        }
    }
    
    updateStars() {
        this.stars.forEach(star => {
            // Twinkling effect
            star.opacity += Math.sin(Date.now() * star.twinkleSpeed) * 0.01;
            star.opacity = Math.max(0.1, Math.min(1, star.opacity));
            
            // Subtle drift
            star.x += star.driftX;
            star.y += star.driftY;
            
            // Mouse interaction
            const dx = this.mouse.x - star.x;
            const dy = this.mouse.y - star.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const force = (100 - distance) / 100;
                star.x -= dx * force * 0.01;
                star.y -= dy * force * 0.01;
            }
            
            // Boundary wrapping
            if (star.x < 0) star.x = this.canvas.width;
            if (star.x > this.canvas.width) star.x = 0;
            if (star.y < 0) star.y = this.canvas.height;
            if (star.y > this.canvas.height) star.y = 0;
        });
    }
    
    drawStars() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.stars.forEach(star => {
            this.ctx.beginPath();
            this.ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            this.ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            this.ctx.fill();
            
            // Add a subtle glow effect
            this.ctx.shadowColor = 'rgba(255, 255, 255, 0.5)';
            this.ctx.shadowBlur = star.radius * 2;
            this.ctx.fill();
            this.ctx.shadowBlur = 0;
        });
    }
    
    connectStars() {
        for (let i = 0; i < this.stars.length; i++) {
            for (let j = i + 1; j < this.stars.length; j++) {
                const dx = this.stars[i].x - this.stars[j].x;
                const dy = this.stars[i].y - this.stars[j].y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 150) {
                    const opacity = (150 - distance) / 150 * 0.1;
                    this.ctx.beginPath();
                    this.ctx.moveTo(this.stars[i].x, this.stars[i].y);
                    this.ctx.lineTo(this.stars[j].x, this.stars[j].y);
                    this.ctx.strokeStyle = `rgba(255, 255, 255, ${opacity})`;
                    this.ctx.lineWidth = 0.5;
                    this.ctx.stroke();
                }
            }
        }
    }
    
    animate() {
        this.updateStars();
        this.drawStars();
        this.connectStars();
        requestAnimationFrame(() => this.animate());
    }
    
    handleResize() {
        window.addEventListener('resize', () => {
            this.resize();
            this.createStars();
        });
    }
    
    handleMouseMove() {
        document.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
}

// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Initialize stars
    new StarField();
    
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add scroll effect to header
    let lastScrollTop = 0;
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const header = document.querySelector('.header');
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            header.style.transform = 'translateY(-100%)';
        } else {
            header.style.transform = 'translateY(0)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        const rate = scrolled * -0.5;
        
        hero.style.transform = `translateY(${rate}px)`;
    });
    
    // Button click animations
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    });
});

// Add some interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effect to company logos
    const companyLogos = document.querySelectorAll('.company-logo');
    companyLogos.forEach(logo => {
        logo.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        
        logo.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    const text = heroTitle.innerHTML;
    heroTitle.innerHTML = '';
    
    let i = 0;
    const typeWriter = () => {
        if (i < text.length) {
            heroTitle.innerHTML += text.charAt(i);
            i++;
            setTimeout(typeWriter, 50);
        }
    };
    
    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000);
});