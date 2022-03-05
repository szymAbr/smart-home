import React from "react";
import { Card } from "react-bootstrap";

interface SmartBulbProps {
  id: string;
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  brightness: number;
  color: string;
}

export default function SmartBulb({
  id,
  name,
  connectionState,
  isTurnedOn,
  brightness,
  color,
}: SmartBulbProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Title className="mb-4">Type: Smart Bulb</Card.Title>

          <Card.Text>ID: {id}</Card.Text>

          <Card.Text>NAME: {name}</Card.Text>

          <Card.Text>CONNECTION STATE: {connectionState}</Card.Text>

          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>

          <Card.Text>BRIGHTNESS: {brightness}</Card.Text>

          <Card.Text>COLOR: {color}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
