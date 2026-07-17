"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const menuToggle = document.querySelector(".menu-toggle");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id], header[id]");
  const tripSearch = document.querySelector("#trip-search");
  const searchModal = document.querySelector("#search-modal");
  const modalClose = document.querySelector(".modal-close");
  const modalWhatsApp = document.querySelector("#modal-whatsapp");
  const currentYear = document.querySelector("#current-year");

  const closeMenu = () => {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.remove("open");
    navMenu.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    document.body.classList.remove("menu-open");
  };

  const openMenu = () => {
    if (!menuToggle || !navMenu) return;
    menuToggle.classList.add("open");
    navMenu.classList.add("open");
    menuToggle.setAttribute("aria-expanded", "true");
    menuToggle.setAttribute("aria-label", "Close navigation menu");
    document.body.classList.add("menu-open");
  };

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      isOpen ? closeMenu() : openMenu();
    });

    navLinks.forEach((link) => link.addEventListener("click", closeMenu));

    document.addEventListener("click", (event) => {
      if (
        navMenu.classList.contains("open") &&
        !navMenu.contains(event.target) &&
        !menuToggle.contains(event.target)
      ) {
        closeMenu();
      }
    });
  }

  const updateHeader = () => {
    if (!header) return;
    header.classList.toggle("scrolled", window.scrollY > 35);
  };

  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  const updateActiveNavigation = () => {
    let currentSection = "home";

    sections.forEach((section) => {
      const top = section.offsetTop - 150;
      if (window.scrollY >= top) currentSection = section.id;
    });

    navLinks.forEach((link) => {
      link.classList.toggle(
        "active",
        link.getAttribute("href") === `#${currentSection}`
      );
    });
  };

  updateActiveNavigation();
  window.addEventListener("scroll", updateActiveNavigation, { passive: true });

  const openModal = () => {
    if (!searchModal) return;
    searchModal.hidden = false;
    document.body.classList.add("modal-open");
    modalClose?.focus();
  };

  const closeModal = () => {
    if (!searchModal) return;
    searchModal.hidden = true;
    document.body.classList.remove("modal-open");
  };

  if (tripSearch) {
    tripSearch.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(tripSearch);
      const from = String(formData.get("from") || "").trim();
      const to = String(formData.get("to") || "").trim();
      const departure = String(formData.get("departure") || "").trim();
      const travellers = String(formData.get("travellers") || "1 Traveller");

      const message = [
        "Hello Fly Point, I would like to search for a flight.",
        "",
        `From: ${from}`,
        `To: ${to}`,
        `Departure: ${departure}`,
        `Travellers: ${travellers}`,
        "",
        "Please send me suitable flight options."
      ].join("\n");

      if (modalWhatsApp) {
        modalWhatsApp.href = `https://wa.me/971521968611?text=${encodeURIComponent(message)}`;
      }

      openModal();
    });
  }

  modalClose?.addEventListener("click", closeModal);

  searchModal?.addEventListener("click", (event) => {
    if (event.target === searchModal) closeModal();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    if (searchModal && !searchModal.hidden) closeModal();
    closeMenu();
  });

  if (currentYear) currentYear.textContent = new Date().getFullYear();

  const revealElements = document.querySelectorAll(
    ".service-card, .destination-card, .benefit-list li, .process-grid article, .testimonial-grid article, .about-images, .about-content"
  );

  revealElements.forEach((element) => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -30px" }
    );

    revealElements.forEach((element) => revealObserver.observe(element));
  } else {
    revealElements.forEach((element) => element.classList.add("visible"));
  }

  window.addEventListener("resize", () => {
    if (window.innerWidth > 820) closeMenu();
  });
});
