import React from "react";
import { Card } from "react-bootstrap";

interface SmartBulbProps {
  brightness: number;
  color: string;
}

export default function SmartBulb({ brightness, color }: SmartBulbProps) {
  return (
    <div>
      <Card className="my-3 device-info">
        <Card.Body>
          <Card.Text>Brightness: {brightness}</Card.Text>
        </Card.Body>
      </Card>

      <Card className="my-3 device-info">
        <Card.Body>
          <Card.Text>Color: {color}</Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}
