import React from 'react';
import { useHistory } from "react-router-dom";

export default function City({cityName, weatherType, temp, color}) {
  const history = useHistory();

  function handleClick() {
    history.push("/city?name=" + cityName);
  }

  return (
    <button
      className={"flex flex-row p-8 justify-between items-center " + color + " hover:bg-opacity-90"}
      onClick={handleClick}
    >
      <div className="flex flex-col">
        <div className="text-md font-light text-left">{weatherType}</div>
        <div className="text-2xl font-light">{cityName}</div>
      </div>

      <div className="text-5xl">{Math.round(temp)} °C</div>
    </button>
  );
}