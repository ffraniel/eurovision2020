const fetch = require('node-fetch');
const fs = require("fs");
const cheerio = require('cheerio');

const participantsPage = 'https://eurovision.tv/event/rotterdam-2020/participants';
var classes = ".w-full .flex-grid__item";
var lyricsClass = ".whitespace-pre-line";
var songsList = [];

fetch(participantsPage)
  .then(res => res.text())
  .then(body => {

    const $ = cheerio.load(body);
    var counter = 0;
    $((classes)).each(elem => counter ++);
    console.log(counter)

    $((classes)).each((i, element) => {
      // if (i === 8) {
        const item = $(element).html();

        const songObj = {
          artistImg: $(item).find('img.w-full').attr('src'),
          songName: $(item).find('.card__content span').text().split('\n')[2],
          country: $(item).find('.card__pill span').text().trim(),
          artistLink: $(item).find('.aspect-ratio--card').attr('href'),
          artist: $(item).find('.h3.card__title.mb-5').text().trim(),
          lilFlag: $(item).find('.emojione').attr('src')
        };

        fetch(songObj.artistLink)
          .then(res => res.text())
          .then(body2 => {
            const $2 = cheerio.load(body2);

            songObj.lyrics = $2(lyricsClass).text();
            songObj.blurb = $2('article .font-bold.text-xl.mb-30').text();

            songsList.push(songObj);
            if (songsList.length === counter) {
              console.log("finished");
              fs.writeFile("../src/data/lyricsJson.json", JSON.stringify(songsList), 'utf8', function (err) {
                if (err) {
                  return console.log(err);
                }
                console.log("saved it!");
              }); 
            }
          })
          .catch(err => {
            console.log("Error: ", err);
          })

          

        // setTimeout(()=>{
        //   console.log(songsList)
        //   return songsList;

        // }, 6000)

      // }      
    })
  });

    
  
