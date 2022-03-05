import React from "react";
import { Row, Col } from "react-bootstrap";
import { CircleFill, Circle } from "react-bootstrap-icons";

interface DeviceProps {
  type: string;
  name: string;
  connected: boolean;
}

export default function DeviceListElement({
  type,
  name,
  connected,
}: DeviceProps) {
  return (
    <div className="device-list-element p-3">
      <Row>
        <Col>{type}</Col>
        <Col className="text-left">{name}</Col>
        <Col className="text-right">
          {connected ? <CircleFill /> : <Circle />}
        </Col>
      </Row>
    </div>
  );
}
