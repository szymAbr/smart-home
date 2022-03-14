import React from "react";
import { ListGroup } from "react-bootstrap";
import DeviceName from "./DeviceName";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from "react-beautiful-dnd";

export interface ParamOrder {
  id: string;
  paramName: string;
  paramValue: string | boolean | number;
}

interface ParamDragDropProps {
  paramOrder: ParamOrder[];
  handleOnDragEnd: () => void;
}

export default function ParamDragDrop({
  paramOrder,
  handleOnDragEnd,
}: ParamDragDropProps): JSX.Element {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="device-params">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <ListGroup
            className={
              snapshot.isDraggingOver ? "param-list draggingOver" : "param-list"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {paramOrder.map((item: ParamOrder, index: number) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <ListGroup.Item
                      className={
                        snapshot.isDragging
                          ? "param-item dragging"
                          : "param-item"
                      }
                      style={provided.draggableProps.style}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      <span>{item.paramName}: </span>

                      <span>
                        {item.paramName === "Name" &&
                        typeof item.paramValue === "string" ? (
                          <DeviceName name={item.paramValue} />
                        ) : (
                          item.paramValue
                        )}
                      </span>
                    </ListGroup.Item>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </DragDropContext>
  );
}
