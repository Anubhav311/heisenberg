"use client";
import React, { useRef, useEffect } from "react";
import * as THREE from "three";

function CarbonAtomModel() {
  const canvasRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );

    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    canvasRef.current.appendChild(renderer.domElement);

    // Protons and neutrons
    const nucleus = new THREE.Group();
    scene.add(nucleus);

    const protonGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const protonMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });

    const neutronGeometry = new THREE.SphereGeometry(0.3, 16, 16);
    const neutronMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

    // Position protons and neutrons within the nucleus
    for (let i = 0; i < 6; i++) {
      const proton = new THREE.Mesh(protonGeometry, protonMaterial);
      proton.position.set(
        Math.random() - 0.5, // Random position within the nucleus
        Math.random() - 0.5,
        Math.random() - 0.5
      );
      nucleus.add(proton);

      const neutron = new THREE.Mesh(neutronGeometry, neutronMaterial);
      neutron.position.set(
        Math.random() - 0.5, // Random position within the nucleus
        Math.random() - 0.5,
        Math.random() - 0.5
      );
      nucleus.add(neutron);
    }

    // Electrons
    const electrons = new THREE.Group();
    scene.add(electrons);

    const electronGeometry = new THREE.SphereGeometry(0.2, 8, 8);
    const electronMaterial = new THREE.MeshBasicMaterial({ color: 0x0000ff });

    // Position electrons in two shells
    for (let i = 0; i < 2; i++) {
      const angle = (Math.PI / 2) * i;
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electron.position.set(Math.cos(angle) * 2, Math.sin(angle) * 2, 0);
      electrons.add(electron);
    }

    for (let i = 0; i < 4; i++) {
      const angle = (Math.PI / 2) * i;
      const electron = new THREE.Mesh(electronGeometry, electronMaterial);
      electron.position.set(Math.cos(angle) * 4, Math.sin(angle) * 4, 0);
      electrons.add(electron);
    }

    camera.position.z = 10;

    const animate = () => {
      requestAnimationFrame(animate);

      nucleus.rotation.x += 0.005;
      nucleus.rotation.y += 0.005;

      electrons.rotation.x += 0.01;
      electrons.rotation.y += 0.01;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      // Clean up resources
      renderer.dispose();
    };
  }, []);

  return <div ref={canvasRef} />;
}

export default CarbonAtomModel;
