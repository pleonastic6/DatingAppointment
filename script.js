const textarea = document.querySelector("#draft");

if (textarea) {
  const resize = () => {
    textarea.style.height = "auto";
    textarea.style.height = `${Math.max(textarea.scrollHeight, 360)}px`;
  };

  textarea.addEventListener("input", resize);
  resize();
}
