const carouselImages = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
const texts = document.querySelectorAll('.hero-content');

let index = 0;

function showSlide(i) {
  index = i;
  if (index < 0) index = images.length - 1;
  if (index >= images.length) index = 0;

  // Move images
  carouselImages.style.transform = `translateX(${-index * 100}%)`;

  // Update text
  texts.forEach(t => t.classList.remove('active'));
  texts[index].classList.add('active');
}

// Auto slide every 4s
setInterval(() => {
  showSlide(index + 1);
}, 4000);

// Initialize
showSlide(0);
