// audioManager.ts
const songs: string[] = [
    '/songs/painting eggs.mp3',
    '/songs/screen door.mp3',
    '/songs/memory box.mp3',
    '/songs/edwardian nostalgia.mp3',
    '/songs/breakfast.mp3',
    '/songs/dish soap.mp3',
    '/songs/calico.mp3',
    '/songs/keepsakes.mp3',
    '/songs/country home.mp3',


];

export const getRandomSong = (): string => {
    const randomIndex = Math.floor(Math.random() * songs.length);
    return encodeURI(songs[randomIndex]);  // Ensure the song URL is properly encoded
};

export default songs;