import { useState } from "react";
import Soal from "./Soal";

export const pilganLogic = () => {
  const [idSoal, setIdSoal] = useState(1);

  const idYangDicari = idSoal;
  const matchingSoalItem = Soal.find((item) => item.id === idYangDicari);

  const handleCorrectAnswer = () => {
    setIdSoal((prevId) => {
      const newId = prevId + 1;
      console.log(newId);
      return newId;
    });
  };

  return { idSoal, handleCorrectAnswer, matchingSoalItem };
};
