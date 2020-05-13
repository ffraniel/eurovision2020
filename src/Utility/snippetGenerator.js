export default function snippetGenerator(songLyrics) {
  if (typeof songLyrics === "string") {
    const snippetArray = songLyrics.trim().split(" ");
    const start = Math.round(Math.random() * (snippetArray.length / 2));
    const possibleLengths = [30, 45, 20, 20, 26, 30, 16, 26, 40];
    const chosenLength =
      possibleLengths[Math.floor(Math.random() * possibleLengths.length)];
    const snippetEnd = start + chosenLength;
    const snippet = snippetArray.slice(start, snippetEnd).join(" ");
    if (snippet.length === 0) {
      snippetGenerator(songLyrics);
    }
    return snippet;
  }
}
