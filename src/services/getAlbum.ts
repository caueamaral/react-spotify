import axios from 'axios'
import type Album from '../interfaces/Album'

export default async function getAlbum(accessToken: string, artistId: string): Promise<Album> {
    try {
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
    catch (err) {
        console.error('getAlbum Spotify API error: ', err)
        throw err
    }
}