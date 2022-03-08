import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import DeviceListElement from "./DeviceListElement";
import axios from "axios";
import { Droppable, Draggable } from "react-beautiful-dnd";

// const apiCall = {
//   event: "bts:subscribe",
//   data: { channel: "order_book_btcusd" },
// };

// const apiUrl = process.env.REACT_APP_API_URL
// const apiKey = process.env.REACT_APP_API_KEY;

interface DeviceListProps {
  selectedId: string | number;
  setSelectedId: any;
  deviceOrder: any;
  setDeviceOrder: any;
}

export default function DeviceList({
  selectedId,
  setSelectedId,
  deviceOrder,
  setDeviceOrder,
}: DeviceListProps) {
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
  // const [deviceList, setDeviceList] = useState<any[]>([]);
  // const [deviceOrder, setDeviceOrder] = useState(deviceData);

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

  useEffect(() => {
    fetchDevices();
  }, []);

  useEffect(() => {
    setDeviceOrder(deviceData);
  }, [deviceData]);

  return (
    <div className="device-list mt-3 mb-3">
      <Droppable droppableId="devices">
        {(provided) => (
          <ListGroup
            className="devices"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {deviceOrder.map((item: any, index: any) => {
              return (
                <Draggable key={item.id} draggableId={item.id} index={index}>
                  {(provided) => (
                    <ListGroup.Item
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      onClick={() => setSelectedId(item.id)}
                    >
                      <DeviceListElement
                        type={item.type}
                        name={item.name}
                        connectionState={item.connectionState}
                      />
                    </ListGroup.Item>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </ListGroup>
        )}
      </Droppable>
    </div>
  );
}
