export const splitParagraphIntoCharacters = (paragraph:string) => {
    const charArray = [];
    for (let i = 0; i < paragraph.length; i++) {
      charArray.push(paragraph.charAt(i));
    }
    return charArray;
  }


  