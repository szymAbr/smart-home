import React, { useState, useEffect } from "react";
import ParamDragDrop from "./ParamDragDrop";

interface SmartOutletProps {
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  powerConsumption: number;
  paramOrder: any;
  setParamOrder: any;
  handleOnDragEnd: any;
}

export default function SmartOutlet({
  name,
  connectionState,
  isTurnedOn,
  powerConsumption,
  paramOrder,
  setParamOrder,
  handleOnDragEnd,
}: SmartOutletProps) {
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
      paramName: "Power consumption",
      paramValue: 0,
    },
  ]);

  useEffect(() => {
    const updatedParamList = [...paramList];
    const powerString = isTurnedOn ? "ON" : "OFF";

    updatedParamList[0].paramValue = name;
    updatedParamList[1].paramValue = connectionState;
    updatedParamList[2].paramValue = powerString;
    updatedParamList[3].paramValue = powerConsumption;

    setParamOrder(updatedParamList);
  }, [
    connectionState,
    isTurnedOn,
    name,
    paramList,
    powerConsumption,
    setParamOrder,
  ]);

  return (
    <ParamDragDrop paramOrder={paramOrder} handleOnDragEnd={handleOnDragEnd} />
  );
}
