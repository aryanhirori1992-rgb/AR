/* ================================
   ARYAN ISMAEL — script.js
   ================================ */

document.addEventListener('DOMContentLoaded', () => {

    /* ──────────────────────────────
       1. NAVBAR: scroll + hamburger
       ────────────────────────────── */
    const navbar    = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navLinks  = document.querySelector('.nav-links');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
        updateActiveNav();
    }, { passive: true });

    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('open');
        navLinks?.classList.toggle('open');
    });

    // Close mobile menu when a link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('open');
            navLinks?.classList.remove('open');
        });
    });


    /* ──────────────────────────────
       2. ACTIVE NAV LINK on scroll
       ────────────────────────────── */
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 100;
        sections.forEach(sec => {
            const top    = sec.offsetTop;
            const height = sec.offsetHeight;
            const id     = sec.getAttribute('id');
            if (scrollY >= top && scrollY < top + height) {
                navItems.forEach(a => {
                    a.classList.toggle('active', a.getAttribute('href') === `#${id}`);
                });
            }
        });
    }


    /* ──────────────────────────────
       3. SCROLL-REVEAL ANIMATIONS
       ────────────────────────────── */
    const animatedEls = document.querySelectorAll('[data-animate]');

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, i) => {
            if (entry.isIntersecting) {
                // Stagger children in the same parent group
                const delay = entry.target.dataset.delay || (i * 80);
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    animatedEls.forEach((el, i) => {
        el.style.transitionDelay = `${i * 60}ms`;
        revealObserver.observe(el);
    });


    /* ──────────────────────────────
       4. TYPING CURSOR on hero title
       ────────────────────────────── */
    const typedEl = document.getElementById('typed-name');
    const cursor  = document.querySelector('.cursor');
    const fullText = 'Aryan Ismael';

    if (typedEl) {
        typedEl.textContent = '';
        let i = 0;
        const typeInterval = setInterval(() => {
            if (i < fullText.length) {
                typedEl.textContent += fullText[i];
                i++;
            } else {
                clearInterval(typeInterval);
                // Blink cursor after typing is done (already via CSS)
            }
        }, 90);
    }


    /* ──────────────────────────────
       5. COUNT-UP NUMBERS in stats
       ────────────────────────────── */
    const statNums = document.querySelectorAll('.stat-num[data-target]');

    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el     = entry.target;
                const target = parseInt(el.dataset.target, 10);
                const dur    = 1400; // ms
                const step   = dur / target;
                let count    = 0;

                const counter = setInterval(() => {
                    count += 1;
                    el.textContent = count;
                    if (count >= target) {
                        el.textContent = target;
                        clearInterval(counter);
                    }
                }, Math.max(step, 10));

                countObserver.unobserve(el);
            }
        });
    }, { threshold: 0.5 });

    statNums.forEach(el => countObserver.observe(el));


    /* ──────────────────────────────
       6. SMOOTH SCROLL for anchor links
       ────────────────────────────── */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const target = document.querySelector(anchor.getAttribute('href'));
            if (target) {
                e.preventDefault();
                const top = target.getBoundingClientRect().top + window.scrollY - 68;
                window.scrollTo({ top, behavior: 'smooth' });
            }
        });
    });


    /* ──────────────────────────────
       7. SKILL CARDS hover ripple
       ────────────────────────────── */
    document.querySelectorAll('.skill-card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            card.style.setProperty('--mx', `${x}%`);
            card.style.setProperty('--my', `${y}%`);
        });
    });


    /* ──────────────────────────────
       8. CONTACT LINKS: copy email
       ────────────────────────────── */
    const emailLink = document.querySelector('.contact-link[href^="mailto"]');
    if (emailLink) {
        emailLink.addEventListener('click', (e) => {
            const email = emailLink.getAttribute('href').replace('mailto:', '');
            if (navigator.clipboard?.writeText) {
                navigator.clipboard.writeText(email).then(() => {
                    const span = emailLink.querySelector('span:nth-child(2)');
                    if (span) {
                        const orig = span.textContent;
                        span.textContent = 'Copied!';
                        setTimeout(() => { span.textContent = orig; }, 1500);
                    }
                });
            }
        });
    }

});