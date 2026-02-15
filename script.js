const menuToggle = document.querySelector('.menu-toggle');
const navList = document.querySelector('nav ul');
const navLinks = document.querySelectorAll('nav a');

if (menuToggle && navList) {
    menuToggle.addEventListener('click', () => {
        const isOpen = navList.classList.toggle('open');
        menuToggle.setAttribute('aria-expanded', String(isOpen));
    });
}

navLinks.forEach((anchor) => {
    anchor.addEventListener('click', (event) => {
        const targetId = anchor.getAttribute('href');
        if (!targetId || !targetId.startsWith('#')) {
            return;
        }

        const targetSection = document.querySelector(targetId);
        if (!targetSection) {
            return;
        }

        event.preventDefault();
        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });

        if (navList?.classList.contains('open')) {
            navList.classList.remove('open');
            menuToggle?.setAttribute('aria-expanded', 'false');
        }
    });
});

const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();
        alert('Thank you for your message! I will get back to you soon.');
        contactForm.reset();
    });
}

const sections = document.querySelectorAll('main section');
const sectionObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    },
    { threshold: 0.12 }
);

sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(16px)';
    section.style.transition = 'opacity 0.45s ease, transform 0.45s ease';
    sectionObserver.observe(section);
});

document.addEventListener('scroll', () => {
    let currentId = '';

    sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.scrollY >= sectionTop - 160) {
            currentId = section.getAttribute('id') || '';
        }

        if (section.classList.contains('visible')) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });

    navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${currentId}`);
    });
});
