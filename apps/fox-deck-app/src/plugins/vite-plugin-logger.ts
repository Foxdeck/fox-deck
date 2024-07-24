import {createLogger, type LogLevel, type Plugin} from "vite";

export type VitePluginLoggerMessage = {
  filename: string;
  message: string;
}

const level: LogLevel = "info";

const logger = createLogger(level, {
  prefix: "[fox-deck-app]"
});

const viteLogger = (): Plugin => {
  return {
    name: "vite-plugin-logger",
    configureServer(server) {
      server.ws.on("vite-console-warn", (data: VitePluginLoggerMessage) => {
        logger.warn(`(${data.filename}) => ${data.message}`, {
          timestamp: true,
        });
      });
      server.ws.on("vite-console-debug", (data: VitePluginLoggerMessage) => {
        logger.info(`(${data.filename}) => ${data.message}`, {
          timestamp: true,
        });
      });
      server.ws.on("vite-console-error", (data: VitePluginLoggerMessage) => {
        logger.error(`(${data.filename}) => ${data.message}`, {
          timestamp: true,
        });
      });
    }
  };
};

export default viteLogger;

