import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import SmartBulb from "./SmartBulb";
import SmartOutlet from "./SmartOutlet";
import SmartTemperatureSensor from "./SmartTemperatureSensor";

interface DeviceProps {
  selectedId?: string | number;
}

export default function DeviceWindow({ selectedId }: DeviceProps) {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [connectionState, setConnectionState] = useState("");
  const [component, setComponent] = useState<any>(null);

  function fetchSelectedDevice() {
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
  }

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

  function capitalizeName(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  function splitName(name: string) {
    const wordsArray = name.split("-");
    const fullName = wordsArray.join(" ");

    return fullName;
  }

  useEffect(() => {
    fetchSelectedDevice();
  }, [selectedId]);

  useEffect(() => {
    if (selectedDevice) {
      setType(checkType(selectedDevice.type));

      setName(splitName(capitalizeName(selectedDevice.name)));

      if (selectedDevice.connectionState === "poorConnection") {
        setConnectionState("poor connection");
      } else {
        setConnectionState(selectedDevice.connectionState);
      }
    }
  }, [selectedDevice]);

  useEffect(() => {
    if (selectedDevice) {
      switch (selectedDevice.type) {
        case "bulb":
          setComponent(
            <SmartBulb
              isTurnedOn={selectedDevice.isTurnedOn}
              brightness={selectedDevice.brightness}
              color={selectedDevice.color}
            />
          );
          break;
        case "outlet":
          setComponent(
            <SmartOutlet
              isTurnedOn={selectedDevice.isTurnedOn}
              powerConsumption={selectedDevice.powerConsumption}
            />
          );
          break;
        case "temperatureSensor":
          setComponent(
            <SmartTemperatureSensor
              isTurnedOn={selectedDevice.isTurnedOn}
              temperature={selectedDevice.temperature}
            />
          );
          break;
        default:
          break;
      }
    }
  }, [selectedDevice]);

  return (
    <div className="device-window">
      {selectedDevice ? (
        <Card className="my-3 text-center">
          <Card.Body>
            <Card.Title className="mb-4">Smart {type}</Card.Title>

            <Row>
              <Col>
                <Card.Text>Name: {name}</Card.Text>

                <Card.Text>Connection state: {connectionState}</Card.Text>
              </Col>

              <Col>{component}</Col>
            </Row>
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
