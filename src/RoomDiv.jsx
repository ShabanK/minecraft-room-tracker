import { useState, useEffect, useRef } from "react";

export default function RoomDiv({
  isCurrent,
  value,
  deleteBox,
  isHome,
  isBlank,
  addRoom,
}) {
  const [bgcolor, setbgcolor] = useState(0);
  const listOfColors = ["blue", "green", "yellow", "orange", "white"];

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "auto",
        block: "center",
        inline: "center",
      });
    }
  }, [ref.current]);

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
      >
        <div className="pipe" onClick={() => addRoom("up", isCurrent)}></div>
        <div className="middle">
          <div
            className="pipe"
            onClick={() => addRoom("left", isCurrent)}
          ></div>
          <div
            className="inner-box"
            ref={isCurrent ? ref : null}
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
