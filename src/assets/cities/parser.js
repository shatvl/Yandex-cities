let fs = require('fs');

fs.readFileSync('./src/assets/cities/cities.txt', 'utf8', (err, contents) => {
    let cities = contents.split(' ');
    let citiesWithLetters = {};
    cities.forEach((v) => (citiesWithLetters[v.charAt(0).toUpperCase()] = citiesWithLetters[v.charAt(0).toUpperCase()] || []).push(v));
    fs.writeFile('./src/assets/cities/cities.json', JSON.stringify(citiesWithLetters));
});