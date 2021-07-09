const mockExtractLinks = [
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://nodejs.org/",
    text: "Node.js",
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://user-images.githubuasdesercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
    text: "md-links",
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://nodejs.org/es/",
    text: "Node.js",
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://devgtyjelopers.google.com/v8/",
    text: "motor de JavaScript V8 de Chrome",
  },
];

const mockValidateLinks = [
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://es.wikipedia.org/wiki/Markdown",
    text: "Markdown",
    status: "OK",
    statusNumber: 200,
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://nodejs.org/",
    text: "Node.js",
    status: "OK",
    statusNumber: 200,
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://user-images.githubuasdesercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg",
    text: "md-links",
    status: "FAIL",
    statusNumber:
      "Link roto, error FetchError: request to https://user-images.githubuasdesercontent.com/110297/42118443-b7a5f1f0-7bc8-11e8-96ad-9cc5593715a6.jpg failed, reason: getaddrinfo ENOTFOUND user-images.githubuasdesercontent.com",
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://nodejs.org/es/",
    text: "Node.js",
    status: "OK",
    statusNumber: 200,
  },
  {
    file: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    link: "https://devgtyjelopers.google.com/v8/",
    text: "motor de JavaScript V8 de Chrome",
    status: "FAIL",
    statusNumber:
      "Link roto, error FetchError: request to https://devgtyjelopers.google.com/v8/ failed, reason: getaddrinfo ENOTFOUND devgtyjelopers.google.com",
  },
];

const mockStatsLinks = [
  {
    File: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    Unique: 5,
    Total: 5,
  },
];

const mockStatsValidateLinks = [
  {
    File: "C:/Users/USUARIO/BOG002-md-links/test/directoryTest/Prueba.md",
    Unique: 5,
    Total: 5,
    Broken: 2,
  },
];

module.exports = {
  mockExtractLinks,
  mockValidateLinks,
  mockStatsLinks,
  mockStatsValidateLinks,
};
