"use strict";

/* ==========================================
   HELPERS
========================================== */
const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => document.querySelectorAll(selector);
const create = (tag) => document.createElement(tag);

/* ==========================================
   PROJECT DATA — real folders from
   github.com/KheyamTokyo136/javascript-mini-projects
========================================== */
const REPO_BASE = "https://github.com/KheyamTokyo136/javascript-mini-projects/tree/main/";

function repoLink(folderName){
  return REPO_BASE + encodeURIComponent(folderName).replace(/%2F/g, "/");
}

const beginnerProjects = [
  { icon:"⏰", title:"Digital Clock", folder:"Digital Clock", desc:"A responsive digital clock displaying the current time with the JavaScript Date API.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🧮", title:"Calculator", folder:"Calculator", desc:"A working calculator UI supporting the core arithmetic operations.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"⏱️", title:"StopWatch", folder:"StopWatch", desc:"A start / stop / reset stopwatch with lap tracking.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"⭕", title:"Tic Tac Toe", folder:"Tic Tac Toe", desc:"A two-player Tic Tac Toe game with win and draw detection.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"✊", title:"Rock Paper Scissors", folder:"Rock Paper Scissors", desc:"Classic Rock Paper Scissors against the computer with score tracking.", tech:["HTML5","CSS3","JavaScript"] },
];

const intermediateProjects = [
  { icon:"✅", title:"To-Do List", folder:"To-Do-List", desc:"A task manager for adding, completing and removing to-do items.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🔐", title:"Random Password Generator", folder:"Random Password Genrator", desc:"Generates random passwords with adjustable length and character rules.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🗒️", title:"Notes App", folder:"Notes App", desc:"A notes app for creating and managing quick text notes.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"📝", title:"Notes App 2", folder:"Notes App 2", desc:"A second, expanded take on the notes app concept.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🥁", title:"Drum Kit", folder:"Drum Kit", desc:"An interactive drum kit that plays sounds on key press or click.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🖼️", title:"Image Gallery", folder:"Image Gallery", desc:"A browsable image gallery with layout and filtering.", tech:["HTML5","CSS3","JavaScript"] },
  { icon:"🌤️", title:"Weather App", folder:"Weather-app", desc:"Live weather lookup by city using a public weather API.", tech:["JavaScript","REST API","CSS3"] },
];

const advancedProjects = [
  { icon:"💰", title:"Expenses Tracker", folder:"Expenses Tracker", desc:"Tracks income and expenses with category breakdowns and running balance.", tech:["JavaScript","CSS3","Local Storage"] },
  { icon:"🛒", title:"Shopping Cart", folder:"Shopping cart", desc:"A shopping cart flow with add/remove items and live total calculation.", tech:["JavaScript","HTML5","CSS3"] },
  { icon:"🎵", title:"Music Player", folder:"music player", desc:"A custom audio player UI with play, pause and track controls.", tech:["HTML5","CSS3","JavaScript"] },
];

function buildProjectCard(project, level){
  const card = create("a");
  card.className = "project-card reveal";
  card.href = repoLink(project.folder);
  card.target = "_blank";
  card.rel = "noopener";

  const tileClass = ["tile-1","tile-2","tile-3","tile-4"][Math.floor(Math.random() * 4)];

  card.innerHTML = `
    <div class="project-image"><div class="tile ${tileClass}">${project.icon}</div></div>
    <div class="project-content">
      <div class="project-top">
        <span class="badge ${level}">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
        <span class="status completed">On GitHub</span>
      </div>
      <h3>${project.title}</h3>
      <p>${project.desc}</p>
      <div class="tech-stack">${project.tech.map(t => `<span>${t}</span>`).join("")}</div>
      <div class="project-buttons">
        <span class="btn btn-outline view-code-btn">View Code on GitHub →</span>
      </div>
    </div>
  `;
  return card;
}

function renderProjects(){
  const beginnerGrid = $("#beginner-grid");
  const intermediateGrid = $("#intermediate-grid");
  const advancedGrid = $("#advanced-grid");

  beginnerProjects.forEach(p => beginnerGrid.appendChild(buildProjectCard(p, "beginner")));
  intermediateProjects.forEach(p => intermediateGrid.appendChild(buildProjectCard(p, "intermediate")));
  advancedProjects.forEach(p => advancedGrid.appendChild(buildProjectCard(p, "advanced")));
}
renderProjects();

/* ==========================================
   LOADER
========================================== */
const loader = $(".loader");
window.addEventListener("load", () => {
  setTimeout(() => {
    loader.style.opacity = "0";
    loader.style.visibility = "hidden";
    loader.style.pointerEvents = "none";
  }, 1800);
});

/* ==========================================
   TYPING EFFECT
========================================== */
const typingElement = $("#typing");
const words = ["Frontend Developer", "JavaScript Developer", "Software Engineering Student", "UI/UX Enthusiast", "Problem Solver"];
let wordIndex = 0, charIndex = 0, deleting = false;

function typeEffect(){
  const currentWord = words[wordIndex];
  if(!deleting){
    typingElement.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
    if(charIndex === currentWord.length){
      deleting = true;
      setTimeout(typeEffect, 1600);
      return;
    }
  } else {
    typingElement.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
    if(charIndex === 0){
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }
  setTimeout(typeEffect, deleting ? 55 : 110);
}
window.addEventListener("DOMContentLoaded", () => { if(typingElement) typeEffect(); });

/* ==========================================
   DARK / LIGHT MODE
========================================== */
const themeButton = $("#theme-toggle");
const savedTheme = localStorage.getItem("theme");
if(savedTheme === "dark"){ document.body.classList.add("dark"); themeButton.textContent = "☀️"; }

themeButton.addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  localStorage.setItem("theme", isDark ? "dark" : "light");
  themeButton.textContent = isDark ? "☀️" : "🌙";
});

/* ==========================================
   CUSTOM CURSOR
========================================== */
const cursor = $(".cursor");
const cursorBlur = $(".cursor-blur");
if(window.matchMedia("(pointer: fine)").matches){
  window.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";
    cursorBlur.style.left = e.clientX + "px";
    cursorBlur.style.top = e.clientY + "px";
  });
  document.addEventListener("mouseover", (e) => {
    if(e.target.closest("a, button, .project-card, .certificate-card")){
      cursor.classList.add("cursor-grow");
    }
  });
  document.addEventListener("mouseout", (e) => {
    if(e.target.closest("a, button, .project-card, .certificate-card")){
      cursor.classList.remove("cursor-grow");
    }
  });
}

