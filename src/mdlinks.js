const markdownLinkExtractor = require('markdown-link-extractor');
const fetch = require('node-fetch');


//Función extraer Links
const extractLink = (pathName) => {
    let route = 'C:/Users/USUARIO/BOG002-md-links/READMEE.md'
    const links = markdownLinkExtractor(pathName, true);
    const arrayLinks = []
    links.forEach(link => { 
        const urlLink = link.href 
        const textLink = link.text
        const fileLink = route
        const object = {
            file:fileLink,
            link:urlLink,
            text:textLink
        }
        arrayLinks.push(object)
        //console.log (arrayLinks)
    });
    return arrayLinks
}
extractLink(readingFile)




  
