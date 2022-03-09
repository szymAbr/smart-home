import React, { useState, useEffect } from "react";

interface DeviceNameProps {
  name: string;
}

export default function DeviceName({ name }: DeviceNameProps) {
  const [formattedName, setFormattedName] = useState("");

  function capitalizeName(name: string) {
    return name[0].toUpperCase() + name.slice(1);
  }

  function splitName(name: string) {
    const wordsArray = name.split("-");
    const fullName = wordsArray.join(" ");

    return fullName;
  }

  useEffect(() => {
    setFormattedName(splitName(capitalizeName(name)));
  }, [name]);

  return <div>{formattedName}</div>;
}
