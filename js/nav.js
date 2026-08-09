/* ============================================================
   DJEDI CHURCH — Navigation Module
   Mobile hamburger, scroll effects, smooth scroll
   ============================================================ */

(function() {
  'use strict';

  /* ---- MOBILE HAMBURGER TOGGLE ---- */
  window.toggleMenu = function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.classList.toggle('hidden');
      // Prevent body scroll when menu is open
      document.body.style.overflow = mobileMenu.classList.contains('hidden') ? '' : 'hidden';
    }
  };

  /* ---- CLOSE MOBILE MENU ON LINK CLICK ---- */
  document.addEventListener('DOMContentLoaded', function() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(function(link) {
        link.addEventListener('click', function() {
          mobileMenu.classList.add('hidden');
          document.body.style.overflow = '';
        });
      });
    }
  });

  /* ---- NAVBAR SCROLL EFFECT ---- */
  window.addEventListener('scroll', function() {
    var nav = document.getElementById('navbar');
    if (nav) {
      if (window.scrollY > 100) {
        nav.style.background = 'rgba(13, 11, 26, 0.95)';
      } else {
        nav.style.background = '';
      }
    }
  });

  /* ---- SCROLL-BASED NAVIGATION HIGHLIGHTING ---- */
  window.addEventListener('scroll', function() {
    var sections = document.querySelectorAll('section[id]');
    var scrollPos = window.scrollY + 200;

    sections.forEach(function(section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');
      var link = document.querySelector('.nav-link[href="#' + id + '"]');

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          document.querySelectorAll('.nav-link').forEach(function(l) {
            l.classList.remove('active');
          });
          link.classList.add('active');
        }
      }
    });
  });

  /* ---- SMOOTH SCROLL FOR ANCHOR LINKS ---- */
  document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
    anchor.addEventListener('click', function(e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ---- FADE-IN INTERSECTION OBSERVER ---- */
  var observer = new IntersectionObserver(function(entries) {
    entries.forEach(function(entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  document.querySelectorAll('.fade-in').forEach(function(el) {
    observer.observe(el);
  });

})();
