const ThreeInit = {
  init() {
    if (typeof THREE !== 'undefined') {
      this.setupBackground();
    }
  },

  setupBackground() {
    const container = document.getElementById('three-canvas');
    if (!container) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    
    const renderer = new THREE.WebGLRenderer({ 
      alpha: true, 
      antialias: true 
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    const particlesGeometry = new THREE.BufferGeometry();
    const particlesCount = 1500;
    const posArray = new Float32Array(particlesCount * 3);

    for(let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 10;
    }

    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(posArray, 3));

    const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
    const particleColor = isDark ? 0xff0038 : 0xff0038;

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.02,
      color: particleColor,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    camera.position.z = 3;

    let mouseX = 0;
    let mouseY = 0;

    document.addEventListener('mousemove', (event) => {
      mouseX = event.clientX / window.innerWidth - 0.5;
      mouseY = event.clientY / window.innerHeight - 0.5;
    });

    const animate = () => {
      requestAnimationFrame(animate);

      particlesMesh.rotation.y += 0.0005;
      particlesMesh.rotation.x += 0.0002;

      particlesMesh.rotation.y += mouseX * 0.05;
      particlesMesh.rotation.x += mouseY * 0.05;

      renderer.render(scene, camera);
    };

    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (themeToggle) {
      themeToggle.addEventListener('click', () => {
        const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
        particlesMaterial.color.setHex(isDark ? 0xff4d6d : 0xff0038);
      });
    }

    window.threeScene = scene;
    window.threeRenderer = renderer;
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('three-canvas');
  if (canvas) {
    ThreeInit.init();
  }
});