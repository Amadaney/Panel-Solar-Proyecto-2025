// --- CARRUSEL ---
const track = document.querySelector('.carousel-track');
const slides = Array.from(track.querySelectorAll('img'));
const prevBtn = document.querySelector('.carousel-btn.prev');
const nextBtn = document.querySelector('.carousel-btn.next');

let offset = 0;

function slideStep() {
  // ancho dinámico = imagen + gap
  const first = slides[0];
  const rect = first.getBoundingClientRect();
  const styles = getComputedStyle(track);
  const gap = parseInt(styles.columnGap || styles.gap || 0);
  return Math.round(rect.width + gap);
}

function limit() {
  const max = track.scrollWidth - track.clientWidth;
  if (max <= 0) return 0;
  return Math.max(-max, Math.min(0, offset));
}

function render() {
  track.style.transform = `translateX(${offset}px)`;
}

function next() {
  offset -= slideStep();
  offset = limit();
  // loop suave
  if (track.scrollWidth - track.clientWidth + offset < slideStep()/2) offset = 0;
  render();
}
function prev() {
  const max = track.scrollWidth - track.clientWidth;
  offset += slideStep();
  if (offset > 0) offset = -max + (max % slideStep());
  render();
}

nextBtn.addEventListener('click', next);
prevBtn.addEventListener('click', prev);
window.addEventListener('resize', () => render());

// --- LIGHTBOX / ZOOM ---
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const lbClose = document.querySelector('.lightbox-close');

slides.forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lbImg.alt = img.alt || 'Imagen ampliada';
    lb.classList.add('open');
  });
});

function closeLB(){ lb.classList.remove('open'); }
lbClose.addEventListener('click', closeLB);
lb.addEventListener('click', (e) => { if (e.target === lb) closeLB(); });
document.addEventListener('keydown', (e) => { if (e.key === 'Escape') closeLB(); });
