document.addEventListener('DOMContentLoaded', function() {

    // --- Logic for All Pages ---

    // Make navbar-text::before clickable on mobile
    const navbarText = document.querySelector('.navbar-text');
    if (navbarText) {
        const handleNavClick = (e, clickX) => {
            const rect = navbarText.getBoundingClientRect();
            const textWidth = navbarText.offsetWidth;
            
            if (clickX < textWidth * 0.45) {
                e.preventDefault();
                e.stopPropagation();
                window.location.href = 'Contact.html';
            }
        };

        navbarText.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                handleNavClick(e, e.clientX - this.getBoundingClientRect().left);
            }
        });
        
        navbarText.addEventListener('touchend', function(e) {
            if (window.innerWidth <= 768) {
                const touch = e.changedTouches[0];
                handleNavClick(e, touch.clientX - this.getBoundingClientRect().left);
            }
        });
    }


    // --- Logic for Sub-Pages (Contact, About, etc.) ---

    // "Back to Index" button functionality
    var backIcon = document.getElementById('back-to-index');
    if (backIcon) {
        backIcon.addEventListener('click', function() {
            window.location.href = 'index.html';
        });
    }

    // FAQ Accordion functionality - Simple and clean
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            faqItem.classList.toggle('active');
        });
    });


    // --- Logic for Index Page (Art Gallery) ---

    const palette = document.getElementById('palette');
    const painting = document.getElementById('painting');
    const title = document.getElementById('title');
    const subtitle = document.getElementById('subtitle');
    const description = document.getElementById('description');

    // Only run gallery script if all elements are present
    if (palette && painting && title && subtitle && description) {
        
        // Pre-calculate dimensions for the initial "Welcome" painting
        const welcomeImage = new Image();
        welcomeImage.src = painting.src; // Use the initial src from the HTML
        welcomeImage.onload = function() {
            const targetWidth = 600;
            const maxHeight = 450;
            
            const aspectRatio = this.naturalWidth / this.naturalHeight;
            let width = targetWidth;
            let height = targetWidth / aspectRatio;
            
            if (height > maxHeight) {
                height = maxHeight;
                width = maxHeight * aspectRatio;
            }

            painting.style.width = width + 'px';
            painting.style.height = height + 'px';
        };

        // Initial animation for the main painting
        window.addEventListener('load', () => {
            setTimeout(() => {
                painting.classList.remove('hide');
                painting.classList.add('show');

                setTimeout(() => title.classList.remove('hide'), 200);
                setTimeout(() => subtitle.classList.remove('hide'), 400);
                setTimeout(() => description.classList.remove('hide'), 600);
            }, 100);
        });

        const artworks = [
            { color: 'red', img: 'img/1.jpg', title: 'Titlu 1', subtitle: '<span style="color: #333;">Nr. 1</span> __ 8', desc: 'Tablou in ulei | 21x34 cm.' },
            { color: 'blue', img: 'img/2.png', title: 'Titlu 2', subtitle: '<span style="color: #333;">Nr. 2</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
            { color: 'green', img: 'img/3.jpg', title: 'Titlu 3', subtitle: '<span style="color: #333;">Nr. 3</span> __ 8', desc: 'Descriere pentru al treilea tablou.' },
            { color: 'yellow', img: 'img/4.jpg', title: 'Titlu 4', subtitle: '<span style="color: #333;">Nr. 4</span> __ 8', desc: 'Descriere pentru al patrulea tablou.' },
            { color: 'orange', img: 'img/5.jpg', title: 'Titlu 5', subtitle: '<span style="color: #333;">Nr. 5</span> __ 8', desc: 'Descriere pentru al cincelea tablou.' },
            { color: 'grey', img: 'img/6.jpg', title: 'Titlu 6', subtitle: '<span style="color: #333;">Nr. 6</span> __ 8', desc: 'Descriere pentru al saselea tablou.' },
            { color: 'purple', img: 'img/8.png', title: 'Titlu 7', subtitle: '<span style="color: #333;">Nr. 7</span> __ 8', desc: 'Descriere pentru al saptelea tablou.' },
            { color: 'white', img: 'img/7.jpg', title: 'Titlu 8', subtitle: '<span style="color: #333;">Nr. 8</span> __ 8', desc: 'Descriere pentru al optulea tablou.' }
        ];

        let currentIndex = -1;
        const buttons = [];
        const preloadedImages = [];

        // Function to change the artwork
        function selectArtwork(index) {
            if (index === currentIndex) return;

            currentIndex = index;
            updateActiveButton();

            description.classList.add('hide');
            setTimeout(() => subtitle.classList.add('hide'), 200);
            setTimeout(() => title.classList.add('hide'), 400);

            painting.classList.remove('show');
            painting.classList.add('hide');

            setTimeout(() => {
                if (preloadedImages[index]) {
                    painting.style.width = preloadedImages[index].width + 'px';
                    painting.style.height = preloadedImages[index].height + 'px';
                }

                painting.src = artworks[index].img;
                title.textContent = artworks[index].title;
                subtitle.innerHTML = artworks[index].subtitle;
                description.textContent = artworks[index].desc;

                painting.classList.remove('hide');
                painting.classList.add('show');

                setTimeout(() => title.classList.remove('hide'), 200);
                setTimeout(() => subtitle.classList.remove('hide'), 400);
                setTimeout(() => description.classList.remove('hide'), 500);
            }, 1200);
        }
        
        // Create palette buttons and preload images
        artworks.forEach((art, index) => {
            const btn = document.createElement('button');
            btn.className = 'color-button';
            btn.dataset.index = index;
            
            const thumbnail = document.createElement('img');
            thumbnail.src = art.img;
            thumbnail.alt = `Thumbnail ${index + 1}`;
            thumbnail.style.cssText = 'width: 100%; height: 100%; object-fit: cover; border-radius: 50%;';
            
            btn.appendChild(thumbnail);
            
            btn.addEventListener('click', () => {
                selectArtwork(parseInt(btn.dataset.index));
            });
            
            palette.appendChild(btn);
            buttons.push(btn);

            const img = new Image();
            img.src = art.img;
            img.onload = function() {
                const targetWidth = 600;
                const maxHeight = 450;
                
                const aspectRatio = this.naturalWidth / this.naturalHeight;
                let width = targetWidth;
                let height = targetWidth / aspectRatio;
                
                if (height > maxHeight) {
                    height = maxHeight;
                    width = maxHeight * aspectRatio;
                }
                
                preloadedImages[index] = { width, height, aspectRatio };
            };
        });

        // Function to update the active button in the palette
        function updateActiveButton() {
            buttons.forEach(btn => btn.classList.remove('active-button'));
            if (currentIndex >= 0) {
                const activeBtn = buttons.find(btn => parseInt(btn.dataset.index) === currentIndex);
                if (activeBtn) {
                    activeBtn.classList.add('active-button');
                }
            }
        }
    }

    // Image Modal Logic (for Index Page on mobile)
    const modal = document.getElementById('image-modal');
    const modalImg = document.getElementById('modal-img');
    const paintingForModal = document.querySelector('.painting');

    if (paintingForModal && modal && modalImg) {
        paintingForModal.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                modalImg.src = paintingForModal.src;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        modal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }

    // Mobile navbar active link highlight
    function setActiveMobileNav() {
        const path = window.location.pathname.toLowerCase();
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        if (path.includes('aboutme')) {
            document.getElementById('nav-about')?.classList.add('active');
        } else if (path.includes('contact')) {
            document.getElementById('nav-contact')?.classList.add('active');
        } else {
            document.getElementById('nav-home')?.classList.add('active');
        }
    }
    window.addEventListener('DOMContentLoaded', setActiveMobileNav);

    // Mobile navbar hide/show on scroll
    let lastScrollTop = 0;
    const mobileNavbar = document.querySelector('.mobile-navbar');
    const scrollThreshold = 10; // Minimum scroll distance to trigger hide/show

    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (Math.abs(scrollTop - lastScrollTop) < scrollThreshold) return;
        
        if (scrollTop > lastScrollTop && scrollTop > 60) {
            // Scrolling down - hide navbar
            mobileNavbar?.classList.add('navbar-hidden');
        } else {
            // Scrolling up - show navbar
            mobileNavbar?.classList.remove('navbar-hidden');
        }
        
        lastScrollTop = scrollTop;
    }

    // Throttle scroll events for better performance
    let ticking = false;
    function updateNavbar() {
        handleScroll();
        ticking = false;
    }

    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });





    // Check if user has seen the gallery animation before
    const hasSeenGallery = sessionStorage.getItem('hasSeenGallery');
    const galleryContainer = document.querySelector('.gallery-container');
    const mainContent = document.getElementById('main-content');

    // If user has seen the gallery before, skip it and show main content directly
    if (hasSeenGallery) {
        galleryContainer.style.display = 'none';
        mainContent.classList.add('visible');
        return; // Exit early, don't set up gallery functionality
    }

    // Gallery Portal Effect (only for first-time visitors)
    const portalFrames = document.querySelectorAll('.portal-frame');
    const galleryTrack = document.querySelector('.gallery-track');
    let portalActivated = false;

    // Function to activate portal effect
    function activatePortal(selectedFrame) {
        if (portalActivated) return;
        portalActivated = true;

        // Mark that user has seen the gallery
        sessionStorage.setItem('hasSeenGallery', 'true');

        // Pause the gallery animation
        galleryTrack.classList.add('paused');

        // Direct transition to main content
        galleryContainer.style.transition = 'opacity 0.5s ease-out';
        galleryContainer.classList.add('hidden');
        mainContent.classList.add('visible');
    }

    // Add click event only to portal frames
    portalFrames.forEach(frame => {
        frame.addEventListener('click', () => {
            activatePortal(frame);
        });
    });

    // Gallery runs infinitely until user clicks on portal
    // No auto-activation - user must interact to enter the site

    // Function to reset gallery animation (for testing)
    window.resetGalleryAnimation = function() {
        sessionStorage.removeItem('hasSeenGallery');
        location.reload();
    };





    
});

