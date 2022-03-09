import React, { useState, useEffect } from "react";
import { Row, Col } from "react-bootstrap";
import {
  Icon,
  Wifi,
  Wifi2,
  WifiOff,
  LightbulbFill,
  Outlet,
  ThermometerHalf,
} from "react-bootstrap-icons";
import DeviceName from "./DeviceName";

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
  const [connectionIcon, setConnectionIcon] = useState<Icon>();
  const [typeIcon, setTypeIcon] = useState<Icon>();

  useEffect(() => {
    function checkConnection() {
      switch (connectionState) {
        case "connected":
          return <Wifi />;
        case "disconnected":
          return <WifiOff />;
        case "poorConnection":
          return <Wifi2 />;
        default:
          return null;
      }
    }

    function checkType() {
      switch (type) {
        case "bulb":
          return <LightbulbFill />;
        case "outlet":
          return <Outlet />;
        case "temperatureSensor":
          return <ThermometerHalf />;
        default:
          return null;
      }
    }

    setConnectionIcon(checkConnection);
    setTypeIcon(checkType);
  }, [connectionState, type]);

  return (
    <div className="device-list-element p-3">
      <Row>
        <Col xs={4} md={3} className="icon">
          {typeIcon}
        </Col>
        <Col xs={4} md={6} className="text-center">
          <DeviceName name={name} />
        </Col>
        <Col xs={4} md={3} className="text-right icon">
          {connectionIcon}
        </Col>
      </Row>
    </div>
  );
}
