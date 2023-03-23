import React, { useState, useRef } from 'react';
import { useSpring, animated } from 'react-spring';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { Canvas, useThree, useFrame } from 'react-three-fiber';
import './styles.css';

function Sphere() {
  const meshRef = useRef();
  useFrame(() => {
    meshRef.current.rotation.x += 0.01;
    meshRef.current.rotation.y += 0.01;
  });

  return (
    <mesh ref={meshRef}>
      <sphereBufferGeometry args={[1, 32, 32]} />
      <meshStandardMaterial roughness={0.5} metalness={1} color={'#e74c3c'} />
    </mesh>
  );
}

function Scene() {
  const controlsRef = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controlsRef.current.update());

  return (
    <>
      <OrbitControls ref={controlsRef} args={[camera, gl.domElement]} />
      <ambientLight intensity={0.5} />
      <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
      <Sphere />
    </>
  );
}

function App() {
  const [showSphere, setShowSphere] = useState(false);
  const fadeIn = useSpring({ opacity: showSphere ? 1 : 0, from: { opacity: 0 } });
  const scaleUp = useSpring({ scale: showSphere ? 1 : 0, from: { scale: 0 } });

  return (
    <div className="container">
      <div className="button-container">
        <button onClick={() => setShowSphere(!showSphere)}>Toggle Sphere</button>
      </div>
      <div className="canvas-container">
        <animated.div style={fadeIn}>
          <Canvas>
            <Scene />
          </Canvas>
        </animated.div>
        <animated.div style={scaleUp} className="overlay" />
      </div>
    </div>
  );
}

export default App;
