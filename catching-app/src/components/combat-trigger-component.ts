import AFRAME, { DetailEvent, Entity } from "aframe";

/**
 *
 */
AFRAME.registerComponent("combat-trigger", {
  schema: {},
  init: function () {
    this.el.addEventListener(
      "click",
      (event: DetailEvent<{ cursorEl: Entity }>) => {
        this.el.sceneEl.emit("enterCombat", { id: event.target.id });
        console.log(this.el.attributes.animation);
      }
    );
  },
});
