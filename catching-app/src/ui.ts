function showWithText(el: HTMLElement, text: string) {
  el.style.display = "block";
  el.innerText = text;
}

function hide(el: HTMLElement) {
  el.style.display = "none";
}

window.addEventListener("load", () => {
  const sceneEl: HTMLElement = document.getElementById("scene");
  const bottomUITextbox: HTMLElement = document.querySelector(
    "#bottom-ui .textbox"
  );

  sceneEl.addEventListener("enterCombat", () => {
    hide(bottomUITextbox);
  });
});
