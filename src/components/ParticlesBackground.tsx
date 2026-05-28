import { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ParticlesBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const canvas = canvasRef.current;

    // Track mouse coordinates
    const mouse = { x: 0, y: 0, targetX: 0, targetY: 0 };
    const onMouseMove = (event: MouseEvent) => {
      // Normalize mouse coordinates to [-1, 1] relative to viewport
      mouse.targetX = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.targetY = -(event.clientY / window.innerHeight) * 2 + 1;
    };

    window.addEventListener('mousemove', onMouseMove);

    // Initial width & height
    let width = container.clientWidth;
    let height = container.clientHeight;

    // Three.js Scene Setup
    const scene = new THREE.Scene();
    
    // Perspective camera for natural volumetric depth and scale
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 100);
    camera.position.z = 25;

    // Transparent WebGLRenderer
    const renderer = new THREE.WebGLRenderer({
      canvas: canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Dynamic offscreen canvas texture generator for smooth, high-fidelity circular bokeh
    const createBokehTexture = (): THREE.CanvasTexture => {
      const textureCanvas = document.createElement('canvas');
      textureCanvas.width = 32;
      textureCanvas.height = 32;
      const ctx = textureCanvas.getContext('2d');
      if (ctx) {
        // Soft radial gradient simulating lens defocus with increased brightness
        const gradient = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.85)');
        gradient.addColorStop(0.6, 'rgba(255, 255, 255, 0.35)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 32, 32);
      }
      const tex = new THREE.CanvasTexture(textureCanvas);
      tex.needsUpdate = true;
      return tex;
    };

    const bokehTexture = createBokehTexture();

    // Particle Setup Configuration
    const count = 360; // Increased particle density for higher visibility and presence
    const geometry = new THREE.BufferGeometry();
    
    const positions = new Float32Array(count * 3);

    // Local physics representation for each individual particle
    interface ParticleData {
      baseX: number;
      baseY: number;
      baseZ: number;
      speed: number;
      angleX: number;
      angleY: number;
      angleZ: number;
      displacementX: number;
      displacementY: number;
      displacementZ: number;
    }

    const particlesData: ParticleData[] = [];

    // Distribute particles evenly throughout a 3D container volume
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 45;
      const y = (Math.random() - 0.5) * 40;
      const z = (Math.random() - 0.5) * 30; // Volumetric depth range

      positions[i * 3] = x;
      positions[i * 3 + 1] = y;
      positions[i * 3 + 2] = z;

      particlesData.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        speed: 0.01 + Math.random() * 0.015, // Slow atmospheric drift speed
        angleX: Math.random() * Math.PI * 2,
        angleY: Math.random() * Math.PI * 2,
        angleZ: Math.random() * Math.PI * 2,
        displacementX: 0,
        displacementY: 0,
        displacementZ: 0,
      });
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    // Points material utilizing blending and canvas-generated defocus bokeh
    const material = new THREE.PointsMaterial({
      size: 0.52, // Enlarged visual particle diameter for beautiful depth readability
      map: bokehTexture,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      color: 0xe4e4e7, // Soft warm zinc-200 monochromatic hue
      opacity: 0.72, // Increased core opacity for enhanced starlight visibility
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // Responsive aspect-ratio listener
    const onResize = () => {
      if (!container) return;
      width = container.clientWidth;
      height = container.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener('resize', onResize);

    const clock = new THREE.Clock();
    let animationFrameId: number;

    // Interactive Proximity parameters
    const repulsionRadius = 9.0; // Proximity trigger distance in 3D units
    const repulsionForce = 0.08; // Delicate repulsion acceleration factor
    const damping = 0.94; // Premium spring damping decay factor

    // Core Animation Frame Loop
    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const time = clock.getElapsedTime();

      // Fluid cursor movement easing
      mouse.x += (mouse.targetX - mouse.x) * 0.07;
      mouse.y += (mouse.targetY - mouse.y) * 0.07;

      // Project cursor coordinate onto the depth plane inside the perspective view frustum
      const mouse3D = new THREE.Vector3(
        mouse.x * camera.aspect * 14.5,
        mouse.y * 12,
        0
      );

      const posAttribute = geometry.attributes.position as THREE.BufferAttribute;

      for (let i = 0; i < count; i++) {
        const data = particlesData[i];

        // 1. Slow upward ambient drift
        data.baseY += data.speed;

        // Wrap around vertically once out of bounds, maintaining consistent density
        if (data.baseY > 20) {
          data.baseY = -20;
          data.baseX = (Math.random() - 0.5) * 45;
        }

        // 2. Slow organic multi-wave oscillation (sine-cosine wind drift)
        const driftX = data.baseX + Math.sin(time * 0.15 + data.angleX) * 1.5;
        const driftY = data.baseY + Math.cos(time * 0.12 + data.angleY) * 0.6;
        const driftZ = data.baseZ + Math.sin(time * 0.2 + data.angleZ) * 1.2;

        const currentPos = new THREE.Vector3(
          posAttribute.getX(i),
          posAttribute.getY(i),
          posAttribute.getZ(i)
        );

        // 3. Proximity Mouse Interaction
        const dist = mouse3D.distanceTo(currentPos);

        if (dist < repulsionRadius) {
          // Repulse particles away from normalized pointer position
          const forceDir = new THREE.Vector3().subVectors(currentPos, mouse3D);
          forceDir.z *= 0.15; // Limit z-push to keep movement elegant and screen-aligned
          
          // Exponential decay force scale
          const forcePower = (1 - dist / repulsionRadius) * repulsionForce;
          
          data.displacementX += forceDir.x * forcePower;
          data.displacementY += forceDir.y * forcePower;
          data.displacementZ += forceDir.z * forcePower;
        }

        // Apply damping to slowly snap particles back to their organic paths
        data.displacementX *= damping;
        data.displacementY *= damping;
        data.displacementZ *= damping;

        // Final composite coordinate mapping
        posAttribute.setXYZ(
          i,
          driftX + data.displacementX,
          driftY + data.displacementY,
          driftZ + data.displacementZ
        );
      }

      posAttribute.needsUpdate = true;

      // Subtle atmospheric continuous global rotations
      points.rotation.y = time * 0.004;
      points.rotation.x = time * 0.002;

      renderer.render(scene, camera);
    };

    animate();

    // Critical Performance Cleanup
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);

      // Clean up GPU heap allocation
      geometry.dispose();
      material.dispose();
      bokehTexture.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 pointer-events-none overflow-hidden"
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full"
      />
      {/* Cinematic radial vignette overlay to frame the hero content beautifully */}
      <div 
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle at center, rgba(10, 10, 12, 0) 35%, rgba(10, 10, 12, 0.75) 90%)',
        }}
      />
    </div>
  );
}
