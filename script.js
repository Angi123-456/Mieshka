const bunnyPhotos = [
  "assets/20240920_121439.jpg",
  "assets/20240920_121441.jpg",
  "assets/20240920_121453.jpg",
  "assets/20240920_121501.jpg",
  "assets/20240920_121508.jpg",
  "assets/20240920_121509.jpg",
  "assets/20240920_121511.jpg",
  "assets/20240920_121512.jpg",
  "assets/20240920_121513.jpg",
  "assets/20240920_121525.jpg",
  "assets/20240920_121528.jpg",
  "assets/20240920_121546.jpg",
  "assets/20240920_121551.jpg",
  "assets/20240920_121554.jpg",
  "assets/20240920_121603.jpg",
  "assets/20240920_121623.jpg",
  "assets/20240920_121629.jpg",
  "assets/20240920_121647.jpg",
  "assets/20240920_121648.jpg",
  "assets/20240920_121915.jpg",
  "assets/20240920_121918.jpg",
  "assets/20240920_121920.jpg",
  "assets/20240920_121921.jpg",
  "assets/20240920_121925.jpg",
  "assets/20240920_121926.jpg",
  "assets/20240920_121928.jpg",
  "assets/20240920_121931.jpg",
  "assets/20240920_121934.jpg",
  "assets/20240920_121937.jpg",
  "assets/20240920_121940.jpg",
  "assets/20240920_121943.jpg",
  "assets/20240920_121945.jpg"
];

const captions = [
  "Mieshka begins her royal inspection.",
  "A suspicious sound has been detected.",
  "She is listening very carefully.",
  "Snack radar is warming up.",
  "Mieshka has entered serious bunny mode.",
  "The snack request face is forming.",
  "Maximum cute pressure applied.",
  "Still waiting. Still adorable.",
  "Human resistance is weakening.",
  "Flower queen mode activated.",
  "A royal bunny never begs. She persuades.",
  "Focus is absolute.",
  "The flower crown has been defeated.",
  "Zoomies loading...",
  "Tiny snack hunter at work.",
  "Portrait of a professional treat detective.",
  "Side-eye, but make it cute.",
  "Sleepy flower nest moment.",
  "Very serious Mieshka business.",
  "Tiny nose. Giant personality.",
  "Front-facing snoep radar online.",
  "Close-up inspection mode.",
  "The ears have received a signal.",
  "This face says: I deserve another treat.",
  "Still cute. Still snack-motivated.",
  "One paw forward: action bunny.",
  "Standing politely. Demanding silently.",
  "Looking away to seem casual.",
  "Pretending not to hear the word snoep.",
  "But she definitely heard it.",
  "The softest little snack detective.",
  "Final pose: impossible to say no."
];

// These photos play only when the Say “Snoep!” button is clicked.
const snoepSequence = [
  "assets/Snoep 1.jpg",
  "assets/Snoep 2.jpg",
  "assets/Snoep 3.jpg",
  "assets/Snoep 4.jpg",
  "assets/Snoep 5.jpg",
  "assets/Snoep 6.jpg",
  "assets/Snoep 7.jpg",
  "assets/Snoep 8.jpg",
  "assets/Snoep 9.jpg"
];

// Bigger numbers are slower. Smaller numbers are faster.
const snoepSpeeds = [850, 700, 600, 500, 380, 280, 190, 190, 190];

const photo = document.getElementById("bunnyPhoto");
const stage = document.getElementById("stage");
const badge = document.getElementById("badge");
const caption = document.getElementById("caption");
const headline = document.getElementById("headline");
const snoepText = document.getElementById("snoepText");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const playButton = document.getElementById("playButton");
const snoepButton = document.getElementById("snoepButton");
const stopButton = document.getElementById("stopButton");

let current = 0;
let galleryTimer = null;
let snoepTimeout = null;

function updateGalleryPhoto(index) {
  current = (index + bunnyPhotos.length) % bunnyPhotos.length;
  photo.src = bunnyPhotos[current];

  badge.textContent = `Mieshka ${current + 1}`;
  caption.textContent = captions[current] || "A beautiful Mieshka moment.";
  headline.textContent = "Mieshka’s gallery";
}

function nextPhoto() {
  stopSnoepOnly();
  updateGalleryPhoto(current + 1);
}

function previousPhoto() {
  stopSnoepOnly();
  updateGalleryPhoto(current - 1);
}

function playGallery() {
  stopEverything();

  headline.textContent = "Mieshka’s gallery is playing";
  caption.textContent = "Enjoy the full bunny photo collection.";

  updateGalleryPhoto(0);
  galleryTimer = setInterval(() => {
    updateGalleryPhoto(current + 1);
  }, 260);
}

function stopSnoepOnly() {
  clearTimeout(snoepTimeout);
  snoepTimeout = null;
  stage.classList.remove("stage-shake");
  photo.classList.remove("snoep-alert");
  snoepText.classList.remove("show-snoep-text");
}

function stopEverything() {
  clearInterval(galleryTimer);
  clearTimeout(snoepTimeout);

  galleryTimer = null;
  snoepTimeout = null;

  stage.classList.remove("stage-shake");
  photo.classList.remove("snoep-alert");
  snoepText.classList.remove("show-snoep-text");
}

function flashSnoepText() {
  snoepText.classList.remove("show-snoep-text");
  void snoepText.offsetWidth;
  snoepText.classList.add("show-snoep-text");
}

function shakeStage() {
  stage.classList.remove("stage-shake");
  void stage.offsetWidth;
  stage.classList.add("stage-shake");
}

function zoomPhoto() {
  photo.classList.remove("snoep-alert");
  void photo.offsetWidth;
  photo.classList.add("snoep-alert");
}

function saySnoep() {
  stopEverything();

  headline.textContent = "SNOEP DETECTED";
  caption.textContent = "Mieshka heard the magic word. Bunny speed increasing.";
  badge.textContent = "Snoep Mode";

  flashSnoepText();
  shakeStage();

  let step = 0;

  function runSnoepSequence() {
    if (step >= snoepSequence.length) {
      headline.textContent = "Mieshka has arrived";
      caption.textContent = "Human resistance has failed. Treats must be delivered.";
      badge.textContent = "Snoep mission complete";
      return;
    }

    photo.src = snoepSequence[step];
    badge.textContent = `Snoep ${step + 1}`;
    zoomPhoto();

    const delay = snoepSpeeds[step];
    step++;

    snoepTimeout = setTimeout(runSnoepSequence, delay);
  }

  runSnoepSequence();
}

stage.addEventListener("click", nextPhoto);
prevButton.addEventListener("click", previousPhoto);
nextButton.addEventListener("click", nextPhoto);
playButton.addEventListener("click", playGallery);
snoepButton.addEventListener("click", saySnoep);
stopButton.addEventListener("click", stopEverything);

updateGalleryPhoto(0);
