import type { ArtistImage } from './ArtistImage'

export interface Artist {
    id: string,
    name: string,
    popularity: number,
    images: ArtistImage[]
}