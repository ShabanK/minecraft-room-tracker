// import MapTracker from "./entities/maptracker";
import Room from "./entities/room";
import RoomDiv from "./RoomDiv";
import { useState, useEffect, useMemo } from "react";

export default function Box() {
  const gridRadius = 5;
  const [trail, setTrail] = useState([]);
  const [grid, setGrid] = useState(() => {
    let arr = new Array(gridRadius * 2 + 1).fill().map(function () {
      return new Array(gridRadius * 2 + 1).fill().map(() => {
        return null;
      });
    });
    arr[gridRadius][gridRadius] = new Room(`${gridRadius}/${gridRadius}`, true);
    trail.push(`${gridRadius}/${gridRadius}`);
    return arr;
  });
  const [currentSelection, setCurrentSelection] = useState({
    row: gridRadius,
    col: gridRadius,
  });

  function reset() {
    let arr = new Array(gridRadius * 2 + 1).fill().map(function () {
      return new Array(gridRadius * 2 + 1).fill().map(() => {
        return null;
      });
    });
    arr[gridRadius][gridRadius] = new Room(`${gridRadius}/${gridRadius}`, true);
    setGrid(arr);
    trail.push(`${gridRadius}/${gridRadius}`);
    setCurrentSelection({
      row: gridRadius,
      col: gridRadius,
    });
  }

  function addRoom(direction) {
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
            targetRow = row + 1;
            targetCol = col;
          }
        }
        break;
      case "left":
        if (col - 1 >= 0) {
          if (!grid[row][col - 1]) {
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
      trail.push(`${targetRow}/${targetCol}`);
    }
  }

  function isCurrent(rowIndex, colIndex) {
    const { row, col } = currentSelection;
    return rowIndex === row && colIndex === col;
  }

  function deleteBox(value) {
    console.log(value);
    console.log(trail.findIndex((trailItem) => value === trailItem));
    const purgeIndex = trail.findIndex((trailItem) => value === trailItem);
    const purgeTrail = trail.slice(purgeIndex);
    console.log({ purgeTrail });
    // for (let i = purgeIndex; i < trail.length; i++) {
    //   const purgeValue = trail[i];
    //   console.log(purgeValue);
    //   const targetRow = parseInt(purgeValue.split("/")[0]);
    //   const targetCol = parseInt(purgeValue.split("/")[1]);

    //   console.log({ targetRow, targetCol });
    // }
    setGrid(() => {
      return grid.map((rows, rowIndex) => {
        return rows.map((room, colIndex) => {
          if (
            purgeTrail.find(
              (purgeItem) => purgeItem === `${rowIndex}/${colIndex}`
            )
          ) {
            return null;
          } else return room;
        });
      });
    });
  }

  function debug() {
    // console.log(currentSelection);
    // console.log(grid);
    console.log(trail);
  }

  return (
    <>
      <div className="grid">
        {grid.map((rows, rowIndex) => {
          return (
            <div key={rowIndex} className="row">
              {rows.map((box, boxIndex) => {
                return box ? (
                  box.isHome ? (
                    <RoomDiv
                      key={boxIndex}
                      isHome={true}
                      isCurrent={isCurrent(rowIndex, boxIndex)}
                      value="HOME"
                    />
                  ) : (
                    <RoomDiv
                      key={boxIndex}
                      isCurrent={isCurrent(rowIndex, boxIndex)}
                      deleteBox={deleteBox}
                      isHome={false}
                      value={`${rowIndex}/${boxIndex}`}
                    />
                  )
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
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
