import { join } from "node:path";
import isDev from "electron-is-dev";
import pino, { Logger } from "pino";
import { app } from "electron";
import dayjs from "dayjs";
import { writeFileSync } from "node:fs";

export default class Logs {
  private logger!: Logger;

  /**
   * Creates a new Logger using pino logger as a base.
   */
  constructor() {
    this.logger = pino({
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
              sync: isDev
            }
          },
          {
            level: isDev ? "debug" : "info",
            target: "pino/file",
            options: {
              destination: join(
                app.getPath("logs"),
                `${dayjs(Date.now()).format("YYYY-MM-DD")}.log`
              ),
              append: true,
              sync: false
            }
          }
        ]
      }
    });

    this.logger.debug("Logger fully started and ready!");
  }
  /**
   * Should be run when the program ends.
   * This ensures all the log files can be inspected later.
   */
  public shutdown() {
    this.logger.debug(
      "Logger is beeing shutdown, all messages are being flushed..."
    );
    this.logger.flush();

    this.logger.debug("Logger has shutdown.");
  }

  /**
   * Log something for debug purpose, like the state
   * of a variable.
   *
   * **Debug is only availible in development environment
   * and even then it's not logged to the file.**
   * @param message A log message.
   * @param object The variable that needs to be logged.
   */
  public async debug(message: string, object?: unknown) {
    if (object) {
      this.logger.debug(object, message);
    } else {
      this.logger.debug(message);
    }
  }

  /**
   * Log something.
   * @param message The message that will be logged.
   */
  public async info(message: string) {
    this.logger.info(message);
  }

  /**
   * Log a warning.
   * @param message A warning message.
   * @param error An error that got thrown with the warning.
   */
  public async warn(message: string, error?: Error) {
    if (error != undefined) {
      this.logger.warn(error, message);
    } else {
      this.logger.warn(message);
    }
  }

  /**
   * Log an error. This error shouldn't cause the program to exit.
   * @param error The error getting logged.
   * @param message A nice message to go along with it.
   */
  public async error(error: Error, message?: string) {
    if (message != undefined) {
      this.logger.error(error, message);
    } else {
      this.logger.error(
        error,
        "An error has occured, no message was provided!"
      );
    }
  }

  /**
   * Log a fatal error, these errors should cause the program to crash
   * and this should be the final log message.
   * This will automatically shutdown the logger as well.
   * @param error The error getting logged.
   * @param message A nice message to go along with it.
   */
  public fatal(error: Error, message?: string) {
    if (message != undefined) {
      this.logger.fatal(error, message);
    } else {
      this.logger.fatal(
        error,
        "A fatal error has occured, no message was provided!"
      );
    }

    writeFileSync(
      join(
        app.getPath("crashDumps"),
        `crash_report:${dayjs(Date.now()).format("YYYY-MM-DD_HH:mm:ss")}.txt`
      ),
      `${error.name}\n"${error.message}"\n\n${
        error.stack ? error.stack : "No stacktrace provided!"
      }`
    );
  }
}
