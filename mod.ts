import { allScores, increment } from "./scores.ts";

const listener = Deno.listen({ port: 3444 });

for await (const conn of listener) {
  handleConn(conn);
}

async function handleConn(conn: Deno.Conn) {
  try {
    const httpConn = Deno.serveHttp(conn);

    const requestEvent = await httpConn.nextRequest();

    if (!requestEvent) {
      return;
    }

    const { socket, response } = Deno.upgradeWebSocket(requestEvent.request);

    socket.onmessage = (e) => {
      if (typeof e.data === "string") {
        if (e.data.length <= 50) {
          if (e.data.startsWith("+")) {
            const identifier = e.data.slice(1);
            const currentScores = increment(identifier);
            socket.send(JSON.stringify({ currentScores }));
          } else {
            socket.send(allScores());
          }
        }
      }
    };

    await requestEvent.respondWith(response);
  } catch (err) {
    const reason = err instanceof Error ? err.message : String(err);
    console.error(`Error handling connection: ${reason}`);
  }
}
