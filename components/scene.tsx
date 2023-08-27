"use client";

import type { Dispatch, SetStateAction } from "react";

import { OrbitControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import {
  Bloom,
  DepthOfField,
  EffectComposer,
} from "@react-three/postprocessing";
import { CuboidCollider, Physics } from "@react-three/rapier";

import Word, { WordProps } from "./word";

interface SceneProps {
  words: WordProps[];
  setWords: Dispatch<SetStateAction<WordProps[]>>;
}

export default function Scene({ words, setWords }: SceneProps) {
  return (
    <Canvas
      camera={{
        far: 4000,
      }}
    >
      <fog attach="fog" color={"black"} near={0} far={80} />
      <OrbitControls enableZoom enablePan enableRotate />
      <ambientLight intensity={0.2} />
      <pointLight position={[15, 0, -10]} intensity={200} color={0x00ff00} />
      <pointLight position={[-15, 0, -10]} intensity={200} color={0xff0000} />
      <Physics colliders="cuboid">
        {words.map(({ word, id }) => (
          <Word key={id} word={word} id={id} />
        ))}
        {/* wall */}
        <CuboidCollider
          position={[0, 0, -15]}
          args={[100, 100, 1]}
          sensor
          onIntersectionEnter={(event) => {
            const value = 10;

            event.other.rigidBody?.setLinearDamping(Math.random() * value);
            event.other.rigidBody?.setAngularDamping(Math.random() * value);
          }}
        />
        {/* floor */}
        <CuboidCollider
          position={[0, -30, -900]}
          args={[1000, 1, 1000]}
          sensor
          onIntersectionEnter={(event) => {
            setWords([
              ...words.filter(
                // @ts-ignore
                ({ id }) => id !== event.other.rigidBody?.userData.id,
              ),
            ]);
          }}
        />
      </Physics>
      <EffectComposer disableNormalPass>
        <Bloom
          luminanceThreshold={0}
          mipmapBlur
          luminanceSmoothing={0.0}
          intensity={6}
        />
        <DepthOfField
          target={[0, 0, 13]}
          focalLength={0.3}
          bokehScale={15}
          height={700}
        />
      </EffectComposer>
    </Canvas>
  );
}
