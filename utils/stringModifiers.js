export function truncateTextByChars(text, maxChars) {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 500){
        maxChars = maxChars * 0.3
    } else if (screenWidth <= 600) {
        maxChars = maxChars * 0.5
      } else if (screenWidth <= 800){
        maxChars = maxChars * 0.7
      }
    console.log(maxChars);
    if (text.length > maxChars) {
      return text.substring(0, maxChars) + "...";
    }
    return text;
  }
  
export function truncateTextByWords(text, maxWords) {
    const words = text.trim().split(' ');
    const screenWidth = window.innerWidth;
    if (screenWidth <= 600){
        maxWords -= 2
    }
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    
    return text;
  }