const fs = require('fs');
const path = require('path');


//Función existe ruta?
const fileExists = (pathName) => {
  try {
    fs.statSync(pathName);
    return true;
  } catch(err) {
    if (err.code === 'ENOENT') {
      return false;
    }
  }
}
//console.log(fileExists('READMEE.md'))

//Función para traer archivos .md de un directorio (se convierte ruta en absoluta)
const isFilesDir = (pathDir) => {
  const routeAbsolute = path.resolve(pathDir)
  fs.readdir(routeAbsolute, (err, files) => {
    if (err)
      console.log(err);
    else {
      let arrayFiles = [];
        files.forEach(file => {
        if (path.extname(file) === ".md"){
          arrayFiles.push(file);
        }
      })
      console.log(arrayFiles)
      return arrayFiles
    }
  })
}
//console.log(isFilesDir('Pruebas'))

//Función para traer un archivo.md (se convierte ruta en absoluta)
const isFile = (pathName) => {
  const arrayFile = [];
  const routeAbsolute = path.resolve(pathName);
  if (path.extname(routeAbsolute) === ".md") {
    arrayFile.push(routeAbsolute)
    return arrayFile
  }
  else {
    console.log('Ingresa una ruta valida')
  }
}
//console.log(isFile('Pruebas/Prueba2.md'))

module.exports = {
  fileExists,
  isFilesDir,
  isFile,
}


