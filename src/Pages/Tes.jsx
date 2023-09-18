import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { Howl, Howler } from "howler";
import { Link, useNavigate } from "react-router-dom";
import { MusicContext } from "../Components/MusicContext";
import Soal from "../Components/Level 1/Soal";
import { pilganLogic } from "../Components/PilganLogic";
import Sate from "../Assets/Sate.png"; // Import gambar Sate
import NasiGoreng from "../Assets/Nasi-Goreng.png"; // Import gambar Sate
import HomeButton from "../Assets/Button-Home.png";
import ButtonOnMusic from "../Assets/Button-On-Music.png";
import ButtonOffMusic from "../Assets/Button-Off-Music.png";
import SoundBenar from "../Assets/Sound-Benar.mp3";
import SoundSalah from "../Assets/Sound-Salah.mp3";
import SoundButtonClick from "../Assets/Sound-Button-Click.mp3";

const soundBenar = new Howl({
  src: [SoundBenar],
  volume: 0.5,
});

const soundSalah = new Howl({
  src: [SoundSalah],
  volume: 0.2,
});

const soundButtonClick = new Howl({
  src: [SoundButtonClick],
});

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function NomerSatu() {
  const { idSoal, handleCorrectAnswer, matchingSoalItem } = pilganLogic();
  const columnsFromBackend = {
    [uuidv4()]: {
      name: "Gambar",
      items: [matchingSoalItem.image],
    },
    [uuidv4()]: {
      name: "Pilihan Ganda",
      items: matchingSoalItem.pilihanGanda,
    },
  };
  const [columns, setColumns] = useState(columnsFromBackend);
  const { isMusicPlaying, toggleMusic } = useContext(MusicContext);

  const navigate = useNavigate();

  const [initialItems, setInitialItems] = useState(
    matchingSoalItem.pilihanGanda
  );

  const initialGambarColumnId = Object.keys(columnsFromBackend).find(
    (columnId) => columnsFromBackend[columnId].name === "Gambar"
  );

  const onDragEnd = (result, columns, setColumns, navigate) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (destination?.droppableId !== initialGambarColumnId) {
      const dataPilihanGanda = Object.values(columnsFromBackend).find(
        (column) => column.name === "Pilihan Ganda"
      );
      if (dataPilihanGanda) {
        const itemsPilihanGanda = dataPilihanGanda.items;
        const droppedItemId = result.draggableId;
        const droppedItem = itemsPilihanGanda.find(
          (item) => item.id === droppedItemId
        );

        if (droppedItem) {
          const content = droppedItem.content;
          console.log(`Makanan yang di-drop: ${content}`);
          if (content === matchingSoalItem.jawabanBenar) {
            console.log(`Jawaban Benar! Makanan ini ${content}`);

            // Salin kolom sumber dan kolom tujuan
            const sourceColumn = { ...columns[source.droppableId] };
            const destColumn = { ...columns[destination.droppableId] };

            // Salin item-item dari kolom sumber dan kolom tujuan
            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];

            // Hapus item yang di-drag dari kolom sumber
            sourceItems.splice(source.index, 1);

            // Update kolom-kolom dengan item yang sudah dihapus
            setColumns({
              ...columns,
              [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
              },
              [destination.droppableId]: {
                ...destColumn,
                items: destItems,
              },
            });

            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "success",
              title: `Jawaban Benar! Makanan ini ${content}.`,
            });
            soundBenar.play();
            setTimeout(() => {
              handleCorrectAnswer;
              console.log(idSoal);
            }, 3000);
          } else {
            console.log(`Jawaban Salah! Makanan ini tidak ${content}.`);
            const column = columns[source.droppableId];
            const copiedItems = [...column.items];
            const [removed] = copiedItems.splice(source.index, 1);
            copiedItems.splice(destination.index, 0, removed);
            setColumns({
              ...columns,
              [source.droppableId]: {
                ...column,
                items: copiedItems,
              },
            });
            const Toast = Swal.mixin({
              toast: true,
              position: "top-end",
              showConfirmButton: false,
              timer: 3000,
              timerProgressBar: true,
              didOpen: (toast) => {
                toast.addEventListener("mouseenter", Swal.stopTimer);
                toast.addEventListener("mouseleave", Swal.resumeTimer);
              },
            });

            Toast.fire({
              icon: "error",
              title: `Jawaban Salah! Makanan ini tidak ${content}.`,
            });

            soundSalah.play();
          }
        } else {
          console.log("Item tidak ditemukan.");
        }
      }
    } else {
      console.log("salah");
    }
  };

  // Shuffle pilihan ganda saat komponen pertama kali dimuat
  useEffect(() => {
    const shuffledItems = shuffleArray(initialItems);
    const newColumns = {
      ...columns,
      [initialGambarColumnId]: {
        ...columns[initialGambarColumnId],
        items: [
          {
            id: matchingSoalItem.image.id,
            content: matchingSoalItem.image.content,
            soal: matchingSoalItem.image.soal,
          },
        ],
      },
      [Object.keys(columnsFromBackend)[1]]: {
        ...columnsFromBackend[Object.keys(columnsFromBackend)[1]],
        items: shuffledItems,
      },
    };
    setColumns(newColumns);
  }, []);
  return (
    <div
      style={{ display: "block", justifyContent: "center" }}
      className="bg-red-600 h-[100vh] overflow-y-hidden"
    >
      <div className="absolute top-5 left-5 flex z-10">
        <Link to="/">
          <img
            className="w-[50px] relative"
            src={HomeButton}
            onClick={() => {
              if (isMusicPlaying) {
                toggleMusic();
              }
              soundButtonClick.play();
            }}
          />
        </Link>

        <img
          className="w-[50px] relative left-5"
          src={isMusicPlaying ? ButtonOffMusic : ButtonOnMusic}
          onClick={() => {
            toggleMusic(); // Menggunakan toggleMusic dari MusicContext
            soundButtonClick.play();
          }}
        />
      </div>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns, navigate)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="bg-red-600" key={columnId}>
              <div style={{ margin: 8 }} className="">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{}}
                        className={`${
                          snapshot.isDraggingOver ? "bg-red-600" : "bg-red-600"
                        } p-4 w-full min-h-max `}
                      >
                        {column.items.map((item, index) => {
                          if (column.name === "Gambar") {
                            return (
                              <div
                                key={item.id}
                                style={{
                                  userSelect: "none",
                                }}
                                className={`${
                                  snapshot.isDraggingOver
                                    ? "shadow-gambar rounded-[15px]"
                                    : "bg-red-600"
                                } p-5`}
                              >
                                <img
                                  src={item.content}
                                  alt="Sate"
                                  className="w-full"
                                />
                                <p className="text-xl text-white text-center">
                                  {item.soal}
                                </p>
                              </div>
                            );
                          } else {
                            return (
                              <Draggable
                                key={item.id}
                                draggableId={item.id}
                                index={index}
                              >
                                {(provided, snapshot) => {
                                  return (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      style={{
                                        ...provided.draggableProps.style,
                                      }}
                                      className={`select-none p-3 mb-4 min-h-[50px] text-center font-semibold rounded-[15px]  ${
                                        snapshot.isDragging
                                          ? "bg-orange-600 text-white"
                                          : "bg-white"
                                      }`}
                                    >
                                      {item.content}
                                    </div>
                                  );
                                }}
                              </Draggable>
                            );
                          }
                        })}
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              </div>
            </div>
          );
        })}
      </DragDropContext>
    </div>
  );
}

export default NomerSatu;