/* ==========================================
   FLOATING PARTICLES
========================================== */
const particleContainer = $(".particles");
function createParticle(){
  const particle = create("span");
  const size = Math.random() * 6 + 3;
  particle.style.width = `${size}px`;
  particle.style.height = `${size}px`;
  particle.style.left = `${Math.random() * window.innerWidth}px`;
  particle.style.animationDuration = `${8 + Math.random() * 10}s`;
  particleContainer.appendChild(particle);
  particle.addEventListener("animationend", () => particle.remove());
}
setInterval(createParticle, 500);

/* ==========================================
   SCROLL REVEAL
========================================== */
function revealOnScroll(){
  $$(".reveal").forEach((el) => {
    if(el.getBoundingClientRect().top < window.innerHeight - 100){
      el.classList.add("active");
    }
  });
}
window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

/* ==========================================
   COUNTERS
========================================== */
const counters = $$("[data-target]");
let countersStarted = false;
function startCounters(){
  if(countersStarted) return;
  const stats = $("#stats");
  if(stats.getBoundingClientRect().top < window.innerHeight - 100){
    countersStarted = true;
    counters.forEach((counter) => {
      const target = Number(counter.dataset.target);
      const speed = target / 140;
      let count = 0;
      (function update(){
        count += speed;
        if(count < target){
          counter.textContent = Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.textContent = target;
        }
      })();
    });
  }
}
window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);

/* ==========================================
   SKILL BAR ANIMATION
========================================== */
const skillSection = $("#skills");
const bars = $$(".progress-bar");
let skillsStarted = false;
function animateSkills(){
  if(skillsStarted) return;
  if(skillSection.getBoundingClientRect().top < window.innerHeight - 100){
    skillsStarted = true;
    bars.forEach((bar) => {
      const value = bar.style.width;
      bar.style.width = "0";
      setTimeout(() => { bar.style.width = value; }, 150);
    });
  }
}
window.addEventListener("scroll", animateSkills);
window.addEventListener("load", animateSkills);

/* ==========================================
   BACK TO TOP + ACTIVE NAV
========================================== */
const topBtn = $("#topBtn");
window.addEventListener("scroll", () => {
  topBtn.style.display = window.scrollY > 400 ? "block" : "none";
});
topBtn.addEventListener("click", () => window.scrollTo({ top:0, behavior:"smooth" }));

const sections = $$("section[id]");
const navLinks = $$(".nav-links a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    if(scrollY >= section.offsetTop - 150) current = section.id;
  });
  navLinks.forEach((link) => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

/* ==========================================
   CONTACT FORM (front-end only demo handling)
========================================== */
const contactForm = $("#contact-form");
if(contactForm){
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    contactForm.reset();
    alert("Thanks for reaching out — I'll get back to you soon.");
  });
}