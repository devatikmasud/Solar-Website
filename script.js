// ===== Mobile nav toggle =====
const navToggle = document.getElementById('navToggle');
const mobileNav = document.getElementById('mobileNav');
if (navToggle && mobileNav) {
  navToggle.addEventListener('click', () => {
    const open = mobileNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ===== Day / night hero toggle =====
const dnToggle = document.getElementById('daynightToggle');
const scene = document.querySelector('.scene');
if (dnToggle && scene) {
  dnToggle.addEventListener('click', () => {
    const isNight = scene.classList.toggle('night');
    dnToggle.setAttribute('aria-pressed', isNight ? 'true' : 'false');
  });
}

// ===== FAQ accordion =====
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-q');
  const panel = item.querySelector('.faq-a');
  btn.addEventListener('click', () => {
    const isOpen = btn.getAttribute('aria-expanded') === 'true';

    // close all other panels (single-open accordion)
    document.querySelectorAll('.faq-q').forEach(otherBtn => {
      if (otherBtn !== btn) {
        otherBtn.setAttribute('aria-expanded', 'false');
        otherBtn.parentElement.querySelector('.faq-a').style.maxHeight = null;
      }
    });

    btn.setAttribute('aria-expanded', isOpen ? 'false' : 'true');
    panel.style.maxHeight = isOpen ? null : panel.scrollHeight + 'px';
  });
});

// ===== Quote form (front-end only demo) =====
const quoteForm = document.getElementById('quoteForm');
const formNote = document.getElementById('formNote');
if (quoteForm) {
  quoteForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = quoteForm.querySelector('input[name="name"]').value.trim();
    formNote.textContent = name
      ? `Thanks${name ? ', ' + name.split(' ')[0] : ''} — we'll be in touch shortly with your free quote.`
      : "Thanks — we'll be in touch shortly with your free quote.";
    formNote.style.color = '#1f6f5c';
    formNote.style.fontWeight = '700';
    quoteForm.reset();
  });
}

// ===== Reveal hero on load (single orchestrated entrance) =====
window.addEventListener('DOMContentLoaded', () => {
  document.body.classList.add('loaded');
});

// ===== Premium reveal-on-scroll =====
const revealObserver = new IntersectionObserver((entries)=>{
  entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('revealed'); revealObserver.unobserve(entry.target); } });
},{threshold:.14});
document.querySelectorAll('[data-reveal]').forEach(el=>revealObserver.observe(el));

// ===== Interactive savings estimate =====
const billRange = document.getElementById('billRange');
const billValue = document.getElementById('billValue');
const offsetValue = document.getElementById('offsetValue');
const tenYearValue = document.getElementById('tenYearValue');
if(billRange){
  const updateSavings=()=>{
    const bill=Number(billRange.value);
    const annual=Math.round(bill*12*.80);
    billValue.textContent='$'+bill.toLocaleString();
    offsetValue.textContent='$'+annual.toLocaleString();
    tenYearValue.textContent='$'+(annual*10).toLocaleString();
  };
  billRange.addEventListener('input',updateSavings); updateSavings();
}

// ===== Gentle pointer depth for orbit =====
const orbit=document.querySelector('.energy-orbit');
if(orbit && window.matchMedia('(pointer:fine)').matches){
  orbit.addEventListener('pointermove',(e)=>{
    const r=orbit.getBoundingClientRect(), x=(e.clientX-r.left)/r.width-.5, y=(e.clientY-r.top)/r.height-.5;
    orbit.style.transform=`perspective(900px) rotateX(${y*-3}deg) rotateY(${x*4}deg)`;
  });
  orbit.addEventListener('pointerleave',()=>orbit.style.transform='');
}


// Subtle 3D depth on the premium About visual. Disabled for touch devices.
(() => {
  const card = document.querySelector('[data-tilt]');
  if (!card || window.matchMedia('(pointer: coarse)').matches) return;
  const main = card.querySelector('.about-photo-main');
  card.addEventListener('pointermove', (e) => {
    const r = card.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5;
    const y = (e.clientY - r.top) / r.height - .5;
    main.style.transform = `rotateY(${-6 + x * 8}deg) rotateX(${2 - y * 6}deg) translateZ(8px)`;
  });
  card.addEventListener('pointerleave', () => {
    main.style.transform = 'rotateY(-6deg) rotateX(2deg)';
  });
})();
