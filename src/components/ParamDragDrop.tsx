import React from "react";
import { CircleFill } from "react-bootstrap-icons";
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

                      {item.paramName === "Name" &&
                      typeof item.paramValue === "string" ? (
                        <DeviceName name={item.paramValue} />
                      ) : item.paramName === "Temperature" ? (
                        <span>{item.paramValue}&#8451;</span>
                      ) : item.paramName === "Power consumption" ? (
                        <span>{item.paramValue} W</span>
                      ) : item.paramName === "Color" ? (
                        <span>
                          <CircleFill
                            className="color-circle"
                            style={{ color: `${item.paramValue}` }}
                          />{" "}
                          {item.paramValue}
                        </span>
                      ) : (
                        item.paramValue
                      )}
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
