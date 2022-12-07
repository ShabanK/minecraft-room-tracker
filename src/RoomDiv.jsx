import { useState, useEffect, useRef } from "react";

export default function RoomDiv({
  isCurrent,
  value,
  deleteBox,
  isHome,
  isBlank,
  addRoom,
}) {
  const ref = useRef();
  const [bgcolor, setbgcolor] = useState(0);
  const listOfColors = ["blue", "green", "yellow", "orange", "white"];

  useEffect(() => {
    if (ref.current) {
      console.log("fire");
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  }, [isCurrent]);

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
          border: "1px solid black",
        }}
        ref={isCurrent ? ref : null}
      >
        <div className="pipe" onClick={() => addRoom("up", isCurrent)}></div>
        <div className="middle">
          <div
            className="pipe"
            onClick={() => addRoom("left", isCurrent)}
          ></div>
          <div
            className="inner-box"
            style={{
              border: isCurrent ? "2px solid red" : "2px solid black",
              backgroundColor: listOfColors[bgcolor],
            }}
            onClick={changeBackgroundColor}
          ></div>
          <div
            className="pipe"
            onClick={() => addRoom("right", isCurrent)}
          ></div>
        </div>
        <div className="pipe" onClick={() => addRoom("down", isCurrent)}></div>
        {/* {!isHome && <button onClick={() => deleteBox(value)}>X</button>}
        {value} */}
      </div>
    );
  }
}
