import MapTracker from "./entities/maptracker";
import { useState, useEffect } from "react";

export default function Box() {
  const [map, setMap] = useState(null);

  useEffect(() => {
    setMap(new MapTracker());
    console.log(map);
  }, []);

  function addRoom(direction) {
    console.log(direction);
  }

  function debug() {
    console.log(map);
  }

  return (
    <div className="grid">
      <div className="row">
        <div className="box"></div>
      </div>
    </div>
  );
  {
    /* 
    <>
      <div className="main">
        {map &&
          map.grid.map((room, index) => (
            <div key={index} className="room">
              {room.roomId}
            </div>
          ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <button onClick={() => addRoom("up")}>up</button>
        <button onClick={() => addRoom("down")}>down</button>
        <button onClick={() => addRoom("left")}>left</button>
        <button onClick={() => addRoom("right")}>right</button>
        <button onClick={debug}>test</button>
      </div> 
      </>
    */
  }
}
