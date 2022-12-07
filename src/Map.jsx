// import MapTracker from "./entities/maptracker";
import Room from "./entities/room";
import RoomDiv from "./RoomDiv";
import { useState, useEffect, useMemo } from "react";

export default function Box() {
  const gridRadius = 20;
  const [mode, setMode] = useState(false);
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

  function addRoom(direction, isCurrent) {
    if (!isCurrent) return;
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
    const purgeIndex = trail.findIndex((trailItem) => value === trailItem);
    const purgeTrail = trail.slice(purgeIndex);

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
                if (box) console.log(box);
                return box ? (
                  box.isHome ? (
                    <RoomDiv
                      key={boxIndex}
                      branches={box.branches}
                      isHome={true}
                      isCurrent={isCurrent(rowIndex, boxIndex)}
                      value="HOME"
                      addRoom={addRoom}
                    />
                  ) : (
                    <RoomDiv
                      key={boxIndex}
                      branches={box.branches}
                      isCurrent={isCurrent(rowIndex, boxIndex)}
                      deleteBox={deleteBox}
                      isHome={false}
                      value={`${rowIndex - gridRadius}/${
                        boxIndex - gridRadius
                      }`}
                      addRoom={addRoom}
                    />
                  )
                ) : (
                  <RoomDiv key={boxIndex} isHome={false} isBlank={true} />
                );
              })}
            </div>
          );
        })}
      </div>
      <div style={{ display: "flex" }}>
        <button onClick={() => setMode(!mode)}>
          {mode ? "late" : "early"}
        </button>
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
