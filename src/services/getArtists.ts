import axios from 'axios'
import type { Artist } from '../interfaces/Artist'

export default async function getArtists(accessToken: string): Promise<Artist[]> {
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