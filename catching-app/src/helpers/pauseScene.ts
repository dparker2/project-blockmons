import AFrame from "aframe";

export default function () {
  const scene = AFrame.scenes[0];
  const interval = setInterval(() => {
    if (scene.hasLoaded) {
      scene.pause();
      clearInterval(interval);
    }
  }, 10);
}
