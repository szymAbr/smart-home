import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { DropResult } from "react-beautiful-dnd";
import ParamDragDrop, { ParamOrder } from "./ParamDragDrop";

interface SmartTemperatureSensorProps {
  name: string;
  connectionState: string;
  temperature: number;
  paramOrder: ParamOrder[];
  setParamOrder: Dispatch<SetStateAction<ParamOrder[]>>;
  handleOnDragEnd: (result?: DropResult) => void;
}

export default function SmartTemperatureSensor({
  name,
  connectionState,
  temperature,
  paramOrder,
  setParamOrder,
  handleOnDragEnd,
}: SmartTemperatureSensorProps): JSX.Element {
  const [paramList] = useState([
    {
      id: "0",
      paramName: "Name",
      paramValue: "",
    },
    {
      id: "1",
      paramName: "State",
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
