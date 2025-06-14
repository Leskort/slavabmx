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

// Gallery Tabs
const tabBtns = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        // Remove active class from all buttons and contents
        tabBtns.forEach(b => b.classList.remove('active'));
        tabContents.forEach(c => c.classList.remove('active'));
        
        // Add active class to clicked button and corresponding content
        btn.classList.add('active');
        const tabId = btn.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Lightbox
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeLightbox = document.querySelector('.close-lightbox');

function openLightbox(img) {
    lightbox.style.display = 'flex';
    lightboxImg.src = img.src;
}

closeLightbox.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) {
        lightbox.style.display = 'none';
    }
});

// Close lightbox with Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.style.display === 'flex') {
        lightbox.style.display = 'none';
    }
});


// Instagram Feed
const instagramGrid = document.getElementById('instagramGrid');

async function loadInstagramFeed() {
    try {
        // Здесь нужно будет заменить на ваш Instagram Access Token
        const accessToken = 'YOUR_INSTAGRAM_ACCESS_TOKEN';
        const response = await fetch(`https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,permalink,thumbnail_url&access_token=${accessToken}`);
        const data = await response.json();
        
        if (data.data) {
            instagramGrid.innerHTML = ''; // Очищаем индикатор загрузки
            
            data.data.forEach(post => {
                if (post.media_type === 'IMAGE' || post.media_type === 'CAROUSEL_ALBUM') {
                    const item = document.createElement('div');
                    item.className = 'instagram-item';
                    item.innerHTML = `
                        <img src="${post.media_url}" alt="${post.caption || 'Instagram post'}">
                        <div class="instagram-item-overlay">
                            <div class="instagram-item-stats">
                                <a href="${post.permalink}" target="_blank" class="instagram-link">
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    `;
                    instagramGrid.appendChild(item);
                }
            });
        }
    } catch (error) {
        console.error('Error loading Instagram feed:', error);
        instagramGrid.innerHTML = `
            <div class="instagram-error">
                <i class="fas fa-exclamation-circle"></i>
                <p>Не удалось загрузить фотографии из Instagram</p>
            </div>
        `;
    }
}

// Загружаем Instagram feed при загрузке страницы
document.addEventListener('DOMContentLoaded', loadInstagramFeed);

// Autoplay videos when in view
const videoIframes = document.querySelectorAll('#videos .video-item iframe');

const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Play video when it enters view (muted)
            const src = entry.target.src;
            if (src.includes('youtube.com/embed') && !src.includes('autoplay=1')) {
                entry.target.src += '&autoplay=1&mute=1';
            }
        } else {
            // Pause video when it leaves view
            const src = entry.target.src;
            if (src.includes('youtube.com/embed') && src.includes('autoplay=1')) {
                // Remove autoplay and mute to effectively stop and reset
                entry.target.src = src.replace('&autoplay=1&mute=1', '');
            }
        }
    });
}, { threshold: 0.5 }); // Trigger when 50% of the video is visible

videoIframes.forEach(iframe => {
    videoObserver.observe(iframe);
});
