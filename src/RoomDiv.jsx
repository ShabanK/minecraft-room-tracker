export default function RoomDiv({ children }) {
  return (
    <div
      className="box"
      style={
        {
          // border: isCurrent(rowIndex, boxIndex) ? "1px solid red" : "1px",
        }
      }
      // onClick={changeBackgroundColor}
    >
      {children}
    </div>
  );
}
