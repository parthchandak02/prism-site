import React from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing';
import { LUTCubeLoader } from 'postprocessing';
import Scene from './Scene';

const Canvas3D = ({ lightMode }) => {
  const texture = useLoader(LUTCubeLoader, process.env.PUBLIC_URL + '/lut/F-6800-STD.cube');

  return (
    <Canvas 
      orthographic 
      gl={{ antialias: false }} 
      camera={{ position: [0, 0, 100], zoom: 60 }}
    >
      <color attach="background" args={[lightMode ? 'white' : 'black']} />
      <Scene lightMode={lightMode} />
      <EffectComposer disableNormalPass>
        <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
        <LUT lut={texture} />
      </EffectComposer>
    </Canvas>
  );
};

export default Canvas3D; 