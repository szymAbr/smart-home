import React from "react";
import { Card } from "react-bootstrap";

interface SmartOutletProps {
  powerConsumption: number;
}

export default function SmartOutlet({
  powerConsumption,
}: SmartOutletProps) {
  return (
    <div>
      <Card className="my-3 device-info">
        <Card.Body>
          <Card.Text>Power consumption: {powerConsumption} W</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
