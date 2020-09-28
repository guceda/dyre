const countWords = (str) => {
  return str.split(" ").length;
};

const countCharacters = (str) => {
  return str.length;
};

const MSCtoWPM = (words, allCharacters, msc) => {
  const charactersPerWord = allCharacters / words;
  const msPerWord = msc * charactersPerWord;
  const minutesPerWord = msPerWord / 60000;
  const wpm = 1 / minutesPerWord;
  return Math.round(wpm);
};

/**
 * Words per minute to milliseconds per character.
 * @param {*} text
 * @param {*} WPM words per minute
 * @returns {*} MSC milliseconds per character
 */

const WPMtoMSC = (words, allCharacters, wpm) => {
  const charactersPerWord = allCharacters / words;
  const characterPerMin = wpm * charactersPerWord;
  const charactersPerSecond = characterPerMin / 60;
  const msc = 1000 / charactersPerSecond;
  return msc;
};

export { countWords, WPMtoMSC, MSCtoWPM, countCharacters };
