import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import { CircleFill, Circle, CircleHalf } from "react-bootstrap-icons";

interface DeviceProps {
  type: string;
  name: string;
  connectionState: string;
}

export default function DeviceListElement({
  type,
  name,
  connectionState,
}: DeviceProps) {
  const [connectionIcon, setConnectionIcon] = useState<any>(null);

  function checkConnection() {
    switch (connectionState) {
      case "connected":
        return <CircleFill />;
      case "disconnected":
        return <Circle />;
      case "poorConnection":
        return <CircleHalf />;
      default:
        return;
    }
  }

  useEffect(() => {
    setConnectionIcon(checkConnection);
  }, []);

  return (
    <div className="device-list-element p-3">
      <Row>
        <Col>{type}</Col>
        <Col className="text-left">{name}</Col>
        <Col className="text-right">{connectionIcon}</Col>
      </Row>
    </div>
  );
}
