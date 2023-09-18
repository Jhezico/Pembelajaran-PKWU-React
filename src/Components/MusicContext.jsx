import React, { createContext, useState } from "react";
import { Howl } from "howler";
import SoundUtama from "../Assets/Sound-Utama.mp3";

const soundUtama = new Howl({
  src: [SoundUtama],
  volume: 0.5,
});

export const MusicContext = createContext();

export function MusicProvider({ children }) {
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      soundUtama.pause();
    } else {
      soundUtama.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  return (
    <MusicContext.Provider value={{ isMusicPlaying, toggleMusic }}>
      {children}
    </MusicContext.Provider>
  );
}
