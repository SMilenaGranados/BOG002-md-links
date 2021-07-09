const mdLinks = require('../src/mdlinks');

const { 
  mockExtractLinks,
  mockValidateLinks,
  mockStatsLinks,
  mockStatsValidateLinks,
 } = require('../test/mocks/mocks');

const routeDirectory = 'C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md';
//const routeFile = `${__dirname}/test_directory/READMEPrueba.md`;
//const routeError = `${__dirname}/test_directory/READM.md`;

describe('mdLinks', () => {
  it('Deberia ser una funcion', () => {
    expect(typeof(mdLinks)).toBe('function');
  });

  it('Deberia retornar un arreglo con informacion de archivos markdown', () => {
    return mdLinks(routeDirectory, { validate:false, stats: false }).then((res) => {
      expect(res).toStrictEqual(mockExtractLinks);
    });
  });

  it('Deberia retornar un arreglo con validacion de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { validate: true }).then((res) => {
      expect(res).toStrictEqual(mockValidateLinks);
    });
  });

  it('Deberia retornar un arreglo con el estado de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { stats: true }).then((res) => {
      expect(res).toStrictEqual(mockStatsLinks);
    });
  });

  it('Deberia retornar un arreglo con el estado y validacion de links de archivos markdown', () => {
    return mdLinks(routeDirectory, { stats: true, validate: true }).then((res) => {
      expect(res).toStrictEqual(mockStatsValidateLinks);
    });
  });
})
