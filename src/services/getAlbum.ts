import axios from 'axios'
import type Album from '../interfaces/Album'

export default async function getAlbum(accessToken: string, artistId: string): Promise<Album[]> {
    const response = await axios.get(
        `https://api.spotify.com/v1/albums/${artistId}`,
        {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        }
    )

    return response.data
}