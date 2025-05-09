/*===== MENU SHOW =====*/
const showMenu = (toggleId, navId) => {
  const toggle = document.getElementById(toggleId),
  nav = document.getElementById(navId)

  if(toggle && nav){
      toggle.addEventListener('click', () => {
          nav.classList.toggle('show')
      })
  }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
  const navMenu = document.getElementById('nav-menu')
  // When we click on each nav__link, we remove the show-menu class
  navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
  const scrollDown = window.scrollY

sections.forEach(current => {
      const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
      
      if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
          sectionsClass.classList.add('active-link')
      }else{
          sectionsClass.classList.remove('active-link')
      }                                                    
  })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
  origin: 'top',
  distance: '60px',
  duration: 2000,
  delay: 200
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200}); 
sr.reveal('.experience__slide, .experience__arrow',{interval: 200});

let currentSlide = 0;
const slides = document.querySelectorAll('.experience__slide');
const totalSlides = slides.length;

function showSlide(index) {
if (index >= totalSlides) currentSlide = 0;
else if (index < 0) currentSlide = totalSlides - 1;
else currentSlide = index;

slides.forEach((slide, i) => {
  slide.classList.remove('active');
  if (i === currentSlide) slide.classList.add('active');
});
}

document.querySelector('.left-arrow').addEventListener('click', () => {
showSlide(currentSlide - 1);
});

document.querySelector('.right-arrow').addEventListener('click', () => {
showSlide(currentSlide + 1);
});

// Afficher la première slide au chargement
showSlide(currentSlide);

// Typewriter animation with erase effect for all lines
const lines = [
{ element: document.getElementById('line1'), text: 'Hi,' },
{ element: document.getElementById('line2'), text: 'I\'am NABOULSI' },
{ element: document.getElementById('line3'), text: 'Web Developer' }
];
let charIndexes = lines.map(() => 0); // Indices pour chaque ligne
let isTyping = true;

function type() {
let allDone = true;

lines.forEach((line, index) => {
  if (charIndexes[index] < line.text.length) {
    line.element.textContent = line.text.substring(0, charIndexes[index] + 1);
    charIndexes[index]++;
    allDone = false;
  }
});

if (allDone) {
  setTimeout(() => {
    isTyping = false;
    erase();
  }, 1000); // Pause avant de commencer à effacer
} else {
  setTimeout(type, 150); // Vitesse de tapage
}
}

function erase() {
let allDone = true;

lines.forEach((line, index) => {
  if (charIndexes[index] > 0) {
    line.element.textContent = line.text.substring(0, charIndexes[index] - 1);
    charIndexes[index]--;
    allDone = false;
  }
});

if (allDone) {
  setTimeout(() => {
    isTyping = true;
    type();
  }, 500); // Pause avant de recommencer l'affichage
} else {
  setTimeout(erase, 100); // Vitesse de suppression
}
}

window.addEventListener('load', type);

// Lightbox functions
function openLightbox(src) {
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
lightboxImg.src = src;
lightbox.style.display = 'flex';
}

function closeLightbox() {
const lightbox = document.getElementById('lightbox');
lightbox.style.display = 'none';
}

/*===== THEME TOGGLE =====*/
const themeToggle = document.getElementById('theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
      themeToggle.innerHTML = "<i class='bx bx-moon'></i>";
  } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggle.innerHTML = "<i class='bx bx-sun'></i>";
  }
});

/*===== EMAIL SENDING =====*/
const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  // Validation simple
  const name = document.querySelector('input[name="name"]').value.trim();
  const email = document.querySelector('input[name="email"]').value.trim();
  const message = document.querySelector('textarea[name="message"]').value.trim();

  if (!name || !email || !message) {
      alert('Veuillez remplir tous les champs.');
      return;
  }

  // Envoi via EmailJS
  emailjs.sendForm('service_mail', 'template_02zdjwt', contactForm)
      .then((response) => {
          console.log('SUCCESS!', response.status, response.text);
          alert('Message envoyé avec succès !');
          contactForm.reset();
      }, (error) => {
          console.error('FAILED...', error);
          alert('Une erreur s\'est produite, veuillez réessayer. Détails : ' + error.text);
      });
});