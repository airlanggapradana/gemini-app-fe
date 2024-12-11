export function formatText(rawText: string): string {
  // Replace **text** with <b>text</b>
  const boldPattern = /\*\*(.*?)\*\*/g;
  const boldFormatted = rawText.replace(boldPattern, "<b>$1</b>");

  // Replace *text* with <i>text</i>
  const italicPattern = /\*(.*?)\*/g;
  const italicFormatted = boldFormatted.replace(italicPattern, "<i>$1</i>");

  // Replace __text__ with <u>text</u>
  const underlinePattern = /__(.*?)__/g;
  const underlineFormatted = italicFormatted.replace(
    underlinePattern,
    "<u>$1</u>",
  );

  // Replace - item with <li>item</li>
  const listItemPattern = /^-\s+(.*)$/gm;
  const listFormatted = underlineFormatted.replace(
    listItemPattern,
    "<li>$1</li>",
  );

  // Replace numbered lists (e.g., 1. item) with <li>item</li>
  const numberedListPattern = /^\d+\.\s+(.*)$/gm;
  const numberedListFormatted = listFormatted.replace(
    numberedListPattern,
    "<li>$1</li>",
  );

  // Wrap all list items in <ul> or <ol> tags
  const ulPattern = /(<li>.*?<\/li>)/gs;
  const formattedWithLists = numberedListFormatted.replace(
    ulPattern,
    "<ul>$1</ul>",
  );

  return formattedWithLists;
}
