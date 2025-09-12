// Navbar: shrink on scroll + sticky shadow
(function(){
  const navbar = document.querySelector('.fv-navbar');
  if(!navbar) return;

  const onScroll = () => {
    if (window.scrollY > 60) navbar.classList.add('scrolled');
    else navbar.classList.remove('scrolled');
  };

  window.addEventListener('load', onScroll);
  window.addEventListener('scroll', onScroll);

  // Close navbar when clicking a link on mobile (good UX)
  const navCollapse = document.getElementById('fvNav');
  if (navCollapse) {
    navCollapse.addEventListener('click', (e) => {
      const target = e.target;
      if (target.tagName === 'A' && window.getComputedStyle(document.querySelector('.navbar-toggler')).display !== 'none') {
        const bs = bootstrap.Collapse.getInstance(navCollapse) || new bootstrap.Collapse(navCollapse);
        bs.hide();
      }
    });
  }
})();

// Services Flip Card (if used)
const services = [
  { title: "Logo Design", text: "We create unique, memorable logos tailored to your brand with smart color choices and precision detail." },
  { title: "Web Development", text: "We create fast, responsive, and modern websites that deliver a great user experience." },
  { title: "SEO", text: "We optimize your website for search engines to drive more traffic and boost visibility." },
  { title: "Digital Marketing", text: "We build strategies to grow your business online through social media, ads, and content marketing." }
];

let currentIndex = 0;
const flipCardInner = document.getElementById("flipCard");
const serviceTitleFront = document.getElementById("service-title");
const serviceTextFront = document.getElementById("service-text");
const serviceTitleBack = document.getElementById("service-title-back");
const serviceTextBack = document.getElementById("service-text-back");

if (flipCardInner) {
  setInterval(() => {
    const nextIndex = (currentIndex + 1) % services.length;
    serviceTitleBack.textContent = services[nextIndex].title;
    serviceTextBack.textContent = services[nextIndex].text;
    flipCardInner.style.transform = "rotateY(180deg)";
    setTimeout(() => {
      serviceTitleFront.textContent = services[nextIndex].title;
      serviceTextFront.textContent = services[nextIndex].text;
      flipCardInner.style.transform = "rotateY(0deg)";
      currentIndex = nextIndex;
    }, 1000);
  }, 4000);
}

// Load navbar.html dynamically
fetch('navbar.html')
  .then(res => res.text())
  .then(data => document.getElementById('navbar').innerHTML = data);

// Service cards reveal on scroll (staggered animation)
document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".service-card");
  function revealCards() {
    cards.forEach((card, i) => {
      const position = card.getBoundingClientRect().top;
      if (position < window.innerHeight - 80) {
        setTimeout(() => {
          card.classList.add("visible");
        }, i * 150);
      }
    });
  }
  window.addEventListener("scroll", revealCards);
  revealCards();
});

// Portfolio Lightbox
const lightbox = document.getElementById("lightbox");
if (lightbox) {
  const lightboxImg = document.getElementById("lightbox-img");
  const closeBtn = document.querySelector(".lightbox .close");
  document.querySelectorAll(".portfolio-card img").forEach(img => {
    img.addEventListener("click", () => {
      lightbox.style.display = "flex";
      lightboxImg.src = img.src;
    });
  });
  closeBtn.addEventListener("click", () => lightbox.style.display = "none");
  lightbox.addEventListener("click", (e) => {
    if (e.target !== lightboxImg) lightbox.style.display = "none";
  });
}

// Homepage CTA auto slider
let quotes = document.querySelectorAll(".cta-slider .quote");
let index = 0;
function showNextQuote() {
  quotes[index].classList.remove("active");
  index = (index + 1) % quotes.length;
  quotes[index].classList.add("active");
}
if (quotes.length > 0) setInterval(showNextQuote, 5000);

// Sidebar / hamburger menu
const hamburger = document.querySelector('.hamburger');
const sidebar = document.querySelector('.sidebar');
const overlay = document.querySelector('.overlay');
if (hamburger && sidebar && overlay) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });
  overlay.addEventListener('click', () => {
    hamburger.classList.remove('active');
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });
  document.querySelectorAll('.sidebar a').forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      sidebar.classList.remove('open');
      overlay.classList.remove('visible');
    });
  });
}
//backend
const urlParams = new URLSearchParams(window.location.search);
if (urlParams.has('success')) {
  document.getElementById('success-msg').style.display = 'block';
  history.replaceState(null, '', window.location.pathname);
}

