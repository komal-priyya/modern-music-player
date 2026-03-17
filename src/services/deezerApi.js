const BASE_URL = "https://api.deezer.com";

export const searchArtists = async (query) => {
  try {
    const response = await fetch(`${BASE_URL}/search/artist?q=${query}`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching artists", error);
  }
};

export const getArtistTopTracks = async (artistId) => {
  try {
    const response = await fetch(`${BASE_URL}/artist/${artistId}/top?limit=10`);
    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching tracks", error);
  }
};