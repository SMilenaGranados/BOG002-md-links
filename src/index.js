const fs = require("fs");
const path = require("path");
const mdLinks = require("./mdlinks");
const routeAdd = "Pruebas";
const createRouteAbsolute = (pathName) => path.resolve(pathName);
const isFileMd = (pathName) => path.extname(pathName) === ".md";

const fileInDirectory = (pathDir) => {
  const arrayFiles = []
  const routeAbsolute = createRouteAbsolute(pathDir);
  
  console.log('este es RA', routeAbsolute)
  const isDirectory = fs.lstatSync(routeAbsolute).isDirectory();
  console.log('Dir', isDirectory)
  if (isDirectory) {
    fs.readdir(routeAbsolute, (err, files) => {
      if (err) console.log(err);
      else {
        files.forEach((file) => {
          console.log('file', file)
          if (isFileMd(file)) {
            arrayFiles.push(file)
          } else {
            console.error("No se encontraron archivos con extensión .md");
          }
        });
      }
    });
  } else {
    if (isFileMd(routeAbsolute)) {
      console.log("Soy una ruta a", routeAbsolute);
      arrayFiles.push(routeAbsolute)
    } else {
      console.error("El archivo no es extensión .md");
    }

  }
  console.log('arrayFiles', arrayFiles)
  return arrayFiles
};

//Función iniciar
const init = (pathName) => {
  console.log("1");
  try {
    if (fs.statSync(pathName)) {
      return fileInDirectory(pathName)
    } else {
      console.error("La ruta no existe");
    }
  } catch (err) {
    if (err.code === "ENOENT") {
      console.log('La ruta no existe')
    }
  }
  return [];
};

module.exports = {
  init
};
