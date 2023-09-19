import { v4 as uuidv4 } from "uuid";
import NomerSatu from "../../Assets/Bika-Ambon.png";
import NomerDua from "../../Assets/Pukis.png";

const soal = [
  {
    id: 1,
    image: {
      id: uuidv4(),
      content: NomerSatu,
      soal: "Makanan di atas berasal dari daerah?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Sumatra Utara" },
      { id: uuidv4(), content: "Sumatra Barat" },
      { id: uuidv4(), content: "Ambon" },
      { id: uuidv4(), content: "Surabaya" },
      { id: uuidv4(), content: "Kalimantan Selatan" },
    ],
    jawabanBenar: "Sumatra Utara",
  },
  {
    id: 2,
    image: {
      id: uuidv4(),
      content: NomerDua,
      soal: "Makanan di atas berasal dari daerah?",
    },
    pilihanGanda: [
      { id: uuidv4(), content: "Jawa Timur" },
      { id: uuidv4(), content: "Jawa Tengah" },
      { id: uuidv4(), content: "Jakarta" },
      { id: uuidv4(), content: "Ambon" },
      { id: uuidv4(), content: "Pontianak" },
    ],
    jawabanBenar: "Jawa Tengah",
  },
];

export default soal;
