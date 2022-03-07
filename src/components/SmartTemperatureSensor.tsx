import React from "react";
import { Card } from "react-bootstrap";

interface SmartTemperatureSensorProps {
  // id: string;
  // name: string;
  // connectionState: string;
  isTurnedOn: boolean;
  temperature: number;
}

export default function SmartTemperatureSensor({
  isTurnedOn,
  temperature,
}: SmartTemperatureSensorProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          {/* <Card.Title className="mb-4">
            Type: Smart Temperature Sensor
          </Card.Title> */}

          {/* <Card.Text>ID: {id}</Card.Text>

          <Card.Text>NAME: {name}</Card.Text>

          <Card.Text>CONNECTION STATE: {connectionState}</Card.Text> */}

          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>

          <Card.Text>TEMPERATURE: {temperature}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
