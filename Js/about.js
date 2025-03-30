document.addEventListener('DOMContentLoaded', () => {
    const teamLinks = document.querySelectorAll('.co-founder a');
    
    teamLinks.forEach(link => {
        link.addEventListener('touchstart', (e) => {
            link.style.opacity = '0.9';
        });
        
        link.addEventListener('touchend', (e) => {
            link.style.opacity = '1';
        });
    });
});