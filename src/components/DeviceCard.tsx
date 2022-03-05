import React from "react";
import { Card } from "react-bootstrap";
import DeviceList from "./DeviceList";

export default function DeviceCard() {
  return (
    <div className="device-card">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title className="text-center mb-4">Your devices</Card.Title>
          <Card.Text>
            <DeviceList />
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
