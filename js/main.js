/* ------------------------------------------------------------
   GameVerse – main.js
   • Fade-in animation via IntersectionObserver
   • Active-link highlighting in nav
   • Optional “Back to Top” button (auto-inject)
------------------------------------------------------------- */

(() => {
  // ---------- Fade-in section animation --------------------
  const fadeObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target); // animate once
        }
      });
    },
    { threshold: 0.15 }
  );

  document
    .querySelectorAll("[data-fade]")
    .forEach((el) => fadeObserver.observe(el));

  // ---------- Smooth scroll / nav active state -------------
  const navLinks = Array.from(document.querySelectorAll("header nav a"));
  const sections = navLinks.map((link) =>
    document.querySelector(link.getAttribute("href"))
  );

  const setActive = (idx) => {
    navLinks.forEach((lnk, i) =>
      lnk.classList.toggle("active", i === idx)
    );
  };

  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const idx = sections.indexOf(entry.target);
          if (idx >= 0) setActive(idx);
        }
      });
    },
    { threshold: 0.3 }
  );

  sections.forEach((sec) => scrollObserver.observe(sec));

  // ---------- Back to Top button ---------------------------
  const backBtn = document.createElement("button");
  backBtn.innerHTML = "↑";
  backBtn.setAttribute("aria-label", "Back to top");
  Object.assign(backBtn.style, {
    position: "fixed",
    bottom: "24px",
    right: "24px",
    padding: "10px 14px",
    fontSize: "1.1rem",
    borderRadius: "50%",
    border: "1px solid var(--clr-accent)",
    background: "var(--bg-secondary)",
    color: "var(--clr-text)",
    cursor: "pointer",
    opacity: "0",
    transform: "translateY(20px)",
    transition: "opacity 0.3s var(--easing), transform 0.3s var(--easing)",
    zIndex: "90",
  });
  document.body.appendChild(backBtn);

  const toggleBackBtn = () => {
    const show = window.scrollY > 300;
    backBtn.style.opacity = show ? "1" : "0";
    backBtn.style.transform = show ? "translateY(0)" : "translateY(20px)";
  };
  window.addEventListener("scroll", toggleBackBtn);
  backBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  // Initial state
  toggleBackBtn();
})();
