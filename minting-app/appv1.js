var IS_MOBILE = window.matchMedia("only screen and (max-width: 760px)").matches;

function randomStep(startingPos) {
  var dx = Math.random() * 2 - 1;
  var dy = Math.random() * 2 - 1;
  var dz = Math.random() * 2 - 1;
  return {
    x: startingPos.x + dx,
    y: startingPos.y + dy,
    z: startingPos.z + dz,
  };
}

function moveRandomly(e) {
  var currentPos = e.target.getAttribute("position");
  var newPos = randomStep(currentPos);
  var animation = {
    property: "position",
    from: currentPos,
    to: newPos,
    dur: 2000,
  };

  e.target.setAttribute("animation", animation);
}

function spawnCircles(cameraEl) {
  for (var i = 0; i < 3; i++) {
    var hiddenMon = document.createElement("a-sphere");
    hiddenMon.setAttribute("battle-trigger", true);

    cameraEl.parentElement.insertBefore(hiddenMon, cameraEl);
  }
}

AFRAME.registerComponent("battle-trigger", {
  init: function () {
    var startingPos = { x: 0, y: 3, z: -5 };
    var animation = {
      property: "position",
      from: startingPos,
      to: randomStep(startingPos),
      dur: 2000,
    };

    this.el.setAttribute("animation", animation);
    this.el.object3D.scale.set(0.2, 0.2, 0.2);
    this.el.setAttribute("look-at", "#camera");

    this.el.addEventListener("animationcomplete", moveRandomly);

    this.el.addEventListener("click", function (evt) {
      console.log("Battle!");
    });
  },
});

window.addEventListener("load", function () {
  var cameraEl = document.getElementById("camera");

  spawnCircles(cameraEl);

  if (IS_MOBILE) {
    cameraEl.setAttribute(
      "look-controls",
      "touchEnabled: false; mouseEnabled: false;"
    );
  }
});
