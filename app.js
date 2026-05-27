document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       MOBILE MENU TOGGLE
       ========================================================================== */
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', () => {
            navMenu.classList.toggle('open');
            const icon = mobileToggle.querySelector('i');
            if (navMenu.classList.contains('open')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ==========================================================================
       STICKY HEADER STYLING
       ========================================================================== */
    const header = document.querySelector('.header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       SCROLL REVEAL & CHART ANIMATIONS
       ========================================================================== */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const chartBars = document.querySelectorAll('.chart-bars .bar');
    
    // Store original heights of the bars and set them to 0 initially
    const barHeights = [];
    chartBars.forEach((bar, index) => {
        barHeights[index] = bar.style.height || '100%';
        bar.style.height = '0%';
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('reveal-active');
                
                // If the revealed element is the projects section, animate the chart bars
                if (entry.target.closest('#projects') || entry.target.classList.contains('project-card')) {
                    setTimeout(() => {
                        chartBars.forEach((bar, index) => {
                            // Stagger the bar animation
                            setTimeout(() => {
                                bar.style.height = barHeights[index];
                            }, index * 150);
                        });
                    }, 300);
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach(el => {
        revealObserver.observe(el);
    });

    /* ==========================================================================
       ACTIVE LINK HIGHLIGHTING
       ========================================================================== */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            // Adjust scroll checkpoint for accuracy
            if (window.scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });

    /* ==========================================================================
       CONTACT FORM SUBMISSION (MAILTO CALLBACK)
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');

    if (contactForm && formSuccess) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Generate mailto link structure
            const mailtoUri = `mailto:amalmohan2080@gmail.com` +
                              `?subject=${encodeURIComponent(subject)}` +
                              `&body=${encodeURIComponent(`Hi Amal,\n\n${message}\n\nFrom,\n${name}\nEmail: ${email}`)}`;

            // Launch mail client
            window.location.href = mailtoUri;

            // Show success styling feedback
            contactForm.classList.add('hide');
            formSuccess.classList.remove('hide');
            
            // Reset form
            contactForm.reset();
        });
    }
});
