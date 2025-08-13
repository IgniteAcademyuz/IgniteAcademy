// Ignite Academy — simple page transitions and section reveal
document.addEventListener("DOMContentLoaded", () => {
  // Reveal containers on scroll
  const containers = document.querySelectorAll(".container");
  const reveal = () => {
    containers.forEach(c => {
      const top = c.getBoundingClientRect().top;
      if (top < window.innerHeight - 60) c.classList.add("visible");
    });
  };
  window.addEventListener("scroll", reveal);
  reveal();

  // Active nav link based on current path
  const path = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("nav a").forEach(a => {
    const href = a.getAttribute("href");
    if ((path === "" && href === "index.html") || href === path) {
      a.classList.add("active");
    }
  });

  // Fade-out transition on internal navigation
  document.querySelectorAll('a[href$=".html"]').forEach(link => {
    const url = new URL(link.href, location.href);
    const isSameOrigin = url.origin === location.origin;
    if (!isSameOrigin) return;
    link.addEventListener("click", e => {
      // open in new tab should not be intercepted
      if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      document.body.classList.add("fade-out");
      setTimeout(() => { window.location.href = link.href; }, 200);
    });
  });
});