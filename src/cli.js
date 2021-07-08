#! / usr / bin / env nodo

const argv = process.argv;
const { mdLinks } = require("./mdlinks");

const path = argv[2];
const options = {
  validate: false,
  stats: false,
};

//console.log("argv", argv);

if (argv.length > 3) {
  if (argv[3] === "--v" || argv[3] === "--validate") {
    options.validate = true;
  }
  if (argv[3] === "--s" || argv[3] === "--stats") {
    options.stats = true;
  }
}

if (argv.length > 4) {
  if (argv[4] === "--v" || argv[4] === "--validate") {
    options.validate = true;
  }
  if (argv[4] === "--s" || argv[4] === "--stats") {
    options.stats = true;
  }
}

if (!path) {
  console.log("Ingrese una ruta valida");
} else {
  mdLinks(path, options).then((res) => {
    console.log(res);
  });
}
