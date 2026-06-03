const decisionZone = document.querySelector("#decision-zone");
const decisionButtons = document.querySelector(".decision-buttons");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const form = document.querySelector("#booking-form");
const dateInput = document.querySelector('input[name="date"]');

let noButtonEscapes = 0;

function moveNoButton() {
  if (!decisionButtons || !noButton || !yesButton) {
    return;
  }

  const arenaRect = decisionButtons.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const yesRect = yesButton.getBoundingClientRect();
  const padding = 12;
  const bottomPadding = 24;
  const safeTop = yesRect.bottom - arenaRect.top + 12;
  const maxX = Math.max(arenaRect.width - buttonRect.width - padding * 2, 0);
  const maxY = Math.max(arenaRect.height - buttonRect.height - safeTop - bottomPadding, 0);

  const nextX = Math.random() * maxX + padding;
  const nextY = Math.random() * maxY + safeTop;

  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
  noButton.style.right = "auto";

  noButtonEscapes += 1;
  if (noButtonEscapes > 5) {
    noButton.textContent = "wirklich nein?";
  }
  if (noButtonEscapes > 10) {
    noButton.textContent = "der button glaubt dir nicht";
  }
}

yesButton?.addEventListener("click", () => {
  window.location.href = "date.html";
});

["mouseenter", "focus", "touchstart"].forEach((eventName) => {
  noButton?.addEventListener(eventName, moveNoButton, { passive: true });
});

if (dateInput) {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  dateInput.min = `${year}-${month}-${day}`;
}
