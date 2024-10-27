// Ensure GSAP is imported in HTML <head> before this script

// Variables
let mobile_media_query = window.matchMedia("(max-width: 400px)");
let tablet_media_query = window.matchMedia("(min-width: 400px) and (max-width: 600px)");
const notes = document.querySelectorAll(".js-note");

// Function to reset note sizes and states
function resetNotes() {
  notes.forEach(note => {
    if (note.classList.contains("active")) {
      note.classList.remove("active");
      gsap.set(note, { height: "30%", clearProps: "all" });
    }
  });
}

// Function to handle note expansion on click
function handleNoteClick(note, index) {
  if (note.classList.contains("active")) {
    note.classList.remove("active");
    gsap.set(note, { height: "30%", clearProps: "all" });
  } else {
    resetNotes();
    note.classList.add("active");
    let heightPercent;

    if (mobile_media_query.matches) {
      heightPercent = 125 + 40 * index;
    } else if (tablet_media_query.matches) {
      heightPercent = 80 + 21 * index;
    } else {
      heightPercent = 70 + 20 * index;
    }

    gsap.set(note, { height: `${heightPercent}%` });
  }
}

// Prepare the notes by adding click events
function prepareNotes() {
  gsap.to(".js-envelop-content", { height: "110%", duration: 0.5 });

  notes.forEach((note, index) => {
    note.addEventListener("click", () => handleNoteClick(note, index));
  });
}

// Function to set up the up paper of the envelope
function setupUpPaper() {
  gsap.set(".js-up-paper", {
    bottom: "97%",
    rotation: 180,
    zIndex: 200,
    clipPath: "polygon(0% 0%, 100% 0%, 50% 61%)",
    onComplete: prepareNotes
  });
}

// Function to start the up paper transition
function triggerEnvelopeTransition() {
  gsap.to(".js-up-paper", { bottom: "1%", duration: 0.25, onComplete: setupUpPaper });
  document.querySelector(".js-up-paper").removeEventListener("click", triggerEnvelopeTransition);
  document.querySelector(".js-up-paper").classList.remove("cursor");
}

// Function to simulate cutting the sticker
function cutSticker() {
  gsap.set(".js-sticker", { width: "20%", left: "-80%" });
  document.body.classList.remove("scissors");
  document.querySelector(".js-sticker").removeEventListener("click", cutSticker);
  document.querySelector(".js-up-paper").addEventListener("click", triggerEnvelopeTransition);
  document.querySelector(".js-up-paper").classList.add("cursor");
}

// Initialize event listeners on page load
function initialize() {
  document.querySelector(".js-sticker").addEventListener("click", cutSticker);
  window.addEventListener("resize", resetNotes);
}

initialize();
