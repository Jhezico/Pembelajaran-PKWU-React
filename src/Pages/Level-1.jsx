import React, { useState, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Sate from "../Assets/Sate.png"; // Import gambar Sate
import soal from "../Components/Level 1/Nomer-1";

const itemsFromBackend = soal
  .map((item) => item.pilihanGanda)
  .reduce((acc, val) => acc.concat(val), []);

const images = { id: uuidv4(), content: Sate };
const image = soal.map((item) => item.image);

console.log(image);
console.log(images);

const columnsFromBackend = {
  [uuidv4()]: {
    name: "Gambar",
    items: [image],
  },
  [uuidv4()]: {
    name: "Pilihan Ganda",
    items: itemsFromBackend,
  },
};

const initialGambarColumnId = Object.keys(columnsFromBackend).find(
  (columnId) => columnsFromBackend[columnId].name === "Gambar"
);

const onDragEnd = (result, columns, setColumns) => {
  if (!result.destination) return;
  const { source, destination } = result;
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
        if (content === "Di Bakar") {
          console.log("Jawaban Benar! Makanan ini di bakar.");

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
        } else {
          console.log("Jawaban Salah! Makanan ini tidak di bakar.");
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
        }
      } else {
        console.log("Item tidak ditemukan.");
      }
    }
  } else {
    console.log("salah");
  }
};

const shuffleArray = (array) => {
  const newArray = [...array];
  for (let i = newArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

function LevelSatu() {
  const [columns, setColumns] = useState(columnsFromBackend);

  // Menyimpan pilihan ganda awal dalam state
  const [initialItems, setInitialItems] = useState(itemsFromBackend);

  // Shuffle pilihan ganda saat komponen pertama kali dimuat
  useEffect(() => {
    const shuffledItems = shuffleArray(initialItems);
    const newColumns = {
      ...columns,
      [initialGambarColumnId]: {
        ...columns[initialGambarColumnId],
        items: [{ id: uuidv4(), content: Sate }],
      },
      [Object.keys(columnsFromBackend)[1]]: {
        ...columnsFromBackend[Object.keys(columnsFromBackend)[1]],
        items: shuffledItems,
      },
    };
    setColumns(newColumns);
  }, []);
  return (
    <div style={{ display: "block", justifyContent: "center", height: "100%" }}>
      <DragDropContext
        onDragEnd={(result) => onDragEnd(result, columns, setColumns)}
      >
        {Object.entries(columns).map(([columnId, column], index) => {
          return (
            <div className=" bg-red-500 " key={columnId}>
              <h2>{column.name}</h2>
              <div style={{ margin: 8 }} className="">
                <Droppable droppableId={columnId} key={columnId}>
                  {(provided, snapshot) => {
                    return (
                      <div
                        {...provided.droppableProps}
                        ref={provided.innerRef}
                        style={{}}
                        className={`${
                          snapshot.isDraggingOver
                            ? "bg-lime-500"
                            : "bg-yellow-400"
                        } p-4 w-full min-h-max `}
                      >
                        {column.items.map((item, index) => {
                          if (column.name === "Gambar") {
                            return (
                              <div
                                key={item.id}
                                style={{
                                  userSelect: "none",
                                  padding: 16,
                                  margin: "0 0 8px 0",
                                  minHeight: "50px",
                                }}
                              >
                                <img
                                  src={item.content}
                                  alt="Sate"
                                  className="w-full"
                                />
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
                                        userSelect: "none",
                                        padding: 16,
                                        margin: "0 0 8px 0",
                                        minHeight: "50px",
                                        backgroundColor: snapshot.isDragging
                                          ? "#263B4A"
                                          : "#456C86",
                                        color: "white",
                                        ...provided.draggableProps.style,
                                      }}
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

export default LevelSatu;
