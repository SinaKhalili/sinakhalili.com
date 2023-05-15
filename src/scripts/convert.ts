import fs from "fs";
import path from "path";

const inputFile = path.join(__dirname, "../pages/notes/abstraction.md");
const outputFile = path.join(__dirname, "../pages/notes/abstraction2.md");

fs.readFile(inputFile, "utf8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }

  const convertedData = convertWikilinksToMarkdown(data);

  fs.writeFile(outputFile, convertedData, "utf8", (err) => {
    if (err) {
      console.error("Error writing file:", err);
      return;
    }

    console.log("Conversion complete. Output file:", outputFile);
  });
});

function convertWikilinksToMarkdown(text: string) {
  // Regular expression to match [[wikilinks]]
  const wikilinkRegex = /\[\[(.*?)\]\]/g;

  // Replace each [[wikilink]] with its Markdown equivalent [wikilink](/encoded_wikilink)
  const convertedText = text.replace(wikilinkRegex, (match, wikilink) => {
    const encodedWikilink = encodeURIComponent(wikilink.replace(/ /g, "%20"));
    return `[${wikilink}](/notes/${encodedWikilink})`;
  });

  return convertedText;
}
