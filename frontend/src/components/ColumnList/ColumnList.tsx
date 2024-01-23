import React from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "react-beautiful-dnd";
import { Column as ColumnType } from "../../types";
import Column from "../Column/Column";
import { toJS } from "mobx";
import { appStore } from "../../stores";
import { COLUMN_DND_TYPE } from "../../constants";

export const OrderedList: React.FC<{
  items: ColumnType[];
}> = ({ items }) => {
  function handleOnDragEnd(result: DropResult) {
    appStore.changeOrder(result);
  }

  return (
    <div>
      <DragDropContext onDragEnd={handleOnDragEnd}>
        <Droppable
          droppableId="ordered-list"
          type={COLUMN_DND_TYPE}
          direction="horizontal"
        >
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
