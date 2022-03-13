import React from "react";
import { ListGroup } from "react-bootstrap";
import DeviceName from "./DeviceName";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

interface ParamDragDropProps {
  paramOrder: any;
  handleOnDragEnd: any;
}

export default function ParamDragDrop({
  paramOrder,
  handleOnDragEnd,
}: ParamDragDropProps) {
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="device-params">
        {(provided, snapshot) => (
          <ListGroup
            className={
              snapshot.isDraggingOver ? "param-list draggingOver" : "param-list"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {paramOrder.map((item: any, index: number) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided, snapshot) => (
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
                        {item.paramName === "Name" ? (
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
