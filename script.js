const decisionButtons = document.querySelector("#decision-buttons");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
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
  const safeTop = yesRect.bottom - arenaRect.top + 16;
  const maxX = Math.max(arenaRect.width - buttonRect.width - padding * 2, 0);
  const maxY = Math.max(arenaRect.height - buttonRect.height - safeTop - padding, 0);

  const nextX = Math.random() * maxX + padding;
  const nextY = Math.random() * maxY + safeTop;

  noButton.style.left = `${nextX}px`;
  noButton.style.top = `${nextY}px`;
  noButton.style.right = "auto";

  noButtonEscapes += 1;

  if (noButtonEscapes > 2) {
    noButton.textContent = "sicher, power move?";
  }
  if (noButtonEscapes > 5) {
    noButton.textContent = "das wirkt nicht nach Elvira";
  }
  if (noButtonEscapes > 8) {
    noButton.textContent = "der button glaubt an Vodka Cranberry";
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
