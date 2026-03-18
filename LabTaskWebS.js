// Typing Animation (your code)
const typingElement = document.getElementById("typing-text");
const phrases = [
    "A Front-End Web Developer",
    "An HTML & CSS Enthusiast",
    "A JavaScript Learner",
    "A Creative Problem Solver"
];
var phraseIndex = 0;
var charIndex = 0;
var isDeleting = false;
var typingSpeed = 80;

function typeText() {
    var currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        typingElement.textContent = currentPhrase.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;
    } else {
        typingElement.textContent = currentPhrase.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
        typingSpeed = 1500;
        isDeleting = true;
    }

    if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typingSpeed = 400;
    }

    setTimeout(typeText, typingSpeed);
}
typeText();


const projects = [
  {
    title: "Online Banking System",
    desc: "A secure web-based banking platform with account management and transactions.",
    img: "https://tse2.mm.bing.net/th/id/OIP.8eokLPUsS6xM1Je27f_DZQHaEc?rs=1&pid=ImgDetMain&o=7&rm=3",
    link: "https://github.com/topics/online-banking-system"
  },
  {
    title: "E-Commerce Shopping Cart",
    desc: "A responsive shopping cart system for online stores.",
    img: "https://th.bing.com/th/id/OIP.8YzKWHuPxcVaHOU72t6HOQHaEV?w=257&h=180&c=7&r=0&o=7&dpr=1.1&pid=1.7&rm=3", 
    link: "https://github.com/topics/ecommerce-shopping-cart"
  },
  {
    title: "Hospital Management Dashboard",
    desc: "A hospital management system with patient records and analytics.",
    img: "#",
    link: "https://github.com/topics/hospital-management-system"
  }
];

const projectContainer = document.getElementById("project-container");
projects.forEach(p => {
  const card = document.createElement("div");
  card.className = "project-card";
  card.innerHTML = `<h3>${p.title}</h3><p>${p.desc}</p><img src="${p.img}" alt="${p.title}" style="width:100%"><br><a href="${p.link}">View</a>`;
  projectContainer.appendChild(card);
});


document.getElementById("contact-form").addEventListener("submit", function(e){
  e.preventDefault();
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();
  let subject = document.getElementById("subject").value.trim();
  let message = document.getElementById("message").value.trim();
  let status = document.getElementById("form-status");

  if(!name || !email || !subject || !message){
    status.textContent = "⚠ Please fill all fields.";
    status.style.color = "red";
    return;
  }
  if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)){
    status.textContent = "⚠ Invalid email format.";
    status.style.color = "red";
    return;
  }
  status.textContent = "✅ Message sent successfully!";
  status.style.color = "green";
});


const toggleBtn = document.getElementById("theme-toggle");
toggleBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  localStorage.setItem("theme", document.body.classList.contains("dark-mode") ? "dark" : "light");
});


if(localStorage.getItem("theme") === "dark"){
  document.body.classList.add("dark-mode");
}


const scrollBtn = document.getElementById("scroll-top");
scrollBtn.addEventListener("click", () => window.scrollTo({top:0, behavior:"smooth"}));