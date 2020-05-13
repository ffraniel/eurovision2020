import shuffle from "./shuffle";

export default function(array, length) {
  return shuffle(array).slice(0, length);
}
