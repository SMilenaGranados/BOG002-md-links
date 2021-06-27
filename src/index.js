const fs = require('fs');
const path = require('path');
const { readFileSync } = require('fs');

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
const fileInDirectory = (pathDir) => {
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
const isFileMd = (pathName) => {
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

//Función mostrar el texto del archivo
const showFileText = (pathName) => {
  const readingFile = readFileSync(pathName, {encoding: 'utf8'});
  if (readingFile.length > 1 ) {
          return readingFile
  }
  else {
    console.log('El documento está vacio')
  }
}
//console.log(showFileText('C:/Users/USUARIO/BOG002-md-links/READMEE.md'))

module.exports = {
  fileExists,
  fileInDirectory,
  isFileMd,
  showFileText
}


