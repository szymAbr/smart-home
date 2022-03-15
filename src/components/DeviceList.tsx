import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import axios from "axios";

type DeviceListProps = {
  setSelectedId: Dispatch<SetStateAction<string>>;
};

export interface SmartDevice {
  type: string;
  id: string;
  name: string;
  connectionState: string;
}

export default function DeviceList({
  setSelectedId,
}: DeviceListProps): JSX.Element {
  const [deviceData, setDeviceData] = useState<SmartDevice[]>();

  function fetchDevices(): void {
    axios
      .get("https://my-smart-home-api.herokuapp.com/devices")
      .then((response) => {
        const data = response.data;

        setDeviceData(data);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }

  useEffect(() => {
    fetchDevices();

    setInterval(fetchDevices, 2500);
  }, []);

  return (
    <div className="device-list mt-4 py-2 mb-3">
      <ListGroup className="devices">
        {deviceData ? (
          deviceData.map((item) => (
            <ListGroup.Item
              key={item.id}
              className="device-item"
              onClick={() => setSelectedId(item.id)}
            >
              <DeviceListElement
                type={item.type}
                name={item.name}
                connectionState={item.connectionState}
              />
            </ListGroup.Item>
          ))
        ) : (
          <div className="my-3 pt-4 text-center">
            <h5>Loading data...</h5>
          </div>
        )}
      </ListGroup>
    </div>
  );
}
