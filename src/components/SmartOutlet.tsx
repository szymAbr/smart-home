import React from "react";
import { Card } from "react-bootstrap";

interface SmartOutletProps {
  // id: string;
  // name: string;
  // connectionState: string;
  isTurnedOn: boolean;
  powerConsumption: number;
}

export default function SmartOutlet({
  isTurnedOn,
  powerConsumption,
}: SmartOutletProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text>POWER CONSUMPTION: {powerConsumption}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
