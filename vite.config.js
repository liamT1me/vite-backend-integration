const path = require("path");
import { babel } from "@rollup/plugin-babel";
const config = require("./build/config");
const utils = require("./build/utils");
const { defineConfig } = require("vite");

export default () => {
  return defineConfig({
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
        src: path.resolve(__dirname, "./src"),
        plugins: path.resolve(__dirname, "./src/common/plugins"),
        pages: path.resolve(__dirname, "./src/pages"),
        commons: path.resolve(__dirname, "./src/common"),
      },
    },

    css: {
      preprocessorOptions: {
        scss: {
          additionalData: config.css.additionalData,
        },
      },
    },

    hot: {},

    build: {
      manifest: true,
      rollupOptions: !config.isDev
        ? {
            input: utils.getInputs(),
            output: {
              ...utils.setOutput,
            },
          }
        : {}
    },
    server: {
      host: "0.0.0.0",
      https: true,
      port: config.server.port,
      hmr: config.server.hmr,
      proxy: {
      },
    },
    plugins: [babel({ babelHelpers: "bundled" })],
  });
};
