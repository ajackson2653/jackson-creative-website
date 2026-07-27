/* Jackson Creative — shared interactions */
(function () {
  "use strict";

  /* ---- Mobile nav toggle ---- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      var open = links.classList.toggle("open");
      toggle.classList.toggle("open", open);
      document.body.classList.toggle("menu-open", open);
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
    links.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () {
        links.classList.remove("open");
        toggle.classList.remove("open");
        document.body.classList.remove("menu-open");
      });
    });
  }

  /* ---- Header state on scroll ---- */
  var header = document.querySelector(".site-header");
  function onScroll() {
    if (!header) return;
    if (window.scrollY > 24) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---- Scroll reveal ---- */
  var reveal = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && reveal.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("in"); io.unobserve(e.target); }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveal.forEach(function (el) { io.observe(el); });
  } else {
    reveal.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- Contact form (graceful, no-backend friendly) ---- */
  var form = document.querySelector("#contact-form");
  if (form) {
    var status = form.querySelector(".form-status");
    form.addEventListener("submit", function (ev) {
      var endpoint = form.getAttribute("action") || "";
      // If no real endpoint is configured yet, fall back to a mailto so nothing is lost.
      if (endpoint.indexOf("REPLACE_WITH") !== -1 || endpoint === "" || endpoint === "#") {
        ev.preventDefault();
        var name = (form.querySelector("[name=name]") || {}).value || "";
        var email = (form.querySelector("[name=email]") || {}).value || "";
        var svc = (form.querySelector("[name=service]") || {}).value || "";
        var msg = (form.querySelector("[name=message]") || {}).value || "";
        var to = form.getAttribute("data-mailto") || "info@thejacksoncreative.com";
        var subject = encodeURIComponent("New project inquiry — " + (svc || "Jackson"));
        var body = encodeURIComponent(
          "Name: " + name + "\nEmail: " + email + "\nService: " + svc + "\n\n" + msg
        );
        window.location.href =
          "mailto:" + to + "?subject=" + subject + "&body=" + body;
        if (status) { status.className = "form-status ok"; status.textContent = "Opening your email app to send… If nothing happens, email us at " + to + "."; }
        return;
      }
      // Real endpoint configured: submit via fetch for inline success message.
      ev.preventDefault();
      var data = new FormData(form);
      fetch(endpoint, { method: "POST", body: data, headers: { Accept: "application/json" } })
        .then(function (r) {
          if (r.ok) {
            form.reset();
            if (status) { status.className = "form-status ok"; status.textContent = "Thanks — your message is on its way. We'll be in touch shortly."; }
          } else { throw new Error("bad response"); }
        })
        .catch(function () {
          if (status) { status.className = "form-status err"; status.textContent = "Something went wrong. Please email us directly at info@thejacksoncreative.com."; }
        });
    });
  }

  /* ---- Footer year ---- */
  var yr = document.querySelector("#year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
