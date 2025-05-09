document.addEventListener('DOMContentLoaded', () => {

    const header = document.querySelector('.site-header');
    const navLinks = document.querySelectorAll('.main-nav a[href^="#"]');
    const sections = document.querySelectorAll('main section[id]');
    const contactForm = document.querySelector('.contact-form');
    // Optional: Select elements for fade-in animation
    const fadeElements = document.querySelectorAll('.card, .blog-preview, #about p, #hero p');

    // --- 1. Sticky Header Effect ---
    function handleScrollHeader() {
        if (window.scrollY > 50) { // Add class after scrolling 50px
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    }

    // --- 2. Smooth Scrolling ---
    function initSmoothScroll() {
        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault(); // Prevent default anchor jump
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    // Calculate position considering the sticky header height
                    const headerOffset = header.offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });

                    // Optional: Close mobile menu if open after clicking a link
                    // if (nav.classList.contains('active')) {
                    //    nav.classList.remove('active');
                    // }
                }
            });
        });
    }

    // --- 3. Active Navigation Link Highlighting ---
    function handleActiveNavLinks() {
        let currentSectionId = '';
        const headerHeight = header.offsetHeight;

        sections.forEach(section => {
            const sectionTop = section.offsetTop - headerHeight - 50; // Offset slightly below header
            const sectionBottom = sectionTop + section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });

        // Handle edge case: If scrolled to the very top, no link should be active (or maybe 'home' if you add one)
        if (window.scrollY < sections[0].offsetTop - headerHeight - 50) {
            navLinks.forEach(link => link.classList.remove('active'));
            // If you add a "Home" link pointing to #hero, activate it here:
            // const homeLink = document.querySelector('.main-nav a[href="#hero"]');
            // if (homeLink) homeLink.classList.add('active');
        }
        // Handle edge case: If scrolled past the last section, activate the last link ('Contact')
        const lastSection = sections[sections.length - 1];
        if (window.scrollY >= (lastSection.offsetTop - headerHeight - 50 + lastSection.offsetHeight / 2)) { // Consider active when half past the last section
            navLinks.forEach(link => link.classList.remove('active'));
            const contactLink = document.querySelector('.main-nav a[href="#contact"]');
            if (contactLink) contactLink.classList.add('active');
        }
    }


    // --- 4. Basic Form Interaction ---
    function initFormHandler() {
        if (contactForm) {
            contactForm.addEventListener('submit', (e) => {
                e.preventDefault(); // IMPORTANT: Prevents actual submission for now

                // Basic Validation Example (can be expanded)
                const name = contactForm.querySelector('#name').value.trim();
                const email = contactForm.querySelector('#email').value.trim();
                const message = contactForm.querySelector('#message').value.trim();
                let isValid = true;

                if (!name || !email || !message) {
                    alert('Please fill in all fields.');
                    isValid = false;
                } else if (!/\S+@\S+\.\S+/.test(email)) { // Simple email format check
                    alert('Please enter a valid email address.');
                    isValid = false;
                }

                if (isValid) {
                    // In a real application, you would send data via fetch() here
                    console.log('Form submitted (simulated):', { name, email, message });
                    alert('Thank you for your message! (Submission not yet functional)');
                    contactForm.reset(); // Clear the form
                }
            });
        }
    }

    // --- 5. (Optional) Fade-in Effect on Scroll ---
    function initScrollFadeIn() {
        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                        observer.unobserve(entry.target); // Animate only once
                    }
                });
            }, {
                rootMargin: '0px', // No margin
                threshold: 0.1 // Trigger when 10% of the element is visible
            });

            fadeElements.forEach(el => {
                // Initially hide elements to be faded in (can also be done in CSS)
                // el.style.opacity = '0';
                // el.style.transform = 'translateY(20px)';
                // el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
                observer.observe(el);
            });
        } else {
            // Fallback for older browsers (e.g., just show elements)
            fadeElements.forEach(el => el.classList.add('visible'));
            console.log("IntersectionObserver not supported, fade-in disabled.");
        }
    }


    // --- Initialize Functions ---
    initSmoothScroll();
    initFormHandler();

    // Run scroll-dependent functions initially and on scroll
    handleScrollHeader();
    handleActiveNavLinks(); // Run once on load
    window.addEventListener('scroll', () => {
        handleScrollHeader();
        handleActiveNavLinks();
    });

    // Initialize optional fade-in effect
    initScrollFadeIn(); // Comment this out if you don't want the effect

}); // End DOMContentLoaded
