import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
// import DeviceList from "./components/DeviceList";
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

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  return (
    <div className="App">
      <Header />
      <Container>
        <DragDropContext onDragEnd={handleOnDragEnd}>
          <Row className="mt-4">
            <Col xs={12} md={5} lg={4}>
              <DeviceList
                selectedId={selectedId}
                setSelectedId={setSelectedId}
                deviceOrder={deviceOrder}
                setDeviceOrder={setDeviceOrder}
              />
            </Col>
            <Col xs={12} md={7} lg={8}>
              <DeviceWindow selectedId={selectedId} />
            </Col>
          </Row>
        </DragDropContext>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
