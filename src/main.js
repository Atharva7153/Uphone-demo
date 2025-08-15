import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

gsap.registerPlugin(ScrollTrigger);

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x000000); // Set background to black
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const renderer = new THREE.WebGLRenderer({ antialias: false });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Studio Lighting Setup
// Key Light - main light source
const keyLight = new THREE.DirectionalLight(0xffffff, 4.0);
keyLight.position.set(5, 10, 10);
scene.add(keyLight);

// Fill Light - blue tint for contrast
const fillLight = new THREE.DirectionalLight(0x4a90e2, 2.0);
fillLight.position.set(-8, 5, 5);
scene.add(fillLight);

// Rim Light (Back Light) - warm orange for depth
const rimLight = new THREE.DirectionalLight(0xff6b35, 2.5);
rimLight.position.set(0, 10, -10);
scene.add(rimLight);

// Top light - bright white from above
const topLight = new THREE.DirectionalLight(0xffffff, 3.0);
topLight.position.set(0, 20, 0);
scene.add(topLight);

// Bottom light - subtle upward lighting
const bottomLight = new THREE.DirectionalLight(0x87ceeb, 1.5);
bottomLight.position.set(0, -10, 0);
scene.add(bottomLight);

// Ambient light for overall illumination
const ambientLight = new THREE.AmbientLight(0x404040, 0.8);
scene.add(ambientLight);

// Point light for dramatic effect
const pointLight = new THREE.PointLight(0xffd700, 2.0, 20);
pointLight.position.set(3, 5, 3);
scene.add(pointLight);

// Add GLTF model
let mixer;
let activeCamera = camera;
let animationDuration = 0;
let animatedCamera = null;

// Content sections for scroll-triggered display
const contentSections = {
  intro: document.getElementById('intro'),
  design: document.getElementById('design'),
  technology: document.getElementById('technology'),
  camera: document.getElementById('camera'),
  battery: document.getElementById('battery'), // NEW SECTION
  finale: document.getElementById('finale')
};

// Debug: Check if content sections are found
console.log('Content sections found:', contentSections);
Object.entries(contentSections).forEach(([name, element]) => {
  if (element) {
    console.log(`✓ ${name} section found`);
  } else {
    console.log(`✗ ${name} section NOT found`);
  }
});

function findFirstPerspectiveCamera(object) {
  if (object.type === "PerspectiveCamera") return object;
  for (let child of object.children) {
    const found = findFirstPerspectiveCamera(child);
    if (found) return found;
  }
  return null;
}

// Function to show/hide content sections based on scroll progress
function updateContentVisibility(progress) {
  // Debug: Log progress
  console.log('Progress:', progress.toFixed(3));
  
  // Clear all active states first
  Object.values(contentSections).forEach(section => {
    if (section) section.classList.remove('active');
  });
  
  // CUSTOMIZE TIMING HERE:
  // progress is a number from 0 to 1 (0% to 100% of scroll)
  // Change these numbers to control when each section appears
  
  // GAP TIMING: Each section shows for a short time, then there's a gap
  if (progress >= 0.05 && progress < 0.15) {
    if (contentSections.intro) {
      contentSections.intro.classList.add('active');
      console.log('Activating intro section');
    }
  } else if (progress >= 0.25 && progress < 0.35) {
    if (contentSections.design) {
      contentSections.design.classList.add('active');
      console.log('Activating design section');
    }
  } else if (progress >= 0.45 && progress < 0.55) {
    if (contentSections.technology) {
      contentSections.technology.classList.add('active');
      console.log('Activating technology section');
    }
  } else if (progress >= 0.65 && progress < 0.75) {
    if (contentSections.camera) {
      contentSections.camera.classList.add('active');
      console.log('Activating camera section');
    }
  } else if (progress >= 0.85 && progress < 0.95) {
    if (contentSections.battery) {
      contentSections.battery.classList.add('active');
      console.log('Activating battery section');
    }
  } else if (progress >= 0.95) {
    if (contentSections.finale) {
      contentSections.finale.classList.add('active');
      console.log('Activating finale section');
    }
  }
  
  // Example 1: Equal spacing (current setup)
  // if (progress < 0.2) {
  //   if (contentSections.intro) contentSections.intro.classList.add('active');
  // } else if (progress < 0.4) {
  //   if (contentSections.design) contentSections.design.classList.add('active');
  // } else if (progress < 0.6) {
  //   if (contentSections.technology) contentSections.technology.classList.add('active');
  // } else if (progress < 0.8) {
  //   if (contentSections.camera) contentSections.camera.classList.add('active');
  // } else {
  //   if (contentSections.finale) contentSections.finale.classList.add('active');
  // }
  
  // Example 2: Quick intro, longer sections
  // if (progress < 0.1) {
  //   if (contentSections.intro) contentSections.intro.classList.add('active');
  // } else if (progress < 0.3) {
  //   if (contentSections.design) contentSections.design.classList.add('active');
  // } else if (progress < 0.5) {
  //   if (contentSections.technology) contentSections.technology.classList.add('active');
  // } else if (progress < 0.7) {
  //   if (contentSections.camera) contentSections.camera.classList.add('active');
  // } else {
  //   if (contentSections.finale) contentSections.finale.classList.add('active');
  // }
  
  // Example 3: Overlapping sections (multiple can show at once)
  // if (progress > 0.1) {
  //   if (contentSections.intro) contentSections.intro.classList.add('active');
  // }
  // if (progress > 0.3) {
  //   if (contentSections.design) contentSections.design.classList.add('active');
  // }
  // if (progress > 0.5) {
  //   if (contentSections.technology) contentSections.technology.classList.add('active');
  // }
  // if (progress > 0.7) {
  //   if (contentSections.camera) contentSections.camera.classList.add('active');
  // }
  // if (progress > 0.9) {
  //   if (contentSections.finale) contentSections.finale.classList.add('active');
  // }
}

