import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MusicContext } from "./MusicContext";
import SoundButtonClick from "../Assets/Sound-Button-Click.mp3";

const soundButtonClick = new Howl({
  src: [SoundButtonClick],
});

function ButtonLevel({ Text, Link }) {
  const navigate = useNavigate();
  const hoverButtonLevel =
    "hover:text-white hover:bg-red-600 hover:border-white hover:border-2 hover:scale-105";
  const transitionButtonLevel = "transition duration-500 ease-in-out transform";

  const { isMusicPlaying, toggleMusic } = useContext(MusicContext);

  return (
    <button
      className={`text-red-600 bg-white w-[90%] rounded-lg text-2xl border-2 border-transparent my-2 py-1 font-medium ${hoverButtonLevel} ${transitionButtonLevel}`}
      onClick={() => {
        if (!isMusicPlaying) {
          toggleMusic();
        }
        navigate(`${Link}`);
        soundButtonClick.play();
      }}
    >
      {Text}
    </button>
  );
}

export default ButtonLevel;
