import React from "react";
import { Card } from "react-bootstrap";

interface SmartOutletProps {
  id: string;
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  powerConsumption: number;
}

export default function SmartOutlet({
  id,
  name,
  connectionState,
  isTurnedOn,
  powerConsumption,
}: SmartOutletProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Type: Smart Outlet</Card.Title>

          <Card.Text>ID: {id}</Card.Text>

          <Card.Text>NAME: {name}</Card.Text>

          <Card.Text>CONNECTION STATE: {connectionState}</Card.Text>

          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>

          <Card.Text>POWER CONSUMPTION: {powerConsumption}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
