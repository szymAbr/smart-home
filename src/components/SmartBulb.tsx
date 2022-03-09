import React from "react";
import { Card } from "react-bootstrap";

interface SmartBulbProps {
  // id: string;
  // name: string;
  // connectionState: string;
  isTurnedOn: boolean;
  brightness: number;
  color: string;
}

export default function SmartBulb({
  isTurnedOn,
  brightness,
  color,
}: SmartBulbProps) {
  return (
    <div>
      <Card>
        <Card.Body>
          <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text>BRIGHTNESS: {brightness}</Card.Text>
        </Card.Body>
      </Card>

      <Card>
        <Card.Body>
          <Card.Text>COLOR: {color}</Card.Text>
        </Card.Body>
      </Card>
    </div>

    // <div>
    //   <Card>
    //     <Card.Body>
    //       <Card.Text>{isTurnedOn ? "ON" : "OFF"}</Card.Text>

    //       <Card.Text>BRIGHTNESS: {brightness}</Card.Text>

    //       <Card.Text>COLOR: {color}</Card.Text>
    //     </Card.Body>
    //   </Card>
    // </div>
  );
}
