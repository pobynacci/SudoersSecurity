document.addEventListener('DOMContentLoaded', () => {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const aboutDescription = document.querySelector('.about-description');
    if (aboutDescription) observer.observe(aboutDescription);

    const coFounders = document.querySelectorAll('.co-founder');
    
    coFounders.forEach(founder => {
        founder.removeAttribute('onclick');
        
        founder.addEventListener('click', function() {
            this.classList.add('flipped');
            setTimeout(() => {
                this.classList.remove('flipped');
            }, 5000);
        });
        
        founder.addEventListener('touchend', function(e) {
            e.preventDefault();
            this.classList.add('flipped');
            setTimeout(() => {
                this.classList.remove('flipped');
            }, 5000);
        });
    });

    const certItems = document.querySelectorAll('.cert-item img');
    certItems.forEach((item, index) => {
        item.style.animation = `float 5s ease-in-out ${index * 0.2}s infinite`;
    });

    const certTooltips = {
        'OSCP': 'Offensive Security Certified Professional',
        'GWAPT': 'GIAC Web Application Penetration Tester',
        'GPEN': 'GIAC Penetration Tester',
        'CBBH': 'Certified Bug Bounty Hunter',
        'EWPT': 'eLearnSecurity Web Application Penetration Tester',
        'OSWP': 'Offensive Security Wireless Professional',
        'CNPEN': 'Certified Network Penetration Tester',
        'AIML': 'AI Machine Learning Certification'
    };

    certItems.forEach(item => {
        const img = item.querySelector('img');
        const alt = img.getAttribute('alt');
        
        if (certTooltips[alt]) {
            const tooltip = item.querySelector('.cert-tooltip');
            if (tooltip) tooltip.textContent = certTooltips[alt];
        }
    });
});