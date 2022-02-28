import React from "react";
import { Card } from "react-bootstrap";

export default function DeviceWindow() {
  return (
    <div className="device-window">
      <Card className="my-3">
        <Card.Body>
          <Card.Title>Selected device</Card.Title>

          <Card.Text>connection status etc.</Card.Text>

          <Card.Text>connection status etc.</Card.Text>

          <Card.Text>connection status etc.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
