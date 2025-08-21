import axios from 'axios'
import type { Artist } from '../interfaces/Artist'

export const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

export async function getArtists(accessToken: string): Promise<Artist[]> {
    const response = await axios.get(
        'https://api.spotify.com/v1/search',
        {
            params: {
                q: 'rock',
                type: 'artist',
                limit: 24
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data.artists.items
}

export async function getArtist(accessToken: string, artistId: string): Promise<Artist> {
    const response = await axios.get<Artist>(
        `https://api.spotify.com/v1/artists/${artistId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}

export async function getAlbums(accessToken: string, artistId: string) {
    const response = await axios.get(
        `https://api.spotify.com/v1/artists/${artistId}/albums`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data.items
}