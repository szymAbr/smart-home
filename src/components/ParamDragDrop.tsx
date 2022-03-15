import React, { useEffect } from "react";
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
  useEffect(() => {
    for (let param in paramOrder) {
      const value = paramOrder[param].paramValue;
      const uniqueParams = document.getElementsByClassName("unique-params");
      const uniqueParamsArray = Array.from(uniqueParams);

      // hide device-specific paramValue if disconnected
      if (value === "disconnected") {
        uniqueParamsArray.forEach((param) => {
          param.classList.add("hidden");
        });
      } else if (value === "connected" || value === "poor connection") {
        uniqueParamsArray.forEach((param) => {
          param.classList.remove("hidden");
        });
      }
    }
  }, [paramOrder]);

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
                        <span className="unique-params">
                          {item.paramValue}&#8451;
                        </span>
                      ) : item.paramName === "Power consumption" ? (
                        <span className="unique-params">
                          {item.paramValue} W
                        </span>
                      ) : item.paramName === "Color" ? (
                        <span className="unique-params">
                          <CircleFill
                            className="color-circle"
                            style={{ color: `${item.paramValue}` }}
                          />{" "}
                          {item.paramValue}
                        </span>
                      ) : item.paramName === "Power" ? (
                        <span className="unique-params">{item.paramValue}</span>
                      ) : item.paramName === "Brightness" ? (
                        <span className="unique-params">{item.paramValue}</span>
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
