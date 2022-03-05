import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

interface DeviceProps {
  type?: string;
  name?: string;
  connectionState?: string;
  selectedId?: string | number;
}

export default function DeviceWindow({ selectedId }: DeviceProps) {
  const [selectedDevice, setSelectedDevice] = useState<any>([]);

  function fetchSelectedDevice() {
    axios
      .get(`https://my-smart-home-api.herokuapp.com/devices?id=${selectedId}`)
      .then((response) => {
        const data = response.data;

        setSelectedDevice(data[0]);
      })
      .catch((error) => {
        const errorMsg = error.message;
        console.log(errorMsg);
      });
  }

  useEffect(() => {
    fetchSelectedDevice();
  }, [selectedId]);

  useEffect(() => {
    if (selectedDevice) {
      console.log(selectedDevice.type);
    }
  }, [selectedDevice]);

  return (
    <div className="device-window">
      {selectedDevice ? (
        <Card className="my-3 text-center">
          <Card.Body>
            <Card.Title className="mb-4">{selectedDevice.type}</Card.Title>

            <Card.Text>connection status etc.</Card.Text>

            <Card.Text>connection status etc.</Card.Text>

            <Card.Text>connection status etc.</Card.Text>
          </Card.Body>
        </Card>
      ) : (
        <div className="my-3 pt-4 text-center">
          <h5>Choose a device to show more information.</h5>
        </div>
      )}
    </div>
  );
}
