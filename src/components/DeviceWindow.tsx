import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";
import SmartBulb from "./SmartBulb";
import SmartOutlet from "./SmartOutlet";
import SmartTemperatureSensor from "./SmartTemperatureSensor";
import { DropResult } from "react-beautiful-dnd";
import { ParamOrder } from "./ParamDragDrop";

interface SmartDeviceDetails {
  type: string;
  id: string;
  name: string;
  connectionState: string;
  isTurnedOn?: boolean;
  brightness?: number;
  color?: string;
  powerConsumption?: number;
  temperature?: number;
}

export default function DeviceWindow({
  selectedId,
}: {
  selectedId?: string;
}): JSX.Element {
  const [selectedDevice, setSelectedDevice] = useState<SmartDeviceDetails>();
  const [type, setType] = useState("");
  const [connectionState, setConnectionState] = useState("");
  const [paramOrder, setParamOrder] = useState<ParamOrder[]>([]);
  const [currentId, setCurrentId] = useState("");
  const baseURL = "https://my-smart-home-api.herokuapp.com/devices";

  function checkType(type: string): string {
    let upperCaseIndexArray = [];
    let output = "";

    for (let i = 0; i < type.length; i++) {
      if (type[i] === type[i].toUpperCase()) {
        upperCaseIndexArray.push(type.indexOf(type[i]));
      }
    }

    if (upperCaseIndexArray.length === 0) return type;

    let wordArray = [];
    let lastIndex = 0;

    for (let i = 0; i <= upperCaseIndexArray.length; i++) {
      const newWord = type.slice(lastIndex, upperCaseIndexArray[i]);
      lastIndex = upperCaseIndexArray[i];

      wordArray.push(newWord.toLowerCase());
    }

    output = wordArray.join(" ");

    return output;
  }

  function handleOnDragEnd(result?: DropResult): void {
    if (result) {
      if (!result.destination) return;

      const items = Array.from(paramOrder);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      setParamOrder(items);
    }
  }

  // function for the connection toggle button
  function handleClick(): void {
    if (selectedDevice) {
      if (selectedDevice.connectionState !== "disconnected") {
        axios.put(`${baseURL}/${selectedId}`, {
          ...selectedDevice,
          connectionState: "disconnected",
        });
      } else {
        if (
          selectedDevice.name === "bathroom-main" ||
          selectedDevice.name === "AC-outlet" ||
          selectedDevice.name === "bathroom-main"
        ) {
          axios.put(`${baseURL}/${selectedId}`, {
            ...selectedDevice,
            connectionState: "poorConnection",
          });
        } else {
          axios.put(`${baseURL}/${selectedId}`, {
            ...selectedDevice,
            connectionState: "connected",
          });
        }
      }
    }
  }

  useEffect(() => {
    if (selectedId) {
      axios
        .get(`${baseURL}?id=${selectedId}`)
        .then((response) => {
          const data = response.data;

          setSelectedDevice(data[0]);
        })
        .catch((error) => {
          const errorMsg = error.message;
          console.log(errorMsg);
        });

      setCurrentId(selectedId);
    }
  }, [selectedId]);

  // initiate periodic API requests
  useEffect(() => {
    const setIntervalFetch = setInterval(() => {
      if (currentId) {
        axios
          .get(`${baseURL}?id=${currentId}`)
          .then((response) => {
            const data = response.data;

            setSelectedDevice(data[0]);
          })
          .catch((error) => {
            const errorMsg = error.message;
            console.log(errorMsg);
          });
      }
    }, 2000);

    return () => {
      clearInterval(setIntervalFetch);
    };
  }, [currentId]);

  useEffect(() => {
    if (selectedDevice) {
      setType(checkType(selectedDevice.type));

      if (selectedDevice.connectionState === "poorConnection") {
        setConnectionState("poor connection");
      } else {
        setConnectionState(selectedDevice.connectionState);
      }
    }
  }, [selectedDevice]);

  return (
    <div className="device-window-container">
      {selectedDevice ? (
        <Card id="device-window" className="my-3 text-center device-window">
          <Card.Body>
            <Card.Title className="my-3">Smart {type}</Card.Title>

            {selectedDevice.type === "bulb" ? (
              <SmartBulb
                name={selectedDevice.name}
                connectionState={connectionState}
                isTurnedOn={selectedDevice.isTurnedOn!}
                brightness={selectedDevice.brightness!}
                color={selectedDevice.color!}
                paramOrder={paramOrder}
                setParamOrder={setParamOrder}
                handleOnDragEnd={handleOnDragEnd}
              />
            ) : selectedDevice.type === "outlet" ? (
              <SmartOutlet
                name={selectedDevice.name}
                connectionState={connectionState}
                isTurnedOn={selectedDevice.isTurnedOn!}
                powerConsumption={selectedDevice.powerConsumption!}
                paramOrder={paramOrder}
                setParamOrder={setParamOrder}
                handleOnDragEnd={handleOnDragEnd}
              />
            ) : selectedDevice.type === "temperatureSensor" ? (
              <SmartTemperatureSensor
                name={selectedDevice.name}
                connectionState={connectionState}
                temperature={selectedDevice.temperature!}
                paramOrder={paramOrder}
                setParamOrder={setParamOrder}
                handleOnDragEnd={handleOnDragEnd}
              />
            ) : null}

            <Button
              variant="secondary"
              className="btn-sm"
              onClick={() => handleClick()}
            >
              Toggle connection state
            </Button>
          </Card.Body>
        </Card>
      ) : (
        <div className="my-3 pt-4 text-center">
          <h5>Choose a device to show more information.</h5>
        </div>
      )}
    </div>
  );
}
