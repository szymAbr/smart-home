import React, { useState, useEffect } from "react";
import { Card, Row, Col } from "react-bootstrap";
import axios from "axios";
import SmartBulb from "./SmartBulb";
import SmartOutlet from "./SmartOutlet";
import SmartTemperatureSensor from "./SmartTemperatureSensor";
import DeviceName from "./DeviceName";

interface DeviceProps {
  selectedId?: string | number;
}

export default function DeviceWindow({ selectedId }: DeviceProps) {
  const [selectedDevice, setSelectedDevice] = useState<any>(null);
  const [type, setType] = useState("");
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

  useEffect(() => {
    fetchSelectedDevice();
  }, [selectedId]);

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

  useEffect(() => {
    if (selectedDevice) {
      switch (selectedDevice.type) {
        case "bulb":
          setComponent(
            <SmartBulb
              brightness={selectedDevice.brightness}
              color={selectedDevice.color}
            />
          );
          break;
        case "outlet":
          setComponent(
            <SmartOutlet
              powerConsumption={selectedDevice.powerConsumption}
            />
          );
          break;
        case "temperatureSensor":
          setComponent(
            <SmartTemperatureSensor
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
    <div className="device-window-container">
      {selectedDevice ? (
        <Card className="my-3 text-center device-window">
          <Card.Body>
            <Card.Title className="my-3">Smart {type}</Card.Title>
            <Row>
              <Col>
                {/* <Card><Card.Body><Card.Text>Name: {name}</Card.Text></Card.Body></Card> */}
                <Card className="my-3 device-info">
                  <Card.Body>
                    <Card.Text>
                      <span>Name: </span>
                      <DeviceName name={selectedDevice.name} />
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="mb-3 device-info">
                  <Card.Body>
                    <Card.Text>
                      Connection state: <span>{connectionState}</span>
                    </Card.Text>
                  </Card.Body>
                </Card>

                <Card className="my-3 device-info">
                  <Card.Body>
                    <Card.Text>
                      Power: {selectedDevice.isTurnedOn ? "ON" : "OFF"}
                    </Card.Text>
                  </Card.Body>
                </Card>
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
