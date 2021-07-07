const fs = require("fs");
const path = require("path");
const createRouteAbsolute = (pathName) => path.resolve(pathName);
const isFileMd = (pathName) => path.extname(pathName) === ".md";

const fileInDirectory = (pathDir) => {
  const arrayFiles = [];
  const routeAbsolute = createRouteAbsolute(pathDir);
  const isDirectory = fs.lstatSync(routeAbsolute).isDirectory();
  if (isDirectory) {
    const files = fs.readdirSync(routeAbsolute);
    files.forEach((file) => {
      if (isFileMd(file)) {
        arrayFiles.push(path.join(routeAbsolute, file));
      } else {
        console.error("No se encontraron archivos con extensión .md");
      }
    });
  } else {
    if (isFileMd(routeAbsolute)) {
      arrayFiles.push(routeAbsolute);
    } else {
      console.error("El archivo no es extensión .md");
    }
  }
  return arrayFiles;
};

//Función iniciar
const init = (pathName) => {
  try {
    if (fs.statSync(pathName)) {
      return fileInDirectory(pathName);
    } else {
      console.error("La ruta no existe");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log("La ruta no existe");
    }
  }
  return [];
};

module.exports = {
  init,
};
