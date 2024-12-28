import React, { useRef } from 'react';
    import { useFrame } from '@react-three/fiber';
    import * as THREE from 'three';

    function Rose() {
      const meshRef = useRef();
      const color = new THREE.Color('#e91e63');

      useFrame(() => {
        if (meshRef.current) {
          meshRef.current.rotation.y += 0.005;
        }
      });

      const points = [];
      for (let i = 0; i < 20; i++) {
        const angle = (i / 20) * Math.PI * 2;
        const radius = 1 + Math.sin(angle * 3) * 0.5;
        const x = Math.cos(angle) * radius;
        const y = Math.sin(angle) * radius;
        const z = Math.sin(angle * 5) * 0.3;
        points.push(new THREE.Vector3(x, y, z));
      }

      const curve = new THREE.CatmullRomCurve3(points);
      const geometry = new THREE.TubeGeometry(curve, 64, 0.2, 8, false);

      return (
        <mesh ref={meshRef}>
          <meshStandardMaterial color={color} side={THREE.DoubleSide} />
          <primitive object={geometry} attach="geometry" />
        </mesh>
      );
    }

    export default Rose;
