"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ThreeHeroScene() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;

    if (!canvas) {
      return;
    }

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      canvas,
    });
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(46, 1, 0.1, 120);
    const clock = new THREE.Clock();
    const networkGroup = new THREE.Group();
    const nodeGroup = new THREE.Group();

    camera.position.set(0, 0.6, 9);
    scene.add(networkGroup, nodeGroup);

    const palette = [
      new THREE.Color("#38bdf8"),
      new THREE.Color("#34d399"),
      new THREE.Color("#f472b6"),
      new THREE.Color("#facc15"),
    ];

    const nodeCount = 78;
    const nodePositions: THREE.Vector3[] = [];

    for (let index = 0; index < nodeCount; index += 1) {
      const layer = index % 4;
      const radius = 2.4 + layer * 1.05 + Math.random() * 0.85;
      const angle = index * 0.78 + Math.random() * 0.8;
      const height = (Math.random() - 0.5) * 5.8;
      const position = new THREE.Vector3(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius,
      );

      nodePositions.push(position);

      const nodeMaterial = new THREE.MeshBasicMaterial({
        color: palette[index % palette.length],
        transparent: true,
        opacity: 0.9,
      });
      const node = new THREE.Mesh(
        new THREE.SphereGeometry(0.035 + Math.random() * 0.035, 10, 10),
        nodeMaterial,
      );
      node.position.copy(position);
      nodeGroup.add(node);
    }

    const linePositions: number[] = [];
    const lineColors: number[] = [];

    nodePositions.forEach((position, index) => {
      const next = nodePositions[(index + 1) % nodePositions.length];
      const skip = nodePositions[(index + 9) % nodePositions.length];
      const color = palette[index % palette.length];

      [next, skip].forEach((target) => {
        linePositions.push(
          position.x,
          position.y,
          position.z,
          target.x,
          target.y,
          target.z,
        );
        lineColors.push(color.r, color.g, color.b, color.r, color.g, color.b);
      });
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(linePositions, 3),
    );
    lineGeometry.setAttribute(
      "color",
      new THREE.Float32BufferAttribute(lineColors, 3),
    );

    const lineMaterial = new THREE.LineBasicMaterial({
      blending: THREE.AdditiveBlending,
      opacity: 0.38,
      transparent: true,
      vertexColors: true,
    });

    const networkLines = new THREE.LineSegments(lineGeometry, lineMaterial);
    networkGroup.add(networkLines);

    const grid = new THREE.GridHelper(14, 36, "#0ea5e9", "#164e63");
    grid.position.y = -3.25;
    grid.material.opacity = 0.28;
    grid.material.transparent = true;
    networkGroup.add(grid);

    const waveGeometry = new THREE.RingGeometry(2.2, 2.24, 160);
    const waveMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: "#22d3ee",
      opacity: 0.28,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const waveRing = new THREE.Mesh(waveGeometry, waveMaterial);
    waveRing.rotation.x = Math.PI / 2;
    networkGroup.add(waveRing);

    const pulseGeometry = new THREE.SphereGeometry(0.11, 20, 20);
    const pulseMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: "#f472b6",
      transparent: true,
      opacity: 0.95,
    });
    const pulse = new THREE.Mesh(pulseGeometry, pulseMaterial);
    networkGroup.add(pulse);

    scene.add(new THREE.AmbientLight("#ffffff", 0.35));

    const setSize = () => {
      const { clientWidth, clientHeight } = canvas;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setSize(clientWidth, clientHeight, false);
      camera.aspect = clientWidth / Math.max(clientHeight, 1);
      camera.updateProjectionMatrix();
    };

    let frameId = 0;

    const render = () => {
      const elapsed = clock.getElapsedTime();
      const colorA = palette[Math.floor(elapsed * 0.45) % palette.length];
      const colorB = palette[(Math.floor(elapsed * 0.45) + 1) % palette.length];
      const mix = (Math.sin(elapsed * 1.4) + 1) / 2;

      networkGroup.rotation.y = elapsed * 0.08;
      networkGroup.rotation.x = Math.sin(elapsed * 0.22) * 0.08;
      nodeGroup.rotation.copy(networkGroup.rotation);

      lineMaterial.opacity = 0.26 + Math.sin(elapsed * 1.8) * 0.1;
      waveRing.scale.setScalar(1 + ((elapsed * 0.28) % 1.2));
      waveMaterial.opacity = 0.34 - ((elapsed * 0.28) % 1.2) * 0.2;

      const pulseIndex = Math.floor((elapsed * 16) % nodePositions.length);
      pulse.position.copy(nodePositions[pulseIndex]);
      pulseMaterial.color.copy(colorA).lerp(colorB, mix);

      nodeGroup.children.forEach((node, index) => {
        const mesh = node as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
        const pulseScale = 1 + Math.sin(elapsed * 2.2 + index * 0.35) * 0.34;

        mesh.scale.setScalar(pulseScale);
        mesh.material.color.copy(palette[index % palette.length]).lerp(colorB, mix * 0.45);
      });

      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    setSize();
    render();
    window.addEventListener("resize", setSize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", setSize);
      lineGeometry.dispose();
      lineMaterial.dispose();
      waveGeometry.dispose();
      waveMaterial.dispose();
      pulseGeometry.dispose();
      pulseMaterial.dispose();
      nodeGroup.children.forEach((node) => {
        const mesh = node as THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;

        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  );
}
