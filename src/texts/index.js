import { countWords, countCharacters } from '../utils/utils';

import texts from './texts';

const enriched = texts.map((text,idx) => ({
  ...text,
  id:idx,
  words: countWords(text.content),
  characters: countCharacters(text.content),
}))


export default enriched;