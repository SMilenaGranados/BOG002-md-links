#! / usr / bin / env nodo
//'C:/Users/USUARIO/BOG002-md-links/READMEE.md'

const [, , ...args] = process.argv;
const yargs = require("yargs");
const { mdLinks } = require("./mdlinks");
const { statsLinks } = require("./mdlinks");
const { linksStatsValidate } = require("./mdlinks");
const path = args[0];
console.log('este es el path', path)

const argv = yargs
  .usage("usage: md-links <path-to-file> [options]")
  .options("validate", {
    alias: "v",
    description: "Validate links",
    type: "boolean",
    mode: false,
  })
  .option("stats", {
    alias: "s",
    description: "Stats links",
    type: "boolean",
    mode: false,
  })
  .help()
  .alias("help", "h").argv;
console.log('argv', argv)
if (!path) {
  console.log("Ingrese una ruta valida");
} else {
  if (argv.stats && argv.validate) {
    console.log("Realizando stats y validate");
    linksStatsValidate(path).then((dato) =>
      console.log("validate stats", dato)
    );
  } else if (argv.validate && !argv.stats) {
    //console.log("1");
    mdLinks(path, { validate: true })
    .then(console.log);
  } else if (argv.stats && !argv.validate) {
    //console.log("2");
    statsLinks(path).then((dato) => console.log("stats links", dato));
  } else {
        //console.log('Sin opciones')
        mdLinks(path, { validate: false})
        .then(console.log)
  }
}
