import React from "react";
import { Dropdown } from "react-bootstrap";

export default function DeviceListElement() {
  return (
    <div className="mt-3">
      <Dropdown>
        <Dropdown.Toggle variant="secondary">dropdown toggle</Dropdown.Toggle>

        <Dropdown.Menu variant="dark">
          <Dropdown.Item href="#/action-1" active>
            active
          </Dropdown.Item>

          <Dropdown.Item href="#/action-2">second action</Dropdown.Item>

          <Dropdown.Item href="#/action-3">third action</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}
