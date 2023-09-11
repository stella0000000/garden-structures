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
  color: "rgb(255,0,0)",
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
