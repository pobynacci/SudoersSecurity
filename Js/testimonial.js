document.addEventListener('DOMContentLoaded', () => {
    const carouselTrack = document.querySelector('.carousel-track');
    carouselTrack.addEventListener('touchstart', () => {
        carouselTrack.style.animationPlayState = 'paused';
    });
    
    carouselTrack.addEventListener('touchend', () => {
        carouselTrack.style.animationPlayState = 'running';
    });
    
    window.addEventListener('resize', () => {
        carouselTrack.style.animation = 'none';
        void carouselTrack.offsetWidth;
        carouselTrack.style.animation = null;
    });
});