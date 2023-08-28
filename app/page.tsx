"use client";

import { useState } from "react";

import Input from "@/components/input";
import Scene from "@/components/scene";
import { WordProps } from "@/components/word";

export default function Home() {
  const [words, setWords] = useState<WordProps[]>([]);

  return (
    <div className="min-h-[100svh] grid grid-rows-[1fr_30px]">
      <Scene words={words} setWords={setWords} />
      <Input setWords={setWords} />
    </div>
  );
}
