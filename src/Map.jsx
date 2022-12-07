// import MapTracker from "./entities/maptracker";
import Room from "./entities/room";
import RoomDiv from "./RoomDiv";
import { useState } from "react";

export default function Box() {
  const gridRadius = 20;
  const [homeDirection, setHomeDirection] = useState("");
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
    setHomeDirection("");
    trail.push(`${gridRadius}/${gridRadius}`);
    setCurrentSelection({
      row: gridRadius,
      col: gridRadius,
    });
  }

  function addRoom(direction, isCurrent, isHome = false) {
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
          } else {
            //check for home
            if (row - 1 === gridRadius && col === gridRadius) {
              if (homeDirection === "down") {
                setCurrentSelection({ row: row - 1, col: col });
              }
            } else {
              //default
              setCurrentSelection({ row: row - 1, col: col });
            }
          }
        }
        break;
      case "down":
        if (row + 1 <= gridRadius * 2) {
          if (!grid[row + 1][col]) {
            targetRow = row + 1;
            targetCol = col;
          } else {
            //check for home
            if (row + 1 === gridRadius && col === gridRadius) {
              if (homeDirection === "up") {
                setCurrentSelection({ row: row + 1, col: col });
              }
            } else {
              //default
              setCurrentSelection({ row: row + 1, col: col });
            }
          }
        }
        break;
      case "left":
        if (col - 1 >= 0) {
          if (!grid[row][col - 1]) {
            targetRow = row;
            targetCol = col - 1;
          } else {
            //check for home
            if (row === gridRadius && col - 1 === gridRadius) {
              if (homeDirection === "right") {
                setCurrentSelection({ row: row, col: col - 1 });
              }
            } else {
              //default
              setCurrentSelection({ row: row, col: col - 1 });
            }
          }
        }
        break;
      case "right":
        if (col + 1 <= gridRadius * 2) {
          if (!grid[row][col + 1]) {
            targetRow = row;
            targetCol = col + 1;
          } else {
            //check for home
            if (row === gridRadius && col + 1 === gridRadius) {
              if (homeDirection === "left") {
                setCurrentSelection({ row: row, col: col + 1 });
              }
            } else {
              //default
              setCurrentSelection({ row: row, col: col + 1 });
            }
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
            } else if (rowIndex === gridRadius && colIndex === gridRadius) {
              room.branchup = true;
              return room;
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

  function editHomeDirection(value) {
    setHomeDirection(value);
  }

  // function centerHome() {}
  // function centerSelection() {}

  function debug() {
    // console.log(currentSelection);
    // console.log(grid);
    // console.log(trail);
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
                      addRoom={addRoom}
                      homeDirection={homeDirection}
                      editHomeDirection={editHomeDirection}
                    />
                  ) : (
                    <RoomDiv
                      key={boxIndex}
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
        {/* <button onClick={() => setMode(!mode)}>
          {mode ? "late" : "early"}
        </button> */}
        <button onClick={reset}>reset</button>
      </div>
    </>
  );
}
