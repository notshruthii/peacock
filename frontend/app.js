document.addEventListener("DOMContentLoaded", () => {
  window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");

  if (window.scrollY > 50) {
    navbar.style.backgroundColor = "#6d0404"; // darker color on scroll
    navbar.style.padding = "10px 40px";       
    navbar.querySelectorAll("a").forEach(a => a.style.color = "#fbe5cd"); // link color
  } else {
    navbar.style.backgroundColor = "transparent"; // original
    navbar.style.padding = "20px 40px";
    navbar.querySelectorAll("a").forEach(a => a.style.color = "white"); // original link color
  }
});

  const carouselImages = document.querySelector('.carousel-images');
  const images = document.querySelectorAll('.carousel-images img');
  const texts = document.querySelectorAll('.hero-content');

  let index = 0;

  function showSlide(i) {
    index = i;
    if (index < 0) index = images.length - 1;
    if (index >= images.length) index = 0;

    carouselImages.style.transform = `translateX(${-index * 100}%)`;

    texts.forEach(t => t.classList.remove('active'));
    texts[index].classList.add('active');
  }

  setInterval(() => showSlide(index + 1), 4000);
  showSlide(0);

  // Like Button
  document.querySelectorAll(".like-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.id;
      if (!productId) return;

      const res = await fetch(`/products/${productId}/like`, { method: "POST" });
      const updated = await res.json();

      button.querySelector(".like-count").textContent = updated.likes;
    });
  });

  // Share Button
  document.querySelectorAll(".share-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.id;
      if (!productId) return;

      await fetch(`/products/${productId}/share`, { method: "POST" });

      if (navigator.share) {
        navigator.share({
          title: "Product",
          text: "Check out this product!",
          url: window.location.href
        }).catch(err => console.log("Share cancelled", err));
      } else {
        alert("Link copied!");
      }
    });
  });

  // Add to Cart Button
  document.querySelectorAll(".cart-btn").forEach(button => {
    button.addEventListener("click", async () => {
      const productId = button.dataset.id;
      if (!productId) return;

      const res = await fetch(`/products/${productId}/cart`, { method: "POST" });
      const updated = await res.json();

      alert(`Added to cart! Total count: ${updated.cartCount}`);
    });
  });
});
