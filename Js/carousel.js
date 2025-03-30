class Carousel {
    constructor() {
        this.clientLogos = document.querySelector('.client-logos');
        this.carouselContainer = document.querySelector('.carousel-container');
        this.animationFrameId = null;
        this.resizeObserver = null;
        this.targetPositions = [];
        this.isResizing = false;
        
        this.init();
    }

    async init() {
        if (!this.validateElements()) return;

        this.setupDefaults();
        await this.loadImages();
        this.setupCarouselStructure();
        this.setupEventListeners();
        this.startAnimation();
    }

    validateElements() {
        if (!this.clientLogos || !this.carouselContainer) {
            console.error('Carousel elements not found');
            return false;
        }
        return true;
    }

    setupDefaults() {
        this.defaultSpeed = 0.5;
        this.currentSpeed = this.defaultSpeed;
        this.velocity = 0;
        this.lastTime = performance.now();
        this.isDragging = false;
        this.startX = 0;
        this.lastX = 0;
    }

    async loadImages() {
        this.logos = Array.from(this.clientLogos.querySelectorAll('img'));
        await Promise.all(this.logos.map(img =>
            new Promise(resolve => {
                if (img.complete) resolve();
                img.addEventListener('load', resolve);
                img.addEventListener('error', resolve);
            })
        ));
    }

    setupCarouselStructure() {
        this.containerWidth = this.carouselContainer.offsetWidth;
        this.logos.forEach(img => {
            img.style.height = '80px';
            img.style.width = 'auto';
            img.style.objectFit = 'contain';
            img.style.position = 'absolute';
        });
        
        this.initializePositions(true);
    }

    calculateLayout() {
        const gap = this.getGap();
        this.logoWidths = this.logos.map(img => img.offsetWidth);
        this.totalContentWidth = this.logoWidths.reduce((sum, width) => sum + width + gap, -gap);
        this.requiredDuplicates = Math.ceil(this.containerWidth / this.totalContentWidth) + 1;
    }

    initializePositions(initial = false) {
        const gap = this.getGap();
        this.calculateLayout();
        
        this.positions = [];
        let xPosition = initial ? (this.containerWidth - this.totalContentWidth) / 2 : 0;

        this.logos.forEach((img, index) => {
            img.style.left = `${xPosition}px`;
            this.positions.push(xPosition);
            xPosition += img.offsetWidth + gap;
        });

        // Create duplicate logos for seamless looping
        if (initial) {
            for (let i = 0; i < this.requiredDuplicates; i++) {
                this.logos.forEach((original, index) => {
                    const clone = original.cloneNode(true);
                    clone.style.left = `${xPosition}px`;
                    this.clientLogos.appendChild(clone);
                    this.positions.push(xPosition);
                    xPosition += original.offsetWidth + gap;
                });
            }
            this.logos = Array.from(this.clientLogos.querySelectorAll('img'));
        }
    }

    getGap() {
        return parseFloat(getComputedStyle(this.clientLogos).gap) || 0;
    }

    startAnimation() {
        const animate = (timestamp) => {
            if (!this.lastTime) this.lastTime = timestamp;
            const deltaTime = (timestamp - this.lastTime) / 16.67;
            this.lastTime = timestamp;

            this.updatePositions(deltaTime);
            this.handleWrapping();
            this.animationFrameId = requestAnimationFrame(animate);
        };
        animate(performance.now());
    }

    updatePositions(deltaTime) {
        const gap = this.getGap();
        const baseSpeed = this.isDragging ? 0 : this.defaultSpeed;
        const speed = this.isResizing ? 0 : baseSpeed + this.velocity;

        this.positions = this.positions.map((pos, index) => {
            const newPos = pos - speed * deltaTime;
            this.logos[index].style.left = `${newPos}px`;
            return newPos;
        });
    }

    handleWrapping() {
        const gap = this.getGap();
        const rightEdge = this.containerWidth;
        const leftThreshold = -this.logos[0].offsetWidth;

        this.positions.forEach((pos, index) => {
            if (pos > rightEdge) {
                const newPos = pos - this.totalContentWidth - gap;
                this.positions[index] = newPos;
                this.logos[index].style.left = `${newPos}px`;
            } else if (pos < leftThreshold) {
                const newPos = pos + this.totalContentWidth + gap;
                this.positions[index] = newPos;
                this.logos[index].style.left = `${newPos}px`;
            }
        });
    }

    setupEventListeners() {
        const handleDragStart = (e) => {
            this.isDragging = true;
            this.startX = e.clientX || e.touches[0].clientX;
            this.lastX = this.startX;
            this.velocity = 0;
        };

        const handleDragMove = (e) => {
            if (!this.isDragging) return;
            const x = e.clientX || e.touches[0].clientX;
            const deltaX = x - this.lastX;
            this.lastX = x;
            this.velocity = deltaX * 0.5;
        };

        const handleDragEnd = () => {
            this.isDragging = false;
            this.velocity *= 0.7;
        };

        // Mouse and touch events
        this.clientLogos.addEventListener('mousedown', handleDragStart);
        document.addEventListener('mousemove', handleDragMove);
        document.addEventListener('mouseup', handleDragEnd);
        this.clientLogos.addEventListener('touchstart', handleDragStart);
        document.addEventListener('touchmove', handleDragMove);
        document.addEventListener('touchend', handleDragEnd);

        // Optimized resize handling
        this.resizeObserver = new ResizeObserver(entries => {
            this.isResizing = true;
            this.containerWidth = entries[0].contentRect.width;
            this.initializePositions();
            requestAnimationFrame(() => {
                this.isResizing = false;
            });
        });
        this.resizeObserver.observe(this.carouselContainer);
    }

    destroy() {
        cancelAnimationFrame(this.animationFrameId);
        this.resizeObserver.disconnect();
    }
}

document.addEventListener('DOMContentLoaded', () => new Carousel());