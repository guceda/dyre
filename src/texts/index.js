import { countWords, countCharacters } from "../utils/utils";

import texts from "./texts";

const enriched = texts.map((text, idx) => {
  return {
    ...text,
    id: idx,
    words: countWords(text.content),
    allCharacters: countCharacters(text.content),
    nonAlphaNumCharacters: text.content.replace(/[a-zA-Z0-9]/g, "").length,
  };
});

export default enriched;
