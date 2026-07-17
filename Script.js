/* =============================================================
   FLY POINT — Interactions
   - Mobile hamburger menu
   - Sticky header shadow on scroll
   - Active nav link highlighting (scroll spy)
   - Reveal-on-scroll animations
   - Trip search demo message
   - Auto footer year
   - Lucide icon rendering
   ============================================================= */
(function () {
  "use strict";

  /* ---------- Render Lucide icons ---------- */
  function renderIcons() {
    if (window.lucide && typeof window.lucide.createIcons === "function") {
      window.lucide.createIcons();
    }
  }
  // Lucide script is deferred; render once it (and the DOM) are ready.
  if (document.readyState !== "loading") {
    renderIcons();
  } else {
    document.addEventListener("DOMContentLoaded", renderIcons);
  }
  window.addEventListener("load", renderIcons);

  /* ---------- Mobile hamburger menu ---------- */
  var toggle = document.getElementById("navToggle");
  var menu = document.getElementById("navMenu");

  function closeMenu() {
    if (!menu || !toggle) return;
    menu.classList.remove("is-open");
    toggle.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open menu");
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var isOpen = menu.classList.toggle("is-open");
      toggle.classList.toggle("is-open", isOpen);
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.setAttribute("aria-label", isOpen ? "Close menu" : "Open menu");
    });

    // Close the menu after clicking any nav link (mobile)
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) closeMenu();
    });

    // Close on Escape
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") closeMenu();
    });

    // Close when resizing back up to desktop
    window.addEventListener("resize", function () {
      if (window.innerWidth > 820) closeMenu();
    });
  }

  /* ---------- Sticky header shadow ---------- */
  var header = document.querySelector(".site-header");
  function onScrollHeader() {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 8);
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* ---------- Reveal-on-scroll (IntersectionObserver) ---------- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  } else {
    // Fallback: show everything
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  }

  /* ---------- Scroll spy: highlight active nav link ---------- */
  var sections = document.querySelectorAll("main section[id]");
  var navLinks = document.querySelectorAll(".nav__link");

  function setActiveLink(id) {
    navLinks.forEach(function (link) {
      var href = link.getAttribute("href");
      link.classList.toggle("is-active", href === "#" + id);
    });
  }

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) setActiveLink(entry.target.id);
      });
    }, { threshold: 0.5, rootMargin: "-40% 0px -50% 0px" });

    sections.forEach(function (sec) { spy.observe(sec); });
  }

  /* ---------- Trip search demo interaction ---------- */
  var searchForm = document.getElementById("searchForm");
  var searchMsg = document.getElementById("searchMsg");

  if (searchForm && searchMsg) {
    searchForm.addEventListener("submit", function (e) {
      e.preventDefault(); // demo only — no real search
      searchMsg.hidden = false;
      renderIcons(); // ensure the sparkles icon inside the message renders
      // Bring the message into view smoothly
      searchMsg.scrollIntoView({ behavior: "smooth", block: "center" });
    });
  }

  /* ---------- Auto-update footer year ---------- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
