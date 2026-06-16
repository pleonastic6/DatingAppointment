const choiceInputs = document.querySelectorAll('.choice-card input[type="radio"]');

function syncChoiceStates() {
  document.querySelectorAll(".choice-card").forEach((card) => {
    const input = card.querySelector('input[type="radio"]');
    if (!input) {
      return;
    }
    card.classList.toggle("is-selected", input.checked);
  });
}

choiceInputs.forEach((input) => {
  input.addEventListener("change", syncChoiceStates);
});

syncChoiceStates();
