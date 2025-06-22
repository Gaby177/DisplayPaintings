document.addEventListener('DOMContentLoaded', function() {
    var backIcon = document.getElementById('back-to-index');
    if (backIcon) {
        backIcon.addEventListener('click', function() {
            window.location.href = 'Index.html';
        });
    }

    var painting = document.querySelector('.painting');
    var modal = document.getElementById('image-modal');
    var modalImg = document.getElementById('modal-img');

    if (painting && modal && modalImg) {
        painting.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                modalImg.src = painting.src;
                modal.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        });
        modal.addEventListener('click', function() {
            modal.classList.remove('active');
            document.body.style.overflow = '';
        });
    }
});




const palette = document.getElementById('palette');
const painting = document.getElementById('painting');
const title = document.getElementById('title');
const subtitle = document.getElementById('subtitle');
const description = document.getElementById('description');

// Add initial animation
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
{ color: 'green', img: 'img/3.jpg', title: 'Titlu 3', subtitle: '<span style="color: #333;">Nr. 3</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
{ color: 'yellow', img: 'img/4.jpg', title: 'Titlu 4', subtitle: '<span style="color: #333;">Nr. 4</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
{ color: 'orange', img: 'img/5.jpg', title: 'Titlu 5', subtitle: '<span style="color: #333;">Nr. 5</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
{ color: 'grey', img: 'img/6.jpg', title: 'Titlu 6', subtitle: '<span style="color: #333;">Nr. 6</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
{ color: 'purple', img: 'img/8.png', title: 'Titlu 7', subtitle: '<span style="color: #333;">Nr. 7</span> __ 8', desc: 'Descriere pentru al doilea tablou.' },
{ color: 'white', img: 'img/7.jpg', title: 'Titlu 8', subtitle: '<span style="color: #333;">Nr. 8</span> __ 8', desc: 'Descriere pentru al doilea tablou.' }
];

let currentIndex = -1; // Set to -1 to indicate no active thumbnail
const buttons = [];
const preloadedImages = [];

// Create buttons
artworks.forEach((art, index) => {
  const btn = document.createElement('button');
  btn.className = 'color-button';
  btn.dataset.index = index;
  
  const thumbnail = document.createElement('img');
  thumbnail.src = art.img;
  thumbnail.alt = `Thumbnail ${index + 1}`;
  thumbnail.style.width = '100%';
  thumbnail.style.height = '100%';
  thumbnail.style.objectFit = 'cover';
  thumbnail.style.borderRadius = '50%';
  
  btn.appendChild(thumbnail);
  
  btn.addEventListener('click', () => {
    const originalIndex = parseInt(btn.dataset.index);
    selectArtwork(originalIndex);
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
    
    preloadedImages[index] = {
      width: width,
      height: height,
      aspectRatio: aspectRatio
    };
  };
});

// Infinite scroll functionality
let isScrolling = false;
let scrollTimeout;

function updateActiveButton() {
  buttons.forEach(btn => btn.classList.remove('active-button'));
  if (currentIndex >= 0) {
    const activeBtn = buttons.find(btn => parseInt(btn.dataset.index) === currentIndex);
    if (activeBtn) {
      activeBtn.classList.add('active-button');
    }
  }
}

palette.addEventListener('scroll', () => {
  if (isScrolling) return;
  
  isScrolling = true;
  clearTimeout(scrollTimeout);
  
  const scrollTop = palette.scrollTop;
  const scrollHeight = palette.scrollHeight;
  const clientHeight = palette.clientHeight;
  
  // Calculate the height of one button with margin
  const buttonHeight = 106; // 90px height + 8px margin top + 8px margin bottom
  
  if (scrollTop <= 0) {
    // Scrolled to top, move last elements to top
    const elementsToMove = Math.ceil(Math.abs(scrollTop) / buttonHeight);
    for (let i = 0; i < elementsToMove; i++) {
      const lastButton = buttons[buttons.length - 1];
      palette.insertBefore(lastButton, palette.firstChild);
      buttons.unshift(buttons.pop());
    }
    palette.scrollTop = elementsToMove * buttonHeight;
    updateActiveButton();
  } else if (scrollTop + clientHeight >= scrollHeight - 10) {
    // Scrolled to bottom, move first elements to bottom
    const elementsToMove = Math.ceil((scrollTop + clientHeight - scrollHeight) / buttonHeight);
    for (let i = 0; i < elementsToMove; i++) {
      const firstButton = buttons[0];
      palette.appendChild(firstButton);
      buttons.push(buttons.shift());
    }
    palette.scrollTop = scrollTop - (elementsToMove * buttonHeight);
    updateActiveButton();
  }
  
  scrollTimeout = setTimeout(() => {
    isScrolling = false;
  }, 100);
});

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



   // FAQ Accordion
   document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        const isActive = faqItem.classList.contains('active');
        
        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
        });
        
        // If the clicked item wasn't active, make it active
        if (!isActive) {
            faqItem.classList.add('active');
        }
    });
});


