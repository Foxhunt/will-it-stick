"use client";

import type { Dispatch, SetStateAction } from "react";
import { useState } from "react";

import { WordProps } from "./word";

interface InputProps {
  setWords: Dispatch<SetStateAction<WordProps[]>>;
}

export default function Input({ setWords }: InputProps) {
  const [value, setValue] = useState("sh*t!");

  return (
    <form
      className="flex"
      onSubmit={async (event) => {
        event.preventDefault();

        if (value !== "") {
          setWords((words) => [...words, { word: value, id: Math.random() }]);
        }
      }}
    >
      <input
        autoFocus
        value={value}
        onChange={(event) => setValue(event.target.value)}
        type="text"
        className="flex-1 text-black rounded-md px-2 focus:outline-none "
      />
      <button type="submit" className="w-1/6">
        Yeet
      </button>
    </form>
  );
}
