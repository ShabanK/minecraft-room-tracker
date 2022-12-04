import { useState } from "react";

export default function RoomDiv({ isCurrent, children }) {
  const [bgcolor, setbgcolor] = useState(0);
  const listOfColors = ["blue", "green", "yellow", "orange", "white"];
  function changeBackgroundColor() {
    if (bgcolor + 1 === listOfColors.length) setbgcolor(0);
    else setbgcolor(bgcolor + 1);
  }

  return (
    <div
      className="box"
      style={{
        border: isCurrent ? "1px solid red" : "1px solid black",
        backgroundColor: listOfColors[bgcolor],
      }}
      onClick={changeBackgroundColor}
    >
      {children}
    </div>
  );
}
