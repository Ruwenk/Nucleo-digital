// Número de WhatsApp en formato internacional, sin "+" ni espacios (ej. 5215512345678)
const WHATSAPP = '[TU_NUMERO]';

const waLink = (text) => `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(text)}`;

// Botón flotante de WhatsApp
document.getElementById('wa-float').href = waLink('Hola, me interesa una página web.');

// Año del footer
document.getElementById('year').textContent = new Date().getFullYear();

// Menú móvil
const toggle = document.querySelector('.nav__toggle');
const menu = document.getElementById('menu');
toggle.addEventListener('click', () => {
  const open = menu.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});
menu.querySelectorAll('a').forEach((a) =>
  a.addEventListener('click', () => {
    menu.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  })
);

// Borde del nav al hacer scroll
const nav = document.querySelector('.nav');
const onScroll = () => nav.classList.toggle('is-scrolled', window.scrollY > 8);
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

// Formulario: abre WhatsApp con el mensaje ya escrito
document.getElementById('contact-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const f = new FormData(e.target);
  const text =
    `Hola, soy ${f.get('nombre')} (${f.get('correo')}).\n` +
    `Me interesa: ${f.get('servicio')}.\n` +
    (f.get('mensaje') ? `\n${f.get('mensaje')}` : '');
  window.open(waLink(text), '_blank', 'noopener');
});

// Animación de aparición al hacer scroll
const targets = document.querySelectorAll('.hero, .feature-img, .section h2, .rows li, .work__item, .plan, .faq details, .contact__grid');
targets.forEach((el) => el.classList.add('reveal'));
const io = new IntersectionObserver(
  (entries) =>
    entries.forEach((en) => {
      if (en.isIntersecting) {
        en.target.classList.add('is-visible');
        io.unobserve(en.target);
      }
    }),
  { threshold: 0.12 }
);
targets.forEach((el) => io.observe(el));