window.addEventListener('load', function() {
    document.getElementById('preloader').style.display = 'none';
  });

// --- Contact Page Enhancements ---

// Scroll animations for contact page
function initContactPageAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // Observe all elements with animate-on-scroll class
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

// Initialize tilt effects for cards
function initTiltEffects() {
    // Am eliminat VanillaTilt.init(document.querySelectorAll('[data-tilt]'), {...}) și orice logică asociată tilt.
}

// Simple FAQ functionality
function initEnhancedFAQ() {
    // FAQ is already initialized in the main DOMContentLoaded event
    // This function is kept for compatibility but does nothing extra
    console.log('FAQ functionality ready');
}

// Social card hover effects
function initSocialCardEffects() {
    document.querySelectorAll('.social-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.05)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Review card interactions
function initReviewCardEffects() {
    document.querySelectorAll('.review-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            const stars = this.querySelectorAll('.stars i');
            stars.forEach((star, index) => {
                star.style.animationDelay = `${index * 0.1}s`;
            });
        });
    });
}

// Particle animation enhancement
function initParticleEffects() {
    const particles = document.querySelectorAll('.particle');
    particles.forEach((particle, index) => {
        // Add random movement
        setInterval(() => {
            const randomX = Math.random() * 100;
            const randomY = Math.random() * 100;
            particle.style.left = randomX + '%';
            particle.style.top = randomY + '%';
        }, 8000 + index * 1000);
    });
}

