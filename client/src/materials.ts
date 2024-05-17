import * as THREE from "three";

export const defaultStarMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(70,70,70)",
});

export const starBlinkMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  // color: "rgb(255, 0, 136)",
  color: "#ddff00",
});

export const starEdgeMaterial = new THREE.LineDashedMaterial({
  color: "white",
});

export const ghostMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(100, 100, 225)",
});

export const defaultBambooMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(26,255,0)",
});

export const defaultBambooRootMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(114,100,21)",
});

export const defaultFlowerHubMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(255, 177, 225)",
});

export const defaultFlowerPetalMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  // color: "rgb(255,92,203)",
  color: "rgb(255, 0, 136)",
});

export const selectedMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "white",
});

export const hoveredMaterial = new THREE.MeshBasicMaterial({
  wireframe: true,
  color: "rgb(255,255,0)",
});

const texture = new THREE.TextureLoader().load("dirt.jpeg");
texture.wrapS = THREE.RepeatWrapping;
texture.wrapT = THREE.RepeatWrapping;
texture.repeat.set(64, 64);

export const dirtMaterial = new THREE.MeshBasicMaterial({
  map: texture,
  color: "rgb(135, 111, 89)",
});
