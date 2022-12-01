export default class Room {
  constructor(roomId, isHome) {
    (this.roomId = roomId),
      (this.isHome = isHome),
      (this.branches = {
        up: null,
        down: null,
        left: null,
        right: null,
      });
  }

  //setters
  set branchUp(roomId) {
    this.branches.up = roomId;
  }
  set branchDown(roomId) {
    this.branches.down = roomId;
  }
  set branchLeft(roomId) {
    this.branches.left = roomId;
  }
  set branchRight(roomId) {
    this.branches.right = roomId;
  }
}