// Smooth scroll for navigation
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Initialize all contact page enhancements
function initContactPageEnhancements() {
    // Check if we're on the contact page
    if (window.location.pathname.includes('Contact.html') || 
        document.querySelector('.social-container')) {
        
        // Initialize all enhancements
        initContactPageAnimations();
        initTiltEffects();
        initEnhancedFAQ();
        initSocialCardEffects();
        initReviewCardEffects();
        initParticleEffects();
        initSmoothScroll();
        
        // Add loading animation delay
        setTimeout(() => {
            document.body.classList.add('page-loaded');
        }, 100);
    }
}

// Call initialization when DOM is loaded
initContactPageEnhancements();

// Re-initialize on window resize for responsive behavior
window.addEventListener('resize', () => {
    // Am eliminat VanillaTilt.destroyAll(); și orice logică asociată tilt.
});

// Add CSS for page loading animation
const style = document.createElement('style');
style.textContent = `
    body:not(.page-loaded) .social-card,
    body:not(.page-loaded) .review-card,
    body:not(.page-loaded) .faq-item {
        opacity: 0;
        transform: translateY(30px);
    }
    
    body.page-loaded .social-card,
    body.page-loaded .review-card,
    body.page-loaded .faq-item {
        transition: all 0.6s cubic-bezier(0.175, 0.885, 0.32, 1.275);
    }
`;
document.head.appendChild(style);

// === DARK MODE LOGIC ===
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
    localStorage.setItem('darkMode', '1');
    setDarkModeIcon(true);
  } else {
    document.body.classList.remove('dark-mode');
    localStorage.setItem('darkMode', '0');
    setDarkModeIcon(false);
  }
}
function setDarkModeIcon(isDark) {
  const btns = [
    document.getElementById('dark-mode-toggle'),
    document.getElementById('dark-mode-toggle-desktop')
  ];
  btns.forEach(btn => {
    if (btn) {
      const icon = btn.querySelector('i');
      if (icon) {
        icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
      }
      btn.title = isDark ? 'Comută Light Mode' : 'Comută Dark Mode';
    }
  });
}
function toggleDarkMode() {
  setDarkMode(!document.body.classList.contains('dark-mode'));
}
// Init dark mode on page load
(function() {
  const darkPref = localStorage.getItem('darkMode');
  setDarkMode(darkPref === '1' || (darkPref === null && window.matchMedia('(prefers-color-scheme: dark)').matches));
  // Attach event listeners
  const btns = [
    document.getElementById('dark-mode-toggle'),
    document.getElementById('dark-mode-toggle-desktop')
  ];
  btns.forEach(btn => {
    if (btn) btn.addEventListener('click', toggleDarkMode);
  });
})();
