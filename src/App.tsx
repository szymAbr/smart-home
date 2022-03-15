import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceList from "./components/DeviceList";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  const [selectedId, setSelectedId] = useState("");

  return (
    <div className="app justify-content-center">
      <Header />

      <Container>
        <Row className="mt-4">
          <Col xs={12} md={5} lg={4}>
              <DeviceList
                setSelectedId={setSelectedId}
              />
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
