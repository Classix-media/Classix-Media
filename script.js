const WHATSAPP_NUMBER = "2348121986430";

// Footer year
document.getElementById("year").textContent = new Date().getFullYear();

// Mobile nav toggle
const navToggle = document.getElementById("navToggle");
const navLinks = document.getElementById("navLinks");
navToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  navToggle.setAttribute("aria-expanded", isOpen);
});

// Nav links: smooth scroll to target section, then close mobile menu
document.querySelectorAll(".nav-link").forEach(link => {
  link.addEventListener("click", (e) => {
    const targetSel = link.getAttribute("data-target");
    const targetEl = document.querySelector(targetSel);
    if (targetEl) {
      e.preventDefault();
      targetEl.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    navLinks.classList.remove("open");
  });
});

// Scroll reveal animations
const revealEls = document.querySelectorAll(
  ".about-copy, .about-photo, .clarity-card, .clarity-side, .service-card, .elevate-card, .tools-laptop, .portfolio-panel, .contact-copy, .contact-form"
);
revealEls.forEach(el => el.classList.add("reveal"));

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("in-view");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

revealEls.forEach(el => observer.observe(el));

// Contact form -> builds a WhatsApp message from the fields
const form = document.getElementById("contactForm");
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value.trim();
  const lastName = document.getElementById("lastName").value.trim();
  const email = document.getElementById("email").value.trim();
  const service = document.getElementById("service").value;
  const message = document.getElementById("message").value.trim();

  const text =
`Hi Classix Media, I'd like to start a project.

Name: ${firstName} ${lastName}
Email: ${email}
Service: ${service}
Project details: ${message}`;

  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank");
});

