"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

export default function ReactLogoScene() {
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
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 50);
    const group = new THREE.Group();
    const clock = new THREE.Clock();

    camera.position.set(0, 0, 6);
    scene.add(group);

    const atomMaterial = new THREE.MeshBasicMaterial({
      blending: THREE.AdditiveBlending,
      color: "#61dafb",
      opacity: 0.86,
      transparent: true,
      wireframe: true,
    });

    for (let index = 0; index < 3; index += 1) {
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(1.55, 0.018, 14, 180),
        atomMaterial,
      );

      orbit.rotation.x = Math.PI / 2;
      orbit.rotation.y = (Math.PI / 3) * index;
      orbit.rotation.z = (Math.PI / 3) * index;
      group.add(orbit);
    }

    const core = new THREE.Mesh(
      new THREE.SphereGeometry(0.18, 28, 28),
      new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: "#61dafb",
        transparent: true,
      }),
    );
    group.add(core);

    const glow = new THREE.Mesh(
      new THREE.SphereGeometry(0.38, 28, 28),
      new THREE.MeshBasicMaterial({
        blending: THREE.AdditiveBlending,
        color: "#38bdf8",
        opacity: 0.18,
        transparent: true,
      }),
    );
    group.add(glow);

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

      group.rotation.x = Math.sin(elapsed * 0.5) * 0.28;
      group.rotation.y = elapsed * 0.85;
      group.rotation.z = Math.sin(elapsed * 0.36) * 0.16;
      glow.scale.setScalar(1 + Math.sin(elapsed * 2.2) * 0.12);
      renderer.render(scene, camera);
      frameId = window.requestAnimationFrame(render);
    };

    setSize();
    render();
    window.addEventListener("resize", setSize);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("resize", setSize);
      group.children.forEach((child) => {
        const mesh = child as THREE.Mesh<THREE.BufferGeometry, THREE.Material>;

        mesh.geometry.dispose();
        mesh.material.dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="h-full w-full"
      aria-hidden="true"
    />
  );
}
