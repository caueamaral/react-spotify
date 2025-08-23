import axios from 'axios'

export default async function getAlbums(accessToken: string, artistId: string) {
    try {
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
    catch (err) {
        console.error('getAlbums Spotify API error: ', err)
        throw err
    }
}