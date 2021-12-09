const conn = new WebSocket("ws://localhost:3444");

conn.onopen = () => {
  conn.send("+roj");
  conn.send("scores");
};

conn.onmessage = (e) => {
  console.log(e.data);
};
