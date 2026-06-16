/* Дрогобич у Революції гідності — мінімальний інтерактив */
(function () {
  "use strict";

  /* ---------- Мобільне меню ---------- */
  var toggle = document.querySelector(".nav__toggle");
  var list = document.querySelector(".nav__list");

  if (toggle && list) {
    toggle.addEventListener("click", function () {
      var open = list.classList.toggle("is-open");
      toggle.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
    });

    // Закрити меню після кліку по пункту
    list.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        list.classList.remove("is-open");
        toggle.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---------- Поява секцій при скролі ---------- */
  var revealTargets = document.querySelectorAll(
    ".section__inner, .hero__inner, .hero-card, .card, .timeline__item"
  );
  revealTargets.forEach(function (el) {
    el.classList.add("reveal");
  });

  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealTargets.forEach(function (el) {
      io.observe(el);
    });
  } else {
    revealTargets.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  /* ---------- Активний пункт меню при скролі ---------- */
  var navLinks = Array.prototype.slice.call(
    document.querySelectorAll(".nav__list a")
  );
  var sections = navLinks
    .map(function (link) {
      var id = link.getAttribute("href");
      return id && id.charAt(0) === "#" ? document.querySelector(id) : null;
    })
    .filter(Boolean);

  /* ---------- Кнопка «Нагору» ---------- */
  var toTopEls = document.querySelectorAll(".js-to-top");
  var floatBtn = document.querySelector(".to-top");

  function scrollToTop(e) {
    if (e) e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }
  toTopEls.forEach(function (el) {
    el.addEventListener("click", scrollToTop);
  });

  if (floatBtn) {
    var toggleFloat = function () {
      floatBtn.classList.toggle("is-visible", window.pageYOffset > 600);
    };
    toggleFloat();
    window.addEventListener("scroll", toggleFloat, { passive: true });
  }

  /* ---------- Лише одне відео одночасно ---------- */
  var videos = Array.prototype.slice.call(document.querySelectorAll(".video video"));
  videos.forEach(function (vid) {
    vid.addEventListener("play", function () {
      videos.forEach(function (other) {
        if (other !== vid) other.pause();
      });
    });
  });

  if ("IntersectionObserver" in window && sections.length) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          var id = "#" + entry.target.id;
          navLinks.forEach(function (link) {
            link.classList.toggle(
              "is-active",
              link.getAttribute("href") === id
            );
          });
        });
      },
      { threshold: 0.5, rootMargin: "-30% 0px -50% 0px" }
    );
    sections.forEach(function (sec) {
      spy.observe(sec);
    });
  }
})();
