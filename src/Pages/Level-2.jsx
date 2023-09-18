import React, { useState } from "react";
import Soal from "../Components/Level 1/Soal";

const LevelDua = () => {
  const [idSoal, setIdSoal] = useState(1);
  const idYangDicari = idSoal;
  const itemYangDicari = Soal.find((item) => item.id === idYangDicari);

  return (
    <div>
      <h1>Hello</h1>
      {itemYangDicari ? (
        <div>
          <img
            className="w-[100px]"
            src={itemYangDicari.image.content}
            alt={itemYangDicari.image.soal}
          />
          <p>{itemYangDicari.image.soal}</p>
          <ul>
            {itemYangDicari.pilihanGanda.map((pilihan, index) => (
              <li key={pilihan.id}>{pilihan.content}</li>
            ))}
          </ul>
          <p>Jawaban Benar: {itemYangDicari.jawabanBenar}</p>
        </div>
      ) : (
        <p>Item dengan ID yang dicari tidak ditemukan.</p>
      )}
      <button
        onClick={() => setIdSoal((prev) => prev + 1)}
        className="bg-red-600 text-white p-3 mr-2"
      >
        Lanjut Soal Berikutnya
      </button>

      <button
        onClick={() => setIdSoal((prev) => prev - 1)}
        className="bg-orange-600 text-white p-3"
      >
        Kembali ke soal sebelumnya
      </button>
    </div>
  );
};

export default LevelDua;
