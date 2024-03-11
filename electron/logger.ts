import { join } from "node:path";
import isDev from "electron-is-dev";
import pino from "pino";
import { app } from "electron";

export const logs = pino({
    level: isDev ? "debug" : "info",
    transport: {
        targets: [
            {
                level: isDev ? "debug" : "info",
                target: "pino-pretty",
                options: {
                    colorize: true,
                    translateTime: "yyyy-mm-dd HH:MM:ss",
                    ignore: "pid,hostname",
                    sync: false
                }
            },
            {
                level: "info",
                target: "pino/file",
                options: {
                    destination: join(app.getPath("logs"), `${new Date(Date.now()).toDateString()}`),
                    append: true,
                    sync: false
                }
            }
        ]
    }
});