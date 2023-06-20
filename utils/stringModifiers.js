export function truncateTextByChars(description, maxLength) {
    if (description.length > maxLength) {
      return description.substring(0, maxLength) + "...";
    }
    return description;
  }
  
export function truncateTextByWords(description, maxWords) {
    const words = description.trim().split(' ');
    
    if (words.length > maxWords) {
      return words.slice(0, maxWords).join(' ') + '...';
    }
    
    return description;
  }