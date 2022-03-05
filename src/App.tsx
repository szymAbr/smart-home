import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
// import DeviceList from "./components/DeviceList";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [selectedId, setSelectedId] = useState("");

  useEffect(() => {
    console.log(selectedId);
  }, [selectedId]);

  return (
    <div className="App">
      <Header />
      <Container>
        <Row className="mt-4">
          <Col xs={12} md={5} lg={4}>
            <DeviceList selectedId={selectedId} setSelectedId={setSelectedId} />
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
