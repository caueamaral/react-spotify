import axios from 'axios'
import type { Artist } from '../interfaces/Artist'

export default async function getArtists(accessToken: string, genre: string): Promise<Artist[]> {
    const response = await axios.get(
        'https://api.spotify.com/v1/search',
        {
            params: {
                q: genre,
                type: 'artist',
                limit: 8
            },
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data.artists.items
}