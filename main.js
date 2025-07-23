document.addEventListener("DOMContentLoaded", function () {
  // Toggle nav
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  // Load more cards
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const hiddenCards = document.querySelectorAll(".course-card.hidden");
  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      hiddenCards.forEach(card => {
        card.classList.remove("hidden");
      });
      loadMoreBtn.style.display = "none";
    });
  }

  // Scroll to top button
  const scrollBtn = document.querySelector('.scroll-to-top');
  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Accordion functionality
  const accHeaders = document.querySelectorAll('.accordion-header');
  if (accHeaders.length > 0) {
    accHeaders[0].classList.add('active');
    accHeaders[0].nextElementSibling.classList.add('open');
  }
  accHeaders.forEach(header => {
    header.addEventListener('click', function () {
      accHeaders.forEach(h => {
        if (h !== this) {
          h.classList.remove('active');
          h.nextElementSibling.classList.remove('open');
        }
      });
      this.classList.toggle('active');
      this.nextElementSibling.classList.toggle('open');
    });
  });

  // Tabs active highlight
  const tabs = document.querySelectorAll('.python-tabs-list .tab-link');
  tabs.forEach(tab => {
    if (window.location.pathname.endsWith(tab.getAttribute('href'))) {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
  });
});