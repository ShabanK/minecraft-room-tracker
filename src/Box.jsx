// import MapTracker from "./entities/maptracker";
import Room from "./entities/room";
import { useState, useEffect } from "react";

export default function Box() {
  const gridRadius = 5;
  const [grid, setGrid] = useState(() => {
    let arr = new Array(gridRadius * 2 + 1).fill().map(function () {
      return new Array(gridRadius * 2 + 1).fill().map(() => {
        return "";
      });
    });
    arr[gridRadius][gridRadius] = new Room(`${gridRadius}/${gridRadius}`, true);
    return arr;
  });
  const [currentSelection, setCurrentSelection] = useState({
    row: gridRadius,
    col: gridRadius,
  });

  function addRoom(direction) {
    console.log(direction);
    const { row, col } = currentSelection;
    let targetRow = null,
      targetCol = null;
    switch (direction) {
      case "up":
        if (row - 1 >= 0) {
          if (!grid[row - 1][col]) {
            targetRow = row - 1;
            targetCol = col;
          }
        }
        break;
      case "down":
        if (row + 1 <= gridRadius * 2) {
          if (!grid[row + 1][col]) {
            console.log("fire");
            targetRow = row + 1;
            targetCol = col;
          }
        }
        break;
      case "left":
        if (col - 1 >= 0) {
          if (!grid[row][col - 1]) {
            // console.log(col - 1, grid[row][col - 1]);
            targetRow = row;
            targetCol = col - 1;
          }
        }
        break;
      case "right":
        if (col + 1 <= gridRadius * 2) {
          if (!grid[row][col + 1]) {
            targetRow = row;
            targetCol = col + 1;
          }
        }
        break;
    }

    console.log({ targetRow, targetCol });

    if (Number.isInteger(targetRow) && Number.isInteger(targetCol)) {
      // update grid
      setGrid(() => {
        return grid.map((rows, rowIndex) => {
          return rows.map((room, colIndex) => {
            if (rowIndex === targetRow && colIndex === targetCol) {
              return new Room(`${targetRow}/${targetCol}`, false);
            } else return room;
          });
        });
      });

      // update selection
      setCurrentSelection({ row: targetRow, col: targetCol });
    }
  }

  function debug() {
    // console.log(currentSelection);
    console.log(grid);
  }

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
                  <div key={boxIndex} className="boxBlank"></div>
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
