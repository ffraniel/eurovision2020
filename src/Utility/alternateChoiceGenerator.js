import shuffle from "./shuffle";

export default function(array, answerCountry) {
  const filteredArray = array.filter(song => {
    return song.country !== answerCountry;
  });
  return shuffle(filteredArray).slice(0, 3);
}
