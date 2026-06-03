const decisionZone = document.querySelector("#decision-zone");
const decisionButtons = document.querySelector(".decision-buttons");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const form = document.querySelector("#booking-form");
const resultCard = document.querySelector("#result-card");
const resultText = document.querySelector("#result-text");

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

form?.addEventListener("submit", (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const idea = formData.get("idea");
  const date = formData.get("date");
  const time = formData.get("time");
  const note = formData.get("note");

  const summary = [
    `Elvira, das sieht offiziell ziemlich nach einem Date aus.`,
    `Plan: ${idea}.`,
    `Zeitpunkt: ${date} um ${time}.`,
    note ? `Notiz dazu: "${note}". Das klingt sehr akzeptabel.` : "Keine Zusatznotiz. Mutig. Respekt.",
    "Naechster Schritt: kurz bestaetigen und dann glorreich charmant sein.",
  ].join(" ");

  resultText.textContent = summary;
  resultCard.hidden = false;
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
