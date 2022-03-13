import React, { useState, useEffect } from "react";
import ParamDragDrop from "./ParamDragDrop";

interface SmartTemperatureSensorProps {
  name: string;
  connectionState: string;
  temperature: number;
  paramOrder: any;
  setParamOrder: any;
  handleOnDragEnd: any;
}

export default function SmartTemperatureSensor({
  name,
  connectionState,
  temperature,
  paramOrder,
  setParamOrder,
  handleOnDragEnd,
}: SmartTemperatureSensorProps) {
  const [paramList] = useState([
    {
      id: "0",
      paramName: "Name",
      paramValue: "",
    },
    {
      id: "1",
      paramName: "Connection state",
      paramValue: "",
    },
    {
      id: "2",
      paramName: "Temperature",
      paramValue: 0,
    },
  ]);

  useEffect(() => {
    const updatedParamList = [...paramList];

    updatedParamList[0].paramValue = name;
    updatedParamList[1].paramValue = connectionState;
    updatedParamList[2].paramValue = temperature;

    setParamOrder(updatedParamList);
  }, [connectionState, name, paramList, setParamOrder, temperature]);

  return (
    <ParamDragDrop paramOrder={paramOrder} handleOnDragEnd={handleOnDragEnd} />
  );
}
