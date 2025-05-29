document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuButton = document.getElementById('mobile-menu');
    const navLinksContainer = document.querySelector('#navbar .nav-links-container');

    if (mobileMenuButton && navLinksContainer) {
        mobileMenuButton.addEventListener('click', () => {
            navLinksContainer.classList.toggle('active');
            mobileMenuButton.classList.toggle('active'); // For animating the hamburger icon
        });
    }

    // Smooth scrolling for navigation links
    const navLinks = document.querySelectorAll('#navbar .nav-links-container ul li a');
    const navbarHeight = document.getElementById('navbar').offsetHeight;

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                let targetPosition = targetElement.offsetTop - navbarHeight;

                // Special adjustment for the #hero section as it has an additional margin-top
                if (targetId === '#hero') {
                    const heroComputedStyle = window.getComputedStyle(targetElement);
                    const heroMarginTop = parseInt(heroComputedStyle.marginTop, 10);
                    targetPosition = targetElement.offsetTop - navbarHeight - heroMarginTop; 
                }
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu after clicking a link
                if (navLinksContainer.classList.contains('active')) {
                    navLinksContainer.classList.remove('active');
                    mobileMenuButton.classList.remove('active');
                }
            }
        });
    });

    // Optional: Close mobile menu if clicked outside
    document.addEventListener('click', (event) => {
        const isClickInsideNavbar = document.getElementById('navbar').contains(event.target);
        if (!isClickInsideNavbar && navLinksContainer.classList.contains('active')) {
            navLinksContainer.classList.remove('active');
            mobileMenuButton.classList.remove('active');
        }
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