const loader = new GLTFLoader();
loader.load(
  '/models/phone.glb',
  function (gltf) {
    scene.add(gltf.scene);

    // Find the first PerspectiveCamera in the scene graph (animated camera)
    const sceneCamera = findFirstPerspectiveCamera(gltf.scene);
    if (sceneCamera) {
      console.log('Found animated camera:', sceneCamera);
      animatedCamera = sceneCamera;
      activeCamera = sceneCamera;
      activeCamera.aspect = window.innerWidth / window.innerHeight;
      activeCamera.updateProjectionMatrix();
    } else {
      console.log('No animated camera found in model');
    }

    // Play animation if present
    if (gltf.animations && gltf.animations.length > 0) {
      console.log('Found animations:', gltf.animations.length);
      mixer = new THREE.AnimationMixer(gltf.scene);
      
      // Play all animations
      gltf.animations.forEach((clip, index) => {
        const action = mixer.clipAction(clip);
        action.play();
        console.log(`Playing animation ${index}:`, clip.name, 'duration:', clip.duration);
      });
      
      animationDuration = gltf.animations[0].duration;

      gsap.to({ animTime: 0 }, {
        animTime: animationDuration,
        scrollTrigger: {
          trigger: ".animation-section",
          start: "top top",
          end: "bottom bottom",
          scrub: true
        },
        onUpdate: function () {
          if (mixer) {
            const currentTime = this.targets()[0].animTime;
            
            // Clamp the animation time to prevent looping
            const clampedTime = Math.max(0, Math.min(currentTime, animationDuration));
            mixer.setTime(clampedTime);
            
            // Calculate scroll progress (0 to 1) - also clamped
            const progress = Math.max(0, Math.min(clampedTime / animationDuration, 1));
            
            // Update content visibility based on scroll progress
            updateContentVisibility(progress);
            
            // Update the animated camera if it exists
            if (animatedCamera) {
              // Force update the camera's world matrix
              animatedCamera.updateMatrixWorld(true);
              
              // Copy the animated camera's properties to our active camera
              activeCamera.position.copy(animatedCamera.position);
              activeCamera.rotation.copy(animatedCamera.rotation);
              activeCamera.quaternion.copy(animatedCamera.quaternion);
              activeCamera.fov = animatedCamera.fov;
              activeCamera.near = animatedCamera.near;
              activeCamera.far = animatedCamera.far;
              activeCamera.updateProjectionMatrix();
            }
          }
        }
      });
    } else {
      console.log('No animations found in model');
    }
  },
  undefined,
  function (error) {
    console.error('An error happened while loading the GLTF model:', error);
  }
);

// Responsive resize
window.addEventListener('resize', () => {
  if (activeCamera && activeCamera.isPerspectiveCamera) {
    activeCamera.aspect = window.innerWidth / window.innerHeight;
    activeCamera.updateProjectionMatrix();
  }
  renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize interactive sections when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, initializing interactive sections...');
  console.log('Document body:', document.body);
  console.log('Interactive sections container:', document.querySelector('.interactive-sections'));
  initInteractiveSections();
});

// Also try on window load as backup
window.addEventListener('load', () => {
  console.log('Window loaded, checking interactive sections...');
  if (!document.querySelector('.section-btn')) {
    console.log('Buttons not found on window load');
  }
});

// Interactive sections functionality
function initInteractiveSections() {
  console.log('Initializing interactive sections...');
  const sectionButtons = document.querySelectorAll('.section-btn');
  const hiddenSections = document.querySelectorAll('.hidden-section');
  const faqItems = document.querySelectorAll('.faq-item');
  
  console.log('Found section buttons:', sectionButtons.length);
  console.log('Found hidden sections:', hiddenSections.length);
  console.log('Found FAQ items:', faqItems.length);
  
  // Section button functionality
  sectionButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      console.log('Button clicked:', button.textContent);
      e.preventDefault();
      e.stopPropagation();
      
      const target = button.getAttribute('data-target');
      console.log('Target section:', target);
      
      // Hide all sections first
      hiddenSections.forEach(section => {
        section.classList.remove('active');
      });
      
      // Remove active class from all buttons
      sectionButtons.forEach(btn => {
        btn.classList.remove('active');
      });
      
      // Show target section and activate button
      const targetSection = document.getElementById(target);
      console.log('Found target section:', targetSection);
      if (targetSection) {
        targetSection.classList.add('active');
        button.classList.add('active');
        console.log('Section activated:', target);
      }
    });
  });
  
  // FAQ toggle functionality
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');
    
    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      
      // Close all other FAQ items
      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });
      
      // Toggle current item
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });
  
  // Close sections when clicking outside
  document.addEventListener('click', (e) => {
    if (!e.target.closest('.interactive-sections')) {
      hiddenSections.forEach(section => {
        section.classList.remove('active');
      });
      sectionButtons.forEach(btn => {
        btn.classList.remove('active');
      });
    }
  });
}

function animate() {
  requestAnimationFrame(animate);
  
  // Debug: Log camera position every 60 frames (1 second at 60fps)
  if (Math.floor(Date.now() / 1000) % 2 === 0) {
    console.log('Active camera position:', activeCamera.position);
    if (animatedCamera) {
      console.log('Animated camera position:', animatedCamera.position);
    }
  }
  
  // Do NOT call mixer.update here for scroll-based animation
  renderer.render(scene, activeCamera);
}

animate();