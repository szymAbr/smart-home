import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import { Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

interface DeviceListProps {
  setSelectedId: any;
  deviceOrder: any;
  setDeviceOrder: any;
}

interface SmartDevice {
  type: string;
  id: string;
  name: string;
  connectionState: string;
}

export default function DeviceList({
  setSelectedId,
  deviceOrder,
  setDeviceOrder,
}: DeviceListProps) {
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
  }, []);

  useEffect(() => {
    if (deviceData) {
      setDeviceOrder(deviceData);
    }
  }, [deviceData, setDeviceOrder]);

  return (
    <div className="device-list mt-4 py-2 mb-3">
      <Droppable droppableId="devices">
        {(provided, snapshot) => (
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
                  {(provided, snapshot) => (
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
