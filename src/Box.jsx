// import MapTracker from "./entities/maptracker";
import Room from "./entities/room";
import { useState, useEffect } from "react";

export default function Box() {
  const gridRadius = 5;
  const [grid, setGrid] = useState(() => {
    let arr = new Array(gridRadius * 2 + 1).fill().map(function () {
      return new Array(gridRadius * 2 + 1).fill().map(() => {
        return null;
      });
    });
    arr[gridRadius][gridRadius] = new Room("60,60", true);
    return arr;
  });

  function addRoom(direction) {
    console.log(direction);
  }

  function debug() {}

  return (
    <>
      <div className="grid">
        {grid.map((rows, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {rows.map((box, boxIndex) => {
                box && console.log(box);
                return box ? (
                  <div key={boxIndex} className="box">
                    HOME
                  </div>
                ) : (
                  <div key={boxIndex} className="box">
                    {rowIndex},{boxIndex}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => addRoom("up")}>up</button>
        <button onClick={() => addRoom("down")}>down</button>
        <button onClick={() => addRoom("left")}>left</button>
        <button onClick={() => addRoom("right")}>right</button>
        <button onClick={debug}>test</button>
      </div>
    </>
  );
}
