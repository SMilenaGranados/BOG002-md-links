const fs = require('fs');
const { readFileSync } = require('fs');
const markdownLinkExtractor = require('markdown-link-extractor');



const markdown = readFileSync('READMEE.md', {encoding: 'utf8'});
//console.log('leer el archivo', markdown)

const extractLinks = (pathName) => {
    const links = markdownLinkExtractor(pathName, true);
    const arrayLinks = []
    links.forEach(link => { 
        const urlLink = link.href
        const textLink = link.text
        const file = './READMEE.md'
        const object = {
            file:file,
            link:urlLink,
            text:textLink
        }
        arrayLinks.push(object)
        
    });
   console.log(arrayLinks)  
}

extractLinks(markdown)
//console.log('este es markdown', extractLinks) 
// const details = markdownLinkExtractor(markdown, true);
// details.forEach(detail => console.log(detail));








// //console.log(fileRead('/src/README.md'))
// const getLinks = (pathName) => {
//     return new Promise ((resolve, reject) => {
//         console.log('pathname', pathName)
//         const infoFile = fileRead (pathName);
//         console.log('infoFole', infoFile)
//         try {
//             const infoFileHTML = marked ('[Markdown](https://es.wikipedia.org/wiki/Markdown) es un lenguaje de marcado' +
//             'ligero muy popular entre developers.');
//             console.log('infoHTML', infoFileHTML)
//             resolve (infoFileHTML)
//         }
//         catch (e) {
//             console.log(e)
//         }
    
        
//     })
// }

// console.log(getLinks('READMEE.md').then(rest => console.log(rest)))
// console.log('Hola mundooo')