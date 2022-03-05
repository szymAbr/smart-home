import React from "react";
import { Card } from "react-bootstrap";

interface DeviceProps {
  type?: string;
  name?: string;
  connected?: boolean;
}

export default function DeviceWindow({ type = "", name = "", connected = false }: DeviceProps) {
  return (
    <div className="device-window">
      <Card className="my-3 text-center">
        <Card.Body>
          <Card.Title className="mb-4">{type ? type : "Choose a device to show more information"}</Card.Title>

          <Card.Text>connection status etc.</Card.Text>

          <Card.Text>connection status etc.</Card.Text>

          <Card.Text>connection status etc.</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
