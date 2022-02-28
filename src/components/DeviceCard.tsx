import React from "react";
import { Card, Row, Col, ListGroup } from "react-bootstrap";
import { Circle, CircleFill } from "react-bootstrap-icons";

interface DeviceProps {
  type: string;
  name: string;
  connected: boolean;
}

export default function DeviceCard({ type, name, connected }: DeviceProps) {
  return (
    <div className="device-card">
      {/* two columns in a card? space between elements to show connection status */}
      <Card className="mt-3 mb-3">
        <Card.Body>
          <Card.Title>{type}</Card.Title>

          <Card.Text>
            <ListGroup>
              <ListGroup.Item>
                <Row>
                  <Col className="text-left">{name}</Col>
                  <Col className="text-right">
                    {connected ? <CircleFill /> : <Circle />}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="text-left">{name}</Col>
                  <Col className="text-right">
                    {connected ? <CircleFill /> : <Circle />}
                  </Col>
                </Row>
              </ListGroup.Item>

              <ListGroup.Item>
                <Row>
                  <Col className="text-left">{name}</Col>
                  <Col className="text-right">
                    {connected ? <CircleFill /> : <Circle />}
                  </Col>
                </Row>
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
