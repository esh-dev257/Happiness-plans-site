// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Add to script.js
// Hero section image slideshow
function startHeroSlideshow() {
  const images = document.querySelectorAll(".hero-image");
  let currentIndex = 0;

  if (!images.length) return;

  // Show the first image immediately
  images.forEach((img, i) => (img.style.opacity = i === 0 ? "1" : "0"));

  // Wait 2 seconds, then start the slideshow interval
  setTimeout(() => {
    setInterval(() => {
      images[currentIndex].style.opacity = "0";
      currentIndex = (currentIndex + 1) % images.length;
      images[currentIndex].style.opacity = "1";
    }, 2000);
  }, 2000);
}

// Alternative version with more control and smoother transitions
function startHeroSlideshowAdvanced() {
  const images = document.querySelectorAll(".hero-image");
  let currentIndex = 0;
  let isTransitioning = false;

  if (!images.length) return;

  // Initialize images
  images.forEach((img, i) => {
    img.style.transition = "opacity 1.5s cubic-bezier(0.4, 0, 0.2, 1)";
    img.style.position = "absolute";
    img.style.top = "0";
    img.style.left = "0";
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.objectFit = "cover";
    img.style.opacity = i === 0 ? "1" : "0";
    img.style.zIndex = i === 0 ? "2" : "1";
  });

  function transitionToNext() {
    if (isTransitioning) return;

    isTransitioning = true;
    const currentImg = images[currentIndex];
    const nextIndex = (currentIndex + 1) % images.length;
    const nextImg = images[nextIndex];

    // Prepare next image
    nextImg.style.zIndex = "2";
    nextImg.style.opacity = "1";

    // Fade out current image
    setTimeout(() => {
      currentImg.style.opacity = "0";
      currentImg.style.zIndex = "1";
    }, 50);

    // Update index and reset transition flag
    setTimeout(() => {
      currentIndex = nextIndex;
      isTransitioning = false;
    }, 1500);
  }

  // Start slideshow after initial delay
  setTimeout(() => {
    setInterval(transitionToNext, 5000);
  }, 4000);
}

// Call the function when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  // Use the basic version
  startHeroSlideshow();

  // OR use the advanced version (comment out the line above)
  // startHeroSlideshowAdvanced();
});

// Parallax effect on scroll
function heroParallax() {
  window.addEventListener("scroll", () => {
    const scrollY = window.scrollY;
    const heroContent = document.querySelector(".hero-content");

    // Move content up slightly on scroll
    if (scrollY < window.innerHeight) {
      heroContent.style.transform = `translateY(${scrollY * 0.2}px)`;
      document.querySelector(".hero-overlay").style.opacity =
        0.7 + scrollY * 0.001;
    }
  });
}

// Initialize hero effects
document.addEventListener("DOMContentLoaded", () => {
  startHeroSlideshow();
  heroParallax();

  // Smooth scroll for the scroll indicator
  document.querySelector(".scroll-indicator").addEventListener("click", () => {
    document.querySelector("#about").scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  });
});

// Scroll animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault();

  // Get form data
  const formData = new FormData(this);
  const data = Object.fromEntries(formData);

  // Simple validation
  if (
    !data.name ||
    !data.email ||
    !data.phone ||
    !data.service ||
    !data.message
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    alert("Please enter a valid email address.");
    return;
  }

  // Phone validation (basic)
  const phoneRegex = /^[+]?[\d\s\-KATEX_INLINE_OPENKATEX_INLINE_CLOSE]{10,}$/;
  if (!phoneRegex.test(data.phone)) {
    alert("Please enter a valid phone number.");
    return;
  }

  // Simulate form submission
  const submitBtn = this.querySelector(".submit-btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Simulate API call
  setTimeout(() => {
    alert(
      "Thank you for choosing Happiness Plans! Our luxury travel specialists will contact you within 24 hours to discuss your bespoke travel requirements and create a personalized proposal."
    );
    this.reset();
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
  }, 2000);
});

// Navbar background on scroll
window.addEventListener("scroll", function () {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(255, 255, 255, 0.98)";
    navbar.style.boxShadow = "0 2px 25px rgba(0, 0, 0, 0.15)";
  } else {
    navbar.style.background = "rgba(255, 255, 255, 0.95)";
    navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
  }
});

// Add loading animation
window.addEventListener("load", function () {
  document.body.style.opacity = "0";
  document.body.style.transition = "opacity 0.5s ease";

  setTimeout(() => {
    document.body.style.opacity = "1";
  }, 100);
});

// Add to script.js
window.addEventListener("scroll", function () {
  const scrollPosition = window.pageYOffset;
  document.querySelector(".parallax-bg").style.transform = `translateY(${
    scrollPosition * 0.5
  }px)`;
});

// Add to script.js
document.querySelectorAll(".elegant-text-reveal").forEach((element) => {
  const text = element.textContent;
  element.textContent = "";

  text.split(" ").forEach((word) => {
    const span = document.createElement("span");
    span.textContent = word + " ";
    element.appendChild(span);
  });

  observer.observe(element);
});

// Add to script.js
document.querySelectorAll(".cta-button, .submit-btn").forEach((button) => {
  button.classList.add("magnetic-button");

  button.addEventListener("mousemove", function (e) {
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    this.style.transform = `perspective(500px) rotateX(${
      (rect.height / 2 - y) / 10
    }deg) rotateY(${-(rect.width / 2 - x) / 20}deg)`;
    this.style.boxShadow = `${(rect.width / 2 - x) / 20}px ${
      (rect.height / 2 - y) / 10
    }px 30px rgba(0,0,0,0.2)`;
  });

  button.addEventListener("mouseleave", function () {
    this.style.transform = "perspective(500px) rotateX(0) rotateY(0)";
    this.style.boxShadow = "0 10px 25px rgba(220, 38, 38, 0.4)";
  });
});

// Add to script.js
document
  .querySelectorAll(
    ".form-group input, .form-group textarea, .form-group select"
  )
  .forEach((input) => {
    input.classList.add("form-control");
    input.setAttribute("placeholder", " ");

    const label = input.previousElementSibling;
    if (label && label.tagName === "LABEL") {
      const text = label.textContent;
      label.classList.add("floating-label");
      input.parentNode.insertBefore(label, input.nextSibling);
    }
  });
