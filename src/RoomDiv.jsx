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
  const [initialState, setInitialState] = useState("");

  useEffect(() => {
    if (ref.current) {
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
        <div
          className="pipe"
          onClick={() => {
            setInitialState("up");
            addRoom("up", isCurrent, isHome);
          }}
          style={{
            visibility:
              isHome && initialState && !(initialState === "up") && "hidden",
          }}
        ></div>
        <div className="middle">
          <div
            className="pipe"
            onClick={() => {
              setInitialState("left");
              addRoom("left", isCurrent, isHome);
            }}
            style={{
              visibility:
                isHome &&
                initialState &&
                !(initialState === "left") &&
                "hidden",
            }}
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
            onClick={() => {
              setInitialState("right");
              addRoom("right", isCurrent, isHome);
            }}
            style={{
              visibility:
                isHome &&
                initialState &&
                !(initialState === "right") &&
                "hidden",
            }}
          ></div>
        </div>
        <div
          className="pipe"
          style={{
            visibility:
              isHome && initialState && !(initialState === "down") && "hidden",
          }}
          onClick={() => {
            setInitialState("down");
            addRoom("down", isCurrent, isHome);
          }}
        ></div>
      </div>
    );
  }
}
