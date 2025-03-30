document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const ctaButton = document.querySelector('.cta-button');
    const closeModal = document.querySelector('.close-modal');
    const navContact = document.querySelector('.nav-contact');

    // Open modal
    ctaButton.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    });

    navContact.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display ='block';
        document.body.style.overflow = 'hidden';
    });

    // Close modal
    closeModal.addEventListener('click', () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
    });

    // Close when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });

    // Close with ESC key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.style.display === 'block') {
            modal.style.display = 'none';
            document.body.style.overflow = 'auto';
        }
    });
});

// EmailJS functionality
(function() {
    emailjs.init('YOUR_PUBLIC_KEY');
})();

document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const btn = document.querySelector('.submit-btn');
    btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    
    emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', this)
        .then(() => {
            btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
            setTimeout(() => {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
                this.reset();
                btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
        })
        .catch((error) => {
            btn.innerHTML = '<i class="fas fa-times"></i> Error!';
            console.error('Failed to send message:', error);
            setTimeout(() => {
                btn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            }, 2000);
        });
});

let touchStartY = 0;

modal.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
}, false);

modal.addEventListener('touchmove', function(e) {
    const touch = e.touches[0];
    const scrollTop = modal.scrollTop;
    const scrollHeight = modal.scrollHeight;
    const offsetHeight = modal.offsetHeight;
    
    if (scrollTop + offsetHeight >= scrollHeight && touch.clientY < touchStartY) {
        e.preventDefault();
    }
    if (scrollTop <= 0 && touch.clientY > touchStartY) {
        e.preventDefault();
    }
}, false);