/* ==========================================================================
   ProGleam — Version 2 interactions (vanilla JS, no dependencies)
   ========================================================================== */
(function () {
  "use strict";

  /* ---- Cookie consent (Google Consent Mode v2) ---- */
  (function () {
    var KEY = "pg-consent";
    var choice = null;
    try { choice = localStorage.getItem(KEY); } catch (e) {}
    function grant() {
      if (window.gtag) {
        gtag("consent", "update", {
          ad_storage: "granted", ad_user_data: "granted",
          ad_personalization: "granted", analytics_storage: "granted"
        });
      }
    }
    if (choice === "granted") { grant(); return; }
    if (choice === "denied") { return; }
    function showBar() {
      if (!document.body) { return; }
      var bar = document.createElement("div");
      bar.className = "cookie-bar";
      bar.setAttribute("role", "dialog");
      bar.setAttribute("aria-label", "Cookie consent");
      bar.innerHTML =
        '<p class="cookie-text">We use cookies to measure site traffic and improve your experience. ' +
        'See our <a href="/cookie-policy/">Cookie Policy</a>.</p>' +
        '<div class="cookie-actions">' +
        '<button type="button" class="btn btn--ghost btn--sm" data-cc="decline">Decline</button>' +
        '<button type="button" class="btn btn--primary btn--sm" data-cc="accept">Accept</button>' +
        '</div>';
      bar.addEventListener("click", function (e) {
        var t = e.target && e.target.closest ? e.target.closest("[data-cc]") : null;
        if (!t) { return; }
        var v = t.getAttribute("data-cc") === "accept" ? "granted" : "denied";
        try { localStorage.setItem(KEY, v); } catch (e2) {}
        if (v === "granted") { grant(); }
        if (bar.parentNode) { bar.parentNode.removeChild(bar); }
      });
      document.body.appendChild(bar);
    }
    if (document.readyState === "loading") {
      document.addEventListener("DOMContentLoaded", showBar);
    } else { showBar(); }
  })();

  /* ---- Mobile nav ---- */
  var nav = document.querySelector(".nav");
  var toggle = document.querySelector(".nav-toggle");
  if (nav && toggle) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    nav.querySelectorAll(".nav-links a").forEach(function (a) {
      a.addEventListener("click", function () {
        nav.classList.remove("open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* ---- FAQ accordion ---- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var item = btn.closest(".faq-item");
      var ans = item.querySelector(".faq-a");
      var open = item.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
      ans.style.maxHeight = open ? ans.scrollHeight + "px" : null;
    });
  });

  /* ---- Before / After sliders ---- */
  document.querySelectorAll("[data-ba-slider]").forEach(function (slider) {
    var range = slider.querySelector(".ba-range");
    var top = slider.querySelector(".ba-top");
    var handle = slider.querySelector(".ba-handle");
    function set(v) {
      top.style.clipPath = "inset(0 " + (100 - v) + "% 0 0)";
      handle.style.left = v + "%";
    }
    if (range && top && handle) {
      range.addEventListener("input", function (e) { set(+e.target.value); });
      set(+range.value || 50);
    }
  });

  /* ---- Reveal on scroll ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); obs.unobserve(en.target); }
      });
    }, { threshold: 0.1 });
    revealEls.forEach(function (el) { obs.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Quote forms (submitted via Web3Forms) ---- */
  document.querySelectorAll("form[data-quote-form]").forEach(function (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (form.dataset.sending === "1") { return; } /* prevent double submission */
      if (!form.checkValidity()) { form.reportValidity(); return; }
      var ok = form.querySelector(".form-success");
      var btn = form.querySelector('[type="submit"]');
      var payload = JSON.stringify(Object.fromEntries(new FormData(form)));
      if (btn) { btn.disabled = true; }
      form.dataset.sending = "1";
      fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Accept": "application/json" },
        body: payload
      }).then(function (r) { return r.json(); }).then(function (res) {
        if (res && res.success) {
          if (window.gtag) {
            gtag("event", "generate_lead", {
              form_source: ((form.querySelector("[name=source]") || {}).value) || "website"
            });
          }
          if (ok) {
            ok.style.display = "block";
            ok.scrollIntoView({ behavior: "smooth", block: "center" });
            if (typeof ok.focus === "function") { ok.focus(); } /* announce to screen readers */
          }
          form.reset();
        } else {
          alert("Sorry, your message could not be sent. Please call us on 07863 017292.");
        }
        if (btn) { btn.disabled = false; }
        form.dataset.sending = "";
      }).catch(function () {
        alert("Sorry, your message could not be sent. Please call us on 07863 017292.");
        if (btn) { btn.disabled = false; }
        form.dataset.sending = "";
      });
    });
  });

  /* ---- Lead interaction events (WhatsApp / phone clicks) ---- */
  document.addEventListener("click", function (e) {
    var a = e.target && e.target.closest ? e.target.closest("a") : null;
    if (!a || !window.gtag) { return; }
    var href = a.getAttribute("href") || "";
    if (/wa\.me|api\.whatsapp\.com|whatsapp:/i.test(href)) {
      gtag("event", "contact", { method: "whatsapp" });
    } else if (/^tel:/i.test(href)) {
      gtag("event", "contact", { method: "phone" });
    }
  });

  /* ---- Footer year ---- */
  var y = document.getElementById("year");
  if (y) { y.textContent = new Date().getFullYear(); }
})();
