const hour = new Date().getHours();
let greet = "Hello!";
if (hour < 12) greet = "Good Morning 🌞";
else if (hour < 18) greet = "Good Afternoon ☕";
else greet = "Good Evening 🌙";
document.getElementById("greeting").textContent = greet;

let lastScrollTop = 0;
window.onscroll = () => {
  let scrollTop = document.documentElement.scrollTop;
  let height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  document.getElementById("progressBar").style.width = (scrollTop / height) * 100 + "%";
  document.getElementById("scrollTop").style.display = scrollTop > 300 ? "block" : "none";

  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll(".nav-link");
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    if (scrollTop >= sectionTop - 60) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href").slice(1) === current) {
      link.classList.add("active");
    }
  });

  // Scroll animation
  const scrollDelta = scrollTop - lastScrollTop;
  if (Math.abs(scrollDelta) > 10) {
    const particleCount = Math.floor(Math.abs(scrollDelta) / 20);
    for (let i = 0; i < particleCount; i++) {
      const size = Math.random() * 15 + 5;
      const particle = document.createElement("div");
      particle.classList.add("scroll-particle");
      particle.style.width = size + "px";
      particle.style.height = size + "px";
      const x = Math.random() * window.innerWidth;
      const y = scrollTop + Math.random() * window.innerHeight;
      particle.style.left = x + "px";
      particle.style.top = y + "px";
      document.getElementById("mouseTrail").appendChild(particle);
      particles.push(particle);

      if (particles.length > 50) {
        const toRemove = particles.shift();
        if (toRemove) toRemove.remove();
      }
    }
  }
  lastScrollTop = scrollTop;
};

document.getElementById("scrollTop").addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

function openModal(projectId) {
  const content = {
    project1: `
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Personal Website</h2>
      <p class="text-gray-600 dark:text-white">A responsive portfolio with dark mode, scroll-triggered animations, and a dynamic typing effect for an engaging user experience.</p>
      <img src="https://via.placeholder.com/300x150" alt="Project 1" class="mt-4 rounded-lg">
      <a href="https://example.com/personal-website" target="_blank" class="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block">View Live</a>
    `,
    project2: `
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">Hotel Booking UI</h2>
      <p class="text-gray-600 dark:text-white">A modern hotel reservation interface with interactive cards, search filters, and a fully responsive mobile layout.</p>
      <img src="https://via.placeholder.com/300x150" alt="Project 2" class="mt-4 rounded-lg">
      <a href="https://example.com/hotel-booking" target="_blank" class="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block">View Live</a>
    `,
    project3: `
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-4">E-Commerce Dashboard</h2>
      <p class="text-gray-600 dark:text-white">An interactive admin panel with data visualization, user management, and responsive design for e-commerce platforms.</p>
      <img src="https://via.placeholder.com/300x150" alt="Project 3" class="mt-4 rounded-lg">
      <a href="https://example.com/ecommerce-dashboard" target="_blank" class="text-blue-500 dark:text-blue-400 hover:underline mt-4 inline-block">View Live</a>
    `
  };
  document.getElementById("modalBody").innerHTML = content[projectId] || "No content available.";
  document.getElementById("modal").style.display = "flex";
}

document.getElementById("closeModal").addEventListener("click", () => {
  document.getElementById("modal").style.display = "none";
});

const toggle = document.getElementById("themeToggle");
const body = document.body;
function setTheme(isDark) {
  if (isDark) {
    body.classList.add("dark");
    toggle.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    toggle.textContent = "🌙";
  }
  localStorage.setItem("theme", isDark ? "dark" : "light");
  updateParticleColors(isDark);
}

toggle.addEventListener("click", () => {
  const isDark = !body.classList.contains("dark");
  setTheme(isDark);
});

function updateParticleColors(isDark) {
  particlesJS("particles-js", {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: isDark ? "#60a5fa" : "#1e3a8a" },
      shape: { type: "circle" },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: isDark ? "#60a5fa" : "#1e3a8a", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: "none", random: false, straight: false, out_mode: "out" }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" }, resize: true },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}

window.onload = () => {
  const theme = localStorage.getItem("theme") || "light";
  setTheme(theme === "dark");
  VanillaTilt.init(document.querySelectorAll(".tilt-card"), {
    max: 15,
    speed: 400,
    glare: true,
    "max-glare": 0.3
  });
};

const funFacts = [
  "I built my first website at 13!",
  "I’m obsessed with pixel-perfect designs.",
  "Dark mode is my creative haven.",
  "I’ve designed logos for 10+ local brands!",
  "I love experimenting with WebGL animations."
];
document.getElementById("funFact").addEventListener("click", () => {
  const fact = funFacts[Math.floor(Math.random() * funFacts.length)];
  alert("💡 Fun Fact: " + fact);
});

// Mouse Trail, Click, Scroll, and Form Submission
const mouseTrail = document.getElementById("mouseTrail");
let particles = [];

document.addEventListener("mousemove", (e) => {
  const size = Math.random() * 15 + 5;
  const particle = document.createElement("div");
  particle.classList.add("trail-particle");
  particle.style.width = size + "px";
  particle.style.height = size + "px";
  particle.style.left = e.pageX - size / 2 + "px";
  particle.style.top = e.pageY - size / 2 + "px";
  mouseTrail.appendChild(particle);
  particles.push(particle);

  if (particles.length > 50) {
    const toRemove = particles.shift();
    if (toRemove) toRemove.remove();
  }
});

document.addEventListener("click", (e) => {
  for (let i = 0; i < 15; i++) {
    const size = Math.random() * 20 + 10;
    const angle = (i / 15) * 2 * Math.PI;
    const distance = Math.random() * 50 + 20;
    const particle = document.createElement("div");
    particle.classList.add("click-particle");
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.left = e.pageX - size / 2 + Math.cos(angle) * distance + "px";
    particle.style.top = e.pageY - size / 2 + Math.sin(angle) * distance + "px";
    mouseTrail.appendChild(particle);
    particles.push(particle);

    setTimeout(() => particle.remove(), 800);
  }
});

document.getElementById("contactForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);

  try {
    const response = await fetch(form.action, {
      method: "POST",
      body: formData,
      headers: {
        Accept: "application/json"
      }
    });

    if (response.ok) {
      alert("Thank you for your message! It has been sent to adrianrusellr.tajan@gmail.com. I'll get back to you soon.");
      form.reset();
    } else {
      alert("There was an issue sending your message. Please try again later.");
    }
  } catch (error) {
    alert("An error occurred. Please try again later.");
  }
});

setInterval(() => {
  particles.forEach(particle => {
    if (particle) {
      let opacity = parseFloat(particle.style.opacity) || 1;
      opacity -= 0.02;
      particle.style.opacity = opacity < 0 ? 0 : opacity;
      if (opacity <= 0) particle.remove();
    }
  });
  particles = particles.filter(p => document.body.contains(p));
}, 50);