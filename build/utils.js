const path = require("path");
const glob = require("glob");
const config = require("./config");

function getFileName(path) {
  let arr = path.split("/");
  let names = arr[arr.length - 1];
  return names && names.substring(0, names.indexOf("."));
}

function getFileSuffix(path) {
  let index = path.lastIndexOf(".");
  return path.substr(index + 1);
}

const repCom = config.path.common.replace("..", "");
const repPag = config.path.pages.replace("..", "");

const getInputs = () => {
  const patternFiles = [
    `${config.path.common}/js/core.js`,
    `${config.path.common}/js/common.js`,
    `${config.path.pages}/**?/index.js`,
    `${config.path.pages}/**?/core.js`,
  ];

  const files = patternFiles
    .map((file) =>
      glob.sync(file, {
        cwd: path.resolve(__dirname),
      })
    )
    .flat();

  let inputs = {};
  files.forEach((file) => {
    let key;
    if (file.includes(config.path.common)) {
      key = getFileName(file);
    } else if (file.includes(config.path.pages)) {
      key = file.match(new RegExp(`${config.path.pages}\/([^\/]*)`))[1];
      const fileName = getFileName(file);
      if (fileName === config.filename.core) {
        key = `${key}-${config.filename.core}`;
      }
    }
    inputs[key] = path.resolve(__dirname, file);
  });

  return inputs;
};

const setOutput = {
  assetFileNames(assetInfo) {
    const ext = getFileSuffix(assetInfo.name);

    // 处理css;
    if (ext === "css") {
      let fileName = getFileName(assetInfo.name);
      if (
        fileName === config.filename.core ||
        fileName === config.filename.common
      ) {
        return "common/css/[name][extname]";
      } else if (fileName.includes(`-${config.filename.core}`)) {
        const rep = new RegExp(`([^\s+]*)-${config.filename.core}`);
        let parentPath = fileName.match(rep)[1];
        if (parentPath) {
          return `pages/${parentPath}/css/${config.filename.core}[extname]`;
        }
      } else {
        return "pages/[name]/css/index[extname]";
      }
    }

    // 处理img
    if (["png", "jpg", "jpeg", "bmp", "gif"].includes(ext)) {
      if (assetInfo.name.includes(repCom)) {
        return "common/img/[name]-[hash][extname]";
      } else if (assetInfo.name.includes(repPag)) {
        const dir = assetInfo.name.match(/pages\/([^\/]*)/)[1];
        return `pages/${dir}/img/[name]-[hash][extname]`;
      }
    }
  },
  entryFileNames(entryInfo) {
    const { facadeModuleId } = entryInfo;

    if (facadeModuleId.includes(repCom)) {
      return "common/js/[name].js";
    } else if (facadeModuleId.includes(repPag)) {
      let fileName = getFileName(facadeModuleId);
      if (fileName === config.filename.core) {
        let name = facadeModuleId.match(new RegExp(`${repPag}\/([^\/]*)`))[1];
        return `pages/${name}/js/${config.filename.core}.js`;
      } else {
        return "pages/[name]/js/index.js";
      }
    }
  },
  chunkFileNames() {
    return "common/js/[name].js";
  },
};

module.exports = {
  getInputs,
  setOutput,
  getFileName,
  getFileSuffix,
};
