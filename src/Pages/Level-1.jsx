import React, { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { v4 as uuidv4 } from "uuid";
import Sate from "../Assets/Sate.png"; // Import gambar Sate

const itemsFromBackend = [
  { id: uuidv4(), content: "Di Bakar" },
  { id: uuidv4(), content: "Di Kukus" },
  { id: uuidv4(), content: "Di Goreng" },
  { id: uuidv4(), content: "Di Rebus" },
  { id: uuidv4(), content: "Di Tumis" },
];

const image = { id: uuidv4(), content: Sate };

// Jawaban yang benar
const correctAnswer = "Di Bakar";

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
  const { source, destination } = result;

  // Pastikan item di-drop ke dalam kolom "Gambar"
  if (destination?.droppableId === initialGambarColumnId) {
    // Dapatkan konten dari item yang di-drop
    const droppedItemId = result.draggableId;

    // Periksa apakah kolom "Gambar" ada di dalam columns
    if (columns.Gambar) {
      const droppedItem = columns.Gambar.items.find(
        (item) => item.id === droppedItemId
      );

      if (droppedItem) {
        if (droppedItem.content === correctAnswer) {
          console.log("Jawaban Benar!");
        } else {
          console.log("Jawaban Salah!");
        }

        // Perbarui state dengan item yang di-drop
        const newItems = [...columns.Gambar.items];
        const itemIndex = newItems.findIndex(
          (item) => item.id === droppedItemId
        );
        if (itemIndex !== -1) {
          newItems.splice(itemIndex, 1);
        }

        setColumns({
          ...columns,
          Gambar: {
            ...columns.Gambar,
            items: newItems,
          },
        });
      }
    }
  } else {
    console.log("salah");
  }
};

function LevelSatu() {
  const [columns, setColumns] = useState(columnsFromBackend);
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
