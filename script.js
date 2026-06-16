const yesButton = document.querySelector("#yes-button");
const moreButton = document.querySelector("#more-button");
const extraPanel = document.querySelector("#extra-panel");
const replyCard = document.querySelector("#reply-card");
const replyTitle = document.querySelector("#reply-title");
const replyCopy = document.querySelector("#reply-copy");
const intentInput = document.querySelector("#intent-input");

function revealReply(intent) {
  if (!replyCard || !intentInput || !replyTitle || !replyCopy) {
    return;
  }

  intentInput.value = intent;

  if (intent === "more") {
    replyTitle.textContent = "Fair. Dann sag mir, was fuer dich gut klingen wuerde.";
    replyCopy.textContent =
      "Du musst dich nicht sofort festlegen. Ein grober Favorit oder ein kurzer Kommentar reicht.";
  } else {
    replyTitle.textContent = "Dann sag mir kurz, worauf du Lust haettest.";
    replyCopy.textContent =
      "Ein kurzer Favorit und ein grober Zeitpunkt reichen vollkommen.";
  }

  replyCard.hidden = false;
  replyCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

yesButton?.addEventListener("click", () => {
  revealReply("yes");
});

moreButton?.addEventListener("click", () => {
  if (extraPanel) {
    extraPanel.hidden = false;
  }
  revealReply("more");
});
