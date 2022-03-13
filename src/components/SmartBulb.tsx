import React, { useState, useEffect } from "react";
import ParamDragDrop from "./ParamDragDrop";

interface SmartBulbProps {
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  brightness: number;
  color: string;
  paramOrder: any;
  setParamOrder: any;
  handleOnDragEnd: any;
}

export default function SmartBulb({
  name,
  connectionState,
  isTurnedOn,
  brightness,
  color,
  paramOrder,
  setParamOrder,
  handleOnDragEnd,
}: SmartBulbProps) {
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
      paramName: "Power",
      paramValue: false,
    },
    {
      id: "3",
      paramName: "Brightness",
      paramValue: 0,
    },
    {
      id: "4",
      paramName: "Color",
      paramValue: "",
    },
  ]);

  useEffect(() => {
    const updatedParamList = [...paramList];
    const powerString = isTurnedOn ? "ON" : "OFF";

    updatedParamList[0].paramValue = name;
    updatedParamList[1].paramValue = connectionState;
    updatedParamList[2].paramValue = powerString;
    updatedParamList[3].paramValue = brightness;
    updatedParamList[4].paramValue = color;

    setParamOrder(updatedParamList);
  }, [
    brightness,
    color,
    connectionState,
    isTurnedOn,
    name,
    paramList,
    setParamOrder,
  ]);

  return (
    <ParamDragDrop paramOrder={paramOrder} handleOnDragEnd={handleOnDragEnd} />
  );
}
