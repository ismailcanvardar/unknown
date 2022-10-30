import express, { Application } from "express";
import { Server, WebSocket } from "ws";
import { prisma } from "../utils/prisma";

class App {
  private static instance: App;
  private _app: Application;
  private _wsServer: Server<WebSocket>;

  private constructor(_routes: []) {
    this._app = express();
    this.initializeRoutes(_routes);
    this._wsServer = new WebSocket.Server(
      {
        port: 8080,
        backlog: 5,
        clientTracking: true,
      },
      () => {
        console.log("Websocket server started on port 8080.");
      }
    );
  }

  public static getInstance(_routes: any): App {
    if (!App.instance) {
      App.instance = new App(_routes);
    }

    return App.instance;
  }

  private initializeRoutes(routes: []) {
    routes.forEach((route: any) => {
      this._app.use(route.basePath, route.router);
    });
  }

  private prepareWs() {
    const users = new Set();

    const sendMessage = (message: any) => {
      users.forEach((user: any) => {
        user.ws.send(JSON.stringify(message));
      });
    };

    this._wsServer.on("connection", (ws: any) => {
      console.log(ws.headers);
      const userRef = {
        ws,
      };
      users.add(userRef);

      ws.on("message", (message: string) => {
        try {
          const data = JSON.parse(message);

          if (
            typeof data.sender !== "string" ||
            typeof data.body !== "string"
          ) {
            console.error("Invalid message");
            return;
          }

          const messageToSend = {
            sender: data.sender,
            body: data.body,
            sentAt: Date.now(),
          };

          sendMessage(messageToSend);
        } catch (e) {
          console.error("Error passing message!", e);
        }
      });

      ws.on("close", (code: number, reason: any) => {
        users.delete(userRef);
        console.log(`Connection closed: ${code} ${reason}!`);
      });
    });
  }

  async listen() {
    try {
      const PORT = process.env.PORT;

      this._app.listen(PORT, async () => {
        console.log(`Http server on port ${PORT}.`);
        this.prepareWs();
        await prisma.$connect();
        await prisma.$disconnect();
        console.log("Prisma successfully connected.");
      });
    } catch (err: any) {
      await prisma.$disconnect();
      process.exit(1);
    }
  }
}

export default App;
