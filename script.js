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

    // FAQ Accordion functionality
    document.querySelectorAll('.faq-question').forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const isActive = faqItem.classList.contains('active');
            
            // Close all other FAQ items
            document.querySelectorAll('.faq-item').forEach(item => {
                if (item !== faqItem) {
                    item.classList.remove('active');
                }
            });
            
            // Toggle the clicked item
            if (faqItem) {
                faqItem.classList.toggle('active');
            }
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
});
