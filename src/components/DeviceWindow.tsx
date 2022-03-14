import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
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

  function checkType(type: string) {
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

  function handleOnDragEnd(result?: DropResult) {
    if (result) {
      if (!result.destination) return;

      const items = Array.from(paramOrder);
      const [reorderedItem] = items.splice(result.source.index, 1);

      items.splice(result.destination.index, 0, reorderedItem);

      setParamOrder(items);
    }
  }

  useEffect(() => {
    if (selectedId) {
      axios
        .get(`https://my-smart-home-api.herokuapp.com/devices?id=${selectedId}`)
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

  useEffect(() => {
    const setIntervalFetch = setInterval(() => {
      if (currentId) {
        axios
          .get(
            `https://my-smart-home-api.herokuapp.com/devices?id=${currentId}`
          )
          .then((response) => {
            const data = response.data;

            setSelectedDevice(data[0]);
          })
          .catch((error) => {
            const errorMsg = error.message;
            console.log(errorMsg);
          });
      }
    }, 2500);

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
        <Card className="my-3 text-center device-window">
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
