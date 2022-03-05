import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import axios from "axios";

// const apiCall = {
//   event: "bts:subscribe",
//   data: { channel: "order_book_btcusd" },
// };

// const apiUrl = process.env.REACT_APP_API_URL
// const apiKey = process.env.REACT_APP_API_KEY;

interface DeviceListProps {
  selectedId: string | number;
  setSelectedId: any;
}

export default function DeviceList({ selectedId, setSelectedId }: DeviceListProps) {
  // const [bids, setBids] = useState([0]);

  // useEffect(() => {
  //   const ws = new WebSocket("wss://ws.bitstamp.net");

  //   ws.onopen = function (event) {
  //     ws.send(JSON.stringify(apiCall));
  //   };

  //   ws.onmessage = function (event) {
  //     const json = JSON.parse(event.data);
  //     try {
  //       if (json.event === "data") {
  //         setBids(json.data.bids.slice(0, 5));
  //       }
  //     } catch (err) {
  //       console.log(err);
  //     }
  //   };

  //   return () => ws.close();
  // });

  // const firstBids = bids.map((item) => {
  //   return (
  //     <div key={item}>
  //       <p>{item}</p>
  //     </div>
  //   );
  // });

  const [deviceData, setDeviceData] = useState([]);
  const [deviceList, setDeviceList] = useState<any[]>([]);

  function fetchDevices() {
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

  function getDevices(allDevices: Object[]) {
    let devices;

    if (deviceData) {
      devices = allDevices.map((item: any) => {
        return (
          <ListGroup.Item key={item.id} onClick={() => setSelectedId(item.id)}>
            <DeviceListElement
              type={item.type}
              name={item.name}
              connectionState={item.connectionState}
            />
          </ListGroup.Item>
        );
      });

      setDeviceList(devices);
    }
  }

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    getDevices(deviceData);
  }, [deviceData]);

  return (
    <div className="device-card">
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title className="text-center mb-4">Your devices</Card.Title>
          <Card.Text>{/* <div>{firstBids}</div> */}</Card.Text>
        </Card.Body>
      </Card>

      <div className="device-list">
        <ListGroup>{deviceList}</ListGroup>
      </div>
    </div>
  );
}
