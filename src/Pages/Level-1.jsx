import React, { useState, useEffect, useContext } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Swal from "sweetalert2";
import { Howl, Howler } from "howler";
import { Link, useNavigate } from "react-router-dom";
import { MusicContext } from "../Components/MusicContext";
import { pilganLogic } from "../Components/Level 1/PilganLogic";
import HomeButton from "../Assets/Button-Home.png";
import ButtonOnMusic from "../Assets/Button-Off-Music.png";
import ButtonOffMusic from "../Assets/Button-On-Music.png";
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
  const shufflePilihanGanda = (pilihanGanda) => {
    return shuffleArray([...pilihanGanda]);
  };
  let columnsFromBackend = {};

  if (matchingSoalItem) {
    columnsFromBackend = {
      Gambar: {
        name: "Gambar",
        items: [matchingSoalItem.image],
      },
      [uuidv4()]: {
        name: "Pilihan Ganda",
        items: matchingSoalItem.pilihanGanda,
      },
    };
  } else {
    columnsFromBackend = {};
  }

  const initialGambarColumnId = Object.keys(columnsFromBackend).find(
    (columnId) => columnsFromBackend[columnId].name === "Gambar"
  );

  console.log(columnsFromBackend);

  const [columns, setColumns] = useState(columnsFromBackend);
  const { isMusicPlaying, toggleMusic } = useContext(MusicContext);

  const navigate = useNavigate();

  const [initialItems, setInitialItems] = useState(
    matchingSoalItem ? matchingSoalItem.pilihanGanda : []
  );

  const onDragEnd = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;
    console.log(destination);
    console.log(initialGambarColumnId);
    if (destination?.droppableId === initialGambarColumnId) {
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

            const sourceColumn = { ...columns[source.droppableId] };
            const destColumn = { ...columns[destination.droppableId] };

            const sourceItems = [...sourceColumn.items];
            const destItems = [...destColumn.items];

            sourceItems.splice(source.index, 1);

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
              timer: 1500,
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
              handleCorrectAnswer();
            }, 1500);
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
              timer: 1500,
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
      return;
    }
  };

  useEffect(() => {
    if (matchingSoalItem) {
      const shuffledPilihanGanda = shufflePilihanGanda(
        matchingSoalItem.pilihanGanda
      );
      setColumns({
        Gambar: {
          name: "Gambar",
          items: [matchingSoalItem.image],
        },
        [uuidv4()]: {
          name: "Pilihan Ganda",
          items: shuffledPilihanGanda,
        },
      });
      setInitialItems(shuffledPilihanGanda);
    } else {
      setColumns({
        [uuidv4()]: {
          name: "Gambar",
          items: [],
        },
        [uuidv4()]: {
          name: "Pilihan Ganda",
          items: [],
        },
      });
      navigate("/next-to-level-2");
    }
  }, [idSoal, navigate]);
  return (
    <div
      style={{ justifyContent: "center" }}
      className="bg-red-600 h-[100vh] overflow-y-hidden block lg:flex"
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
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className="bg-red-600 w-full my-auto" key={columnId}>
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
                                  className="w-[90%] mx-auto sm:w-[70%] md:w-[50%]"
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
                                      className={`select-none p-3 mb-4 min-h-[50px] text-center font-semibold rounded-[15px] w-[%] ${
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
