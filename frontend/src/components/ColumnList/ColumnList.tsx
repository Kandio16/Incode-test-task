import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Column as ColumnType } from "../../types";
import Column from "../Column/Column";

export const OrderedList: React.FC<{
  items: ColumnType[];
  onOrderChange: (items: ColumnType[]) => void;
}> = ({ items, onOrderChange }) => {
  function handleOnDragEnd(result: DropResult) {
    if (!result.destination) return;

    const newItems = Array.from(items);
    const [reorderedItem] = newItems.splice(result.source.index, 1);
    newItems.splice(result.destination.index, 0, reorderedItem);
    onOrderChange(newItems);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable droppableId="ordered-list" direction="horizontal">
          {(provided) => (
            <div
              style={{
                display: "flex",
                alignItems: "flex-start",
              }}
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {items.map((column, index) => (
                <Draggable
                  key={column.id}
                  draggableId={column.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      key={column.id}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                    >
                      <Column
                        key={column.id}
                        id={column.id}
                        title={column.title}
                        tickets={column.tickets}
                        dragHandleProps={provided.dragHandleProps}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
};
