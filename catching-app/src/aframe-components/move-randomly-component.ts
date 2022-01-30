import AFRAME, { DetailEvent } from "aframe";
import { randomStep, Vector3 } from "../helpers";

function doAnimation(
  el: AFRAME.Entity,
  min: Vector3,
  max: Vector3,
  enabled: boolean
) {
  const from = el.object3D.position;
  const to = randomStep({
    current: el.object3D.position,
    min,
    max,
  });
  const animation = {
    property: "position",
    from,
    to,
    dur: 1000,
    enabled,
  };

  el.setAttribute("animation", animation);
}

/**
 * Must come after random-position in declarations
 * otherwise starting position is always 0, 0, 0
 */
AFRAME.registerComponent("move-randomly", {
  schema: {
    min: { type: "vec3", default: { x: -1, y: -1, z: -1 } },
    max: { type: "vec3", default: { x: 1, y: 1, z: 1 } },
    enabled: { type: "boolean", default: true },
  },
  init: function () {
    doAnimation(this.el, this.data.min, this.data.max, this.data.enabled);

    const repeat = (event: DetailEvent<{ name: string }>) => {
      doAnimation(
        event.target,
        this.data.min,
        this.data.max,
        this.data.enabled
      );
    };
    this.el.addEventListener("animationcomplete", repeat);
  },
});
