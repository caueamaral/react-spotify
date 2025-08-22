import type ArtistImage from './ArtistImage'

export default interface Artist {
    id: string,
    name: string,
    popularity: number,
    images: ArtistImage[],
    genres: string[],
    followers: {
        total: number
    }
}