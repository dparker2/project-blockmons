import "./ui.scss";

function showWithText(el: HTMLElement, text: string) {
  el.style.display = "block";
  el.innerText = text;
}

function hide(el: HTMLElement) {
  el.style.display = "none";
}

window.addEventListener("load", () => {
  const sceneEl: HTMLElement = document.getElementById("scene");
  const thereTheyAreTextbox: HTMLElement =
    document.getElementById("there-they-are");
  const combatActionMenu: HTMLElement =
    document.getElementById("combat-action-menu");

  showWithText(
    thereTheyAreTextbox,
    "There they are!\nFocus on one to enter combat!"
  );

  sceneEl.addEventListener("enterCombat", () => {
    hide(thereTheyAreTextbox);
    showWithText(combatActionMenu, "Fight!");
  });
});
