const { readFileSync } = require("fs");
const markdownLinkExtractor = require("markdown-link-extractor");
const fetch = require("node-fetch");
const { init } = require("./index");

//Promesa que resuelve arreglo con links
const extractLink = (file) => {
  const arrayLinks = [];
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

//Opción Validate
const validateLink = (link) => {
  return new Promise((resolve) => {
    fetch(link.link)
      .then((res) => {
        if (res.status <= 299) {
          link.status = "OK";
          link.statusNumber = res.status;
        } else if (res.status > 299) {
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
    const objectValidate = links.map((object) => {
      return validateLink(object);
    });
    Promise.all(objectValidate)
      .then((dato) => {
        resolve(dato);
      })
      .catch((err) => reject(`A ocurrido un error ${err}`));
  });
};

//Opción stats
const statsLinks = (file) => {
  return new Promise((resolve, reject) => {
    extractLink(file)
      .then((link) => {
        const linksUnique = new Set(link.map((elem) => elem.link));
        resolve({
          File: file,
          Unique: linksUnique.size,
          Total: link.length,
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const statsLinksFiles = (files) => {
  return new Promise((resolve, reject) => {
    const objectStats = files.map((object) => {
      return statsLinks(object);
    });
    Promise.all(objectStats)
      .then((dato) => {
        resolve(dato);
      })
      .catch((err) => reject(`A ocurrido un error ${err}`));
  });
};

//Opcion stats-validate
const linksStatsValidate = (file) => {
  return new Promise((resolve, reject) => {
    extractLink(file)
      .then((link) => {
        linksValidate(link).then((e) => {
          const linksUnique = new Set(e.map((elem) => elem.link));
          let content = 0;
          e.forEach((elem) => {
            if (elem.status !== "OK") {
              content += 1;
            }
          });
          resolve({
            File: file,
            Unique: linksUnique.size,
            Total: e.length,
            Broken: content,
          });
        });
      })
      .catch((err) => {
        reject(err);
      });
  });
};

const statsValidateLinksFiles = (files) => {
  return new Promise((resolve, reject) => {
    const objectStatsValidate = files.map((object) => {
      return linksStatsValidate(object);
    });
    Promise.all(objectStatsValidate)
      .then((dato) => {
        resolve(dato);
      })
      .catch((err) => reject(`A ocurrido un error ${err}`));
  });
};

//Función Md-links
const mdLinks = (file, options) => {
  return new Promise((resolve) => {
    const arrayFiles = init(file);
    const dataLinks = arrayFiles.map((links) => {
      return extractLink(links);
    });
    Promise.all(dataLinks).then((res) => {
      let newArrays = [].concat.apply([], res);
      if (options.stats && options.validate) {
        statsValidateLinksFiles(arrayFiles).then((dato) =>
          console.log("stats-validate links", dato)
        );
      } else if (options.stats) {
        statsLinksFiles(arrayFiles).then((dato) =>
          console.log("stats links", dato)
        );
      } else if (options.validate) {
        linksValidate(newArrays).then((dato) => resolve("validate links", linksValidate(dato)));
      } else {
        resolve(newArrays);
      }
    });
  });
};

module.exports = {
  mdLinks,
};
