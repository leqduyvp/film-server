const phimle = require('./phimle.json');
const phimbo = require('./phimbo.json');

const categories = ['Phim 18+', 'Phim chiếu rạp', 'Phim đề cử', 'TV Shows', 'Anime'];
const resolutions = ['480p', '720p', '1080p', '2k', '4k'];


const newArrr = categories.sort((a,b)=>0.5-Math.random());

console.log(newArrr);
console.log(categories)