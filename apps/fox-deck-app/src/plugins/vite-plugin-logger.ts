import {createLogger, type LogLevel, type Plugin} from "vite";

export type VitePluginLoggerMessage = {
  filename: string;
  method?: string;
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
        logger.warn(buildMessage(data), {
          timestamp: true,
        });
      });
      server.ws.on("vite-console-debug", (data: VitePluginLoggerMessage) => {
        logger.info(buildMessage(data), {
          timestamp: true,
        });
      });
      server.ws.on("vite-console-error", (data: VitePluginLoggerMessage) => {
        logger.error(buildMessage(data), {
          timestamp: true,
        });
      });
    }
  };
};

function buildMessage(data: VitePluginLoggerMessage): string {
  if (!data.method) {
    return `(${data.filename}) => ${data.message}`;
  }
  return `(${data.filename}:${data.method}) => ${data.message}`;
}

export default viteLogger;

