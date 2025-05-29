document.addEventListener('DOMContentLoaded', function() {
    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                // Calculate position, considering the fixed navbar height
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = targetSection.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Fade-in sections on scroll
    const sections = document.querySelectorAll('section, header#hero');
    const observerOptions = {
        root: null, // relative to document viewport 
        rootMargin: '0px',
        threshold: 0.1 // 10% of the item is visible
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // observer.unobserve(entry.target); // Optional: unobserve after animation
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    // Special handling for the hero section to be visible on load if it's at the top
    const heroSection = document.getElementById('hero');
    if (heroSection) {
        const heroRect = heroSection.getBoundingClientRect();
        if (heroRect.top <= window.innerHeight && heroRect.bottom >= 0) {
            heroSection.classList.add('visible');
        }
    }
}); 