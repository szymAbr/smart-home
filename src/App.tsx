import React from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceCardContainer from "./components/DeviceCardContainer";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
import DeviceList from "./components/DeviceList";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row className="mt-4">
          <Col xs={12} md={4} lg={3}>
            <DeviceCardContainer />
          </Col>
          <Col xs={12} md={8} lg={9}>
            <DeviceWindow />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
