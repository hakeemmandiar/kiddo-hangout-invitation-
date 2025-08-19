let currentPage = 1;
let selectedPlace = '';
let selectedPlaceImg = '';

document.addEventListener('DOMContentLoaded', () => {
  showPage(1);
});

function goToPage(num) {
  showPage(num);
}

function showPage(num) {
  document.querySelectorAll('.page').forEach((el, idx) => {
    el.classList.toggle('active', idx === num - 1);
  });
  currentPage = num;
  if (num === 2) setupNoButton();
  if (num === 4) showSummary();
}

// --- PAGE 2: "No" button jumps around ---
let noBtnTries = 0;
let noBtn;

function setupNoButton() {
  noBtn = document.getElementById('noBtn');
  noBtn.style.position = 'absolute';
  noBtn.style.left = '55vw';
  noBtn.style.top = '62vh';
  noBtnTries = 0;
}

function handleNo() {
  // Animate the "No" button to a random position
  const container = document.getElementById('page-2');
  const btnW = noBtn.offsetWidth;
  const btnH = noBtn.offsetHeight;
  const pad = 20;
  const maxW = window.innerWidth - btnW - pad;
  const maxH = window.innerHeight - btnH - pad - 100;
  const randLeft = Math.floor(Math.random() * maxW);
  const randTop = Math.floor(Math.random() * maxH) + 50;
  noBtn.style.left = randLeft + 'px';
  noBtn.style.top = randTop + 'px';

  // As a joke, after several tries, show a cat pop up
  noBtnTries++;
  if (noBtnTries === 5) {
    let catPop = document.createElement('img');
    catPop.src = 'https://media.tenor.com/9yQWc7wS0pIAAAAi/cute-cat.gif';
    catPop.alt = 'Pleading Cat';
    catPop.style.position = 'fixed';
    catPop.style.width = '80px';
    catPop.style.bottom = '60px';
    catPop.style.right = '24px';
    catPop.style.zIndex = 99;
    catPop.style.filter = 'drop-shadow(0 3px 9px #fba1b7bb)';
    container.appendChild(catPop);
    setTimeout(() => catPop.remove(), 2000);
  }
}

function handleYes() {
  goToPage(3);
}

// PAGE 3: Place selection
function selectPlace(name, imgSrc) {
  selectedPlace = name;
  selectedPlaceImg = imgSrc;
  goToPage(4);
}

// PAGE 4: Show summary
function showSummary() {
  const chosen = document.getElementById('chosenPlace');
  chosen.innerHTML = `
    <div style="display:flex;align-items:center;flex-direction:column;gap:8px;">
      <img src="${selectedPlaceImg}" alt="${selectedPlace}" style="width:70px;height:70px;border-radius:12px;object-fit:cover;">
      <span style="font-size:1.1em;font-weight:bold;color:#fba1b7;">${selectedPlace}</span>
    </div>`;
}