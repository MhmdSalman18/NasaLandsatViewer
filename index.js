import * as THREE from "three";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.150.1/examples/jsm/controls/OrbitControls.js";
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75, // Field of View
  window.innerWidth / window.innerHeight, // Aspect Ratio
  0.1, // Near Clipping Plane
  1000 // Far Clipping Plane
);
camera.position.z = 5; // Move camera away from origin

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("container").appendChild(renderer.domElement);

// OrbitControls (optional, for user interactivity)
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // Adds inertia to controls
controls.dampingFactor = 0.05;

// Create a Sphere
const geometry = new THREE.SphereGeometry(1, 32, 32); // Radius, Width Segments, Height Segments
const material = new THREE.MeshStandardMaterial({
  color: 0x007bff,
  metalness: 0.5,
  roughness: 0.5,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

// Add a Light Source
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Animation Loop
function animate() {
  requestAnimationFrame(animate);

  // Rotate the sphere
  sphere.rotation.x += 0.01;
  sphere.rotation.y += 0.01;

  // Update controls
  controls.update();

  // Render the scene
  renderer.render(scene, camera);
}

animate();

// Handle Window Resize
window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  renderer.setSize(width, height);
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
});
