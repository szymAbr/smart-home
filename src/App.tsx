import React from "react";
import "./App.css";
import Header from "./components/Header";
import DeviceCard from "./components/DeviceCard";
import Footer from "./components/Footer";
import DeviceWindow from "./components/DeviceWindow";
// import DeviceList from "./components/DeviceList";
import { Container, Row, Col } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Header />
      <Container>
        <Row className="mt-4">
          <Col xs={12} md={5} lg={4}>
            <DeviceCard />
          </Col>
          <Col xs={12} md={7} lg={8}>
            <DeviceWindow />
          </Col>
        </Row>
        <Footer />
      </Container>
    </div>
  );
}

export default App;
