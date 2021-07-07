#! / usr / bin / env nodo
//'C:/Users/USUARIO/BOG002-md-links/READMEE.md'

const argv = process.argv;
const { mdLinks } = require("./mdlinks");

const path = argv[2];
const options = {
  validate: false,
  stats: false
}

console.log('argv', argv[3])

if(argv.length > 3){
  if(argv[3] === '--v' || argv[3] === '--validate'){
    options.validate = true
  } 
  if(argv[3] === '--s' || argv[3] === '--stats'){
    options.stats = true
  }  
}

if(argv.length > 4){
  if(argv[4] === '--v' || argv[4] === '--validate'){
    options.validate = true
  } 
  if(argv[4] === '--s' || argv[4] === '--stats'){
    options.stats = true
  }  
}

if (!path) {
  console.log("Ingrese una ruta valida");
} else {
  mdLinks(path, options).then((res) => {   
    console.log(res)
  })
}



  // if (argv.stats && argv.validate) {
  //   console.log("Realizando stats y validate");
  //   linksStatsValidate(path).then((dato) =>
  //     console.log("validate stats", dato)
  //   );
  // } else if (argv.validate && !argv.stats) {
  //   //console.log("1");
  //   mdLinks(path, { validate: true })
  //   .then(console.log);
  // } else if (argv.stats && !argv.validate) {
  //   //console.log("2");
  //   statsLinks(path).then((dato) => console.log("stats links", dato));
  // } else {
  //       //console.log('Sin opciones')
  //       mdLinks(path, { validate: false})
  //       .then(console.log)
  // }
