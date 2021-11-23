/* eslint-disable */
const os = require("os");

const src = "../src";
const dist = "../dist";
const env = process.env.NODE_ENV || "development";
const isDev = env === "development";

let path = {
  build: "./build",
  src: src,
  pages: src + "/pages",
  common: src + "/common",
  plugins: src + "/common/plugins",
  js: src + "/common/js",
  css: src + "/common/css",
  img: src + "/common/img",
  dist,
};

let filename = {
  common: "common",
  core: "core",
};

const port = 9527;

let additionalData = isDev
  ? `$c-path: "https://localhost:${port}/src/common"; $p-path: "https://localhost:${port}/src/pages";`
  : `$c-path: "src/common"; $p-path: "src/pages";`;
// : '';

additionalData = additionalData.concat(
  "@import '../src/common/css/_import/var.scss';"
);

const getIp = () => {
  let interfaces = os.networkInterfaces();
  for (let devName in interfaces) {
    let iface = interfaces[devName];
    for (let i = 0; i < iface.length; i++) {
      let alias = iface[i];
      if (
        alias.family === "IPv4" &&
        alias.address !== "127.0.0.1" &&
        !alias.internal
      ) {
        return alias.address;
      }
    }
  }
};

module.exports = {
  path,
  filename,
  isDev,
  server: {
    port,
    hmr: {
      path: "/",
      protocol: "wss",
      host: getIp(),
      port: port,
    },
  },
  css: {
    additionalData,
  },
  exclude: {
    assets: "_assets",
  },
};
