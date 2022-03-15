import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { DropResult } from "react-beautiful-dnd";
import ParamDragDrop, { ParamOrder } from "./ParamDragDrop";

interface SmartBulbProps {
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  brightness: number;
  color: string;
  paramOrder: ParamOrder[];
  setParamOrder: Dispatch<SetStateAction<ParamOrder[]>>;
  handleOnDragEnd: (result?: DropResult) => void;
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
}: SmartBulbProps): JSX.Element {
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
    updatedParamList[3].paramValue = brightness + "/100";
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
