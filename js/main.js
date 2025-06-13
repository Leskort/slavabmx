// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.backgroundColor = 'rgba(13, 27, 42, 0.98)';
        header.style.padding = '10px 0';
    } else {
        header.style.backgroundColor = 'rgba(13, 27, 42, 0.95)';
        header.style.padding = '15px 0';
    }
});

// Animation for achievement cards on scroll
const achievementCards = document.querySelectorAll('.achievement-card');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

achievementCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(50px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// Burger menu functionality
const burger = document.getElementById('burger');
const navLinks = document.querySelector('.nav-links');

function toggleMenu() {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
}

if (burger) {
    burger.addEventListener('click', toggleMenu);
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('open');
            burger.classList.remove('active');
        });
    });
} 