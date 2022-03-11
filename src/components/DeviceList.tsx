import React, { useState, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import { Droppable, Draggable } from "react-beautiful-dnd";
import axios from "axios";

interface DeviceListProps {
  selectedId: string | number;
  setSelectedId: any;
  deviceOrder: any;
  setDeviceOrder: any;
}

export default function DeviceList({
  selectedId,
  setSelectedId,
  deviceOrder,
  setDeviceOrder,
}: DeviceListProps) {
  const [deviceData, setDeviceData] = useState([]);

  function fetchDevices() {
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
    setDeviceOrder(deviceData);
  }, [deviceData]);

  return (
    <div className="device-list mt-4 py-2 mb-3">
      <Droppable droppableId="devices">
        {(provided) => (
          <ListGroup
            className="devices"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {deviceOrder.map((item: any, index: any) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <ListGroup.Item
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
