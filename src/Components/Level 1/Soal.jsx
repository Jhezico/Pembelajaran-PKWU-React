import { v4 as uuidv4 } from "uuid";
import NomerSatu from "../../Assets/Sate.png";
import NomerDua from "../../Assets/Nasi-Goreng.png";

const soal = [
  {
    id: 1,
    image: {
      id: uuidv4(),
      content: NomerSatu,
      soal: "Teknik pengolahan apa yang tepat untuk gambar makanan di atas?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Di Bakar" },
      { id: uuidv4(), content: "Di Kukus" },
      { id: uuidv4(), content: "Di Goreng" },
      { id: uuidv4(), content: "Di Rebus" },
      { id: uuidv4(), content: "Di Tumis" },
    ],
    jawabanBenar: "Di Bakar",
  },
  {
    id: 2,
    image: {
      id: uuidv4(),
      content: NomerDua,
      soal: "Teknik pengolahan apa yang tepat untuk gambar makanan di atas?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Di Bakar" },
      { id: uuidv4(), content: "Di Kukus" },
      { id: uuidv4(), content: "Di Goreng" },
      { id: uuidv4(), content: "Di Rebus" },
      { id: uuidv4(), content: "Di Tumis" },
    ],
    jawabanBenar: "Di Goreng",
  },
];

export default soal;
