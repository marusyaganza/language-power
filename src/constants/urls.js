export const hostUrl = process.env.API_URL;
export const gamesCatalogUrl = `${hostUrl}/api/games/catalog/`;
export const wordsUrl = `${hostUrl}/api/words/`;
export const gameUrl = `${hostUrl}/api/games/`;
export const userUrl = `${hostUrl}/api/user/`;
export const searchUrl = `${hostUrl}/api/words/${
  process.env.MOCK_SEARCH ? 'mocksearch' : 'search'
}/`;
