import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
import { Container, Row, Col } from "react-bootstrap";
import { DragDropContext } from "react-beautiful-dnd";

function App() {
  const [selectedId, setSelectedId] = useState("");
  const [deviceOrder, setDeviceOrder] = useState([]);

  function handleOnDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(deviceOrder);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setDeviceOrder(items);
  }

  return (
    <div className="app justify-content-center">
      <Header />

      <Container>
        <Row className="mt-4">
          <Col xs={12} md={5} lg={4}>
            <DragDropContext onDragEnd={handleOnDragEnd}>
              <DeviceList
                setSelectedId={setSelectedId}
                deviceOrder={deviceOrder}
                setDeviceOrder={setDeviceOrder}
              />
            </DragDropContext>
          </Col>

          <Col xs={12} md={7} lg={8}>
            <DeviceWindow selectedId={selectedId} />
          </Col>
        </Row>

        <Footer />
      </Container>
    </div>
  );
}

export default App;
