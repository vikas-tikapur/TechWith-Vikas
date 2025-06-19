const toggleBtn = document.getElementById('menu-toggle');
const navLinks = document.querySelector('.nav-links');

if (toggleBtn && navLinks) {
  toggleBtn.addEventListener('click', () => {
    navLinks.classList.toggle('active');
  });
}

document.addEventListener("DOMContentLoaded", function () {
    const loadMoreBtn = document.getElementById("loadMoreBtn");
    const hiddenCards = document.querySelectorAll(".course-card.hidden");

    loadMoreBtn.addEventListener("click", function () {
      hiddenCards.forEach(card => {
        card.classList.remove("hidden");
      });
      loadMoreBtn.style.display = "none";
    });
  });

  