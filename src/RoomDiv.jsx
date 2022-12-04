import { useState } from "react";

export default function RoomDiv({
  isCurrent,
  value,
  deleteBox,
  isHome,
  isBlank,
}) {
  const [bgcolor, setbgcolor] = useState(0);
  const listOfColors = ["blue", "green", "yellow", "orange", "white"];

  function changeBackgroundColor() {
    if (bgcolor + 1 === listOfColors.length) setbgcolor(0);
    else setbgcolor(bgcolor + 1);
  }
  if (isBlank) {
    return <div className="boxBlank"></div>;
  } else {
    return (
      <div
        className="box"
        style={{
          border: isCurrent ? "1px solid red" : "1px solid black",
          backgroundColor: listOfColors[bgcolor],
        }}
        onClick={changeBackgroundColor}
      >
        {!isHome && <button onClick={() => deleteBox(value)}>X</button>}
        {value}
      </div>
    );
  }
}
