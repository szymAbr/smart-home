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
          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text>TEMPERATURE: {temperature}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
