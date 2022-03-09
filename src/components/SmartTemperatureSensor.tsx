import React from "react";
import { Card } from "react-bootstrap";

interface SmartTemperatureSensorProps {
  temperature: number;
}

export default function SmartTemperatureSensor({
  temperature,
}: SmartTemperatureSensorProps) {
  return (
    <div>
      <Card className="my-3 device-info">
        <Card.Body>
          <Card.Text>Temperature: {temperature}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
