document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('contactModal');
    const ctaButton = document.querySelector('.cta-button');
    const closeModal = document.querySelector('.close-modal');
    const navContact = document.querySelector('.nav-contact');
    const serviceContact = document.querySelector('.service-button');
    const serviceModalContact = document.querySelector('.service-modal-cta');
    const loadingScreen = document.querySelector('.loading-screen');

    // Function to open modal
    const openModal = (e) => {
        e.preventDefault();
        modal.style.display = 'block';
        document.body.style.overflow = 'hidden';
    };

    // Event listeners to open modal
    ctaButton.addEventListener('click', openModal);
    serviceContact.addEventListener('click', openModal);
    serviceModalContact.addEventListener('click', openModal);
    navContact.addEventListener('click', openModal);

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

    // Touch events for mobile scrolling
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

    // EmailJS functionality
    (function() {
        emailjs.init('_kDZyT8o41sG3-rK6');
    })();

    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

            // Show loading screen
            loadingScreen.style.display = 'flex';
            loadingScreen.style.opacity = '0';
            loadingScreen.style.transform = 'scale(1)';

            emailjs.sendForm('service_zwce2jg', 'template_j4q6cpv', this)
                .then(() => {
                    // Success
                    formMessage.innerHTML = '<i class="fas fa-check"></i> Message Sent Successfully! We’ll get back to you soon.';
                    formMessage.className = 'form-message success';
                    contactForm.reset();

                })
                .catch(error => {
                    // Error
                    formMessage.innerHTML = '<i class="fas fa-times"></i> Error! Please try again.';
                    formMessage.className = 'form-message error';
                    console.error('Failed to send message:', error);
                })
                .finally(() => {
                    // Hide loading screen
                    setTimeout(() => {
                        loadingScreen.style.opacity = '0';
                        loadingScreen.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            loadingScreen.style.display = 'none';
                        }, 1000);
                    }, 2000);

                    setTimeout(() => {
                        modal.style.display = 'none';
                        document.body.style.overflow = 'auto';
                    }, 3000);

                    setTimeout(() => {
                        formMessage.textContent = '';
                        formMessage.className = 'form-message';
                    }, 3000);
                    
                    // Reset button
                    submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
                    submitBtn.disabled = false;
                });
        });
    }
});