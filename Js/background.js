document.addEventListener('DOMContentLoaded', () => {
    class HackerNetwork {
        constructor() {
            const savedTheme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', savedTheme);
            this.canvas = document.getElementById('background');
            if (!this.canvas) {
                console.error('Background canvas not found');
                return;
            }
            this.ctx = this.canvas.getContext('2d');
            
            this.resizeCanvas();
            this.mouseX = 0;
            this.mouseY = 0;
            
            this.nodes = [];
            this.packets = [];
            
            this.adjustForDevice();
            this.updateColors();
            
            this.createNodes();
            
            this.setupEventListeners();
            
            this.lastFrame = 0;
            this.animate(0);
        }
        
        resizeCanvas() {
            this.canvas.width = window.innerWidth;
            this.canvas.height = window.innerHeight;
        }
        
        adjustForDevice() {
            const pixelRatio = window.devicePixelRatio || 1;
            this.nodesCount = Math.floor((window.innerWidth * window.innerHeight) / (21000 / pixelRatio));
            this.connectionDistance = Math.min(window.innerWidth, window.innerHeight) / (window.innerWidth < 768 ? 3 : 4);
        }
        
        updateColors() {
            const theme = document.documentElement.getAttribute('data-theme') || 'dark';
            this.colors = {
                teal: getComputedStyle(document.documentElement).getPropertyValue('--neon-teal').trim(),
                blue: getComputedStyle(document.documentElement).getPropertyValue('--neon-blue').trim(),
                purple: getComputedStyle(document.documentElement).getPropertyValue('--neon-purple').trim(),
                red: '#ff0000'
            };
        }
        
        createNodes() {
            this.nodes = [];
            for (let i = 0; i < this.nodesCount; i++) {
                this.nodes.push({
                    x: Math.random() * this.canvas.width,
                    y: Math.random() * this.canvas.height,
                    radius: Math.random() * 1.5 + 1,
                    vx: Math.random() * 0.3 - 0.15,
                    vy: Math.random() * 0.3 - 0.15,
                    color: this.getRandomColor(),
                    type: Math.random() < 0.7 ? 'data' : 'security',
                    isBee: Math.random() < 0.03
                });
            }
        }
        
        getRandomColor() {
            const colors = [this.colors.teal, this.colors.blue, this.colors.purple];
            return colors[Math.floor(Math.random() * colors.length)];
        }
        
        setupEventListeners() {
            window.addEventListener('resize', () => this.handleResize());
            document.addEventListener('mousemove', this.handleMouseMove.bind(this));
            document.addEventListener('touchmove', this.handleTouchMove.bind(this));
            document.getElementById('theme-toggle').addEventListener('click', () => this.handleThemeToggle());
            document.getElementById('mobile-theme-toggle').addEventListener('click', () => this.handleThemeToggle());
        }
        
        handleMouseMove(e) {
            this.mouseX = e.clientX;
            this.mouseY = e.clientY;
        }
        
        handleTouchMove(e) {
            const touch = e.touches[0];
            this.mouseX = touch.clientX;
            this.mouseY = touch.clientY;
        }
        
        handleResize() {
            this.resizeCanvas();
            this.adjustForDevice();
            this.createNodes();
        }
        
        handleThemeToggle() {
            const root = document.documentElement;
            const currentTheme = root.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            this.updateColors();
            this.createNodes();
            
            const themeToggles = document.querySelectorAll('.nav-link .icon');
            themeToggles.forEach(icon => {
                icon.textContent = newTheme === 'dark' ? '🌙' : '☀️';
            });
        }

        createPacket(nodeA, nodeB) {
            return {
                x: nodeA.x,
                y: nodeA.y,
                targetX: nodeB.x,
                targetY: nodeB.y,
                progress: 0,
                color: nodeA.type === 'security' ? this.colors.red : this.colors.teal,
                size: Math.random() * 1.5 + 0.5
            };
        }
        
        drawHexagon(x, y, radius, color) {
            this.ctx.beginPath();
            this.ctx.moveTo(x + radius * Math.cos(0), y + radius * Math.sin(0));
            for (let i = 1; i <= 6; i++) {
                this.ctx.lineTo(
                    x + radius * Math.cos((i * 2 * Math.PI) / 6),
                    y + radius * Math.sin((i * 2 * Math.PI) / 6)
                );
            }
            this.ctx.closePath();
            this.ctx.fillStyle = color;
            this.ctx.fill();
        }
        
        drawBeeNode(x, y, radius, color) {
            this.drawHexagon(x, y, radius, color);
            this.ctx.beginPath();
            this.ctx.ellipse(x - radius * 1.5, y, radius * 0.8, radius * 0.3, Math.PI / 4, 0, Math.PI * 2);
            this.ctx.ellipse(x + radius * 1.5, y, radius * 0.8, radius * 0.3, -Math.PI / 4, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.2)';
            this.ctx.fill();
        }
        
        animate(timestamp) {
            if (timestamp - this.lastFrame < 16.67) {
                requestAnimationFrame((t) => this.animate(t));
                return;
            }
            this.lastFrame = timestamp;
            
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
            this.ctx.globalAlpha = 0.6;
            
            for (let i = 0; i < this.nodes.length; i++) {
                const nodeA = this.nodes[i];
                
                for (let j = i + 1; j < this.nodes.length; j++) {
                    const nodeB = this.nodes[j];
                    const dx = nodeA.x - nodeB.x;
                    const dy = nodeA.y - nodeB.y;
                    const distance = Math.sqrt(dx * dx + dy * dy);
                    
                    if (distance < this.connectionDistance) {
                        this.ctx.beginPath();
                        const gradient = this.ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
                        gradient.addColorStop(0, nodeA.color);
                        gradient.addColorStop(1, nodeB.color);
                        this.ctx.strokeStyle = gradient;
                        this.ctx.globalAlpha = 0.3 * (1 - distance / this.connectionDistance);
                        this.ctx.lineWidth = 1;
                        this.ctx.moveTo(nodeA.x, nodeA.y);
                        this.ctx.lineTo(nodeB.x, nodeB.y);
                        this.ctx.stroke();
                        
                        if (Math.random() < 0.005 && this.packets.length < 20) {
                            this.packets.push(this.createPacket(nodeA, nodeB));
                        }
                    }
                }
                
                nodeA.x += nodeA.vx;
                nodeA.y += nodeA.vy;
                
                if (nodeA.x < 0 || nodeA.x > this.canvas.width) nodeA.vx = -nodeA.vx;
                if (nodeA.y < 0 || nodeA.y > this.canvas.height) nodeA.vy = -nodeA.vy;
                
                this.ctx.globalAlpha = nodeA.type === 'security' ? 0.5 : 0.3;
                if (nodeA.isBee) {
                    this.drawBeeNode(nodeA.x, nodeA.y, nodeA.radius, nodeA.color);
                } else {
                    this.drawHexagon(nodeA.x, nodeA.y, nodeA.radius, nodeA.color);
                }
                
                const mouseDistance = Math.sqrt(
                    Math.pow(nodeA.x - this.mouseX, 2) +
                    Math.pow(nodeA.y - this.mouseY, 2)
                );
                if (mouseDistance < 50) {
                    const angle = Math.atan2(nodeA.y - this.mouseY, nodeA.x - this.mouseX);
                    const force = (50 - mouseDistance) / 1000;
                    nodeA.vx += Math.cos(angle) * force;
                    nodeA.vy += Math.sin(angle) * force;
                }
            }
            
            this.packets = this.packets.filter(packet => packet.progress < 1);
            for (let packet of this.packets) {
                packet.progress += 0.01 + Math.random() * 0.02;
                packet.x = packet.x + (packet.targetX - packet.x) * packet.progress;
                packet.y = packet.y + (packet.targetY - packet.y) * packet.progress;
                
                this.ctx.beginPath();
                this.ctx.fillStyle = packet.color;
                this.ctx.globalAlpha = 1 - packet.progress;
                this.drawHexagon(packet.x, packet.y, packet.size, packet.color);
            }
            
            requestAnimationFrame((t) => this.animate(t));
        }
    }
    
    const hackerNetwork = new HackerNetwork();
    console.log('Hacker Network Background Initialized');
});

document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu .nav-link');
    const contactLink = document.querySelector('.mobile-menu .nav-contact');
    const modal = document.querySelector('#contactModal');
    const closeModal = document.querySelector('.close-modal');

    mobileMenuBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('active');
        mobileMenuBtn.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });

    document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            mobileMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
            document.body.classList.remove('menu-open');
        }
    });

    contactLink.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent default anchor behavior
        modal.style.display = 'block'; // Show the modal
        mobileMenu.classList.remove('active'); // Close mobile menu
        mobileMenuBtn.classList.remove('active');
        document.body.classList.remove('menu-open');
    });

    // Close modal when clicking the close button
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });
});

if (document.querySelector('.typing')) {
    new Typed('.typing', {
        strings: ["Sudoers Security"],
        typeSpeed: 50,
        backSpeed: 50,
        backDelay: 1500,
        startDelay: 500,
        loop: true,
        showCursor: true,
        cursorChar: '|',
        smartBackspace: true
    });
}