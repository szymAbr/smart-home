import React from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";

export default function DeviceList() {
  return (
    <div className="device-list">
      <ListGroup>
        <ListGroup.Item>
          <DeviceListElement
            type="Light bulb"
            name="Bedroom main"
            connected={false}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <DeviceListElement
            type="Electric socket"
            name="Bedroom main"
            connected={false}
          />
        </ListGroup.Item>

        <ListGroup.Item>
          <DeviceListElement
            type="Temperature sensor"
            name="Bedroom main"
            connected={false}
          />
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
