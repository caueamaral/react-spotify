import axios from 'axios'
import type { Artist } from '../interfaces/Artist'

const clientId = import.meta.env.VITE_CLIENT_ID
const clientSecret = import.meta.env.VITE_CLIENT_SECRET

export const spotifyApi = axios.create({
    baseURL: 'https://api.spotify.com/v1'
})

export async function getAccessToken(): Promise<string> {
    const authHeader = btoa(`${clientId}:${clientSecret}`)

    const response = await axios.post(
        'https://accounts.spotify.com/api/token',
        new URLSearchParams({ grant_type: 'client_credentials' }),
        {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': `Basic ${authHeader}`
            },
        }
    )

    return response.data.access_token
}

export async function getArtists(accessToken: string): Promise<Artist[]> {
    const response = await axios.get(
        'https://api.spotify.com/v1/search',
        {
            params: {
                q: 'rock',
                type: 'artist',
                limit: 16
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data.artists.items
}

export async function getArtist(accessToken: string, id: string): Promise<Artist> {
    const response = await axios.get<Artist>(
        `https://api.spotify.com/v1/artists/${id}`,
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