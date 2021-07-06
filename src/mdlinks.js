const { readFileSync } = require("fs");
const path = require("path");
const markdownLinkExtractor = require("markdown-link-extractor");
const fetch = require("node-fetch");
const { init } = require("./index");
const arrayLinks = [];

//Promesa que resuelve arreglo con links
const extractLink = (file) => {
  console.log("fileeee", file);
  return new Promise((resolve) => {
    const dataFile = readFileSync(file, { encoding: "utf8" });
    const links = markdownLinkExtractor(dataFile, true);
    links.forEach((link) => {
      const urlLink = link.href;
      const textLink = link.text;
      const object = {
        file: file,
        link: urlLink,
        text: textLink,
      };
      arrayLinks.push(object);
    });
    resolve(arrayLinks);
  });
};

//extractLink(file)// .then((dato) => console.log('extraer links',dato));

//Opción Validate
const validateLink = (link) => {
  return new Promise((resolve) => {
    fetch(link.link)
      .then((res) => {
        if (res.status <= 299) {
          link.status = "OK";
          link.statusNumber = res.status;
        } else if (res.status > 299 && res.status <= 499) {
          link.status = "FAIL";
          link.statusNumber = res.status;
        }
        resolve(link);
      })
      .catch((err) => {
        (link.status = "FAIL"), (link.statusNumber = `Link roto, error ${err}`);
        resolve(link);
      });
  });
};

const linksValidate = (links) => {
  return new Promise((resolve, reject) => {
    const prueba = links.map((object) => {
      return validateLink(object);
    });
    Promise.all(prueba)
      .then((dato) => {
        resolve(dato);
      })
      .catch((err) => reject(`A ocurrido un error ${err}`));
  });
};

//linksValidate(arrayLinks)// .then((dato) => console.log('validar links', dato));

//Opción stats
const statsLinks = (file) => {
  return new Promise((resolve, reject) => {
    extractLink(file)
      .then((link) => {
        const linksUnique = new Set(link.map((elem) => elem.link));
        resolve({
          File: routeabsoluteFile,
          Unique: linksUnique.size,
          Total: link.length,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//statsLinks(file)// .then((dato) => console.log('stats links', dato));

//Opcion stats-validate
const linksStatsValidate = (file) => {
  return new Promise((resolve, reject) => {
    linksValidate(file)
      .then((link) => {
        const linksUnique = new Set(link.map((elem) => elem.link));
        let content = 0;
        link.forEach((elem) => {
          if (elem.status !== "OK") {
            content += 1;
          }
        });
        console.log("content", content);
        resolve({
          File: routeabsoluteFile,
          Unique: linksUnique.size,
          Total: link.length,
          Broken: content,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};
//linksStatsValidate(arrayLinks) .then((dato) => console.table('validate stats', dato));

//Función Md-links
const mdLinks = (file, options) => {
  return new Promise((resolve, reject) => {
    //console.log('este es el file', file)
    const arrayFiles = init(file);
    const dataLinks = arrayFiles.map((links) => {
      return extractLink(links);
    });
    Promise.all(dataLinks).then((res) => {
      let newArrays = [].concat.apply([], res);
      if (options) {
        linksValidate(newArrays).then((dato) => resolve(linksValidate(dato)));
      } else {
        console.log("sin opciones", newArrays);
        resolve(newArrays);
      }
    });
    //console.log('este es datalinks', dataLinks)
  });
};
//mdLinks(file,true)

module.exports = {
  mdLinks,
};
