/* ===================== CONFIG PROGETTI ===================== */
const projects = [
  {
    title: "Artist Utopia",
    folder: "Image/Artist-Utopia/",
    prefix: "ArtistiUtopia",
    count: 22
  },
  {
    title: "WeedNessDay",
    folder: "Image/WeedNessDay/",
    prefix: "WeedNessDay",
    count: 57
  }
];


particlesJS('particles-js', {
  particles: {
    number: { value: 80, density: { enable: true, value_area: 800 } },
    color: { value: '#ffffff' },
    shape: { type: 'circle' },
    opacity: { value: 0.5 },
    size: { value: 3, random: true },
    line_linked: {
      enable: true,
      distance: 150,
      color: '#ffffff',
      opacity: 0.4,
      width: 1
    },
    move: { enable: true, speed: 2 }
  },
  retina_detect: true
});

const container = document.getElementById('projects-container');
const carousels = [];

projects.forEach((project, index) => {
  const section = document.createElement('div');
  section.className = 'project-section';

  section.innerHTML = `
    <h2 class="project-title">${project.title}</h2>

    <div class="carousel-container">
      <button class="carousel-button prev" onclick="moveCarousel(${index}, -1)">
        <i class="fas fa-chevron-left"></i>
      </button>

      <div class="carousel-wrapper">
        <ul class="carousel-track" id="carousel-${index}"></ul>
      </div>

      <button class="carousel-button next" onclick="moveCarousel(${index}, 1)">
        <i class="fas fa-chevron-right"></i>
      </button>

      <div class="carousel-indicators" id="indicators-${index}"></div>
    </div>
  `;

  container.appendChild(section);

  const track = section.querySelector('.carousel-track');

  for (let i = 1; i <= project.count; i++) {
    const num = String(i).padStart(2, '0');
    const li = document.createElement('li');
    li.className = `carousel-item ${i === 1 ? 'center' : ''}`;
    li.innerHTML = `
      <img data-src="${project.folder}${num}${project.prefix}.jpg" alt="${project.title} ${i}">
    `;
    track.appendChild(li);
  }
});


/* CAROUSEL LOGIC */
function initCarousels() {
  document.querySelectorAll('.carousel-track').forEach((track, index) => {
    const items = track.querySelectorAll('.carousel-item');

    carousels[index] = {
      currentIndex: 0,
      totalItems: items.length
    };

    const indicators = document.getElementById(`indicators-${index}`);
    items.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.className = `indicator ${i === 0 ? 'active' : ''}`;
      dot.onclick = () => goToSlide(index, i);
      indicators.appendChild(dot);
    });

    updateCarousel(index);
  });
}

function moveCarousel(i, dir) {
  const c = carousels[i];
  c.currentIndex = (c.currentIndex + dir + c.totalItems) % c.totalItems;
  updateCarousel(i);
}

function goToSlide(i, s) {
  carousels[i].currentIndex = s;
  updateCarousel(i);
}

function updateCarousel(i) {
  const track = document.getElementById(`carousel-${i}`);
  const items = track.querySelectorAll('.carousel-item');
  const dots = document.querySelectorAll(`#indicators-${i} .indicator`);

  const c = carousels[i].currentIndex;
  const t = carousels[i].totalItems;

  items.forEach((item, index) => {
    item.classList.remove('center', 'left', 'right', 'hidden');

    if (index === c) item.classList.add('center');
    else if (index === (c - 1 + t) % t) item.classList.add('left');
    else if (index === (c + 1) % t) item.classList.add('right');
    else item.classList.add('hidden');

    if (Math.abs(index - c) <= 1 || Math.abs(index - c) >= t - 1) {
      const img = item.querySelector('img[data-src]');
      if (img) {
        img.src = img.dataset.src;
        img.removeAttribute('data-src');
      }
    }
  });

  dots.forEach((d, idx) => d.classList.toggle('active', idx === c));
}

document.addEventListener('DOMContentLoaded', initCarousels);
