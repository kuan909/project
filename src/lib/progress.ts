const CHAPTER_KEY = 'courier-current-chapter';

export function getSavedChapter(): 1 | 2 {
  return localStorage.getItem(CHAPTER_KEY) === '2' ? 2 : 1;
}

export function saveChapter(chapter: 1 | 2) {
  localStorage.setItem(CHAPTER_KEY, String(chapter));
}
