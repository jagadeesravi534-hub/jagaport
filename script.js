const revealItems = document.querySelectorAll(".reveal");
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll("section");
const modal = document.getElementById("cert-modal");
const heroVisual = document.querySelector(".hero-visual");
const modalTitle = document.getElementById("modal-title");
const modalDesc = document.getElementById("modal-desc");
const modalLink = document.getElementById("modal-link");
const closeButton = document.querySelector(".modal-close");

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 },
);

revealItems.forEach((item) => revealObserver.observe(item));

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        navLinks.forEach((link) => {
          const targetId = link.getAttribute("href")?.slice(1);
          link.classList.toggle("active", targetId === entry.target.id);
        });
      }
    });
  },
  { threshold: 0.55 },
);

sections.forEach((section) => sectionObserver.observe(section));

document.querySelectorAll(".cert-btn").forEach((button) => {
  button.addEventListener("click", () => {
    modalTitle.textContent = button.dataset.title || "Certificate";
    modalDesc.textContent =
      button.dataset.desc || "Certificate details will appear here.";
    modalLink.href = button.dataset.link || "#";
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
  });
});

if (heroVisual) {
  heroVisual.addEventListener("pointermove", (event) => {
    const rect = heroVisual.getBoundingClientRect();
    const x = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const y = ((event.clientY - rect.top) / rect.height - 0.5) * 10;
    heroVisual.style.transform = `perspective(1000px) rotateY(${x}deg) rotateX(${-y}deg) translateY(-4px)`;
  });

  heroVisual.addEventListener("pointerleave", () => {
    heroVisual.style.transform =
      "perspective(1000px) rotateY(0deg) rotateX(0deg) translateY(0)";
  });
}

const closeModal = () => {
  modal.classList.remove("active");
  modal.setAttribute("aria-hidden", "true");
};

closeButton?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  if (event.target === modal) {
    closeModal();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeModal();
  }
});
