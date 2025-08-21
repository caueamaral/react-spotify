import axios from 'axios'

export default async function getAlbums(accessToken: string, artistId: string) {
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