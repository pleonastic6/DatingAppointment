const decisionZone = document.querySelector("#decision-zone");
const yesButton = document.querySelector("#yes-button");
const noButton = document.querySelector("#no-button");
const form = document.querySelector("#booking-form");
const resultCard = document.querySelector("#result-card");
const resultText = document.querySelector("#result-text");

let noButtonEscapes = 0;

function moveNoButton() {
  if (!decisionZone || !noButton) {
    return;
  }

  const zoneRect = decisionZone.getBoundingClientRect();
  const buttonRect = noButton.getBoundingClientRect();
  const padding = 8;
  const maxX = Math.max(zoneRect.width - buttonRect.width - padding * 2, 0);
  const maxY = Math.max(zoneRect.height - buttonRect.height - padding * 2, 0);

  const nextX = Math.random() * maxX + padding;
  const nextY = Math.random() * maxY + padding;

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
  const name = formData.get("name");
  const idea = formData.get("idea");
  const slot = formData.get("slot");
  const note = formData.get("note");

  const summary = [
    `${name}, dein Antrag auf ein Date wurde mit auffallend hoher Prioritaet aufgenommen.`,
    `Geplanter Modus: ${idea}.`,
    `Vorgeschlagener Termin: ${slot}.`,
    note ? `Zusatzkommentar: "${note}". Klingt verhandelbar und sympathisch.` : "Kein Zusatzkommentar. Riskant selbstbewusst, aber okay.",
    "Naechster Schritt: kurz bestaetigen, dann romantisch effizient werden.",
  ].join(" ");

  resultText.textContent = summary;
  resultCard.hidden = false;
  resultCard.scrollIntoView({ behavior: "smooth", block: "nearest" });
});
