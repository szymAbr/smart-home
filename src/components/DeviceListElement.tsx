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
        <Col>{typeIcon}</Col>
        <Col className="text-left">
          <DeviceName name={name} />
        </Col>
        <Col className="text-right">{connectionIcon}</Col>
      </Row>
    </div>
  );
}
