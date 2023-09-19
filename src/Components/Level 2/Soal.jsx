import { v4 as uuidv4 } from "uuid";
import NomerSatu from "../../Assets/Nasi-Goreng.png";
import NomerDua from "../../Assets/Sate.png";

const soal = [
  {
    id: 1,
    image: {
      id: uuidv4(),
      content: NomerSatu,
      soal: "Bahan dasar dari makanan di atas adalah?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Tepung" },
      { id: uuidv4(), content: "Nasi" },
      { id: uuidv4(), content: "Ayam" },
      { id: uuidv4(), content: "Tempe" },
      { id: uuidv4(), content: "Kecap" },
    ],
    jawabanBenar: "Nasi",
  },
  {
    id: 2,
    image: {
      id: uuidv4(),
      content: NomerDua,
      soal: "Bahan dasar dari makanan di atas adalah?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Daging" },
      { id: uuidv4(), content: "Nasi" },
      { id: uuidv4(), content: "Tepung" },
      { id: uuidv4(), content: "Gula" },
      { id: uuidv4(), content: "Wortel" },
    ],
    jawabanBenar: "Daging",
  },
];

export default soal;
