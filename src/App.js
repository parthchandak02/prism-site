import * as THREE from 'three'
import { useRef, useCallback, useState } from 'react'
import { Canvas, useLoader, useFrame } from '@react-three/fiber'
import { Center, Text3D } from '@react-three/drei'
import { Bloom, EffectComposer, LUT } from '@react-three/postprocessing'
import { LUTCubeLoader } from 'postprocessing'
import { Beam } from './components/Beam'
import { Rainbow } from './components/Rainbow'
import { Prism } from './components/Prism'
import { Flare } from './components/Flare'
import { Box } from './components/Box'
import { calculateRefractionAngle, lerp, lerpV3 } from './util'

export default function App() {
  const texture = useLoader(LUTCubeLoader, process.env.PUBLIC_URL + '/lut/F-6800-STD.cube')
  const [lightMode, setLightMode] = useState(false)
  
  return (
    <div style={{ width: '100vw', height: '100vh', position: 'relative' }}>
      {/* Light Toggle Button */}
      <button
        onClick={() => setLightMode(!lightMode)}
        style={{
          position: 'absolute',
          top: '20px',
          right: '20px',
          zIndex: 1000,
          padding: '10px 15px',
          backgroundColor: lightMode ? '#333' : '#fff',
          color: lightMode ? '#fff' : '#333',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          fontSize: '14px',
          fontWeight: 'bold',
          boxShadow: '0 2px 10px rgba(0,0,0,0.3)'
        }}
      >
        {lightMode ? '🌙' : '☀️'} {lightMode ? 'Dark' : 'Light'}
      </button>
      
      <Canvas orthographic gl={{ antialias: false }} camera={{ position: [0, 0, 100], zoom: 60 }}>
        <color attach="background" args={[lightMode ? 'white' : 'black']} />
        <Scene lightMode={lightMode} />
        <EffectComposer disableNormalPass>
          <Bloom mipmapBlur levels={9} intensity={1.5} luminanceThreshold={1} luminanceSmoothing={1} />
          <LUT lut={texture} />
        </EffectComposer>
      </Canvas>
    </div>
  )
}

function Scene({ lightMode }) {
  const [isPrismHit, hitPrism] = useState(false)
  const flare = useRef(null)
  const ambient = useRef(null)
  const spot = useRef(null)
  const boxreflect = useRef(null)
  const rainbow = useRef(null)

  const rayOut = useCallback(() => hitPrism(false), [])
  const rayOver = useCallback((e) => {
    // Break raycast so the ray stops when it touches the prism
    e.stopPropagation()
    hitPrism(true)
    // Set the intensity really high on first contact
    rainbow.current.material.speed = 1
    rainbow.current.material.emissiveIntensity = 20
  }, [])

  const vec = new THREE.Vector3()
  const rayMove = useCallback(({ api, position, direction, normal }) => {
    if (!normal) return
    // Extend the line to the prisms center
    vec.toArray(api.positions, api.number++ * 3)
    // Set flare
    flare.current.position.set(position.x, position.y, -0.5)
    flare.current.rotation.set(0, 0, -Math.atan2(direction.x, direction.y))
    // Calculate refraction angles
    let angleScreenCenter = Math.atan2(-position.y, -position.x)
    const normalAngle = Math.atan2(normal.y, normal.x)
    // The angle between the ray and the normal
    const incidentAngle = angleScreenCenter - normalAngle
    // Calculate the refraction for the incident angle
    const refractionAngle = calculateRefractionAngle(incidentAngle) * 6
    // Apply the refraction
    angleScreenCenter += refractionAngle
    rainbow.current.rotation.z = angleScreenCenter
    // Set spot light
    lerpV3(spot.current.target.position, [Math.cos(angleScreenCenter), Math.sin(angleScreenCenter), 0], 0.05)
    spot.current.target.updateMatrixWorld()
  }, [])

  useFrame((state) => {
    // Tie beam to the mouse
    boxreflect.current.setRay([(state.pointer.x * state.viewport.width) / 2, (state.pointer.y * state.viewport.height) / 2, 0], [0, 0, 0])
    // Animate rainbow intensity
    lerp(rainbow.current.material, 'emissiveIntensity', isPrismHit ? 2.5 : 0, 0.1)
    spot.current.intensity = rainbow.current.material.emissiveIntensity
    // Animate ambience
    lerp(ambient.current, 'intensity', lightMode ? 0.8 : 0, 0.025)
  })

  const textColor = lightMode ? '#333' : '#fff'

  return (
    <>
      {/* Lights */}
      <ambientLight ref={ambient} intensity={lightMode ? 0.8 : 0} />
      <pointLight position={[10, -10, 0]} intensity={0.05} />
      <pointLight position={[0, 10, 0]} intensity={0.05} />
      <pointLight position={[-10, 0, 0]} intensity={0.05} />
      <spotLight ref={spot} intensity={1} distance={7} angle={1} penumbra={1} position={[0, 0, 1]} />
      {/* Caption */}
      <Center position={[0, 1.2, 0]}>
        <Text3D size={0.5} letterSpacing={-0.02} height={0.05} font={process.env.PUBLIC_URL + "/fonts/Inter_Bold.json"}>
          Parth Chandak
          <meshStandardMaterial color={textColor} />
        </Text3D>
      </Center>
      {/* Attribution */}
      <Center position={[0, -4.5, 0]}>
        <Text3D size={0.15} letterSpacing={-0.02} height={0.02} font={process.env.PUBLIC_URL + "/fonts/Inter_Bold.json"}>
          taken from: https://codesandbox.io/p/sandbox/j3ycvl
          <meshStandardMaterial color={textColor} />
        </Text3D>
      </Center>
      {/* Prism + blocks + reflect beam */}
      <Beam ref={boxreflect} bounce={10} far={20}>
        <Prism position={[0, -0.5, 0]} onRayOver={rayOver} onRayOut={rayOut} onRayMove={rayMove} />
        <Box position={[2.25, -3.5, 0]} rotation={[0, 0, Math.PI / 3.5]} />
        <Box position={[-2.5, -2.5, 0]} rotation={[0, 0, Math.PI / 4]} />
        <Box position={[-3, 1, 0]} rotation={[0, 0, Math.PI / 4]} />
      </Beam>
      {/* Rainbow and flares */}
      <Rainbow ref={rainbow} startRadius={0} endRadius={0.5} fade={0} />
      <Flare ref={flare} visible={isPrismHit} renderOrder={10} scale={1.25} streak={[12.5, 20, 1]} />
    </>
  )
}
