const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');

//Leer el archivo
let pathName = 'C:/Users/USUARIO/BOG002-md-links/READMEE.md'
const readingFile = readFileSync(pathName, {encoding: 'utf8'});

//Función extraer Links
const extractLinks = (pathName) => {
    const links = markdownLinkExtractor(pathName, true);
    const arrayLinks = []
    links.forEach(link => { 
        const urlLink = link.href 
        const textLink = link.text
        let pathName = 'C:/Users/USUARIO/BOG002-md-links/READMEE.md'
        const object = {
            file:pathName,
            link:urlLink,
            text:textLink
        }
        arrayLinks.push(object)
        console.log (arrayLinks)
    });
}
extractLinks(readingFile)



        
    

 




    
