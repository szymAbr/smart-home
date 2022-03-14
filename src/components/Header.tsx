import React from "react";
import { Navbar, Container } from "react-bootstrap";

export default function Header(): JSX.Element {
  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand>Smart Home</Navbar.Brand>
      </Container>
    </Navbar>
  );
}
