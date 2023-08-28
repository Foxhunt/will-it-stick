"use client";

import { useEffect, useRef } from "react";

import { Center, Text3D } from "@react-three/drei";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";

export interface WordProps {
  word: string;
  id: number;
}

export default function Word({ word, id }: WordProps) {
  const rigidBody = useRef<RapierRigidBody>(null);

  useEffect(() => {
    setTimeout(() => {
      const lValue = 10;
      const lX = Math.random() * lValue * 2 - lValue;
      const lY = Math.random() * lValue + lValue;

      rigidBody.current?.setLinvel({ x: lX, y: lY, z: -lValue * 2 }, true);

      const aValue = 0.4;

      const aX = Math.random() * aValue * 2 - aValue;
      const aY = Math.random() * aValue * 2 - aValue;
      const aZ = Math.random() * aValue * 2 - aValue;

      rigidBody.current?.setAngvel({ x: aX, y: aY, z: aZ }, true);
    }, 0);
  }, []);

  return (
    <RigidBody ref={rigidBody} position={[0, -3, 0]} userData={{ id }}>
      <Center>
        <Text3D
          font="Roboto_Regular.json"
          bevelEnabled
          bevelThickness={0.2}
          bevelSize={0.05}
          bevelOffset={0}
          bevelSegments={4}
        >
          {word}
          <meshStandardMaterial
            color={"white"}
            metalness={0.4}
            roughness={0.9}
          />
        </Text3D>
      </Center>
    </RigidBody>
  );
}
