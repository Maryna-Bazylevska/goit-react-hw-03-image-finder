const API_KEY = "24237359-d8a1b7ca60bb2feb7d319b519";

export const fetchImages = (query, page) => {
  return fetch(
    `https://pixabay.com/api/?q=${query}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }
    return Promise.reject(new Error(`Нет картинки с таким ${query}`));
  });
};
export default fetchImages;
