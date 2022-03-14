import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import {
  Droppable,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DroppableProvided,
  DroppableStateSnapshot,
} from "react-beautiful-dnd";
import axios from "axios";

interface DeviceListProps {
  setSelectedId: Dispatch<SetStateAction<string>>;
  deviceOrder: SmartDevice[];
  setDeviceOrder: Dispatch<SetStateAction<SmartDevice[]>>;
}

export interface SmartDevice {
  type: string;
  id: string;
  name: string;
  connectionState: string;
}

export default function DeviceList({
  setSelectedId,
  deviceOrder,
  setDeviceOrder,
}: DeviceListProps): JSX.Element {
  const [deviceData, setDeviceData] = useState<SmartDevice[]>();

  function fetchDevices(): void {
    axios
      .get("https://my-smart-home-api.herokuapp.com/devices")
      .then((response) => {
        const data = response.data;

        setDeviceData(data);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }

  useEffect(() => {
    fetchDevices();
    
    setInterval(fetchDevices, 2500);
  }, []);

  useEffect(() => {
    if (deviceData) {
      setDeviceOrder(deviceData);
    }
  }, [deviceData, setDeviceOrder]);

  return (
    <div className="device-list mt-4 py-2 mb-3">
      <Droppable droppableId="devices">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <ListGroup
            className={
              snapshot.isDraggingOver ? "devices draggingOver" : "devices"
            }
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {deviceOrder.map((item: any, index: number) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(
                    provided: DraggableProvided,
                    snapshot: DraggableStateSnapshot
                  ) => (
                    <ListGroup.Item
                      className={
                        snapshot.isDragging
                          ? "device-item dragging"
                          : "device-item"
                      }
                      style={provided.draggableProps.style}
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <DeviceListElement
                        type={item.type}
                        name={item.name}
                        connectionState={item.connectionState}
                      />
                    </ListGroup.Item>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </div>
  );
}
