window.addEventListener('load', () => {
    const loadingScreen = document.querySelector('.loading-screen');
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        loadingScreen.style.transform = 'scale(1.1)';
        setTimeout(() => {
            loadingScreen.style.display = 'none';
        }, 1000);
    }, 5000);
});