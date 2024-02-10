export function capitalizeSentence(sentence: string): string {
  const minorWords: Set<string> = new Set([
    "a",
    "an",
    "the",
    "and",
    "but",
    "or",
    "nor",
    "for",
    "so",
    "yet",
    "as",
    "at",
    "by",
    "in",
    "of",
    "on",
    "to",
    "with",
    "from",
    "into",
    "over",
    "under",
    "around",
    "about",
    "below",
    "above",
    "between",
    "among",
    "through",
    "during",
    "before",
    "after",
    "since",
    "until",
    "without",
    "within",
    "among",
    "is",
    "are",
    "was",
    "were",
    "be",
    "being",
    "been",
    "am",
    "being",
  ]);
  const words: string[] = sentence.split(" ");

  for (let i = 0; i < words.length; i++) {
    if (
      i === 0 ||
      i === words.length - 1 ||
      !minorWords.has(words[i].toLowerCase())
    ) {
      words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
  }

  return words.join(" ");
}
