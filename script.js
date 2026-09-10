(function () {
  "use strict";

  /* ─────────────────────────────────────────────────────────────
     SCROLL REVEAL
  ───────────────────────────────────────────────────────────── */
  function initReveal() {
    var elements = document.querySelectorAll(".reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }

    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: "0px 0px -60px 0px",
      threshold: 0.1
    });

    elements.forEach(function (el) { observer.observe(el); });
  }

  /* ─────────────────────────────────────────────────────────────
     NAVIGATION — active chapter + dark mode
  ───────────────────────────────────────────────────────────── */
  function initNav() {
    var nav = document.getElementById("nav");
    var links = document.querySelectorAll(".nav__link");
    var sections = document.querySelectorAll("section[id]");
    var toggle = document.getElementById("navToggle");
    var navLinks = document.getElementById("navLinks");

    var sectionObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;

        var id = entry.target.id;
        var chapter = id.replace("chapter-", "").replace(/^0/, "");

        links.forEach(function (link) {
          link.classList.toggle("is-active", link.getAttribute("data-chapter") === chapter);
        });

        var isDark = entry.target.classList.contains("engagement") ||
                     entry.target.classList.contains("final") ||
                     entry.target.classList.contains("hero");

        nav.classList.toggle("nav--dark", isDark);
      });
    }, {
      rootMargin: "-40% 0px -55% 0px",
      threshold: 0
    });

    sections.forEach(function (s) { sectionObserver.observe(s); });

    if (toggle && navLinks) {
      toggle.addEventListener("click", function () {
        var isOpen = navLinks.classList.toggle("is-open");
        toggle.classList.toggle("is-open", isOpen);
        toggle.setAttribute("aria-expanded", isOpen);
        document.body.style.overflow = isOpen ? "hidden" : "";
      });

      navLinks.querySelectorAll("a").forEach(function (link) {
        link.addEventListener("click", function () {
          navLinks.classList.remove("is-open");
          toggle.classList.remove("is-open");
          toggle.setAttribute("aria-expanded", "false");
          document.body.style.overflow = "";
        });
      });
    }
  }

  /* ─────────────────────────────────────────────────────────────
     SMOOTH SCROLL
  ───────────────────────────────────────────────────────────── */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener("click", function (e) {
        var targetId = this.getAttribute("href");
        if (targetId === "#") return;

        var target = document.querySelector(targetId);
        if (!target) return;

        e.preventDefault();
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
  }

  /* ─────────────────────────────────────────────────────────────
     INIT
  ───────────────────────────────────────────────────────────── */
  function init() {
    initReveal();
    initNav();
    initSmoothScroll();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }

})();
