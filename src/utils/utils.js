

const countWords = (str) => {
  return str.split(" ").length;
};

const MSCtoWPM = (msc) => {
  
};

/**
 * Words per minute to milliseconds per character.
 * @param {*} text 
 * @param {*} WPM words per minute
 * @returns {*} MSC milliseconds per character
 */

const WPMtoMSC = (text, wpm) => {
  const words = countWords(text);
  const characters = text.length;
  const charactersPerWord = characters/words;
  const msc = 1000/((wpm * charactersPerWord)/60);
  return msc;
};

export {
  countWords,
  WPMtoMSC,
  MSCtoWPM,
}