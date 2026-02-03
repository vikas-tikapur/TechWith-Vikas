/* =========================
   PAGE LOADER
========================== */
window.addEventListener('load', function () {
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader) {
    pageLoader.classList.add('hidden');
    setTimeout(() => {
      pageLoader.style.display = 'none';
    }, 500);
  }
});

// Also hide loader if it takes too long (10 seconds max)
setTimeout(() => {
  const pageLoader = document.getElementById('page-loader');
  if (pageLoader && !pageLoader.classList.contains('hidden')) {
    pageLoader.classList.add('hidden');
  }
}, 10000);

document.addEventListener("DOMContentLoaded", function () {

  /* =========================
     AUTO-REVEAL IMPORTANT ELEMENTS
  ========================== */
  // Automatically add reveal-element to all important content elements
  // This applies to all pages (Python, Data Analytics, etc.)
  const importantSelectors = [
    'h2:not(.section-title)',  // All h2 except section titles
    'h3',
    '.python-intro section',
    '.Code-box',
    'table',
    'ul:not(.nav-links)',      // All lists except nav
    '.navigation-buttons',
    '.banner-overlay',
    '[id="with_banner"]'
  ];

  importantSelectors.forEach(selector => {
    document.querySelectorAll(selector).forEach(element => {
      if (!element.classList.contains('reveal-element')) {
        element.classList.add('reveal-element');
      }
    });
  });

  /* =========================
     MOBILE NAV TOGGLE
  ========================== */
  const toggleBtn = document.getElementById('menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (toggleBtn && navLinks) {
    toggleBtn.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }

  /* =========================
     BUTTON RIPPLE EFFECT
  ========================== */
  const rippleButtons = document.querySelectorAll('.btn, .course-btn, .nav-link, .pillars-animated-btn');

  rippleButtons.forEach(button => {
    button.classList.add('ripple-button');
    button.addEventListener('click', function (e) {
      const ripple = document.createElement('span');
      ripple.classList.add('ripple');

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      const x = e.clientX - rect.left - size / 2;
      const y = e.clientY - rect.top - size / 2;

      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = x + 'px';
      ripple.style.top = y + 'px';

      this.appendChild(ripple);

      setTimeout(() => ripple.remove(), 600);
    });
  });

  /* =========================
     PYTHON TABS SCROLL FIX
  ========================== */
  const tabsList = document.querySelector('.python-tabs-list');
  const activeTab = document.querySelector('.python-tabs-list .tab-link.active');

  if (tabsList && activeTab) {
    // Save scroll position before page unload
    window.addEventListener('beforeunload', () => {
      localStorage.setItem('pythonTabsScroll', tabsList.scrollLeft);
    });

    // Auto-scroll to active tab
    const scrollToActiveTab = () => {
      const activeLink = tabsList.querySelector('.tab-link.active');
      if (activeLink) {
        const tabsContainer = tabsList;
        const activeRect = activeLink.getBoundingClientRect();
        const containerRect = tabsContainer.getBoundingClientRect();

        // Check if active tab is visible
        if (activeRect.left < containerRect.left || activeRect.right > containerRect.right) {
          // Scroll to center the active tab
          const scrollAmount = activeLink.offsetLeft - (tabsContainer.offsetWidth / 2) + (activeLink.offsetWidth / 2);
          tabsContainer.scrollLeft = Math.max(0, scrollAmount);
        }
      }
    };

    // Restore previous scroll position or auto-scroll
    const savedScroll = localStorage.getItem('pythonTabsScroll');
    if (savedScroll) {
      tabsList.scrollLeft = parseInt(savedScroll);
      localStorage.removeItem('pythonTabsScroll');
    } else {
      scrollToActiveTab();
    }

    // Also scroll on tab click
    document.querySelectorAll('.python-tabs-list .tab-link').forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(scrollToActiveTab, 100);
      });
    });
  }

  /* =========================
     SCROLL REVEAL ANIMATIONS
  ========================== */
  const revealElements = document.querySelectorAll('.reveal-element, .reveal-card');
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        // Optional: stop observing after animation plays
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =========================
     HERO TYPING ANIMATION
  ========================== */
  const typingHeading = document.getElementById('typing-heading');
  if (typingHeading) {
    const textPart = typingHeading.querySelector('.text-part');
    const fullText = 'Welcome to <span class="highlight">TechWith Vikas</span>';
    let charIndex = 0;
    const typingSpeed = 80; // ms per character
    const delayBeforeStart = 300;

    const typeCharacter = () => {
      if (charIndex < fullText.length) {
        const char = fullText[charIndex];
        
        // Handle HTML tags
        if (char === '<') {
          const endTag = fullText.indexOf('>', charIndex);
          textPart.innerHTML += fullText.substring(charIndex, endTag + 1);
          charIndex = endTag + 1;
        } else {
          textPart.innerHTML += char;
          charIndex++;
        }
        
        setTimeout(typeCharacter, typingSpeed);
      } else {
        // Animation complete - remove cursor
        typingHeading.querySelector('.cursor').style.display = 'none';
      }
    };

    // Start typing after slight delay
    setTimeout(typeCharacter, delayBeforeStart);
  }

  /* =========================
     SMOOTH SCROLL FOR IN-PAGE LINKS
  ========================== */
  const pageLinks = document.querySelectorAll('a[href^="#"]');

  pageLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '') return; // ignore plain '#'
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        // update hash without jumping
        history.pushState(null, '', targetId);
      }
    });
  });

  /* =========================
     ACTIVE SECTION HIGHLIGHT (NAV)
  ========================== */
  const navLinksAll = document.querySelectorAll('.top-nav .nav-link');
  const sections = Array.from(document.querySelectorAll('section[id], footer[id]'));

  if (navLinksAll.length && sections.length) {
    const obsOptions = { root: null, rootMargin: '0px', threshold: [0.3, 0.6] };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const id = entry.target.getAttribute('id');
        const matchingLink = document.querySelector(`.top-nav .nav-link[href="#${id}"]`);
        if (entry.isIntersecting) {
          navLinksAll.forEach(l => l.classList.remove('active'));
          if (matchingLink) matchingLink.classList.add('active');
        }
      });
    }, obsOptions);

    sections.forEach(sec => observer.observe(sec));
  }

  /* =========================
     LOAD MORE COURSES
  ========================== */
  const loadMoreBtn = document.getElementById("loadMoreBtn");
  const hiddenCards = document.querySelectorAll(".course-card.hidden");

  if (loadMoreBtn) {
    loadMoreBtn.addEventListener("click", function () {
      hiddenCards.forEach(card => card.classList.remove("hidden"));
      loadMoreBtn.style.display = "none";
    });
  }

  /* =========================
     SCROLL TO TOP
  ========================== */
  const scrollBtn = document.querySelector('.scroll-to-top');

  if (scrollBtn) {
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  /* =========================
     ACCORDION
  ========================== */
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

  /* =========================
     ACTIVE TAB HIGHLIGHT
  ========================== */
  const tabs = document.querySelectorAll('.python-tabs-list .tab-link');

  tabs.forEach(tab => {
    if (window.location.pathname.endsWith(tab.getAttribute('href'))) {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
    }
  });

  /* =========================
     AI PARTICLES BACKGROUND
  ========================== */
  if (typeof particlesJS !== "undefined") {

    const isMobile = window.innerWidth < 768;

    particlesJS("particles-js", {
      particles: {
        number: {
          value: isMobile ? 40 : 80,
          density: {
            enable: true,
            value_area: 900
          }
        },
        color: {
          value: "#ff8c00" // Logo Orange
        },
        shape: {
          type: "circle"
        },
        opacity: {
          value: 0.5,
          random: true
        },
        size: {
          value: 3,
          random: true
        },
        line_linked: {
          enable: true,
          distance: 150,
          color: "#ffffff",
          opacity: 0.2,
          width: 1
        },
        move: {
          enable: true,
          speed: 2
        }
      },
      interactivity: {
        events: {
          onhover: {
            enable: !isMobile,
            mode: "repulse"
          }
        }
      },
      retina_detect: true
    });

  }

});
