import React from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";

export default function DeviceList() {
  return (
    <div className="device-list">
      <DeviceListElement />

      <DeviceListElement />

      <DeviceListElement />
    </div>
  );
}
