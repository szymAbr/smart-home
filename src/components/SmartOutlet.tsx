import React, { useState, useEffect, SetStateAction, Dispatch } from "react";
import { DropResult } from "react-beautiful-dnd";
import ParamDragDrop, { ParamOrder } from "./ParamDragDrop";

interface SmartOutletProps {
  name: string;
  connectionState: string;
  isTurnedOn: boolean;
  powerConsumption: number;
  paramOrder: ParamOrder[];
  setParamOrder: Dispatch<SetStateAction<ParamOrder[]>>;
  handleOnDragEnd: (result?: DropResult) => void;
}

export default function SmartOutlet({
  name,
  connectionState,
  isTurnedOn,
  powerConsumption,
  paramOrder,
  setParamOrder,
  handleOnDragEnd,
}: SmartOutletProps): JSX.Element {
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
