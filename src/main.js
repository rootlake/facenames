import { groups, filenameToName } from './data/faces.js';

let currentFaces = [];
let currentIndex = 0;
let isAnimating = false;
let startX = 0;
let currentX = 0;
let isDragging = false;

const faceElement = document.getElementById('face');
const firstNameElement = document.getElementById('firstName');
const lastNameElement = document.getElementById('lastName');
const nextButton = document.getElementById('next');
const groupSelect = document.getElementById('group-select');
const card = document.querySelector('.card');
const nameContent = document.querySelector('.name-content');
const checkButton = document.querySelector('.check-button');

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function loadGroupFaces(groupId) {
  const group = groups[groupId];
  if (!group || !group.files) return;

  // Create and shuffle the faces array
  currentFaces = group.files.map(filename => {
    const name = filenameToName(filename);
    const [firstName, ...rest] = name.split(' ');
    const lastName = rest.join(' ');
    return {
      image: `${group.path}/${filename}`,
      firstName,
      lastName
    };
  });

  // Initial shuffle only
  currentFaces = shuffleArray([...currentFaces]);
  currentIndex = 0;
  showCurrentFace();
}

function showCurrentFace() {
  if (!currentFaces.length) return;
  
  const face = currentFaces[currentIndex];
  
  // Preload the image
  const img = new Image();
  img.onload = () => {
    faceElement.src = face.image;
    firstNameElement.textContent = face.firstName;
    lastNameElement.textContent = face.lastName;
    hideNames();
  };
  img.src = face.image;
}

function nextFace() {
  currentIndex = (currentIndex + 1) % currentFaces.length;
  showCurrentFace();
}

function prevFace() {
  currentIndex = (currentIndex - 1 + currentFaces.length) % currentFaces.length;
  showCurrentFace();
}

function hideNames() {
  nameContent.classList.remove('visible');
  checkButton.classList.remove('hidden');
}

function showNames() {
  nameContent.classList.add('visible');
  checkButton.classList.add('hidden');
}

// Touch and mouse event handlers
function handleDragStart(e) {
  if (isAnimating) return;
  
  isDragging = true;
  startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  currentX = startX;
  card.classList.add('swiping');
}

function handleDragMove(e) {
  if (!isDragging || isAnimating) return;
  
  e.preventDefault();
  currentX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
  const diff = currentX - startX;
  
  // Limit the drag distance
  const maxDrag = window.innerWidth * 0.4;
  const boundedDiff = Math.max(Math.min(diff, maxDrag), -maxDrag);
  
  requestAnimationFrame(() => {
    card.style.transform = `translateX(${boundedDiff}px)`;
  });
}

function handleDragEnd(e) {
  if (!isDragging || isAnimating) return;
  
  isDragging = false;
  card.classList.remove('swiping');
  
  const diff = currentX - startX;
  const threshold = window.innerWidth * 0.2; // 20% of screen width
  
  if (Math.abs(diff) > threshold) {
    isAnimating = true;
    // Animate the card off screen
    const direction = diff > 0 ? 1 : -1;
    requestAnimationFrame(() => {
      card.style.transform = `translateX(${direction * window.innerWidth}px)`;
    });
    
    setTimeout(() => {
      card.style.transition = 'none';
      card.style.transform = `translateX(${-direction * window.innerWidth}px)`;
      
      requestAnimationFrame(() => {
        // Move to next/previous face based on swipe direction
        if (direction > 0) {
          prevFace();
        } else {
          nextFace();
        }
        
        setTimeout(() => {
          card.style.transition = '';
          card.style.transform = '';
          isAnimating = false;
        }, 50);
      });
    }, 300);
  } else {
    // Return to center
    requestAnimationFrame(() => {
      card.style.transform = '';
    });
  }
}

// Populate group select
Object.entries(groups).forEach(([id, group]) => {
  const option = document.createElement('option');
  option.value = id;
  option.textContent = group.name;
  groupSelect.appendChild(option);
});

// Event listeners
checkButton.addEventListener('click', showNames);
nextButton.addEventListener('click', nextFace);
groupSelect.addEventListener('change', (e) => loadGroupFaces(e.target.value));

// Touch events
card.addEventListener('touchstart', handleDragStart);
card.addEventListener('touchmove', handleDragMove, { passive: false });
card.addEventListener('touchend', handleDragEnd);

// Mouse events (for desktop)
card.addEventListener('mousedown', handleDragStart);
window.addEventListener('mousemove', handleDragMove);
window.addEventListener('mouseup', handleDragEnd);

// Initial load
loadGroupFaces('isaac-facilities'); 