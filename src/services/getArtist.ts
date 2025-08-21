import axios from 'axios'
import type Artist from '../interfaces/Artist'

export default async function getArtist(accessToken: string, artistId: string): Promise<Artist> {
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
