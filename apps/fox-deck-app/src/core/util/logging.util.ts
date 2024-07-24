import type {VitePluginLoggerMessage} from "@/plugins/vite-plugin-logger";

/**
 * Logger object for logging debug and error messages.
 * Logging messages sent with this logger will be shown in the terminal running vite.
 *
 * @see {vite-plugin-logger.ts}
 */
export const Logger = {
  debug: (message: VitePluginLoggerMessage) => {
    if (import.meta.hot) {
      import.meta.hot.send("vite-console-debug", message);
    }
  },
  warn: (message: VitePluginLoggerMessage) => {
    if (import.meta.hot) {
      import.meta.hot.send("vite-console-warn", message);
    }
  },
  error: (message: VitePluginLoggerMessage) => {
    if (import.meta.hot) {
      import.meta.hot.send("vite-console-error", message);
    }
  }
};